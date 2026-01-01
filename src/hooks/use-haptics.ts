'use client'

import { useCallback } from 'react'

type HapticPattern = 'light' | 'medium' | 'heavy'

const patterns: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 40,
  heavy: [50, 30, 50],
}

/**
 * S-TIER: Haptic Feedback Hook
 *
 * Provides tactile feedback on mobile devices.
 * Safe: Falls back gracefully if vibration is not supported.
 * Respects prefers-reduced-motion automatically.
 */
export function useHaptics() {
  const trigger = useCallback((pattern: HapticPattern = 'light') => {
    // Check if vibration is supported
    if (typeof navigator === 'undefined' || !navigator.vibrate) return

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    try {
      navigator.vibrate(patterns[pattern])
    } catch {
      // Silently fail if vibration is not allowed
    }
  }, [])

  return { trigger }
}
