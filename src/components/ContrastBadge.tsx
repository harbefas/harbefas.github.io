import { getContrastRatio, getWcagRating } from '../utils/colorUtils'

interface Props {
  foreground: string
  background: string
  size?: 'sm' | 'md'
}

export default function ContrastBadge({ foreground, background, size = 'sm' }: Props) {
  const ratio = getContrastRatio(foreground, background)
  const rating = getWcagRating(ratio)
  const passes = rating !== 'Fail'

  const sizeClasses = size === 'sm' 
    ? 'text-[10px] px-1.5 py-0.5' 
    : 'text-xs px-2 py-1'

  const hue = passes ? 'var(--green)' : 'var(--red)'
  const bgColor = `color-mix(in srgb, ${hue} 15%, transparent)`
  const borderColor = `color-mix(in srgb, ${hue} 30%, transparent)`

  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-mono font-medium ${sizeClasses}`}
      style={{
        backgroundColor: bgColor,
        color: hue,
        border: `1px solid ${borderColor}`,
      }}
    >
      <span>{ratio.toFixed(1)}:1</span>
      <span className="opacity-70">{rating}</span>
    </span>
  )
}