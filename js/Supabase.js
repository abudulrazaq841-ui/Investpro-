const SUPABASE_URL = "https://whdyyqbriaplvqhtdjpk.supabase.co";
const SUPABASE_KEY = "sb_publishable_W0_7qAL8tpVu8_R8WV2tqw_XALW6t4q";

// Create the client
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Make it available under BOTH names (so old and new code work)
window.supabase = client;
window.supabaseClient = client;