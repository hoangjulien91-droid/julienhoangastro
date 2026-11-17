import type { FicheItem } from "@/lib/pst/types";
import {
  CAPSULES_FEYNMAN,
  type CapsuleFeynman,
} from "@/lib/pst/data/capsules-feynman";

export const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

export function findCapsuleForFiche(f: FicheItem): CapsuleFeynman {
  const titleLow = f.t.toLowerCase();
  const found = CAPSULES_FEYNMAN.find((c) => {
    const cLow = c.titre.toLowerCase();
    const auteurPart = c.auteur.toLowerCase().split(" ")[0] || "";
    return (
      titleLow.includes(cLow) ||
      (c.motsObligatoires &&
        c.motsObligatoires.some((m) => titleLow.includes(m.toLowerCase()))) ||
      (auteurPart.length > 3 && titleLow.includes(auteurPart))
    );
  });

  if (found) return found;

  const cleanEss = f.ess.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const firstSentence = cleanEss.split(". ")[0] || f.ph;
  let authorDisplay = f.a || "Auteur";
  if (authorDisplay === "linguistique")
    authorDisplay = "Sciences du langage & Ergonomie";
  else if (authorDisplay === "vygotski_piaget")
    authorDisplay = "Lev Vygotski & Jean Piaget";
  else if (authorDisplay === "bourdieu") authorDisplay = "Pierre Bourdieu";
  else if (authorDisplay === "habermas") authorDisplay = "Jürgen Habermas";
  else if (authorDisplay === "honneth") authorDisplay = "Axel Honneth";
  else if (authorDisplay === "valls_iod")
    authorDisplay = "Francis Valls & Denis Castra";
  else
    authorDisplay =
      authorDisplay.charAt(0).toUpperCase() + authorDisplay.slice(1);

  return {
    id: `dyn-${f.t}`,
    moduleKey: "pst108",
    titre: f.t,
    auteur: authorDisplay,
    intuitionMetaphore: firstSentence,
    formuleMatrice: f.ph,
    casReelApplication: f.ex,
    piegeExamen: f.trap,
    citationCle: `« ${f.ph} »`,
    motsObligatoires: [f.t.split(":")[0]?.trim() || f.t],
  };
}

export function findSchemaForFiche(f: FicheItem): string | null {
  const hay = (f.a + " " + f.t + " " + f.ess + " " + f.ph).toLowerCase();
  if (
    hay.includes("leplat") ||
    hay.includes("jean-marie hoc") ||
    (hay.includes("tâche") && hay.includes("régulation"))
  )
    return "schema-leplat-regulation";
  if (
    hay.includes("clot") ||
    hay.includes("genre professionnel") ||
    hay.includes("réel de l'activité") ||
    hay.includes("clinique de l'activité")
  )
    return "schema-clot-activite-reelle";
  if (
    hay.includes("dejours") ||
    hay.includes("jugement d'utilité") ||
    hay.includes("jugement de beauté") ||
    hay.includes("psychodynamique") ||
    hay.includes("sublimation")
  )
    return "schema-dejours-reconnaissance";
  if (
    hay.includes("bourdieu") ||
    hay.includes("habitus") ||
    hay.includes("capital symbolique") ||
    hay.includes("sens pratique") ||
    hay.includes("illusio")
  )
    return "schema-bourdieu-algorithme";
  if (
    hay.includes("habermas") ||
    hay.includes("agir communicationnel") ||
    hay.includes("prétention à la validité") ||
    hay.includes("monde vécu")
  )
    return "schema-habermas-validite";
  if (
    hay.includes("honneth") ||
    hay.includes("sphères de la reconnaissance") ||
    (hay.includes("estime de soi") && hay.includes("solidarité"))
  )
    return "schema-honneth-spheres";
  if (
    hay.includes("iod") ||
    hay.includes("valls") ||
    hay.includes("castra") ||
    hay.includes("entonnoir")
  )
    return "schema-valls-iod";
  if (
    hay.includes("dubar") ||
    hay.includes("double transaction") ||
    hay.includes("transaction biographique")
  )
    return "schema-dubar-double-transaction";
  if (
    hay.includes("sainsaulieu") ||
    hay.includes("modèle fusionnel") ||
    hay.includes("modèle négociateur") ||
    hay.includes("cultures d'entreprise")
  )
    return "schema-sainsaulieu-matrice";
  if (
    hay.includes("castel") ||
    hay.includes("désaffiliation") ||
    hay.includes("zone de vulnérabilité")
  )
    return "schema-castel-desaffiliation";
  return null;
}

export function exportFicheEntryToJournal(
  f: FicheItem,
  noteVal: string,
  ueCode: string,
): void {
  const cleanEss = f.ess.replace(/<[^>]*>/g, "");
  const entry = {
    id: `fiche-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    context: `Fiche de synthèse — ${f.t}`,
    ue: ueCode,
    observation: `${cleanEss}\nFormule clé : « ${f.ph} »`,
    concept: f.t,
    posture: noteVal || `Exemple : ${f.ex} | Piège : ${f.trap}`,
  };

  const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const next = Array.isArray(list) ? [entry, ...list] : [entry];
  window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("pst:storage-updated"));
}
