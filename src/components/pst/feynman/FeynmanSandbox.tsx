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
    <div id="feynmanHost">
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 6,
            color: "var(--muted)",
          }}
        >
          Sélectionnez un concept théorique :
        </label>
        <select
          id="feynmanConceptSelect"
          value={selectedConceptId}
          onChange={(e) => handleSelectConcept(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid var(--line)",
            background: "var(--card)",
            color: "var(--ink)",
            fontWeight: 600,
          }}
        >
          {concepts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div className="qcard" style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            fontWeight: 700,
            color: "var(--accent)",
            marginBottom: 6,
          }}
        >
          Consigne
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          {concept.desc}
        </div>

        <textarea
          id="feynmanText"
          placeholder="Expliquez ce concept ici avec vos propres mots, le plus simplement possible..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            minHeight: 140,
            padding: 12,
            borderRadius: 8,
            border: "1px solid var(--line)",
            background: "var(--paper)",
            color: "var(--ink)",
            fontFamily: "inherit",
            fontSize: 13.5,
            lineHeight: 1.5,
            resize: "vertical",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
            Essayez d&apos;inclure les notions clés indispensables.
          </span>
          <button
            className="btn solid"
            style={{ background: "var(--accent)", color: "#fff" }}
            onClick={handleSubmit}
          >
            Évaluer l&apos;explication 🚀
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
                {result.score >= 80 ? "🎓" : result.score >= 50 ? "💡" : "✍️"}
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
                ? "🙈 Cacher l'exemple de bonne réponse"
                : "👁️ Voir un exemple de bonne réponse"}
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

      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontSize: 15, marginBottom: 12, fontWeight: 600 }}>
          📜 Historique de vos explications
        </h3>
        <div
          id="feynmanHistoryList"
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {history.length === 0 ? (
            <div
              style={{
                fontSize: 12,
                color: "var(--muted)",
                textAlign: "center",
                padding: 12,
              }}
            >
              Aucun essai précédent pour ce concept.
            </div>
          ) : (
            history.map((item, i) => {
              const dateStr = new Date(item.timestamp).toLocaleDateString(
                "fr-FR",
                { hour: "2-digit", minute: "2-digit" },
              );
              const itemColor =
                item.score >= 80
                  ? "var(--good)"
                  : item.score >= 50
                    ? "var(--precurseurs)"
                    : "var(--bad)";
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 12.5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: itemColor }}>
                      Tentative : {item.score}%
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 11 }}>
                      {dateStr}
                    </span>
                  </div>
                  <div
                    style={{
                      fontStyle: "italic",
                      color: "var(--ink)",
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}
                  >
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
