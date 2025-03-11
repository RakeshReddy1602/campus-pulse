import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { eventId, userId } = body;

  const errors = {};

  // Validate event ID
  if (!eventId) {
    errors.eventId = 'Event ID is mandatory.';
  }

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

  // Check if the user is already registered for the event
  const { data: registrationData, error: registrationError } = await supabase
    .from('event_registration')
    .select('*')
    .eq('fk_id_event', eventId)
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

  if (registrationData.length > 0) {
    const registrationStatus = registrationData[0].fk_id_event_registration_status;
    if (registrationStatus === 2) {
      return {
        statusCode: 200,
        status: 'success',
        message: 'Already Registered',
      };
    } else if (registrationStatus === 1) {
      return {
        statusCode: 200,
        status: 'success',
        message: 'Already Registered',
      };
    }
  }
  // Register the user for the event
  const { data, error } = await supabase
    .from('event_registration')
    .insert({
      fk_id_event: eventId,
      fk_id_user: userId,
      fk_id_event_registration_status: 1, // Assuming 1 is the status for a new registration
    });

  if (error) {
    console.error('Supabase error:', error);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to register for event',
      error: error.message,
    };
  }

  return {
    statusCode: 201,
    status: 'success',
    message: 'Registered successfully',
    data,
  };
});