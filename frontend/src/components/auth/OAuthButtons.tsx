const API = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function OAuthButtons() {
  const go = (p: string) => { window.location.href = `${API}${p}`; };

  return (
    <div>
      {/* keep your styles/classes; only onClick is new */}
      <button onClick={() => go("/oauth/login/google")}>Continue with Google</button>
      <button onClick={() => go("/oauth/login/github")}>Continue with GitHub</button>
    </div>
  );
}
