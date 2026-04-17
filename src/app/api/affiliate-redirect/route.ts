import { NextRequest, NextResponse } from "next/server";
import { buildAffiliateUrl } from "@/lib/affiliate";

export function GET(request: NextRequest) {
  const asin = request.nextUrl.searchParams.get("asin");

  if (!asin) {
    return NextResponse.json({ error: "Missing asin parameter" }, { status: 400 });
  }

  // OneLink handles geo-redirection automatically
  const url = buildAffiliateUrl(asin);
  return NextResponse.redirect(url, 302);
}
