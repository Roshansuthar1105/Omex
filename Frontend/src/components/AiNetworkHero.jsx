import { useEffect, useRef } from "react";
import {useTheme} from "../context/ThemeContext";
export default function AiNetworkHero() {
    const {isDark} = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function initParticles(count = 60) {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }));
    }
    initParticles();

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle =  'rgba(255,255,255,0.6)'  ;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(255,255,255,0.15)' ;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative bg-gray-800 rounded-3xl flex mx-auto my-4 h-100 w-100 overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute flex justify-center items-center" /> 
    </section>
  );
}
