// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bsyquykksfkdnqevcext.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzeXF1eWtrc2ZrZG5xZXZjZXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTA3NzAsImV4cCI6MjA2NTQ4Njc3MH0.pAnZaCuE9aIVo2Fcm8WCZl7uQ9Wh9VbEZnJpbNU_DtU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);