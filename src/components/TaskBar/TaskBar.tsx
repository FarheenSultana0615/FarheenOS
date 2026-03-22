import { Monitor, Github, Linkedin, FileDown, UserCheck, Volume2, VolumeX } from 'lucide-react';
import { useWindowStore } from '@/store/WindowStore';
import { useSoundStore } from '@/store/SoundStore';
import Clock from '@/components/TaskBar/Clock';
import StartMenu from '@/components/TaskBar/StartMenu';
import { Switch } from '@/components/Ui/switch';

const Taskbar = () => {
  const { windows, startMenuOpen, setStartMenuOpen, focusWindow, minimizeWindow, recruiterMode, setRecruiterMode } = useWindowStore();
  const openWindows = windows.filter((w) => w.isOpen);
  const { soundEnabled, toggleSound } = useSoundStore();
  return (
    <div className="fixed bottom-0 left-0 right-0 h-11 sm:h-12 taskbar-glass z-50 flex items-center px-1.5 sm:px-2 gap-0.5 sm:gap-1">
      {/* Start Button */}
      <button
        onClick={() => setStartMenuOpen(!startMenuOpen)}
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0 ${
          startMenuOpen
            ? 'bg-primary/15 border border-primary/30'
            : 'hover:bg-secondary/60 border border-transparent'
        }`}
      >
        <Monitor size={14} className="text-primary sm:hidden" />
        <Monitor size={16} className="text-primary hidden sm:block" />
        <span className="font-system text-[7px] text-foreground hidden md:inline tracking-wider">START</span>
      </button>

      <StartMenu />

      {/* Separator */}
      <div className="w-px h-5 sm:h-6 bg-gradient-to-b from-transparent via-primary/15 to-transparent mx-0.5 sm:mx-1" />

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-0.5 sm:gap-1 overflow-x-auto min-w-0">
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => win.isMinimized ? focusWindow(win.id) : minimizeWindow(win.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs truncate max-w-[100px] sm:max-w-[160px] transition-all duration-200 shrink-0 ${
              win.isMinimized
                ? 'bg-secondary/20 text-muted-foreground border border-transparent'
                : 'glass-panel text-foreground border-primary/15'
            }`}
          >
            <span className="truncate font-mono text-[9px] sm:text-[10px]">{win.title.split('—')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Quick Links */}
      <div className="hidden sm:flex items-center gap-0.5 px-1">
        {[
          { href: 'https://github.com/FarheenSultana0615', icon: <Github size={14} />, title: 'GitHub' },
          { href: 'https://linkedin.com/in/farheen-sultana-54723a254', icon: <Linkedin size={14} />, title: 'LinkedIn' },
        ].map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-secondary/60 transition-all duration-200 group"
            title={link.title}
          >
            <span className="text-muted-foreground group-hover:text-primary transition-colors">
              {link.icon}
            </span>
          </a>
        ))}
        <a
          href="/Farheen_Sultana_Resume.pdf"
          download
          className="p-1.5 rounded-lg hover:bg-secondary/60 transition-all duration-200 group"
          title="Download Resume"
        >
          <span className="text-muted-foreground group-hover:text-accent transition-colors">
            <FileDown size={14} />
          </span>
        </a>
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className="p-1.5 rounded-lg hover:bg-secondary/60 transition-all duration-200 group shrink-0"
        title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled
          ? <Volume2 size={14} className="text-primary" />
          : <VolumeX size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        }
      </button>

      <div className="hidden md:flex items-center gap-1.5 px-1">
        <UserCheck size={12} className={recruiterMode ? 'text-primary' : 'text-muted-foreground'} />
        <span className="text-[8px] font-system text-muted-foreground hidden lg:inline tracking-wider">RECRUITER</span>
        <Switch
          checked={recruiterMode}
          onCheckedChange={setRecruiterMode}
          className="scale-75"
        />
      </div>

      {/* Clock */}
      <div className="px-1.5 sm:px-2 shrink-0">
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;
