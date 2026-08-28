export function shuffleArr<T>(a: T[]): T[] {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j] as T;
    arr[j] = temp as T;
  }
  return arr;
}

/** Construit un identifiant stable et court à partir d'un texte de question. */
export function makeQuestionId(prefix: string, text: string): string {
  return prefix + "_" + text.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
}
