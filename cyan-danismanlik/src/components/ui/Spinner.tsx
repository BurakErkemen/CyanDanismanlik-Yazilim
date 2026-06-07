import { cn } from "./cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-brand",
        className,
      )}
      aria-hidden
    />
  );
}

/** Full-viewport cyberpunk loading state — neon grid, scanline & glitch. */
export function PageLoader({ label = "YÜKLENİYOR" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Scrolling neon grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,211,238,0.12) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "cyber-grid 1.1s linear infinite",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 75%)",
        }}
      />

      {/* Sweeping scanline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(34,211,238,0.18), transparent)",
          animation: "cyber-scan 2.4s var(--ease-out-soft) infinite",
        }}
      />

      <div className="relative flex flex-col items-center gap-7">
        {/* Rotating dual neon ring */}
        <div className="relative h-24 w-24">
          <span
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#22d3ee",
              borderRightColor: "#22d3ee",
              boxShadow: "0 0 22px -2px rgba(34,211,238,0.7)",
              animation: "cyber-spin 0.9s linear infinite",
            }}
          />
          <span
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "#ff2bd6",
              borderLeftColor: "#ff2bd6",
              boxShadow: "0 0 18px -3px rgba(255,43,214,0.6)",
              animation: "cyber-spin 1.4s linear infinite reverse",
            }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-2xl font-black tracking-tighter text-gradient"
            style={{ animation: "cyber-flicker 3s linear infinite" }}
          >
            C
          </span>
        </div>

        {/* Glitch label */}
        <div className="relative select-none font-mono text-sm font-bold uppercase tracking-[0.5em] text-brand-light">
          <span style={{ animation: "cyber-flicker 4s linear infinite" }}>{label}</span>
          <span
            aria-hidden
            className="absolute inset-0 text-[#ff2bd6]"
            style={{ animation: "cyber-glitch-x 2.2s steps(2) infinite", mixBlendMode: "screen" }}
          >
            {label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #0891b2, #22d3ee, #ff2bd6)",
              boxShadow: "0 0 12px rgba(34,211,238,0.8)",
              animation: "cyber-bar 1.6s var(--ease-out-soft) infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
}
