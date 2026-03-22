import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/WindowStore';
import { useKeyboardShortcuts } from '@/hooks/usekeyboardShortcuts';
import { useIsMobile } from '@/hooks/use-mobile';
import WindowFrame from '@/components/Windows/WindowsFrame';
import AboutMe from '@/components/Apps/AboutMe';
import ProjectsExplorer from '@/components/Apps/ProjectsExplorer';
import RecommendationEngine from '@/components/Apps/RecommendationEngine';
import Museum from '@/components/Apps/Museum';
import Terminal from '@/components/Apps/Terminal';
import SystemDesign from '@/components/Apps/SystemDesign';
import MobileLayout from '@/components/mobile/MobileLayout';
import Taskbar from '@/components/TaskBar/TaskBar';
import DesktopIcons from '@/components/desktop/DesktopIcons';
import QuickHighlights from '@/components/desktop/QuickHighlights';
import Particles from '@/components/desktop/Particles';
import SystemStats from '@/components/desktop/SystemStats';
import BootScreen from '@/components/BootScreen';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import RecruiterLayout from '@/components/RecruiterMode/RecruiterLayout';
import wallpaper from '@/assets/wallpaper.jpg';

const appComponents: Record<string, React.ReactNode> = {
  AboutMe: <AboutMe />,
  ProjectsExplorer: <ProjectsExplorer />,
  RecommendationEngine: <RecommendationEngine />,
  Museum: <Museum />,
  Terminal: <Terminal />,
  SystemDesign: <SystemDesign />,
};

function getTimeOfDay(): 'morning' | 'day' | 'sunset' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) return 'morning';
  if (hour >= 10 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'sunset';
  return 'night';
}

const timeGradients: Record<string, string> = {
  morning: `
    radial-gradient(ellipse at 20% 50%, hsl(180 80% 40% / 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(157 80% 40% / 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, hsl(200 50% 30% / 0.08) 0%, transparent 40%),
    hsl(170 30% 4%)
  `,
  day: `
    radial-gradient(ellipse at 20% 50%, hsl(157 80% 45% / 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(180 80% 40% / 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, hsl(220 40% 25% / 0.08) 0%, transparent 40%),
    hsl(170 30% 4%)
  `,
  sunset: `
    radial-gradient(ellipse at 30% 60%, hsl(320 70% 40% / 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 30%, hsl(180 60% 40% / 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 90%, hsl(157 40% 25% / 0.1) 0%, transparent 40%),
    hsl(170 28% 3%)
  `,
  night: `
    radial-gradient(ellipse at 20% 40%, hsl(180 60% 25% / 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(320 50% 30% / 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, hsl(157 50% 15% / 0.1) 0%, transparent 40%),
    hsl(170 30% 3%)
  `,
};

const Desktop = () => {
  const { windows, recruiterMode } = useWindowStore();
  useKeyboardShortcuts();
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setTimeout(() => setShowWelcome(true), 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTimeOfDay(getTimeOfDay()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Boot Screen */}
      <AnimatePresence>
        {!booted && <BootScreen onComplete={handleBootComplete} />}
      </AnimatePresence>

      {recruiterMode ? (
        /* Recruiter Mode: clean traditional layout */
        <div className="absolute inset-0 overflow-auto pb-12">
          <RecruiterLayout />
          <Taskbar />
        </div>
      ) : (
        <>
          {/* Wallpaper */}
          <img src={wallpaper} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          {/* Dynamic time-based gradient */}
          <div
            className="absolute inset-0 transition-all duration-[3000ms]"
            style={{ background: timeGradients[timeOfDay] }}
          />

          {/* Floating particles */}
          <Particles />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] z-[2]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(180 100% 50%) 1px, transparent 1px),
                linear-gradient(90deg, hsl(180 100% 50%) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {isMobile ? (
            <MobileLayout />
          ) : (
            <>
              {/* Desktop icons */}
              <DesktopIcons />

              {/* Quick Highlights Widget */}
              <QuickHighlights />

              {/* System Stats Widget */}
              <div className="absolute top-6 right-4 z-20 w-48">
                <SystemStats />
              </div>

              {/* Windows */}
              <div className="absolute inset-0 pb-12">
                {windows.map((win) => (
                  <WindowFrame key={win.id} window={win}>
                    {appComponents[win.component]}
                  </WindowFrame>
                ))}
              </div>

              {/* Taskbar */}
              <Taskbar />
            </>
          )}
        </>
      )}

      {/* Welcome Overlay */}
      {showWelcome && <WelcomeOverlay />}
    </div>
  );
};

export default Desktop;
