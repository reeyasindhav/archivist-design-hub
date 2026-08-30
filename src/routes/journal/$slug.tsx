import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/journal/$slug")({
  head: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    if (!a) return { meta: [{ title: "Article not found — Archiquest" }] };
    return {
      meta: [
        { title: `${a.title} — Archiquest` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
      ],
    };
  },
  component: JournalArticle,
});

function JournalArticle() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
        <p className="font-display text-3xl">Article not found.</p>
        <Link to="/journal" className="mt-6 eyebrow link-underline">
          Back to journal
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-[1400px]">
      <div className="relative aspect-[16/9] lg:aspect-[21/9]">
        <img src={article.cover} alt={article.title} className="size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6 pt-20 lg:p-10 lg:pt-28">
          <Reveal>
            <Link
              to="/journal"
              className="eyebrow link-underline text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 inline size-3.5" /> Journal
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 font-display text-3xl text-white lg:text-5xl">{article.title}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-2 text-sm text-white/80">
              {article.category} · {article.readTime} · {article.date} · By {article.author}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-14 lg:px-10">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-ink-soft">{article.excerpt}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Architecture is rarely about the object alone. Every building is also a response — to
              climate, to budget, to the particular silence of a site. The works we collect here
              share that quality: they argue, they whisper, they insist.
            </p>
            <p>
              Materials are the first language. Concrete carries the memory of its formwork; glass
              publishes the weather; stone remembers the mountain it left. Understanding a building
              means reading those traces before you read the plan.
            </p>
            <p>
              Plans are arguments about movement. The width of a corridor, the height of a ceiling,
              the angle of a view — each is a decision about how a body should feel in space. The
              best plans teach you something about your own habits without saying a word.
            </p>
            <p>
              We built Archiquest because these connections deserve a single place. Not a
              marketplace, not a magazine, but a living archive — part catalogue, part sketchbook,
              part gathering space for the people who care about how space is made.
            </p>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
