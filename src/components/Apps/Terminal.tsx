import { useState, useRef, useEffect } from 'react';
import { skills, milestones } from '@/data/MileStone';
import { projects } from '@/data/Projects';

interface Line {
  type: 'input' | 'output';
  text: string;
}

const COMMANDS: Record<string, () => string> = {
  help: () =>
    `Available commands:
  help        — Show this help message
  about       — Who is Farheen Sultana?
  skills      — Technical skills overview
  projects    — List all projects
  experience  — Work experience timeline
  contact     — Contact information
  architecture— System design of this portfolio
  matrix      — The Matrix has you...
  weather     — Current vibe check
  quote       — Inspirational quote
  clear       — Clear the terminal
  neofetch    — System info`,

  about: () =>
    `╔══════════════════════════════════╗
║     FARHEEN SULTANA              ║
╠══════════════════════════════════╣
║ Software Engineer & Data Modeler ║
║ Final-year BCA · Osmania Univ.   ║
║ CGPA: 8.5/10                     ║
║                                  ║
║ Currently at Hiffai Tech         ║
║ McKinsey Forward Program         ║
║ AWS ML Engineer (In Progress)    ║
╚══════════════════════════════════╝`,

  skills: () => {
    const bars = skills.map((s) => {
      const filled = Math.round(s.level / 5);
      const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
      return `  ${s.name.padEnd(18)} [${bar}] ${s.level}%`;
    });
    return `SYSTEM SPECS:\n${bars.join('\n')}`;
  },

  projects: () => {
    const list = projects.map(
      (p) => `  📁 ${p.title}\n     ${p.shortDescription}\n     Tech: ${p.techStack.join(', ')}`
    );
    return `PROJECT DATABASE:\n${list.join('\n\n')}`;
  },

  experience: () => {
    const items = milestones
      .filter((m) => m.category === 'career')
      .map((m) => `  [${m.date}] ${m.title}\n           ${m.description}`);
    return `EVENT LOG:\n${items.join('\n\n')}`;
  },

  contact: () =>
    `CONTACT INFO:
  📧  farheensultana0615@gmail.com
  📱  6281926353
  🔗  linkedin.com/in/farheen-sultana-54723a254
  🐙  github.com/FarheenSultana0615
  📍  Hyderabad, Telangana`,

  architecture: () =>
    `╔════════════════════════════════════════╗
║    FARHEENOS — SYSTEM ARCHITECTURE     ║
╠════════════════════════════════════════╣
║                                        ║
║  React 18 + TypeScript                 ║
║  Zustand (Window State)                ║
║  Vite + HMR                            ║
║  Tailwind + CSS Variables              ║
║  Three.js (Museum 3D)                  ║
║  Framer Motion (Animations)            ║
║  react-rnd (Draggable Windows)         ║
║  Canvas API (Particles)                ║
║                                        ║
║  KEY DECISIONS:                        ║
║  • Zustand over Redux — minimal        ║
║  • CSS vars — runtime theming          ║
║  • Mobile-first responsive             ║
╚════════════════════════════════════════╝`,

  matrix: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    const lines: string[] = [];
    for (let i = 0; i < 8; i++) {
      let line = '';
      for (let j = 0; j < 36; j++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      lines.push(line);
    }
    return `Wake up, Neo...\n\n${lines.join('\n')}\n\n> Follow the white rabbit. 🐇`;
  },

  weather: () => {
    const vibes = ['☀️ Sunny and productive', '🌧️ Debugging weather', '⚡ High energy coding session', '🌈 Creative flow state', '❄️ Cool and focused'];
    return `VIBE CHECK:\n  ${vibes[Math.floor(Math.random() * vibes.length)]}\n  Current mood: Building awesome things 🚀`;
  },

  quote: () => {
    const quotes = [
      '"The only way to do great work is to love what you do." — Steve Jobs',
      '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
      '"First, solve the problem. Then, write the code." — John Johnson',
      '"Simplicity is the soul of efficiency." — Austin Freeman',
      '"Talk is cheap. Show me the code." — Linus Torvalds',
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  neofetch: () =>
    `   _____ ___  ____
  |  ___/ _ \\/ ___|    FarheenOS v1.0
  | |_ | | | \\___ \\    ──────────────
  |  _|| |_| |___) |   User: Farheen
  |_|   \\___/|____/    Shell: Terminal
                       Theme: Cyberpunk
                       Uptime: Since 2023
                       Packages: React, Three.js
                       Resolution: ∞ × ∞`,
};

const Terminal = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'FarheenOS Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: 'input', text: `$ ${input}` }];

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      newLines.push({ type: 'output', text: handler() });
    } else if (cmd) {
      newLines.push({ type: 'output', text: `Command not found: "${cmd}". Type "help" for available commands.` });
    }

    setLines(newLines);
    setInput('');
  };

  return (
    <div
      className="h-full flex flex-col bg-background font-mono text-[11px] sm:text-xs cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto p-3 sm:p-4 space-y-0.5">
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-all sm:break-words leading-relaxed ${
              line.type === 'input' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            {line.text}
          </pre>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-t border-border/50 bg-card/40">
        <span className="text-accent">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-foreground text-[11px] sm:text-xs font-mono min-w-0"
          placeholder="Type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default Terminal;
