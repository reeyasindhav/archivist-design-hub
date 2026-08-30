import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Archiquest" },
      {
        name: "description",
        content: "Essays on materials, drawings, interiors and the ideas that shape architecture.",
      },
      { property: "og:title", content: "Journal — Archiquest" },
      {
        property: "og:description",
        content: "Essays on materials, drawings, interiors and the ideas that shape architecture.",
      },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">From the journal</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1]">
          Essays on space, materials and ideas.
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 80}>
            <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block">
              <div className="media-zoom aspect-16/10 bg-secondary">
                <img
                  src={a.cover}
                  alt={a.title}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="eyebrow">
                  {a.category} · {a.readTime}
                </p>
                <p className="mt-1 font-display text-xl group-hover:text-accent">{a.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{a.excerpt}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-ink-soft">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.author}</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
