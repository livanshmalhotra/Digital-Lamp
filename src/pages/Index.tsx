import { useState, useEffect, useMemo } from "react";
import lampImage from "@/assets/kerala-lamp.png";

const WICK_COUNT = 5;

const Index = () => {
  const [started, setStarted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [litWicks, setLitWicks] = useState<boolean[]>(
    Array(WICK_COUNT).fill(false)
  );
  const [activeMatch, setActiveMatch] = useState<{
    side: "left" | "right";
    wickIndex: number;
  } | null>(null);
  const [matchPhase, setMatchPhase] = useState<"entering" | "exiting">(
    "entering"
  );
  const [showPetals, setShowPetals] = useState(false);

  const petals = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${4 + Math.random() * 3}s`,
        size: 8 + Math.random() * 12,
        drift: `${-80 + Math.random() * 160}px`,
        initialRotation: Math.random() * 360,
      })),
    []
  );

  const handleIgnite = () => {
    setStarted(true);
    setFadeIn(false);
    setLitWicks(Array(WICK_COUNT).fill(false));
    setActiveMatch(null);
    setShowPetals(false);
    setTimeout(() => setFadeIn(true), 300);
  };

  useEffect(() => {
    if (!started) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const MATCH_ENTER = 1300;
    const LIGHT_AFTER = 200;
    const MATCH_LINGER = 400;
    const MATCH_EXIT = 800;
    const GAP = 400;

    let delay = 1000;

    for (let i = 0; i < WICK_COUNT; i++) {
      const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
      const d = delay;

      timeouts.push(
        setTimeout(() => {
          setMatchPhase("entering");
          setActiveMatch({ side, wickIndex: i });
        }, d)
      );

      timeouts.push(
        setTimeout(() => {
          setLitWicks((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, d + MATCH_ENTER + LIGHT_AFTER)
      );

      timeouts.push(
        setTimeout(() => {
          setMatchPhase("exiting");
        }, d + MATCH_ENTER + LIGHT_AFTER + MATCH_LINGER)
      );

      timeouts.push(
        setTimeout(() => {
          setActiveMatch(null);
        }, d + MATCH_ENTER + LIGHT_AFTER + MATCH_LINGER + MATCH_EXIT)
      );

      delay += MATCH_ENTER + LIGHT_AFTER + MATCH_LINGER + MATCH_EXIT + GAP;
    }

    timeouts.push(setTimeout(() => setShowPetals(true), delay));

    return () => timeouts.forEach(clearTimeout);
  }, [started]);

  const wickPositions = [
    { top: "72%" },
    { top: "58%" },
    { top: "44%" },
    { top: "30%" },
    { top: "18%" },
  ];

  if (!started) {
    return (
      <div className="scene scene--visible" style={{ flexDirection: "column", gap: "30px" }}>
        <img
          src={lampImage}
          alt="Kerala lamp"
          style={{ height: "40vh", opacity: 0.6, filter: "drop-shadow(0 0 20px rgba(218,165,32,0.2))" }}
          draggable={false}
        />
        <button className="ignite-btn" onClick={handleIgnite}>
          🔥 Ignite
        </button>
      </div>
    );
  }

  return (
    <div className={`scene ${fadeIn ? "scene--visible" : ""}`}>
      <div className="ambient-glow ambient-glow--left" />
      <div className="ambient-glow ambient-glow--right" />
      <div className="ambient-glow ambient-glow--center" />

      <div className="lamp-image-container">
        <img
          src={lampImage}
          alt="Kerala traditional brass lamp"
          className="lamp-image"
          draggable={false}
        />

        {wickPositions.map((pos, i) => (
          <div key={i} className="wick-point" style={{ top: pos.top }}>
            <div className={`flame ${litWicks[i] ? "flame--lit" : ""}`} />
            {litWicks[i] && <div className="flame__glow" />}
            {activeMatch?.wickIndex === i && (
              <div
                className={`match match--${activeMatch.side} match--${matchPhase}`}
              />
            )}
          </div>
        ))}
      </div>

      {showPetals && (
        <div className="petals">
          {petals.map((p, i) => (
            <div
              key={i}
              className="petal"
              style={
                {
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  width: `${p.size}px`,
                  height: `${p.size * 1.4}px`,
                  "--petal-drift": p.drift,
                  "--petal-rotation": `${p.initialRotation}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
