import Link from 'next/link'

const NAV_LINKS = [
  { href: '/blog',    label: 'Writing' },
  { href: '/contact', label: 'Contact' },
] as const

export default function Navigation() {
  return (
    <header className="border-b border-[var(--color-rule)] bg-[var(--color-background)]">
      <nav
        className="container-editorial flex items-center justify-between py-6 text-sans"
        aria-label="Main navigation"
      >
        {/* Name as plain text link */}
        <Link
          href="/"
          className="font-normal text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent)]"
        >
          Ismael Medeiros
        </Link>

        {/* Navigation links — wraps on mobile */}
        <ul className="flex flex-wrap items-center gap-4 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text-primary)] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
