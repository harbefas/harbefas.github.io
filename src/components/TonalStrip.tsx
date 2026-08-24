import { hexToLab, labToHex } from '../utils/colorUtils'

interface Props {
  baseColor: string
  label: string
  steps?: number
}

export default function TonalStrip({ baseColor, label, steps = 9 }: Props) {
  const baseLab = hexToLab(baseColor)
  
  const tones: string[] = []
  for (let i = 0; i < steps; i++) {
    const L = 10 + (i * 80 / (steps - 1))
    tones.push(labToHex(L, baseLab.a * 0.5, baseLab.b * 0.5))
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-mono" style={{ color: 'var(--tx-3)' }}>{label}</span>
      <div className="flex rounded-lg overflow-hidden h-8">
        {tones.map((tone, i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center text-[8px] font-mono"
            style={{
              backgroundColor: tone,
              // Ink is picked from the tone's own lightness, not from the active theme:
              // the strip paints both ends of the ramp at once.
              color: i < steps / 2 ? 'var(--neutral-text-dark)' : 'var(--olive-bg)',
            }}
          >
            {Math.round(10 + (i * 80 / (steps - 1)))}
          </div>
        ))}
      </div>
    </div>
  )
}