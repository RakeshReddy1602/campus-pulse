import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId } = body;

  const errors = {};

  // Validate input
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

  // Generate a 6-character numeric OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const otp = generateOtp();

  // Calculate expiry date (current time + 5 minutes)
  const expiryDate = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  // Create OTP entry
  const { error: otpError } = await supabase
    .from('otp')
    .insert({
      otp: '123456',
      fk_id_user: userId,
      expiry_date: expiryDate,
      is_used: false,
    });

  if (otpError) {
    console.error('Supabase error:', otpError);
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Failed to generate OTP',
      error: otpError.message,
    };
  }

  return {
    statusCode: 200,
    status: 'success',
    message: 'OTP generated successfully',
    data: {
      otp,
      expiry_date: expiryDate,
    },
  };
});