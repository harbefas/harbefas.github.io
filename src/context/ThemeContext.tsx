import { useState, createContext, useContext, useEffect, type ReactNode } from 'react'
import { yerbaMate, terere, type ThemeColors } from '../theme/colors'

interface ThemeContextValue {
  theme: ThemeColors
  setTheme: (theme: ThemeColors) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<ThemeColors>(yerbaMate)
  const isDark = theme.name === 'yerba-mate'

  useEffect(() => {
    // Tokens live in [data-theme] blocks (mate-tokens.css); the theme switch is
    // that attribute and nothing else. No color is written from JS.
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [isDark])

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      isDark,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { yerbaMate, terere }