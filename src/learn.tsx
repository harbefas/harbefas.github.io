import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import Learn from './components/Learn'
import Footer from './components/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Nav current="Learn" />
      <Learn />
      <Footer />
    </ThemeProvider>
  </StrictMode>,
)
