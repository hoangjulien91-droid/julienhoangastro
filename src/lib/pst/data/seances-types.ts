/**
 * Journal des Séances & Cours Retranscrits (PST106, PST108, PST123)
 * Intégration dans le code des cours réels enregistrés et retranscrits
 * (Webconférences, synthèses de cours, transcriptions intégrales verbatim, consignes orales des professeurs).
 *
 * ⚠️ RÈGLE OBLIGATOIRE DU PROJET (cf. AGENTS.md / GEMINI.md) :
 * Toute nouvelle séance ajoutée à SEANCES_COURS_DATA DOIT IMPÉRATIVEMENT
 * posséder sa "Fiche L'Essentiel du Cours" dans src/lib/pst/data/essentiel-cours.ts (ESSENTIEL_COURS_DATA)
 * avec id: "${moduleKey}-s${numeroSeance}", fil conducteur, ceQuIlFautSavoir, ceQuIlFautRetenir,
 * auteursCles, conceptsCles et piegeExamen.
 */

export interface SeancePointCle {
  titre: string;
  contenu: string;
  auteurs?: string[];
  conceptsCles?: string[];
}

export interface SeanceSectionSynthese {
  numero: string;
  titre: string;
  points: SeancePointCle[];
}

export interface SeanceTableauComparatif {
  titre: string;
  description?: string;
  colonnes: string[];
  lignes: {
    axe: string;
    valeurs: string[];
  }[];
}

export interface SeanceRectificationExamen {
  titre: string;
  erreurCourante: string;
  rectificationAttendue: string;
  contexte: string;
}

export interface SeanceConsigneProf {
  titre: string;
  typeTravail: "recherche" | "lecture" | "exercice_ad" | "memoire";
  consigneExacte: string;
  echeance: string;
  modaliteRendu: string;
  recommandationsProf: string;
  lienAdId?: string;
}

export interface SeanceModalitesExamen {
  session1Date: string;
  session2Date: string;
  duree: string;
  format: string;
  optionsAuChoix: string[];
  recommandationsNotation: string;
}

export interface SeanceCoursItem {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  moduleLabel: string;
  numeroSeance: number;
  titre: string;
  sousTitre: string;
  enseignant: string;
  dateSeance: string;
  format: "webconference" | "presentiel";
  dureeEnregistrement?: string;
  resumeExecutif: string[];
  modalitesExamen?: SeanceModalitesExamen;
  consignesOralesProf: SeanceConsigneProf[];
  syntheseSections: SeanceSectionSynthese[];
  tableauxComparatifs?: SeanceTableauComparatif[];
  rectificationsExamen?: SeanceRectificationExamen[];
  transcriptionIntegraleVerbatim: string;
  bibliographieCitee: {
    titre: string;
    auteur: string;
    annee?: string;
    remarque: string;
    url?: string;
  }[];
}
