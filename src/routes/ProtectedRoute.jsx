import { Navigate, useLocation } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabaseClient';

// Authentication routes will pass a real session here once Supabase credentials
// are provided. Local simulation is deliberately accessible during Phase 1–2.
export default function ProtectedRoute({ children, session = null }) {
  const location = useLocation();
  if (isSupabaseConfigured && !session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
