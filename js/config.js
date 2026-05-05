// Supabase Configuration
const SUPABASE_URL = 'https://uvozzaaoptknsz1qymsf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b3p6YWFvcHRrbnN6bHF5bXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzEzNDIsImV4cCI6MjA5MzU0NzM0Mn0.OEmh7K-yzuGKUw743Gh315i0zNz2-eO53QW1RbHBYRc';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
