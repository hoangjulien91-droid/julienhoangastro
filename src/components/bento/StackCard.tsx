import { PROFILE } from '@/lib/data/profile'
import { Sparkles } from 'lucide-react'

/**
 * S-TIER: StackCard with Semantic HTML
 *
 * Uses section and h3 for proper heading hierarchy.
 */
export function StackCard() {
  return (
    <section className='glass animate-in animate-in-delay-2 rounded-3xl p-8'>
      <div className='mb-6 flex items-center gap-3'>
        <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl'>
          <Sparkles className='text-primary h-5 w-5' />
        </div>
        <h3 className='text-xl font-bold'>Expertise</h3>
      </div>

      <div className='flex flex-wrap gap-2'>
        {PROFILE.skills.map((skill: string, index: number) => (
          <span
            key={index}
            className='bg-secondary border-border hover:bg-primary hover:text-primary-foreground rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200'
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
