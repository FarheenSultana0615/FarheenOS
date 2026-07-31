import { skills, milestones } from '@/data/MileStone';
import { projects } from '@/data/Projects';
import { MapPin, Mail, Phone, Linkedin, Github, ExternalLink, FileDown, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  education: <GraduationCap size={14} />,
  career: <Briefcase size={14} />,
  certification: <Award size={14} />,
  project: <Code size={14} />,
};

const RecruiterLayout = () => {
  const highlightProjects = projects.filter((p) => p.milestone);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-foreground truncate">Farheen Sultana</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono truncate">Analytics Engineer · Data Modeler · Data Engineer</p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a href="https://linkedin.com/in/farheen-sultana-54723a254" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-primary">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/FarheenSultana0615" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-primary">
              <Github size={16} />
            </a>
            <a href="/Farheen_Sultana_Resume.pdf" download className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-medium hover:bg-primary/20 transition-colors">
              <FileDown size={12} /> <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* Contact & Summary */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">
            <span className="flex items-center gap-1"><MapPin size={12} /> Hyderabad, India</span>
            <span className="flex items-center gap-1 truncate"><Mail size={12} /> farheensultana0615@gmail.com</span>
            <span className="flex items-center gap-1"><Phone size={12} /> 6281926353</span>
          </div>
          <p className="text-[12px] sm:text-sm text-foreground/80 leading-relaxed max-w-3xl">
            Analytics Engineer and Data Modeler with production experience building end-to-end
            data pipelines, curated datasets, and automated data quality frameworks. Shipped a
            Bronze → Silver → Gold healthcare governance pipeline (8 dbt models, 31 automated tests,
            GitHub Actions CI/CD) on real WHO and NDAP India datasets, and built the production
            Auto STTM Engine at Hiffai Tech Solutions using live Snowflake and Databricks metadata.
            Strong foundation in Erwin, Star Schema, Data Vault, medallion architecture, SQL, and Python.
          </p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-bold text-foreground mb-3 sm:mb-4 neon-underline inline-block pb-1">Technical Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 mt-3 sm:mt-4">
            {skills.map((skill) => (
              <div key={skill.name} className="glass-panel rounded-xl p-2.5 sm:p-3">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-xs font-medium text-foreground truncate pr-1">{skill.name}</span>
                  <span className="text-[9px] sm:text-[10px] text-primary font-mono">{skill.level}%</span>
                </div>
                <div className="h-1 sm:h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, hsl(180, 100%, 50%), hsl(157, 100%, 50%))',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section>
          <h2 className="text-sm font-bold text-foreground mb-3 sm:mb-4 neon-underline inline-block pb-1">Key Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
            {highlightProjects.map((project) => (
              <div key={project.id} className="glass-panel rounded-xl p-3 sm:p-4 hover:border-primary/30 transition-all duration-200">
                <h3 className="text-[12px] sm:text-sm font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground mb-2 sm:mb-3 leading-relaxed">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-1.5 sm:px-2 py-0.5 bg-primary/10 border border-primary/15 rounded-md text-[8px] sm:text-[9px] text-primary font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:text-accent transition-colors">
                      <Github size={10} /> Code
                    </a>
                  )}
                  {project.links.demo && project.links.demo !== '#' && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:text-accent transition-colors">
                      <ExternalLink size={10} /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-sm font-bold text-foreground mb-3 sm:mb-4 neon-underline inline-block pb-1">Experience & Education</h2>
          <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
            {milestones.map((m) => (
              <div key={m.id} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 glass-panel rounded-xl">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 text-primary">
                  {categoryIcons[m.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                    <p className="text-[11px] sm:text-xs font-medium text-foreground">{m.title}</p>
                    <span className="text-[9px] sm:text-[10px] text-primary font-mono shrink-0">{m.date}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 sm:mt-1 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 sm:py-6 text-center px-4">
        <p className="text-[9px] sm:text-[10px] text-muted-foreground font-mono">FarheenOS v1.0 · Recruiter Mode · Built with React, TypeScript & Three.js</p>
      </footer>
    </div>
  );
};

export default RecruiterLayout;
