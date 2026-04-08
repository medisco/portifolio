import { blogPosts } from "@/lib/data";

const SITE_URL = "https://ismaelm.dev";
const SITE_TITLE = "Ismael Medeiros";
const SITE_DESCRIPTION =
  "Technical writing on blockchain security, smart contract analysis, symbolic execution, and distributed systems architecture.";

export async function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_TITLE}</title>
  <subtitle>${SITE_DESCRIPTION}</subtitle>
  <link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}/blog" rel="alternate" type="text/html"/>
  <id>${SITE_URL}/blog</id>
  <updated>${new Date(sortedPosts[0]?.publishedAt || Date.now()).toISOString()}</updated>
  <author>
    <name>${SITE_TITLE}</name>
    <email>hello@ismaelm.dev</email>
  </author>
  ${sortedPosts
    .map(
      (post) => `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${SITE_URL}/blog/${post.slug}" rel="alternate" type="text/html"/>
    <id>${SITE_URL}/blog/${post.slug}</id>
    <published>${new Date(post.publishedAt).toISOString()}</published>
    <updated>${new Date(post.publishedAt).toISOString()}</updated>
    <summary>${escapeXml(post.excerpt)}</summary>
    ${post.tags.map((tag) => `<category term="${escapeXml(tag)}"/>`).join("\n    ")}
  </entry>`
    )
    .join("")}
</feed>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
