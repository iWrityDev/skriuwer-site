"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type ViewedBook = {
  slug: string;
  title: string;
  coverImage: string;
  coverImageFallback?: string;
  isOwnBook: boolean;
};

const KEY = "skriuwer:recently-viewed";
const MAX = 8;

function readStorage(): ViewedBook[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((b) => b && b.slug && b.title) : [];
  } catch {
    return [];
  }
}

function writeStorage(arr: ViewedBook[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(arr.slice(0, MAX)));
  } catch {
    // ignore (quota, private mode, etc.)
  }
}

/** Call on a book detail page to record that it was viewed. */
export function TrackView({
  slug,
  title,
  coverImage,
  coverImageFallback,
  isOwnBook,
}: ViewedBook) {
  useEffect(() => {
    const list = readStorage().filter((b) => b.slug !== slug);
    list.unshift({ slug, title, coverImage, coverImageFallback, isOwnBook });
    writeStorage(list);
  }, [slug, title, coverImage, coverImageFallback, isOwnBook]);
  return null;
}

/**
 * Horizontal strip of previously-viewed books. Renders nothing on first
 * visit (empty localStorage). Optionally excludes the current slug.
 */
export function RecentlyViewed({
  excludeSlug,
  title = "Recently viewed",
}: {
  excludeSlug?: string;
  title?: string;
}) {
  const [list, setList] = useState<ViewedBook[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = readStorage();
    setList(excludeSlug ? stored.filter((b) => b.slug !== excludeSlug) : stored);
  }, [excludeSlug]);

  if (!mounted || list.length === 0) return null;

  return (
    <section className="mt-12 pt-10 section-divider">
      <div className="section-header mb-5">
        <span className="accent-bar" />
        <h2 className="text-xl font-bold text-[var(--color-text)]">{title}</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
        {list.map((b) => {
          const src =
            b.coverImage && b.coverImage.startsWith("http")
              ? b.coverImage
              : b.coverImageFallback && b.coverImageFallback.startsWith("http")
              ? b.coverImageFallback
              : null;
          return (
            <Link
              key={b.slug}
              href={`/books/${b.slug}`}
              className="group flex-shrink-0 w-[110px] snap-start"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[var(--color-surface-light)] border border-[var(--color-border)] group-hover:border-[color-mix(in_srgb,var(--color-orange)_40%,transparent)] transition-all group-hover:-translate-y-0.5">
                {src ? (
                  <Image src={src} alt={b.title} fill className="object-cover" sizes="110px" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">📚</div>
                )}
                {b.isOwnBook && (
                  <span className="absolute top-1 right-1 bg-[var(--color-orange)] text-white text-[8px] font-bold uppercase tracking-wide px-1 py-0.5 rounded shadow-sm">
                    ★
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-2 mt-1.5 leading-tight group-hover:text-[var(--color-text)] transition-colors">
                {b.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
