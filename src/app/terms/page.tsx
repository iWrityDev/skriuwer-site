import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Skriuwer.com — an Amazon affiliate book discovery site.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text-muted)]">Terms of Service</span>
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Terms of Service</h1>
      </div>

      <div className="mt-8 space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          By using Skriuwer.com, you agree to the following terms. Please read them carefully — they&apos;re short and straightforward.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Purpose of This Site</h2>
        <p>
          Skriuwer.com is an informational and affiliate website. Its purpose is to help readers discover books in history, mythology, language learning, and culture. We do not sell books or any other products directly.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Pricing &amp; Availability</h2>
        <p>
          Book prices and availability are set by Amazon and are subject to change at any time without notice. We make no warranties or guarantees regarding the accuracy of prices, stock levels, or product descriptions displayed on or linked from this site. Always verify pricing on Amazon before making a purchase decision.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Purchases &amp; Returns</h2>
        <p>
          All purchases are made directly through Amazon. Skriuwer.com is not a party to any transaction between you and Amazon. Amazon&apos;s own terms, return policies, and customer service processes apply to all orders. For help with an order, please contact{" "}
          <a
            href="https://www.amazon.com/help"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-orange-light)] hover:underline"
          >
            Amazon customer service
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">No Warranties</h2>
        <p>
          The content on Skriuwer.com is provided &ldquo;as is&rdquo; for informational purposes. We make reasonable efforts to keep information accurate and up to date, but we make no warranties — express or implied — about the completeness, accuracy, or suitability of the information on this site.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Affiliate Links</h2>
        <p>
          This site contains affiliate links to Amazon. See our{" "}
          <Link href="/affiliate-disclosure" className="text-[var(--color-orange-light)] hover:underline">
            Affiliate Disclosure
          </Link>{" "}
          for full details on how this works.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Changes to These Terms</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.
        </p>

        <p>
          Questions? Contact us at{" "}
          <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
            kontakt@skriuwer.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
