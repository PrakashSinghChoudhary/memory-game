// Lightweight, high-performance canvas confetti system without any external dependencies

export function fireConfetti() {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const colors = [
    "#38bdf8", // Sky blue
    "#818cf8", // Indigo
    "#c084fc", // Purple
    "#f472b6", // Pink
    "#fb7185", // Rose
    "#fbbf24", // Amber
    "#34d399", // Emerald
    "#a78bfa", // Violet
  ];

  const particleCount = 120;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 6;
    const isRibbon = Math.random() > 0.6;

    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 100,
      y: height * 0.45 + (Math.random() - 0.5) * 80,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      size: isRibbon ? Math.random() * 8 + 8 : Math.random() * 6 + 5,
      height: isRibbon ? Math.random() * 14 + 10 : Math.random() * 6 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.22,
      drag: 0.96,
      opacity: 1,
      decay: Math.random() * 0.008 + 0.006,
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (let p of particles) {
      if (p.opacity <= 0) continue;
      activeCount++;

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      ctx.fillRect(-p.size / 2, -p.height / 2, p.size, p.height);
      ctx.restore();
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  render();
}
