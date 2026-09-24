import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

const WAYS = [
  {
    title: 'Run it and file what breaks',
    body: 'A bug report from a real setup is worth more than a star. Issues are open on every repository.',
  },
  {
    title: 'Send a patch here',
    body: 'Rust, Python, Lua, JavaScript, shell. Small pull requests, MIT throughout, no CLA to sign.',
  },
  {
    title: 'Send one upstream',
    body: 'The fastest open replacement is often the project that already exists, one missing feature away.',
  },
]

export default function Contribute() {
  const { theme } = useTheme()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="contribute"
      className="reveal w-full py-20 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          How to join
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={{ color: theme.fg }}>
          Three ways in
        </h2>

        <div className="grid sm:grid-cols-3 gap-8 mb-12 stagger">
          {WAYS.map((w) => (
            <div key={w.title}>
              <h3 className="text-base font-semibold mb-2" style={{ color: theme.accent }}>
                {w.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
                {w.body}
              </p>
            </div>
          ))}
        </div>

        <a
          href="/find/"
          className="hover-lift flex items-center justify-between gap-6 rounded-lg p-5 mb-6"
          style={{ backgroundColor: theme.bg1, border: `1px solid ${theme.accent}40` }}
        >
          <div>
            <h3 className="text-base font-semibold mb-1" style={{ color: theme.accent }}>
              Don&rsquo;t know where to start?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
              A list of issues nobody has claimed, in projects that still merge outside work,
              scored on what the fix is worth &mdash; and labelled with what each project asks of
              AI-assisted contributors.
            </p>
          </div>
          <span className="text-2xl shrink-0" style={{ color: theme.accent }} aria-hidden>
            &rarr;
          </span>
        </a>

        <div
          className="rounded-lg overflow-hidden font-mono text-sm"
          style={{ backgroundColor: theme.bg1, border: `1px solid ${theme.bg1}` }}
        >
          <div className="flex gap-1.5 px-4 py-2.5" style={{ borderBottom: `1px solid ${theme.bg1}` }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.number }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.keyword }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.string }} />
          </div>
          <pre className="px-4 py-4 overflow-x-auto" style={{ color: theme.fg }}>
            <code>
              <span style={{ color: theme.accent }}>$</span> gh repo clone harbefas/paperboy{'\n'}
              <span style={{ color: theme.accent }}>$</span> gh issue list --label{' '}
              <span style={{ color: theme.string }}>&apos;good first issue&apos;</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
