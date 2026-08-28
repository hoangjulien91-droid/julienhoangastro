'use client'

import { Compass, Scale, ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'

type ContactCardProps = {
  email: string
}

export function ContactCard({ email }: ContactCardProps) {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className='surface-card animate-in animate-in-delay-3 flex flex-col justify-between'>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-foreground font-serif text-xl font-bold'>Prendre Contact</h3>
          <span className='border-border/80 bg-secondary/80 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium'>
            Orientation & Devis
          </span>
        </div>

        <p className='text-muted-foreground mb-5 text-sm leading-relaxed'>
          Sélectionnez le cabinet correspondant à votre besoin pour une prise en charge confidentielle :
        </p>

        <div className='flex flex-col gap-2.5'>
          {/* Option Ikerketa */}
          <a
            href='https://ikerketa.fr'
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3 text-left transition-all hover:border-primary/50 hover:bg-primary/10'
          >
            <div className='flex items-center gap-3'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                <Compass className='h-4 w-4' />
              </div>
              <div>
                <p className='text-foreground text-sm font-semibold group-hover:text-primary transition-colors'>
                  Agence Ikerketa
                </p>
                <p className='text-muted-foreground text-xs'>Enquêtes terrain & surveillances (Pays Basque & National)</p>
              </div>
            </div>
            <ArrowUpRight className='text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors' />
          </a>

          {/* Option Détective Conseil */}
          <a
            href='https://detective-conseil.fr'
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-center justify-between rounded-xl border border-border/80 bg-secondary/50 p-3 text-left transition-all hover:border-primary/40 hover:bg-secondary/90'
          >
            <div className='flex items-center gap-3'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground border border-border'>
                <Scale className='h-4 w-4 text-blue-900 dark:text-blue-300' />
              </div>
              <div>
                <p className='text-foreground text-sm font-semibold group-hover:text-primary transition-colors'>
                  Détective Conseil
                </p>
                <p className='text-muted-foreground text-xs'>Audit de dossier & stratégie de preuve (100% à distance)</p>
              </div>
            </div>
            <ArrowUpRight className='text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors' />
          </a>
        </div>
      </div>

      <div className='mt-5 flex items-center justify-between border-t border-border/50 pt-3 text-xs'>
        <span className='text-muted-foreground'>Email direct :</span>
        <button
          type='button'
          onClick={copyEmail}
          className='text-foreground hover:text-primary flex items-center gap-1.5 font-medium transition-colors'
          title='Copier l’adresse email'
        >
          <span>{email}</span>
          {copied ? <Check className='text-green-600 h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5 opacity-60' />}
        </button>
      </div>
    </section>
  )
}


