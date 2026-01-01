'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useHaptics } from '@/hooks/use-haptics'
import { Tooltip } from '@/components/ui/Tooltip'

/**
 * S-TIER GOD MODE+: Theme Toggle (Astro Compatible)
 *
 * Features:
 * - Keyboard Shortcut (Ctrl+Shift+L)
 * - Visual Ripple Effect
 * - Toast Notifications (Sonner)
 * - Smooth Background Gradient Transition
 * - Tooltip on Hover
 * - Haptic Feedback
 * - Framer Motion Animations
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const { trigger } = useHaptics()

  useEffect(() => {
    setMounted(true)
    // Check initial theme
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
    
    // Observer for changes (if toggled elsewhere)
    const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setTheme(isDark ? 'dark' : 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(
    (showToast = true) => {
      const newTheme = theme === 'dark' ? 'light' : 'dark'
      const isDark = newTheme === 'dark'
      
      // Update DOM
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Save preference
      localStorage.setItem('theme', newTheme)
      setTheme(newTheme)
      trigger('light')

      // Toast notification
      if (showToast) {
        toast.success(newTheme === 'dark' ? '🌙 Mode sombre activé' : '☀️ Mode clair activé', {
          duration: 2000,
          position: 'bottom-center',
          style: {
            background: 'var(--popover)',
            color: 'var(--popover-foreground)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
          },
        })
      }

      // Background gradient transition (add class to html)
      document.documentElement.classList.add('theme-transitioning')
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning')
      }, 300)
    },
    [theme, trigger]
  )

  // Keyboard shortcut: Ctrl+Shift+L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        e.preventDefault()
        toggleTheme()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme])

  // Ripple effect handler
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = { id: Date.now(), x, y }
    setRipples((prev: { id: number; x: number; y: number }[]) => [...prev, ripple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev: { id: number; x: number; y: number }[]) => prev.filter((r) => r.id !== ripple.id))
    }, 600)

    toggleTheme()
  }

  // SSR-safe fallback
  if (!mounted) {
    return <div className='bg-muted/50 h-10 w-10 rounded-lg' aria-hidden='true' />
  }

  const isDark = theme === 'dark'

  return (
    <Tooltip content='Changer de thème (Ctrl+Shift+L)' side='bottom'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className='bg-muted/50 hover:bg-muted relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg transition-colors'
        aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      >
        {/* Ripple effects */}
        {ripples.map((ripple: { id: number; x: number; y: number }) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-primary/20 pointer-events-none absolute h-10 w-10 rounded-full'
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
          />
        ))}

        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className='absolute'
        >
          <Sun className='h-5 w-5' />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className='absolute'
        >
          <Moon className='h-5 w-5' />
        </motion.div>
      </motion.button>
    </Tooltip>
  )
}
