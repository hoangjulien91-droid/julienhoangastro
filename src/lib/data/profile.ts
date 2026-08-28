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
    title: 'Détective Privé & Auteur',
    tagline: 'Investigation. Expertise. Écriture.',
    bio: 'Détective privé agréé CNAPS, spécialisé dans les enquêtes complexes. Auteur et expert en victimologie, je mets mon expertise au service de la vérité.',
    location: 'France',
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
        "Investigations de terrain, surveillances, filatures et recherches de preuves (affaires familiales, civiles, fraudes et litiges commerciaux). Pays Basque & National.",
      url: 'https://ikerketa.fr',
      type: 'agency' as const,
      icon: 'compass',
      tags: ['Filatures & Surveillances', 'Enquêtes Civiles & Commerciales', 'Agrément CNAPS', 'Recherche de Preuves'],
    },
    {
      id: 'detective-conseil',
      title: 'Détective Conseil',
      subtitle: 'Cabinet de Victimologie & Stratégie de Preuve',
      description:
        "Analyse stratégique de dossiers, accompagnement des victimes d'emprise et constitution de preuves recevables en justice. Consultation 100% à distance.",
      url: 'https://detective-conseil.fr',
      type: 'consulting' as const,
      icon: 'scale',
      tags: ['Victimologie', 'Emprise Psychologique', 'Stratégie Judiciaire', 'Consultation Visio'],
      size: 'col-span-2',
    },
    {
      id: 'book',
      title: 'Victimologie & Emprise',
      subtitle: "Comprendre les mécanismes de l'emprise",
      description:
        "Ouvrage de référence sur les dynamiques victimologiques et les processus d'emprise psychologique.",
      url: 'https://www.amazon.fr/dp/XXXXXXXXXX',
      type: 'book' as const,
      icon: 'book',
      tags: ['Livre', 'Psychologie', 'Emprise'],
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
    'Enquêtes Privées',
    'Recherche de Personnes',
    'Victimologie',
    'Droit Pénal',
    'Analyse Comportementale',
    'OSINT',
  ],

  seo: {
    title: {
      default: 'Julien Hoang | Détective Privé, Expert Victimologie & OSINT',
      template: '%s | Julien Hoang',
    },
    description:
      'Julien Hoang - Détective privé agréé CNAPS, auteur de "Victimologie & Emprise" et expert en stratégie de preuve. Basé entre Paris et Biarritz.',
    keywords: [
      'Détective Privé',
      'Enquêtes Privées',
      'Victimologie',
      'Emprise psychologique',
      'OSINT',
      'Stratégie de preuve',
      'Julien Hoang',
      'Ikerketa',
      'Biarritz',
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
