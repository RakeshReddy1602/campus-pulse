import { supabase } from "~/server/supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    const { userId } = body;

    if (!userId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "User ID is required",
      };
    }

    // Fetch clubs where the user is an admin, primary moderator, or secondary moderator
    const { data, error } = await supabase
      .from('club')
      .select(`
        *,
        club_category:fk_id_category (name)
      `)
      .or(`fk_id_user_admin.eq.${userId},fk_id_user_primary_moderator.eq.${userId},fk_id_user_secondary_moderator.eq.${userId}`);

    // Handle errors
    if (error) {
      console.error("Supabase error:", error);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch clubs managed by the user",
        error: error.message,
      };
    }

    // Assign isAdmin true if the user is an admin, else false
    const clubsWithAdminStatus = data.map(club => ({
      ...club,
      isAdmin: club.fk_id_user_admin === userId
    }));

    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: "success",
      data: clubsWithAdminStatus,
    };
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
