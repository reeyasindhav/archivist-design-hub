import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Archiquest" },
      { name: "description", content: "Get in touch with the Archiquest team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-2xl">
      <Reveal>
        <div className="border-b border-border pb-6">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-2 font-display text-3xl">Contact</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Have a question, suggestion, or collaboration idea? We'd love to hear from you.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <form onSubmit={(e) => e.preventDefault()} className="mt-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} placeholder="Tell us more..." className="resize-none" />
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit" size="sm">
              Send message
            </Button>
            <span className="text-xs text-ink-soft">We usually reply within 48 hours.</span>
          </div>
        </form>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-xl">Other ways to reach us</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="border border-border p-5">
              <p className="eyebrow">Email</p>
              <p className="mt-2 text-sm">hello@archiquest.com</p>
            </div>
            <div className="border border-border p-5">
              <p className="eyebrow">Instagram</p>
              <p className="mt-2 text-sm">@archiquest</p>
            </div>
            <div className="border border-border p-5">
              <p className="eyebrow">Pinterest</p>
              <p className="mt-2 text-sm">@archiquest</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
