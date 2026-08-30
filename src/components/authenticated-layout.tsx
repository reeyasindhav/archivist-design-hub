import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignOutConfirm } from "@/components/sign-out-dialog";

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [ready, user, navigate]);

  if (!ready) {
    return <div className="py-10 text-center text-sm text-ink-soft">Loading…</div>;
  }

  if (!user) {
    return <div className="py-10 text-center text-sm text-ink-soft">Redirecting…</div>;
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="eyebrow">Your space</p>
          <h1 className="font-display text-2xl">Welcome, {user.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="eyebrow link-underline text-foreground">
            Back to archive
          </Link>
          <Link to="/settings" className="eyebrow link-underline text-foreground">
            Settings
          </Link>
          <SignOutConfirm
            trigger={
              <button className="border border-border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-secondary">
                Sign out
              </button>
            }
          />
        </div>
      </div>
      <div className="py-10">{children}</div>
    </div>
  );
}
