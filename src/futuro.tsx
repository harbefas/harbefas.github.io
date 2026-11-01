import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import Futuro from './components/Futuro'
import Footer from './components/Footer'

// One entry for both pages: /futuro/ is <html lang="pt-BR">, /future/ is "en".
const lang = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Nav current="Future" />
      <Futuro lang={lang} />
      <Footer />
    </ThemeProvider>
  </StrictMode>,
)
