let soundQueued = false;

const playFlipSoundOnce = (audioFile = "/sounds/flip.wav") => {
  if (soundQueued) return;
  soundQueued = true;
  requestAnimationFrame(() => {
    const audio = new Audio(audioFile);
    audio.play();
    soundQueued = false;
  });
};

export default playFlipSoundOnce;
