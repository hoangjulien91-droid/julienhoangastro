'use client'

import { motion } from 'framer-motion'
import { Link, Link as ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/data/profile'

type ProjectCardProps = {
  project: Project
  className?: string
}

/**
 * S-TIER: ProjectCard with Semantic HTML
 *
 * Uses <article> for SEO. Framer Motion for hover ONLY.
 * Semantic Tokens ONLY (No hardcoded colors).
 */
import { cn } from '@/lib/utils'

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const Icon = Link

  return (
    <motion.article
      className={cn('group glass glass-hover animate-in block rounded-3xl', className)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <a
        href={project.url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex h-full flex-col p-8'
      >
        <div className='mb-4 flex items-start justify-between'>
          <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
            <Icon className='text-primary h-6 w-6' />
          </div>
          <ExternalLink className='text-muted-foreground h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </div>

        <h2 className='mb-1 text-xl font-bold'>{project.title}</h2>
        <p className='text-primary mb-3 text-sm font-medium'>{project.subtitle}</p>
        <p className='text-muted-foreground mb-4 grow'>{project.description}</p>

        {project.tags && (
          <div className='mt-auto flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className='bg-secondary border-border hover:bg-primary hover:text-primary-foreground text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </motion.article>
  )
}
