"use client";

import type { RecitEntry } from "../Recits";

export type RecitMode = "full" | "hide" | "blank";

function normKw(s: string) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[‘’]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function getWordHint(word: string) {
  const clean = word.replace(/&nbsp;/g, " ").trim();
  if (!clean) return "";
  let hint = clean.charAt(0);
  for (let i = 1; i < clean.length; i++) {
    const char = clean.charAt(i);
    hint += /[a-zA-ZÀ-ÿ]/.test(char) ? "·" : char;
  }
  return hint;
}

export function injectWordHints(html: string, kwDefs: Record<string, string>) {
  return html.replace(
    /<span class=['"]kw['"]>([^<]+)<\/span>/gi,
    (_match, word: string) => {
      const hint = getWordHint(word);
      const def = kwDefs[normKw(word)];
      const titleAttr = def ? ` title="${def.replace(/"/g, "&quot;")}"` : "";
      return `<span class="kw" data-hint="${hint}"${titleAttr}>${word}</span>`;
    },
  );
}

interface RecitCardProps {
  entry: RecitEntry;
  ri: number;
  isMastered: boolean;
  mode: RecitMode;
  colors: Record<string, string>;
  kwDefs: Record<string, string>;
  marks: Record<string, unknown>;
  onToggleMastery: (ri: number) => void;
  onSetMode: (ri: number, mode: RecitMode) => void;
  onSetMark: (key: string, val: boolean) => void;
  onKwClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function RecitCard({
  entry: r,
  ri,
  isMastered,
  mode,
  colors,
  kwDefs,
  marks,
  onToggleMastery,
  onSetMode,
  onSetMark,
  onKwClick,
}: RecitCardProps) {
  let storyClass = "story";
  if (isMastered) storyClass += " mastered";
  if (mode === "hide") storyClass += " hide-kw";
  if (mode === "blank") storyClass += " blank";

  const kws: string[] = [];
  r.parts.forEach((p) => {
    const matches = p.html.match(/<span class=['"]kw['"]>([^<]+)<\/span>/gi);
    matches?.forEach((m) => {
      const text = m
        .replace(/<span class=['"]kw['"]>/i, "")
        .replace(/<\/span>/i, "")
        .replace(/&nbsp;/g, " ")
        .trim();
      if (!kws.includes(text)) kws.push(text);
    });
  });

  return (
    <div className={storyClass} id={`story${ri}`} data-author={r.a}>
      <div className="story-head" style={{ background: colors[r.a] }}>
        <span className="ic">{r.ic}</span>
        <div className="flex-1">
          <h3>{r.t}</h3>
          <div className="sub">{r.sub}</div>
        </div>
        <button
          className="recit-mastery-btn"
          title="Marquer comme maîtrisé"
          onClick={() => onToggleMastery(ri)}
        >
          ✓
        </button>
      </div>

      <div className="story-flow">
        {r.parts.map((p, pi) => (
          <span key={pi}>
            {pi > 0 && <span className="flow-arrow">➔</span>}
            <span
              className="flow-step"
              onClick={() =>
                document.getElementById(`story-${ri}-part-${pi}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
            >
              {p.beat.split(":")[0]?.trim()}
            </span>
          </span>
        ))}
      </div>

      <div className="story-tools">
        {(["full", "hide", "blank"] as RecitMode[]).map((m) => (
          <button
            key={m}
            className={mode === m ? "active" : ""}
            onClick={() => onSetMode(ri, m)}
          >
            {m === "full"
              ? "Texte complet"
              : m === "hide"
                ? "Masquer les mots-clés"
                : "Texte à trous"}
          </button>
        ))}
      </div>

      <div className="story-body" onClick={onKwClick}>
        {r.parts.map((p, pi) => (
          <div key={pi}>
            <span className="beat" id={`story-${ri}-part-${pi}`}>
              {p.beat}
            </span>
            <p
              dangerouslySetInnerHTML={{
                __html: injectWordHints(p.html, kwDefs),
              }}
            />
          </div>
        ))}
      </div>

      {kws.length > 0 && (
        <details className="story-keywords">
          <summary>Mots-clés requis pour ce récit ({kws.length})</summary>
          <div className="kw-checklist-container">
            <p className="kw-checklist-intro">
              Coche les concepts que tu es capable de définir de mémoire :
            </p>
            <div className="kw-checklist-grid">
              {kws.map((kw, kwi) => {
                const kwKey = `recit_${ri}_kw_${kwi}`;
                const isChecked = !!marks[kwKey];
                return (
                  <label className="kw-checklist-item" key={kwi}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => onSetMark(kwKey, e.target.checked)}
                    />
                    <span>{kw}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
