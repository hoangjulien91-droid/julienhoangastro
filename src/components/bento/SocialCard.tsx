'use client'

import { motion } from 'framer-motion'
import type { Social } from '@/lib/data/profile'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

const iconMap = {
  linkedin: FaLinkedin,
  twitter: FaTwitter,
} as const

type SocialCardProps = {
  socials: Social[]
}

/**
 * S-TIER: SocialCard with Semantic HTML
 *
 * Uses <nav> for social links to indicate navigation.
 */
export function SocialCard({ socials }: SocialCardProps) {
  return (
    <nav
      className='glass animate-in animate-in-delay-4 rounded-3xl p-8'
      aria-label='Réseaux sociaux'
    >
      <h3 className='mb-6 text-xl font-bold'>Réseaux</h3>

      <div className='flex gap-4'>
        {socials.map((social: Social) => {
          const Icon = iconMap[social.icon]
          return (
            <motion.a
              key={social.platform}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-secondary border-border hover:bg-primary hover:text-primary-foreground flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-200'
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label={social.platform}
            >
              <Icon className='h-6 w-6' />
            </motion.a>
          )
        })}
      </div>
    </nav>
  )
}
