export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16">
      <div className="container-editorial">
        <hr className="border-0 border-t border-[var(--color-rule)] mb-8" />

        <div className="pb-12 text-center text-sans text-[var(--color-text-tertiary)]">
          <p className="mb-2">
            © {year} Ismael Medeiros
          </p>
          <p>
            <a
              href="https://github.com/medisco/portifolio"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
