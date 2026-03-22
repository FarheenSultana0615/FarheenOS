import { create } from 'zustand';

let audioCtx: AudioContext | null = null;

function getCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  vol = 0.08
) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // ignore if AudioContext not available or permission denied
  }
}

export const playClickSound = () => playTone(800, 0.06, 'sine', 0.05);
export const playOpenSound = () => {
  playTone(400, 0.1, 'sine', 0.06);
  setTimeout(() => playTone(600, 0.1, 'sine', 0.04), 50);
};
export const playCloseSound = () => {
  playTone(500, 0.1, 'sine', 0.05);
  setTimeout(() => playTone(300, 0.15, 'sine', 0.03), 40);
};

interface SoundStore {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useSoundStore = create<SoundStore>((set) => ({
  soundEnabled: false,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
}));
