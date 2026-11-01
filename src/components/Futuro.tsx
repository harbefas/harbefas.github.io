import { useTheme } from '../context/ThemeContext'
import { copy, type Lang } from '../data/futuro'

export default function Futuro({ lang }: { lang: Lang }) {
  const { theme } = useTheme()
  const c = copy[lang]

  const eyebrow = (text: string) => (
    <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
      {text}
    </p>
  )
  const paragraph = (text: string, last = false) => (
    <p
      key={text}
      className={`text-base leading-relaxed ${last ? '' : 'mb-4'}`}
      style={{ color: theme.operator }}
    >
      {text}
    </p>
  )
  const card = (k: { title: string; body: string; href?: string }) => {
    const inner = (
      <>
        <h3 className="text-base font-semibold mb-1" style={{ color: theme.accent }}>
          {k.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: theme.comment }}>
          {k.body}
        </p>
      </>
    )
    const box = 'block rounded-lg p-5 h-full'
    const style = { backgroundColor: theme.bg, border: `1px solid ${theme.accent}30` }
    if (!k.href) return <div key={k.title} className={box} style={style}>{inner}</div>
    const external = k.href.startsWith('http')
    return (
      <a
        key={k.title}
        href={k.href}
        className={`${box} hover-lift`}
        style={style}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="w-full">
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <div className="flex items-center justify-between gap-4 mb-4">
          {eyebrow(c.eyebrow)}
          <a
            href={c.switchTo.href}
            hrefLang={lang === 'pt' ? 'en' : 'pt-BR'}
            className="text-xs font-mono mb-4 underline underline-offset-2"
            style={{ color: theme.function }}
          >
            {c.switchTo.label}
          </a>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold mb-6" style={{ color: theme.fg }}>
          {c.title}
        </h1>

        {c.lede.map((t, i) => paragraph(t, i === c.lede.length - 1))}
      </section>

      <section className="w-full py-20 px-4" style={{ backgroundColor: theme.bg1 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.fg }}>
            {c.feel.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">{c.feel.cards.map(card)}</div>
          <p className="text-xl font-semibold" style={{ color: theme.accent }}>
            {c.feel.closing}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6" style={{ color: theme.fg }}>
          {c.where.title}
        </h2>
        {c.where.body.map((t, i) => paragraph(t, i === c.where.body.length - 1))}
      </section>

      <section className="w-full py-20 px-4" style={{ backgroundColor: theme.bg1 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.fg }}>
            {c.exists.title}
          </h2>
          {paragraph(c.exists.intro)}
          <div className="grid sm:grid-cols-2 gap-4 my-8">{c.exists.cards.map(card)}</div>
          <p className="text-base leading-relaxed" style={{ color: theme.comment }}>
            {c.exists.closing}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6" style={{ color: theme.fg }}>
          {c.could.title}
        </h2>
        {c.could.body.map((t, i) => paragraph(t, i === c.could.body.length - 1))}
      </section>

      <section className="w-full py-20 px-4" style={{ backgroundColor: theme.bg1 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.fg }}>
            {c.join.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">{c.join.cards.map(card)}</div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6" style={{ color: theme.fg }}>
          {c.name.title}
        </h2>
        {paragraph(c.name.intro)}

        <figure className="my-10 pl-6" style={{ borderLeft: `3px solid ${theme.accent}` }}>
          <blockquote className="text-xl sm:text-2xl leading-snug mb-3" style={{ color: theme.fg }}>
            &ldquo;{c.name.quote}&rdquo;
          </blockquote>
          <figcaption className="text-sm" style={{ color: theme.comment }}>
            {c.name.cite}
          </figcaption>
        </figure>

        {paragraph(c.name.body)}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-8">
          {c.name.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm underline underline-offset-2"
              style={{ color: theme.function }}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label} &rarr;
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
