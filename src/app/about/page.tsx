import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Skriuwer.com is an Amazon affiliate book discovery site founded by Auke, an author and publisher based in Friesland, Netherlands.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text-muted)]">About Us</span>
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">About Us</h1>
      </div>

      <div className="mt-8 space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          <strong className="text-[var(--color-text)]">Skriuwer</strong> means &ldquo;writer&rdquo; in Frisian — the ancient language spoken in Friesland, the northern province of the Netherlands. It&apos;s a fitting name for a site built around a love of books and the written word.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Who We Are</h2>
        <p>
          Skriuwer.com was founded by Auke, an author and publisher based in Harkema, Friesland, Netherlands. With a deep passion for books on history, mythology, language learning, and culture, Auke started this site to help readers discover the best titles across these niches — books that are genuinely worth your time.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">What We Do</h2>
        <p>
          We discover and curate outstanding books in history, mythology, languages, and culture. Every book featured on Skriuwer.com has been selected because we believe it offers real value to curious readers. We link directly to Amazon so you can purchase from a trusted, established retailer with reliable shipping and returns.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Affiliate Links</h2>
        <p>
          As an Amazon Associate, we earn a small commission when you click our links and make a purchase — at no extra cost to you whatsoever. These commissions help keep the site running and allow us to keep finding great books to recommend.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Contact &amp; Address</h2>
        <p>
          We&apos;re always happy to hear from fellow book lovers. You can reach us at{" "}
          <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
            kontakt@skriuwer.com
          </a>.
        </p>
        <address className="not-italic text-[var(--color-text-muted)]">
          Skriuwer.com<br />
          Splitting 1<br />
          9281 KJ Harkema<br />
          Friesland, Netherlands
        </address>
      </div>
    </div>
  );
}
