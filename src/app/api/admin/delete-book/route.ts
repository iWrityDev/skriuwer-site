import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

const BOOKS_JSON = join(process.cwd(), "data", "books.json");

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Admin only available in development" }, { status: 403 });
  }

  const { slug, password } = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD || "skriuwer2025";
  if (password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  try {
    const raw = readFileSync(BOOKS_JSON, "utf-8");
    const data = JSON.parse(raw);
    const before = data.books.length;
    data.books = data.books.filter((b: { slug: string }) => b.slug !== slug);
    const after = data.books.length;

    if (before === after) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    writeFileSync(BOOKS_JSON, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true, removed: before - after, remaining: after });
  } catch {
    return NextResponse.json({ error: "Failed to update books.json" }, { status: 500 });
  }
}
