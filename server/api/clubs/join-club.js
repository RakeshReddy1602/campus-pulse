import { supabase } from '../../supabase.js'; // Using the existing Supabase instance

export default defineEventHandler(async (event) => {
    try {
        const { user_id, club_id } = await readBody(event);

        if (!user_id || !club_id) {
            return { success: false, message: "User ID and Club ID are required" };
        }

        // Hardcoded pending status ID (3)
        const pendingStatusId = 3;

        // Check if an entry with the same user_id, club_id, and pending status (3) already exists
        const { data: existingEntry, error: checkError } = await supabase
            .from('user_club_mapping')
            .select('id')
            .eq('fk_id_user', user_id)
            .eq('fk_id_club', club_id)
            .eq('fk_id_status', pendingStatusId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') { // Ignore "no rows found" error
            return { success: false, message: "Error checking existing entry", error: checkError };
        }

        if (existingEntry) {
            return { success: false, message: "User already has a pending request for this club" };
        }

        // Insert a new entry with 'pending' status (3)
        const { error: insertError } = await supabase
            .from('user_club_mapping')
            .insert([
                {
                    fk_id_user: user_id,
                    fk_id_club: club_id,
                    fk_id_status: pendingStatusId
                }
            ]);

        if (insertError) {
            return { success: false, message: "Failed to join club", error: insertError };
        }

        return { success: true, message: "User successfully joined the club with pending status" };

    } catch (err) {
        return { success: false, message: "Server error", error: err };
    }
});
