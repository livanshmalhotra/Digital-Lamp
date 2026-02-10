import StarField from "@/components/StarField";
import FuturisticLamp from "@/components/FuturisticLamp";

const Index = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, hsl(230 25% 8%) 0%, hsl(230 25% 3%) 100%)`,
      }}
    >
      {/* Circuit pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(200 100% 60% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(200 100% 60% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <StarField />

      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="mb-16 text-lg tracking-[0.4em] uppercase text-muted-foreground font-light"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Digital Lamp
        </h1>
        <FuturisticLamp />
      </div>
    </div>
  );
};

export default Index;
