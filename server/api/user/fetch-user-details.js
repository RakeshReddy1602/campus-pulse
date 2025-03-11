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

    // Fetch user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error("Supabase error:", userError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch user details",
        error: userError.message,
      };
    }
    // delete passwod. do  not fetch it
    delete user.password;
    // Fetch clubs where the user is an admin, primary moderator, or secondary moderator
    const { data: managedClubs, error: managedClubsError } = await supabase
      .from('club')
      .select(`
        *,
        club_category:fk_id_category (name)
      `)
      .or(`fk_id_user_admin.eq.${userId},fk_id_user_primary_moderator.eq.${userId},fk_id_user_secondary_moderator.eq.${userId}`);

    if (managedClubsError) {
      console.error("Supabase error:", managedClubsError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch managed clubs",
        error: managedClubsError.message,
      };
    }

    // Fetch clubs that the user is part of
    const { data: myClubs, error: myClubsError } = await supabase
      .from('user_club_mapping')
      .select(`
        *,
        club:fk_id_club (*, club_category:fk_id_category (name))
      `)
      .eq('fk_id_user', userId);

    if (myClubsError) {
      console.error("Supabase error:", myClubsError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch user clubs",
        error: myClubsError.message,
      };
    }

    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: "success",
      data: {
        user,
        managedClubs,
        myClubs: myClubs.map(ucm => ucm.club),
      },
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