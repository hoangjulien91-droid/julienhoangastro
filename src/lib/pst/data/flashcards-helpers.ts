import type { PstStore } from "@/lib/pst/store";
import type { Flashcard } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export interface BuildDeckOptions {
  axis: string;
  onlyKo: boolean;
  dueOnly: boolean;
  dueSet: Set<string>;
  leitnerFilter: number | null;
  search: string;
  leitnerSort: boolean;
  shuffle: boolean;
  hideBonus: boolean;
  onlyFavs: boolean;
}

export function buildDeck(
  cartes: Flashcard[],
  store: PstStore,
  opts: BuildDeckOptions,
): Flashcard[] {
  let deck = cartes.filter((c) => opts.axis === "all" || c.axis === opts.axis);
  if (opts.hideBonus) deck = deck.filter((c) => c.category !== "bonus");
  if (opts.onlyFavs) {
    const marks = store.getMarks();
    deck = deck.filter((c) => !!marks[`fav_${c.id}`]);
  }
  if (opts.onlyKo) deck = deck.filter((c) => store.getBox(c.id) === 1);
  if (opts.dueOnly) deck = deck.filter((c) => opts.dueSet.has(c.id));
  if (opts.leitnerFilter !== null) {
    deck = deck.filter((c) => store.getBox(c.id) === opts.leitnerFilter);
  }
  if (opts.search) {
    const q = opts.search.trim().toLowerCase();
    deck = deck.filter(
      (c) =>
        c.q.toLowerCase().includes(q) ||
        c.a.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q),
    );
  }
  if (opts.leitnerSort) {
    deck = deck.slice().sort((a, b) => store.getBox(a.id) - store.getBox(b.id));
  }
  if (opts.shuffle) deck = shuffleArr(deck);
  return deck;
}

export function findSchemaForCard(
  q: string,
  a: string,
  deep: string = "",
  tag: string = "",
): string | null {
  const hay = (q + " " + a + " " + deep + " " + tag).toLowerCase();
  if (
    hay.includes("leplat") ||
    (hay.includes("tâche") && hay.includes("régulation")) ||
    (hay.includes("tâche") && hay.includes("activité"))
  )
    return "schema-leplat-regulation";
  if (
    hay.includes("clot") ||
    hay.includes("genre professionnel") ||
    hay.includes("réel de l'activité") ||
    hay.includes("travail empêché")
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
    hay.includes("bühler") ||
    hay.includes("buhler") ||
    hay.includes("organon") ||
    (hay.includes("symptôme") && hay.includes("signal"))
  )
    return "schema-buhler-organon";
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

export function exportDeckToAnki(cards: Flashcard[]): void {
  const lines = cards.map((c) => {
    const front = stripHtml(c.q).replace(/\t/g, " ").replace(/\n/g, "<br>");
    let back = stripHtml(c.a).replace(/\t/g, " ").replace(/\n/g, "<br>");
    if (c.deep) {
      back += `<br><br><small><b>Approfondissement :</b> ${stripHtml(c.deep).replace(/\t/g, " ").replace(/\n/g, "<br>")}</small>`;
    }
    const tag = `${c.axis || ""} ${c.tag || ""}`.trim();
    return `${front}\t${back}\t${tag}`;
  });

  const content = lines.join("\n");
  const blob = new Blob([content], {
    type: "text/tab-separated-values;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `flashcards_anki_${cards.length}_cartes.tsv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportDeckToMarkdown(cards: Flashcard[]): void {
  const rows = [
    `# Fiche de Révision Flashcards — CNAM`,
    `*Généré le ${new Date().toLocaleDateString("fr-FR")} — ${cards.length} notions doctrinales*`,
    ``,
    `| Notion / Question | Réponse Doctrinale | Axe / Tag |`,
    `| --- | --- | --- |`,
    ...cards.map((c) => {
      const q = stripHtml(c.q).replace(/\|/g, "\\|").replace(/\n/g, " ");
      let a = stripHtml(c.a).replace(/\|/g, "\\|").replace(/\n/g, " ");
      if (c.deep) {
        a += ` *(Approfondissement : ${stripHtml(c.deep).replace(/\|/g, "\\|").replace(/\n/g, " ")})*`;
      }
      const tag = `${c.axis || ""} ${c.tag || ""}`.trim();
      return `| **${q}** | ${a} | \`${tag}\` |`;
    }),
  ].join("\n");

  const blob = new Blob([rows], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `flashcards_cnam_${cards.length}_notions.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
