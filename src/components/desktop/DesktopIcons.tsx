import { useWindowStore } from '@/store/WindowStore';
import { User, FolderOpen, Sparkles, Landmark, Terminal, Github, Linkedin, FileDown, Cpu } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  User: <User size={26} />,
  FolderOpen: <FolderOpen size={26} />,
  Sparkles: <Sparkles size={26} />,
  Landmark: <Landmark size={26} />,
  Terminal: <Terminal size={26} />,
  Cpu: <Cpu size={26} />,
};

const quickLinks = [
  {
    label: 'Resume',
    icon: <FileDown size={26} />,
    action: () => window.open('/Farheen_Sultana_Resume.pdf', '_blank'),
  },
  {
    label: 'GitHub',
    icon: <Github size={26} />,
    action: () => window.open('https://github.com/FarheenSultana0615', '_blank'),
  },
  {
    label: 'LinkedIn',
    icon: <Linkedin size={26} />,
    action: () => window.open('https://linkedin.com/in/farheen-sultana-54723a254', '_blank'),
  },
];

const DesktopIcons = () => {
  const { windows, openWindow } = useWindowStore();

  return (
    <div className="absolute top-6 left-6 z-10 flex gap-4" style={{ maxHeight: 'calc(100vh - 80px)' }}>
      {/* App icons - first column */}
      <div className="flex flex-col gap-1 flex-wrap" style={{ maxHeight: 'calc(100vh - 80px)' }}>
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => openWindow(win.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 hover:backdrop-blur-sm transition-all duration-200 group w-[72px] btn-glow"
          >
            <div className="w-11 h-11 rounded-xl bg-card/60 border border-border/50 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-card/80 transition-all duration-200">
              <span className="text-primary/70 group-hover:text-primary group-hover:icon-glow transition-all">
                {iconMap[win.icon] || <FolderOpen size={22} />}
              </span>
            </div>
            <span className="text-[9px] text-foreground/70 text-center leading-tight font-medium group-hover:text-foreground transition-colors">
              {win.title.split('—')[0].trim()}
            </span>
          </button>
        ))}
        {quickLinks.map((link) => (
          <button
            key={link.label}
            onClick={link.action}
            className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 hover:backdrop-blur-sm transition-all duration-200 group w-[72px] btn-glow"
          >
            <div className="w-11 h-11 rounded-xl bg-card/60 border border-border/50 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-card/80 transition-all duration-200">
              <span className="text-accent/70 group-hover:text-accent group-hover:icon-glow transition-all">
                {link.icon}
              </span>
            </div>
            <span className="text-[9px] text-foreground/70 text-center leading-tight font-medium group-hover:text-foreground transition-colors">
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesktopIcons;
