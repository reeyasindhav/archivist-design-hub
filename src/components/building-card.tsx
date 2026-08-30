import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Building } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function BuildingCard({ building, index }: { building: Building; index: number }) {
  const { isSaved, toggleSaved } = useAuth();
  const saved = isSaved(building.slug);

  return (
    <article className="group">
      <div className="media-zoom relative aspect-4/3 bg-secondary">
        <Link to="/buildings/$slug" params={{ slug: building.slug }} aria-label={building.name}>
          <img
            src={building.hero}
            alt={`${building.name} by ${building.architect}`}
            loading="lazy"
            className="size-full object-cover"
          />
        </Link>
        <span className="absolute bottom-0 left-0 bg-background/90 px-2.5 py-1 font-display text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>
        <button
          onClick={() => toggleSaved(building.slug)}
          aria-label={saved ? "Remove from saved" : "Save work"}
          className={cn(
            "absolute top-3 right-3 flex size-9 items-center justify-center bg-background/90 transition-all duration-300 hover:scale-110",
            saved && "bg-accent text-accent-foreground",
          )}
        >
          <Heart className={cn("size-4", saved && "fill-current")} strokeWidth={1.5} />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link
            to="/buildings/$slug"
            params={{ slug: building.slug }}
            className="font-display text-xl leading-snug transition-colors group-hover:text-accent"
          >
            {building.name}
          </Link>
          <p className="mt-1 text-xs text-ink-soft">
            {building.architect} · {building.city}, {building.country} · {building.year}
          </p>
        </div>
        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-ink-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
          strokeWidth={1.5}
        />
      </div>
    </article>
  );
}
