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
    <div className="container-editorial">
      <div className="section-major">
        <Link href="/blog" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-8 inline-block">
          ← Writing
        </Link>

        <header className="mb-12">
          <h1 className="mb-4">{post.title}</h1>

          <div className="metadata space-y-2">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            {post.tags.length > 0 && (
              <div className="metadata-tertiary">
                {post.tags.join(", ")}
              </div>
            )}
          </div>
        </header>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-12 pt-8 border-t border-[var(--color-rule)]">
          <Link href="/blog">
            ← Back to all writing
          </Link>
        </div>
      </div>
    </div>
  );
}
