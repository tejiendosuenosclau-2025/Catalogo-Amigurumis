const SUPABASE_URL = "https://rkhaxpxrzuwfclsazyyo.supabase.co";

const SUPABASE_KEY = "sb_publishable_1gRMc5hsJBQq0bLHgcNlKQ_v7LQUjpI";

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_KEY;

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);