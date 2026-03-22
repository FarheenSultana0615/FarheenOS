import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const bootLines = [
  'Initializing FarheenOS v1.0...',
  'Loading kernel modules...',
  'Mounting file systems...',
  'Starting window manager...',
  'Loading project database...',
  'Calibrating recommendation engine...',
  'Rendering 3D museum exhibits...',
  'Initializing particle system...',
  'System ready.',
];

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 100% 50% / 0.03) 2px, hsl(180 100% 50% / 0.03) 4px)',
      }} />

      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Terminal size={16} className="text-primary" />
          </div>
          <div>
            <span className="font-system text-[10px] text-primary glow-text-primary">FarheenOS</span>
            <span className="text-[10px] text-muted-foreground font-mono ml-2">v1.0</span>
          </div>
        </div>

        {/* Terminal output */}
        <div className="font-mono text-[11px] sm:text-xs space-y-1 sm:space-y-1.5 mb-6 sm:mb-8 min-h-[180px] sm:min-h-[220px]">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`flex items-center gap-2 ${
                i === visibleLines - 1 ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <span className="text-accent/50">$</span>
              <span className="break-words">{line}</span>
              {i === bootLines.length - 1 && visibleLines >= bootLines.length && (
                <span className="text-accent ml-1">✓</span>
              )}
            </motion.div>
          ))}
          {visibleLines < bootLines.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink" />
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(180, 100%, 50%), hsl(157, 100%, 50%))',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>Loading system...</span>
            <span className="text-primary">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="absolute bottom-6 text-[9px] font-mono text-muted-foreground/40 px-4 text-center">
        © 2026 Farheen Sultana · All rights reserved
      </div>
    </motion.div>
  );
};

export default BootScreen;
