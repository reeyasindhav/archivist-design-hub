import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Archiquest" },
      {
        name: "description",
        content: "Terms and conditions for using the Archiquest platform.",
      },
      { property: "og:title", content: "Terms of service — Archiquest" },
      {
        property: "og:description",
        content: "Terms and conditions for using the Archiquest platform.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-10">
      <Reveal>
        <p className="rule-label">Legal</p>
        <h1 className="mt-4 font-display text-3xl">Terms of service</h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: 29 August 2026</p>
      </Reveal>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-soft">
        <Reveal delay={80}>
          <section>
            <h2 className="font-display text-xl text-foreground">1. Acceptance of terms</h2>
            <p className="mt-3">
              By accessing or using Archiquest, you agree to be bound by these terms. If you do not
              agree, please do not use the platform.
            </p>
          </section>
        </Reveal>

        <Reveal delay={140}>
          <section>
            <h2 className="font-display text-xl text-foreground">2. Description of service</h2>
            <p className="mt-3">
              Archiquest is a curated archive and discovery platform for architecture and interior
              design. It provides building profiles, floor plans, architect portfolios, journal
              articles, and user account features such as saving works and submitting projects.
            </p>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <section>
            <h2 className="font-display text-xl text-foreground">3. Accounts and conduct</h2>
            <p className="mt-3">
              You are responsible for the activity that occurs under your account. You agree to:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Provide accurate account information.</li>
              <li>Maintain the security of your device and browser data.</li>
              <li>Not use the service for unlawful, harmful, or abusive purposes.</li>
              <li>Not attempt to reverse-engineer, scrape, or interfere with the platform.</li>
            </ul>
          </section>
        </Reveal>

        <Reveal delay={260}>
          <section>
            <h2 className="font-display text-xl text-foreground">4. User submissions</h2>
            <p className="mt-3">
              When you submit a project through{" "}
              <code className="border border-border px-1.5 py-0.5 text-xs">/submit</code>, you grant
              Archiquest a non-exclusive, worldwide, royalty-free licence to display and promote the
              submitted content on the platform. You warrant that you own or have the rights to all
              content you submit.
            </p>
          </section>
        </Reveal>

        <Reveal delay={320}>
          <section>
            <h2 className="font-display text-xl text-foreground">5. Intellectual property</h2>
            <p className="mt-3">
              All site design, code, text, and branding are owned by Archiquest. Building images are
              sourced from Unsplash and used under the Unsplash License. Architect and project
              content is used for editorial and portfolio purposes. If you are the rights holder and
              want content removed, contact us.
            </p>
          </section>
        </Reveal>

        <Reveal delay={380}>
          <section>
            <h2 className="font-display text-xl text-foreground">6. Disclaimers</h2>
            <p className="mt-3">
              The platform is provided on an &quot;as is&quot; basis. We do not guarantee
              uninterrupted access, error-free operation, or the accuracy of all content. Building
              data, plans, and descriptions may contain approximations or editorial interpretation.
            </p>
          </section>
        </Reveal>

        <Reveal delay={440}>
          <section>
            <h2 className="font-display text-xl text-foreground">7. Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, Archiquest shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of the platform.
              Our total liability shall not exceed the amount you paid us, which is zero in the
              current demo version.
            </p>
          </section>
        </Reveal>

        <Reveal delay={500}>
          <section>
            <h2 className="font-display text-xl text-foreground">8. Changes to terms</h2>
            <p className="mt-3">
              We may revise these terms as the platform evolves. We will update the &quot;Last
              updated&quot; date and, where appropriate, notify users through the site. Continued
              use after changes constitutes acceptance of the revised terms.
            </p>
          </section>
        </Reveal>

        <Reveal delay={560}>
          <section className="border-t border-border pt-8">
            <p className="text-sm text-ink-soft">
              Questions about these terms? Reach us via{" "}
              <Link to="/about" className="link-underline text-foreground">
                /about
              </Link>{" "}
              or review our{" "}
              <Link to="/privacy" className="link-underline text-foreground">
                /privacy
              </Link>{" "}
              policy.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
