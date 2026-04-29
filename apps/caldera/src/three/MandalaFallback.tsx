/**
 * MandalaFallback — the rendered identity mark.
 *
 * Currently the canonical Caldera mandala (the WebGL/R3F path is parked behind
 * a React-19 / R3F-v8 dependency conflict). Built as a layered SVG composition:
 * five geometry groups rotating at different speeds and directions, a breathing
 * core glow, and dash-flowing rings. All motion respects `prefers-reduced-motion`
 * and the `[data-sensory="light"]` mode (frozen in canonical pose, full opacity).
 */

const innerRings = [
  { r: 34, color: "var(--color-neon-green)", opacity: 0.95, dash: "0 0" },
  { r: 58, color: "var(--color-neon-blue)", opacity: 0.8, dash: "2 8" },
] as const;

const outerRings = [
  { r: 88, color: "var(--color-neon-purple)", opacity: 0.72, dash: "1 7" },
  { r: 122, color: "var(--color-neon-green)", opacity: 0.48, dash: "5 5" },
  { r: 164, color: "var(--color-neon-blue)", opacity: 0.3, dash: "0 0" },
] as const;

const petals = Array.from({ length: 36 }, (_, i) => i * 10);
const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

export function MandalaFallback() {
  return (
    <svg
      viewBox="-220 -220 440 440"
      role="img"
      aria-label="Caldera mandala — geometric identity mark in purple, blue, and green"
      className="block aspect-square w-full"
    >
      <defs>
        <radialGradient id="fallback-mandala-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-neon-green)" stopOpacity="0.85" />
          <stop offset="48%" stopColor="var(--color-neon-blue)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-neon-purple)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fallback-mandala-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-neon-purple)" stopOpacity="0.0" />
          <stop offset="62%" stopColor="var(--color-neon-purple)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-neon-purple)" stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* Halo — outermost ambient ring, breathes slowly */}
      <g className="m-pulse-halo">
        <circle cx="0" cy="0" r="210" fill="url(#fallback-mandala-halo)" />
      </g>

      {/* Soft radial core glow — breathes */}
      <g className="m-pulse-core">
        <circle cx="0" cy="0" r="190" fill="url(#fallback-mandala-core)" opacity="0.36" />
      </g>

      {/* Petal ring — rotates clockwise, medium */}
      <g className="m-spin-cw-med">
        {petals.map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-96"
            rx="13"
            ry="78"
            fill="none"
            stroke="var(--color-neon-purple)"
            strokeOpacity="0.22"
            strokeWidth="1"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* Outer ring system — counter-rotates slow, dashes flow */}
      <g className="m-spin-ccw-slow m-flow-dash">
        {outerRings.map((ring) => (
          <circle
            key={ring.r}
            cx="0"
            cy="0"
            r={ring.r}
            fill="none"
            stroke={ring.color}
            strokeOpacity={ring.opacity}
            strokeWidth={1}
            strokeDasharray={ring.dash}
          />
        ))}
      </g>

      {/* Spokes — rotates clockwise, very slow */}
      <g className="m-spin-cw-slow">
        {spokes.map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="-184"
            x2="0"
            y2="-42"
            stroke="var(--color-neon-blue)"
            strokeOpacity={0.2}
            strokeWidth={0.6}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* Inner rings — counter-rotates medium, dashes flow */}
      <g className="m-spin-ccw-med m-flow-dash">
        {innerRings.map((ring) => (
          <circle
            key={ring.r}
            cx="0"
            cy="0"
            r={ring.r}
            fill="none"
            stroke={ring.color}
            strokeOpacity={ring.opacity}
            strokeWidth={1}
            strokeDasharray={ring.dash}
          />
        ))}
      </g>

      {/* Central core dot — pulses gently */}
      <g className="m-pulse-core">
        <circle
          cx="0"
          cy="0"
          r="15"
          fill="var(--color-void)"
          stroke="var(--color-neon-green)"
          strokeWidth={1.5}
          strokeOpacity={0.95}
        />
      </g>
    </svg>
  );
}
