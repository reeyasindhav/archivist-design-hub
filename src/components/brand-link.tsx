import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export function BrandLink({ className }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="flex size-7 items-center justify-center bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-90">
        <Compass className="size-4" strokeWidth={1.5} />
      </span>
      <span className="font-display text-xl tracking-tight">archiquest</span>
    </Link>
  );
}
