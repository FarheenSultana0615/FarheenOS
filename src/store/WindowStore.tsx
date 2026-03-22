import { create } from 'zustand';
import { playOpenSound, playCloseSound, playClickSound, useSoundStore } from './SoundStore';

function sfx(fn: () => void) {
  if (useSoundStore.getState().soundEnabled) fn();
}

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  defaultSize: { width: number; height: number };
  component: string;
}

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  startMenuOpen: boolean;
  recruiterMode: boolean;
  setStartMenuOpen: (open: boolean) => void;
  setRecruiterMode: (on: boolean) => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
}

const defaultWindows: WindowState[] = [
  {
    id: 'about',
    title: 'About Me — System Info',
    icon: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 80, y: 60 },
    size: { width: 520, height: 500 },
    defaultSize: { width: 520, height: 500 },
    component: 'AboutMe',
  },
  {
    id: 'projects',
    title: 'Projects — File Explorer',
    icon: 'FolderOpen',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 150, y: 80 },
    size: { width: 650, height: 500 },
    defaultSize: { width: 650, height: 500 },
    component: 'ProjectsExplorer',
  },
  {
    id: 'recommendation',
    title: 'Recommendation Engine',
    icon: 'Sparkles',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 220, y: 100 },
    size: { width: 480, height: 520 },
    defaultSize: { width: 480, height: 520 },
    component: 'RecommendationEngine',
  },
  {
    id: 'museum',
    title: 'Museum of Me — 3D Gallery',
    icon: 'Landmark',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 40 },
    size: { width: 750, height: 550 },
    defaultSize: { width: 750, height: 550 },
    component: 'Museum',
  },
  {
    id: 'terminal',
    title: 'Terminal — Easter Egg 🥚',
    icon: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 80 },
    size: { width: 580, height: 450 },
    defaultSize: { width: 580, height: 450 },
    component: 'Terminal',
  },
  {
    id: 'system-design',
    title: 'System Design — Architecture',
    icon: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 160, y: 60 },
    size: { width: 560, height: 520 },
    defaultSize: { width: 560, height: 520 },
    component: 'SystemDesign',
  },
];

export const useWindowStore = create<WindowStore>((set) => ({
  windows: defaultWindows,
  nextZIndex: 1,
  startMenuOpen: false,
  recruiterMode: false,
  setStartMenuOpen: (open) => set({ startMenuOpen: open }),
  setRecruiterMode: (on) => set({ recruiterMode: on }),
  openWindow: (id) =>
    set((state) => {
      sfx(playOpenSound);
      return {
        nextZIndex: state.nextZIndex + 1,
        startMenuOpen: false,
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: state.nextZIndex }
            : w
        ),
      };
    }),
  closeWindow: (id) =>
    set((state) => {
      sfx(playCloseSound);
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
        ),
      };
    }),
  minimizeWindow: (id) =>
    set((state) => {
      sfx(playClickSound);
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
        ),
      };
    }),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              position: !w.isMaximized ? { x: 0, y: 0 } : w.position,
              size: !w.isMaximized
                ? { width: window.innerWidth, height: window.innerHeight - 48 }
                : w.defaultSize,
            }
          : w
      ),
    })),
  focusWindow: (id) =>
    set((state) => ({
      nextZIndex: state.nextZIndex + 1,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex, isMinimized: false } : w
      ),
    })),
  updatePosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position: { x, y } } : w
      ),
    })),
  updateSize: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size: { width, height } } : w
      ),
    })),
}));
