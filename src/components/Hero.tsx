import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { theme, setTheme, isDark } = useTheme()

  return (
    <section className="relative flex flex-col items-center pt-24 pb-16 px-4 text-center overflow-hidden">
      <div
        className="pointer-events-none absolute -inset-20"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${theme.accent}18 0%, ${theme.accent}08 30%, transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <img
        src="/logo.png"
        alt=""
        className="w-20 h-20 mb-6 rounded-2xl relative z-10 transition-transform duration-300 hover:scale-110"
      />

      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 relative z-10" style={{ color: theme.fg }}>
        Harbefas
      </h1>

      <p className="max-w-xl text-lg mb-3 relative z-10" style={{ color: theme.fg }}>
        Open-source replacements for tools that should never have been rented.
      </p>

      <p className="max-w-xl text-sm mb-8 relative z-10" style={{ color: theme.comment }}>
        Reading, media, the browser, the desktop, the agents that touch your production systems.
        Terminal-first, keyboard-driven, no account required.
      </p>

      <div className="flex gap-3 mb-8 relative z-10">
        {['UNIX-shaped', 'keyboard-first', 'self-hosted', 'copyleft'].map((tag) => (
          <span
            key={tag}
            className="hidden sm:inline text-xs font-mono px-3 py-1 rounded-full"
            style={{ color: theme.comment, border: `1px solid ${theme.bg1}` }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative z-10">
        <ThemeToggle onThemeChange={setTheme} currentTheme={theme} />
      </div>

      <div className="flex gap-4 mt-10 relative z-10">
        <a
          href="#projects"
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: `0 4px 20px ${theme.accent}40` }}
        >
          Projects
        </a>
        <a
          href="https://github.com/harbefas"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{ border: `1px solid ${theme.bg1}`, color: theme.fg }}
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
