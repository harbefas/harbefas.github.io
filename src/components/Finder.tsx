import { useMemo, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import type { ThemeColors } from '../theme/colors'
import data from '../../public/issues.json'

interface Axis {
  n: number
  why: string[]
}

interface Issue {
  repo: string
  number: number
  title: string
  url: string
  labels: string[]
  repoStars: number
  policy: { level: number; label: string; rule: string | null; source: string | null; verified: boolean }
  score: {
    value: number
    band: 'high' | 'medium' | 'low'
    classe: Axis
    alcance: Axis
    verificabilidade: Axis
    effort: Axis
    acceptance: Axis
    notes: string[]
  }
}

const issues = (data as { generated: string; issues: Issue[] }).issues
const generated = (data as { generated: string }).generated

/** Level 4 is shown, never hidden — contributing by hand is fine, and then the
 *  rule is just something to cite in the PR. */
const POLICY_COLOR: Record<number, keyof ThemeColors> = {
  1: 'comment',
  2: 'string',
  3: 'keyword',
  4: 'number',
}

function Bar({ n, label, color }: { n: number; label: string; color: string }) {
  const { theme } = useTheme()
  return (
    <span className="inline-flex items-center gap-1.5" title={label}>
      <span className="text-[11px] font-mono" style={{ color: theme.comment }}>
        {label}
      </span>
      <span className="inline-flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-1.5 h-3 rounded-sm"
            style={{ backgroundColor: i <= n ? color : theme.bg1 }}
          />
        ))}
      </span>
    </span>
  )
}

function IssueCard({ issue }: { issue: Issue }) {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const s = issue.score
  const policyColor = theme[POLICY_COLOR[issue.policy.level]] as string

  return (
    <li className="rounded-lg p-5" style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}>
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <a
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm transition-opacity hover:opacity-70"
          style={{ color: theme.function }}
        >
          {issue.repo}#{issue.number}
        </a>
        <span className="text-xs font-mono" style={{ color: theme.comment }}>
          {issue.repoStars.toLocaleString()} stars
        </span>
      </div>

      <h3 className="text-base mt-1 mb-4 font-sans" style={{ color: theme.fg }}>
        {issue.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3">
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{
            color: s.band === 'high' ? theme.bg : theme.fg,
            backgroundColor: s.band === 'high' ? theme.accent : theme.bg1,
          }}
        >
          value {s.value}
        </span>
        <Bar n={s.classe.n} label="class" color={theme.accent} />
        <Bar n={s.alcance.n} label="reach" color={theme.accent} />
        <Bar n={s.verificabilidade.n} label="repro" color={theme.accent} />
        <Bar n={s.effort.n} label="effort" color={theme.function} />
        <Bar n={s.acceptance.n} label="accept" color={theme.function} />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="font-mono" style={{ color: policyColor }}>
          AI policy: {issue.policy.label}
          {issue.policy.verified ? '' : ' (unread)'}
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="font-mono underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: theme.comment }}
        >
          {open ? 'hide' : 'why'}
        </button>
      </div>

      {s.notes.map((note) => (
        <p key={note} className="text-xs mt-3 font-mono" style={{ color: theme.number }}>
          ! {note}
        </p>
      ))}

      {open && (
        <dl className="mt-4 pt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs" style={{ borderTop: `1px solid ${theme.bg1}` }}>
          {(
            [
              ['class', s.classe],
              ['reach', s.alcance],
              ['repro', s.verificabilidade],
              ['effort', s.effort],
              ['acceptance', s.acceptance],
            ] as const
          ).map(([name, axis]) => (
            <div key={name}>
              <dt className="font-mono" style={{ color: theme.comment }}>
                {name} {axis.n}
              </dt>
              <dd style={{ color: theme.operator }}>{axis.why.join(' · ') || '—'}</dd>
            </div>
          ))}
          {issue.policy.rule && (
            <div className="sm:col-span-2">
              <dt className="font-mono" style={{ color: theme.comment }}>
                policy ({issue.policy.source})
              </dt>
              <dd style={{ color: theme.operator }}>{issue.policy.rule}</dd>
            </div>
          )}
        </dl>
      )}
    </li>
  )
}

export default function Finder() {
  const { theme } = useTheme()
  const [query, setQuery] = useState('')
  const [maxPolicy, setMaxPolicy] = useState(4)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return issues.filter((i) => {
      if (i.policy.level > maxPolicy) return false
      if (!q) return true
      return (
        i.repo.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.labels.some((l) => l.toLowerCase().includes(q))
      )
    })
  }, [query, maxPolicy])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20">
      <a
        href="/"
        className="inline-block text-xs font-mono mb-6 transition-opacity hover:opacity-70"
        style={{ color: theme.comment }}
      >
        &larr; Harbefas
      </a>

      <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
        Find something to fix
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: theme.fg }}>
        Issues worth your weekend
      </h1>

      <p className="max-w-2xl text-base leading-relaxed mb-3" style={{ color: theme.operator }}>
        Every aggregator shows you the <code className="font-mono text-sm">good first issue</code>{' '}
        label. The label lies: someone already has a branch, or the maintainer has not merged
        anything since 2024, or the project forbids the way you work. Everything below survived
        those three checks, then got scored on what the fix is worth.
      </p>

      <p className="max-w-2xl text-sm leading-relaxed mb-10" style={{ color: theme.comment }}>
        The scores are estimates from labels and text — press <em>why</em> on any card to see the
        evidence behind each one. Projects that prohibit AI-assisted contribution are labelled,
        never hidden: contributing by hand is fine, and then the rule is just something to cite.
      </p>

      <div className="flex flex-wrap gap-3 items-center mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filter by repo, title or label"
          className="flex-1 min-w-[220px] px-3 py-2 rounded-lg text-sm font-mono outline-none"
          style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}`, color: theme.fg }}
        />
        <div className="flex gap-1">
          {[
            { level: 1, label: 'grey only' },
            { level: 3, label: 'no prohibits' },
            { level: 4, label: 'everything' },
          ].map((opt) => (
            <button
              key={opt.level}
              onClick={() => setMaxPolicy(opt.level)}
              className="px-3 py-2 rounded-lg text-xs font-mono transition-colors"
              style={{
                backgroundColor: maxPolicy === opt.level ? theme.accent : 'transparent',
                color: maxPolicy === opt.level ? theme.bg : theme.comment,
                border: `1px solid ${maxPolicy === opt.level ? theme.accent : theme.bg1}`,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        {shown.map((issue) => (
          <IssueCard key={`${issue.repo}#${issue.number}`} issue={issue} />
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="text-sm" style={{ color: theme.comment }}>
          Nothing matches that filter.
        </p>
      )}

      <p className="text-xs font-mono mt-10" style={{ color: theme.comment }}>
        {shown.length} of {issues.length} · last run {generated.slice(0, 10)} ·{' '}
        <a href="https://github.com/harbefas" className="underline underline-offset-2">
          built with oss-triage
        </a>
      </p>
    </div>
  )
}
