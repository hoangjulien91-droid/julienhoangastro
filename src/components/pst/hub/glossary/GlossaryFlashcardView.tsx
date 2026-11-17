import {
  Shuffle,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { INDEX, MODULES, type GlossaryTerm } from "@/lib/pst/hub-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface GlossaryFlashcardViewProps {
  filter: string;
  setFilter: (f: string) => void;
  flashcardList: GlossaryTerm[];
  currentCardIdx: number;
  setCurrentCardIdx: (idx: number) => void;
  currentFlashcard: GlossaryTerm | undefined;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
  isCurrentMastered: boolean;
  onShuffle: () => void;
  onPrevCard: () => void;
  onNextCard: () => void;
  onMarkMastered: (val: boolean) => void;
}

export function GlossaryFlashcardView({
  filter,
  setFilter,
  flashcardList,
  currentCardIdx,
  setCurrentCardIdx,
  currentFlashcard,
  isFlipped,
  setIsFlipped,
  isCurrentMastered,
  onShuffle,
  onPrevCard,
  onNextCard,
  onMarkMastered,
}: GlossaryFlashcardViewProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Module filter selector in Flashcard Mode */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
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
            onClick={onShuffle}
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
                    Cliquez sur la carte ou sur le bouton ci-dessous pour
                    révéler la définition
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-left animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-1">
                    <h4 className="text-base font-black text-amber-700 dark:text-amber-400 m-0 font-serif">
                      {currentFlashcard.w}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      Définition &amp; Clés
                    </span>
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
                      <span>
                        Voir la fiche complète (
                        {currentFlashcard.m.toUpperCase()})
                      </span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bas de carte : Flip Prompt */}
            <div className="flex items-center justify-center pt-2 text-[11px] text-slate-400 font-mono">
              <span>
                {isFlipped
                  ? "▲ Masquer la définition"
                  : "▼ Afficher la définition"}
              </span>
            </div>
          </div>

          {/* Barre de navigation et système d'auto-évaluation */}
          <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onPrevCard}
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
                onClick={onNextCard}
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
                onClick={() => onMarkMastered(false)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-300 border border-rose-300/80 dark:border-rose-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                <XCircle className="size-3.5 text-rose-600" />
                <span>À revoir</span>
              </button>
              <button
                type="button"
                onClick={() => onMarkMastered(true)}
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
  );
}
