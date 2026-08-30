import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Feather, Globe, Layers, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Archiquest" },
      {
        name: "description",
        content:
          "Archiquest is a curated atlas of iconic buildings, interiors, floor plans, and the architects behind them.",
      },
      { property: "og:title", content: "About — Archiquest" },
      {
        property: "og:description",
        content:
          "A curated atlas of iconic buildings, interiors, floor plans and the architects behind them.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Compass,
    title: "Curated, not algorithmic",
    body: "Every work is selected by editors, not engagement metrics. We favour buildings with a story worth telling over those with the most clicks.",
  },
  {
    icon: Layers,
    title: "Plans over pretty pictures",
    body: "We believe a floor plan teaches more than a hero image. Every profile includes a study-level floor plan you can explore.",
  },
  {
    icon: Globe,
    title: "Global by design",
    body: "From Mexico City to Tokyo, from 1932 to today — the archive crosses eras, climates and typologies without favour.",
  },
  {
    icon: Users,
    title: "Made for makers",
    body: "Architects get dedicated portfolio pages, submission tools, and a direct line to a global audience of design lovers and students.",
  },
  {
    icon: Feather,
    title: "Open and respectful",
    body: "All imagery is sourced from open-licence photography. No generated images, no hidden rights. If we use it, we credit it.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">About the archive</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1]">
          A living archive of space.
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Archiquest is a curated atlas of iconic buildings, interiors, floor plans, and the
          architects behind them. We built it for anyone who has ever stood in a space and wanted to
          know more — the students, the travellers, the designers, and the architects themselves.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 80}>
            <div className="border border-border p-6 transition-colors hover:bg-secondary">
              <v.icon className="size-5 text-accent" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-20 border-t border-border py-14 lg:py-20">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.6rem)]">
              Submit a work or suggest a story.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Architects and studios can submit completed projects directly to the archive.
              Journalists and researchers can pitch long-form essays for the journal.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/submit"
                className="inline-flex items-center gap-3 border border-foreground px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Submit a work <ArrowRight className="size-3.5" />
              </Link>
              <Link to="/journal" className="eyebrow link-underline text-foreground">
                Read the journal
              </Link>
            </div>
          </div>
          <div className="media-zoom aspect-[4/3] bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80"
              alt="Architecture detail"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
