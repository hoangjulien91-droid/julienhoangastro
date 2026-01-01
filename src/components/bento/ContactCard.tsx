'use client'

import { Button } from '@/components/ui/Button'
import { Mail, ArrowRight } from 'lucide-react'

type ContactCardProps = {
  email: string
}

/**
 * S-TIER: ContactCard with Semantic HTML
 *
 * Uses <section> and h3.
 */
export function ContactCard({ email }: ContactCardProps) {
  return (
    <section className='glass animate-in animate-in-delay-3 flex flex-col justify-between rounded-3xl p-8'>
      <div>
        <div className='mb-4 flex items-center gap-3'>
          <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl'>
            <Mail className='text-primary h-5 w-5' />
          </div>
          <h3 className='text-xl font-bold'>Contact</h3>
        </div>

        <p className='text-muted-foreground mb-6'>
          Une question ? Un projet d&apos;enquête ? N&apos;hésitez pas à me contacter.
        </p>
      </div>

      <Button
        size='lg'
        haptic='medium'
        className='w-full'
        onClick={() => (window.location.href = `mailto:${email}`)}
      >
        Me contacter
        <ArrowRight className='h-5 w-5' />
      </Button>
    </section>
  )
}
