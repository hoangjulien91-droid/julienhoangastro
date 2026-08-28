export interface Pont {
  c: string;
  m: Record<string, string>;
}

/**
 * Ponts conceptuels transversaux entre modules PST. Source : dédupliqué à
 * partir de deux copies légèrement divergentes (pst.astro.disabled et
 * StudyTools.astro) — union des concepts des deux, formulations du hub
 * (plus concises), clé invalide `pst120b` de StudyTools repliée dans pst120.
 */
export const PONTS: Pont[] = [
  {
    c: "Christophe Dejours",
    m: {
      pst120: "Souffrance, reconnaissance, sublimation",
      pst106: "Courant voisin de la clinique de l'activité",
      pst108: "Contraste avec la clinique du dialogue",
    },
  },
  {
    c: "Yves Clot · pouvoir d'agir",
    m: {
      pst106: "Genre, style, pouvoir d’agir",
      pst108: "Clinique du dialogue, controverse",
      pst124: "Pouvoir d’agir numérique",
    },
  },
  {
    c: "Lev Vygotski",
    m: {
      pst106: "Instruments psychologiques",
      pst108: "Langage social → pensée",
    },
  },
  {
    c: "Tâche prescrite vs activité réelle",
    m: {
      pst106: "Distinction fondatrice (Wisner)",
      pst108: "Écart prescrit/réel, articulation",
      pst124: "Prescription codée dans le logiciel",
    },
  },
  {
    c: "Reconnaissance",
    m: {
      pst120: "Jugements d’utilité et de beauté",
      pst106: "Spinoza/Ricœur en arrière-plan",
    },
  },
  {
    c: "Canguilhem · santé/normativité",
    m: {
      pst106: "Pouvoir de créer ses normes",
      pst120: "Renormaliser ses contraintes",
    },
  },
  {
    c: "Métis · intelligence rusée",
    m: {
      pst106: "Le style mobilise la Métis",
      pst120: "Comble l’écart prescrit/réel",
    },
  },
  {
    c: "Autoconfrontation",
    m: {
      pst106: "Dispositif clé",
      pst108: "Controverse, répétition sans répétition",
    },
  },
  {
    c: "Déontologie · secret professionnel",
    m: {
      pst123: "Triangulation, consentement",
      pst108: "Cadre de la « matière première »",
      pst120: "Indépendance du clinicien",
    },
  },
  {
    c: "Souffrance éthique",
    m: {
      pst120: "Actes moralement réprouvés",
      pst123: "Demandes de tri/sélection",
    },
  },
  {
    c: "RPS · technostress",
    m: {
      pst123: "Karasek, Siegrist, Maslach",
      pst124: "Infobésité, surveillance",
    },
  },
  {
    c: "Rabardel · genèse instrumentale",
    m: {
      pst124: "Artefact → instrument",
      pst106: "Appropriation des instruments",
    },
  },
  {
    c: "Acte de langage · « dire, c’est faire »",
    m: { pst108: "Austin/Searle : la parole agit" },
  },
  {
    c: "Idéologies défensives",
    m: {
      pst120:
        "Défenses collectives (Dejours) ; racine mécanismes de défense du Moi (Anna Freud)",
    },
  },
  {
    c: "Bobillier Chaumon · acceptation située",
    m: { pst124: "De l'acceptabilité a priori à l'acceptation située" },
  },
  {
    c: "Genre & style professionnels",
    m: { pst106: "Architecture du métier (transpersonnel / personnel)" },
  },
];

export const MODULE_LABELS: Record<string, string> = {
  pst106: "Clinique de l'activité",
  pst108: "Langage & dialogue",
  pst120: "Psychodynamique",
  pst123: "Déontologie & RPS",
  pst124: "Transformations digitales",
};
