import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Skriuwer.com is a participant in the Amazon Services LLC Associates Program. Learn how our affiliate links work.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text-muted)]">Affiliate Disclosure</span>
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Affiliate Disclosure</h1>
      </div>

      <div className="mt-8 space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          Skriuwer.com is a participant in the <strong className="text-[var(--color-text)]">Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">How It Works</h2>
        <p>
          When you click a book link on Skriuwer.com and then make a purchase on Amazon, we earn a small commission. This happens at <strong className="text-[var(--color-text)]">no extra cost to you</strong> — the price you pay on Amazon is exactly the same whether you arrived via our link or not.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Why We Do This</h2>
        <p>
          The commissions we earn help fund the running costs of this site — hosting, tooling, and the time it takes to research and write about great books. Without affiliate income, Skriuwer.com wouldn&apos;t exist in its current form.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Our Commitment to You</h2>
        <p>
          We only recommend books we genuinely believe are worth reading. Our selections are based on their quality, relevance, and value to readers — not on commission rates. Our editorial judgement is not for sale.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">FTC Compliance</h2>
        <p>
          This disclosure is made in accordance with the Federal Trade Commission&apos;s guidelines on endorsements and testimonials (16 CFR Part 255). We are committed to transparency about our commercial relationships.
        </p>

        <p>
          If you have any questions, feel free to reach us at{" "}
          <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
            kontakt@skriuwer.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
