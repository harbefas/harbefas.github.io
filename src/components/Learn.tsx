import { useTheme } from '../context/ThemeContext'
import { shelves } from '../data/reading'

const STEPS = [
  {
    n: '01',
    title: 'Pick a tool you already use every day',
    body: 'Not the fashionable one. The one whose annoyances you already know by heart, because that knowledge is the part nobody can give you.',
  },
  {
    n: '02',
    title: 'Read its source before you need to',
    body: 'Clone it and go find where the thing you use every day actually happens. You will not understand most of it. That is the exercise: you are learning to be lost in a real codebase without panicking.',
  },
  {
    n: '03',
    title: 'Report the next bug you hit, properly',
    body: 'Version, steps, what you expected. A good report is a real contribution and it teaches you to describe a fault precisely — which is most of debugging.',
  },
  {
    n: '04',
    title: 'Fix a small one',
    body: 'Small means: you can explain every line you changed. Nobody cares that it is small. The maintainer cares that it is correct and that the test proves it.',
  },
  {
    n: '05',
    title: 'Get told you are wrong',
    body: 'This is the part you cannot buy. A maintainer who knows the codebase reads your change and says what is wrong with it. That review is worth more than any course, and it is free.',
  },
  {
    n: '06',
    title: 'Repeat until the codebase stops being frightening',
    body: 'Then do it in a harder one.',
  },
]

export default function Learn() {
  const { theme } = useTheme()

  return (
    <div className="w-full">
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          Learning in the open
        </p>

        <h1 className="text-3xl sm:text-5xl font-bold mb-6" style={{ color: theme.fg }}>
          You don&rsquo;t have to rent your education either.
        </h1>

        <p className="text-base leading-relaxed mb-4" style={{ color: theme.operator }}>
          This whole site argues that the tools you depend on should not be rented. The same
          argument applies upstream of the tools, to how you learned to use them. The closed
          option is a course that expires, a certificate nobody checks, and a syllabus written
          to be sellable.
        </p>

        <p className="text-base leading-relaxed mb-4" style={{ color: theme.operator }}>
          Meanwhile: the source of every program on your machine is readable. The canonical texts
          of entire fields sit on university servers as PDFs. The people who wrote the software
          answer questions in public, in the issue tracker, for free. Anyone telling you the
          knowledge is behind a paywall is selling the paywall.
        </p>

        <p className="text-base leading-relaxed" style={{ color: theme.comment }}>
          The honest part: this route is slower at the start, and it leaves holes. Nobody hands
          you a syllabus, so you learn what you happen to bump into, and you find the gaps years
          later in production. Going and filling them on purpose is the discipline the whole thing
          rests on.
        </p>
      </section>

      <section id="method" className="w-full py-20 px-4" style={{ backgroundColor: theme.bg1 }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
            The method
          </p>

          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.fg }}>
            Learn by contributing
          </h2>

          <p className="text-base leading-relaxed mb-12" style={{ color: theme.operator }}>
            Reading takes you a long way and then stops. What moves you after that is writing code
            that someone who knows the codebase has to review before it ships. There is no
            substitute for it and nobody sells it, because it is hard to package and it is already
            free.
          </p>

          <ol className="flex flex-col gap-7">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span
                  className="font-mono text-sm pt-0.5 shrink-0"
                  style={{ color: theme.accent }}
                  aria-hidden
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold mb-1" style={{ color: theme.fg }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href="/find/"
            className="hover-lift flex items-center justify-between gap-6 rounded-lg p-5 mt-12"
            style={{ backgroundColor: theme.bg, border: `1px solid ${theme.accent}40` }}
          >
            <div>
              <h3 className="text-base font-semibold mb-1" style={{ color: theme.accent }}>
                Step three is the hard one to start
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
                So there is a page for it: issues nobody has claimed, in projects that still merge
                work from outside, with what each project asks of you spelled out.
              </p>
            </div>
            <span className="text-2xl shrink-0" style={{ color: theme.accent }} aria-hidden>
              &rarr;
            </span>
          </a>
        </div>
      </section>

      <section id="reading" className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          The reading
        </p>

        <h2 className="text-3xl font-bold mb-4" style={{ color: theme.fg }}>
          Free, and better than most of what is sold
        </h2>

        <p className="max-w-2xl text-base leading-relaxed mb-3" style={{ color: theme.operator }}>
          This is the openly available half of a longer list. The criterion for the whole thing is
          foundations, not tools: nothing that expires with a framework version. Several of these
          are not merely free alternatives &mdash; they are the canonical text of their field,
          which happens to be free.
        </p>

        <p className="max-w-2xl text-sm leading-relaxed mb-14" style={{ color: theme.comment }}>
          Every link was checked before publishing and every one is legal to read at the address
          given. For breadth instead of opinion, <a
            href="https://github.com/ossu/computer-science"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: theme.function }}
          >
            OSSU
          </a>{' '}
          and{' '}
          <a
            href="https://teachyourselfcs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: theme.function }}
          >
            Teach Yourself CS
          </a>{' '}
          are complete curricula and this is not trying to be one.
        </p>

        <div className="flex flex-col gap-16">
          {shelves.map((shelf) => (
            <div key={shelf.id}>
              <h3 className="text-xl font-semibold mb-1" style={{ color: theme.fg }}>
                {shelf.title}
              </h3>
              <p className="text-sm mb-6 max-w-2xl" style={{ color: theme.comment }}>
                {shelf.blurb}
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {shelf.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-opacity hover:opacity-70"
                      style={{ color: theme.function }}
                    >
                      {item.title}
                    </a>
                    <span className="text-sm" style={{ color: theme.comment }}>
                      {' '}
                      &mdash; {item.author}
                    </span>
                    {(item.kind || item.pages) && (
                      <span className="text-xs font-mono ml-2" style={{ color: theme.operator }}>
                        {[item.kind, item.pages].filter(Boolean).join(', ')}
                      </span>
                    )}
                    {item.note && (
                      <p className="text-xs leading-relaxed mt-1" style={{ color: theme.comment }}>
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
