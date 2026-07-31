import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';

const highlights = [
  "🚀 Auto STTM Engine live in production — Snowflake + Databricks metadata → auto-generated docs",
  "🩺 Shipped Bronze→Silver→Gold healthcare pipeline: 8 dbt models, 31 tests, GitHub Actions CI",
  "🧱 Designing enterprise Erwin models across bronze/silver/gold at Hiffai Tech Solutions",
  "🏆 McKinsey Forward Alumni · Microsoft Azure AZ-900 Certified",
  "🎓 BCA Graduate, Osmania University · CGPA 8.5/10",
  "🧠 ANN classifier hit 98.46% on the NSL-KDD intrusion detection benchmark",
  "💡 Promoted freelance → full-time after shipping a production React + TS app",
];

const QuickHighlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="absolute bottom-16 right-4 z-20 w-80"
    >
      <div className="rounded-xl glass-panel p-3.5 shadow-lg animate-pulse-glow">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Lightbulb size={14} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-system text-primary/60 mb-1.5 tracking-wider">HIGHLIGHTS</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] text-foreground/80 leading-relaxed"
              >
                {highlights[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={12} />
          </button>
        </div>
        {/* Dots */}
        <div className="flex gap-1 mt-2.5 justify-center">
          {highlights.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-primary w-3' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickHighlights;
