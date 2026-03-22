import { useEffect } from 'react';
import { useWindowStore } from '@/store/WindowStore';

export function useKeyboardShortcuts() {
  const { windows, focusWindow, closeWindow } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+Tab: cycle through open windows
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const openWindows = windows.filter((w) => w.isOpen && !w.isMinimized);
        if (openWindows.length === 0) return;

        // Find the currently focused (highest z-index) window
        const sorted = [...openWindows].sort((a, b) => b.zIndex - a.zIndex);
        const currentIdx = sorted.findIndex((w) => w.zIndex === sorted[0].zIndex);
        const nextIdx = (currentIdx + 1) % sorted.length;
        focusWindow(sorted[nextIdx].id);
      }

      // Escape: close the active (top) window
      if (e.key === 'Escape') {
        const openWindows = windows.filter((w) => w.isOpen && !w.isMinimized);
        if (openWindows.length === 0) return;
        const top = [...openWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
        closeWindow(top.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, focusWindow, closeWindow]);
}
