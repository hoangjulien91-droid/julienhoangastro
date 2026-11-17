const DIACRITICS_RANGE = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  "g",
);

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_RANGE, "")
    .replace(/[^a-z0-9]/g, " ");
}

export function stemFrenchToken(token: string): string {
  if (token.length <= 4) return token;
  return token.replace(
    /(ements?|ations?|istes?|ismes?|tions?|sions?|ables?|ibles?|ences?|ances?|eurs?|euses?|aux|ies|es|ent|er|ir|s|x|e)$/,
    "",
  );
}

export function matchesKeyword(normalizedText: string, keyword: string): boolean {
  const normKw = normalize(keyword).trim();
  if (!normKw) return false;
  if (normalizedText.includes(normKw)) return true;

  const textWords = normalizedText.split(/\s+/).filter(Boolean);
  const textStems = textWords.map(stemFrenchToken);
  const kwTokens = normKw.split(/\s+/).filter((t) => t.length >= 3);
  if (kwTokens.length === 0) return false;

  return kwTokens.every((kt) => {
    const kStem = stemFrenchToken(kt);
    return textWords.some(
      (w, idx) =>
        w === kt ||
        (kStem.length >= 4 &&
          (textStems[idx]?.startsWith(kStem) || kStem.startsWith(textStems[idx] ?? ""))),
    );
  });
}

export interface EvalResult {
  score: number;
  found: string[];
  missing: string[];
}

export function evaluateFeynmanKeywords(text: string, keywords: string[]): EvalResult {
  const normalizedText = normalize(text);
  const found: string[] = [];
  const missing: string[] = [];

  keywords.forEach((keyword) => {
    if (matchesKeyword(normalizedText, keyword)) found.push(keyword);
    else missing.push(keyword);
  });

  const score = keywords.length > 0 ? Math.round((found.length / keywords.length) * 100) : 0;
  return { score, found, missing };
}
