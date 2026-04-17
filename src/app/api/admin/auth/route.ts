import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Admin only available in development" }, { status: 403 });
  }
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "skriuwer2025";
  if (password === adminPassword) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
