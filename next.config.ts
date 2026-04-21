import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/blog": ["./content/blog/**"],
    "/blog/[slug]": ["./content/blog/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // Legacy Shopify → new Skriuwer (Next.js) 301 redirects.
  // The site relaunched on Vercel on 2026-04-19. Every old Shopify URL still in
  // Google's index must 301 to the equivalent new route, otherwise we bleed
  // ranking equity to 404s.
  // Order matters: more specific rules MUST come before the catch-alls.
  // ---------------------------------------------------------------------------
  async redirects() {
    return [
      // -----------------------------------------------------------------------
      // /pages/* — Shopify hand-edited content pages
      // -----------------------------------------------------------------------
      { source: "/pages/about", destination: "/about", permanent: true },
      { source: "/pages/about-us", destination: "/about", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/contact-us", destination: "/contact", permanent: true },
      { source: "/pages/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/pages/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/pages/terms", destination: "/terms", permanent: true },
      { source: "/pages/terms-of-service", destination: "/terms", permanent: true },
      { source: "/pages/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/pages/affiliate-disclosure", destination: "/affiliate-disclosure", permanent: true },
      { source: "/pages/disclosure", destination: "/affiliate-disclosure", permanent: true },
      { source: "/pages/start-here", destination: "/start-here", permanent: true },
      { source: "/pages/team", destination: "/team", permanent: true },
      { source: "/pages/about-the-team", destination: "/team", permanent: true },
      { source: "/pages/reading-lists", destination: "/reading-lists", permanent: true },
      { source: "/pages/gift-guides", destination: "/gift-guides", permanent: true },
      { source: "/pages/bestsellers", destination: "/bestsellers", permanent: true },
      { source: "/pages/faq", destination: "/start-here", permanent: true },
      { source: "/pages/shipping", destination: "/", permanent: true },
      { source: "/pages/returns", destination: "/", permanent: true },
      // Catch-all for any /pages/* not enumerated above → homepage
      { source: "/pages/:slug*", destination: "/", permanent: true },

      // -----------------------------------------------------------------------
      // /policies/* — Shopify auto-generated legal pages
      // -----------------------------------------------------------------------
      { source: "/policies/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/policies/terms-of-service", destination: "/terms", permanent: true },
      { source: "/policies/refund-policy", destination: "/", permanent: true },
      { source: "/policies/shipping-policy", destination: "/", permanent: true },
      { source: "/policies/legal-notice", destination: "/terms", permanent: true },
      { source: "/policies/contact-information", destination: "/contact", permanent: true },
      { source: "/policies/:slug*", destination: "/", permanent: true },

      // -----------------------------------------------------------------------
      // /collections/* — Shopify category pages.
      // Specific "best-*" collections that map 1:1 to existing /best-* routes
      // MUST come before the generic /collections/:slug → /category/:slug rule.
      // -----------------------------------------------------------------------
      { source: "/collections/best-ancient-civilizations-books", destination: "/best-ancient-civilizations-books", permanent: true },
      { source: "/collections/best-ancient-egypt-books", destination: "/best-ancient-egypt-books", permanent: true },
      { source: "/collections/best-ancient-greece-books", destination: "/best-ancient-greece-books", permanent: true },
      { source: "/collections/best-ancient-rome-books", destination: "/best-ancient-rome-books", permanent: true },
      { source: "/collections/best-bilingual-books", destination: "/best-bilingual-books", permanent: true },
      { source: "/collections/best-biography-books", destination: "/best-biography-books", permanent: true },
      { source: "/collections/best-books-2026", destination: "/best-books-2026", permanent: true },
      { source: "/collections/best-books-for-history-lovers", destination: "/best-books-for-history-lovers", permanent: true },
      { source: "/collections/best-business-books", destination: "/best-business-books", permanent: true },
      { source: "/collections/best-conspiracy-books", destination: "/best-conspiracy-books", permanent: true },
      { source: "/collections/best-dark-history-books", destination: "/best-dark-history-books", permanent: true },
      { source: "/collections/best-egyptian-mythology-books", destination: "/best-egyptian-mythology-books", permanent: true },
      { source: "/collections/best-fiction-books", destination: "/best-fiction-books", permanent: true },
      { source: "/collections/best-frisian-books", destination: "/best-frisian-books", permanent: true },
      { source: "/collections/best-greek-mythology-books", destination: "/best-greek-mythology-books", permanent: true },
      { source: "/collections/best-history-books", destination: "/best-history-books", permanent: true },
      { source: "/collections/best-language-learning-books", destination: "/best-language-learning-books", permanent: true },
      { source: "/collections/best-leadership-books", destination: "/best-leadership-books", permanent: true },
      { source: "/collections/best-mindset-books", destination: "/best-mindset-books", permanent: true },
      { source: "/collections/best-mythology-books", destination: "/best-mythology-books", permanent: true },
      { source: "/collections/best-norse-mythology-books", destination: "/best-norse-mythology-books", permanent: true },
      { source: "/collections/best-philosophy-books", destination: "/best-philosophy-books", permanent: true },
      { source: "/collections/best-psychology-books", destination: "/best-psychology-books", permanent: true },
      { source: "/collections/best-religion-books", destination: "/best-religion-books", permanent: true },
      { source: "/collections/best-roman-history-books", destination: "/best-roman-history-books", permanent: true },
      { source: "/collections/best-science-books", destination: "/best-science-books", permanent: true },
      { source: "/collections/best-self-help-books", destination: "/best-self-help-books", permanent: true },
      { source: "/collections/best-stoicism-books", destination: "/best-stoicism-books", permanent: true },
      { source: "/collections/best-thriller-books", destination: "/best-thriller-books", permanent: true },
      { source: "/collections/best-true-crime-books", destination: "/best-true-crime-books", permanent: true },
      { source: "/collections/best-viking-books", destination: "/best-viking-books", permanent: true },
      { source: "/collections/best-world-war-2-books", destination: "/best-world-war-2-books", permanent: true },
      { source: "/collections/bestsellers", destination: "/bestsellers", permanent: true },

      // Common Shopify "all products" / catch-all collection slugs
      { source: "/collections", destination: "/", permanent: true },
      { source: "/collections/all", destination: "/books", permanent: true },
      { source: "/collections/all-products", destination: "/books", permanent: true },
      { source: "/collections/frontpage", destination: "/", permanent: true },

      // Generic Shopify collection → new category (existing rule, kept last in
      // the /collections block so the specific rules above win)
      { source: "/collections/:slug", destination: "/category/:slug", permanent: true },

      // -----------------------------------------------------------------------
      // /products/* — Shopify product detail pages
      // -----------------------------------------------------------------------
      { source: "/products", destination: "/books", permanent: true },
      { source: "/products/all", destination: "/books", permanent: true },
      { source: "/products/:slug", destination: "/books/:slug", permanent: true },

      // -----------------------------------------------------------------------
      // /blogs/* — Shopify blog system (default handle is "news"; some stores
      // also use "articles"). Both → new /blog routes.
      // -----------------------------------------------------------------------
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/news", destination: "/blog", permanent: true },
      { source: "/blogs/articles", destination: "/blog", permanent: true },
      { source: "/blogs/news/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blogs/articles/:slug", destination: "/blog/:slug", permanent: true },
      // Catch-all for any other custom blog handle
      { source: "/blogs/:handle/:slug", destination: "/blog/:slug", permanent: true },

      // -----------------------------------------------------------------------
      // Other Shopify-isms that 404 on a Next.js site
      // -----------------------------------------------------------------------
      { source: "/cart", destination: "/", permanent: true },
      { source: "/account", destination: "/", permanent: true },
      { source: "/account/:path*", destination: "/", permanent: true },
      { source: "/account/login", destination: "/", permanent: true },
      { source: "/account/register", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
