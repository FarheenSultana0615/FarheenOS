import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/WindowStore';
import {
  User,
  FolderOpen,
  Sparkles,
  Landmark,
  Terminal,
  Github,
  Linkedin,
  FileDown,
  X,
  Home,
  Cpu,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import AboutMe from '@/components/Apps/AboutMe';
import ProjectsExplorer from '@/components/Apps/ProjectsExplorer';
import RecommendationEngine from '@/components/Apps/RecommendationEngine';
import Museum from '@/components/Apps/Museum';
import TerminalApp from '@/components/Apps/Terminal';
import SystemDesign from '@/components/Apps/SystemDesign';
import Clock from '@/components/TaskBar/Clock';

const iconMap: Record<string, React.ReactNode> = {
  User: <User size={22} />,
  FolderOpen: <FolderOpen size={22} />,
  Sparkles: <Sparkles size={22} />,
  Landmark: <Landmark size={22} />,
  Terminal: <Terminal size={22} />,
  Cpu: <Cpu size={22} />,
};

const appComponents: Record<string, React.ReactNode> = {
  AboutMe: <AboutMe />,
  ProjectsExplorer: <ProjectsExplorer />,
  RecommendationEngine: <RecommendationEngine />,
  Museum: <Museum />,
  Terminal: <TerminalApp />,
  SystemDesign: <SystemDesign />,
};

const quickLinks = [
  { label: 'Resume', icon: <FileDown size={20} />, action: () => window.open('/Farheen_Sultana_Resume.pdf', '_blank') },
  { label: 'GitHub', icon: <Github size={20} />, action: () => window.open('https://github.com/FarheenSultana0615', '_blank') },
  { label: 'LinkedIn', icon: <Linkedin size={20} />, action: () => window.open('https://linkedin.com/in/farheen-sultana-54723a254', '_blank') },
];

const MobileLayout = () => {
  const { windows } = useWindowStore();
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [immersive, setImmersive] = useState(false);
  const activeWin = windows.find((w) => w.component === activeApp);
  const isMuseumApp = activeApp === 'Museum';
  const isTerminalApp = activeApp === 'Terminal';

  useEffect(() => {
    if (!activeApp) setImmersive(false);
  }, [activeApp]);

  return (
    <div className="fixed inset-0 z-[50] flex flex-col bg-background">
      {/* Status bar */}
      {!immersive && (
        <div className="flex items-center justify-between border-b border-border/40 bg-card/80 backdrop-blur-md px-4 py-2 pt-[max(env(safe-area-inset-top),0.5rem)]">
          <span className="font-system text-[7px] text-primary glow-text-primary tracking-wider">FarheenOS</span>
          <Clock />
        </div>
      )}

      {/* Main content area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeApp && activeWin ? (
            <motion.div
              key={activeApp}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col bg-card"
            >
              {/* App title bar */}
              <div className="flex items-center justify-between border-b border-border/50 bg-card/95 px-3 py-2 backdrop-blur-sm">
                <span className="truncate pr-2 font-mono text-[11px] font-medium text-primary">
                  {activeWin.title.split('—')[0].trim()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setImmersive((prev) => !prev)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary active:scale-90 transition-transform"
                    aria-label={immersive ? 'Restore app' : 'Maximize app'}
                  >
                    {immersive ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                  </button>
                  <button
                    onClick={() => {
                      setImmersive(false);
                      setActiveApp(null);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/90 text-destructive-foreground active:scale-90 transition-transform"
                    aria-label="Close app"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* App content */}
              <div className={
                isMuseumApp
                  ? 'flex-1 overflow-hidden p-0'
                  : isTerminalApp
                    ? 'flex-1 overflow-hidden p-0'
                    : 'flex-1 overflow-auto p-4'
              }>
                {appComponents[activeApp]}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto px-4 pb-24 pt-4"
            >
              {/* Header */}
              <div className="mb-6 text-center">
                <h1 className="mb-1.5 font-system text-[10px] text-primary glow-text-primary tracking-wider">FARHEEN SULTANA</h1>
                <p className="text-[11px] text-muted-foreground">Software Engineer & Data Modeler</p>
              </div>

              {/* App grid */}
              <p className="mb-2 font-system text-[7px] text-muted-foreground/60 tracking-widest uppercase">Apps</p>
              <div className="mb-5 grid grid-cols-3 gap-2.5">
                {windows.map((win) => (
                  <button
                    key={win.id}
                    onClick={() => setActiveApp(win.component)}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-border/50 bg-secondary/20 p-3 transition-all active:scale-95 active:bg-secondary/40"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card/80 border border-border/40 text-primary">
                      {iconMap[win.icon] || <FolderOpen size={22} />}
                    </div>
                    <span className="text-center text-[9px] leading-tight text-foreground/80 font-medium">
                      {win.title.split('—')[0].trim()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick links */}
              <p className="mb-2 font-system text-[7px] text-muted-foreground/60 tracking-widest uppercase">Quick Links</p>
              <div className="grid grid-cols-3 gap-2.5">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-accent/20 bg-accent/5 p-3 transition-all active:scale-95 active:bg-accent/15"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card/70 border border-accent/15 text-accent">
                      {link.icon}
                    </div>
                    <span className="text-[9px] font-medium text-foreground/80">{link.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      {!immersive && (
        <div className="flex items-center justify-around border-t border-border/40 bg-card/80 backdrop-blur-md py-1.5 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
          {[
            { key: null, icon: <Home size={18} />, label: 'Home' },
            { key: 'ProjectsExplorer', icon: <FolderOpen size={18} />, label: 'Projects' },
            { key: 'AboutMe', icon: <User size={18} />, label: 'About' },
            { key: 'Museum', icon: <Landmark size={18} />, label: 'Museum' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setImmersive(false);
                setActiveApp(item.key);
              }}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all active:scale-90 ${
                activeApp === item.key ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.icon}
              <span className="font-mono text-[7px]">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
