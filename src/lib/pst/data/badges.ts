/** Registre partagé de tous les badges déverrouillables, tous modules
 * confondus (chaque module n'affiche que les badges présents dans son
 * propre store, mais le libellé est commun). */
export const ALL_BADGE_DESCS: Record<string, string> = {
  thermo_subli_gold: "[SM-2] Maître de la Sublimation (PST120)",
  tribunal_master: "⚖ Justicier Déontologique (PST123)",
  buhler_expert: "[DIAL] Expert Bühler Organon (PST108)",
  sosie_director: "[OUTIL] Metteur en scène Sosie (PST106)",
  audit_digital: "[NUM] Auditeur Numérique S-Tier (PST124)",
  qcm_perfection: "[100%] QCM Sans Faute (100%)",
  qcm_master: "[COG] Maître des Dialogues",
  feynman_master: "[RNCP7] Pédagogue Feynman",
};

export const QUIZ_LABELS: Record<string, string> = {
  qcm: "QCM",
  pieges: "Pièges V/F",
  qui: "Qui a dit quoi",
  distinguer: "Distinguer",
  bonus: "Bonus",
  examen: "Examen blanc",
};
