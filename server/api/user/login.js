import { supabase } from "../../supabase.js"; 
import { defineEventHandler, readBody, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  try {
      const body = await readBody(event);
      const { regNumber, password } = body;

      if (!regNumber || !password) {
          setResponseStatus(event, 400);
          return { message: 'Registration number and password are required.' };
      }

      // Query user by registration number and password
      const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('registration_number', regNumber)
          .eq('password', password)
          .single();

      if (error || !data) {
          setResponseStatus(event, 401, "Invalid Credentials");
          return { message: 'Invalid credentials' };
      }

      // Fetch user details using the fetch-user-details API
      const userDetailsResponse = await $fetch('/api/user/fetch-user-details', {
        method: 'POST',
        body: { userId: data.id }
      });

      if (userDetailsResponse.statusCode !== 200) {
          setResponseStatus(event, userDetailsResponse.statusCode, userDetailsResponse.message);
          return { message: userDetailsResponse.message };
      }

      setResponseStatus(event, 200);
      return { user: userDetailsResponse.data };
  } catch (err) {
      setResponseStatus(event, 500, "Internal Server Error !!");
      return { message: err.message };
  }
});
