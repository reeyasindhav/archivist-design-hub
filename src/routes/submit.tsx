import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Upload } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { toast } from "sonner";
import { AuthenticatedLayout } from "@/components/authenticated-layout";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a work — Archiquest" },
      {
        name: "description",
        content: "Submit your architectural project to the Archiquest archive.",
      },
    ],
  }),
  component: Submit,
});

function Submit() {
  const [form, setForm] = useState({
    name: "",
    architect: "",
    year: "",
    city: "",
    country: "",
    typology: "",
    materials: "",
    blurb: "",
    story: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Work submitted for review. We'll be in touch.");
  };

  if (submitted) {
    return (
      <AuthenticatedLayout>
        <div className="mx-auto max-w-2xl py-20 text-center">
          <Reveal>
            <p className="font-display text-3xl">Thank you</p>
            <p className="mt-2 text-sm text-ink-soft">
              Your submission has been received. Our editors will review it shortly.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-3 border border-foreground px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Back to archive
            </Link>
          </Reveal>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="rule-label">Share your work</p>
          <h1 className="mt-4 font-display text-3xl">Submit a project</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Add your building, interior, or landscape project to the archive. All submissions are
            reviewed by our editors before publication.
          </p>
        </Reveal>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Project name" required>
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                required
                className="field-input"
              />
            </Field>
            <Field label="Architect / Studio" required>
              <input
                type="text"
                value={form.architect}
                onChange={update("architect")}
                required
                className="field-input"
              />
            </Field>
            <Field label="Year completed">
              <input
                type="text"
                value={form.year}
                onChange={update("year")}
                placeholder="e.g. 2024"
                className="field-input"
              />
            </Field>
            <Field label="City">
              <input
                type="text"
                value={form.city}
                onChange={update("city")}
                className="field-input"
              />
            </Field>
            <Field label="Country">
              <input
                type="text"
                value={form.country}
                onChange={update("country")}
                className="field-input"
              />
            </Field>
            <Field label="Typology">
              <input
                type="text"
                value={form.typology}
                onChange={update("typology")}
                placeholder="e.g. House, Museum, Tower"
                className="field-input"
              />
            </Field>
          </div>
          <Field label="Materials (comma-separated)">
            <input
              type="text"
              value={form.materials}
              onChange={update("materials")}
              placeholder="Concrete, Glass, Steel"
              className="field-input"
            />
          </Field>
          <Field label="Short description" required>
            <textarea
              value={form.blurb}
              onChange={update("blurb")}
              required
              rows={3}
              className="field-input"
              placeholder="One or two sentences about the project..."
            />
          </Field>
          <Field label="Project story">
            <textarea
              value={form.story}
              onChange={update("story")}
              rows={6}
              className="field-input"
              placeholder="Tell us about the design process, context, and what makes this work compelling..."
            />
          </Field>

          <div className="border border-dashed border-border p-8 text-center">
            <Upload className="mx-auto size-6 text-ink-soft" strokeWidth={1.5} />
            <p className="mt-2 text-sm text-ink-soft">
              Drop images here or click to browse. Max 10 files, 20MB each.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-3 bg-primary px-6 py-3 text-[11px] tracking-[0.16em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
          >
            Submit for review <ArrowRight className="size-3.5" />
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.16em] uppercase text-ink-soft">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
