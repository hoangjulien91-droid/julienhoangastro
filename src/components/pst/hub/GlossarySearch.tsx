"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Brain,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { INDEX, type GlossaryTerm } from "@/lib/pst/hub-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { GlossaryFlashcardView } from "./glossary/GlossaryFlashcardView";
import { GlossaryDictionaryView } from "./glossary/GlossaryDictionaryView";

const MASTERY_STORAGE_KEY = "pst_glossary_mastery_v1";

export function GlossarySearch() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredTerms, setMasteredTerms] = useState<Record<string, boolean>>(
    {},
  );

  // Charger la progression d'auto-évaluation locale
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MASTERY_STORAGE_KEY);
      if (stored) {
        setMasteredTerms(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  function saveMastery(termWord: string, isMastered: boolean) {
    setMasteredTerms((prev) => {
      const next = { ...prev, [termWord]: isMastered };
      try {
        localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      } catch {
        // ignore
      }
      return next;
    });
  }

  // Liste filtrée des termes pour le dictionnaire
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDEX.glossaire.filter((t: GlossaryTerm) => {
      if (filter !== "all" && t.m !== filter) return false;
      if (!q) return true;
      return (t.w + " " + t.def).toLowerCase().includes(q);
    });
  }, [filter, query]);

  // Liste pour le mode Flashcards
  const flashcardList = useMemo(() => {
    return INDEX.glossaire.filter((t: GlossaryTerm) => {
      if (filter !== "all" && t.m !== filter) return false;
      return true;
    });
  }, [filter]);

  const currentFlashcard = flashcardList[currentCardIdx];
  const isCurrentMastered = !!(
    currentFlashcard && masteredTerms[currentFlashcard.w]
  );

  // Statistiques de maîtrise pour le module actif
  const stats = useMemo(() => {
    const totalInFilter = flashcardList.length;
    const masteredInFilter = flashcardList.filter(
      (t) => !!masteredTerms[t.w],
    ).length;
    const pct =
      totalInFilter > 0 ? Math.round((masteredInFilter / totalInFilter) * 100) : 0;
    return { total: totalInFilter, mastered: masteredInFilter, pct };
  }, [flashcardList, masteredTerms]);

  function handleNextCard() {
    playClickSound();
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev + 1) % flashcardList.length);
  }

  function handlePrevCard() {
    playClickSound();
    setIsFlipped(false);
    setCurrentCardIdx(
      (prev) => (prev - 1 + flashcardList.length) % flashcardList.length,
    );
  }

  function handleShuffle() {
    playClickSound();
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * flashcardList.length);
    setCurrentCardIdx(rand);
  }

  function markMastered(isMastered: boolean) {
    if (!currentFlashcard) return;
    saveMastery(currentFlashcard.w, isMastered);
    handleNextCard();
  }

  return (
    <div
      id="glossaire"
      className="card bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 rounded-3xl space-y-4 shadow-xs scroll-mt-20 transition-all"
    >
      {/* Header : Titre + Toggle Mode Révision Active */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Dictionnaire transversal PST
          </span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0">
            <span>Concepts &amp; Notions Clés</span>
            <span className="text-xs font-mono font-normal text-slate-400">
              ({INDEX.glossaire.length} définitions)
            </span>
          </h3>
        </div>

        {/* Bouton de bascule Mode Révision / Flashcards */}
        <div className="flex items-center gap-2">
          {!isRevisionMode ? (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsRevisionMode(true);
                setCurrentCardIdx(0);
                setIsFlipped(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Brain className="size-4 text-amber-200" />
              <span>Mode Flashcards Rapide</span>
              <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded-full">
                {stats.pct}%
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsRevisionMode(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Retour au dictionnaire</span>
            </button>
          )}
        </div>
      </div>

      {/* BODY : Flashcard View vs Dictionary View */}
      {isRevisionMode ? (
        <GlossaryFlashcardView
          filter={filter}
          setFilter={setFilter}
          flashcardList={flashcardList}
          currentCardIdx={currentCardIdx}
          setCurrentCardIdx={setCurrentCardIdx}
          currentFlashcard={currentFlashcard}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          isCurrentMastered={isCurrentMastered}
          onShuffle={handleShuffle}
          onPrevCard={handlePrevCard}
          onNextCard={handleNextCard}
          onMarkMastered={markMastered}
        />
      ) : (
        <GlossaryDictionaryView
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
          list={list}
          masteredTerms={masteredTerms}
          onSaveMastery={saveMastery}
        />
      )}
    </div>
  );
}
