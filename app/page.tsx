import Link from "next/link";
import Image from "next/image";
import { projects, blogPosts, contactInfo, experiences, education } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="container-editorial">
      {/* 1. Header / Intro */}
      <section id="top" className="section-major">
        {/* Optional profile photo - uncomment to use */}
        <Image
          src="/profile.png"
          alt="Ismael Medeiros"
          width={120}
          height={120}
          className="mb-6 rounded-full"
          priority
        />

        <h1>Ismael Medeiros</h1>

        <div className="max-w-[42.5rem] space-y-4">
          <p>
            Senior backend engineer focused on blockchain infrastructure and smart contract security.
            Currently building high-throughput event pipelines at Blockparty and researching symbolic
            execution for EVM bytecode. Based in Brasília, Brazil.
          </p>

          {/* Metadata row */}
          <div className="metadata flex flex-wrap gap-x-4 gap-y-2 pt-2">
            <span>{contactInfo.location}</span>
            <span className="text-[var(--color-text-tertiary)]">|</span>
            <span>{contactInfo.currentRole}, {contactInfo.currentCompany}</span>
            <span className="text-[var(--color-text-tertiary)]">|</span>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <span className="text-[var(--color-text-tertiary)]">|</span>
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
              {contactInfo.githubHandle}
            </a>
            <span className="text-[var(--color-text-tertiary)]">|</span>
            <span>{contactInfo.ens}</span>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a href="/cv.pdf" download className="btn btn-primary">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="section-major">
        <nav aria-label="Table of contents">
          <div className="flex flex-wrap gap-x-4 gap-y-2 metadata">
            <a href="#work">Selected work</a>
            <span className="text-[var(--color-text-tertiary)]">·</span>
            <a href="#writing">Writing & research</a>
            <span className="text-[var(--color-text-tertiary)]">·</span>
            <a href="#experience">Experience</a>
            <span className="text-[var(--color-text-tertiary)]">·</span>
            <a href="#education">Education</a>
            <span className="text-[var(--color-text-tertiary)]">·</span>
            <a href="#open-source">Open source</a>
            <span className="text-[var(--color-text-tertiary)]">·</span>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </section>

      {/* 2. Selected work */}
      <section id="work" className="section-major">
        <h2>Selected work</h2>

        {projects.map((project, index) => (
          <div key={project.id}>
            <article className="project-entry">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="project-title">{project.name}</span>
                <span className="text-[var(--color-text-tertiary)]">—</span>
                <span className="project-year">{project.year}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <p className="project-abstract">{project.abstract}</p>

              <div className="project-meta space-y-1">
                <div>
                  <span className="text-[var(--color-text-secondary)]">Stack:</span>{" "}
                  {project.stack.join(", ")}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-[var(--color-text-secondary)]">Links:</span>
                  {project.links.repo && (
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                      repo
                    </a>
                  )}
                  {project.links.paper && (
                    <a href={project.links.paper} target="_blank" rel="noopener noreferrer">
                      paper
                    </a>
                  )}
                  {project.links.post && (
                    <a href={project.links.post} target="_blank" rel="noopener noreferrer">
                      post
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      demo
                    </a>
                  )}
                </div>
              </div>
            </article>

            {index < projects.length - 1 && <hr className="rule" />}
          </div>
        ))}
      </section>

      {/* 3. Writing & research */}
      <section id="writing" className="section-major">
        <h2>Writing & research</h2>

        <div className="space-y-0">
          {blogPosts
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, 6)
            .map((post) => {
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
                  </div>
                </article>
              );
            })}
        </div>

        <div className="mt-6">
          <Link href="/blog">View all writing →</Link>
        </div>
      </section>

      {/* 4. Experience */}
      <section id="experience" className="section-major">
        <h2>Experience</h2>

        {experiences.map((exp, index) => (
          <article key={index} className="experience-entry">
            <div className="experience-header">
              {exp.company} <span className="experience-role">— {exp.title}</span>
            </div>
            <div className="experience-dates">{exp.period}</div>
            <p className="experience-description">{exp.description}</p>
          </article>
        ))}
      </section>

      {/* 5. Education */}
      <section id="education" className="section-major">
        <h2>Education</h2>

        {education.map((edu, index) => (
          <article key={index} className="experience-entry">
            <div className="experience-header">
              {edu.institution} — {edu.degree}, {edu.field}
            </div>
            <div className="experience-dates">{edu.period}</div>
            {edu.thesis && (
              <p className="experience-description">
                Thesis:{" "}
                <a href={edu.thesis.url} target="_blank" rel="noopener noreferrer">
                  {edu.thesis.title}
                </a>
              </p>
            )}
          </article>
        ))}
      </section>

      {/* 6. Open source */}
      <section id="open-source" className="section-major">
        <h2>Open source</h2>

        <div className="space-y-3">
          {[
            { name: "dogefuzz", description: "Coverage-guided fuzzing for EVM smart contracts", stars: 47 },
            { name: "evm-state-merge", description: "State merging optimization for symbolic execution", stars: 23 },
            { name: "cross-drift-detector", description: "Static analysis for cross-contract vulnerabilities", stars: 31 },
            { name: "solidity-patterns", description: "Security patterns and anti-patterns for Solidity", stars: 156 },
          ].map((repo) => (
            <div key={repo.name} className="flex items-baseline gap-3 flex-wrap">
              <a
                href={`https://github.com/${contactInfo.githubHandle}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="metadata font-semibold"
              >
                {repo.name}
              </a>
              <span className="text-[var(--color-text-tertiary)] text-sm">—</span>
              <span className="text-[var(--color-text-secondary)] flex-1">{repo.description}</span>
              <span className="metadata-tertiary">★ {repo.stars}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
            View all on GitHub →
          </a>
        </div>
      </section>

      {/* 7. Contact */}
      <section id="contact" className="section-major">
        <h2>Contact</h2>

        <p className="max-w-[42.5rem]">
          The best way to reach me is by email at{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>. I'm also on GitHub as{" "}
          <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
            {contactInfo.githubHandle}
          </a>{" "}
          and ENS as <span className="text-mono">{contactInfo.ens}</span>.
        </p>

        {contactInfo.linkedin && (
          <p className="mt-4">
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        )}
      </section>

      {/* Back to top button */}
      <a
        href="#top"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 btn btn-secondary bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        aria-label="Back to top"
      >
        ↑ Top
      </a>
    </div>
  );
}
