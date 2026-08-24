import { useState, useRef, useEffect } from 'react'
import { hexToRgb, hexToLab } from '../utils/colorUtils'

interface Props {
  color: string
  label: string
  borderColor?: string
}

export default function ColorInspector({ color, label, borderColor }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const rgb = hexToRgb(color)
  const lab = hexToLab(color)
  const border = borderColor ?? 'rgba(255,255,255,0.1)'

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const copyToClipboard = async (value: string, type: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(null), 1500)
  }

  const formats = [
    { type: 'hex', label: 'HEX', value: color.toUpperCase() },
    { type: 'rgb', label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { type: 'lab', label: 'L*a*b*', value: `L*${lab.L.toFixed(0)} a*${lab.a.toFixed(0)} b*${lab.b.toFixed(0)}` },
  ]

  return (
    <div className="relative w-12 h-12">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full rounded-lg cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
        style={{ backgroundColor: color, border: `2px solid ${border}` }}
        aria-label={`Inspect ${label} color: ${color}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      />
      
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`${label} color values`}
          className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-lg shadow-xl"
          style={{
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            minWidth: '180px',
          }}
        >
          <div className="text-xs font-semibold mb-2 opacity-60" style={{ color: 'var(--tx)' }}>
            {label}
          </div>
          
          {formats.map(({ type, label: fmtLabel, value }) => (
            <button
              key={type}
              onClick={() => copyToClipboard(value, type)}
              className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left hover:bg-white/5 transition-colors"
              style={{ color: 'var(--tx)' }}
            >
              <span className="text-[10px] font-mono opacity-50">{fmtLabel}</span>
              <span className="text-xs font-mono">{copied === type ? 'Copied!' : value}</span>
            </button>
          ))}
          
          <div className="mt-2 pt-2 border-t opacity-30" style={{ borderColor: 'var(--tx)' }}>
            <div className="text-[10px] font-mono text-center opacity-50" style={{ color: 'var(--tx)' }}>
              Click to copy
            </div>
          </div>
        </div>
      )}
    </div>
  )
}