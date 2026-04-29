"use client";

import { MandalaFallback } from "./MandalaFallback";

export default function MandalaClient() {
  // The installed R3F/Drei pair currently reads React internals that are not
  // available under React 19. Keep the 3D module out of the runtime path until
  // that dependency pair is upgraded together, so the rest of Caldera stays live.
  return <MandalaFallback />;
}
