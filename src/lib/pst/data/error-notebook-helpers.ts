import type { WrongAnswer } from "@/lib/pst/store";

export const TYPE_LABELS: Record<string, string> = {
  qcm: "QCM",
  pieges: "Piège V/F",
  qui: "Citation",
};

export function exportErrorsToAnki(targetErrors: WrongAnswer[]): void {
  const lines = targetErrors.map((err) => {
    const front =
      `« ${err.question} » (Erreur passée: ${err.userSelection || "Non spécifiée"})`
        .replace(/\t/g, " ")
        .replace(/\n/g, "<br>");
    const back =
      `<b>Réponse correcte :</b> ${err.correctAnswer}<br><br><b>Explication doctrinale :</b> ${err.explanation}`
        .replace(/\t/g, " ")
        .replace(/\n/g, "<br>");
    const tag = `CarnetErreurs ${TYPE_LABELS[err.type] || err.type}`;
    return `${front}\t${back}\t${tag}`;
  });

  const content = lines.join("\n");
  const blob = new Blob([content], {
    type: "text/tab-separated-values;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `erreurs_anki_${targetErrors.length}_questions.tsv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportErrorsToMarkdown(targetErrors: WrongAnswer[]): void {
  const doc = [
    `# Carnet d'Erreurs Doctrinaux — CNAM`,
    `*Généré le ${new Date().toLocaleDateString("fr-FR")} — ${targetErrors.length} erreurs à consolider*`,
    ``,
    ...targetErrors.map((err, idx) => {
      return [
        `### ${idx + 1}. [${TYPE_LABELS[err.type] || err.type}] « ${err.question} »`,
        `- **Votre réponse passée** : ~~${err.userSelection || "Non spécifiée"}~~`,
        `- **Réponse correcte** : **${err.correctAnswer}**`,
        `- **Explication doctrinale** : *${err.explanation}*`,
        ``,
      ].join("\n");
    }),
  ].join("\n");

  const blob = new Blob([doc], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `carnet_erreurs_${targetErrors.length}_questions.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
