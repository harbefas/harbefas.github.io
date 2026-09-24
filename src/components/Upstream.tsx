import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'
import { upstream, counts } from '../data/upstream'

export default function Upstream() {
  const { theme } = useTheme()
  const ref = useScrollReveal<HTMLElement>()

  const stats = [
    { value: counts.merged, label: 'PRs merged' },
    { value: counts.open, label: 'open' },
    { value: counts.projects, label: 'projects' },
  ]

  return (
    <section
      ref={ref}
      id="upstream"
      className="reveal w-full py-20 px-4"
      style={{ backgroundColor: theme.bg1 }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          Upstream
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: theme.fg }}>
          The other half of the work
        </h2>

        <p className="max-w-2xl text-base leading-relaxed mb-10" style={{ color: theme.operator }}>
          The fastest open replacement is usually the project that already exists, one bug away from
          being good enough. So a fair share of the output lands in other people&rsquo;s
          repositories &mdash; a sync tool, a game engine, a BitTorrent client, a chess server &mdash;
          and never becomes a repository here.
        </p>

        <div className="flex gap-10 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-4xl font-bold font-mono tabular-nums" style={{ color: theme.accent }}>
                {s.value}
              </span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: theme.comment }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
          {upstream.map((u) => (
            <li key={u.repo} className="text-sm leading-relaxed">
              <a
                href={`https://github.com/${u.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono transition-opacity hover:opacity-70"
                style={{ color: theme.function }}
              >
                {u.name}
              </a>
              <span style={{ color: theme.comment }}> &mdash; {u.what}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
