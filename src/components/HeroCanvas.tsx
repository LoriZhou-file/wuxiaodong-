import { useEffect, useRef, useState } from "react";

interface InkParticle {
  x: number;
  y: number;
  size: number;
  targetSize: number;
  alpha: number;
  speedY: number;
  color: string;
  bleedSpeed: number;
  isStream: boolean;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = canvas.width = w;
        height = canvas.height = h;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const particles: InkParticle[] = [];

    // Initialize backdrop of vertical drip streams and cell matrix nodes
    const initParticles = () => {
      // 1. Core gravity flowing lines
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          size: Math.random() * 2 + 0.5,
          targetSize: Math.random() * 3 + 1,
          alpha: Math.random() * 0.4 + 0.1,
          speedY: Math.random() * 1.5 + 0.5, // gravity pulling speed
          color: Math.random() > 0.4 ? "#F2F2F2" : "#d4ac0d", // Silver-white or mineral gold
          bleedSpeed: 0.05,
          isStream: true
        });
      }

      // 2. Cellular genetic nodes (breathing)
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 4 + 2,
          targetSize: Math.random() * 8 + 6,
          alpha: Math.random() * 0.3 + 0.05,
          speedY: Math.random() * 0.1 - 0.05, // floating slightly
          color: "#F2F2F2",
          bleedSpeed: 0.01,
          isStream: false
        });
      }
    };

    initParticles();

    // Mouse interactive paint drop
    const handlePointerMove = (e: PointerEvent) => {
      setInteracted(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spawn carbon bleed ink cells on cursor trail
      if (Math.random() > 0.6) {
        particles.push({
          x,
          y,
          size: 1,
          targetSize: Math.random() * 14 + 6,
          alpha: 0.6,
          speedY: Math.random() * 2 + 1, // falls vertically instantly
          color: Math.random() > 0.2 ? "#F2F2F2" : "#d4ac0d",
          bleedSpeed: 0.15, // fast diffusion on contact
          isStream: Math.random() > 0.5
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    let animationFrameId: number;

    const render = () => {
      // Clear with slight alpha to preserve temporal ink trails
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Draw vertical flowing streams of paint
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply natural paper fiber diffusion (size grows, alpha fades as ink diffuses)
        if (p.size < p.targetSize) {
          p.size += p.bleedSpeed;
        }

        // Draw the ink particle
        ctx.beginPath();
        if (p.isStream) {
          // Draw as a vertical stream line reflecting gravity pull
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.lineCap = "round";
          ctx.globalAlpha = p.alpha;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y - p.size * 5); // trailing ink
          ctx.stroke();

          // Gravity movement down
          p.y += p.speedY;
          if (p.y > height + 20) {
            p.y = -50;
            p.x = Math.random() * width;
            p.size = Math.random() * 2 + 0.5;
            p.alpha = Math.random() * 0.3 + 0.1;
          }
        } else {
          // Draw as a cellular/gene dot matrix breathing on Xuan base
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          // Inner core
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Outer diffused bleeding ring
          ctx.beginPath();
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();

          // Gentle cell drifting & breathing
          p.y += p.speedY;
          p.size += Math.sin(Date.now() / 1500 + p.x) * 0.05; // pulsation

          if (p.y > height + 20 || p.y < -20) {
            p.y = Math.random() * height;
          }
        }

        // Keep particle array at healthy count
        if (particles.length > 250) {
          particles.shift();
        }
      }

      // Overlap structured technical digital overlays (grid lines, coordinates) representing the "Silicon code"
      ctx.strokeStyle = "rgba(242, 242, 242, 0.015)";
      ctx.lineWidth = 1;

      // Draw standard framing markers to reflect high-end digital curating
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#F2F2F2";
      ctx.font = "9px monospace";
      ctx.fillText("SYS.REF: CARBON_GRAVITY_FIELD // 2026", 40, height - 30);
      ctx.fillText(`CURSOR_X: ${Math.round(width / 2)} | GRAVITY_FACTOR: 9.81 m/s²`, width - 280, height - 30);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      id="hero-canvas-container"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
      {!interacted && (
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 text-center text-stonegrey/40 font-mono text-[10px] tracking-widest uppercase animate-pulse">
          Move your cursor to diffuse ink on the bio-matrix // 游离指针析出碳基墨晕
        </div>
      )}
    </div>
  );
}
