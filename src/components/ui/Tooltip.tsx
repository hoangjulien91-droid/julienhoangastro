'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delayMs?: number
}

export function Tooltip({ children, content, side = 'bottom', delayMs = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delayMs)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className='relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`bg-popover text-popover-foreground pointer-events-none absolute z-50 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap shadow-lg backdrop-blur-md ${positions[side]}`}
          >
            {content}
            {/* Arrow */}
            <div
              className={`bg-popover absolute h-2 w-2 rotate-45 ${
                side === 'top'
                  ? 'bottom-[-4px] left-1/2 -translate-x-1/2'
                  : side === 'bottom'
                    ? 'top-[-4px] left-1/2 -translate-x-1/2'
                    : side === 'left'
                      ? 'top-1/2 right-[-4px] -translate-y-1/2'
                      : 'top-1/2 left-[-4px] -translate-y-1/2'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
