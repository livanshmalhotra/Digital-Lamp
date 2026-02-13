import { useState, useMemo, useEffect } from "react";
import lampImage from "@/assets/kerala-lamp.png";

const WICK_COUNT = 5;

const Index = () => {
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
      Array.from({ length: 40 }, () => ({
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${4 + Math.random() * 3}s`,
        size: 10 + Math.random() * 18,
        drift: `${-120 + Math.random() * 240}px`,
        initialRotation: Math.random() * 360,
      })),
    []
  );
  

  // 🔥 Ignite single wick
  const igniteWick = (index: number) => {
    if (litWicks[index]) return;

    const side: "left" | "right" = index % 2 === 0 ? "left" : "right";

    setMatchPhase("entering");
    setActiveMatch({ side, wickIndex: index });

    setTimeout(() => {
      setLitWicks((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }, 800);

    setTimeout(() => {
      setMatchPhase("exiting");
    }, 1200);

    setTimeout(() => {
      setActiveMatch(null);
    }, 1800);
  };

  // 🌹 Show petals after all 5 are lit
  useEffect(() => {
    if (litWicks.every(Boolean)) {
      setTimeout(() => {
        setShowPetals(true);
      }, 800);
    }
  }, [litWicks]);

  const wickPositions = Array.from({ length: WICK_COUNT }, (_, i) => ({
    top: `${72 - i * 14}%`,
  }));
  

  return (
    <div
      className="scene scene--visible"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 10px",
      }}
    >
      {/* 🪔 CENTER LAMP */}
      <div
        className="lamp-image-container"
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img
          src={lampImage}
          alt="Kerala traditional brass lamp"
          className="lamp-image"
          draggable={false}
          style={{
            width: "100%",
            maxWidth: "380px",   // prevents oversized scaling
            height: "auto",
            objectFit: "contain",
          }}
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
  
      {/* 🔘 BOTTOM BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          paddingBottom: "10px",
          touchAction: "manipulation",
        }}
      >
        {Array.from({ length: WICK_COUNT }).map((_, i) => (
          <button
          key={i}
          onClick={() => igniteWick(i)}
          disabled={litWicks[i]}
          style={{
            fontSize: "12px",
            padding: "6px 10px",
            borderRadius: "6px",
            background: litWicks[i] ? "#444" : "#d4af37",
            color: "white",
            border: "none",
            cursor: litWicks[i] ? "not-allowed" : "pointer",
            opacity: litWicks[i] ? 0.7 : 1,
          }}
        >
          {litWicks[i] ? " Lit" : `🔥 Ignite ${i + 1}`}
        </button>
        
        ))}
      </div>
  
      {/* 🌹 PETALS */}
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
