// Web Audio API Synthesizer & Audio Player for crisp, zero-latency feedback

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem("memory_game_muted") === "true";
  }

  initContext() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    try {
      localStorage.setItem("memory_game_muted", muted ? "true" : "false");
    } catch {
      // ignore
    }
  }

  isMuted() {
    return this.muted;
  }

  playFlip() {
    if (this.muted) return;
    this.initContext();

    // Prefer fast synth pop for crisp tactile feel, fallback to audio element
    if (this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
        return;
      } catch {
        // fallback
      }
    }

    try {
      const audio = new Audio("/sounds/flip.wav");
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {
      // ignore
    }
  }

  playMatch() {
    if (this.muted) return;
    this.initContext();

    if (this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        // Two pleasant harmonious chimes (E5 -> B5)
        [
          { freq: 659.25, time: now, dur: 0.18, vol: 0.18 },
          { freq: 987.77, time: now + 0.09, dur: 0.28, vol: 0.22 },
        ].forEach(({ freq, time, dur, vol }) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, time);

          gain.gain.setValueAtTime(vol, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(time);
          osc.stop(time + dur);
        });
        return;
      } catch {
        // fallback
      }
    }
  }

  playMismatch() {
    if (this.muted) return;
    this.initContext();

    if (this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        // Subtle soft low descending notes
        [
          { freq: 280, time: now, dur: 0.12 },
          { freq: 210, time: now + 0.1, dur: 0.16 },
        ].forEach(({ freq, time, dur }) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, time);

          gain.gain.setValueAtTime(0.1, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(time);
          osc.stop(time + dur);
        });
      } catch {
        // fallback
      }
    }
  }

  playWin() {
    if (this.muted) return;
    this.initContext();

    // Play triumphant arpeggio chime
    if (this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        const notes = [
          { freq: 523.25, offset: 0.0 }, // C5
          { freq: 659.25, offset: 0.12 }, // E5
          { freq: 783.99, offset: 0.24 }, // G5
          { freq: 1046.5, offset: 0.36 }, // C6
        ];

        notes.forEach(({ freq, offset }) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + offset);

          gain.gain.setValueAtTime(0.2, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.4);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now + offset);
          osc.stop(now + offset + 0.45);
        });
      } catch {
        // fallback
      }
    }

    try {
      const audio = new Audio("/sounds/win.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {
      // ignore
    }
  }

  playClick() {
    if (this.muted) return;
    this.initContext();

    if (this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
      } catch {
        // fallback
      }
    }
  }
}

export const soundManager = new SoundManager();
