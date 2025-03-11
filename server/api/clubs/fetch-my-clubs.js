import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    const { userId, isAdmin } = body;

    if (!userId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "User ID is required",
      };
    }

    // Execute both API calls in parallel
    const [userClubResponse, adminClubResponse] = await Promise.all([
      supabase
        .from("user_club_mapping")
        .select(
          `*,
          club:fk_id_club (
            *,
            club_category:fk_id_category (
              name
            )
          )`
        )
        .eq("fk_id_user", userId)
        .neq("fk_id_status", 2),

      supabase
        .from("club")
        .select(
          `*,
          club_category:fk_id_category (
            name
          )`
        )
        .or(`fk_id_user_admin.eq.${userId},fk_id_user_primary_moderator.eq.${userId},fk_id_user_secondary_moderator.eq.${userId}`)
        .eq("is_active", true), // Exclude status 2
    ]);

    // Handle errors
    if (userClubResponse.error || adminClubResponse.error) {
      console.error("Supabase error:", userClubResponse.error || adminClubResponse.error);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: "Failed to fetch club data",
        error: userClubResponse.error?.message || adminClubResponse.error?.message,
      };
    }
    console.log(userClubResponse.data, adminClubResponse.data);
    // Extract data
    const userClubData = userClubResponse.data || [];
    const adminClubData = adminClubResponse.data || [];

    // Transform response to match expected structure
    const transformedUserClubs = userClubData.map((ucm) => ({
      ...ucm,
      clubCategoryName: ucm.club?.club_category?.name || null,
      ...ucm.club,
    }));

    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: "success",
      data: [...transformedUserClubs, ...adminClubData], // Combine both results
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
