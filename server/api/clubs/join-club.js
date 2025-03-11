import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    const { userId, clubId } = body;

    if (!userId || !clubId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "User ID and Club ID are required.",
      };
    }

    // Check if there is an entry in user_club_mapping table
    const { data: existingMapping, error: fetchError } = await supabase
      .from('user_club_mapping')
      .select('*')
      .eq('fk_id_user', userId)
      .eq('fk_id_club', clubId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error("Supabase error:", fetchError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to check existing club membership.",
        error: fetchError.message,
      };
    }

    if (!existingMapping) {
      // No existing entry, create a new one
      const { data, error } = await supabase
        .from('user_club_mapping')
        .insert([
          {
            fk_id_user: userId,
            fk_id_club: clubId,
            fk_id_status: 3 // Assuming 3 means "requested to join"
          }
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        setResponseStatus(event, 500);
        return {
          statusCode: 500,
          status: "error",
          message: "Failed to request to join the club.",
          error: error.message,
        };
      }

      setResponseStatus(event, 201);
      return {
        statusCode: 201,
        status: "success",
        message: "Successfully requested to join the club.",
        data: data[0],
      };
    } else {
      // Existing entry found, check the status
      if (existingMapping.fk_id_status === 2) {
        // Update the status to 3
        const { data, error } = await supabase
          .from('user_club_mapping')
          .update({ fk_id_status: 3 })
          .eq('fk_id_user', userId)
          .eq('fk_id_club', clubId)
          .select();

        if (error) {
          console.error("Supabase error:", error);
          setResponseStatus(event, 500);
          return {
            statusCode: 500,
            status: "error",
            message: "Failed to update club membership status.",
            error: error.message,
          };
        }

        setResponseStatus(event, 200);
        return {
          statusCode: 200,
          status: "success",
          message: "Successfully requested to join the club.",
          data: data[0],
        };
      } else {
        // Status is not 2, do nothing
        setResponseStatus(event, 200);
        return {
          statusCode: 200,
          status: "success",
          message: "Successfully requested to join the club.",
        };
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: "error",
      message: "An unexpected error occurred.",
      error: err.message,
    };
  }
});