import { useState, useEffect } from 'react';
import { Cpu, HardDrive, Activity } from 'lucide-react';
import { useWindowStore } from '@/store/WindowStore';

const SystemStats = () => {
  const { windows } = useWindowStore();
  const openCount = windows.filter((w) => w.isOpen).length;
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(34);

  useEffect(() => {
    const interval = setInterval(() => {
      const base = 8 + openCount * 12;
      setCpu(Math.min(99, base + Math.floor(Math.random() * 15)));
      setRam(Math.min(95, 30 + openCount * 10 + Math.floor(Math.random() * 8)));
    }, 2000);
    return () => clearInterval(interval);
  }, [openCount]);

  return (
    <div className="glass-panel rounded-xl p-3 space-y-2.5 text-[10px] font-mono">
      <div className="flex items-center gap-1.5 text-primary/60">
        <Activity size={10} />
        <span className="tracking-wider font-system text-[7px]">SYSTEM MONITOR</span>
      </div>

      {/* CPU */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-1"><Cpu size={10} /> CPU</span>
          <span className="text-primary">{cpu}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${cpu}%`,
              background: cpu > 70 ? 'hsl(0 80% 55%)' : cpu > 40 ? 'hsl(45 90% 55%)' : 'hsl(180 100% 50%)',
            }}
          />
        </div>
      </div>

      {/* RAM */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-1"><HardDrive size={10} /> RAM</span>
          <span className="text-accent">{ram}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-1000"
            style={{ width: `${ram}%` }}
          />
        </div>
      </div>

      <div className="text-[8px] text-muted-foreground/50 pt-0.5">
        {openCount} app{openCount !== 1 ? 's' : ''} running
      </div>
    </div>
  );
};

export default SystemStats;
