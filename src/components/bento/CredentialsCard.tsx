import { PROFILE, type Credential } from '@/lib/data/profile'
import { GraduationCap, Shield } from 'lucide-react'

/**
 * S-TIER: CredentialsCard with Semantic HTML
 *
 * Uses h3 for proper heading hierarchy.
 */
export function CredentialsCard() {
  return (
    <section className='glass animate-in animate-in-delay-1 rounded-3xl p-8'>
      <div className='mb-6 flex items-center gap-3'>
        <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl'>
          <GraduationCap className='text-primary h-5 w-5' />
        </div>
        <h3 className='text-xl font-bold'>Formation & Agréments</h3>
      </div>

      <ul className='space-y-4'>
        {PROFILE.credentials.map((credential: Credential, index: number) => (
          <li key={index} className='flex items-start gap-3'>
            {credential.type === 'certification' ? (
              <Shield className='text-primary mt-1 h-4 w-4 shrink-0' />
            ) : (
              <div className='border-primary/50 mt-1 h-4 w-4 shrink-0 rounded-full border-2' />
            )}
            <div>
              <p className='font-semibold'>{credential.title}</p>
              <p className='text-muted-foreground text-sm'>{credential.institution}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
