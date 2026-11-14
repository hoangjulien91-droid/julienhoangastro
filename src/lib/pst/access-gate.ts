/**
 * Configuration et logique de contrôle d'accès pour l'espace /pst.
 *
 * Pour modifier le mot de passe :
 * 1. Définissez la variable d'environnement `PUBLIC_PST_ACCESS_HASH` (SHA-256 hex)
 *    OU remplacez `DEFAULT_PST_ACCESS_HASH` ci-dessous par le SHA-256 de votre nouveau code :
 *    `python3 -c "import hashlib; print(hashlib.sha256(b'MON-CODE').hexdigest())"`
 *
 * Code d'accès par défaut actuel : CNAM-PST-2026
 */

const DEFAULT_PST_ACCESS_HASH =
  "fdede91cf68475c4894df86865241c4304916ec5849b0a730f92695ef6908ae6";

export const PST_ACCESS_HASH =
  (import.meta.env.PUBLIC_PST_ACCESS_HASH as string | undefined)?.trim() ||
  DEFAULT_PST_ACCESS_HASH;

const STORAGE_KEY = "pst_access_grant_v1";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

interface AccessGrant {
  token: string;
  exp: number;
}

/**
 * Calcule le hash SHA-256 (hex) d'une chaîne via Web Crypto API,
 * avec repli pur JS si crypto.subtle est indisponible (contexte non-HTTPS).
 */
export async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return sha256Fallback(input);
}

/**
 * Repli SHA-256 pur TypeScript pour environnements HTTP locaux sans crypto.subtle.
 */
function sha256Fallback(ascii: string): string {
  const rightRotate = (value: number, amount: number) =>
    (value >>> amount) | (value << (32 - amount));

  const maxWord = Math.pow(2, 32);
  let result = "";
  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  const hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;

  const isComposite: Record<number, boolean> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) {
        isComposite[i] = true;
      }
      hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  let padded = ascii + "\x80";
  while ((padded.length % 64) - 56) padded += "\x00";
  for (let i = 0; i < padded.length; i++) {
    const j = padded.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);

    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const a = hash[0];
      const e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash.unshift((temp1 + temp2) | 0);
      hash.pop();
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
}

/**
 * Vérifie si le code saisi correspond au hash autorisé.
 */
export async function verifyPstPassword(password: string): Promise<boolean> {
  const normalized = password.trim();
  if (!normalized) return false;
  const hash = await sha256Hex(normalized);
  return hash === PST_ACCESS_HASH;
}

/**
 * Vérifie si une session valide est déjà enregistrée dans le navigateur.
 */
export function hasValidPstSession(): boolean {
  if (typeof window === "undefined") return false;
  const expectedToken = PST_ACCESS_HASH.slice(0, 16);

  for (const storage of [window.sessionStorage, window.localStorage]) {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as AccessGrant;
      if (parsed.token === expectedToken && parsed.exp > Date.now()) {
        return true;
      }
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore les entrées corrompues
    }
  }
  return false;
}

/**
 * Enregistre la session d'accès dans localStorage (30 j) ou sessionStorage.
 */
export function persistPstSession(remember: boolean): void {
  if (typeof window === "undefined") return;
  const grant: AccessGrant = {
    token: PST_ACCESS_HASH.slice(0, 16),
    exp: Date.now() + SESSION_DURATION_MS,
  };
  const payload = JSON.stringify(grant);
  try {
    if (remember) {
      window.localStorage.setItem(STORAGE_KEY, payload);
    } else {
      window.sessionStorage.setItem(STORAGE_KEY, payload);
    }
  } catch {
    // Stockage indisponible (navigation privée stricte)
  }
}

/**
 * Révoque la session d'accès et verrouille immédiatement /pst.
 */
export function clearPstSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
