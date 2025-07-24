import { useEffect, useRef } from "react";

type SmokeParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  isRipple?: boolean;
};

export default function ConfettiCursorPro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<SmokeParticle[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const createParticle = (x: number, y: number) => {
    particles.current.push({
      x,
      y,
      radius: Math.random() * 8 + 5,
      alpha: 0.3 + Math.random() * 0.25,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });
  };

  const createRipple = (x: number, y: number) => {
    for (let i = 0; i < 8; i++) {
      particles.current.push({
        x,
        y,
        radius: 5,
        alpha: 0.4,
        vx: Math.cos((i * Math.PI * 2) / 8) * (Math.random() * 2 + 1),
        vy: Math.sin((i * Math.PI * 2) / 8) * (Math.random() * 2 + 1),
        isRipple: true,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isDarkMode = () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        if (p.isRipple) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.015;
          p.radius += 0.5;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.004;
          p.radius *= 0.98;
        }

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
        } else {
          const baseColor = isDarkMode()
            ? `rgba(255,255,255,${p.alpha})`
            : `rgba(120,120,120,${p.alpha})`;

          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius
          );
          gradient.addColorStop(0, baseColor);
          gradient.addColorStop(1, `rgba(255,255,255,0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(render);
    };

    render();

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      createParticle(mouse.current.x, mouse.current.y);
    };

    const click = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
