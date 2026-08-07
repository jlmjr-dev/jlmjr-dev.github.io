// Tiny chiptune blips via WebAudio. Context is created lazily on the first
// enabled beep so autoplay policies are respected.
let context: AudioContext | null = null;

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!context) {
    context = new AudioContext();
  }
  if (context.state === "suspended") {
    void context.resume();
  }
  return context;
}

function tone(frequency: number, start: number, duration: number, volume: number) {
  const ctx = ensureContext();
  if (!ctx) {
    return;
  }
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(ctx.currentTime + start);
  oscillator.stop(ctx.currentTime + start + duration);
}

export const arcadeSounds = {
  coin() {
    tone(988, 0, 0.08, 0.04);
    tone(1319, 0.08, 0.18, 0.04);
  },
  eat() {
    tone(660, 0, 0.05, 0.035);
    tone(880, 0.05, 0.07, 0.035);
  },
  gameOver() {
    tone(392, 0, 0.12, 0.04);
    tone(330, 0.12, 0.12, 0.04);
    tone(262, 0.24, 0.25, 0.04);
  },
  win() {
    tone(523, 0, 0.09, 0.04);
    tone(659, 0.09, 0.09, 0.04);
    tone(784, 0.18, 0.09, 0.04);
    tone(1047, 0.27, 0.22, 0.04);
  },
};
