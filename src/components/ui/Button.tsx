'use client'

import { cn } from '@/lib/utils'
import { useHaptics } from '@/hooks/use-haptics'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode
    haptic?: 'light' | 'medium' | 'heavy'
  }

/**
 * S-TIER: Button with haptic feedback
 */
export function Button({
  children,
  className,
  variant,
  size,
  haptic = 'light',
  onClick,
  ...props
}: ButtonProps) {
  const { trigger } = useHaptics()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trigger(haptic)
    onClick?.(e)
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
