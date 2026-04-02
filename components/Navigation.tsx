'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',          label: 'Home'     },
  { href: '/projects',  label: 'Projects' },
  { href: '/blog',      label: 'Blog'     },
  { href: '/contact',   label: 'Contact'  },
] as const

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
      <nav
        className="container-section flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo / Site name */}
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--color-text-primary)] no-underline hover:text-[var(--color-brand-600)] transition-colors"
        >
          Ismael M.
        </Link>

        {/* Desktop links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors no-underline',
                  isActive(href)
                    ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="btn btn-ghost md:hidden p-2"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* Animated hamburger icon */}
          <span className="relative block h-5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-200 ${
                isOpen ? 'top-2 rotate-45' : 'top-0.5'
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-full bg-current transition-all duration-200 ${
                isOpen ? 'opacity-0 translate-x-2' : ''
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-200 ${
                isOpen ? 'top-2 -rotate-45' : 'top-3.5'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-[var(--color-border)] overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <ul className="container-section flex flex-col gap-1 py-3 list-none m-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'block rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors',
                  isActive(href)
                    ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
                aria-current={isActive(href) ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
