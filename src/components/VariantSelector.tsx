import type { ThemeColors } from '../theme/colors'

interface Props {
  themes: ThemeColors[]
  activeTheme: string
  onSelect: (themeName: string) => void
}

export default function VariantSelector({ themes, activeTheme, onSelect }: Props) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {themes.map((theme) => {
        const isActive = theme.name === activeTheme
        const isDark = theme.name === 'yerba-mate'

        return (
          <button
            key={theme.name}
            onClick={() => onSelect(theme.name)}
            className="group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: isActive ? theme.bg : 'transparent',
              border: `1px solid ${isActive ? theme.bg1 : 'transparent'}`,
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{
                backgroundColor: theme.bg,
                border: `2px solid ${theme.bg1}`,
                boxShadow: isActive ? `0 0 20px ${theme.accent}40` : 'none',
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
            </div>

            <span
              className="text-xs font-mono font-medium transition-colors duration-200"
              style={{
                color: isActive ? theme.fg : 'var(--tx-3)',
              }}
            >
              {theme.label}
            </span>

            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-mono"
              style={{
                backgroundColor: isDark ? 'var(--olive-bg)' : 'var(--cream-bg-2)',
                color: isDark ? 'var(--hue-yellow-dark)' : 'var(--hue-yellow-light)',
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {isDark ? 'dark' : 'light'}
            </span>

            {isActive && (
              <div
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}