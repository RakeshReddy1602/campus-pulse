import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {

    const { data, error } = await supabase.from('users').select('*')

    if (error) {
      throw createError({ statusCode: 500, message: error.message })
    }

    return { users: data }
  } catch (err) {
    return { error: err.message }
  }
})
