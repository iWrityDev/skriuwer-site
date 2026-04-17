import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Skriuwer.com. We'd love to hear from fellow book lovers.",
  alternates: { canonical: "https://skriuwer.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text-muted)]">Contact</span>
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Contact</h1>
      </div>

      <div className="mt-8 space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          Have a question, suggestion, or just want to talk books? We&apos;d love to hear from you. Reach out via email or WhatsApp.
        </p>

        <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-3">
          <div>
            <span className="text-[var(--color-text-dim)] text-sm uppercase tracking-wide">Name</span>
            <p className="text-[var(--color-text)]">Auke</p>
          </div>
          <div>
            <span className="text-[var(--color-text-dim)] text-sm uppercase tracking-wide">Company</span>
            <p className="text-[var(--color-text)]">Skriuwer.com</p>
          </div>
          <div>
            <span className="text-[var(--color-text-dim)] text-sm uppercase tracking-wide">Address</span>
            <address className="not-italic text-[var(--color-text)]">
              Splitting 1<br />
              9281 KJ Harkema<br />
              Friesland, Netherlands
            </address>
          </div>
          <div>
            <span className="text-[var(--color-text-dim)] text-sm uppercase tracking-wide">Email</span>
            <p>
              <a
                href="mailto:kontakt@skriuwer.com"
                className="text-[var(--color-orange-light)] hover:underline"
              >
                kontakt@skriuwer.com
              </a>
            </p>
          </div>
          <div>
            <span className="text-[var(--color-text-dim)] text-sm uppercase tracking-wide">WhatsApp</span>
            <p>
              <a
                href="https://wa.me/31630771404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-orange-light)] hover:underline"
              >
                +31 630 771 404
              </a>
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Book Orders &amp; Returns</h2>
        <p>
          Please note that Skriuwer.com does not sell books directly. All purchases are made through Amazon. For questions about orders, shipping, or returns, please contact{" "}
          <a
            href="https://www.amazon.com/help"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-orange-light)] hover:underline"
          >
            Amazon customer service
          </a>{" "}
          directly.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Send Us an Email</h2>
        <p>
          You can email us directly at{" "}
          <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
            kontakt@skriuwer.com
          </a>. We typically respond within a few business days.
        </p>
      </div>
    </div>
  );
}
