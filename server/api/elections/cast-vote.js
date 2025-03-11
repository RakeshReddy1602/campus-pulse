import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, electionOptionId, electionId, otp } = body;

  const errors = {};

  // Validate input
  if (!userId) {
    errors.userId = 'User ID is mandatory.';
  }
  if (!electionOptionId) {
    errors.electionOptionId = 'Election Option ID is mandatory.';
  }
  if (!electionId) {
    errors.electionId = 'Election ID is mandatory.';
  }
  if (!otp) {
    errors.otp = 'OTP is mandatory.';
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

  // Check OTP
  const { data: otpData, error: otpError } = await supabase
    .from('otp')
    .select('*')
    .eq('fk_id_user', userId)
    .eq('otp', otp)
    .gt('expiry_date', new Date().toISOString())
    .order('expiry_date', { ascending: false })
    .limit(1);

  if (otpError || otpData.length === 0) {
    console.error('Supabase error:', otpError);
    setResponseStatus(event, 400);
    return {
      statusCode: 400,
      status: 'error',
      message: 'Invalid or expired OTP',
      error: otpError?.message,
    };
  }

  const otpEntry = otpData[0];

  // Set OTP as used
  const { error: otpUpdateError } = await supabase
    .from('otp')
    .update({ is_used: true })
    .eq('id', otpEntry.id);

  if (otpUpdateError) {
    console.error('Supabase error:', otpUpdateError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to update OTP status',
      error: otpUpdateError.message,
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
    .select('*')
    .eq('id', electionId)
    .in('fk_id_club', clubIds)
    .single();

  if (electionError || !electionData) {
    console.error('Supabase error:', electionError);
    setResponseStatus(event, 403);
    return {
      statusCode: 403,
      status: 'error',
      message: 'You do not have access to this election',
      error: electionError?.message,
    };
  }

  // Check if the election option is valid for the given election
  const { data: optionData, error: optionError } = await supabase
    .from('election_option')
    .select('*')
    .eq('id', electionOptionId)
    .eq('fk_id_election', electionId)
    .eq('is_included', true)
    .single();

  if (optionError || !optionData) {
    console.error('Supabase error:', optionError);
    setResponseStatus(event, 400);
    return {
      statusCode: 400,
      status: 'error',
      message: 'Invalid election option for this election',
      error: optionError?.message,
    };
  }

  // Create vote entry
  const { error: voteError } = await supabase
    .from('vote')
    .insert({
      fk_id_user: userId,
      fk_id_election: electionId,
      fk_id_election_option: electionOptionId,
      is_valid: true,
    });

  if (voteError) {
    console.error('Supabase error:', voteError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to cast vote',
      error: voteError.message,
    };
  }

  return {
    statusCode: 200,
    status: 'success',
    message: 'Vote casted successfully',
  };
});