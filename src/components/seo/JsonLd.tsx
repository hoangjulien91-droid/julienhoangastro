import { PROFILE } from '@/lib/data/profile'

/**
 * S-TIER: JSON-LD Structured Data for Knowledge Graph
 *
 * Comprehensive Person schema with worksFor, alumniOf, author relationships.
 * Designed to trigger Google Knowledge Graph and link authority to Ikerketa.
 */

interface PersonSchema {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  url: string
  image: string
  jobTitle: string
  description: string
  email: string
  worksFor: {
    '@type': 'Organization'
    name: string
    url: string
    sameAs: string[]
  }
  alumniOf: Array<{
    '@type': 'CollegeOrUniversity'
    name: string
  }>
  author: {
    '@type': 'Book'
    name: string
    url: string
  }
  knowsAbout: string[]
  homeLocation: {
    '@type': 'Place'
    name: string
  }
  sameAs: string[]
}

export function JsonLd() {
  const personSchema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.identity.name,
    url: PROFILE.seo.url,
    image: `${PROFILE.seo.url}/images/julien-hoang-detective-prive.webp`,
    jobTitle: PROFILE.identity.title,
    description: PROFILE.seo.description,
    email: `mailto:${PROFILE.identity.email}`,
    worksFor: {
      '@type': 'Organization',
      name: 'Ikerketa Investigations',
      url: 'https://ikerketa.fr',
      sameAs: ['https://www.linkedin.com/company/ikerketa'],
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Université Paris-Panthéon-Assas',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Université Paris-Saclay',
      },
    ],
    author: {
      '@type': 'Book',
      name: 'Victimologie & Emprise',
      url: 'https://ikerketa.fr/livre-aide-victimes',
    },
    knowsAbout: [
      'OSINT',
      'Criminal Law',
      'Victimology',
      'Cyber Security',
      'Private Investigations',
    ],
    homeLocation: {
      '@type': 'Place',
      name: 'Biarritz, France',
    },
    sameAs: [
      'https://www.linkedin.com/in/julienhoang',
      'https://twitter.com/julienhoang',
      'https://ikerketa.fr',
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}
