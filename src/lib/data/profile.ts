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
    title: 'Détective privé agréé CNAPS · Stratégie de la preuve · Auteur',
    tagline: 'Recherche. Sécurisation. Exploitation de la preuve.',
    bio: 'J’accompagne particuliers, entreprises et professionnels du droit dans la recherche, la sécurisation et l’exploitation de faits utiles à une procédure.',
    location: 'Pays Basque & National',
    email: 'contact@julienhoang.com',
  },

  framework: [
    {
      title: 'Secret professionnel',
      description: 'Confidentialité et respect strict du cadre déontologique.',
    },
    {
      title: 'Indépendance & Discrétion',
      description: 'Méthodologie rigoureuse et neutralité probatoire.',
    },
    {
      title: 'Cadre légal & proportionné',
      description: 'Rapports établis dans le respect du cadre légal et de la proportionnalité.',
    },
    {
      title: 'Intervention France / Espagne',
      description: 'Rayonnement transfrontalier et national selon mission.',
    },
  ],

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
      subtitle: 'Agence d’investigations & Enquêtes de terrain',
      description:
        "Agence agréée CNAPS ancrée au Pays Basque et dans les Landes. Surveillances, filatures, affaires familiales et contentieux d'affaires.",
      url: 'https://ikerketa.fr',
      type: 'agency' as const,
      icon: 'compass',
      tags: ['Enquêtes Terrain', 'Surveillances & Filatures', 'Pays Basque & Landes', 'Agrément CNAPS'],
    },
    {
      id: 'detective-conseil',
      title: 'Détective Conseil',
      subtitle: 'Conseil national à distance & Stratégie probatoire',
      description:
        "Cabinet de conseil pour justiciables et avocats. Audit de situation, cadrage des faits et structuration du dossier avant ou pendant la procédure.",
      url: 'https://detective-conseil.fr',
      type: 'consulting' as const,
      icon: 'scale',
      tags: ['Stratégie de la Preuve', 'Audit de Dossier', 'Accompagnement Juridique', 'Consultation Visio'],
    },
    {
      id: 'book',
      title: 'Une preuve peut tout changer',
      subtitle: 'Ouvrage de méthode & stratégie probatoire',
      description:
        "Guide méthodologique pour comprendre comment identifier, préserver et articuler des preuves décisives dans un cadre légal et contradictoire.",
      url: 'https://www.amazon.fr/dp/XXXXXXXXXX',
      type: 'book' as const,
      icon: 'book',
      tags: ['Livre & Publication', 'Méthodologie de Preuve', 'Droit & Pratique'],
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
    'Stratégie de la Preuve',
    'Enquêtes & Surveillances Terrain',
    'Renseignement Commercial & Concurrence',
    'Recherche d’Actifs & Patrimoine',
    'Cyber-Investigation & OSINT',
    'Audit Précontentieux',
  ],

  seo: {
    title: {
      default: 'Julien Hoang | Détective privé agréé CNAPS · Stratégie de la preuve · Auteur',
      template: '%s | Julien Hoang',
    },
    description:
      'Julien Hoang - Détective privé agréé CNAPS et auteur. J’accompagne particuliers, entreprises et professionnels du droit dans la recherche et la sécurisation de la preuve (Ikerketa & Détective Conseil).',
    keywords: [
      'Julien Hoang',
      'Détective Privé',
      'Stratégie de la preuve',
      'Détective Privé Pays Basque',
      'Détective Privé Biarritz',
      'Ikerketa',
      'Détective Conseil',
      'Une preuve peut tout changer',
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
