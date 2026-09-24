import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Projects from './components/Projects'
import Upstream from './components/Upstream'
import LearnTeaser from './components/LearnTeaser'
import Contribute from './components/Contribute'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Nav />
      <div className="flex flex-col items-center">
        <Hero />
        <Manifesto />
        <Projects />
        <Upstream />
        <LearnTeaser />
        <Contribute />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
