import { blogPosts } from "@/lib/data";
import BlogSearch from "@/components/BlogSearch";

export const metadata = {
  title: "Blog",
  description:
    "Technical articles on distributed systems, backend engineering, and DevOps.",
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const allTags = Array.from(new Set(sortedPosts.flatMap((p) => p.tags))).sort();

  return (
    <div className="container-section py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          Blog
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Insights on distributed systems, backend engineering, databases, and
          infrastructure.
        </p>
      </header>

      <BlogSearch posts={sortedPosts} allTags={allTags} />
    </div>
  );
}
