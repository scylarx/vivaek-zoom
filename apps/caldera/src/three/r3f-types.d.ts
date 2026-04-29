/**
 * Ambient type declarations for @react-three/fiber v8 with React 19.
 *
 * R3F v8 declares its JSX intrinsics via `declare global { namespace JSX { ... } }`.
 * With React 19's new JSX transform this needs to be re-merged into the
 * react/jsx-runtime namespace. This file does that.
 */
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      // Merge all R3F intrinsics (mesh, ringGeometry, primitive, etc.)
      // into the React 19 JSX namespace.
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}
