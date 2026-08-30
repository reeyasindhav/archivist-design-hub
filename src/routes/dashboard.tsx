import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  Bookmark,
  Compass,
  FileText,
  Flame,
  PenTool,
  Ruler,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";
import {
  buildings,
  architects,
  articles,
  eras,
  collections,
  type Building,
  type Architect,
  type Article,
} from "@/lib/data";
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Archiquest" },
      {
        name: "description",
        content:
          "Your personal dashboard for saved works, followed architects, and reading history.",
      },
    ],
  }),
  component: Dashboard,
});

const ROLE_LABEL: Record<string, string> = {
  enthusiast: "Enthusiast",
  student: "Student",
  architect: "Architect",
};

type Role = "enthusiast" | "student" | "architect";

type StatArgs = {
  savedBuildings: Building[];
  savedArchitects: Architect[];
  savedArticles: Article[];
  recentArticles: Article[];
};

type StatConfig = {
  icon: React.ReactNode;
  label: string;
  getValue: (args: StatArgs) => string;
  href: string;
  trend: (args: StatArgs) => string;
};

const ROLE_STATS: Record<Role, StatConfig[]> = {
  enthusiast: [
    {
      icon: <Bookmark className="size-4" />,
      label: "Saved works",
      getValue: ({ savedBuildings }) => String(savedBuildings.length),
      href: "/saved",
      trend: ({ savedBuildings }) =>
        savedBuildings.length > 0 ? `${savedBuildings.length} buildings` : "None yet",
    },
    {
      icon: <Compass className="size-4" />,
      label: "Architects",
      getValue: ({ savedArchitects }) => String(savedArchitects.length),
      href: "/architects",
      trend: ({ savedArchitects }) =>
        savedArchitects.length > 0 ? `${savedArchitects.length} followed` : "None yet",
    },
    {
      icon: <FileText className="size-4" />,
      label: "Journal",
      getValue: ({ savedArticles }) => String(savedArticles.length),
      href: "/journal",
      trend: ({ savedArticles }) =>
        savedArticles.length > 0 ? `${savedArticles.length} saved` : "None yet",
    },
    {
      icon: <Flame className="size-4" />,
      label: "Reading streak",
      getValue: ({ recentArticles }) => (recentArticles.length > 0 ? "Active" : "Start"),
      href: "/journal",
      trend: ({ recentArticles }) =>
        recentArticles.length > 0 ? `${recentArticles.length} recent` : "0 articles",
    },
  ],
  student: [
    {
      icon: <Bookmark className="size-4" />,
      label: "Saved works",
      getValue: ({ savedBuildings }) => String(savedBuildings.length),
      href: "/saved",
      trend: ({ savedBuildings }) =>
        savedBuildings.length > 0 ? `${savedBuildings.length} buildings` : "None yet",
    },
    {
      icon: <Ruler className="size-4" />,
      label: "Collections",
      getValue: ({ savedBuildings }) => String(new Set(savedBuildings.map((b) => b.era)).size),
      href: "/buildings",
      trend: ({ savedBuildings }) =>
        savedBuildings.length > 0
          ? `${new Set(savedBuildings.map((b) => b.era)).size} eras`
          : "None yet",
    },
    {
      icon: <FileText className="size-4" />,
      label: "Journal",
      getValue: ({ savedArticles }) => String(savedArticles.length),
      href: "/journal",
      trend: ({ savedArticles }) =>
        savedArticles.length > 0 ? `${savedArticles.length} saved` : "None yet",
    },
    {
      icon: <Flame className="size-4" />,
      label: "Reading streak",
      getValue: ({ recentArticles }) => (recentArticles.length > 0 ? "Active" : "Start"),
      href: "/journal",
      trend: ({ recentArticles }) =>
        recentArticles.length > 0 ? `${recentArticles.length} recent` : "0 articles",
    },
  ],
  architect: [
    {
      icon: <PenTool className="size-4" />,
      label: "Submissions",
      getValue: () => "0",
      href: "/submit",
      trend: () => "Start sharing",
    },
    {
      icon: <Users className="size-4" />,
      label: "Followers",
      getValue: () => "0",
      href: "/architects",
      trend: () => "Build audience",
    },
    {
      icon: <FileText className="size-4" />,
      label: "Journal",
      getValue: ({ savedArticles }) => String(savedArticles.length),
      href: "/journal",
      trend: ({ savedArticles }) =>
        savedArticles.length > 0 ? `${savedArticles.length} saved` : "None yet",
    },
    {
      icon: <Flame className="size-4" />,
      label: "Reading streak",
      getValue: ({ recentArticles }) => (recentArticles.length > 0 ? "Active" : "Start"),
      href: "/journal",
      trend: ({ recentArticles }) =>
        recentArticles.length > 0 ? `${recentArticles.length} recent` : "0 articles",
    },
  ],
};

const ROLE_QUICK_LINKS: Record<Role, { to: string; label: string; description: string }[]> = {
  enthusiast: [
    { to: "/submit", label: "Submit a project", description: "Share your work with the archive" },
    {
      to: "/buildings",
      label: "Browse buildings",
      description: "Filter by era, material, typology",
    },
    { to: "/architects", label: "Find architects", description: "Explore portfolios and bios" },
    {
      to: "/journal",
      label: "Read the journal",
      description: "Essays on materials, plans and ideas",
    },
    {
      to: "/settings",
      label: "Account settings",
      description: "Update your profile and preferences",
    },
  ],
  student: [
    { to: "/buildings", label: "Browse by era", description: "Study movements and timelines" },
    { to: "/buildings", label: "Study floor plans", description: "Analyze spatial layouts" },
    { to: "/journal", label: "Read essays", description: "Materials, ideas, and history" },
    { to: "/submit", label: "Submit a project", description: "Share your work with the archive" },
    {
      to: "/settings",
      label: "Account settings",
      description: "Update your profile and preferences",
    },
  ],
  architect: [
    { to: "/submit", label: "Submit a project", description: "Add work to the archive" },
    { to: "/architects", label: "Manage profile", description: "Update your portfolio" },
    { to: "/buildings", label: "Browse archive", description: "Find references and inspiration" },
    {
      to: "/journal",
      label: "Read the journal",
      description: "Essays on materials, plans and ideas",
    },
    {
      to: "/settings",
      label: "Account settings",
      description: "Update your profile and preferences",
    },
  ],
};

function Dashboard() {
  const { user, saved } = useAuth();
  const role: Role = user?.role ?? "enthusiast";

  const savedBuildings = useMemo(() => buildings.filter((b) => saved.includes(b.slug)), [saved]);
  const savedArchitects = useMemo(() => architects.filter((a) => saved.includes(a.slug)), [saved]);
  const savedArticles = useMemo(() => articles.filter((a) => saved.includes(a.slug)), [saved]);
  const recentArticles = useMemo(() => articles.slice(0, 3), []);

  const eraDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of savedBuildings) {
      counts[b.era] = (counts[b.era] || 0) + 1;
    }
    return eras
      .filter((e) => e !== "All works")
      .map((e) => ({
        era: e,
        saved: counts[e] || 0,
      }))
      .filter((d) => d.saved > 0);
  }, [savedBuildings]);

  const topCollections = useMemo(() => {
    const names = savedBuildings.map((b) => b.era);
    return collections
      .map((c) => ({
        ...c,
        matchCount: names.filter((n) => c.name.includes(n) || n.includes(c.name)).length,
      }))
      .filter((c) => c.matchCount > 0)
      .slice(0, 2);
  }, [savedBuildings]);

  const hasContent =
    savedBuildings.length > 0 || savedArchitects.length > 0 || savedArticles.length > 0;

  const statCards = ROLE_STATS[role] ?? ROLE_STATS["enthusiast"];
  const quickLinks = ROLE_QUICK_LINKS[role] ?? ROLE_QUICK_LINKS["enthusiast"];

  return (
    <AuthenticatedLayout>
      <div className="space-y-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center border border-border bg-secondary">
                <span className="font-display text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
              </div>
              <div>
                <p className="eyebrow">Your space</p>
                <h1 className="font-display text-2xl">{user?.name ?? "Guest"}</h1>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline">{ROLE_LABEL[role]}</Badge>
                  <span className="text-xs text-ink-soft">
                    {saved.length} item{saved.length === 1 ? "" : "s"} saved
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/submit">Submit work</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/buildings">Explore</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, idx) => (
              <StatCard
                key={card.label}
                icon={card.icon}
                label={card.label}
                value={card.getValue({
                  savedBuildings,
                  savedArchitects,
                  savedArticles,
                  recentArticles,
                })}
                href={card.href}
                trend={card.trend({
                  savedBuildings,
                  savedArchitects,
                  savedArticles,
                  recentArticles,
                })}
              />
            ))}
          </div>
        </Reveal>

        {eraDistribution.length > 0 && (
          <Reveal delay={120}>
            <div className="border border-border p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">{role === "student" ? "Study focus" : "Taste profile"}</p>
                  <h2 className="mt-2 font-display text-xl">
                    {role === "student" ? "Saved works by era" : "Saved works by era"}
                  </h2>
                </div>
                <TrendingUp className="size-4 text-ink-soft" strokeWidth={1.5} />
              </div>
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eraDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis
                      dataKey="era"
                      tick={{ fontSize: 12, fill: "var(--color-ink-soft)" }}
                      axisLine={{ stroke: "var(--color-border)" }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: "var(--color-ink-soft)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "var(--color-secondary)" }}
                      contentStyle={{
                        borderRadius: "0.25rem",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-background)",
                        color: "var(--color-foreground)",
                      }}
                    />
                    <Bar
                      dataKey="saved"
                      radius={[3, 3, 0, 0]}
                      fill="var(--color-accent)"
                      name="Works"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <Reveal delay={160}>
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <p className="eyebrow">Saved works</p>
                  {savedBuildings.length > 0 && (
                    <Badge variant="secondary">{savedBuildings.length}</Badge>
                  )}
                </div>
                <Link to="/saved" className="eyebrow link-underline text-foreground">
                  View all
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {savedBuildings.length > 0 ? (
                  savedBuildings.slice(0, 4).map((b) => (
                    <Link
                      key={b.slug}
                      to="/buildings/$slug"
                      params={{ slug: b.slug }}
                      className="group block border border-border p-4 transition-colors hover:bg-secondary"
                    >
                      <div className="media-zoom aspect-4/3 bg-secondary">
                        <img
                          src={b.hero}
                          alt={b.name}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                      <p className="mt-3 font-display text-base leading-snug transition-colors group-hover:text-accent">
                        {b.name}
                      </p>
                      <p className="mt-1 text-xs text-ink-soft">
                        {b.architect} · {b.city} · {b.year}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {b.materials.slice(0, 2).map((m) => (
                          <span
                            key={m}
                            className="border border-border px-1.5 py-0.5 text-[10px] tracking-[0.08em] uppercase text-ink-soft"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full border border-dashed border-border p-12 text-center">
                    <Bookmark className="mx-auto size-6 text-ink-soft" strokeWidth={1.5} />
                    <p className="mt-3 font-display text-xl">No saved works yet</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      Browse the archive and tap the heart to save works here.
                    </p>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link to="/buildings">Explore the archive</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={200}>
              <div className="border border-border p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Quick actions</p>
                  <BarChart3 className="size-4 text-ink-soft" strokeWidth={1.5} />
                </div>
                <div className="mt-5 space-y-2">
                  {quickLinks.map((link) => (
                    <QuickLink
                      key={link.label}
                      to={link.to}
                      label={link.label}
                      description={link.description}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="border border-border p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Reading history</p>
                  <Link to="/journal" className="eyebrow link-underline text-foreground">
                    All writing
                  </Link>
                </div>
                <div className="mt-5 space-y-4">
                  {recentArticles.map((a) => (
                    <Link
                      key={a.slug}
                      to="/journal/$slug"
                      params={{ slug: a.slug }}
                      className="group flex gap-3 transition-colors hover:text-accent"
                    >
                      <div className="media-zoom aspect-16/10 w-20 shrink-0 bg-secondary">
                        <img
                          src={a.cover}
                          alt={a.title}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="eyebrow">
                          {a.category} · {a.readTime}
                        </p>
                        <p className="mt-1 font-display text-sm leading-snug">{a.title}</p>
                        <p className="mt-1 text-[11px] text-ink-soft">{a.date}</p>
                      </div>
                      <ArrowUpRight
                        className="mt-1 size-3.5 shrink-0 text-ink-soft transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {hasContent && savedArchitects.length > 0 && role !== "architect" && (
          <Reveal delay={300}>
            <section className="border-t border-border bg-surface py-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">People</p>
                  <h2 className="mt-2 font-display text-xl">Followed architects</h2>
                </div>
                <Link to="/architects" className="eyebrow link-underline text-foreground">
                  View all
                </Link>
              </div>
              <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {savedArchitects.map((a) => (
                  <Link
                    key={a.slug}
                    to="/architects/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                  >
                    <div className="media-zoom aspect-[4/5] bg-secondary">
                      <img
                        src={a.portrait}
                        alt={a.name}
                        loading="lazy"
                        className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      />
                    </div>
                    <p className="mt-3 font-display text-base leading-snug transition-colors group-hover:text-accent">
                      {a.name}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {a.studio} · {a.base}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  trend: string;
}) {
  return (
    <Link
      to={href}
      className="group block border border-border p-5 transition-colors hover:bg-secondary"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-ink-soft">
          <div className="flex size-8 items-center justify-center border border-border">{icon}</div>
          <span className="eyebrow">{label}</span>
        </div>
        <ArrowUpRight
          className="size-3.5 text-ink-soft transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </div>
      <p className="mt-4 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{trend}</p>
    </Link>
  );
}

function QuickLink({ to, label, description }: { to: string; label: string; description: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 border border-border p-3 transition-colors hover:bg-secondary"
    >
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-ink-soft">{description}</p>
      </div>
      <ArrowUpRight
        className="size-3.5 text-ink-soft transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.5}
      />
    </Link>
  );
}
