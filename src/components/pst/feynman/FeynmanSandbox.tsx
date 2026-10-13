"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { PstStore } from "@/lib/pst/store";
import { CONCEPTS_BY_MODULE } from "@/lib/pst/data/feynman-concepts";

interface FeynmanSandboxProps {
  store: PstStore;
  moduleKey: string;
  onStoreChange: () => void;
}

const DIACRITICS_RANGE = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  "g",
);

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_RANGE, "")
    .replace(/[^a-z0-9]/g, " ");
}

interface EvalResult {
  score: number;
  found: string[];
  missing: string[];
}

export function FeynmanSandbox({
  store,
  moduleKey,
  onStoreChange,
}: FeynmanSandboxProps) {
  const concepts = useMemo(
    () => CONCEPTS_BY_MODULE[moduleKey] ?? CONCEPTS_BY_MODULE.pst106 ?? [],
    [moduleKey],
  );
  const [selectedConceptId, setSelectedConceptId] = useState(
    concepts[0]?.id ?? "",
  );
  const [text, setText] = useState("");
  const [result, setResult] = useState<EvalResult | null>(null);
  const [showSample, setShowSample] = useState(false);

  const concept = useMemo(
    () => concepts.find((c) => c.id === selectedConceptId) ?? concepts[0],
    [concepts, selectedConceptId],
  );

  const history = store
    .getFeynmanHistory()
    .filter((h) => h.conceptId === selectedConceptId)
    .slice(-3)
    .reverse();

  if (!concept) return null;

  function handleSelectConcept(id: string) {
    setSelectedConceptId(id);
    setText("");
    setResult(null);
    setShowSample(false);
  }

  function handleSubmit() {
    const trimmed = text.trim();
    if (trimmed.length < 15) {
      toast.error(
        "Votre explication est trop courte pour être évaluée. Écrivez au moins une phrase.",
      );
      return;
    }
    if (!concept) return;

    const normalizedText = normalize(trimmed);
    const found: string[] = [];
    const missing: string[] = [];
    concept.keywords.forEach((keyword) => {
      if (normalizedText.includes(normalize(keyword))) found.push(keyword);
      else missing.push(keyword);
    });

    const score = Math.round((found.length / concept.keywords.length) * 100);
    store.saveFeynmanAttempt(
      concept.id,
      concept.title,
      trimmed,
      score,
      missing,
      found,
    );
    if (score === 100) store.unlockBadge("feynman_master");
    onStoreChange();
    setResult({ score, found, missing });
  }

  const scoreColor = result
    ? result.score >= 80
      ? "var(--good)"
      : result.score >= 50
        ? "var(--precurseurs)"
        : "var(--bad)"
    : undefined;
  const scoreLetter = result
    ? result.score >= 85
      ? "Excellent (A)"
      : result.score >= 65
        ? "Bien (B)"
        : result.score >= 45
          ? "Passable (C)"
          : "À retravailler (D)"
    : undefined;

  return (
    <div id="feynmanHost" className="space-y-5">
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <label
          htmlFor="feynmanConceptSelect"
          className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2"
        >
          Sélectionnez un concept théorique :
        </label>
        <select
          id="feynmanConceptSelect"
          value={selectedConceptId}
          onChange={(e) => handleSelectConcept(e.target.value)}
          className="w-full p-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-2xs transition-all cursor-pointer"
        >
          {concepts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div className="qcard p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
          Consigne
        </div>
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3.5 leading-relaxed">
          {concept.desc}
        </div>

        <textarea
          id="feynmanText"
          placeholder="Expliquez ce concept ici avec vos propres mots, le plus simplement possible..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[140px] p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 font-normal text-sm leading-relaxed resize-y mb-3.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-inner"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 italic">
            Essayez d&apos;inclure les notions clés indispensables.
          </span>
          <button
            type="button"
            className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
            onClick={handleSubmit}
          >
            Évaluer l&apos;explication
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: 20,
              borderTop: "1px solid var(--line)",
              paddingTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--muted)",
                  }}
                >
                  Score sémantique
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: scoreColor }}
                >
                  {result.score}% — {scoreLetter}
                </div>
              </div>
              <span style={{ fontSize: 24 }}>
                {result.score >= 80 ? "Excellent" : result.score >= 50 ? "Valable" : "À approfondir"}
              </span>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                Notions trouvées :
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {result.found.map((k) => (
                  <span
                    key={k}
                    style={{
                      background: "var(--goodbg)",
                      color: "var(--good)",
                      border: "1px solid var(--good)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    ✓ {k}
                  </span>
                ))}
                {result.found.length === 0 && (
                  <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                    Aucune notion clé détectée.
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                Notions suggérées en complément :
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {result.missing.map((k) => (
                  <span
                    key={k}
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      color: "var(--muted)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                    }}
                  >
                    + {k}
                  </span>
                ))}
                {result.missing.length === 0 && (
                  <span style={{ fontSize: 11.5, color: "var(--good)" }}>
                    Félicitations, vous avez couvert toutes les notions clés !
                  </span>
                )}
              </div>
            </div>

            <div
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: 10,
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.4,
              }}
            >
              <strong>Feedback EdTech :</strong>{" "}
              {result.score >= 80
                ? "Votre explication est extrêmement claire et structurée. Vous maîtrisez parfaitement ce concept."
                : result.score >= 50
                  ? "Bonne explication, mais tentez d'inclure les concepts suggérés ci-dessus pour la rendre encore plus rigoureuse."
                  : "Explication trop superficielle. Relisez la fiche de révision correspondante puis reformulez à nouveau."}
            </div>
          </div>
        )}

        {concept.sampleAnswer && (
          <div
            style={{
              marginTop: 14,
              borderTop: "1px dashed var(--line)",
              paddingTop: 12,
            }}
          >
            <button
              className="btn small"
              style={{
                fontSize: 11.5,
                padding: "3px 8px",
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
              onClick={() => setShowSample((s) => !s)}
            >
              {showSample
                ? "Cacher l'exemple de bonne réponse"
                : " Voir un exemple de bonne réponse"}
            </button>
            {showSample && (
              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  background: "var(--bonusbg)",
                  color: "var(--bonusink)",
                  borderRadius: 6,
                  fontSize: 12.5,
                  lineHeight: 1.45,
                  fontStyle: "italic",
                }}
              >
                {concept.sampleAnswer}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 m-0">
          Historique de vos explications
        </h3>
        <div id="feynmanHistoryList" className="space-y-3">
          {history.length === 0 ? (
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center py-6 italic">
              Aucun essai précédent pour ce concept.
            </div>
          ) : (
            history.map((item, i) => {
              const dateStr = new Date(item.timestamp).toLocaleDateString(
                "fr-FR",
                { hour: "2-digit", minute: "2-digit" },
              );
              const scoreBadgeColor =
                item.score >= 80
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                  : item.score >= 50
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                    : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-black border ${scoreBadgeColor}`}>
                      Tentative : {item.score}%
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      {dateStr}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    &quot;{item.userText}&quot;
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
