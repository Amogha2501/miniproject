import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import  api from "@/lib/api";

export type User = { id: string; email: string; name?: string; avatarUrl?: string; role?: string };

type AuthCtx = {
  user: User | null;
  ready: boolean;                 // true once we’ve checked /auth/me
  login: (email: string, password: string) => Promise<void>;
  register: (p: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const refreshMe = async () => {
    try {
      const { data } = await api.get<User>("/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => { refreshMe(); }, []);

  const login = async (email: string, password: string) => {
    await api.post("/auth/login", { email, password });
    await refreshMe();
  };

  const register = async (p: { name: string; email: string; password: string }) => {
    await api.post("/auth/register", p);
    await refreshMe();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, ready, login, register, logout, refreshMe }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
