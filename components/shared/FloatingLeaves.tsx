"use client";
import { useEffect, useRef } from "react";

interface Leaf {
  id: number;
  color: string;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  depth: number;
}

const LEAVES: Leaf[] = [
  { id: 1, color: "#f472b6", top: "4%", left: "3%", size: 44, duration: 9, delay: 0, rotate: -18, depth: 0.02 },
  { id: 2, color: "#facc15", top: "9%", left: "92%", size: 34, duration: 11, delay: 1.2, rotate: 22, depth: 0.035 },
  { id: 3, color: "#34d399", top: "22%", left: "6%", size: 30, duration: 10, delay: 2.1, rotate: 12, depth: 0.025 },
  { id: 4, color: "#a78bfa", top: "18%", left: "88%", size: 26, duration: 8.5, delay: 0.6, rotate: -30, depth: 0.03 },
  { id: 5, color: "#fb923c", top: "32%", left: "1%", size: 24, duration: 12, delay: 1.8, rotate: 40, depth: 0.015 },
  { id: 6, color: "#60a5fa", top: "38%", left: "95%", size: 22, duration: 9.5, delay: 2.6, rotate: -12, depth: 0.02 },
  { id: 7, color: "#f472b6", top: "48%", left: "4%", size: 28, duration: 10.5, delay: 0.3, rotate: 25, depth: 0.028 },
  { id: 8, color: "#facc15", top: "55%", left: "93%", size: 24, duration: 13, delay: 1.4, rotate: -20, depth: 0.018 },
  { id: 9, color: "#34d399", top: "63%", left: "2%", size: 32, duration: 11.5, delay: 0.9, rotate: 16, depth: 0.026 },
  { id: 10, color: "#a78bfa", top: "70%", left: "91%", size: 26, duration: 9, delay: 2.3, rotate: -24, depth: 0.022 },
  { id: 11, color: "#fb923c", top: "80%", left: "5%", size: 28, duration: 10, delay: 1.6, rotate: 30, depth: 0.03 },
  { id: 12, color: "#60a5fa", top: "86%", left: "90%", size: 24, duration: 12.5, delay: 0.4, rotate: -14, depth: 0.02 },
  { id: 13, color: "#f472b6", top: "94%", left: "8%", size: 26, duration: 9.5, delay: 2.0, rotate: 20, depth: 0.024 },
  { id: 14, color: "#facc15", top: "97%", left: "87%", size: 22, duration: 11, delay: 1.1, rotate: -28, depth: 0.019 },
];

function LeafSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: `drop-shadow(0 6px 14px ${color}55)` }}>
      <defs>
        <linearGradient id={`leaf-grad-${color.replace("#", "")}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M24 4C10 8 4 22 8 36c2 6 8 8 14 6 10-3 18-13 20-24 1-6-2-11-8-13-4-1.5-7-1.5-10-1z"
        fill={`url(#leaf-grad-${color.replace("#", "")})`}
      />
      <path d="M24 6C18 16 14 26 10 36" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      const leafEls = container.querySelectorAll<HTMLDivElement>("[data-leaf-depth]");
      leafEls.forEach(el => {
        const depth = parseFloat(el.dataset.leafDepth || "0.02");
        const moveX = x * depth * 1000;
        const moveY = y * depth * 1000;
        el.style.setProperty("--mx", `${moveX}px`);
        el.style.setProperty("--my", `${moveY}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      {LEAVES.map(leaf => (
        <div
          key={leaf.id}
          data-leaf-depth={leaf.depth}
          className="fl-leaf"
          style={{
            position: "absolute",
            top: leaf.top,
            left: leaf.left,
            // @ts-expect-error -- custom CSS vars used by the keyframe animation
            "--rot": `${leaf.rotate}deg`,
            animation: `fl-float ${leaf.duration}s ease-in-out ${leaf.delay}s infinite`,
          }}
        >
          <div style={{ transform: "translate(var(--mx,0),var(--my,0))", transition: "transform 0.6s ease-out" }}>
            <LeafSVG color={leaf.color} size={leaf.size} />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes fl-float {
          0%   { transform: translateY(0) rotate(var(--rot)); }
          25%  { transform: translateY(-18px) rotate(calc(var(--rot) + 8deg)); }
          50%  { transform: translateY(4px) rotate(calc(var(--rot) - 6deg)); }
          75%  { transform: translateY(-10px) rotate(calc(var(--rot) + 4deg)); }
          100% { transform: translateY(0) rotate(var(--rot)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fl-leaf { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
