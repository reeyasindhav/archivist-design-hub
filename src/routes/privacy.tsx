import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Archiquest" },
      {
        name: "description",
        content: "How Archiquest collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy policy — Archiquest" },
      {
        property: "og:description",
        content: "How Archiquest collects, uses, and protects your personal information.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">Legal</p>
        <h1 className="mt-4 font-display text-3xl">Privacy policy</h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: 29 August 2026</p>
      </Reveal>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-soft">
        <Reveal delay={80}>
          <section>
            <h2 className="font-display text-xl text-foreground">1. What we collect</h2>
            <p className="mt-3">
              Archiquest currently runs in client-side demo mode. The only personal data stored on
              your device is:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground">Account info</strong> — name, email, and role,
                saved in your browser&apos;s localStorage under the key{" "}
                <code className="border border-border px-1.5 py-0.5 text-xs">archiquest.user</code>.
              </li>
              <li>
                <strong className="text-foreground">Saved works</strong> — slugs of buildings,
                architects, or articles you bookmark, stored in localStorage under{" "}
                <code className="border border-border px-1.5 py-0.5 text-xs">archiquest.saved</code>
                .
              </li>
            </ul>
            <p className="mt-3">
              We do not run a backend, database, or analytics service in this version.
            </p>
          </section>
        </Reveal>

        <Reveal delay={140}>
          <section>
            <h2 className="font-display text-xl text-foreground">2. How we use it</h2>
            <p className="mt-3">
              Your data is used solely to personalise your experience inside the app:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Show your name in the dashboard header.</li>
              <li>Persist your saved works and reading history across sessions.</li>
              <li>
                Gate authenticated routes (
                <code className="border border-border px-1.5 py-0.5 text-xs">/dashboard</code>,{" "}
                <code className="border border-border px-1.5 py-0.5 text-xs">/saved</code>,{" "}
                <code className="border border-border px-1.5 py-0.5 text-xs">/submit</code>).
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <section>
            <h2 className="font-display text-xl text-foreground">3. Data sharing</h2>
            <p className="mt-3">
              We do not share, sell, or transmit your data to third parties. Because all data stays
              in your browser, there is no server-side processing or external sharing.
            </p>
          </section>
        </Reveal>

        <Reveal delay={260}>
          <section>
            <h2 className="font-display text-xl text-foreground">4. Cookies and tracking</h2>
            <p className="mt-3">
              Archiquest does not use cookies, tracking pixels, or analytics scripts. The
              localStorage entries described above are not cookies and are accessible only to this
              site on your browser.
            </p>
          </section>
        </Reveal>

        <Reveal delay={320}>
          <section>
            <h2 className="font-display text-xl text-foreground">5. Third-party content</h2>
            <p className="mt-3">
              Building images are sourced from Unsplash. Unsplash may set its own cookies or collect
              anonymous usage data according to its privacy policy. We do not control those
              practices.
            </p>
          </section>
        </Reveal>

        <Reveal delay={380}>
          <section>
            <h2 className="font-display text-xl text-foreground">6. Your controls</h2>
            <p className="mt-3">You can clear your data at any time:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                Use <strong className="text-foreground">Sign out</strong> in the header or dashboard
                to remove your account info.
              </li>
              <li>
                Open your browser&apos;s developer tools and remove the{" "}
                <code className="border border-border px-1.5 py-0.5 text-xs">archiquest.user</code>{" "}
                and{" "}
                <code className="border border-border px-1.5 py-0.5 text-xs">archiquest.saved</code>{" "}
                keys from localStorage.
              </li>
              <li>Clear site data from your browser settings to remove everything at once.</li>
            </ul>
          </section>
        </Reveal>

        <Reveal delay={440}>
          <section>
            <h2 className="font-display text-xl text-foreground">7. Children&apos;s privacy</h2>
            <p className="mt-3">
              Archiquest is not directed at children under 13. We do not knowingly collect personal
              information from children.
            </p>
          </section>
        </Reveal>

        <Reveal delay={500}>
          <section>
            <h2 className="font-display text-xl text-foreground">8. Changes to this policy</h2>
            <p className="mt-3">
              If we add backend services, accounts, or analytics in the future, we will update this
              page and the &quot;Last updated&quot; date accordingly.
            </p>
          </section>
        </Reveal>

        <Reveal delay={560}>
          <section className="border-t border-border pt-8">
            <p className="text-sm text-ink-soft">
              Questions? Reach us via the contact link in the footer or at{" "}
              <Link to="/about" className="link-underline text-foreground">
                /about
              </Link>
              .
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
