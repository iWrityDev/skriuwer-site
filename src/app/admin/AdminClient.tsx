"use client";

import { useState, useEffect, useMemo } from "react";
import type { Book } from "@/lib/types";

type OwnFilter = "all" | "own" | "third";
type SortKey = "title" | "author" | "reviews";
type Toast = { msg: string; ok: boolean };

const STORAGE_KEY = "skriuwer_admin_pw";

export default function AdminClient({ initialBooks }: { initialBooks: Book[] }) {
  const [authed, setAuthed] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [books, setBooks] = useState<Book[]>(initialBooks);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ownFilter, setOwnFilter] = useState<OwnFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("title");

  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState<Book[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);

  // Restore auth from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStoredPassword(saved);
      setAuthed(true);
    }
  }, []);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, passwordInput);
        setStoredPassword(passwordInput);
        setAuthed(true);
      } else {
        const data = await res.json();
        setLoginError(data.error || "Wrong password");
      }
    } catch {
      setLoginError("Cannot reach the server. Make sure you're on skriuwer.com or localhost:3000.");
    }
    setLoginLoading(false);
  };

  const handleSignOut = () => {
    setAuthed(false);
    setStoredPassword("");
    localStorage.removeItem(STORAGE_KEY);
    setDeleted([]);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/delete-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: deleteTarget.slug, password: storedPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b.slug !== deleteTarget.slug));
        setDeleted((prev) => [deleteTarget, ...prev]);
        setDeleteTarget(null);
        const extra = data.note ? ` — ${data.note}` : "";
        showToast(`Deleted: ${deleteTarget.title}${extra}`);
      } else {
        showToast(data.error || "Delete failed", false);
      }
    } catch {
      showToast("Network error — try again", false);
    }
    setDeleting(false);
  };

  // Derived
  const categories = useMemo(
    () => Array.from(new Set(books.flatMap((b) => b.categories))).sort(),
    [books]
  );

  const filtered = useMemo(() => {
    let list = books;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.asin ?? "").toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all") list = list.filter((b) => b.categories.includes(categoryFilter));
    if (ownFilter === "own") list = list.filter((b) => b.isOwnBook);
    if (ownFilter === "third") list = list.filter((b) => !b.isOwnBook);

    return [...list].sort((a, b) => {
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      if (sortBy === "author") return a.author.localeCompare(b.author);
      return a.title.localeCompare(b.title);
    });
  }, [books, search, categoryFilter, ownFilter, sortBy]);

  // ── Login screen ─────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
        <div
          className="w-full max-w-sm rounded-2xl p-8 shadow-2xl"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="text-center mb-8">
            <div className="text-3xl mb-2">🔐</div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Book Admin</h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">Skriuwer.com</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-[var(--color-text)] text-sm outline-none"
              style={{
                background: "var(--color-surface-light)",
                border: "1px solid var(--color-border)",
              }}
            />
            {loginError && (
              <p className="text-red-400 text-sm text-center">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading || !passwordInput}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Checking…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin UI ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 max-w-sm px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${
            toast.ok
              ? "bg-emerald-900/90 text-emerald-300 border border-emerald-700/50"
              : "bg-red-900/90 text-red-300 border border-red-700/50"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 px-4">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <h2 className="text-lg font-bold text-[var(--color-text)] mb-1">Delete this book?</h2>
            <p className="text-[var(--color-text)] font-medium mb-0.5">{deleteTarget.title}</p>
            <p className="text-[var(--color-text-muted)] text-sm mb-1">by {deleteTarget.author}</p>
            <p className="text-[var(--color-text-dim)] text-xs font-mono mb-6">
              ASIN: {deleteTarget.asin ?? "—"} · {deleteTarget.slug}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-[var(--color-text)] font-semibold text-sm"
                style={{ background: "var(--color-surface-light)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Book Admin</h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">
              {books.length} books ·{" "}
              <span style={{ color: "var(--color-orange)" }}>
                {books.filter((b) => b.isOwnBook).length} own
              </span>{" "}
              · {books.filter((b) => !b.isOwnBook).length} third-party
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {deleted.length > 0 && (
              <span className="text-amber-400 text-sm font-medium">
                ✓ {deleted.length} deleted
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text)] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, author, ASIN…"
            className="flex-1 min-w-48 px-3 py-2.5 rounded-xl text-sm text-[var(--color-text)] outline-none"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl text-sm text-[var(--color-text)] outline-none"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={ownFilter}
            onChange={(e) => setOwnFilter(e.target.value as OwnFilter)}
            className="px-3 py-2.5 rounded-xl text-sm text-[var(--color-text)] outline-none"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <option value="all">All books</option>
            <option value="own">Own books</option>
            <option value="third">Third-party</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="px-3 py-2.5 rounded-xl text-sm text-[var(--color-text)] outline-none"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <option value="title">Sort: title</option>
            <option value="author">Sort: author</option>
            <option value="reviews">Sort: reviews ↓</option>
          </select>
        </div>

        <p className="text-[var(--color-text-dim)] text-xs mb-3">
          {filtered.length} of {books.length} books
        </p>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  background: "var(--color-surface-light)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <th className="text-left px-3 py-3 text-[var(--color-text-muted)] font-medium w-10">
                  Cover
                </th>
                <th className="text-left px-3 py-3 text-[var(--color-text-muted)] font-medium">
                  Title / Author
                </th>
                <th className="text-left px-3 py-3 text-[var(--color-text-muted)] font-medium hidden md:table-cell">
                  ASIN
                </th>
                <th className="text-left px-3 py-3 text-[var(--color-text-muted)] font-medium hidden lg:table-cell">
                  Category
                </th>
                <th className="text-left px-3 py-3 text-[var(--color-text-muted)] font-medium hidden sm:table-cell w-16">
                  ★
                </th>
                <th className="text-left px-3 py-3 text-[var(--color-text-muted)] font-medium w-16">
                  Type
                </th>
                <th className="px-3 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((book, i) => (
                <tr
                  key={book.slug}
                  className="transition-colors"
                  style={{
                    background:
                      i % 2 === 0 ? "var(--color-surface)" : "var(--color-surface-light)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(232,100,10,0.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      i % 2 === 0 ? "var(--color-surface)" : "var(--color-surface-light)")
                  }
                >
                  {/* Cover */}
                  <td className="px-3 py-2">
                    {book.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={book.coverImage}
                        alt=""
                        width={32}
                        height={48}
                        className="w-8 h-12 object-cover rounded shadow"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (book.coverImageFallback && img.src !== book.coverImageFallback) {
                            img.src = book.coverImageFallback;
                          } else {
                            img.style.display = "none";
                          }
                        }}
                      />
                    ) : (
                      <div
                        className="w-8 h-12 rounded"
                        style={{ background: "var(--color-surface-light)" }}
                      />
                    )}
                  </td>

                  {/* Title */}
                  <td className="px-3 py-2 max-w-xs">
                    <div className="font-medium text-[var(--color-text)] leading-snug line-clamp-2">
                      {book.title}
                    </div>
                    <div className="text-[var(--color-text-muted)] text-xs mt-0.5 truncate">
                      {book.author}
                    </div>
                  </td>

                  {/* ASIN */}
                  <td className="px-3 py-2 hidden md:table-cell">
                    <span className="text-[var(--color-text-dim)] font-mono text-xs">
                      {book.asin ?? "—"}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-2 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {book.categories.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="px-1.5 py-0.5 rounded text-xs"
                          style={{
                            background: "var(--color-surface-light)",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Reviews */}
                  <td className="px-3 py-2 text-[var(--color-text-muted)] text-xs hidden sm:table-cell">
                    {book.reviewCount > 0 ? book.reviewCount.toLocaleString() : "—"}
                  </td>

                  {/* Type */}
                  <td className="px-3 py-2">
                    {book.isOwnBook ? (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: "rgba(232,100,10,0.15)",
                          color: "var(--color-orange)",
                        }}
                      >
                        Own
                      </span>
                    ) : (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: "var(--color-surface-light)",
                          color: "var(--color-text-dim)",
                        }}
                      >
                        3rd
                      </span>
                    )}
                  </td>

                  {/* Delete */}
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => setDeleteTarget(book)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ background: "rgba(239,68,68,0.1)", color: "rgb(248,113,113)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(239,68,68,0.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-[var(--color-text-muted)] text-sm">
              No books match your filters.
            </div>
          )}
        </div>

        {/* Deletion log */}
        {deleted.length > 0 && (
          <div
            className="mt-6 p-5 rounded-2xl"
            style={{
              background: "rgba(245,158,11,0.07)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <h3 className="font-semibold text-amber-400 text-sm mb-3">
              Deleted this session ({deleted.length})
            </h3>
            <div className="space-y-1 mb-3">
              {deleted.map((b) => (
                <div key={b.slug} className="text-xs text-[var(--color-text-muted)] font-mono">
                  [{b.asin ?? b.slug}] {b.title}
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(245,158,11,0.55)" }}>
              On localhost: changes are in{" "}
              <code className="bg-white/5 px-1 rounded">data/books.json</code> — run{" "}
              <code className="bg-white/5 px-1 rounded">git add data/books.json &amp;&amp; git commit -m &quot;Remove books&quot; &amp;&amp; git push</code>.
              On skriuwer.com: Vercel is already rebuilding.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
