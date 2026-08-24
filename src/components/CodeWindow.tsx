import type { ThemeColors } from '../theme/colors'

interface Token {
  text: string
  role: 'keyword' | 'string' | 'function' | 'type' | 'comment' | 'number' | 'operator' | 'fg' | 'fg2'
}

type CodeLine = Token[]

function t(text: string, role: Token['role']): Token {
  return { text, role }
}

const CODE_LINES_DARK: CodeLine[] = [
  [t('// yerba-mate — dark theme for Neovim', 'comment')],
  [],
  [t('import', 'keyword'), t(' { EventEmitter } ', 'fg'), t('from', 'keyword'), t(' ', 'fg'), t('"events"', 'string')],
  [t('import ', 'keyword'), t('type', 'keyword'), t(' { Readable } ', 'fg'), t('from', 'keyword'), t(' ', 'fg'), t('"stream"', 'string')],
  [],
  [t('type ', 'keyword'), t('Strength', 'type'), t(' = ', 'operator'), t('"mild"', 'string'), t(' | ', 'operator'), t('"strong"', 'string')],
  [],
  [t('interface ', 'keyword'), t('BrewConfig', 'type'), t(' {', 'fg')],
  [t('  temperature', 'fg'), t(': ', 'operator'), t('number', 'type')],
  [t('  strength', 'fg'), t(': ', 'operator'), t('Strength', 'type')],
  [t('  organic', 'fg'), t(': ', 'operator'), t('boolean', 'type')],
  [t('}', 'fg')],
  [],
  [t('class ', 'keyword'), t('YerbaMate', 'type'), t(' extends ', 'keyword'), t('EventEmitter', 'type'), t(' {', 'fg')],
  [t('  private ', 'keyword'), t('brewCount', 'fg'), t(' = ', 'operator'), t('0', 'number')],
  [],
  [t('  async ', 'keyword'), t('brew', 'function'), t('(label', 'fg'), t(': ', 'operator'), t('string', 'type'), t(')', 'fg'), t(': ', 'operator'), t('Promise', 'type'), t('<', 'operator'), t('string', 'type'), t('> {', 'fg')],
  [t('    this.brewCount', 'fg'), t('++', 'operator')],
  [t('    ', 'fg'), t('return', 'keyword'), t(' `brew #${', 'string'), t('this.brewCount', 'fg'), t('}` ', 'string')],
  [t('  }', 'fg')],
  [t('}', 'fg')],
]

const CODE_LINES_LIGHT: CodeLine[] = [
  [t('// terere — light theme for Neovim', 'comment')],
  [],
  [t('import', 'keyword'), t(' { EventEmitter } ', 'fg'), t('from', 'keyword'), t(' ', 'fg'), t('"events"', 'string')],
  [t('import ', 'keyword'), t('type', 'keyword'), t(' { Readable } ', 'fg'), t('from', 'keyword'), t(' ', 'fg'), t('"stream"', 'string')],
  [],
  [t('type ', 'keyword'), t('Strength', 'type'), t(' = ', 'operator'), t('"mild"', 'string'), t(' | ', 'operator'), t('"strong"', 'string')],
  [],
  [t('interface ', 'keyword'), t('BrewConfig', 'type'), t(' {', 'fg')],
  [t('  temperature', 'fg'), t(': ', 'operator'), t('number', 'type')],
  [t('  strength', 'fg'), t(': ', 'operator'), t('Strength', 'type')],
  [t('  organic', 'fg'), t(': ', 'operator'), t('boolean', 'type')],
  [t('}', 'fg')],
  [],
  [t('class ', 'keyword'), t('Terere', 'type'), t(' extends ', 'keyword'), t('EventEmitter', 'type'), t(' {', 'fg')],
  [t('  private ', 'keyword'), t('brewCount', 'fg'), t(' = ', 'operator'), t('0', 'number')],
  [],
  [t('  async ', 'keyword'), t('brew', 'function'), t('(label', 'fg'), t(': ', 'operator'), t('string', 'type'), t(')', 'fg'), t(': ', 'operator'), t('Promise', 'type'), t('<', 'operator'), t('string', 'type'), t('> {', 'fg')],
  [t('    this.brewCount', 'fg'), t('++', 'operator')],
  [t('    ', 'fg'), t('return', 'keyword'), t(' `brew #${', 'string'), t('this.brewCount', 'fg'), t('}` ', 'string')],
  [t('  }', 'fg')],
  [t('}', 'fg')],
]

interface Props {
  theme: ThemeColors
}

export default function CodeWindow({ theme }: Props) {
  const codeLines = theme.name === 'yerba-mate' ? CODE_LINES_DARK : CODE_LINES_LIGHT
  const tokenColor = (role: Token['role']): string => {
    switch (role) {
      case 'keyword': return theme.keyword
      case 'string': return theme.string
      case 'function': return theme.function
      case 'type': return theme.type
      case 'comment': return theme.comment
      case 'number': return theme.number
      case 'operator': return theme.operator
      case 'fg2': return theme.comment
      default: return theme.fg
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl flex-1 min-w-0"
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: theme.bg1 }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--red)' }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--yellow)' }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--green)' }} />
        <span
          className="ml-3 text-xs font-mono"
          style={{ color: theme.comment }}
        >
          brew.ts
        </span>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded"
          style={{ backgroundColor: theme.bg, color: theme.accent }}
        >
          {theme.label}
        </span>
      </div>

      <div className="flex overflow-x-auto" style={{ backgroundColor: theme.bg }}>
        <div
          className="select-none px-3 pt-4 pb-4 text-right text-xs font-mono leading-6 shrink-0"
          style={{ color: theme.comment, backgroundColor: theme.bg1, minWidth: '2.5rem' }}
        >
          {codeLines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <pre
          className="px-4 pt-4 pb-4 text-xs font-mono leading-6 text-left overflow-x-auto flex-1"
          style={{ color: theme.fg, backgroundColor: theme.bg, margin: 0 }}
        >
          {codeLines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line.length === 0 ? '\n' : line.map((token, j) => (
                <span key={j} style={{ color: tokenColor(token.role) }}>
                  {token.text}
                </span>
              ))}
              {i === codeLines.length - 1 && (
                <span className="cursor-blink" style={{ color: theme.fg }}>▋</span>
              )}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
