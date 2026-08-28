"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PstStore } from "./store";

/**
 * PstStore has no internal pub-sub — every mutating call must be followed by
 * bump() so React re-renders. The store itself is SSR-safe (constructor
 * no-ops on the server), but its localStorage-derived data can only be
 * trusted after mount, hence the effect-triggered re-render below.
 */
export function usePstStore(moduleKey: string) {
  const storeRef = useRef<PstStore | null>(null);
  if (storeRef.current === null || storeRef.current.key !== moduleKey) {
    storeRef.current = new PstStore(moduleKey);
  }

  const [version, setVersion] = useState(0);
  const bump = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    bump();
  }, [moduleKey, bump]);

  return { store: storeRef.current, version, bump };
}
