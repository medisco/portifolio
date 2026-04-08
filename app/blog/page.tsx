import Link from "next/link";
import { blogPosts } from "@/lib/data";

export const metadata = {
  title: "Writing",
  description:
    "Technical writing on blockchain security, smart contract analysis, and distributed systems.",
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="container-editorial">
      <section className="section-major">
        <h1>Writing</h1>

        <p className="text-[var(--color-text-secondary)] mb-12 max-w-[42.5rem]">
          Technical writing on blockchain security, smart contract analysis, symbolic execution,
          and distributed systems architecture.
        </p>

        <div className="space-y-0">
          {sortedPosts.map((post) => {
            const date = new Date(post.publishedAt);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <article key={post.id} className="blog-entry">
                <time dateTime={post.publishedAt} className="blog-date">
                  {formattedDate}
                </time>
                <div className="blog-content">
                  <Link href={`/blog/${post.slug}`} className="blog-title">
                    {post.title}
                  </Link>
                  <p className="blog-description">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="metadata-tertiary mt-2">
                      {post.tags.join(", ")}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
