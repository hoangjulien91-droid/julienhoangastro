/**
 * S-TIER: Single Source of Truth (SSOT)
 *
 * All profile data for julienhoang.com
 * This is the ONLY place where content should be edited.
 */

// import 'server-only' // Removed for Astro migration

export const PROFILE = {
  identity: {
    name: 'Julien Hoang',
    title: 'Détective Privé & Stratégie de Preuve',
    tagline: 'Investigation. Stratégie. Recherche de Preuves.',
    bio: 'Détective privé agréé CNAPS, expert en stratégie de preuve et investigations complexes au Pays Basque et au niveau national.',
    location: 'Pays Basque & National',
    email: 'contact@julienhoang.com',
  },

  credentials: [
    {
      title: 'Master 2 Politiques de prévention et de sécurité',
      institution: 'Université Paris-Saclay',
      type: 'education' as const,
    },
    {
      title: "Licence Directeur d'Enquêtes Privées",
      institution: 'Université Panthéon-Assas (Paris II)',
      type: 'education' as const,
    },
    {
      title: 'Agrément CNAPS',
      institution: 'Conseil National des Activités Privées de Sécurité',
      type: 'certification' as const,
    },
  ],

  projects: [
    {
      id: 'ikerketa',
      title: 'Ikerketa',
      subtitle: 'Agence de Détective Privé Agréée CNAPS',
      description:
        "Cabinet d'investigations privées et de terrain au Pays Basque et partout en France : surveillances, filatures, affaires familiales, litiges commerciaux et recherches de preuves recevables en justice.",
      url: 'https://ikerketa.fr',
      type: 'agency' as const,
      icon: 'compass',
      tags: ['Investigations Terrain', 'Filatures & Surveillances', 'Affaires Familiales & Commerciales', 'Agrément CNAPS'],
    },
    {
      id: 'detective-conseil',
      title: 'Détective Conseil',
      subtitle: 'Cabinet de Conseil en Stratégie de Preuve',
      description:
        "Audit de situation, conseil stratégique en amont des procédures et constitution de dossiers de preuves avec les avocats. Consultation 100% à distance.",
      url: 'https://detective-conseil.fr',
      type: 'consulting' as const,
      icon: 'scale',
      tags: ['Stratégie de Preuve', 'Audit de Dossier', 'Accompagnement Juridique', 'Consultation Visio'],
    },
  ],

  socials: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/julienhoang',
      icon: 'linkedin' as const,
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/julienhoang',
      icon: 'twitter' as const,
    },
  ],

  skills: [
    'Enquêtes Privées & Terrain',
    'Stratégie de Preuve',
    'Recherche de Personnes',
    'Droit Pénal & Procédure',
    'Audit & Analyse de Dossiers',
    'OSINT',
  ],

  seo: {
    title: {
      default: 'Julien Hoang | Détective Privé & Stratégie de Preuve - Pays Basque',
      template: '%s | Julien Hoang',
    },
    description:
      'Julien Hoang - Détective privé agréé CNAPS. Expert en stratégie de preuve et investigations privées au Pays Basque et au niveau national (Ikerketa & Détective Conseil).',
    keywords: [
      'Détective Privé',
      'Enquêtes Privées',
      'Stratégie de preuve',
      'Détective Privé Pays Basque',
      'Détective Privé Biarritz',
      'OSINT',
      'Julien Hoang',
      'Ikerketa',
      'Détective Conseil',
    ],
    url: 'https://julienhoang.com',
    og: {
      siteName: 'Julien Hoang',
      locale: 'fr_FR',
      alternateLocale: ['en_US'],
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      creator: '@julienhoang',
    },
    robots: {
      index: true,
      follow: true,
    },
  },
} as const

export type Profile = typeof PROFILE
export type Credential = Profile['credentials'][number]
export type Project = Profile['projects'][number]
export type Social = Profile['socials'][number]
