import type { Book } from "@/lib/types";
import { buildAffiliateUrl } from "@/lib/affiliate";

export function BuyButton({ book }: { book: Book }) {
  if (!book.asin) return null;

  const isKindle = book.asin.startsWith("B0");
  const url = buildAffiliateUrl(book.asin);

  return (
    <div className="space-y-3">
      {/* Primary button — OneLink auto-redirects to visitor's local Amazon */}
      <a
        href={url}
        className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-br from-[#f07010] to-[#e8640a] text-white text-sm font-extrabold tracking-wider uppercase rounded hover:from-[#f88020] hover:to-[#f07010] transition-all shadow-lg hover:shadow-xl"
        target="_blank"
        rel="nofollow sponsored noopener"
      >
        {isKindle ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        )}
        {isKindle ? "Buy on Kindle" : "Buy on Amazon"}
      </a>

      <p className="text-xs text-gray-400 text-center">
        {isKindle
          ? "Kindle edition — also shows paperback option on Amazon"
          : "Automatically redirects to your local Amazon store"}
      </p>
    </div>
  );
}
