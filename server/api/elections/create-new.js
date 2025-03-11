import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    name,
    description,
    isOpenToAll,
    voterList,
    clubId,
    electionStartDate,
    electionEndDate,
    options,
    userId,
    primaryCoordinator,
    secondaryCoordinator,
    additionalDetails,
  } = body;

  console.log('Creating new election:', body);

  const errors = {};

  // Validate name
  if (!name || name.length < 5) {
    errors.name = 'Election name is mandatory and must be at least 5 characters long.';
  }

  // Validate description
  if (!description || description.length < 10) {
    errors.description = 'Description is mandatory and must be at least 10 characters long.';
  }

  // Validate election start date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today for accurate comparison
  if (!electionStartDate || new Date(electionStartDate) < today) {
    errors.electionStartDate = 'Election start date is mandatory and cannot be in the past.';
  }

  // Validate election end date
  if (!electionEndDate || new Date(electionEndDate) < new Date(electionStartDate)) {
    errors.electionEndDate = 'Election end date is mandatory and cannot be before the start date.';
  }

  // Validate options
  const uniqueOptions = new Set();
  const trimmedOptions = options.map(option => option.trim().toLowerCase());
  for (const option of trimmedOptions) {
    if (uniqueOptions.has(option)) {
      errors.options = 'Each option must be unique.';
      break;
    }
    uniqueOptions.add(option);
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

  // Insert the new election into the database
  const { data: electionData, error: electionError } = await supabase
    .from('election')
    .insert({
      name,
      description,
      fk_id_user_creator: userId,
      fk_id_user_primary_coordinator: primaryCoordinator,
      fk_id_user_secondary_coordinator: secondaryCoordinator,
      fk_id_club: clubId,
      is_open_to_all: isOpenToAll,
      start_date: electionStartDate,
      end_date: electionEndDate,
      additional_details: additionalDetails,
    })
    .select();

  if (electionError) {
    console.error('Supabase error:', electionError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to create election',
      error: electionError.message,
    };
  }

  const electionId = electionData[0].id;

  // Insert options into the election_option table
  for (const option of trimmedOptions) {
    const { error: optionError } = await supabase
      .from('election_option')
      .insert({
        name: option,
        fk_id_election: electionId,
      });

    if (optionError) {
      console.error('Supabase error:', optionError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: 'error',
        message: 'Failed to create election options',
        error: optionError.message,
      };
    }
  }

  // Insert voter list into the voter_list table if not open to all
  if (isOpenToAll === 'false') {
    for (const voter of voterList) {
      const { error: voterError } = await supabase
        .from('voter_list')
        .insert({
          fk_id_election: electionId,
          fk_id_user_voter: voter.userId,
          fk_id_eligibility_status: voter.eligibilityStatusId,
        });

      if (voterError) {
        console.error('Supabase error:', voterError);
        setResponseStatus(event, 500);
        return {
          statusCode: 500,
          status: 'error',
          message: 'Failed to create voter list',
          error: voterError.message,
        };
      }
    }
  }

  return {
    statusCode: 201,
    status: 'success',
    message: 'Election created successfully',
    data: electionData,
  };
});