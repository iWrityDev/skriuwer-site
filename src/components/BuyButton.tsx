"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/lib/types";
import {
  buildAffiliateUrl,
  buildAffiliateUrlForDomain,
  detectCountryOnClient,
  getAmazonDomainForCountry,
  MARKETPLACE_FLAGS,
} from "@/lib/affiliate";

export function BuyButton({ book }: { book: Book }) {
  const asin = book.asin;
  // SSR + first client render: use amazon.com so the HTML matches between
  // server and client (prevents hydration warnings). Then on mount we detect
  // the visitor's locale and rewrite the link to their local Amazon.
  const ssrUrl = asin ? buildAffiliateUrl(asin) : "";
  const [href, setHref] = useState<string>(ssrUrl);
  const [domain, setDomain] = useState<string>("amazon.com");

  useEffect(() => {
    if (!asin) return;
    const country = detectCountryOnClient();
    const d = getAmazonDomainForCountry(country);
    setDomain(d);
    setHref(buildAffiliateUrlForDomain(asin, d));
  }, [asin]);

  if (!asin) return null;

  const mp = MARKETPLACE_FLAGS[domain];
  const storeLabel = mp?.label ?? "Amazon";
  const flag = mp?.flag ?? "";

  return (
    <div className="space-y-3">
      <a
        href={href}
        className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-br from-[#f07010] to-[#e8640a] text-white text-sm font-extrabold tracking-wider uppercase rounded hover:from-[#f88020] hover:to-[#f07010] transition-all shadow-lg hover:shadow-xl"
        target="_blank"
        rel="nofollow sponsored noopener"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        Buy on {flag} {storeLabel}
      </a>

      <p className="text-xs text-gray-400 text-center">
        Opens on your local Amazon store when available
      </p>
    </div>
  );
}
