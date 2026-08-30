import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getArchitect, buildingsByArchitect } from "@/lib/data";
import { BuildingCard } from "@/components/building-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/architects/$slug")({
  head: ({ params }) => {
    const a = getArchitect(params.slug);
    if (!a) return { meta: [{ title: "Architect not found — Archiquest" }] };
    return {
      meta: [
        { title: `${a.name} — Archiquest` },
        {
          name: "description",
          content: a.bio,
        },
        { property: "og:title", content: `${a.name} — Archiquest` },
        { property: "og:description", content: a.bio },
      ],
    };
  },
  component: ArchitectProfile,
});

function ArchitectProfile() {
  const { slug } = Route.useParams();
  const architect = getArchitect(slug);
  const works = buildingsByArchitect(slug);

  if (!architect) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <p className="font-display text-3xl">Architect not found.</p>
        <Link to="/architects" className="mt-6 eyebrow link-underline">
          Back to architects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Cover */}
      <div className="relative aspect-[16/9] lg:aspect-[21/9]">
        <img src={architect.cover} alt={architect.name} className="size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6 pt-20 lg:p-10 lg:pt-28">
          <Reveal>
            <Link
              to="/architects"
              className="eyebrow link-underline text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 inline size-3.5" /> All architects
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 font-display text-4xl text-white lg:text-6xl">{architect.name}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-2 text-sm text-white/80 lg:text-base">
              {architect.studio} · {architect.base} · Est. {architect.founded}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bio + Details */}
      <div className="mx-auto max-w-[1400px] grid gap-10 px-5 py-14 lg:grid-cols-[1fr_340px] lg:px-10">
        <div className="space-y-6">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-ink-soft">{architect.bio}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2">
              {architect.disciplines.map((d) => (
                <span
                  key={d}
                  className="border border-border px-3 py-1.5 text-[11px] tracking-[0.1em] uppercase"
                >
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <aside className="space-y-6">
          <div className="border border-border p-6">
            <p className="eyebrow">Awards</p>
            <ul className="mt-4 space-y-2">
              {architect.awards.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border p-6">
            <p className="eyebrow">Following</p>
            <p className="mt-2 font-display text-3xl">{architect.followers}</p>
            <p className="text-xs text-ink-soft">followers on Archiquest</p>
          </div>
        </aside>
      </div>

      {/* Works */}
      <section className="border-t border-border bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.6rem)]">
              Works by {architect.name.split(" ")[0]}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((b, i) => (
              <Reveal key={b.slug} delay={i * 70}>
                <BuildingCard building={b} index={i} />
              </Reveal>
            ))}
          </div>
          {works.length === 0 && (
            <p className="mt-12 font-display text-2xl text-ink-soft">No works listed yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
