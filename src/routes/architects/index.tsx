import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { architects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/architects/")({
  head: () => ({
    meta: [
      { title: "Architects — Archiquest" },
      {
        name: "description",
        content:
          "Meet the architects behind iconic buildings. Explore portfolios, biographies, and award-winning projects.",
      },
      { property: "og:title", content: "Architects — Archiquest" },
      {
        property: "og:description",
        content: "Meet the architects behind iconic buildings.",
      },
    ],
  }),
  component: ArchitectsIndex,
});

function ArchitectsIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">For the makers</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1]">
          The people behind the places.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Build a portfolio that shows more than the finished image. Share your process, plans, and
          the thinking that brings a space to life.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {architects.map((a, i) => (
          <Reveal key={a.slug} delay={i * 70}>
            <Link to="/architects/$slug" params={{ slug: a.slug }} className="group block">
              <div className="media-zoom aspect-[4/5] bg-secondary">
                <img
                  src={a.portrait}
                  alt={a.name}
                  loading="lazy"
                  className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl leading-snug transition-colors group-hover:text-accent">
                    {a.name}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {a.studio} · {a.base}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">{a.followers} followers</p>
                </div>
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-ink-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
