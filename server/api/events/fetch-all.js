import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId } = body;

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

  // Fetch all events
  const { data: allEvents, error: allEventsError } = await supabase
    .from('event')
    .select('*');

  if (allEventsError) {
    console.error('Supabase error:', allEventsError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to fetch events',
      error: allEventsError.message,
    };
  }

  // Filter events that do not have an entry in event_registration with the combination of user ID and event ID
  const filteredEvents = [];
  for (const event of allEvents) {
    const { data: registrationData, error: registrationError } = await supabase
      .from('event_registration')
      .select('*')
      .eq('fk_id_event', event.id)
      .eq('fk_id_user', userId);

    if (registrationError) {
      console.error('Supabase error:', registrationError);
      setResponseStatus(event, 500);
      return {
        statusCode: 500,
        status: 'error',
        message: 'Failed to check registration',
        error: registrationError.message,
      };
    }

    if (registrationData.length === 0) {
      filteredEvents.push(event);
    }
  }

  return {
    statusCode: 200,
    status: 'success',
    message: 'Events fetched successfully',
    data: filteredEvents,
  };
});
