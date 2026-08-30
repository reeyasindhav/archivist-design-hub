import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Archiquest" },
      { name: "description", content: "Update your profile and account preferences." },
    ],
  }),
  component: Settings,
});

const ROLE_OPTIONS = [
  { value: "enthusiast", label: "Design enthusiast" },
  { value: "student", label: "Student" },
  { value: "architect", label: "Architect" },
];

function Settings() {
  const { user, signIn } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<"enthusiast" | "student" | "architect">(
    user?.role ?? "enthusiast",
  );
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, name, role);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AuthenticatedLayout>
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="border-b border-border pb-6">
            <p className="eyebrow">Your space</p>
            <h1 className="mt-2 font-display text-3xl">Settings</h1>
            <p className="mt-2 text-sm text-ink-soft">
              Manage your profile information and account preferences.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as typeof role)}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              >
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" size="sm">
                Save changes
              </Button>
              {saved && <span className="text-sm text-ink-soft">Saved successfully</span>}
            </div>
          </form>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-14 border-t border-border pt-10">
            <h2 className="font-display text-xl">Account actions</h2>
            <div className="mt-6 space-y-3">
              <Link
                to="/saved"
                className="group flex items-center justify-between border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div>
                  <p className="text-sm font-medium">Saved works</p>
                  <p className="text-xs text-ink-soft">
                    View and manage your saved buildings, architects, and journal entries.
                  </p>
                </div>
                <Link to="/saved" className="eyebrow link-underline text-foreground">
                  View
                </Link>
              </Link>
              <Link
                to="/submit"
                className="group flex items-center justify-between border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div>
                  <p className="text-sm font-medium">Submit a project</p>
                  <p className="text-xs text-ink-soft">Share your work with the archive.</p>
                </div>
                <Link to="/submit" className="eyebrow link-underline text-foreground">
                  Open
                </Link>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </AuthenticatedLayout>
  );
}
