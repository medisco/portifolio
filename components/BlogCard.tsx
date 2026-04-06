import Link from "next/link";
import type { BlogPost } from "@/lib/data";

export default function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card flex flex-col gap-3 h-full no-underline hover:shadow-md transition-shadow"
    >
      <div className="flex flex-wrap gap-1.5 mb-1">
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
        {post.tags.length > 2 && (
          <span className="badge">+{post.tags.length - 2}</span>
        )}
      </div>

      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] leading-snug">
        {post.title}
      </h2>

      <p className="text-sm text-[var(--color-text-secondary)] flex-1">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
        <time
          dateTime={post.publishedAt}
          className="text-xs text-[var(--color-text-secondary)]"
        >
          {formattedDate}
        </time>
        <span className="text-sm font-medium text-[var(--color-brand-600)]">
          Read →
        </span>
      </div>
    </Link>
  );
}
