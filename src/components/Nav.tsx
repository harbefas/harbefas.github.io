import { useTheme } from '../context/ThemeContext'

/** Absolute hrefs throughout, so the same bar works from every page. */
const LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Upstream', href: '/#upstream' },
  { label: 'Learn', href: '/learn/' },
  { label: 'Find', href: '/find/' },
]

export default function Nav({ current }: { current?: string }) {
  const { theme } = useTheme()

  return (
    <nav
      className="sticky top-0 z-40 w-full backdrop-blur"
      style={{ backgroundColor: `${theme.bg}e6`, borderBottom: `1px solid ${theme.bg1}` }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
          <img src="/logo.png" alt="" className="w-6 h-6 rounded" />
          <span className="font-semibold" style={{ color: theme.fg }}>
            Harbefas
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-2.5 py-1.5 rounded text-sm font-mono transition-colors"
              style={{ color: l.label === current ? theme.accent : theme.comment }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
