"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { StarRating } from "./StarRating";

export function BookCard({ book }: { book: Book }) {
  const initialSrc =
    book.coverImage && book.coverImage.startsWith("http") ? book.coverImage : null;
  const [imgSrc, setImgSrc] = useState<string | null>(initialSrc);

  const handleError = () => {
    if (book.coverImageFallback && book.coverImageFallback.startsWith("http")) {
      setImgSrc(book.coverImageFallback);
    } else {
      setImgSrc(null);
    }
  };

  return (
    <Link href={`/books/${book.slug}`} className="book-card block group">
      <div className="relative aspect-[2/3] bg-[var(--color-surface-light)] flex items-center justify-center">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            unoptimized
            onError={handleError}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
            <span className="text-3xl mb-2">&#128218;</span>
            <span className="text-xs text-[var(--color-text-dim)] line-clamp-3 leading-snug">
              {book.title}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-[var(--color-text)] line-clamp-2 mb-1 group-hover:text-[var(--color-orange-light)] transition leading-snug">
          {book.title}
        </h3>
        {book.author && (
          <p className="text-xs text-[var(--color-text-dim)] truncate mb-1">{book.author}</p>
        )}
        {book.starRating && (
          <div className="flex items-center gap-1 mb-1">
            <StarRating rating={book.starRating} />
            <span className="text-xs text-[var(--color-text-dim)]">({book.reviewCount})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
