import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, shouldFetchExpired, shouldFetchOngoing, shouldFetchUpcoming } = body;

  const errors = {};

  // Validate user ID
  if (!userId) {
    errors.userId = 'User ID is mandatory.';
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    setResponseStatus(event, 400);
    return {
      statusCode: 400,
      status: 'error',
      message: 'Validation errors',
      errors,
    };
  }

  // Get current date
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Fetch club IDs from user_club_mapping table where fk_id_user matches userId and fk_id_status is 1
  const { data: clubMappingData, error: clubMappingError } = await supabase
    .from('user_club_mapping')
    .select('fk_id_club')
    .eq('fk_id_user', userId)
    .eq('fk_id_status', 1);

  if (clubMappingError) {
    console.error('Supabase error:', clubMappingError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to fetch club mappings',
      error: clubMappingError.message,
    };
  }

  const clubIds = clubMappingData.map(mapping => mapping.fk_id_club);
  console.log('club ids : ', clubIds);
  
  let query = supabase.from('election')
    .select(`
      *,
      club:fk_id_club (name),
      primary_coordinator:fk_id_user_primary_coordinator (name),
      secondary_coordinator:fk_id_user_secondary_coordinator (name)
    `)
    .in('fk_id_club', clubIds);

  if (shouldFetchExpired) {
    query = query.or(`end_date.lt.${today},is_result_computed.eq.true`);
  }

  if (shouldFetchOngoing) {
    query = query.lte('start_date', today).gt('end_date', today); // Fixed condition
  }

  if (shouldFetchUpcoming) {
    query = query.gt('start_date', today);
  }

  const { data: electionsData, error: electionsError } = await query;

  if (electionsError) {
    console.error('Supabase error:', electionsError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to fetch elections',
      error: electionsError.message,
    };
  }

  // Filter elections based on is_open_to_all and voter_list
  const filteredElections = [];
  for (const election of electionsData) {
    if (election.is_open_to_all) {
      filteredElections.push(election);
    } else {
      const { data: voterListData, error: voterListError } = await supabase
        .from('voter_list')
        .select('fk_id_eligibility_status')
        .eq('fk_id_election', election.id)
        .eq('fk_id_user_voter', userId);

      if (voterListError) {
        console.error('Supabase error:', voterListError);
        setResponseStatus(event, 500);
        return {
          statusCode: 500,
          status: 'error',
          message: 'Failed to fetch voter list',
          error: voterListError.message,
        };
      }

      if (voterListData.length > 0 && voterListData[0].fk_id_eligibility_status !== 2) {
        filteredElections.push(election);
      }
    }
  }

  return {
    statusCode: 200,
    status: 'success',
    message: 'Elections fetched successfully',
    data: filteredElections,
  };
});
