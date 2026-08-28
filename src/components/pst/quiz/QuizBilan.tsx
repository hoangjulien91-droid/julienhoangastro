"use client";

interface QuizBilanProps {
  correct: number;
  total: number;
}

/** Verdict affiché une fois toutes les questions d'un quiz répondues. */
export function QuizBilan({ correct, total }: QuizBilanProps) {
  const pct = Math.round((100 * correct) / total);
  const verdict =
    pct >= 80
      ? "Excellent"
      : pct >= 60
        ? "Bien, à consolider"
        : "À retravailler";
  const color =
    pct >= 80 ? "var(--good)" : pct >= 60 ? "var(--precurseurs)" : "var(--bad)";

  return (
    <div className="qbilan show">
      <b style={{ color }}>
        {verdict} — {correct} / {total} ({pct}%)
      </b>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
        Score enregistré dans ton tableau de bord.
      </div>
    </div>
  );
}
