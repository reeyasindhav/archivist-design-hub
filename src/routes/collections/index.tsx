import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — Archiquest" },
      {
        name: "description",
        content: "Curated sets of buildings, interiors and ideas from the Archiquest archive.",
      },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">Curated sets</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1]">
          Collections that group the archive by mood, material and idea.
        </h1>
        <p className="mt-6 max-w-xl text-sm text-ink-soft">
          Each collection is a hand-picked selection of works meant to be read as a sequence rather
          than searched one by one.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection, i) => (
          <Reveal key={collection.slug} delay={(i % 3) * 80}>
            <Link
              to="/collections/$slug"
              params={{ slug: collection.slug }}
              className="group block"
            >
              <div className="media-zoom aspect-[4/3] bg-secondary">
                <img
                  src={collection.cover}
                  alt={collection.name}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <h2 className="font-display text-xl leading-snug transition-colors group-hover:text-accent">
                  {collection.name}
                </h2>
                <span className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">
                  {collection.count} works
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{collection.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
