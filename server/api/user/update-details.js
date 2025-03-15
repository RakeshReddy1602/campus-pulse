import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Parse the incoming form data
    const formData = await readMultipartFormData(event);

    // Extract the file data and filename from the form data
    const fileField = formData[0].data;
    const filenameField = formData[0].filename;
    console.log("form data : ", formData);
    if (!fileField || !filenameField) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: 'error',
        message: 'File and filename are required',
      };
    }

    const file = fileField;
    const filename = filenameField;
    // console.log('file', file);
    console.log('filename', filename);
    // Set the upload directory
    const uploadDir = path.join(process.cwd(), 'campuspulsefiles/profiles');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Set the file path
    const filePath = path.join(uploadDir, filename);

    // Write the file to the upload directory
    fs.writeFileSync(filePath, file);

    // Return the file details in the response
    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: 'success',
      message: 'File uploaded successfully',
      data: {
        filename,
        filepath: filePath,
      },
    };
  } catch (error) {
    // Handle any errors that occur during the process
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'An unexpected error occurred.',
      error: error.message,
    };
  }
});
