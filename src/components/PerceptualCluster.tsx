import { hexToLab } from '../utils/colorUtils'
import type { ThemeColors } from '../theme/colors'

interface Props {
  theme: ThemeColors
  showLabValues?: boolean
}

interface ColorPoint {
  name: string
  hex: string
  L: number
  a: number
  b: number
}

export default function PerceptualCluster({ theme, showLabValues = false }: Props) {
  const colors: ColorPoint[] = [
    { name: 'Keyword', hex: theme.keyword, ...hexToLab(theme.keyword) },
    { name: 'String', hex: theme.string, ...hexToLab(theme.string) },
    { name: 'Function', hex: theme.function, ...hexToLab(theme.function) },
    { name: 'Type', hex: theme.type, ...hexToLab(theme.type) },
    { name: 'Number', hex: theme.number, ...hexToLab(theme.number) },
    { name: 'Comment', hex: theme.comment, ...hexToLab(theme.comment) },
    { name: 'Accent', hex: theme.accent, ...hexToLab(theme.accent) },
  ]

  const lMin = Math.min(...colors.map(c => c.L))
  const lMax = Math.max(...colors.map(c => c.L))
  const lRange = lMax - lMin

  const viewBoxWidth = 200
  const viewBoxHeight = 120
  const padding = 20

  const scaleX = (a: number) => padding + ((a + 128) / 256) * (viewBoxWidth - 2 * padding)
  const scaleY = (b: number) => padding + ((128 - b) / 256) * (viewBoxHeight - 2 * padding)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: theme.accent }}>
          Perceptual Cluster
        </h3>
        <p className="text-xs mb-4" style={{ color: theme.comment }}>
          L* {lMin.toFixed(0)}–{lMax.toFixed(0)} · Range {lRange.toFixed(0)}
        </p>

        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="w-full h-auto">
          <rect
            x={padding}
            y={padding}
            width={viewBoxWidth - 2 * padding}
            height={viewBoxHeight - 2 * padding}
            fill="none"
            stroke={theme.bg1}
            strokeWidth="0.5"
          />

          <line
            x1={padding}
            y1={viewBoxHeight / 2}
            x2={viewBoxWidth - padding}
            y2={viewBoxHeight / 2}
            stroke={theme.bg1}
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <line
            x1={viewBoxWidth / 2}
            y1={padding}
            x2={viewBoxWidth / 2}
            y2={viewBoxHeight - padding}
            stroke={theme.bg1}
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />

          {colors.map((color, i) => (
            <g key={i}>
              <circle
                cx={scaleX(color.a)}
                cy={scaleY(color.b)}
                r="6"
                fill={color.hex}
                stroke="var(--border-2)"
                strokeWidth="1"
              />
              <text
                x={scaleX(color.a)}
                y={scaleY(color.b) - 10}
                textAnchor="middle"
                fontSize="6"
                fill={theme.comment}
              >
                {color.name}
              </text>
              {showLabValues && (
                <text
                  x={scaleX(color.a)}
                  y={scaleY(color.b) + 14}
                  textAnchor="middle"
                  fontSize="5"
                  fill={theme.comment}
                >
                  L{color.L.toFixed(0)}
                </text>
              )}
            </g>
          ))}
        </svg>

        <div className="flex items-center justify-between text-[10px] mt-2" style={{ color: theme.comment }}>
          <span>green</span>
          <span>a* axis</span>
          <span>red</span>
        </div>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: theme.accent }}>
          Lightness Scale (L*)
        </h3>

        <div className="relative h-8 rounded overflow-hidden" style={{ backgroundColor: theme.bg1 }}>
          {colors.map((color, i) => {
            const left = ((color.L - lMin + 5) / (lRange + 10)) * 100
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${left}%` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color.hex, border: `1px solid ${theme.comment}40` }}
                />
                <span className="text-[8px] mt-0.5" style={{ color: theme.comment }}>
                  {color.L.toFixed(0)}
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between text-[10px] mt-2" style={{ color: theme.comment }}>
          <span>Dark</span>
          <span>Bright</span>
        </div>
      </div>
    </div>
  )
}