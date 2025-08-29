import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function OAuthCallback() {
  const { refreshMe } = useAuth();
  const nav = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        await refreshMe(); // backend already set cookies during OAuth
      } finally {
        const params = new URLSearchParams(search);
        const next = params.get("next") || "/";
        nav(next, { replace: true });
      }
    })();
  }, [refreshMe, nav, search]);

  return null; // or your tiny "Signing you in..." loader
}
