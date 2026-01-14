const supabaseUrl = "https://ktmrbmjfcttzbpwfyzyg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bXJibWpmY3R0emJwd2Z5enlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MDA2MjQsImV4cCI6MjA4Mzk3NjYyNH0.qecQEYQWLi7E9V63_Y6t3ZqjvQZs_AJl6POBuzXL9mI";

if (!window.supabase) {
  console.error('Supabase client not loaded. Make sure the Supabase script is included in index.html');
}

const supabase = window.supabase?.createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;
