"use client";

import { useEffect, useMemo, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { SmartBridgeBadge } from "@/components/pst/bridges/SmartBridgeBadge";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

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

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

export function Fiches({
  store,
  onStoreChange,
  data,
  filters,
  hint,
}: FichesProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [viewMode, setViewMode] = useState<"accordion" | "reader">("accordion");
  const [readerIdx, setReaderIdx] = useState(0);
  const [selfTestBlur, setSelfTestBlur] = useState(false);
  const [revealedBlurSet, setRevealedBlurSet] = useState<Set<number>>(
    new Set(),
  );
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const marks = store.getMarks();
  const mastered = data.filter((_, i) => !!marks["fiche_mastery_" + i]).length;
  const total = data.length;
  const remaining = total - mastered;
  const pct = total ? Math.round((mastered * 100) / total) : 0;

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      data
        .map((f, i) => ({ f, i }))
        .filter(({ f, i }) => {
          const isM = !!marks["fiche_mastery_" + i];
          if (onlyUnmastered && isM) return false;
          const matchA = filter === "all" || f.a === filter;
          const noteText = String(marks["note_fiche_" + i] ?? "");
          const hay = (
            f.t +
            " " +
            f.ess +
            " " +
            f.ph +
            " " +
            noteText
          ).toLowerCase();
          return matchA && (!q || hay.includes(q));
        }),
    [data, filter, q, onlyUnmastered, marks],
  );

  const safeReaderIdx =
    visible.length > 0 ? Math.min(readerIdx, visible.length - 1) : 0;

  function toggleMastery(i: number) {
    const cur = !!store.getMarks()["fiche_mastery_" + i];
    store.setMark("fiche_mastery_" + i, !cur);
    if (!cur) playSuccessSound();
    else playClickSound();
    onStoreChange();
  }

  function updateFicheNote(i: number, text: string) {
    store.setMark("note_fiche_" + i, text);
    onStoreChange();
  }

  function toggleSpeakFiche(f: FicheItem, i: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speakingIdx === i) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanEss = f.ess.replace(/<[^>]*>/g, " ");
    const text = `${f.t}. L'essentiel : ${cleanEss}. Formule clé : ${f.ph}. Exemple : ${f.ex}. Attention au piège d'examen : ${f.trap}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeakingIdx(null);
    utter.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(i);
    window.speechSynthesis.speak(utter);
  }

  function exportFicheToJournal(f: FicheItem, i: number) {
    try {
      const noteVal = String(marks["note_fiche_" + i] ?? "").trim();
      const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const cleanEss = f.ess.replace(/<[^>]*>/g, "");
      const entry = {
        id: `fiche-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        context: `Fiche de synthèse — ${f.t}`,
        ue: "PST106",
        observation: `${cleanEss}\nFormule clé : « ${f.ph} »`,
        concept: f.t,
        posture: noteVal || `Exemple : ${f.ex} | Piège : ${f.trap}`,
      };
      const next = Array.isArray(list) ? [entry, ...list] : [entry];
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      setExportedIdx(i);
      setTimeout(() => setExportedIdx(null), 1800);
    } catch {
      // ignore
    }
  }

  const allVisibleOpen =
    visible.length > 0 && visible.every(({ i }) => openSet.has(i));

  function toggleExpandAll() {
    if (allVisibleOpen) {
      setOpenSet(new Set());
    } else {
      setOpenSet(new Set(visible.map(({ i }) => i)));
    }
  }

  function renderFicheCard(f: FicheItem, i: number, forceOpen = false) {
    const isM = !!marks["fiche_mastery_" + i];
    const isOpen = forceOpen || openSet.has(i);
    const noteVal = String(marks["note_fiche_" + i] ?? "");
    const isBlurred = selfTestBlur && !revealedBlurSet.has(i);
    const isSpeaking = speakingIdx === i;

    return (
      <details
        key={i}
        className={`fcard${isM ? " mastered" : ""}`}
        style={{ borderLeftColor: `var(--${f.a})` }}
        open={isOpen}
        onToggle={(e) => {
          if (forceOpen) return;
          const nextOpen = (e.target as HTMLDetailsElement).open;
          setOpenSet((prev) => {
            const next = new Set(prev);
            if (nextOpen) next.add(i);
            else next.delete(i);
            return next;
          });
        }}
      >
        <summary className="flex items-center gap-2">
          <span
            className="dot shrink-0"
            style={{ background: `var(--${f.a})` }}
          />
          <span className="ttl">{f.t}</span>
          {isM && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
              ✓ Maîtrisée
            </span>
          )}
          {noteVal.trim() && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-semibold">
              Note
            </span>
          )}
          <SmartBridgeBadge conceptQuery={f.t} />
          <span className="arrow ml-auto">▼</span>
        </summary>
        <div className="fbody">
          <div
            onClick={() => {
              if (isBlurred) {
                playClickSound();
                setRevealedBlurSet((prev) => new Set(prev).add(i));
              }
            }}
            style={
              isBlurred
                ? {
                    filter: "blur(6px)",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "filter 0.2s ease",
                  }
                : { transition: "filter 0.2s ease" }
            }
            title={
              isBlurred
                ? "Cliquer pour révéler la synthèse (Mode Auto-Test actif)"
                : undefined
            }
          >
            <div
              className="ess"
              dangerouslySetInnerHTML={{ __html: f.ess }}
            />
            <div className="ph">
              <b>Formule clé :</b> {f.ph}
            </div>
          </div>
          {isBlurred && (
            <button
              type="button"
              className="btn small"
              style={{ marginTop: 6, marginBottom: 6, fontSize: 11 }}
              onClick={() => {
                playClickSound();
                setRevealedBlurSet((prev) => new Set(prev).add(i));
              }}
            >
              Révéler la synthèse et la formule clé
            </button>
          )}
          <div className="ex">
            <b>Exemple d&apos;illustration :</b> {f.ex}
          </div>
          <div className="trap">
            <b>Piège d&apos;examen :</b> {f.trap}
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <input
              type="text"
              value={noteVal}
              onChange={(e) => updateFicheNote(i, e.target.value)}
              placeholder="Ajouter un mémo personnel ou exemple de terrain sur cette fiche..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100"
            />
            <div className="flex items-center gap-1.5 flex-wrap shrink-0">
              <button
                type="button"
                className="btn small"
                style={{ padding: "4px 9px", fontSize: 11 }}
                onClick={() => toggleSpeakFiche(f, i)}
                title="Écouter la fiche en synthèse vocale (iOS / macOS)"
              >
                {isSpeaking ? "■ Stop audio" : "▶ Écouter"}
              </button>
              <button
                type="button"
                className="btn small"
                style={{ padding: "4px 9px", fontSize: 11 }}
                onClick={() => exportFicheToJournal(f, i)}
                title="Envoyer cette fiche et votre mémo dans le Carnet de Terrain"
              >
                {exportedIdx === i ? "✓ Envoyé au Carnet" : "→ Carnet Terrain"}
              </button>
              <button
                className="fiche-mastery-btn shrink-0"
                onClick={() => toggleMastery(i)}
              >
                {isM ? "✓ Fiche maîtrisée" : "Marquer maîtrisée"}
              </button>
            </div>
          </div>
        </div>
      </details>
    );
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
              placeholder="Rechercher une notion, une formule clé, un auteur ou une note..."
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
          <div
            className="chips flex items-center justify-between flex-wrap gap-2"
            style={{ marginTop: 10 }}
          >
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none w-full sm:w-auto">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className="chip shrink-0"
                  aria-pressed={filter === f.key}
                  onClick={() => {
                    setFilter(f.key);
                    setReaderIdx(0);
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none w-full sm:w-auto">
              <button
                type="button"
                className="chip"
                aria-pressed={viewMode === "reader"}
                onClick={() => {
                  playClickSound();
                  setViewMode((m) =>
                    m === "accordion" ? "reader" : "accordion",
                  );
                }}
                title="Basculer entre la liste accordéon et la Liseuse Focus 1 par 1 (style Apple Books)"
              >
                {viewMode === "reader"
                  ? "✓ Mode Liseuse 1/1"
                  : "Mode Liseuse 1/1"}
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={selfTestBlur}
                onClick={() => {
                  playClickSound();
                  setSelfTestBlur((v) => !v);
                  setRevealedBlurSet(new Set());
                }}
                title="Flouter l'essentiel et la formule clé pour vous auto-interroger"
              >
                {selfTestBlur ? "✓ Auto-test actif" : "Auto-test (Flouter)"}
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={onlyUnmastered}
                onClick={() => {
                  setOnlyUnmastered((v) => !v);
                  setReaderIdx(0);
                }}
              >
                {onlyUnmastered
                  ? `✓ À maîtriser (${remaining})`
                  : `À maîtriser (${remaining})`}
              </button>
              {viewMode === "accordion" && (
                <button
                  type="button"
                  className="chip"
                  onClick={toggleExpandAll}
                >
                  {allVisibleOpen ? "Tout replier" : "Tout déplier"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="hint">Aucune fiche trouvée pour ces critères.</p>
      ) : viewMode === "reader" ? (
        <div>
          {visible[safeReaderIdx] &&
            renderFicheCard(
              visible[safeReaderIdx]!.f,
              visible[safeReaderIdx]!.i,
              true,
            )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              marginTop: 12,
            }}
          >
            <button
              type="button"
              className="btn small"
              disabled={safeReaderIdx <= 0}
              onClick={() => {
                playClickSound();
                setReaderIdx((idx) => Math.max(0, idx - 1));
              }}
            >
              ← Fiche précédente
            </button>
            <span className="qnum" style={{ fontWeight: 700 }}>
              Fiche {safeReaderIdx + 1} / {visible.length}
            </span>
            <button
              type="button"
              className="btn small primary"
              disabled={safeReaderIdx >= visible.length - 1}
              onClick={() => {
                playClickSound();
                setReaderIdx((idx) => Math.min(visible.length - 1, idx + 1));
              }}
            >
              Fiche suivante →
            </button>
          </div>
        </div>
      ) : (
        <div id="fichesHost">
          {visible.map(({ f, i }) => renderFicheCard(f, i, false))}
        </div>
      )}
    </div>
  );
}
