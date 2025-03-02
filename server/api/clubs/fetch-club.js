import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  // Access the query parameters from the event object
  const { clubId } = getQuery(event);
    console.log('-- club id : ',clubId);
  // Check if clubId is provided in the query
  if (!clubId) {
    return { statusCode: 400, body: { error: 'clubId parameter is required' } };
  }

  try {
    console.log("--- calling apui ---");
    // Fetch the club data with the given clubId
    const { data, error } = await supabase
      .from('club') // Replace with your actual table name
      .select('*')
      .eq('id', clubId) // Use the clubId to filter the results
      .single(); // We're expecting only one result since the ID is unique

    if (error) {
      return { statusCode: 400, body: { error: error.message } };
    }
    console.log(data);
    // If no data found, send a 404 response
    if (!data) {
      return { statusCode: 404, body: { message: 'Club not found' } };
    }
    console.log('--- data : ', data);
    // Return the fetched club data
    return { statusCode: 200, body: data };
  } catch (error) {
    // Handle any errors that occur during the process
    return { statusCode: 500, body: { error: error.message } };
  }
});
