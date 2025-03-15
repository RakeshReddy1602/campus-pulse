import { supabase } from "../../supabase.js";
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Parse the incoming form data
    const formData = await readMultipartFormData(event);

    // Extract the fields and files from the form data
    const fields = {};
    const files = {};
    console.log('Received form data:', formData);
    formData.forEach(item => {
      if (item.name.includes('banner') || item.name.includes('videos[]')) {
        files[item.name] = item;
      } else {
        fields[item.name] = item.data.toString();
      }
    });

    const { name, description, adminId, categoryId, primaryModeratorId, secondaryModeratorId } = fields;
    const banner = files['banner'];
    const videos = Buffer.from(files['videos[]'].data);

      console.log('Received values:', {
        name,
        description,
        categoryId,
        primaryModeratorId,
        secondaryModeratorId,
        banner,
        videos
    });

    // Validate required fields
    if (!name || !description || !categoryId || !adminId || !banner) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "Missing required fields.",
      };
    }

    // Fetch all allowed extensions from the extension table
    let { data: allowedExtensionsData, error: allowedExtensionsError } = await supabase
      .from('extension')
      .select('name');

    if (allowedExtensionsError) {
      console.error("Supabase error:", allowedExtensionsError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch allowed extensions. Please try again later.",
        error: allowedExtensionsError.message,
      };
    }

    allowedExtensionsData = allowedExtensionsData.map(ext => ext.name);
    const bannerExtension = path.extname(banner.filename).substring(1).toLowerCase();
    if (!allowedExtensionsData.includes(bannerExtension)) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "Invalid banner file extension.",
      };
    }
    if (banner.data.length > 5 * 1024 * 1024) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "Banner file size exceeds 5 MB.",
      };
    }

    for (const video of videos) {
      console.log('Video:', video);
      const videoExtension = path.extname(video.filename).substring(1).toLowerCase();
      if (!allowedExtensionsData.includes(videoExtension)) {
        setResponseStatus(event, 400);
        return {
          statusCode: 400,
          status: "error",
          message: `Invalid video file extension for ${video.filename}.`,
        };
      }
      if (video.data.length > 20 * 1024 * 1024) {
        setResponseStatus(event, 400);
        return {
          statusCode: 400,
          status: "error",
          message: `Video file size exceeds 20 MB for ${video.filename}.`,
        };
      }
    }

    // Check the number of clubs where the user is an admin, primary moderator, or secondary moderator
    const { count, error: countError } = await supabase
      .from('club')
      .select('id', { count: 'exact' })
      .or(`fk_id_user_admin.eq.${adminId},fk_id_user_primary_moderator.eq.${adminId},fk_id_user_secondary_moderator.eq.${adminId}`);

    if (countError) {
      console.error("Supabase error:", countError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to check user club count. Please try again later.",
        error: countError.message,
      };
    }

    if (count >= 50) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "You have reached the maximum limit of 5 clubs you can manage.",
      };
    }

    // Insert new club using Supabase's insert method
    const { data: clubData, error: clubError } = await supabase
      .from("club")
      .insert([
        {
          name,
          description,
          fk_id_category: categoryId,
          fk_id_user_admin: adminId,
          fk_id_user_primary_moderator: primaryModeratorId || null,
          fk_id_user_secondary_moderator: secondaryModeratorId || null,
          is_active: false
        },
      ])
      .select(); // Select the inserted record

    if (clubError) {
      console.log(clubError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to create club. Please try again later.",
        error: clubError.message,
      };
    }

    const clubId = clubData[0].id;

    // Fetch the file container name
    const { data: containerData, error: containerError } = await supabase
      .from('file_container')
      .select('name')
      .eq('id', 1)
      .single();

    if (containerError || !containerData) {
      throw new Error(`Failed to fetch file container: ${containerError.message}`);
    }

    const containerName = containerData.name;

    // Function to insert file metadata into the database and save the file
    const insertFileMetadata = async (file, containerId) => {
      const extension = path.extname(file.filename).substring(1).toLowerCase();
      const { data: extensionData, error: extensionError } = await supabase
        .from('extension')
        .select('id')
        .eq('name', extension)
        .single();

      if (extensionError || !extensionData) {
        throw new Error(`Invalid file extension: ${extension}`);
      }

      const { data: fileData, error: fileError } = await supabase
        .from('file')
        .insert([
          {
            fk_id_file_container: containerId,
            fk_id_file_extension: extensionData.id,
            size: file.data.length,
            name: file.filename
          },
        ])
        .select();

      if (fileError) {
        throw new Error(`Failed to insert file metadata: ${fileError.message}`);
      }

      const fileId = fileData[0].id;
      const filePath = path.join(containerName, file.filename);

      // Save the file to the specified path
      fs.writeFileSync(filePath, file.data);

      return fileId;
    };

    // Insert banner metadata and save the file
    const bannerFileId = await insertFileMetadata(banner, 1);

    // Insert video metadata and save the files
    const videoFileIds = [];
    for (const video of videos) {
      const videoFileId = await insertFileMetadata(video, 1);
      videoFileIds.push(videoFileId);
    }

    // Function to insert club file metadata into the database
    const insertClubFileMetadata = async (clubId, fileId, usageTypeId) => {
      const { data: clubFileData, error: clubFileError } = await supabase
        .from('club_file')
        .insert([
          {
            fk_id_club: clubId,
            fk_id_file: fileId,
            fk_id_usage_type: usageTypeId
          },
        ])
        .select();

      if (clubFileError) {
        throw new Error(`Failed to insert club file metadata: ${clubFileError.message}`);
      }

      return clubFileData[0].id;
    };

    // Insert banner club file metadata
    await insertClubFileMetadata(clubId, bannerFileId, 1); // Assuming usage type 1 for banner

    // Insert video club file metadata
    for (const videoFileId of videoFileIds) {
      await insertClubFileMetadata(clubId, videoFileId, 2); // Assuming usage type 2 for videos
    }

    // Return success response
    setResponseStatus(event, 201);
    return {
      statusCode: 201,
      status: "success",
      message: "Club created successfully!",
      data: clubData[0],
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: "error",
      message: "An unexpected error occurred while creating the club.",
      error: err.message,
    };
  }
});