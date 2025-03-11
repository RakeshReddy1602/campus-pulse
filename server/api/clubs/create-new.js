import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    const { name, description, adminuserId, categoryId, firstModeratorId, secondaryModeratorId } = body;
    console.log('Received values:', {
      name,
      description, 
      categoryId,
      firstModeratorId,
      secondaryModeratorId
    });

    // Validate required fields
    if (!name || !description || !categoryId || !adminuserId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "Missing required fields.",
      };
    }

    // Check the number of clubs where the user is an admin, primary moderator, or secondary moderator
    const { count, error: countError } = await supabase
      .from('club')
      .select('id', { count: 'exact' })
      .or(`fk_id_user_admin.eq.${adminuserId},fk_id_user_primary_moderator.eq.${adminuserId},fk_id_user_secondary_moderator.eq.${adminuserId}`);

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

    // if (count >= 5) {
    //   setResponseStatus(event, 400);
    //   return {
    //     statusCode: 400,
    //     status: "error",
    //     message: "User cannot be an admin or moderator for more than 5 clubs.",
    //   };
    // }

    // Insert new club using Supabase's insert method
    const { data, error } = await supabase
      .from("club")
      .insert([
        {
          name,
          description,
          fk_id_category: categoryId,
          fk_id_user_admin: adminuserId,
          fk_id_user_primary_moderator: firstModeratorId || null,
          fk_id_user_secondary_moderator: secondaryModeratorId || null,
          is_active: false
        },
      ])
      .select(); // Select the inserted record
    console.log(data);

    // Handle errors
    if (error) {
      console.log(error);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to create club. Please try again later.",
        error: error.message,
      };
    }

    // Return success response
    setResponseStatus(event, 201);
    return {
      statusCode: 201,
      status: "success",
      message: "Club created successfully!",
      data: data[0],
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
