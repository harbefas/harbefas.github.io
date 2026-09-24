import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

/** Four of the entries from /learn/, picked because the names carry the
 *  argument on their own: these are not free alternatives to something
 *  better, they are the standard text of their field. */
const PROOF = [
  { title: 'Operating Systems: Three Easy Pieces', by: 'Arpaci-Dusseau' },
  { title: 'Structure and Interpretation of Computer Programs', by: 'Abelson & Sussman' },
  { title: 'Crafting Interpreters', by: 'Robert Nystrom' },
  { title: 'A Graduate Course in Applied Cryptography', by: 'Boneh & Shoup' },
]

export default function LearnTeaser() {
  const { theme } = useTheme()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="learning" className="reveal w-full py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          Learning
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: theme.fg }}>
          Nobody has to rent their way in, either.
        </h2>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <p className="text-base leading-relaxed mb-4" style={{ color: theme.operator }}>
              The argument on this page does not stop at the tools. It runs upstream of them, to
              how anyone learns to build one. The closed option is a course that expires and a
              certificate nobody checks. Meanwhile the source of every program on your machine is
              readable, and the canonical text of entire fields sits on a university server as a
              PDF.
            </p>

            <p className="text-base leading-relaxed" style={{ color: theme.operator }}>
              And past a certain point reading stops working. What moves you after that is a patch
              someone who knows the codebase has to review before it ships &mdash; which is exactly
              the upstream work above, and why the two halves of this site are the same half.
            </p>
          </div>

          <div>
            <p className="text-sm mb-4" style={{ color: theme.comment }}>
              Four of the forty-three on the reading list. None of these is a cheaper substitute
              for something better &mdash; each is the standard text of its field, which happens to
              cost nothing:
            </p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {PROOF.map((b) => (
                <li key={b.title} className="text-sm leading-snug">
                  <span style={{ color: theme.fg }}>{b.title}</span>
                  <span style={{ color: theme.comment }}> &mdash; {b.by}</span>
                </li>
              ))}
            </ul>

            <a
              href="/learn/"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: theme.accent }}
            >
              The argument, the method and the list
              <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
