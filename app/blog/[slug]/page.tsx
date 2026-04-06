import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { blogPosts } from "@/lib/data";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const html = await marked.parse(post.content, { gfm: true });

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <div className="container-section py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="btn btn-ghost mb-8 -ml-2 text-[var(--color-text-secondary)]"
        >
          ← All posts
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-[var(--color-text-primary)] mb-4">
            {post.title}
          </h1>
          <time
            dateTime={post.publishedAt}
            className="text-sm text-[var(--color-text-secondary)]"
          >
            {formattedDate}
          </time>
        </header>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
