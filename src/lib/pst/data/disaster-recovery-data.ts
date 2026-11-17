export const KEY_DESCRIPTIONS: Record<string, string> = {
  pst106_v1:
    "Atelier PST106 · Clinique de l'activité et psychologie du travail",
  pst108_atelier_v10:
    "Atelier PST108 · Psychologie du langage et clinique du dialogue",
  pst120_atelier_v10:
    "Atelier PST120 · Psychodynamique et psychopathologie du travail",
  pst123_atelier_v10: "Atelier PST123 · Le psychologue, le travail et l'emploi",
  pst124_atelier_v10:
    "Atelier PST124 · Transformations digitales et clinique des usages",
  cnam_pst_curriculum_progress_v1:
    "Pyramide Cursus RNCP 7 (Validation 120 ECTS)",
  pst_kanban_pipeline_v1: "Tableau Kanban des UE & Livrables RNCP 7",
  pst_academic_todos_v1:
    "Pilotage des Livrables & Objectifs Académiques (Liste d'actions)",
  pst_memoire_studio_v1: "Studio Mémoire RNCP 7 & Verrou Pré-Soutenance",
  pst_oral_defense_v1:
    "Simulateur de Soutenance Orale & Controverses Grand Jury",
  pst_field_journal_v1:
    "Carnet d'Observation Terrain & Chronique d'Activité Horodatée",
  pst_bibliography_vault_v1: "Coffre Bibliographique Personnel APA 7",
  pst_planning_attendance_v1:
    "Pointage d'Assiduité & Notes de Séances du Planning CNAM",
  pst_lexique_bookmarks_v1: "Favoris & Concepts à consolider du Lexique PST",
  pst_planning_filters_v2: "Préférences du Planning & Frise Chronologique",
  pst_focus_timer_v1: "Minuteur de Concentration en Temps Réel",
  pst_layout_mode_v1:
    "Mode d'affichage des Ateliers (Confort / Large / Double Écran)",
  pst_scratch_pst106: "Calepin Double Écran PST106",
  pst_scratch_pst108: "Calepin Double Écran PST108",
  pst_scratch_pst120: "Calepin Double Écran PST120",
  pst_scratch_pst123: "Calepin Double Écran PST123",
  pst_scratch_pst124: "Calepin Double Écran PST124",
  pst_audio_muted: "Préférence Audio Procédural (Web Audio API)",
  pst_theme: "Thème d'affichage (Clair / Nuit Profonde OLED)",
  pst_last_backup: "Horodatage de la dernière sauvegarde consolidée",
};

export const TRACKED_KEYS = Object.keys(KEY_DESCRIPTIONS);

export const JSON_KEYS = new Set([
  "pst106_v1",
  "pst108_atelier_v10",
  "pst120_atelier_v10",
  "pst123_atelier_v10",
  "pst124_atelier_v10",
  "cnam_pst_curriculum_progress_v1",
  "pst_kanban_pipeline_v1",
  "pst_academic_todos_v1",
  "pst_memoire_studio_v1",
  "pst_oral_defense_v1",
  "pst_field_journal_v1",
  "pst_bibliography_vault_v1",
  "pst_planning_attendance_v1",
  "pst_lexique_bookmarks_v1",
  "pst_planning_filters_v2",
  "pst_focus_timer_v1",
]);

export interface StorageItemSummary {
  key: string;
  label: string;
  exists: boolean;
  bytes: number;
  validJson: boolean;
}
