import Link from 'next/link'

const SOCIAL_LINKS = [
  { href: 'https://github.com/ismaelm',   label: 'GitHub'   },
  { href: 'https://linkedin.com/in/ismaelm', label: 'LinkedIn' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="container-section flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          &copy; {year} Ismael M. Built with{' '}
          <Link href="https://nextjs.org" className="hover:text-[var(--color-brand-600)]">
            Next.js
          </Link>{' '}
          &amp;{' '}
          <Link href="https://tailwindcss.com" className="hover:text-[var(--color-brand-600)]">
            Tailwind CSS
          </Link>
          .
        </p>

        <ul className="flex items-center gap-4 list-none m-0 p-0">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-brand-600)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
