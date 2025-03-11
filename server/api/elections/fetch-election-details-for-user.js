import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, electionId } = body;

  const errors = {};

  // Validate user ID and election ID
  if (!userId) {
    errors.userId = 'User ID is mandatory.';
  }
  if (!electionId) {
    errors.electionId = 'Election ID is mandatory.';
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

  // Fetch club IDs from user_club_mapping table where fk_id_user matches userId and fk_id_user_club_mapping_status is 1
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

  // Fetch election details
  const { data: electionData, error: electionError } = await supabase
    .from('election')
    .select(`
      *,
      creator:fk_id_user_creator (name, registration_number),
      primary_coordinator:fk_id_user_primary_coordinator (name, registration_number),
      secondary_coordinator:fk_id_user_secondary_coordinator (name, registration_number)
    `)
    .eq('id', electionId)
    .in('fk_id_club', clubIds)
    .single();

  if (electionError) {
    console.error('Supabase error:', electionError);
    setResponseStatus(event, 403);
    return {
      statusCode: 403,
      status: 'error',
      message: 'You do not have access to this election',
      error: electionError.message,
    };
  }

  // Fetch options and votes in parallel
  const [optionsData, votesData] = await Promise.all([
    supabase
      .from('election_option')
      .select('*')
      .eq('fk_id_election', electionId)
      .eq('is_included', true),
    supabase
      .from('vote')
      .select('*')
      .eq('fk_id_election', electionId)
      .eq('is_valid', true),
  ]);

  if (optionsData.error || votesData.error) {
    console.error('Supabase error:', optionsData.error || votesData.error);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to fetch election details',
      error: optionsData.error?.message || votesData.error?.message,
    };
  }

  // Compute votes for each option
  const voteCounts = {};
  for (const vote of votesData.data) {
    if (!voteCounts[vote.fk_id_election_option]) {
      voteCounts[vote.fk_id_election_option] = 0;
    }
    voteCounts[vote.fk_id_election_option]++;
  }

  // Calculate total votes
  const totalVotes = votesData.data.length;
  console.log('Total votes:', totalVotes);
  // Prepare vote details
  const voteDetails = optionsData.data.map(option => {
    const optionVotes = voteCounts[option.id] || 0;
    console.log('Option votes:', voteCounts);
    const votePercentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;
    return {
      electionOptionId: option.id,
      electionOptionName: option.name,
      voteCount: optionVotes,
      votePercentage: votePercentage.toFixed(2) + '%',
    };
  });

  // Determine the winner option if result is computed
  let electionWinner = null;
  if (electionData.is_result_computed) {
    let maxVotes = 0;
    for (const option of optionsData.data) {
      const optionVotes = voteCounts[option.id] || 0;
      if (optionVotes > maxVotes) {
        maxVotes = optionVotes;
        electionWinner = option;
      }
    }
  }

  // Check if the user has already voted
  const { data: userVoteData, error: userVoteError } = await supabase
    .from('vote')
    .select('id')
    .eq('fk_id_user', userId)
    .eq('fk_id_election', electionId)
    .single();

  if (userVoteError && userVoteError.code !== 'PGRST116') { // PGRST116 is the code for no rows found
    console.error('Supabase error:', userVoteError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to check user vote',
      error: userVoteError.message,
    };
  }

  const hasAlreadyVoted = !!userVoteData;

  return {
    statusCode: 200,
    status: 'success',
    message: 'Election details fetched successfully',
    data: {
      ...electionData,
      options: optionsData.data,
      votes: voteDetails,
      electionWinner,
      hasAlreadyVoted,
    },
  };
});