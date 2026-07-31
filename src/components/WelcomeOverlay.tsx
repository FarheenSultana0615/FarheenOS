import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown, X, MapPin } from 'lucide-react';

const WelcomeOverlay = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-lg" onClick={() => setVisible(false)} />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl window-glow">
              {/* Close */}
              <button
                onClick={() => setVisible(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <X size={12} />
              </button>

              {/* Identity */}
              <div className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="font-system text-[10px] sm:text-xs text-primary mb-2 tracking-wider glow-text-primary">
                    FARHEEN SULTANA
                  </h1>
                  <p className="text-sm text-foreground/90 font-medium mb-1">
                    Analytics Engineer · Data Modeler · Data Engineer
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    BCA Graduate, Osmania University
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60">
                    <MapPin size={10} />
                    <span>Hyderabad, India</span>
                  </div>
                </motion.div>
              </div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 mb-5 flex-wrap"
              >
                {[
                  { href: 'mailto:farheensultana0615@gmail.com', icon: <Mail size={14} />, label: 'Email' },
                  { href: 'https://linkedin.com/in/farheen-sultana-54723a254', icon: <Linkedin size={14} />, label: 'LinkedIn', external: true },
                  { href: 'https://github.com/FarheenSultana0615', icon: <Github size={14} />, label: 'GitHub', external: true },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-panel text-xs text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all btn-glow"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </motion.div>

              {/* Resume Download */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mb-5"
              >
                <a
                  href="/Farheen_Sultana_Resume.pdf"
                  download
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary/10 border border-primary/25 hover:bg-primary/20 text-primary text-xs font-medium transition-all btn-glow"
                >
                  <FileDown size={14} />
                  <span>Download Resume</span>
                </a>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-1.5 border-t border-border/50 pt-4"
              >
                <p className="text-[8px] font-system text-highlight/60 mb-2 text-center tracking-wider">HIGHLIGHTS</p>
                {[
                  '🚀 Auto STTM Engine — production at Hiffai Tech (Snowflake + Databricks)',
                  '🩺 Shipped Bronze→Silver→Gold healthcare pipeline · 8 dbt models · 31 tests',
                  '🏆 McKinsey Forward Alumni · Azure AZ-900 Certified',
                ].map((h, i) => (
                  <p key={i} className="text-[11px] text-muted-foreground text-center leading-relaxed">{h}</p>
                ))}
              </motion.div>

              {/* Enter CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-5 text-center"
              >
                <button
                  onClick={() => setVisible(false)}
                  className="font-system text-[7px] text-primary/40 hover:text-primary transition-colors tracking-widest"
                >
                  [ CLICK ANYWHERE TO ENTER ]
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
