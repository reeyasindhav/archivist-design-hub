import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { architects, articles, buildings, collections } from "@/lib/data";
import { BuildingCard } from "@/components/building-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Archiquest — Find the spaces that shape us" },
      {
        name: "description",
        content:
          "A curated archive of iconic buildings, interiors and floor plans. Explore by era, study plans, and follow architects worldwide.",
      },
      { property: "og:title", content: "Archiquest — Find the spaces that shape us" },
      {
        property: "og:description",
        content:
          "Explore the ideas, details and stories behind the world's most compelling architecture.",
      },
    ],
  }),
  component: Home,
});

const filters = ["All works", "Modern", "Brutalist", "Postmodern", "Contemporary"] as const;

function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All works");
  const [query, setQuery] = useState("");

  const shown = buildings
    .filter((b) => (filter === "All works" ? true : b.era === filter))
    .filter((b) =>
      query.trim()
        ? `${b.name} ${b.architect} ${b.city}`.toLowerCase().includes(query.toLowerCase())
        : true,
    )
    .slice(0, 6);

  const feature = articles[0]!;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-10 pb-20 lg:grid-cols-[1.05fr_1fr] lg:px-10 lg:pt-16 lg:pb-28">
        <div className="animate-fade-up">
          <p className="rule-label">A living archive of space</p>
          <h1 className="mt-6 text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.95]">
            Find the spaces
            <br />
            that <em className="text-accent italic">shape</em> us.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Explore the ideas, details and stories behind the world's most compelling
            architecture. A curated atlas for curious minds.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-9 flex max-w-md items-center gap-3 border-b border-foreground/40 pb-3 transition-colors focus-within:border-accent"
          >
            <Search className="size-4 text-ink-soft" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search buildings, architects, places…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft"
            />
            <span className="border border-border px-1.5 py-0.5 text-[10px] text-ink-soft">
              ⌘ K
            </span>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
            <span className="eyebrow">Popular:</span>
            {["Bauhaus", "Concrete", "Small spaces"].map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t === "Concrete" ? "" : t)}
                className="link-underline text-foreground/80"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <Link
            to="/journal/$slug"
            params={{ slug: feature.slug }}
            className="media-zoom group relative block aspect-4/3 bg-secondary"
          >
            <img
              src={feature.cover}
              alt={feature.title}
              className="size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-6 pt-16">
              <p className="text-[11px] tracking-[0.18em] text-white/70 uppercase">
                Featured study — 01
              </p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl text-white lg:text-3xl">
                  {feature.title}
                </h2>
                <ArrowUpRight
                  className="size-5 text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Collection with era filter tabs */}
      <section className="border-y border-border bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The collection</p>
              <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)]">Begin your exploration</h2>
            </div>
            <Link
              to="/buildings"
              className="eyebrow link-underline flex items-center gap-2 text-foreground"
            >
              View all works <ArrowUpRight className="size-3.5" />
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-border pb-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative pb-2 text-[11px] tracking-[0.16em] uppercase transition-colors",
                  filter === f ? "text-accent" : "text-ink-soft hover:text-foreground",
                )}
              >
                {f}
                <span
                  className={cn(
                    "absolute -bottom-[13px] left-0 h-px w-full bg-accent transition-transform duration-500",
                    filter === f ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((b, i) => (
              <Reveal key={b.slug} delay={i * 70}>
                <BuildingCard building={b} index={i} />
              </Reveal>
            ))}
          </div>
          {shown.length === 0 && (
            <p className="mt-12 font-display text-2xl text-ink-soft">
              No works match that search yet.
            </p>
          )}
        </div>
      </section>

      {/* Collections strip */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <Reveal>
          <p className="eyebrow">Curated threads</p>
          <h2 className="mt-2 max-w-2xl text-[clamp(1.75rem,3.4vw,2.6rem)]">
            Follow a single idea across a century of building.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <Link to="/buildings" className="media-zoom group relative block aspect-3/4">
                <img src={c.cover} alt={c.name} loading="lazy" className="size-full object-cover" />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
                <div className="absolute bottom-0 p-5">
                  <p className="font-display text-xl text-white">{c.name}</p>
                  <p className="text-[11px] tracking-[0.16em] text-white/70 uppercase">
                    {c.count} works
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Architects */}
      <section className="border-t border-border bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="rule-label">For the makers</p>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02]">
                A place for the people behind the places.
              </h2>
            </div>
            <div>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Build a portfolio that shows more than the finished image. Share your
                process, plans and the thinking that brings a space to life.
              </p>
              <Link
                to="/architects"
                className="mt-7 inline-flex items-center gap-3 border border-foreground px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explore architect profiles <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {architects.slice(0, 4).map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <Link
                  to="/architects/$slug"
                  params={{ slug: a.slug }}
                  className="group block"
                >
                  <div className="media-zoom aspect-square bg-secondary">
                    <img
                      src={a.portrait}
                      alt={a.name}
                      loading="lazy"
                      className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-4 font-display text-xl group-hover:text-accent">{a.name}</p>
                  <p className="text-xs text-ink-soft">
                    {a.studio} · {a.base}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)]">From the journal</h2>
          <Link to="/journal" className="eyebrow link-underline text-foreground">
            All writing
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {articles.slice(1, 4).map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link
                to="/journal/$slug"
                params={{ slug: a.slug }}
                className="group block"
              >
                <div className="media-zoom aspect-16/10 bg-secondary">
                  <img src={a.cover} alt={a.title} loading="lazy" className="size-full object-cover" />
                </div>
                <p className="mt-4 eyebrow">
                  {a.category} · {a.readTime}
                </p>
                <p className="mt-1 font-display text-xl group-hover:text-accent">{a.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
