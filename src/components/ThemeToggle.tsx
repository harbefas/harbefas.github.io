import { useState } from 'react'
import { yerbaMate, terere } from '../theme/colors'
import type { ThemeColors } from '../theme/colors'

interface Props {
  onThemeChange: (theme: ThemeColors) => void
  currentTheme: ThemeColors
}

export default function ThemeToggle({ onThemeChange, currentTheme }: Props) {
  const [isAnimating, setIsAnimating] = useState(false)

  const isDark = currentTheme.name === 'yerba-mate'
  const nextTheme = isDark ? terere : yerbaMate

  const handleToggle = () => {
    setIsAnimating(true)
    onThemeChange(nextTheme)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <button
      onClick={handleToggle}
      className="relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: isDark ? 'var(--olive-bg)' : 'var(--cream-bg-2)',
        boxShadow: isAnimating ? `0 0 20px ${currentTheme.accent}60` : 'none',
      }}
      aria-label={`Switch to ${nextTheme.label}`}
    >
      <div
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          left: isDark ? '4px' : 'calc(100% - 28px)',
          backgroundColor: currentTheme.accent,
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 transition-all duration-300"
          style={{
            color: isDark ? 'var(--olive-bg)' : 'var(--cream-bg)',
            transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
          fill="currentColor"
        >
          {isDark ? (
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          ) : (
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.061 1.061l1.59-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          )}
        </svg>
      </div>
    </button>
  )
}