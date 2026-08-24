import { themes } from '../theme/colors'
import type { ThemeColors } from '../theme/colors'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'
import ContrastBadge from './ContrastBadge'
import PerceptualCluster from './PerceptualCluster'
import TonalStrip from './TonalStrip'
import ComponentPreview from './ComponentPreview'
import ColorInspector from './ColorInspector'

const LAYERS = [
  { key: 'bg', label: 'Background' },
  { key: 'bg1', label: 'Layer 01' },
  { key: 'fg', label: 'Foreground' },
  { key: 'keyword', label: 'Keywords' },
  { key: 'string', label: 'Strings' },
  { key: 'function', label: 'Functions' },
  { key: 'type', label: 'Types' },
  { key: 'comment', label: 'Comments' },
] as const

function PaletteRow({ theme }: { theme: ThemeColors }) {
  const isDark = theme.name === 'yerba-mate'

  return (
    <div
      className="w-full rounded-2xl p-6 flex flex-col gap-6"
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide" style={{ color: theme.accent }}>
          {theme.label} — {isDark ? 'dark' : 'light'}
        </span>
        <ContrastBadge foreground={theme.fg} background={theme.bg} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {LAYERS.map(({ key, label }) => {
          const color = theme[key] as string
          return (
            <div key={key} className="group flex flex-col items-center gap-2 relative">
              <ColorInspector 
                color={color} 
                label={label} 
                borderColor={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
              />
              <span className="text-xs font-mono" style={{ color: theme.comment }}>
                {label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <TonalStrip baseColor={theme.accent} label="Accent Tones" />
        <TonalStrip baseColor={theme.keyword} label="Keyword Tones" />
        <TonalStrip baseColor={theme.string} label="String Tones" />
      </div>
    </div>
  )
}

export default function Palette() {
  const ref = useScrollReveal<HTMLElement>()
  const { theme } = useTheme()

  return (
    <section ref={ref} id="palette" className="reveal w-full py-16 px-4" style={{ backgroundColor: theme.bg1 }}>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="text-2xl font-semibold tracking-tight text-center" style={{ color: 'var(--tx)' }}>
          Palette
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <PaletteRow key={theme.name} theme={theme} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {themes.map((theme) => (
            <PerceptualCluster key={theme.name} theme={theme} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {themes.map((theme) => (
            <ComponentPreview key={theme.name} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}