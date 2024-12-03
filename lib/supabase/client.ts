import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = 'https://ageqkxyvbdwtcmpmllsq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZXFreHl2YmR3dGNtcG1sbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNTA4MTcsImV4cCI6MjA0ODgyNjgxN30.kbbQRcW0E72_O2iFwQYtvbDr6uxqnnDxf8b2ByPXt3Y';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);