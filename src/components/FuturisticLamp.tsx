import { useState } from "react";
import Particles from "./Particles";

const FuturisticLamp = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Light rays */}
      {isOn && (
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none">
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: `conic-gradient(
                from 0deg,
                transparent,
                hsl(200 100% 60% / 0.15),
                transparent,
                hsl(270 60% 55% / 0.15),
                transparent,
                hsl(180 80% 50% / 0.15),
                transparent
              )`,
              animation: "ray-rotate 8s linear infinite",
            }}
          />
        </div>
      )}

      {/* Lamp structure */}
      <div className="relative flex flex-col items-center">
        {/* Lamp top cap */}
        <div
          className="w-10 h-3 rounded-t-full transition-all duration-1000"
          style={{
            background: `linear-gradient(to bottom, hsl(220 10% 55%), hsl(220 10% 35%))`,
            boxShadow: isOn ? "0 -5px 20px hsl(200 100% 60% / 0.3)" : "none",
          }}
        />

        {/* Lamp light body */}
        <div
          className={`relative w-8 rounded-sm transition-all duration-1000 overflow-hidden ${isOn ? "lamp-glow-active" : ""}`}
          style={{
            height: "180px",
            background: isOn
              ? `linear-gradient(180deg, hsl(200 100% 60% / 0.9), hsl(270 60% 55% / 0.8), hsl(180 80% 50% / 0.9))`
              : `linear-gradient(180deg, hsl(220 10% 15%), hsl(220 10% 12%))`,
            boxShadow: isOn
              ? `0 0 30px hsl(200 100% 60% / 0.5), 0 0 60px hsl(270 60% 55% / 0.3), 0 0 100px hsl(180 80% 50% / 0.2), inset 0 0 30px hsl(200 100% 80% / 0.2)`
              : `inset 0 0 10px hsl(0 0% 0% / 0.5)`,
          }}
        >
          {/* Shimmer overlay */}
          {isOn && <div className="absolute inset-0 shimmer-effect" />}
        </div>

        {/* Lamp neck */}
        <div
          className="w-4 h-6 transition-all duration-1000"
          style={{
            background: `linear-gradient(to bottom, hsl(220 10% 35%), hsl(220 10% 30%))`,
          }}
        />

        {/* Lamp base */}
        <div
          className="w-20 h-3 rounded-b-lg transition-all duration-1000"
          style={{
            background: `linear-gradient(to bottom, hsl(220 10% 40%), hsl(220 10% 25%))`,
            boxShadow: isOn
              ? `0 5px 30px hsl(200 100% 60% / 0.3), 0 10px 50px hsl(270 60% 55% / 0.15)`
              : "none",
          }}
        />
        <div
          className="w-24 h-2 rounded-b-lg transition-all duration-1000"
          style={{
            background: `linear-gradient(to bottom, hsl(220 10% 30%), hsl(220 10% 20%))`,
          }}
        />
      </div>

      {/* Floor ambient glow */}
      <div
        className="w-64 h-16 -mt-2 transition-all duration-1000 rounded-[50%]"
        style={{
          background: isOn
            ? `radial-gradient(ellipse, hsl(200 100% 60% / 0.25) 0%, hsl(270 60% 55% / 0.1) 40%, transparent 70%)`
            : "transparent",
        }}
      />

      {/* Particles */}
      <Particles active={isOn} />

      {/* Button */}
      <button
        onClick={() => setIsOn((v) => !v)}
        className="mt-10 px-8 py-3 rounded-lg font-semibold text-sm tracking-widest uppercase transition-all duration-500 border"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: isOn ? "hsl(200 100% 60%)" : "hsl(210 10% 55%)",
          borderColor: isOn ? "hsl(200 100% 60% / 0.5)" : "hsl(220 10% 25%)",
          background: isOn
            ? "hsl(200 100% 60% / 0.08)"
            : "hsl(220 10% 10%)",
          boxShadow: isOn
            ? "0 0 20px hsl(200 100% 60% / 0.2), inset 0 0 20px hsl(200 100% 60% / 0.05)"
            : "none",
        }}
      >
        {isOn ? "Extinguish" : "Ignite the Lamp"}
      </button>
    </div>
  );
};

export default FuturisticLamp;
