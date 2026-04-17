"use client";

import { useState } from "react";
import Image from "next/image";
import type { Book } from "@/lib/types";

export function BookCoverImage({ book }: { book: Book }) {
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
