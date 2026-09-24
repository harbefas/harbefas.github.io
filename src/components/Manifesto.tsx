import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

const PRINCIPLES = [
  {
    title: 'One job, done in the open',
    body: 'Small programs with a single responsibility, readable in an afternoon, licensed MIT. Nothing here needs a plan tier, an account or a phone number, and nothing here stops working when a company pivots.',
  },
  {
    title: 'The shape is UNIX',
    body: 'Keyboard before mouse, terminal before tab, plain text before database, composition before integration. Emacs, Neovim, tmux and a shell are the room these tools are built for.',
  },
  {
    title: 'Your machine, your data',
    body: 'Local-first by default. Self-hosted when a server is genuinely needed. Telemetry never. If a feature requires shipping your reading, your library or your keystrokes somewhere else, the feature loses.',
  },
  {
    title: 'Upstream counts as shipping',
    body: 'Half the work is not a new repository. It is a patch to the reader, the compositor or the gateway that already exists, so the open option keeps closing the gap on the paid one.',
  },
]

export default function Manifesto() {
  const { theme } = useTheme()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="manifesto"
      className="reveal w-full py-20 px-4"
      style={{ backgroundColor: theme.bg1 }}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          Why
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: theme.fg }}>
          Most of the software you use every day is someone else&rsquo;s business model.
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: theme.operator }}>
          The feed decides what you read. The library disappears when the licence lapses. The editor
          phones home. The assistant runs under rules written by the company that sells it. None of
          that is a technical requirement &mdash; it is what happens when the tool belongs to a vendor
          and you are the tenant.
        </p>

        <p className="text-base leading-relaxed mb-12" style={{ color: theme.operator }}>
          Harbefas takes one of those tools at a time and builds the version you can own: read the
          source, run it offline, fork it if the maintainer goes quiet. Sometimes that means a new
          program. Often it means a patch to one that already exists.
        </p>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 stagger">
          {PRINCIPLES.map((p) => (
            <div key={p.title}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.accent }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
