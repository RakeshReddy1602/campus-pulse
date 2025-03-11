import { supabase } from "../../supabase.js";

export default defineEventHandler(async (event) => {
  try {

    const { data, error } = await supabase.from('club_category').select('*')

    if (error) {
      throw createError({ statusCode: 500, message: error.message })
    }

    return { clubCategories: data }
  } catch (err) {
    return { error: err.message }
  }
})
