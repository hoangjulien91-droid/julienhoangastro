"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { PstStore } from "@/lib/pst/store";
import { CONCEPTS_BY_MODULE } from "@/lib/pst/data/feynman-concepts";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { Check, BookOpen } from "lucide-react";
import {
  type EvalResult,
  evaluateFeynmanKeywords,
} from "./feynmanEvaluation";
import { FeynmanEvalResultCard } from "./FeynmanEvalResultCard";
import { FeynmanHistoryCard } from "./FeynmanHistoryCard";

interface FeynmanSandboxProps {
  store: PstStore;
  moduleKey: string;
  onStoreChange: () => void;
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

  const storageKey = `pst_feynman_drafts_${moduleKey}`;

  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [selectedConceptId, setSelectedConceptId] = useState(
    concepts[0]?.id ?? "",
  );
  const [text, setText] = useState(() => drafts[concepts[0]?.id ?? ""] ?? "");
  const [result, setResult] = useState<EvalResult | null>(null);
  const [showSample, setShowSample] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  // Synchronisation lors d'un changement de module
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`pst_feynman_drafts_${moduleKey}`);
      const loaded: Record<string, string> = raw ? JSON.parse(raw) : {};
      setDrafts(loaded);
      const initialId = concepts[0]?.id ?? "";
      setSelectedConceptId(initialId);
      setText(loaded[initialId] ?? "");
      setResult(null);
      setShowSample(false);
    } catch {
      // ignore
    }
  }, [moduleKey, concepts]);

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
    triggerHaptic("light");
    playClickSound();
    setSelectedConceptId(id);
    setText(drafts[id] ?? "");
    setResult(null);
    setShowSample(false);
  }

  function handleTextChange(newVal: string) {
    setText(newVal);
    setDrafts((prev) => {
      const updated = { ...prev, [selectedConceptId]: newVal };
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          // ignore quota / private mode
        }
      }, 300);
      return updated;
    });
  }

  function handleSubmit() {
    const trimmed = text.trim();
    if (trimmed.length < 15) {
      triggerHaptic("warning");
      toast.error(
        "Votre explication est trop courte pour être évaluée. Écrivez au moins une phrase.",
      );
      return;
    }
    if (!concept) return;

    const evaluation = evaluateFeynmanKeywords(trimmed, concept.keywords);
    const { score, found, missing } = evaluation;

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
    setResult(evaluation);

    if (score >= 80) {
      triggerHaptic("success");
      playSuccessSound();
    } else {
      triggerHaptic("medium");
      playClickSound();
    }
  }

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
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="w-full min-h-[140px] p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 font-normal text-sm leading-relaxed resize-y mb-3.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-inner"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 dark:text-slate-400 italic">
              Essayez d&apos;inclure les notions clés indispensables.
            </span>
            {text.trim().length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <Check className="size-3" /> Auto-sauvegardé
              </span>
            )}
          </div>
          <button
            type="button"
            className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0 inline-flex items-center justify-center gap-2"
            onClick={handleSubmit}
          >
            <span>Évaluer l&apos;explication</span>
            <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white/95">
              ⌘↵
            </kbd>
          </button>
        </div>

        {result && <FeynmanEvalResultCard result={result} />}

        {concept.sampleAnswer && (
          <div className="mt-4 pt-3.5 border-t border-dashed border-border/70">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer shadow-2xs"
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                setShowSample((s) => !s);
              }}
            >
              <BookOpen className="size-3.5" />
              <span>
                {showSample
                  ? "Masquer l'exemple canonique"
                  : "Consulter l'exemple canonique de réponse"}
              </span>
            </button>
            {showSample && (
              <div className="mt-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm leading-relaxed italic animate-in fade-in duration-150">
                {concept.sampleAnswer}
              </div>
            )}
          </div>
        )}
      </div>

      <FeynmanHistoryCard history={history} />
    </div>
  );
}
