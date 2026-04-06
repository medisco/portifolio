import Link from "next/link";

const GitHubIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.5v8.5h2.5v-4.34c0-.77.62-1.4 1.4-1.4a1.4 1.4 0 0 1 1.4 1.4v4.34h2.5M7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
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

      {/* Skills Section */}
      <div className="container-section py-16 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-8">
          Skills & Technologies
        </h2>

        <div className="space-y-6">
          {/* Languages */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Languages
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Go", "TypeScript", "Node.js", "Python"].map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Databases & Caching
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["PostgreSQL", "Redis", "MySQL", "MongoDB"].map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Infrastructure
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Docker", "Kubernetes", "Terraform", "AWS"].map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Observability */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Observability
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["OpenTelemetry", "Prometheus", "Grafana", "ELK Stack"].map(
                (tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="container-section py-16 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-6">
          Connect
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/ismaelm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2"
          >
            {GitHubIcon}
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ismaelm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost gap-2"
          >
            {LinkedInIcon}
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
