import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { buildings, architects, articles } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { Reveal } from "@/components/reveal";
import { BuildingCard } from "@/components/building-card";
import { AuthenticatedLayout } from "@/components/authenticated-layout";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved works — Archiquest" },
      { name: "description", content: "Your saved buildings, architects and journal articles." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { saved } = useAuth();
  const savedBuildings = buildings.filter((b) => saved.includes(b.slug));
  const savedArchitects = architects.filter((a) => saved.includes(a.slug));
  const savedArticles = articles.filter((a) => saved.includes(a.slug));

  return (
    <AuthenticatedLayout>
      <div className="space-y-10">
        <Reveal>
          <p className="eyebrow">Your archive</p>
          <h1 className="font-display text-3xl">Saved works</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {saved.length === 0
              ? "You haven't saved anything yet. Browse the archive and tap the heart icon."
              : `${saved.length} item${saved.length === 1 ? "" : "s"} saved`}
          </p>
        </Reveal>

        {savedBuildings.length > 0 && (
          <Reveal delay={100}>
            <div>
              <p className="eyebrow">Buildings</p>
              <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {savedBuildings.map((b, i) => (
                  <BuildingCard key={b.slug} building={b} index={i} />
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {savedArchitects.length > 0 && (
          <Reveal delay={200}>
            <div className="border-t border-border pt-10">
              <p className="eyebrow">Architects</p>
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
                    <p className="mt-3 font-display text-xl group-hover:text-accent">{a.name}</p>
                    <p className="text-xs text-ink-soft">
                      {a.studio} · {a.base}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {savedArticles.length > 0 && (
          <Reveal delay={300}>
            <div className="border-t border-border pt-10">
              <p className="eyebrow">Journal articles</p>
              <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {savedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                  >
                    <div className="media-zoom aspect-16/10 bg-secondary">
                      <img
                        src={a.cover}
                        alt={a.title}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                    <p className="mt-3 font-display text-lg group-hover:text-accent">{a.title}</p>
                    <p className="text-xs text-ink-soft">
                      {a.category} · {a.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {saved.length === 0 && (
          <Reveal delay={100}>
            <div className="border border-dashed border-border p-16 text-center">
              <Heart className="mx-auto size-8 text-ink-soft" strokeWidth={1.5} />
              <p className="mt-4 font-display text-2xl">Nothing saved yet</p>
              <p className="mt-2 text-sm text-ink-soft">
                Browse the archive and tap the heart icon on any work to save it here.
              </p>
              <Link
                to="/buildings"
                className="mt-6 inline-flex items-center gap-3 border border-foreground px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explore the archive
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
