import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'
import { categories, type Project } from '../data/projects'
import type { ThemeColors } from '../theme/colors'

function ProjectCard({ project, theme }: { project: Project; theme: ThemeColors }) {
  const link = project.href ?? (project.repo ? `https://github.com/${project.repo}` : undefined)

  const card = (
    <>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <h4 className="text-lg font-semibold" style={{ color: theme.fg }}>
          {project.name}
        </h4>
        {project.status && (
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ color: theme.comment, border: `1px solid ${theme.bg1}` }}
          >
            {project.status}
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: theme.comment }}>
        {project.what}
      </p>

      {project.replaces !== '—' && (
        <p className="text-xs font-mono mb-4" style={{ color: theme.operator }}>
          <span style={{ color: theme.accent }}>replaces</span> {project.replaces}
        </p>
      )}

      {project.install && (
        <p className="text-xs font-mono mb-4 break-all" style={{ color: theme.operator }}>
          <span style={{ color: theme.accent }}>install</span> {project.install}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] font-mono px-2 py-0.5 rounded"
            style={{ color: theme.comment, backgroundColor: theme.bg1 }}
          >
            {s}
          </span>
        ))}
      </div>
    </>
  )

  const style = {
    backgroundColor: theme.bg,
    border: `1px solid ${theme.bg1}`,
  }

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover-lift flex flex-col p-5 rounded-lg"
      style={style}
    >
      {card}
    </a>
  ) : (
    <div className="flex flex-col p-5 rounded-lg" style={style}>
      {card}
    </div>
  )
}

export default function Projects() {
  const { theme } = useTheme()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="projects" className="reveal w-full py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: theme.accent }}>
          What
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mb-14" style={{ color: theme.fg }}>
          Projects
        </h2>

        <div className="flex flex-col gap-16">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold mb-1" style={{ color: theme.fg }}>
                {category.title}
              </h3>
              <p className="text-sm mb-6" style={{ color: theme.comment }}>
                {category.blurb}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
                {category.projects.map((project) => (
                  <ProjectCard key={project.name} project={project} theme={theme} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
