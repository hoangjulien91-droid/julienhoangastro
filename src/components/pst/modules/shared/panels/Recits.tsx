"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";

export interface RecitPart {
  beat: string;
  html: string;
}
export interface RecitEntry {
  a: string;
  ic: string;
  t: string;
  sub: string;
  parts: RecitPart[];
}
export interface RecitFilter {
  key: string;
  label: string;
}

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

/** Décore les <span class="kw"> avec un indice lettré (data-hint) et une
 * définition (title natif — simplification par rapport à l'infobulle
 * flottante repositionnée en JS de la source, l'effet pédagogique reste
 * identique : survol = définition, mode « masquer » = indice lettré). */
function injectWordHints(html: string, kwDefs: Record<string, string>) {
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

type Mode = "full" | "hide" | "blank";

interface RecitsProps {
  store: PstStore;
  onStoreChange: () => void;
  data: RecitEntry[];
  kwDefs: Record<string, string>;
  filters: RecitFilter[];
  colors: Record<string, string>;
}

export function Recits({
  store,
  onStoreChange,
  data,
  kwDefs,
  filters,
  colors,
}: RecitsProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [modes, setModes] = useState<Record<number, Mode>>({});
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function toggleMastery(ri: number) {
    const key = "recit_mastery_" + ri;
    const cur = !!store.getMarks()[key];
    store.setMark(key, !cur);
    onStoreChange();
  }

  function toggleSpeech(ri: number) {
    if (!("speechSynthesis" in window)) return;
    if (speakingIdx === ri) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis.cancel();
    const r = data[ri];
    if (!r) return;
    let text = r.t + ". " + r.sub + ". ";
    r.parts.forEach((p) => {
      text += p.beat + ". " + p.html.replace(/<\/?[^>]+(>|$)/g, "") + " ";
    });
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.onend = utterance.onerror = () => setSpeakingIdx(null);
    utteranceRef.current = utterance;
    setSpeakingIdx(ri);
    window.speechSynthesis.speak(utterance);
  }

  function setMode(ri: number, mode: Mode) {
    setModes((prev) => ({ ...prev, [ri]: mode }));
  }

  function handleKwClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest(".kw");
    if (target) target.classList.toggle("revealed");
  }

  const marks = store.getMarks();
  const cleanQuery = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      data
        .map((r, ri) => ({ r, ri }))
        .filter(({ r }) => {
          if (filter !== "all" && r.a !== filter) return false;
          if (!cleanQuery) return true;
          const hay = [
            r.t,
            r.sub,
            r.parts.map((p) => p.beat + " " + p.html).join(" "),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(cleanQuery);
        }),
    [data, filter, cleanQuery],
  );

  const masteredCount = data.filter(
    (_, i) => !!marks["recit_mastery_" + i],
  ).length;
  const totalRecits = data.length;
  const pct = totalRecits ? Math.round((100 * masteredCount) / totalRecits) : 0;

  return (
    <div>
      <p className="recits-intro">
        Chaque auteur sous forme d&apos;<b>exposé continu et structuré</b>, à
        mobiliser tel quel le jour J. Récite-le, puis utilise les boutons pour{" "}
        <b>masquer les mots-clés</b> et te tester, ou passer en{" "}
        <b>texte à trous</b> pour le restituer de mémoire.
      </p>
      <div className="recits-controls-card">
        <div className="recit-progress-container">
          <div className="recit-progress-header">
            <span className="recit-progress-title">
              📈 Progression d&apos;apprentissage
            </span>
            <span className="recit-progress-stats">
              {masteredCount} / {totalRecits} récits maîtrisés ({pct}%)
            </span>
          </div>
          <div className="recit-progress-bar">
            <div className="recit-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="recits-filter-row">
          <div className="recit-search-wrapper">
            <span className="search-icon" />
            <input
              type="text"
              className="recit-search-input"
              placeholder="Rechercher un concept, un auteur, un mot..."
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="recit-search-clear"
                title="Effacer la recherche"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </div>
          <div className="chips" style={{ marginTop: 10 }}>
            {filters.map((f) => (
              <button
                key={f.key}
                className={`chip c-${f.key}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div id="recitsHost">
        {visible.map(({ r, ri }) => {
          const isMastered = !!marks["recit_mastery_" + ri];
          const mode = modes[ri] ?? "full";
          let storyClass = "story";
          if (isMastered) storyClass += " mastered";
          if (mode === "hide") storyClass += " hide-kw";
          if (mode === "blank") storyClass += " blank";

          const kws: string[] = [];
          r.parts.forEach((p) => {
            const matches = p.html.match(
              /<span class=['"]kw['"]>([^<]+)<\/span>/gi,
            );
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
            <div
              className={storyClass}
              id={`story${ri}`}
              key={ri}
              data-author={r.a}
            >
              <div className="story-head" style={{ background: colors[r.a] }}>
                <span className="ic">{r.ic}</span>
                <div style={{ flex: 1 }}>
                  <h3>{r.t}</h3>
                  <div className="sub">{r.sub}</div>
                </div>
                <button
                  className={`story-speech-btn${speakingIdx === ri ? " playing" : ""}`}
                  title="Écouter le récit"
                  onClick={() => toggleSpeech(ri)}
                >
                  {speakingIdx === ri ? "⏸️" : "🔊"}
                </button>
                <button
                  className="recit-mastery-btn"
                  title="Marquer comme maîtrisé"
                  onClick={() => toggleMastery(ri)}
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
                        document
                          .getElementById(`story-${ri}-part-${pi}`)
                          ?.scrollIntoView({
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
                {(["full", "hide", "blank"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    className={mode === m ? "active" : ""}
                    onClick={() => setMode(ri, m)}
                  >
                    {m === "full"
                      ? "Texte complet"
                      : m === "hide"
                        ? "Masquer les mots-clés"
                        : "Texte à trous"}
                  </button>
                ))}
              </div>

              <div className="story-body" onClick={handleKwClick}>
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
                  <summary>
                    🔑 Mots-clés requis pour ce récit ({kws.length})
                  </summary>
                  <div className="kw-checklist-container">
                    <p className="kw-checklist-intro">
                      Coche les concepts que tu es capable de définir de mémoire
                      :
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
                              onChange={(e) => {
                                store.setMark(kwKey, e.target.checked);
                                onStoreChange();
                              }}
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
        })}
      </div>
    </div>
  );
}
