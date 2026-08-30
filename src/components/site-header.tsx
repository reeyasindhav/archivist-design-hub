import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Compass } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { SignOutConfirm } from "@/components/sign-out-dialog";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/buildings", label: "Discover" },
  { to: "/architects", label: "Architects" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-90">
            <Compass className="size-4" strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl tracking-tight">archiquest</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow link-underline text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "!text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="border border-border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-secondary"
              >
                Dashboard
              </Link>
              <SignOutConfirm
                trigger={
                  <button className="bg-primary px-4 py-2 text-[11px] tracking-[0.14em] text-primary-foreground uppercase transition-opacity hover:opacity-85">
                    Sign out
                  </button>
                }
              />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-secondary"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-primary px-4 py-2 text-[11px] tracking-[0.14em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
              >
                Join archiquest
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background px-5 pb-6 md:hidden">
          <nav className="flex flex-col divide-y divide-border">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="py-4 font-display text-2xl">
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link to="/dashboard" className="py-4 font-display text-2xl">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="py-4 font-display text-2xl">
                  Sign in
                </Link>
                <Link to="/signup" className="py-4 font-display text-2xl text-accent">
                  Join archiquest
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
