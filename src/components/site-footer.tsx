import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-tight">
              A living archive
              <br />
              of space.
            </p>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              Archiquest catalogues iconic buildings, interiors and plans — and the
              people who drew them.
            </p>
          </div>
          <FooterCol
            title="Explore"
            links={[
              { to: "/buildings", label: "All works" },
              { to: "/architects", label: "Architects" },
              { to: "/journal", label: "Journal" },
            ]}
          />
          <FooterCol
            title="Platform"
            links={[
              { to: "/about", label: "About" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/submit", label: "Submit a work" },
            ]}
          />
          <FooterCol
            title="Account"
            links={[
              { to: "/login", label: "Sign in" },
              { to: "/signup", label: "Create account" },
            ]}
          />
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-[11px] tracking-[0.16em] text-ink-soft uppercase md:flex-row md:items-center md:justify-between">
          <span>© 2026 Archiquest</span>
          <span>Made for the spatially curious</span>
          <span>Instagram · Pinterest · Contact</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="link-underline text-sm text-foreground/80 hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
