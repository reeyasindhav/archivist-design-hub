import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Reveal } from "@/components/reveal";
import { BrandLink } from "@/components/brand-link";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Archiquest" },
      {
        name: "description",
        content: "Sign in to save works, follow architects, and submit projects.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn, user, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"enthusiast" | "student" | "architect">("enthusiast");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted && ready && user) {
      navigate({ to: "/dashboard" });
    }
  }, [submitted, ready, user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signIn(email, name, role);
    setSubmitted(true);
  };

  if (submitted && ready && user) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="mx-auto max-w-md text-center">
          <p className="font-display text-2xl">Signing you in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <BrandLink className="mb-12" />
      <div className="mx-auto grid max-w-5xl lg:grid-cols-[1fr_420px]">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Reveal>
              <div className="media-zoom aspect-[4/5] bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural interior"
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <p className="mt-6 font-display text-2xl leading-snug">A living archive of space.</p>
              <p className="mt-2 text-sm text-ink-soft">
                Explore iconic buildings, interiors, and floor plans — and the people who drew them.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="lg:pl-12">
          <Reveal>
            <p className="rule-label">Welcome back</p>
            <h1 className="mt-4 font-display text-3xl">Sign in to Archiquest</h1>
            <p className="mt-2 text-sm text-ink-soft">
              Save works, follow architects, and submit your own projects.
            </p>
          </Reveal>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.16em] uppercase text-ink-soft">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.16em] uppercase text-ink-soft">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.16em] uppercase text-ink-soft">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as typeof role)}
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              >
                <option value="enthusiast">Enthusiast</option>
                <option value="student">Student</option>
                <option value="architect">Architect</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-primary px-6 py-3 text-[11px] tracking-[0.16em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link to="/signup" className="link-underline text-foreground">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
