import { useMemo } from "react";

const Particles = ({ active }: { active: boolean }) => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${45 + Math.random() * 10}%`,
      size: Math.random() * 4 + 2,
      duration: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 3}s`,
      drift: `${(Math.random() - 0.5) * 40}px`,
    })), []
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "35%",
            width: p.size,
            height: p.size,
            "--duration": p.duration,
            "--delay": p.delay,
            "--drift": p.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Particles;
