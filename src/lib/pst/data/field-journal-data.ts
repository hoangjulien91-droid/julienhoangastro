export type FieldObservationCategory =
  | "observable_ergo"
  | "verbatim_operateur"
  | "catachrese_outil"
  | "dilemme_metier"
  | "note_reflexive";

export interface FieldJournalEntry {
  id: string;
  timestamp: string;
  ue: string;
  category: FieldObservationCategory;
  operatorCode: string;
  content: string;
}

export const CATEGORY_META: Record<
  FieldObservationCategory,
  { label: string; badgeClass: string }
> = {
  observable_ergo: {
    label: "Observable Ergonomique (Activité réelle)",
    badgeClass:
      "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  },
  verbatim_operateur: {
    label: "Verbatim Opérateur (Anonymisé)",
    badgeClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  catachrese_outil: {
    label: "Catachrèse / Détournement d'Outil",
    badgeClass:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  dilemme_metier: {
    label: "Controverse / Dilemme de Métier",
    badgeClass:
      "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  note_reflexive: {
    label: "Note Réflexive & Déontologique",
    badgeClass:
      "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
};

export const DEFAULT_ENTRIES: FieldJournalEntry[] = [
  {
    id: "fj-1",
    timestamp: "09:14:20",
    ue: "PST106",
    category: "observable_ergo",
    operatorCode: "OP-01 (Ancienneté 12 ans)",
    content:
      "Lors de la relève du matin, l'opérateur interrompt 4 fois la saisie sur le terminal mobile pour répondre aux sollicitations urgentes d'un binôme novice. Écart manifeste entre le temps prescrit de contrôle (3 min) et la co-activité réelle de régulation (9 min).",
  },
  {
    id: "fj-2",
    timestamp: "09:42:10",
    ue: "PST120",
    category: "verbatim_operateur",
    operatorCode: "OP-01 & OP-03 (Autoconfrontation croisée)",
    content:
      "« Si je suis la procédure écran à la lettre, je bloque toute la chaîne derrière moi. Du coup on s'appelle directement à la voix, mais ça n'apparaît nulle part dans les statistiques de la direction. »",
  },
  {
    id: "fj-3",
    timestamp: "10:15:05",
    ue: "PST124",
    category: "catachrese_outil",
    operatorCode: "OP-02 (Planificateur)",
    content:
      "Détournement d'usage (catachrèse au sens de Rabardel, 1995) : utilisation du champ 'Commentaire libre livraison' de l'ERP pour coder entre collègues l'état réel de fatigue ou d'encombrement du poste aval.",
  },
];

export const STORAGE_KEY = "pst_field_journal_v1";
