import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Admin only available in development" }, { status: 403 });
  }
  try {
    const raw = readFileSync(join(process.cwd(), "data", "books.json"), "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json({ books: data.books, total: data.books.length });
  } catch {
    return NextResponse.json({ error: "Failed to read books.json" }, { status: 500 });
  }
}
