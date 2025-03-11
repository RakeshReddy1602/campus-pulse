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
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  // Fetch event IDs from event_registration table where fk_id_event_registration_status is not 2
  const { data: registrationData, error: registrationError } = await supabase
    .from('event_registration')
    .select('fk_id_event')
    .eq('fk_id_user', userId)
    .neq('fk_id_event_registration_status', 2);

  if (registrationError) {
    console.error('Supabase error:', registrationError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to fetch registrations',
      error: registrationError.message,
    };
  }

  const eventIds = registrationData.map(registration => registration.fk_id_event);

  let query = supabase.from('event')
    .select(`
      *,
      club:fk_id_club (name),
      primary_coordinator:fk_id_primary_coordinator (name),
      secondary_coordinator:fk_id_user_secondary_coordinator (name)
    `)
    .in('id', eventIds);
  if (shouldFetchExpired) {
    query = query.or(`event_end_date.lt.${today},fk_id_event_status.eq.4`);
  }

  if (shouldFetchOngoing) {
    query = query.lte('event_start_date', today).gte('event_end_date', today);
  }

  if (shouldFetchUpcoming) {
    query = query.gt('event_start_date', today);
  }

  const { data: eventsData, error: eventsError } = await query;

  if (eventsError) {
    console.error('Supabase error:', eventsError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to fetch events',
      error: eventsError.message,
    };
  }

  return {
    statusCode: 200,
    status: 'success',
    message: 'Events fetched successfully',
    data: eventsData,
  };
});