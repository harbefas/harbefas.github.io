import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 transition-opacity duration-300"
      style={{ opacity: progress > 0 ? 1 : 0 }}
    >
      <div
        className="h-full transition-all duration-75"
        style={{
          width: `${progress}%`,
          backgroundColor: 'var(--accent)',
        }}
      />
    </div>
  )
}