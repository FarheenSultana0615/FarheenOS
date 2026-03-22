import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowStore, WindowState } from '@/store/WindowStore';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

const WindowFrame = ({ window: win, children }: WindowFrameProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } =
    useWindowStore();
  const isMuseumWindow = win.component === 'Museum';

  if (!win.isOpen) return null;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <Rnd
          position={win.isMaximized ? { x: 0, y: 0 } : win.position}
          size={
            win.isMaximized
              ? { width: window.innerWidth, height: window.innerHeight - 48 }
              : win.size
          }
          minWidth={isMuseumWindow ? 360 : 320}
          minHeight={isMuseumWindow ? 300 : 240}
          disableDragging={win.isMaximized}
          enableResizing={!win.isMaximized}
          dragHandleClassName="window-drag-handle"
          style={{ zIndex: win.zIndex }}
          onDragStop={(_e, d) => updatePosition(win.id, d.x, d.y)}
          onResizeStop={(_e, _dir, ref) => {
            updateSize(win.id, ref.offsetWidth, ref.offsetHeight);
          }}
          onMouseDown={() => focusWindow(win.id)}
          bounds="parent"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="window-glow flex h-full flex-col overflow-hidden rounded-xl border border-window-border/40 bg-window"
          >
            <div className="window-drag-handle flex cursor-move select-none items-center justify-between border-b border-border/60 bg-window-header px-3 py-2.5">
              <div className="flex items-center gap-2">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/90 text-destructive-foreground transition-all hover:bg-destructive"
                  title="Close"
                  aria-label="Close window"
                >
                  <X size={10} />
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(win.id);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:bg-accent/80"
                  title="Minimize"
                  aria-label="Minimize window"
                >
                  <Minus size={10} />
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    maximizeWindow(win.id);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/85"
                  title={win.isMaximized ? 'Restore' : 'Maximize'}
                  aria-label={win.isMaximized ? 'Restore window' : 'Maximize window'}
                >
                  {win.isMaximized ? <Minimize2 size={9} /> : <Maximize2 size={9} />}
                </button>
              </div>
              <span className="ml-4 truncate pr-4 font-mono text-[11px] tracking-wide text-muted-foreground">
                {win.title}
              </span>
              <div className="w-16" />
            </div>

            <div
              className={`flex-1 ${isMuseumWindow ? 'overflow-hidden bg-background/70 p-0' : 'overflow-auto p-4'}`}
              style={{ minHeight: 0 }}
            >
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
};

export default WindowFrame;
