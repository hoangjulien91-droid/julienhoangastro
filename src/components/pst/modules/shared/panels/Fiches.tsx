"use client";

import { useMemo, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { SmartBridgeBadge } from "@/components/pst/bridges/SmartBridgeBadge";

export interface FichesFilter {
  key: string;
  label: string;
}

interface FichesProps {
  store: PstStore;
  onStoreChange: () => void;
  data: FicheItem[];
  filters: FichesFilter[];
  hint: string;
}

export function Fiches({
  store,
  onStoreChange,
  data,
  filters,
  hint,
}: FichesProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const marks = store.getMarks();
  const mastered = data.filter((_, i) => !!marks["fiche_mastery_" + i]).length;
  const total = data.length;
  const pct = total ? Math.round((mastered * 100) / total) : 0;

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      data
        .map((f, i) => ({ f, i }))
        .filter(({ f }) => {
          const matchA = filter === "all" || f.a === filter;
          const hay = (f.t + " " + f.ess).toLowerCase();
          return matchA && (!q || hay.includes(q));
        }),
    [data, filter, q],
  );

  function toggleMastery(i: number) {
    const cur = !!store.getMarks()["fiche_mastery_" + i];
    store.setMark("fiche_mastery_" + i, !cur);
    onStoreChange();
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="fiches-controls-card">
        <div className="fiche-progress-container">
          <div className="fiche-progress-header">
            <span className="fiche-progress-title">
              Progression de mémorisation
            </span>
            <span className="fiche-progress-stats">
              {mastered} / {total} fiches maîtrisées ({pct}%)
            </span>
          </div>
          <div className="fiche-progress-bar">
            <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="fiches-filter-row">
          <div className="fiche-search-wrapper">
            <input
              type="text"
              className="fiche-search-input"
              placeholder="Rechercher une notion, un concept, une séance..."
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="fiche-search-clear"
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
                className="chip"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div id="fichesHost">
        {visible.length === 0 ? (
          <p className="hint">Aucune fiche trouvée.</p>
        ) : (
          visible.map(({ f, i }) => {
            const isM = !!marks["fiche_mastery_" + i];
            const isOpen = openIdx === i;
            return (
              <details
                key={i}
                className={`fcard${isM ? " mastered" : ""}`}
                style={{ borderLeftColor: `var(--${f.a})` }}
                open={isOpen}
                onToggle={(e) =>
                  setOpenIdx((e.target as HTMLDetailsElement).open ? i : null)
                }
              >
                <summary className="flex items-center gap-2">
                  <span
                    className="dot shrink-0"
                    style={{ background: `var(--${f.a})` }}
                  />
                  <span className="ttl">{f.t}</span>
                  <SmartBridgeBadge conceptQuery={f.t} />
                  <span className="arrow ml-auto">▼</span>
                </summary>
                <div className="fbody">
                  <div
                    className="ess"
                    dangerouslySetInnerHTML={{ __html: f.ess }}
                  />
                  <div className="ph">
                    <b>Formule clé :</b> {f.ph}
                  </div>
                  <div className="ex">
                    <b>Exemple d&apos;illustration :</b> {f.ex}
                  </div>
                  <div className="trap">
                    <b>Piège d&apos;examen :</b> {f.trap}
                  </div>
                  <button
                    className="fiche-mastery-btn"
                    onClick={() => toggleMastery(i)}
                  >
                    {isM ? "✓ Séance maîtrisée" : "Marquer comme maîtrisée"}
                  </button>
                </div>
              </details>
            );
          })
        )}
      </div>
    </div>
  );
}
