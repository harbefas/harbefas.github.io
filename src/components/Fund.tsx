import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

/** Commitments sized to be kept alongside a day job. A promise that breaks in
 *  month three costs more than no promise. */
const PROMISES = [
  {
    title: 'A written report every month',
    body: 'What was merged, upstream and here, and what it fixed. Published in the open, whether or not anyone sponsored that month.',
  },
  {
    title: 'A first reply within seven days',
    body: 'On every issue in these repositories. Not a fix in seven days — an answer, from a person who read it.',
  },
  {
    title: 'Nothing behind a login',
    body: 'Sponsorship buys more of the work, never earlier access to it. No sponsor-only builds, no delayed releases, no feature held back.',
  },
]

export default function Fund() {
  const { theme } = useTheme()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="fund" className="reveal w-full py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          Funding
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: theme.fg }}>
          Somebody has to maintain the open option.
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: theme.operator }}>
          The open replacement for a rented tool only stays a replacement while someone answers its
          issues, reviews its patches and cuts its releases. That work is unpaid almost everywhere,
          which is the real reason open alternatives die &mdash; not a lack of talent, a lack of
          anyone whose week has room for it.
        </p>

        <p className="text-base leading-relaxed mb-8" style={{ color: theme.operator }}>
          So the work here is not only the projects listed above. It is the twenty patches merged
          into other people&rsquo;s repositories &mdash; rclone, Transmission, Lichess, raylib,
          lnav &mdash; and the triage behind them. Sponsorship buys more hours of exactly that.
        </p>

        <div
          className="rounded-lg p-6 mb-10"
          style={{ backgroundColor: theme.bg1, border: `1px solid ${theme.accent}40` }}
        >
          <p className="text-sm mb-2" style={{ color: theme.comment }}>
            The first milestone, stated plainly:
          </p>
          <p className="text-2xl font-bold mb-2" style={{ color: theme.fg }}>
            <span style={{ color: theme.accent }}>$250</span> a month
          </p>
          <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
            That is one working day a week bought back from paid employment and spent here. Not a
            salary, not a goal that needs thousands of strangers &mdash; one company that depends
            on this code, or a handful of people who use it.
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-5" style={{ color: theme.fg }}>
          What is promised in return
        </h3>

        <ul className="flex flex-col gap-5 mb-10">
          {PROMISES.map((p) => (
            <li key={p.title}>
              <h4 className="text-base font-semibold mb-1" style={{ color: theme.accent }}>
                {p.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="https://github.com/sponsors/nfvelten"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: `0 4px 20px ${theme.accent}40` }}
          >
            Sponsor on GitHub
          </a>
          <span className="text-sm" style={{ color: theme.comment }}>
            Company sponsorship, and what comes with it, is set up on the same page.
          </span>
        </div>
      </div>
    </section>
  )
}
