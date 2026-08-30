import { useState } from "react";
import { Minus, Plus, RotateCcw, Ruler, Tag } from "lucide-react";
import type { Room } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Interactive floor plan viewer: zoom, room hover/selection, label + dimension
 * toggles. Pure SVG so it stays crisp at any zoom level.
 */
export function FloorPlanViewer({
  level,
  area,
  rooms,
}: {
  level: string;
  area: string;
  rooms: Room[];
}) {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState<string | null>(rooms[0]?.id ?? null);
  const [labels, setLabels] = useState(true);
  const [dims, setDims] = useState(false);

  const activeRoom = rooms.find((r) => r.id === active);
  const clamp = (z: number) => Math.min(2.2, Math.max(0.7, z));

  return (
    <div className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div>
          <p className="eyebrow">Floor plan viewer</p>
          <p className="font-display text-lg">
            {level} <span className="text-ink-soft">· {area}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            active={labels}
            onClick={() => setLabels((v) => !v)}
            icon={<Tag className="size-3.5" />}
          >
            Labels
          </Toggle>
          <Toggle
            active={dims}
            onClick={() => setDims((v) => !v)}
            icon={<Ruler className="size-3.5" />}
          >
            Areas
          </Toggle>
          <div className="ml-1 flex items-center border border-border">
            <IconBtn onClick={() => setZoom((z) => clamp(z - 0.2))} label="Zoom out">
              <Minus className="size-3.5" />
            </IconBtn>
            <span className="w-12 border-x border-border py-1.5 text-center text-[11px] tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <IconBtn onClick={() => setZoom((z) => clamp(z + 0.2))} label="Zoom in">
              <Plus className="size-3.5" />
            </IconBtn>
            <IconBtn onClick={() => setZoom(1)} label="Reset zoom">
              <RotateCcw className="size-3.5" />
            </IconBtn>
          </div>
        </div>
      </div>

      <div className="hairline-grid overflow-hidden bg-surface p-4">
        <div
          className="origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg viewBox="0 0 1000 640" className="w-full" role="img" aria-label={`${level} plan`}>
            <rect
              x="40"
              y="80"
              width="930"
              height="500"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="6"
            />
            {rooms.map((room) => {
              const isActive = room.id === active;
              return (
                <g
                  key={room.id}
                  onMouseEnter={() => setActive(room.id)}
                  onClick={() => setActive(room.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill={isActive ? "var(--color-accent)" : "var(--color-card)"}
                    fillOpacity={isActive ? 0.16 : 1}
                    stroke={isActive ? "var(--color-accent)" : "var(--color-ink)"}
                    strokeWidth={isActive ? 3.5 : 2}
                    className="transition-all duration-300"
                  />
                  {labels && (
                    <text
                      x={room.x + room.w / 2}
                      y={room.y + room.h / 2}
                      textAnchor="middle"
                      fontSize="17"
                      fill="var(--color-ink)"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}
                    >
                      {room.name}
                    </text>
                  )}
                  {dims && (
                    <text
                      x={room.x + room.w / 2}
                      y={room.y + room.h / 2 + (labels ? 24 : 6)}
                      textAnchor="middle"
                      fontSize="14"
                      fill="var(--color-accent)"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {room.area}
                    </text>
                  )}
                </g>
              );
            })}
            <text
              x="40"
              y="52"
              fontSize="16"
              fill="var(--color-ink-soft)"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.18em" }}
            >
              N ↑ SCALE 1:200
            </text>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-4 py-3">
        <p className="text-sm">
          <span className="eyebrow mr-2">Selected</span>
          <span className="font-display text-lg">{activeRoom?.name ?? "—"}</span>
          <span className="ml-2 text-ink-soft">{activeRoom?.area}</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className={cn(
                "border border-border px-2.5 py-1 text-[11px] tracking-[0.1em] uppercase transition-colors",
                r.id === active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "hover:bg-secondary",
              )}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 border border-border px-2.5 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors",
        active ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function IconBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="px-2.5 py-1.5 transition-colors hover:bg-secondary"
    >
      {children}
    </button>
  );
}
