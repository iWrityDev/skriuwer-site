import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Skriuwer.com is an Amazon affiliate book discovery site founded by Auke, an author and publisher based in Friesland, Netherlands.",
  alternates: { canonical: "https://www.skriuwer.com/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Auke de Haan",
  url: "https://www.skriuwer.com/about",
  jobTitle: "Founder",
  nationality: "NL",
  worksFor: {
    "@type": "Organization",
    name: "Skriuwer.com",
    url: "https://www.skriuwer.com",
  },
  sameAs: [
    "https://www.skriuwer.com/about",
    "https://aitoolhub.nl/over",
    "https://learnfrisian.com/about",
    "https://iwrity.com/about-us",
    "https://yourwallarts.com/pages/about-us",
    "https://kaffeebewertung.de/over",
    "https://www.gmcsuspension.com/",
    "https://www.linkedin.com/in/auke-de-haan-91b341406/",
  ],
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
          <strong className="text-[var(--color-text)]">Skriuwer</strong> means &ldquo;writer&rdquo; in Frisian, the ancient language spoken in Friesland, the northern province of the Netherlands. It&apos;s a fitting name for a site built around a love of books and the written word.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Who We Are</h2>
        <p>
          Skriuwer.com was founded by Auke, an author and publisher based in Friesland, Netherlands. With a deep passion for books on history, mythology, language learning, and culture, Auke started this site to help readers discover the best titles across these niches, books that are genuinely worth your time.
        </p>
        <p>
          Our small international team of authors and editors spans Friesland, France, and Spain. A portion of proceeds from our books supports <strong className="text-[var(--color-text)]">De Fryske Wrâld</strong>, a nonprofit foundation dedicated to preserving the Frisian language and culture.{" "}
          <Link href="/team" className="text-[var(--color-orange-light)] hover:underline">
            Meet the full team →
          </Link>
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">What We Do</h2>
        <p>
          We pick outstanding books in history, mythology, languages, and culture. Every book featured on Skriuwer.com earns its spot because we think it offers real value to curious readers. We link directly to Amazon so you can buy from a trusted retailer with reliable shipping and returns.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Affiliate Links</h2>
        <p>
          As an Amazon Associate, we earn a small commission when you click our links and make a purchase, at no extra cost to you whatsoever. These commissions help keep the site running and allow us to keep finding great books to recommend.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Other projects by Auke</h2>
        <p>
          Beyond Skriuwer, Auke runs a small family of independent comparison
          and education sites:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <a href="https://aitoolhub.nl" rel="noopener" className="text-[var(--color-orange-light)] hover:underline">aitoolhub.nl</a>
            {" "}— Dutch AI tools directory
          </li>
          <li>
            <a href="https://learnfrisian.com" rel="noopener" className="text-[var(--color-orange-light)] hover:underline">learnfrisian.com</a>
            {" "}— free West Frisian language learning platform
          </li>
          <li>
            <a href="https://kaffeebewertung.de" rel="noopener" className="text-[var(--color-orange-light)] hover:underline">kaffeebewertung.de</a>
            {" "}— German coffee-machine reviews
          </li>
          <li>
            <a href="https://yourwallarts.com" rel="noopener" className="text-[var(--color-orange-light)] hover:underline">yourwallarts.com</a>
            {" "}— themed canvas wall art (Dutch e-commerce)
          </li>
          <li>
            <a href="https://iwrity.com" rel="noopener" className="text-[var(--color-orange-light)] hover:underline">iwrity.com</a>
            {" "}— review-exchange platform for indie authors
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Contact &amp; Address</h2>
        <p>
          We&apos;re always happy to hear from fellow book lovers. You can reach us at{" "}
          <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
            kontakt@skriuwer.com
          </a>.
        </p>
        <address className="not-italic text-[var(--color-text-muted)]">
          Skriuwer.com<br />
          Friesland, Netherlands
        </address>
      </div>
    </div>
  );
}
