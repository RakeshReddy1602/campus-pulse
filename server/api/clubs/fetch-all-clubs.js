import {supabase} from '../../supabase.js';
export default defineEventHandler(async (event) => {
  try {
    // Fetch all clubs from the 'club' table
    const { data, error } = await supabase
  .from('club')
  .select('*, club_category(id, name)');
    
    if (error) {
      return {
        statusCode: 500,
        message: 'Error fetching clubs',
        error: error.message,
      };
    }
    console.log('--- data : ', data);
    return {
      status: 'success',
      data: data, // Return the fetched clubs
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
      error: error.message,
    };
  }
});