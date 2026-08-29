import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Client-side mock auth + saved-works store (localStorage).
 * Intentionally no backend — all content on Archiquest is mock data.
 */

export type User = {
  name: string;
  email: string;
  role: "enthusiast" | "student" | "architect";
};

type AuthState = {
  user: User | null;
  ready: boolean;
  saved: string[];
  signIn: (email: string, name?: string, role?: User["role"]) => void;
  signOut: () => void;
  toggleSaved: (slug: string) => void;
  isSaved: (slug: string) => boolean;
};

const USER_KEY = "archiquest.user";
const SAVED_KEY = "archiquest.saved";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(USER_KEY);
      if (rawUser) setUser(JSON.parse(rawUser) as User);
      const rawSaved = localStorage.getItem(SAVED_KEY);
      if (rawSaved) setSaved(JSON.parse(rawSaved) as string[]);
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  const signIn = useCallback(
    (email: string, name?: string, role: User["role"] = "enthusiast") => {
      const next: User = {
        email,
        name: name?.trim() || (email.split("@")[0] ?? "Guest").replace(/[._-]/g, " "),
        role,
      };
      setUser(next);
      localStorage.setItem(USER_KEY, JSON.stringify(next));
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      ready,
      saved,
      signIn,
      signOut,
      toggleSaved,
      isSaved: (slug: string) => saved.includes(slug),
    }),
    [user, ready, saved, signIn, signOut, toggleSaved],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
