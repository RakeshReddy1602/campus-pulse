import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    name,
    description,
    eventStartDate,
    eventEndDate,
    location,
    clubId,
    attendees,
    coordinators,
    registrationRequired,
    registrationStartDate,
    registrationEndDate,
    additionalDetails,
  } = body;

  const coordinator1 = coordinators[0];
  const coordinator2 = coordinators[1];

  const errors = {};

  // Validate event name
  if (!name || name.length < 5) {
    errors.name = 'Event name is mandatory and must be at least 5 characters long.';
  }

  // Validate description
  if (!description || description.length < 10) {
    errors.description = 'Description is mandatory and must be at least 10 characters long.';
  }

  // Validate event start date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today for accurate comparison
  if (!eventStartDate || new Date(eventStartDate) < today) {
    errors.eventStartDate = 'Event start date is mandatory and cannot be in the past.';
  }

  // Validate event end date
  if (!eventEndDate || new Date(eventEndDate) < new Date(eventStartDate)) {
    errors.eventEndDate = 'Event end date is mandatory and cannot be before the start date.';
  }

  // Validate location
  if (!location || location.length < 5) {
    errors.location = 'Location is mandatory and must be at least 5 characters long.';
  }

  // Validate club ID
  if (!clubId) {
    errors.clubId = 'Club ID is mandatory.';
  }

  // Validate coordinators
  if (!coordinator1 || !coordinator2) {
    errors.coordinators = 'Both coordinators are mandatory.';
  } else if (coordinator1 === coordinator2) {
    errors.coordinators = 'Coordinators cannot be the same.';
  }

  // Validate registration dates if registration is required
  if (registrationRequired) {
    if (!registrationStartDate || new Date(registrationStartDate) < today) {
      errors.registrationStartDate = 'Registration start date is mandatory and cannot be in the past.';
    }
    if (!registrationEndDate || new Date(registrationEndDate) < new Date(registrationStartDate)) {
      errors.registrationEndDate = 'Registration end date is mandatory and cannot be before the registration start date.';
    }
  }

  // Validate additional details
  if (additionalDetails && additionalDetails.length > 200) {
    errors.additionalDetails = 'Additional details can be up to 200 characters long.';
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

  // Insert the new event into the database
  const { data, error } = await supabase
    .from('event')
    .insert({
      name,
      description,
      event_start_date: eventStartDate,
      event_end_date: eventEndDate,
      location,
      fk_id_club: clubId,
      registration_limit: attendees || null,
      fk_id_primary_coordinator: coordinator1,
      fk_id_user_secondary_coordinator: coordinator2,
      is_reg_required: registrationRequired || false,
      registration_start_date: registrationRequired ? registrationStartDate : null,
      registration_end_date: registrationRequired ? registrationEndDate : null,
      additional_details: additionalDetails || null,
      fk_id_event_status: 1, // Assuming 1 is the default status for a new event
    });

  if (error) {
    console.error('Supabase error:', error);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to create event',
      error: error.message,
    };
  }

  return {
    statusCode: 201,
    status: 'success',
    message: 'Event created successfully',
    data,
  };
});