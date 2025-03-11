import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {
    // Extract request body
    const body = await readBody(event);
    const { clubId, userId } = body;

    // Check if clubId and userId are provided in the query
    if (!clubId || !userId) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        status: "error",
        message: "clubId and userId parameters are required",
      };
    }

    // Check if the user has access to the club
    const { data: userClubMapping, error: userClubMappingError } = await supabase
      .from('user_club_mapping')
      .select('*')
      .eq('fk_id_user', userId)
      .eq('fk_id_club', clubId)
      .eq('fk_id_status', 1)
      .single();

    if (userClubMappingError || !userClubMapping) {
      setResponseStatus(event, 403);
      return {
        statusCode: 403,
        status: "error",
        message: "You do not have access to this club",
      };
    }

    // Fetch the club data with the given clubId
    const { data: clubData, error: clubError } = await supabase
      .from('club')
      .select('*')
      .eq('id', clubId)
      .single();

    if (clubError || !clubData) {
      setResponseStatus(event, 404);
      return {
        statusCode: 404,
        status: "error",
        message: "Club not found",
      };
    }

    // Fetch user club mappings
    const { data: userClubMappings, error: userClubMappingsError } = await supabase
      .from('user_club_mapping')
      .select('*')
      .eq('fk_id_club', clubId);

    if (userClubMappingsError) {
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: userClubMappingsError.message,
      };
    }

    // Assign statuses based on user_club_mapping_status
    const members = userClubMappings.map(mapping => {
      let status = 'isActive';
      if (mapping.fk_id_status === 2) {
        status = 'isBlocked';
      } else if (mapping.fk_id_status === 3) {
        status = 'isPending';
      }
      return { ...mapping, status };
    });

    // Fetch elections
    const { data: elections, error: electionsError } = await supabase
      .from('election')
      .select('*')
      .eq('fk_id_club', clubId);

    if (electionsError) {
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: electionsError.message,
      };
    }

    // Fetch events
    const { data: events, error: eventsError } = await supabase
      .from('event')
      .select('*')
      .eq('fk_id_club', clubId);

    if (eventsError) {
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: "error",
        message: eventsError.message,
      };
    }

    // Check if the user is an admin or moderator
    const isAdminOrModerator = userClubMapping.fk_id_user_admin === userId ||
      userClubMapping.fk_id_user_primary_moderator === userId ||
      userClubMapping.fk_id_user_secondary_moderator === userId;

    // Filter members based on the user's role
    const filteredMembers = isAdminOrModerator
      ? members
      : members.filter(member => member.status === 'isActive');

    // Return the fetched club data along with members, elections, and events
    setResponseStatus(event, 200);
    return {
      statusCode: 200,
      status: "success",
      data: {
        club: clubData,
        members: filteredMembers,
        elections,
        events,
      },
    };
  } catch (error) {
    // Handle any errors that occur during the process
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: "error",
      message: "An unexpected error occurred.",
      error: error.message,
    };
  }
});
