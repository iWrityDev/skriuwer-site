import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "skriuwer2025";
const BOOKS_JSON = join(process.cwd(), "data", "books.json");

const GH_OWNER = "iWrityDev";
const GH_REPO = "skriuwer-site";
const GH_BRANCH = "master";
const GH_FILE = "data/books.json";

async function deleteViaGitHub(slug: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { error: "GITHUB_TOKEN not set — add it in Vercel environment variables" };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  // Fetch current file + SHA
  const getRes = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`,
    { headers }
  );
  if (!getRes.ok) {
    return { error: `GitHub API error ${getRes.status}` };
  }
  const fileData = await getRes.json();
  const sha: string = fileData.sha;
  const raw = Buffer.from(fileData.content.replace(/\n/g, ""), "base64").toString("utf-8");
  const data = JSON.parse(raw);

  const before = data.books.length;
  data.books = data.books.filter((b: { slug: string }) => b.slug !== slug);
  const after = data.books.length;
  if (before === after) return { error: "Book not found" };

  // Commit updated file
  const newContent = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  const putRes = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `Admin: remove book ${slug}`,
        content: newContent,
        sha,
        branch: GH_BRANCH,
      }),
    }
  );
  if (!putRes.ok) {
    const err = await putRes.json();
    return { error: `GitHub commit failed: ${err.message || putRes.status}` };
  }

  return { remaining: after };
}

export async function POST(req: NextRequest) {
  const { slug, password } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  if (process.env.NODE_ENV === "development") {
    // Dev: write directly to disk
    try {
      const data = JSON.parse(readFileSync(BOOKS_JSON, "utf-8"));
      const before = data.books.length;
      data.books = data.books.filter((b: { slug: string }) => b.slug !== slug);
      const after = data.books.length;
      if (before === after) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }
      writeFileSync(BOOKS_JSON, JSON.stringify(data, null, 2), "utf-8");
      return NextResponse.json({ success: true, remaining: after, via: "filesystem" });
    } catch {
      return NextResponse.json({ error: "Failed to write books.json" }, { status: 500 });
    }
  }

  // Production: commit via GitHub API → triggers Vercel redeploy
  const result = await deleteViaGitHub(slug);
  if (result.error) {
    const status = result.error === "Book not found" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  return NextResponse.json({
    success: true,
    remaining: result.remaining,
    via: "github",
    note: "Committed to GitHub — Vercel rebuild in ~30s",
  });
}
