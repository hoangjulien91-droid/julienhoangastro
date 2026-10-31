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
import { Check, Sparkles, BookOpen, AlertCircle } from "lucide-react";

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

    if (score >= 80) {
      triggerHaptic("success");
      playSuccessSound();
    } else {
      triggerHaptic("medium");
      playClickSound();
    }
  }

  const scoreBadge = result
    ? result.score >= 80
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : result.score >= 50
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
        : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30"
    : "";

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
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full min-h-[140px] p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 font-normal text-sm leading-relaxed resize-y mb-3.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-inner"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
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
            className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
            onClick={handleSubmit}
          >
            Évaluer l&apos;explication
          </button>
        </div>

        {result && (
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-4 mt-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground block">
                  Score sémantique
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xl font-black text-foreground">
                    {result.score}%
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${scoreBadge}`}
                  >
                    {scoreLetter}
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-muted-foreground">
                {result.score >= 80
                  ? "Excellente synthèse"
                  : result.score >= 50
                    ? "Notions partielles"
                    : "Explication à étoffer"}
              </span>
            </div>

            {/* Notions trouvées */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-foreground block">
                Notions clés identifiées :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.found.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                  >
                    <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{k}</span>
                  </span>
                ))}
                {result.found.length === 0 && (
                  <span className="text-xs text-muted-foreground italic">
                    Aucune notion clé formellement détectée.
                  </span>
                )}
              </div>
            </div>

            {/* Notions manquantes */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-foreground block">
                Notions à intégrer pour consolider l'argument :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/80"
                  >
                    <span>+ {k}</span>
                  </span>
                ))}
                {result.missing.length === 0 && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Félicitations, vous avez couvert l'ensemble des notions
                    clés du concept !
                  </span>
                )}
              </div>
            </div>

            {/* Feedback pédagogique Cnam */}
            <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
              <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5 text-foreground font-semibold">
                  Analyse Pédagogique Chaire Cnam :
                </strong>
                <span className="text-muted-foreground">
                  {result.score >= 80
                    ? "Votre explication est rigoureuse, claire et structurée. Vous mobilisez le vocabulaire conceptuel sans tomber dans le jargon creux."
                    : result.score >= 50
                      ? "Bonne amorce explicative. Pour le jury, consolidez votre argumentation en intégrant expressément les notions suggérées ci-dessus."
                      : "Explication trop générale ou incomplète. Relisez la fiche doctrinale correspondante puis tentez une nouvelle reformulation avec les termes exacts."}
                </span>
              </div>
            </div>
          </div>
        )}

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
                    <span
                      className={`px-2 py-0.5 rounded-lg text-xs font-black border ${scoreBadgeColor}`}
                    >
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
