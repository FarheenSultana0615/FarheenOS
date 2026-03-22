import { useState } from 'react';
import { projects, folders } from '@/data/Projects';
import { Folder, FileText, ArrowLeft, ExternalLink, Github, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/Projects';

const ProjectsExplorer = () => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <div className="space-y-3 sm:space-y-4 text-sm">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-primary text-xs hover:text-accent transition-colors"
        >
          <ArrowLeft size={12} /> Back to {currentFolder || 'folders'}
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">{selectedProject.title}</h2>
          <p className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-1">{selectedProject.date}</p>
        </div>

        <div className="glass-panel rounded-xl p-3 sm:p-4">
          <p className="text-foreground/80 leading-relaxed text-[11px] sm:text-xs">{selectedProject.fullDescription}</p>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-system text-[8px] text-highlight mb-1.5 tracking-wider">PROBLEM</h4>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{selectedProject.problem}</p>
          </div>
          <div>
            <h4 className="font-system text-[8px] text-accent mb-1.5 tracking-wider">SOLUTION</h4>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
          </div>
        </div>

        <div>
          <h4 className="font-system text-[8px] text-primary mb-2 tracking-wider">TECH STACK</h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedProject.techStack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 sm:px-2.5 sm:py-1 glass-panel rounded-lg text-[9px] sm:text-[10px] text-primary font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          {selectedProject.links.demo && (
            <a href={selectedProject.links.demo} className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors btn-glow px-3 py-1.5 rounded-lg glass-panel">
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {selectedProject.links.github && (
            <a href={selectedProject.links.github} className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors btn-glow px-3 py-1.5 rounded-lg glass-panel">
              <Github size={12} /> Source Code
            </a>
          )}
        </div>
      </div>
    );
  }

  if (currentFolder) {
    const folderProjects = projects.filter((p) => p.folder === currentFolder);
    return (
      <div className="space-y-1">
        <button
          onClick={() => setCurrentFolder(null)}
          className="flex items-center gap-2 text-primary text-xs hover:text-accent transition-colors mb-3"
        >
          <ArrowLeft size={12} /> Back
        </button>
        <h3 className="font-system text-[8px] sm:text-[9px] text-primary mb-3 neon-underline inline-block pb-1">{currentFolder.toUpperCase()}</h3>
        <div className="space-y-1 mt-3">
          {folderProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-xl hover:bg-secondary/30 transition-all duration-200 text-left group active:bg-secondary/40"
            >
              <FileText size={16} className="text-primary/50 group-hover:text-primary transition-colors shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-medium text-foreground truncate">{project.title}</p>
                <p className="text-[10px] text-muted-foreground truncate">{project.shortDescription}</p>
              </div>
              <ChevronRight size={12} className="text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <h3 className="font-system text-[8px] sm:text-[9px] text-primary mb-3 neon-underline inline-block pb-1">MY PROJECTS</h3>
      {/* Address bar */}
      <div className="flex items-center gap-2 px-3 py-2 glass-panel rounded-xl mb-3 mt-3">
        <Folder size={12} className="text-primary/50 shrink-0" />
        <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate">C:\FarheenOS\Projects\</span>
      </div>
      {folders.map((folder) => {
        const count = projects.filter((p) => p.folder === folder).length;
        return (
          <button
            key={folder}
            onClick={() => setCurrentFolder(folder)}
            className="w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-xl hover:bg-secondary/30 transition-all duration-200 text-left group active:bg-secondary/40"
          >
            <Folder size={18} className="text-primary/60 group-hover:text-primary transition-colors shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-foreground">{folder}</p>
              <p className="text-[10px] text-muted-foreground">{count} item{count !== 1 ? 's' : ''}</p>
            </div>
            <ChevronRight size={12} className="text-muted-foreground shrink-0" />
          </button>
        );
      })}
    </div>
  );
};

export default ProjectsExplorer;
