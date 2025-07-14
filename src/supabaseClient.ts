import { createClient } from "@supabase/supabase-js";

// نقرأ البيانات من ملف البيئة .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
