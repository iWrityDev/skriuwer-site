"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import Link from "next/link";

interface SearchItem {
  slug: string;
  title: string;
  author: string;
  categories: string[];
}

export function SearchBar({
  variant = "hero",
  items,
}: {
  variant?: "hero" | "nav";
  items: SearchItem[];
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fuse = useRef(
    new Fuse(items, {
      keys: ["title", "author", "categories"],
      threshold: 0.3,
    })
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(value: string) {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const found = fuse.current.search(value, { limit: 8 }).map((r) => r.item);
    setResults(found);
    setIsOpen(found.length > 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  }

  const isHero = variant === "hero";

  return (
    <div ref={ref} className="relative w-full max-w-[680px]">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center w-full overflow-hidden transition-all ${
          isHero
            ? "bg-white/5 border-[1.5px] border-[rgba(232,100,10,0.38)] rounded-full focus-within:border-[#e8640a] focus-within:shadow-[0_0_0_3px_rgba(232,100,10,0.15)]"
            : "bg-white/10 border border-white/20 rounded-full"
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search books by title, topic, or author..."
          className={`flex-1 bg-transparent border-none outline-none px-5 py-3 text-[15px] ${
            isHero
              ? "text-[#f0ede8] placeholder:text-[rgba(240,237,232,0.42)]"
              : "text-white placeholder:text-white/50"
          }`}
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#f07010] to-[#e8640a] text-white text-[13px] font-bold tracking-wider uppercase whitespace-nowrap hover:from-[#f88020] hover:to-[#f07010] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface)] rounded-lg shadow-xl border border-[var(--color-border)] z-50 max-h-80 overflow-y-auto">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/books/${item.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="flex items-center px-4 py-3 hover:bg-[var(--color-surface-light)] transition border-b border-[var(--color-border)] last:border-0"
            >
              <div>
                <div className="font-semibold text-sm text-[var(--color-text)] line-clamp-1">
                  {item.title}
                </div>
                <div className="text-xs text-[var(--color-text-dim)]">{item.author}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
