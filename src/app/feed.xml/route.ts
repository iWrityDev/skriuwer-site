import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllBlogPosts().slice(0, 50); // Last 50 posts in feed
  const siteUrl = "https://www.skriuwer.com";

  const items = posts
    .map((post) => {
      const description = post.content
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 300);

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
      ${post.categories.map((c) => `<category>${c.replace(/-/g, " ")}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Skriuwer.com, Books &amp; History Blog</title>
    <link>${siteUrl}</link>
    <description>Articles about history, mythology, language learning, and the best books to read.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
