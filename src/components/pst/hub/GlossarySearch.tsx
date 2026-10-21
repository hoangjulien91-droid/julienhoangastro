"use client";

import React, { useMemo, useState, useEffect, type ReactNode } from "react";
import {
  Search,
  BookOpen,
  ArrowRight,
  X,
  Brain,
  RotateCcw,
  Shuffle,
  CheckCircle2,
  XCircle,
  Eye,
  Award,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { INDEX, MODULES, type GlossaryTerm } from "@/lib/pst/hub-stats";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

const MASTERY_STORAGE_KEY = "pst_glossary_mastery_v1";

function highlightMatches(text: string, query: string): ReactNode {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-amber-300 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 rounded px-0.5">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  );
}

function accentOf(id: string) {
  return INDEX.modules[id]?.accent ?? "var(--accent)";
}

export function GlossarySearch() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredTerms, setMasteredTerms] = useState<Record<string, boolean>>({});

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

  // Liste pour le mode Flashcards (selon filtre d'UE)
  const flashcardList = useMemo(() => {
    return INDEX.glossaire.filter((t: GlossaryTerm) => {
      if (filter !== "all" && t.m !== filter) return false;
      return true;
    });
  }, [filter]);

  const currentFlashcard = flashcardList[currentCardIdx] ?? flashcardList[0];
  const isCurrentMastered = currentFlashcard ? !!masteredTerms[currentFlashcard.w] : false;

  // Calcul du score global de maîtrise
  const totalTermsCount = INDEX.glossaire.length;
  const totalMasteredCount = Object.values(masteredTerms).filter(Boolean).length;
  const masteryPercentage = Math.round((totalMasteredCount * 100) / totalTermsCount);

  function handleNextCard() {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev + 1) % flashcardList.length);
  }

  function handlePrevCard() {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev - 1 + flashcardList.length) % flashcardList.length);
  }

  function handleShuffle() {
    setIsFlipped(false);
    playClickSound();
    const rand = Math.floor(Math.random() * flashcardList.length);
    setCurrentCardIdx(rand);
  }

  function markMastered(val: boolean) {
    if (!currentFlashcard) return;
    if (val) playSuccessSound();
    else playClickSound();
    saveMastery(currentFlashcard.w, val);
    // Passer automatiquement à la carte suivante après un bref délai ergonomique
    setTimeout(() => {
      handleNextCard();
    }, 280);
  }

  const q = query.trim().toLowerCase();

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
      {/* Barre d'action supérieure : Mode Révision Flashcards + Compteur de maîtrise */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsRevisionMode(!isRevisionMode);
              setIsFlipped(false);
              setCurrentCardIdx(0);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
              isRevisionMode
                ? "bg-amber-600 text-white shadow-amber-600/30 ring-2 ring-amber-500/30"
                : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200"
            }`}
          >
            <Brain className="size-4 text-amber-400" />
            <span>
              {isRevisionMode ? "Mode Dictionnaire classique" : "🧠 Mode Révision (Cartes Mémo)"}
            </span>
          </button>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-serif hidden md:inline">
            {isRevisionMode
              ? "Testez votre restitution active des définitions clés"
              : "88 concepts cliniques & théoriques synchronisés"}
          </span>
        </div>

        {/* Compteur de concepts maîtrisés */}
        <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono font-bold shrink-0">
          <Award className="size-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-slate-800 dark:text-slate-200">
            {totalMasteredCount}/{totalTermsCount} maîtrisés
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            ({masteryPercentage}%)
          </span>
        </div>
      </div>

      {/* --- MODE FLASHCARDS / AUTO-ÉVALUATION --- */}
      {isRevisionMode ? (
        <div className="space-y-4 py-2 animate-in fade-in duration-200">
          {/* Filtres par UE pour la révision */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="size-3.5 text-amber-500" />
                <span>Atelier :</span>
              </span>
              <button
                type="button"
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                }`}
                onClick={() => {
                  setFilter("all");
                  setCurrentCardIdx(0);
                  setIsFlipped(false);
                }}
              >
                Tous ({INDEX.glossaire.length})
              </button>
              {MODULES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    filter === m.id
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                  onClick={() => {
                    setFilter(m.id);
                    setCurrentCardIdx(0);
                    setIsFlipped(false);
                  }}
                >
                  {m.id.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={handleShuffle}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Tirer au sort une carte parmi le lot"
              >
                <Shuffle className="size-3.5" />
                <span>Aléatoire</span>
              </button>
            </div>
          </div>

          {/* CARTE FLASHCARD INTERACTIVE */}
          {currentFlashcard && (
            <div className="max-w-xl mx-auto space-y-3">
              <div
                onClick={() => {
                  playClickSound();
                  setIsFlipped(!isFlipped);
                }}
                className={`min-h-[220px] sm:min-h-[240px] p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-md relative overflow-hidden select-none active:scale-[0.99] ${
                  isFlipped
                    ? "bg-white dark:bg-slate-900 border-amber-500/80 shadow-amber-500/10"
                    : "bg-gradient-to-br from-white via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 border-slate-200 dark:border-slate-700 hover:border-amber-400"
                }`}
              >
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs">
                    {currentFlashcard.m.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                      {currentCardIdx + 1} / {flashcardList.length}
                    </span>
                    {isCurrentMastered && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="size-3" />
                        <span>Maîtrisé</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Corps de la carte : Recto (Terme) vs Verso (Définition) */}
                <div className="my-auto py-4 text-center space-y-2">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                        Concept à expliciter :
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight m-0 font-serif">
                        {currentFlashcard.w}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic m-0 pt-2">
                        Cliquez sur la carte ou sur le bouton ci-dessous pour révéler la définition
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 text-left animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-1">
                        <h4 className="text-base font-black text-amber-700 dark:text-amber-400 m-0 font-serif">
                          {currentFlashcard.w}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">Définition &amp; Clés</span>
                      </div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif m-0">
                        {currentFlashcard.def}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <Link
                          href={`/pst/${currentFlashcard.m.replace("pst", "")}/#lexique`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Voir la fiche complète ({currentFlashcard.m.toUpperCase()})</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bas de carte : Flip Prompt */}
                <div className="flex items-center justify-center pt-2 text-[11px] text-slate-400 font-mono">
                  <span>{isFlipped ? "▲ Masquer la définition" : "▼ Afficher la définition"}</span>
                </div>
              </div>

              {/* Barre de navigation et système d'auto-évaluation */}
              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                    title="Carte précédente"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setIsFlipped(!isFlipped);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="size-3.5" />
                    <span>{isFlipped ? "Masquer" : "Révéler"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                    title="Carte suivante"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                {/* Deux boutons d'auto-évaluation indispensables */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => markMastered(false)}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-300 border border-rose-300/80 dark:border-rose-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-2xs"
                  >
                    <XCircle className="size-3.5 text-rose-600" />
                    <span>À revoir</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => markMastered(true)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs"
                  >
                    <CheckCircle2 className="size-3.5" />
                    <span>Maîtrisé</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- MODE DICTIONNAIRE CLASSIQUE AVEC RECHERCHE ET LIENS CROISÉS --- */
        <>
          {/* Search Input & Filter Chips (Apple Spotlight Style) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800/80">
            <div className="relative flex-1">
              <Search className="size-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                id="gsearch"
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-2xs"
                placeholder="Rechercher un terme, concept ou auteur dans tous les ateliers…"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs ${
                  filter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80"
                }`}
                onClick={() => setFilter("all")}
              >
                Tous ({INDEX.glossaire.length})
              </button>
              {MODULES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs ${
                    filter === m.id
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80"
                  }`}
                  onClick={() => setFilter(m.id)}
                >
                  {m.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>
              {list.length} terme{list.length > 1 ? "s" : ""} trouvé{list.length > 1 ? "s" : ""}
            </span>
            {query && (
              <span className="text-[11px] italic text-amber-700 dark:text-amber-400">
                Filtre : « {query} »
              </span>
            )}
          </div>

          {/* Terms Grid avec Liens Croisés Concepts <-> Fiches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {list.map((t, i) => {
              const modPath = `/pst/${t.m.replace("pst", "")}/`;
              const lexiquePath = `/pst/${t.m.replace("pst", "")}/#lexique`;
              const isMastered = !!masteredTerms[t.w];
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md hover:border-amber-500/50 hover:shadow-xs transition-all flex flex-col justify-between space-y-2 group shadow-2xs"
                  style={{ borderLeftWidth: "4px", borderLeftColor: accentOf(t.m) }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors m-0 font-serif">
                        {highlightMatches(t.w, q)}
                      </h4>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isMastered && (
                          <span
                            title="Concept validé comme maîtrisé"
                            className="size-2 rounded-full bg-emerald-500 inline-block"
                          />
                        )}
                        <Link
                          href={lexiquePath}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200/60 dark:border-slate-600/60 transition-colors"
                          title={`Voir dans le glossaire de l'atelier ${t.m.toUpperCase()}`}
                        >
                          {t.m.toUpperCase()}
                        </Link>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
                      {highlightMatches(t.def, q)}
                    </p>
                  </div>

                  {/* Liens croisés vers la fiche de synthèse et l'atelier */}
                  <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        saveMastery(t.w, !isMastered);
                        if (!isMastered) playSuccessSound();
                        else playClickSound();
                      }}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        isMastered
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      }`}
                    >
                      {isMastered ? "✓ Maîtrisé" : "Marquer maîtrisé"}
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/pst/${t.m.replace("pst", "")}/#fiches`}
                        className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:underline flex items-center gap-0.5"
                        title="Consulter les fiches de synthèse théorique de cette UE"
                      >
                        <BookOpen className="size-3" />
                        <span>Fiche UE</span>
                      </Link>

                      <Link
                        href={modPath}
                        className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 group/btn"
                      >
                        <span>Atelier {t.m.toUpperCase()}</span>
                        <ArrowRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
