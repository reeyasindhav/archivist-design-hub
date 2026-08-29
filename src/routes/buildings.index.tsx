import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, Rows3, Search, SlidersHorizontal } from "lucide-react";
import { buildings, eras } from "@/lib/data";
import { BuildingCard } from "@/components/building-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buildings/")({
  head: () => ({
    meta: [
      { title: "Discover buildings — Archiquest" },
      {
        name: "description",
        content:
          "Browse iconic buildings and interiors by style era, typology and material. Filter, sort and save works to your archive.",
      },
      { property: "og:title", content: "Discover buildings — Archiquest" },
      {
        property: "og:description",
        content: "Filter iconic architecture by era, typology and material.",
      },
    ],
  }),
  component: BuildingsIndex,
});

const sorts = ["Newest first", "Oldest first", "A–Z"] as const;

function BuildingsIndex() {
  const [era, setEra] = useState<(typeof eras)[number]>("All works");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Newest first");
  const [query, setQuery] = useState("");
  const [dense, setDense] = useState(false);
  const [material, setMaterial] = useState<string | null>(null);

  const materials = useMemo(
    () => Array.from(new Set(buildings.flatMap((b) => b.materials))).sort(),
    [],
  );

  const list = useMemo(() => {
    let out = buildings.filter((b) => (era === "All works" ? true : b.era === era));
    if (material) out = out.filter((b) => b.materials.includes(material));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((b) =>
        `${b.name} ${b.architect} ${b.city} ${b.country} ${b.typology}`
          .toLowerCase()
          .includes(q),
      );
    }
    return [...out].sort((a, b) =>
      sort === "A–Z" ? a.name.localeCompare(b.name) : sort === "Oldest first" ? a.year - b.year : b.year - a.year,
    );
  }, [era, material, query, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">The collection</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1]">
          {list.length} works, catalogued by era and intent.
        </h1>
      </Reveal>

      {/* Filter bar */}
      <div className="mt-12 border-y border-border py-4">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <SlidersHorizontal className="size-4 text-ink-soft" strokeWidth={1.5} />
          {eras.map((e) => (
            <button
              key={e}
              onClick={() => setEra(e)}
              className={cn(
                "relative text-[11px] tracking-[0.16em] uppercase transition-colors",
                era === e ? "text-accent" : "text-ink-soft hover:text-foreground",
              )}
            >
              {e}
              <span
                className={cn(
                  "absolute -bottom-[17px] left-0 h-px w-full bg-accent transition-transform duration-500",
                  era === e ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 border-b border-border pb-1">
              <Search className="size-3.5 text-ink-soft" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the archive"
                className="w-40 bg-transparent text-xs outline-none placeholder:text-ink-soft"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="border border-border bg-transparent px-2.5 py-1.5 text-[11px] tracking-[0.12em] uppercase outline-none"
            >
              {sorts.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="flex border border-border">
              <button
                aria-label="Comfortable grid"
                onClick={() => setDense(false)}
                className={cn("p-2", !dense && "bg-primary text-primary-foreground")}
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                aria-label="Dense grid"
                onClick={() => setDense(true)}
                className={cn("p-2", dense && "bg-primary text-primary-foreground")}
              >
                <Rows3 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Material</span>
          {materials.map((m) => (
            <button
              key={m}
              onClick={() => setMaterial(material === m ? null : m)}
              className={cn(
                "border border-border px-2.5 py-1 text-[11px] tracking-[0.1em] uppercase transition-colors",
                material === m ? "border-accent bg-accent text-accent-foreground" : "hover:bg-secondary",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mt-12 grid gap-x-6 gap-y-12",
          dense ? "sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {list.map((b, i) => (
          <Reveal key={b.slug} delay={(i % 4) * 70}>
            <BuildingCard building={b} index={i} />
          </Reveal>
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-20 border border-dashed border-border p-16 text-center">
          <p className="font-display text-3xl">Nothing in the archive matches.</p>
          <p className="mt-2 text-sm text-ink-soft">Try clearing a filter or two.</p>
        </div>
      )}
    </div>
  );
}
