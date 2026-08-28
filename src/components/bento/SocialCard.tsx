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

export function SocialCard({ socials }: SocialCardProps) {
  return (
    <nav
      className='surface-card animate-in animate-in-delay-4 flex flex-col justify-between'
      aria-label='Réseaux professionnels'
    >
      <div>
        <h3 className='text-foreground mb-4 font-serif text-xl font-bold'>Réseaux & Veille</h3>
        <p className='text-muted-foreground mb-6 text-sm leading-relaxed'>
          Suivez mes publications juridiques, retours d&apos;expérience et analyses.
        </p>
      </div>

      <div className='flex gap-3'>
        {socials.map((social: Social) => {
          const Icon = iconMap[social.icon]
          return (
            <motion.a
              key={social.platform}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className='border-border/80 bg-secondary/80 text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary flex h-11 w-11 items-center justify-center rounded-xl border transition-colors'
              whileHover={{ y: -2 }}
              aria-label={social.platform}
            >
              <Icon className='h-5 w-5' />
            </motion.a>
          )
        })}
      </div>
    </nav>
  )
}
