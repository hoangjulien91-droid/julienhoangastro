import type { CaseItem } from "@/lib/pst/types";

export interface CaseAnswers {
  q1: number | null;
  q2: number | null;
}

export const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";
export const METHODE_NOTES_KEY = "pst_cas_methode_notes_v1";
export const METHODE_CRITERIA_KEY = "pst_cas_methode_criteria_v1";

export interface MethodeStepNotes {
  temps1: string;
  temps2: string;
  temps3: string;
}

export interface MethodeCriterion {
  step: string;
  label: string;
  pts: string;
}

export const METHODE_CRITERIA: MethodeCriterion[] = [
  {
    step: "Temps 1 (6 pts)",
    label: "Identification explicite de l'écart travail prescrit vs travail réel (Wisner, Leplat)",
    pts: "1.5 pt",
  },
  {
    step: "Temps 1 (6 pts)",
    label: "Recueil objectif des manifestations physiques, somatiques ou relationnelles sans jugement de valeur",
    pts: "1.5 pt",
  },
  {
    step: "Temps 1 (6 pts)",
    label: "Repérage des contraintes matérielles, temporelles et logicielles pesant sur l'opérateur",
    pts: "1.5 pt",
  },
  {
    step: "Temps 1 (6 pts)",
    label: "Cartographie des asymétries de pouvoir et des marges de manœuvre réelles",
    pts: "1.5 pt",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Refus catégorique du psychologisme (zéro incrimination individuelle ou 'faiblesse')",
    pts: "2 pts",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Mobilisation précise d'au moins 2 auteurs majeurs du cours avec leurs concepts opératoires",
    pts: "2 pts",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Démonstration du mécanisme : comment l'organisation prescrite génère directement la tension",
    pts: "2 pts",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Prise en compte de la dimension collective (présence ou destruction des collectifs/défenses)",
    pts: "2 pts",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Refus motivé de la posture RH d'expertise punitive ou de sélection individuelle",
    pts: "1.5 pt",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Réouverture d'un espace de controverse et de délibération collective sur le travail bien fait",
    pts: "1.5 pt",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Respect strict du secret professionnel (Art. 226-13 CP) et de l'autonomie technique (Code 2021)",
    pts: "1.5 pt",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Formulation de préconisations d'aménagement organisationnel capacitantes et durables",
    pts: "1.5 pt",
  },
];

export function exportCaseToJournalHelper(c: CaseItem, idx: number, ue: string = "PST"): boolean {
  try {
    const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const ok1 = c.q1.options.find((o) => o.ok);
    const ok2 = c.q2.options.find((o) => o.ok);
    const entry = {
      id: `cas-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      context: `Vignette clinique #${idx + 1}`,
      ue,
      observation: c.vignette,
      concept: ok1 ? ok1.label : c.q1.prompt,
      posture: ok2 ? `${ok2.label} — ${ok2.fb}` : c.q2.prompt,
    };
    const next = Array.isArray(list) ? [entry, ...list] : [entry];
    window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("pst:storage-updated"));
    return true;
  } catch {
    return false;
  }
}
