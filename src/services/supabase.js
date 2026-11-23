import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tnwsmyccszchetzumvgb.supabase.co";
const supabaseKey = "sb_publishable_vc4zp8ndNfUHUyJ6tQtZdg_pulxQ3Rh";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
