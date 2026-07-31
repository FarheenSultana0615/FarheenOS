import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/WindowStore';
import { User, FolderOpen, Sparkles, Landmark, Terminal, Cpu } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  User: <User size={16} />,
  FolderOpen: <FolderOpen size={16} />,
  Sparkles: <Sparkles size={16} />,
  Landmark: <Landmark size={16} />,
  Terminal: <Terminal size={16} />,
  Cpu: <Cpu size={16} />,
};

const StartMenu = () => {
  const { startMenuOpen, setStartMenuOpen, windows, openWindow } = useWindowStore();

  return (
    <AnimatePresence>
      {startMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setStartMenuOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-12 left-2 z-50 w-72 rounded-xl start-menu-glass shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Terminal size={12} className="text-primary" />
                </div>
                <div>
                  <span className="font-system text-[7px] text-primary tracking-wider">FarheenOS</span>
                  <span className="text-[9px] text-muted-foreground font-mono ml-1.5">v1.0</span>
                </div>
              </div>
              <p className="text-[9px] text-muted-foreground mt-1 font-mono ml-8">Analytics Engineer · Data Modeler · Data Engineer</p>
            </div>

            {/* Apps */}
            <div className="p-1.5">
              {windows.map((win) => (
                <button
                  key={win.id}
                  onClick={() => openWindow(win.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/8 hover:glass-panel transition-all duration-200 text-left group"
                >
                  <span className="text-primary/70 group-hover:text-primary group-hover:icon-glow transition-all">
                    {iconMap[win.icon] || <FolderOpen size={16} />}
                  </span>
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{win.title.split('—')[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border/40">
              <p className="text-[9px] text-muted-foreground/40 font-mono">
                © 2026 Farheen Sultana
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;
