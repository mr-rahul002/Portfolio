import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://irempzltuystvtmwyssv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZW1wemx0dXlzdHZ0bXd5c3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzAyNzYsImV4cCI6MjA1NzgwNjI3Nn0.7JxXAs3GGPM_ehOvlWsVHUsy2Xddw2y4RTEn0fmNRhU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
