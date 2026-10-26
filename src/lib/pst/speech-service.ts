/**
 * Service vocal haute fidélité pour les révisions CNAM PST (Speech Synthesis).
 * Sélectionne automatiquement la voix française la plus naturelle et intelligible
 * (priorise les voix Enhanced, Premium, Neural et Google sur les synthétiseurs compacts des années 90),
 * et optimise la prosodie ainsi que la prononciation des acronymes (IOD, RNCP, CNAM, etc.).
 */

const PREFERRED_VOICE_KEY = "pst_preferred_voice_name";

/** Nettoie et prépare le texte pédagogique pour une synthèse fluide et sans télescopage. */
export function prepareTextForSpeech(
  rawText: string,
  options?: { author?: string; title?: string },
): string {
  if (!rawText) return "";

  let cleaned = rawText
    // Balises de fin de titres ou paragraphes -> pause marquée avec un point
    .replace(/<\/(h[1-6]|p|div|li|blockquote)>/gi, ". ")
    .replace(/<br\s*\/?>/gi, ", ")
    // Suppression des balises HTML restantes
    .replace(/<[^>]*>/g, " ")
    // Nettoyage des entités HTML
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, " et ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // Remplacement des auteurs techniques par des noms intelligibles
  if (options?.author) {
    const aLow = options.author.toLowerCase();
    if (aLow === "linguistique") {
      cleaned = cleaned.replace(/par linguistique\b/gi, "par les sciences du langage");
    } else if (aLow === "vygotski_piaget") {
      cleaned = cleaned.replace(/par vygotski_piaget\b/gi, "par Lev Vygotski et Jean Piaget");
    }
  }

  // Phonétique et articulation des acronymes et termes académiques français
  cleaned = cleaned
    .replace(/\bZPD\b/g, "Zone proximale de développement, Z.P.D.")
    .replace(/\bIOD\b/g, "Méthode I.O.D.")
    .replace(/\bCNAM\b/g, "Cnam")
    .replace(/\bRNCP\b/g, "R.N.C.P.")
    .replace(/\bVAE\b/g, "V.A.E.")
    .replace(/\bRPS\b/g, "Risques psychosociaux, R.P.S.")
    .replace(/\bQCM\b/g, "Q.C.M.")
    .replace(/\bUE\b/g, "U.E.")
    .replace(/\b18\/20\b/g, "dix-huit sur vingt")
    .replace(/\bvs\.?\b/gi, ", opposé à ,")
    .replace(/\bex\.(\s+)/gi, "par exemple,$1")
    .replace(/\betc\.(\s*)/gi, ", et ainsi de suite.$1")
    .replace(/\bPr\.\s*/g, "Professeur ")
    .replace(/\bDr\.\s*/g, "Docteur ")
    .replace(/\bMme\s*/g, "Madame ")
    .replace(/\bM\.\s*/g, "Monsieur ")
    .replace(/\bPST108\b/gi, "P.S.T. 108")
    .replace(/\bPST106\b/gi, "P.S.T. 106")
    .replace(/\bPST120\b/gi, "P.S.T. 120")
    .replace(/\bPST123\b/gi, "P.S.T. 123")
    .replace(/\bPST124\b/gi, "P.S.T. 124")
    // Puces et tirets transformés en pauses oratoires
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, ", ")
    .replace(/\s*•\s*/g, ". ")
    .replace(/\s*:\s*/g, " : ")
    // Évite les télescopages de ponctuation
    .replace(/\s*([,.;:!?])\s*/g, "$1 ")
    .replace(/\.{2,}/g, ".")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
}

/** Calcule un score de qualité naturelle pour ordonner les voix de synthèse. */
function scoreVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;

  // 1. Voix ultra-haute fidélité Siri & Neurales Apple / Microsoft / Google
  if (name.includes("siri")) {
    score += 150;
  }
  if (
    name.includes("enhanced") ||
    name.includes("améliorée") ||
    name.includes("ameliorée") ||
    name.includes("premium") ||
    name.includes("neural")
  ) {
    score += 120;
  }
  if (name.includes("natural") || name.includes("online")) {
    score += 90;
  }

  // 2. Voix modernes bien modulées (comédiens)
  if (
    name.includes("thomas") ||
    name.includes("audrey") ||
    name.includes("amélie") ||
    name.includes("amelie") ||
    name.includes("aurelie") ||
    name.includes("aurélie") ||
    name.includes("google français") ||
    name.includes("denise") ||
    name.includes("henri") ||
    name.includes("hortense") ||
    name.includes("julie") ||
    name.includes("nicolas")
  ) {
    score += 50;
  }

  // 3. Forte pénalité pour les voix compactes ou obsolètes (synthétiseurs robotiques 16kHz)
  if (
    name.includes("compact") ||
    name.includes("mobile") ||
    name.includes("eloquence") ||
    name.includes("espeak")
  ) {
    score -= 100;
  }

  // Voix locale (plus stable)
  if (voice.localService) {
    score += 10;
  }

  return score;
}

/** Récupère la liste ordonnée des voix françaises disponibles (neutralisé : 0 synthèse vocale). */
export function getAvailableFrenchVoices(): SpeechSynthesisVoice[] {
  return [];
}

/** Récupère la meilleure voix française (neutralisé). */
export function getPreferredFrenchVoice(): SpeechSynthesisVoice | null {
  return null;
}

/** Enregistre le choix de voix de l'utilisateur (no-op). */
export function savePreferredFrenchVoice(_voiceName: string): void {
  // no-op
}

/** Neutralisé : annule immédiatement toute synthèse vocale résiduelle et renvoie null. */
export function createSpeechUtterance(): null {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  return null;
}
