import { useTheme } from '../context/ThemeContext'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/harbefas' },
  { label: 'Arbitus', href: 'https://arbitus-gateway.xyz' },
  { label: 'Mate Creations', href: 'https://harbefas.github.io/matecreations-site/' },
  { label: 'nicholas-velten.xyz', href: 'https://nicholas-velten.xyz' },
]

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="w-full py-12 px-4" style={{ borderTop: `1px solid ${theme.bg1}` }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <img src="/logo.png" alt="" className="w-8 h-8 rounded-lg opacity-60" />

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: theme.comment }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs" style={{ color: theme.comment }}>
          <span>Harbefas</span>
          <span>&middot;</span>
          <span>MIT licensed</span>
          <span>&middot;</span>
          <span>Built by Nicholas Velten</span>
        </div>
      </div>
    </footer>
  )
}
