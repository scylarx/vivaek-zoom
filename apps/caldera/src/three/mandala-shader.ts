/**
 * Caldera mandala GLSL shaders.
 * Fragment composites three neon stops (purple/blue/green) with a
 * noise-driven UV warp for organic motion. Kept restrained — not Winamp.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorPurple;
  uniform vec3 uColorBlue;
  uniform vec3 uColorGreen;
  uniform float uIntensity;

  varying vec2 vUv;

  // Simple 2D pseudo-random hash.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Value noise — smooth interpolation of random values on a grid.
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),           hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Two-octave fbm for the UV warp.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 2; i++) {
      v += a * noise(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // UV centred at (0.5, 0.5) → polar
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);

    // Low-amplitude UV warp — organic drift, not psychedelic chaos.
    float warpStrength = 0.045 + uIntensity * 0.02;
    vec2 warpUv = vUv + warpStrength * vec2(
      fbm(vUv * 3.2 + uTime * 0.08),
      fbm(vUv * 3.2 - uTime * 0.07 + vec2(1.7, 2.3))
    );

    float warpDist = length(warpUv - 0.5);

    // Three concentric neon bands blended together.
    // Each band peaks at a different radius.
    float bandPurple = smoothstep(0.0, 0.06, 0.18 - abs(warpDist - 0.18));
    float bandBlue   = smoothstep(0.0, 0.06, 0.30 - abs(warpDist - 0.30));
    float bandGreen  = smoothstep(0.0, 0.06, 0.44 - abs(warpDist - 0.44));

    // Slow angular shimmer per band.
    float shimmerSpeed = 0.4;
    bandPurple *= 0.85 + 0.15 * sin(angle * 6.0 + uTime * shimmerSpeed);
    bandBlue   *= 0.85 + 0.15 * sin(angle * 4.0 - uTime * shimmerSpeed * 0.9);
    bandGreen  *= 0.85 + 0.15 * sin(angle * 3.0 + uTime * shimmerSpeed * 0.7);

    // Compose colour.
    vec3 colour = uColorPurple * bandPurple
                + uColorBlue   * bandBlue
                + uColorGreen  * bandGreen;

    // Soft radial fade to transparent at edges.
    float alpha = (bandPurple + bandBlue + bandGreen);
    alpha = clamp(alpha * (1.0 - smoothstep(0.42, 0.5, dist)), 0.0, 1.0);

    // Pulse on beat: subtle brightness lift driven by uIntensity.
    colour *= 1.0 + uIntensity * 0.15;

    gl_FragColor = vec4(colour, alpha * 0.92);
  }
`;
