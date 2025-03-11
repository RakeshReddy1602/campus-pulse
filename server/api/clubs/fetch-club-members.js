import { supabase } from "~/server/supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    const { clubId } = body;

    if (!clubId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "Club ID is required",
      };
    }

    // Fetch members that are part of the club and have fk_id_status as 1
    const { data: members, error: membersError } = await supabase
      .from('user_club_mapping')
      .select(`
      user:fk_id_user (id,name, registration_number)
      `)
      .eq('fk_id_club', clubId)
      .eq('fk_id_status', 1);

    if (membersError) {
      console.error("Supabase error:", membersError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch club members",
        error: membersError.message,
      };
    }

    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: "success",
      data: members.map(member => member.user),
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