'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Compass, Scale, BookOpen, Search } from 'lucide-react'
import type { Project } from '@/lib/data/profile'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: Project
  className?: string
}

function getProjectDetails(id: string) {
  switch (id) {
    case 'ikerketa':
      return {
        Icon: Compass,
        accentClass: 'bg-primary/10 text-primary border-primary/20',
        badge: 'Terrain & Enquêtes',
      }
    case 'detective-conseil':
      return {
        Icon: Scale,
        accentClass: 'bg-blue-950/10 text-blue-900 dark:text-blue-300 border-blue-900/20 dark:bg-blue-900/20',
        badge: 'Conseil & Stratégie',
      }
    case 'book':
      return {
        Icon: BookOpen,
        accentClass: 'bg-amber-950/10 text-amber-900 dark:text-amber-300 border-amber-900/20 dark:bg-amber-900/20',
        badge: 'Ouvrage & Méthode',
      }
    default:
      return {
        Icon: Search,
        accentClass: 'bg-primary/10 text-primary border-primary/20',
        badge: 'Projet',
      }
  }
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const { Icon, accentClass, badge } = getProjectDetails(project.id)

  return (
    <motion.article
      className={cn('surface-card group relative block', className)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <a
        href={project.url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex h-full flex-col'
      >
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl border', accentClass)}>
              <Icon className='h-5 w-5' />
            </div>
            <span className='border-border/80 bg-secondary/80 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium'>
              {badge}
            </span>
          </div>
          <div className='text-muted-foreground group-hover:text-primary flex h-8 w-8 items-center justify-center rounded-lg transition-colors'>
            <ArrowUpRight className='h-4 w-4' />
          </div>
        </div>

        <h2 className='text-foreground mb-1 text-xl font-bold font-serif'>{project.title}</h2>
        <p className='text-primary mb-3 text-sm font-medium'>{project.subtitle}</p>
        <p className='text-muted-foreground mb-6 grow text-sm leading-relaxed'>{project.description}</p>

        {project.tags && (
          <div className='mt-auto flex flex-wrap gap-1.5 pt-2'>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className='border-border/60 bg-secondary/50 text-muted-foreground rounded-md border px-2 py-0.5 text-[11px] font-medium'
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


