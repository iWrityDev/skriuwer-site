import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Skriuwer.com — how we handle data and use Amazon affiliate links.",
  alternates: { canonical: "https://skriuwer.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text-muted)]">Privacy Policy</span>
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Privacy Policy</h1>
      </div>
      <p className="text-sm text-[var(--color-text-dim)] mt-2 ml-5">Last updated: April 2026</p>

      <div className="mt-8 space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          Your privacy matters to us. This policy explains what data is collected when you visit Skriuwer.com and how it is used.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Data We Collect</h2>
        <p>
          Skriuwer.com does not directly collect any personal data. We do not operate sign-up forms, user accounts, or comment systems. We do not store your name, email address, or any other personal information on our servers.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Amazon Affiliate Links</h2>
        <p>
          This site contains affiliate links to Amazon. When you click one of these links, you are directed to Amazon&apos;s website. Amazon may place cookies on your device as part of their standard operation. Any purchase you make on Amazon is subject to{" "}
          <a
            href="https://www.amazon.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-orange-light)] hover:underline"
          >
            Amazon&apos;s Privacy Policy
          </a>
          . Skriuwer.com does not receive or store any payment or personal data from Amazon in relation to your purchases.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Analytics</h2>
        <p>
          We may use Vercel Analytics to understand general site traffic patterns. This service collects anonymised, aggregated data such as page views and country of origin. No personally identifiable information is collected or stored. You can read more in{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-orange-light)] hover:underline"
          >
            Vercel&apos;s Privacy Policy
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Cookies</h2>
        <p>
          Skriuwer.com itself does not set cookies. Cookies may be set by third-party services such as Amazon when you follow an affiliate link. You can manage or disable cookies through your browser settings at any time.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mt-8 mb-2">Contact</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at{" "}
          <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
            kontakt@skriuwer.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
