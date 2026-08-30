import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getBuilding, buildings, architects } from "@/lib/data";
import { BuildingCard } from "@/components/building-card";
import { FloorPlanViewer } from "@/components/floor-plan-viewer";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buildings/$slug")({
  head: ({ params }) => {
    const b = getBuilding(params.slug);
    if (!b) return { meta: [{ title: "Building not found — Archiquest" }] };
    return {
      meta: [
        { title: `${b.name} — Archiquest` },
        {
          name: "description",
          content: b.blurb,
        },
        { property: "og:title", content: `${b.name} — Archiquest` },
        { property: "og:description", content: b.blurb },
      ],
    };
  },
  component: BuildingProfile,
});

function BuildingProfile() {
  const { slug } = Route.useParams();
  const building = getBuilding(slug);
  const { isSaved, toggleSaved } = useAuth();

  if (!building) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <p className="font-display text-3xl">Work not found.</p>
        <Link to="/buildings" className="mt-6 eyebrow link-underline">
          Back to the archive
        </Link>
      </div>
    );
  }

  const architect = architects.find((a) => a.slug === building.architectSlug);
  const related = buildings.filter(
    (b) => b.architectSlug === building.architectSlug && b.slug !== building.slug,
  );
  const saved = isSaved(building.slug);

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Hero */}
      <div className="relative aspect-[16/9] lg:aspect-[21/9]">
        <img src={building.hero} alt={building.name} className="size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6 pt-20 lg:p-10 lg:pt-28">
          <Reveal>
            <Link
              to="/buildings"
              className="eyebrow link-underline text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 inline size-3.5" /> Back to collection
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 font-display text-4xl text-white lg:text-6xl">{building.name}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-2 text-sm text-white/80 lg:text-base">
              {building.architect} · {building.city}, {building.country} · {building.year}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Actions bar */}
      <div className="mx-auto max-w-[1400px] border-b border-border px-5 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {building.materials.map((m) => (
              <span
                key={m}
                className="border border-border px-2.5 py-1 text-[11px] tracking-[0.1em] uppercase"
              >
                {m}
              </span>
            ))}
            <span className="border border-border px-2.5 py-1 text-[11px] tracking-[0.1em] uppercase">
              {building.era}
            </span>
            <span className="border border-border px-2.5 py-1 text-[11px] tracking-[0.1em] uppercase">
              {building.typology}
            </span>
          </div>
          <button
            onClick={() => toggleSaved(building.slug)}
            className={cn(
              "flex items-center gap-2 border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors",
              saved
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:bg-secondary",
            )}
          >
            {saved ? "Saved" : "Save work"}
          </button>
        </div>
      </div>

      {/* Story + Facts */}
      <div className="mx-auto max-w-[1400px] grid gap-10 px-5 py-14 lg:grid-cols-[1fr_320px] lg:px-10">
        <div className="space-y-6">
          {building.story.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p}</p>
            </Reveal>
          ))}
        </div>
        <aside className="space-y-6">
          <div className="border border-border p-6">
            <p className="eyebrow">Facts</p>
            <dl className="mt-4 space-y-3">
              {building.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex justify-between gap-4 border-b border-border pb-2 last:border-0"
                >
                  <dt className="text-xs text-ink-soft">{f.label}</dt>
                  <dd className="font-display text-sm">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {architect && (
            <Link
              to="/architects/$slug"
              params={{ slug: architect.slug }}
              className="media-zoom group block border border-border"
            >
              <div className="aspect-[4/3] bg-secondary">
                <img
                  src={architect.cover}
                  alt={architect.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="eyebrow">Architect</p>
                <p className="mt-1 font-display text-xl group-hover:text-accent">
                  {architect.name}
                </p>
                <p className="text-xs text-ink-soft">
                  {architect.studio} · {architect.base}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase">
                  View profile <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          )}
        </aside>
      </div>

      {/* Gallery */}
      <section className="border-t border-border bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.6rem)]">More views</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {building.gallery.map((src, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="media-zoom aspect-4/3 bg-secondary">
                  <img
                    src={src}
                    alt={`${building.name} view ${i + 1}`}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Plan */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Spatial understanding</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.6rem)]">Study the plan</h2>
          </Reveal>
          <Reveal delay={100}>
            <FloorPlanViewer
              level={building.plan.level}
              area={building.plan.area}
              rooms={building.plan.rooms}
            />
          </Reveal>
        </div>
      </section>

      {/* Related works by same architect */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-14 lg:py-20">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <Reveal>
              <p className="eyebrow">More by {building.architect}</p>
              <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.6rem)]">Related works</h2>
            </Reveal>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b, i) => (
                <Reveal key={b.slug} delay={i * 70}>
                  <BuildingCard building={b} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
