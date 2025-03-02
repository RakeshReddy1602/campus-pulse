import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(nuxtApp => {
  // Get Supabase credentials from environment variables or directly from your Supabase project
  const supabaseUrl = ""; // Replace with your Supabase URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zb2V0eHdpYXFraGF4dWlpenBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzk1MTUsImV4cCI6MjA1MTg1NTUxNX0.rPd07C8pSlmmgl7KUNWFw8S0SBSs_LUTKti5qh4INhs'; // Replace with your public anon key

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Make Supabase client accessible globally
  nuxtApp.provide('supabase', supabase);
});
