'use client'

import { Button } from '@/components/ui/Button'
import { Mail, ArrowRight } from 'lucide-react'

type ContactCardProps = {
  email: string
}

export function ContactCard({ email }: ContactCardProps) {
  return (
    <section className='surface-card animate-in animate-in-delay-3 flex flex-col justify-between'>
      <div>
        <div className='mb-4 flex items-center gap-3'>
          <div className='bg-primary/10 text-primary border-primary/20 flex h-11 w-11 items-center justify-center rounded-xl border'>
            <Mail className='h-5 w-5' />
          </div>
          <h3 className='text-foreground font-serif text-xl font-bold'>Contact & Échange</h3>
        </div>

        <p className='text-muted-foreground mb-6 text-sm leading-relaxed'>
          Pour une étude de dossier, une demande d&apos;investigation ou un conseil stratégique.
        </p>
      </div>

      <Button
        size='md'
        haptic='medium'
        className='w-full font-medium'
        onClick={() => (window.location.href = `mailto:${email}`)}
      >
        <span>Prendre contact</span>
        <ArrowRight className='h-4 w-4' />
      </Button>
    </section>
  )
}

