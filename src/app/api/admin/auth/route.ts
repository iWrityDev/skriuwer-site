import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "skriuwer2025";
  if (password === adminPassword) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
