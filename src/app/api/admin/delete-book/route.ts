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

  const base = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  // Step 1: Get file metadata (sha + download_url). Content is empty for files > 1 MB — that's fine.
  const metaRes = await fetch(`${base}/contents/${GH_FILE}?ref=${GH_BRANCH}`, { headers });
  if (!metaRes.ok) return { error: `GitHub metadata error ${metaRes.status}` };
  const meta = await metaRes.json();
  const downloadUrl: string = meta.download_url;

  // Step 2: Download raw content via raw.githubusercontent.com (no size limit)
  const rawRes = await fetch(downloadUrl);
  if (!rawRes.ok) return { error: `Failed to download books.json: ${rawRes.status}` };
  const raw = await rawRes.text();
  const data = JSON.parse(raw);

  const before = data.books.length;
  data.books = data.books.filter((b: { slug: string }) => b.slug !== slug);
  const after = data.books.length;
  if (before === after) return { error: "Book not found" };

  const newContent = JSON.stringify(data, null, 2);

  // Step 3: Create a new blob with the updated content
  const blobRes = await fetch(`${base}/git/blobs`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content: newContent, encoding: "utf-8" }),
  });
  if (!blobRes.ok) return { error: `GitHub blob error ${blobRes.status}` };
  const { sha: blobSha } = await blobRes.json();

  // Step 4: Get the current commit SHA for the branch
  const refRes = await fetch(`${base}/git/ref/heads/${GH_BRANCH}`, { headers });
  if (!refRes.ok) return { error: `GitHub ref error ${refRes.status}` };
  const { object: { sha: commitSha } } = await refRes.json();

  // Step 5: Get the tree SHA from that commit
  const commitRes = await fetch(`${base}/git/commits/${commitSha}`, { headers });
  if (!commitRes.ok) return { error: `GitHub commit fetch error ${commitRes.status}` };
  const { tree: { sha: treeSha } } = await commitRes.json();

  // Step 6: Create a new tree that replaces only the books.json file
  const treeRes = await fetch(`${base}/git/trees`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      base_tree: treeSha,
      tree: [{ path: GH_FILE, mode: "100644", type: "blob", sha: blobSha }],
    }),
  });
  if (!treeRes.ok) return { error: `GitHub tree error ${treeRes.status}` };
  const { sha: newTreeSha } = await treeRes.json();

  // Step 7: Create a new commit
  const newCommitRes = await fetch(`${base}/git/commits`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message: `Admin: remove book ${slug}`,
      tree: newTreeSha,
      parents: [commitSha],
    }),
  });
  if (!newCommitRes.ok) return { error: `GitHub new commit error ${newCommitRes.status}` };
  const { sha: newCommitSha } = await newCommitRes.json();

  // Step 8: Update the branch ref to point to the new commit
  const patchRes = await fetch(`${base}/git/refs/heads/${GH_BRANCH}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ sha: newCommitSha }),
  });
  if (!patchRes.ok) {
    const err = await patchRes.json();
    return { error: `GitHub ref update failed: ${err.message || patchRes.status}` };
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
