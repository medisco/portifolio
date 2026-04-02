import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container-section py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[var(--color-brand-600)] mb-3">
          Hello, I&apos;m
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl mb-6">
          Ismael M.
          <span className="block text-[var(--color-text-secondary)] text-3xl font-semibold sm:text-4xl mt-1">
            Senior Backend Engineer
          </span>
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          I build distributed systems, high-throughput APIs, and developer tooling.
          Specializing in Go, Node.js, PostgreSQL, and Redis.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            View Projects
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
