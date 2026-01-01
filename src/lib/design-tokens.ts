import { cva, type VariantProps } from 'class-variance-authority'

/**
 * S-TIER: Centralized Design Tokens
 *
 * All spacing, typography, and component variants
 * are defined here for consistency.
 */

// Typography scales
export const TYPOGRAPHY = {
  heading: {
    hero: 'text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]',
    page: 'text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight',
    section: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    subsection: 'text-3xl md:text-4xl font-bold tracking-tight',
    small: 'text-2xl md:text-3xl font-bold tracking-tight',
  },
  body: {
    xl: 'text-xl md:text-2xl',
    lg: 'text-lg md:text-xl',
    base: 'text-base',
    sm: 'text-sm',
  },
} as const

// Spacing scales
export const SPACING = {
  section: 'mb-8 md:mb-12',
  sectionSmall: 'mb-6 md:mb-10',
  breadcrumbWrapper: 'mb-4 md:mb-6',
  heroSection: 'mb-8 md:mb-12',
  container: 'px-6 lg:px-12 max-w-7xl mx-auto',
  containerNarrow: 'px-6 lg:px-12 max-w-4xl mx-auto',
  containerWide: 'px-6 lg:px-12 max-w-[1600px] mx-auto',
} as const

// Card variants using CVA
export const cardVariants = cva('rounded-3xl transition-colors duration-200', {
  variants: {
    variant: {
      default: 'bg-secondary/50',
      glass: 'bg-card/60 backdrop-blur-md border border-white/10',
      bordered: 'bg-card border border-border hover:border-foreground/20',
      elevated: 'bg-card shadow-lg hover:shadow-xl',
    },
    padding: {
      sm: 'p-6',
      md: 'p-8',
      lg: 'p-8 md:p-12',
      xl: 'p-12 md:p-16',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})

export type CardVariants = VariantProps<typeof cardVariants>

// Blur placeholder for remote images
export const GLASS_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
