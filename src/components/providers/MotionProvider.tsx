'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * S-TIER: LazyMotion Provider
 *
 * Wraps the app with LazyMotion to enable tree-shaking.
 * Reduces Framer Motion bundle by ~50% (from ~40KB to ~15KB gzipped).
 *
 * Usage: Import `m` instead of `motion` in components.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
