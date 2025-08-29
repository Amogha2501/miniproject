import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { ready, user } = useAuth();
  const loc = useLocation();
  if (!ready) return null; // or your spinner
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />;
  return children;
}
