const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

if (!window.supabase) {
  console.error('Supabase client not loaded. Make sure the Supabase script is included in index.html');
}

const supabase = window.supabase?.createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;
