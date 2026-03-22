import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = time.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-end font-mono text-xs text-muted-foreground leading-tight">
      <span className="text-foreground/80">{formatted}</span>
      <span className="text-[9px] text-muted-foreground/60">{date}</span>
    </div>
  );
};

export default Clock;
