import { skills } from '@/data/MileStone';
import { milestones } from '@/data/MileStone';
import { Monitor, MapPin, Mail, Phone, Calendar, Award, Linkedin, Github } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="space-y-5 text-sm leading-relaxed">
      {/* System Info Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Monitor size={24} className="text-primary sm:hidden" />
          <Monitor size={28} className="text-primary hidden sm:block" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-foreground">Farheen Sultana</h2>
          <p className="text-muted-foreground text-[10px] sm:text-xs font-mono mt-0.5">Software Engineer · Data Modeler · Cloud Enthusiast</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2 text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin size={10} /> Hyderabad, India</span>
            <span className="flex items-center gap-1 truncate"><Mail size={10} /> farheensultana0615@gmail.com</span>
            <span className="flex items-center gap-1"><Phone size={10} /> 6281926353</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <a href="https://linkedin.com/in/farheen-sultana-54723a254" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:text-accent transition-colors btn-glow px-2 py-1 rounded-md glass-panel">
              <Linkedin size={10} /> LinkedIn
            </a>
            <a href="https://github.com/FarheenSultana0615" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:text-accent transition-colors btn-glow px-2 py-1 rounded-md glass-panel">
              <Github size={10} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="glass-panel rounded-xl p-3 sm:p-4">
        <p className="text-foreground/80 leading-relaxed text-[11px] sm:text-xs">
          Final-year BCA student with professional experience as a Software Engineer and Data Modeler.
          Proven track record of delivering beyond requirements — developed a React+TypeScript website with
          chatbot integration that exceeded client expectations, leading to my current data modeling role.
          AWS ML Engineer (in progress). Selected for McKinsey Forward Program.
        </p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-system text-[8px] sm:text-[9px] text-primary mb-3 neon-underline inline-block pb-1">SYSTEM SPECS</h3>
        <div className="space-y-2 mt-3">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-2 sm:gap-3 group">
              <span className="text-[10px] sm:text-xs text-muted-foreground w-28 sm:w-36 truncate font-mono group-hover:text-foreground transition-colors">{skill.name}</span>
              <div className="flex-1 h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, hsl(180, 100%, 50%), hsl(157, 100%, 50%))`,
                  }}
                />
              </div>
              <span className="text-[9px] sm:text-[10px] text-primary font-mono w-7 sm:w-8 text-right">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="font-system text-[8px] sm:text-[9px] text-primary mb-3 neon-underline inline-block pb-1">EVENT LOG</h3>
        <div className="space-y-1.5 mt-3">
          {milestones.map((m) => (
            <div key={m.id} className="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-secondary/20 transition-all duration-200 group cursor-default">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center mt-0.5 shrink-0 group-hover:border-primary/30 transition-colors">
                {m.category === 'certification' ? <Award size={11} className="text-primary" /> : <Calendar size={11} className="text-primary" />}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-medium text-foreground">{m.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{m.description}</p>
                <p className="text-[9px] text-primary/50 font-mono mt-0.5">{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
