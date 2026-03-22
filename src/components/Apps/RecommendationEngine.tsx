import { useState } from 'react';
import { projects } from '@/data/Projects';
import { Sparkles, ArrowRight, RotateCcw, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/Projects';

interface Question {
  id: string;
  text: string;
  options: { label: string; tags: string[] }[];
}

const questions: Question[] = [
  {
    id: 'role',
    text: "What's your role?",
    options: [
      { label: '👔 Recruiter', tags: ['frontend', 'backend', 'data'] },
      { label: '💻 Developer', tags: ['frontend', 'backend', 'AI'] },
      { label: '🎨 Designer', tags: ['design', 'UX', 'frontend'] },
      { label: '🎓 Student', tags: ['AI', 'data', 'frontend'] },
    ],
  },
  {
    id: 'interest',
    text: "What are you most curious about?",
    options: [
      { label: '🖥️ Frontend & UI', tags: ['frontend', 'design', 'UX'] },
      { label: '📊 Data & Analytics', tags: ['data', 'backend'] },
      { label: '🤖 AI & Automation', tags: ['AI', 'automation'] },
      { label: '🏗️ System Design', tags: ['backend', 'data'] },
    ],
  },
  {
    id: 'preference',
    text: "What do you prefer to see?",
    options: [
      { label: '📱 Live Demos', tags: ['frontend', 'design'] },
      { label: '💡 Problem-Solving', tags: ['data', 'AI', 'automation'] },
      { label: '🔧 Technical Depth', tags: ['backend', 'data'] },
      { label: '🎯 Impact Stories', tags: ['frontend', 'AI'] },
    ],
  },
];

const RecommendationEngine = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [results, setResults] = useState<Project[] | null>(null);

  const handleSelect = (tags: string[]) => {
    const newAnswers = [...answers, tags];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const tagCounts: Record<string, number> = {};
      newAnswers.flat().forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });

      const scored = projects.map((p) => ({
        project: p,
        score: p.tags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0),
      }));

      scored.sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, 3).map((s) => s.project));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResults(null);
  };

  if (results) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-highlight" />
          <h3 className="font-system text-[8px] sm:text-[9px] text-highlight tracking-wider">RECOMMENDATIONS FOR YOU</h3>
        </div>
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">Based on your answers, here are the projects I think you'll love:</p>
        <div className="space-y-2">
          {results.map((project, i) => (
            <div
              key={project.id}
              className="p-3 sm:p-3.5 glass-panel rounded-xl hover:border-primary/30 transition-all duration-200 cursor-default"
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="font-system text-[10px] mt-0.5 text-highlight">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] sm:text-sm font-medium text-foreground">{project.title}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-primary/10 border border-primary/15 rounded-md text-[8px] sm:text-[9px] text-primary font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted-foreground mt-1 shrink-0" />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 text-xs text-primary hover:text-accent transition-colors mt-2 btn-glow px-3 py-1.5 rounded-lg glass-panel"
        >
          <RotateCcw size={12} /> Start Over
        </button>
      </div>
    );
  }

  const question = questions[step];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? 'bg-gradient-to-r from-primary to-accent' : 'bg-secondary'
            }`}
          />
        ))}
      </div>

      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground font-mono mb-1.5">
          Question {step + 1} of {questions.length}
        </p>
        <h3 className="text-sm sm:text-base font-semibold text-foreground leading-relaxed">{question.text}</h3>
      </div>

      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => handleSelect(option.tags)}
            className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 glass-panel rounded-xl hover:border-primary/30 transition-all duration-200 text-left group btn-glow active:scale-[0.98]"
          >
            <span className="text-[12px] sm:text-sm text-foreground">{option.label}</span>
            <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-all shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendationEngine;
