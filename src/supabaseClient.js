
import { createClient } from '@supabase/supabase-js';

// TODO: REPLACE WITH YOUR SUPABASE CONFIGURATION
// 1. Go to app.supabase.com
// 2. Create a new project
// 3. Project Settings -> API
// 4. Copy URL and anon (public) Key
export const supabaseUrl = 'https://pytnfdsbosriztxytism.supabase.co';
export const supabaseKey = 'sb_publishable_-8Kjg8oWvH4Cm4byw-NJ7A_JHDgKsVA';

export const supabase = createClient(supabaseUrl, supabaseKey);
