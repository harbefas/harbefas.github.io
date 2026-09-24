import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

const PRINCIPLES = [
  {
    title: 'One job, done in the open',
    body: 'Small programs with a single responsibility, readable in an afternoon, and copyleft where it counts. Nothing here needs a plan tier, an account or a phone number, and nothing here stops working when a company pivots.',
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

        <div className="mt-14 pt-10" style={{ borderTop: `1px solid ${theme.bg}` }}>
          <h3 className="text-lg font-semibold mb-3" style={{ color: theme.accent }}>
            Which licence, and why
          </h3>

          <p className="text-sm leading-relaxed mb-3" style={{ color: theme.operator }}>
            Rented, in practice, means run as a service. A permissive licence allows exactly that:
            take the code, close it, rent it back. The GPL stops the closed fork but not the
            service, because a company that only ever runs the software never distributes it. The
            AGPL closes that gap.
          </p>

          <p className="text-sm leading-relaxed mb-3" style={{ color: theme.operator }}>
            So the rule here is what the software is shaped like, not a house style. Anything
            someone could run as a service &mdash; Arbitus, Oikos, agent-memory &mdash; is
            <strong style={{ color: theme.fg }}> AGPL-3.0</strong>. Anything you run on your own
            machine is <strong style={{ color: theme.fg }}>GPL-3.0</strong>: nobody rents a desktop
            chess client, and the risk there is a closed fork, which the GPL already answers.
            Themes, colourschemes and design tokens stay <strong style={{ color: theme.fg }}>MIT</strong>,
            because being copied everywhere is the entire point of them.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
            This costs something, and pretending otherwise would be dishonest: the AGPL is banned
            outright inside some companies, which narrows who is allowed to contribute. That is a
            fair price on the projects where the alternative is watching the open version reappear
            as somebody&rsquo;s paid tier.
          </p>
        </div>
      </div>
    </section>
  )
}
