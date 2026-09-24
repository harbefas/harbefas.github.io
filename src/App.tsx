import { ThemeProvider } from './context/ThemeContext'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Projects from './components/Projects'
import Contribute from './components/Contribute'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <div className="flex flex-col items-center">
        <Hero />
        <Manifesto />
        <Projects />
        <Contribute />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
