import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    if (!body) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "User Id is required",
      };
    }
    const { userId } = body;

    if (!userId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "User ID is required",
      };
    }

    // Fetch the list of club IDs that the user is part of with status 1
    const { data: userClubs, error: userClubsError } = await supabase
      .from('user_club_mapping')
      .select('fk_id_club')
      .eq('fk_id_user', userId)
      .eq('fk_id_status', 1);

    if (userClubsError) {
      console.error("Supabase error:", userClubsError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch user club mappings",
        error: userClubsError.message,
      };
    }

    const userClubIds = userClubs.map(club => club.fk_id_club);

    // Fetch clubs excluding those where the user is an admin, primary moderator, secondary moderator, or already part of the club with status 1
    let query = supabase
      .from('club')
      .select(`
        *,
        club_category:fk_id_category (name)
      `)
      .neq('fk_id_user_admin', userId)
      .neq('fk_id_user_primary_moderator', userId)
      .neq('fk_id_user_secondary_moderator', userId);

    if (userClubIds.length > 0) {
      query = query.not('id', 'in', `(${userClubIds.join(',')})`);
    }

    const { data, error } = await query;

    // Handle errors
    if (error) {
      console.error("Supabase error:", error);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch club data",
        error: error.message,
      };
    }

    // Check if the user has requested to join any club
    const { data: requestedClubs, error: requestedClubsError } = await supabase
      .from('user_club_mapping')
      .select('fk_id_club')
      .eq('fk_id_user', userId)
      .eq('fk_id_status', 3);

    if (requestedClubsError) {
      console.error("Supabase error:", requestedClubsError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to check requested clubs",
        error: requestedClubsError.message,
      };
    }

    const requestedClubIds = requestedClubs.map(club => club.fk_id_club);
    const clubsWithRequestStatus = data.map(club => ({
      ...club,
      hasRequestedToJoin: requestedClubIds.includes(club.id)
    }));

    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: "success",
      data: clubsWithRequestStatus,
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