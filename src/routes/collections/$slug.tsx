import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { buildings, getCollection } from "@/lib/data";
import { BuildingCard } from "@/components/building-card";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) {
      return { meta: [{ title: "Collection not found — Archiquest" }] };
    }
    return {
      meta: [
        { title: `${collection.name} — Archiquest` },
        {
          name: "description",
          content: collection.description,
        },
        { property: "og:title", content: `${collection.name} — Archiquest` },
        { property: "og:description", content: collection.description },
      ],
    };
  },
  component: CollectionDetail,
});

function CollectionDetail() {
  const { slug } = Route.useParams();
  const collection = getCollection(slug);

  const list = useMemo(
    () =>
      collection
        ? collection.buildings
            .map((bSlug) => buildings.find((b) => b.slug === bSlug))
            .filter((b): b is NonNullable<typeof b> => Boolean(b))
        : [],
    [collection],
  );

  if (!collection) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <p className="font-display text-3xl">Collection not found.</p>
        <Link to="/collections" className="mt-6 eyebrow link-underline">
          Back to collections
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <Reveal>
        <Link
          to="/collections"
          className="eyebrow link-underline inline-flex items-center gap-2 text-foreground"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          All collections
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="rule-label">Collection</p>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1]">{collection.name}</h1>
            <p className="mt-6 max-w-xl text-sm text-ink-soft">{collection.description}</p>
          </div>
          <div className="media-zoom aspect-[4/3] bg-secondary lg:aspect-[16/10]">
            <img
              src={collection.cover}
              alt={collection.name}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-14 flex items-center justify-between border-y border-border py-4">
          <p className="eyebrow">{list.length} works in this collection</p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b, i) => (
          <Reveal key={b.slug} delay={(i % 3) * 80}>
            <BuildingCard building={b} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
