export const config = {
  supabaseUrl: process.env.VITE_SUPABASE_URL!,
  supabaseServiceKey: process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!,
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret'
};