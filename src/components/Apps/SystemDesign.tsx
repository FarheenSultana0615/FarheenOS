import { Cpu, Layers, Zap, Globe, Database, Palette } from 'lucide-react';

const layers = [
  {
    icon: <Globe size={16} />,
    title: 'Presentation Layer',
    color: 'primary',
    items: ['React 18 + TypeScript', 'Tailwind CSS + Design Tokens', 'Framer Motion Animations', 'Three.js (Museum 3D)'],
  },
  {
    icon: <Layers size={16} />,
    title: 'State Management',
    color: 'accent',
    items: ['Zustand — Window positions, z-index, open/close/minimize', 'React local state — App-specific UI state', 'CSS Variables — Runtime theming'],
  },
  {
    icon: <Cpu size={16} />,
    title: 'Desktop Engine',
    color: 'highlight',
    items: ['react-rnd — Draggable/resizable windows', 'Keyboard shortcuts (Alt+Tab, Escape)', 'Canvas API — Particle system', 'Mobile detection → Phone UI fallback'],
  },
  {
    icon: <Zap size={16} />,
    title: 'Performance',
    color: 'primary',
    items: ['Suspense boundary for 3D gallery', 'RequestAnimationFrame particles', 'Lazy font loading', 'Vite HMR + code splitting'],
  },
  {
    icon: <Database size={16} />,
    title: 'Data Architecture',
    color: 'accent',
    items: ['Static data modules (projects, milestones, skills)', 'Type-safe interfaces for all entities', 'Recommendation engine with tag-based scoring'],
  },
  {
    icon: <Palette size={16} />,
    title: 'Design System',
    color: 'highlight',
    items: ['HSL CSS custom properties', 'Glassmorphism utilities', 'Cyan/Green/Magenta palette', 'Responsive + dark-first approach'],
  },
];

const colorMap: Record<string, string> = {
  primary: 'text-primary border-primary/20 bg-primary/5',
  accent: 'text-accent border-accent/20 bg-accent/5',
  highlight: 'text-highlight border-highlight/20 bg-highlight/5',
};

const SystemDesign = () => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h2 className="font-system text-[9px] sm:text-[10px] text-primary neon-underline inline-block pb-1 tracking-wider">
          SYSTEM ARCHITECTURE
        </h2>
        <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
          How FarheenOS is built — a breakdown of the tech stack, architecture decisions,
          and performance optimizations that power this interactive portfolio.
        </p>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {layers.map((layer) => (
          <div
            key={layer.title}
            className={`glass-panel rounded-xl p-3 sm:p-4 border ${colorMap[layer.color]} transition-all duration-200`}
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className={colorMap[layer.color].split(' ')[0]}>{layer.icon}</span>
              <h3 className="text-[12px] sm:text-sm font-semibold text-foreground">{layer.title}</h3>
            </div>
            <ul className="space-y-1 sm:space-y-1.5 ml-6 sm:ml-7">
              {layer.items.map((item) => (
                <li key={item} className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5 sm:gap-2">
                  <span className="text-primary/40 mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl p-3 sm:p-4 border border-primary/10">
        <h3 className="font-system text-[7px] sm:text-[8px] text-primary mb-2 tracking-wider">WHY THIS APPROACH?</h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
          FarheenOS isn't just a portfolio — it demonstrates system design thinking. The desktop metaphor
          showcases state management complexity (window z-ordering, minimize/maximize, keyboard navigation),
          while the 3D Museum proves comfort with WebGL. The recommendation engine shows data-driven UX.
          Every architectural choice was intentional and trade-off aware.
        </p>
      </div>
    </div>
  );
};

export default SystemDesign;
