"use client";

import { useState } from "react";
import Image from "next/image";
import type { Book } from "@/lib/types";

export function BookCoverImage({ book }: { book: Book }) {
  // Own books use high-res Shopify CDN images — keep as primary.
  // Third-party books: prefer Amazon LZZZZZZZ (consistent quality) over Google Books.
  const pickPrimary = () => {
    if (book.isOwnBook) {
      return book.coverImage?.startsWith("http") ? book.coverImage : null;
    }
    if (book.coverImageFallback?.startsWith("http")) return book.coverImageFallback;
    return book.coverImage?.startsWith("http") ? book.coverImage : null;
  };
  const pickFallback = () => {
    if (book.isOwnBook) {
      return book.coverImageFallback?.startsWith("http") ? book.coverImageFallback : null;
    }
    return book.coverImage?.startsWith("http") ? book.coverImage : null;
  };

  const [imgSrc, setImgSrc] = useState<string | null>(pickPrimary());

  const handleError = () => {
    const fallback = pickFallback();
    setImgSrc(fallback !== imgSrc ? fallback : null);
  };

  return (
    <div className="relative aspect-[2/3] bg-[var(--color-surface-light)] rounded-lg overflow-hidden flex items-center justify-center">
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={book.title}
          fill
          className="object-cover"
          sizes="280px"
          priority
          unoptimized
          onError={handleError}
        />
      ) : (
        <span className="text-6xl">📚</span>
      )}
    </div>
  );
}
