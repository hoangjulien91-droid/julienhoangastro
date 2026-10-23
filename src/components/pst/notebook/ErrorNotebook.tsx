"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { PstStore, WrongAnswer } from "@/lib/pst/store";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trash2,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Focus,
  Layers,
  ArrowRight,
  ArrowLeft,
  Download,
  FileText,
  Volume2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ErrorNotebookProps {
  store: PstStore;
  onStoreChange: () => void;
}

interface ReplayState {
  open: boolean;
  revealed: boolean;
  correctFirst: boolean;
}

type TypeFilter = "all" | "qcm" | "pieges" | "qui";
type ViewMode = "list" | "focus";

const TYPE_LABELS: Record<string, string> = {
  qcm: "QCM",
  pieges: "Piège V/F",
  qui: "Citation",
};

export function ErrorNotebook({ store, onStoreChange }: ErrorNotebookProps) {
  const errors = store.getErrors();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [focusIdx, setFocusIdx] = useState(0);

  const [replay, setReplay] = useState<Record<string, ReplayState>>({});
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  // Focus mode specific replay state
  const [focusRevealed, setFocusRevealed] = useState(false);
  const [focusChoiceOrder, setFocusChoiceOrder] = useState<boolean>(true);

  // Reset focus evaluation state when index changes
  useEffect(() => {
    setFocusRevealed(false);
    setFocusChoiceOrder(Math.random() > 0.5);
  }, [focusIdx]);

  // Touch swipe support in Focus mode
  const touchStartXRef = useRef<number | null>(null);
  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartXRef.current === null || !e.changedTouches[0]) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // swipe vers la gauche -> suivant
        handleNextFocus();
      } else {
        // swipe vers la droite -> précédent
        handlePrevFocus();
      }
    }
    touchStartXRef.current = null;
  }

  const typeCounts = useMemo(() => {
    const counts = { all: errors.length, qcm: 0, pieges: 0, qui: 0 };
    for (const err of errors) {
      if (err.type === "pieges") counts.pieges++;
      else if (err.type === "qui") counts.qui++;
      else counts.qcm++;
    }
    return counts;
  }, [errors]);

  const filteredErrors = useMemo(() => {
    if (typeFilter === "all") return errors;
    if (typeFilter === "pieges")
      return errors.filter((e) => e.type === "pieges");
    if (typeFilter === "qui") return errors.filter((e) => e.type === "qui");
    return errors.filter((e) => e.type !== "pieges" && e.type !== "qui");
  }, [errors, typeFilter]);

  const totalFiltered = filteredErrors.length;
  const safeFocusIdx = Math.min(focusIdx, Math.max(0, totalFiltered - 1));
  const currentErr: WrongAnswer | undefined = filteredErrors[safeFocusIdx];

  function handlePrevFocus() {
    triggerHaptic("light");
    playClickSound();
    setFocusIdx((i) => Math.max(0, i - 1));
  }

  function handleNextFocus() {
    triggerHaptic("light");
    playClickSound();
    setFocusIdx((i) =>
      totalFiltered > 0 ? Math.min(totalFiltered - 1, i + 1) : 0,
    );
  }

  function startReplay(err: WrongAnswer) {
    triggerHaptic("light");
    playClickSound();
    setReplay((prev) => ({
      ...prev,
      [err.id]: {
        open: true,
        revealed: false,
        correctFirst: Math.random() > 0.5,
      },
    }));
  }

  function closeReplay(id: string) {
    setReplay((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function revealAnswer(id: string) {
    triggerHaptic("light");
    playClickSound();
    setReplay((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { open: true, revealed: false, correctFirst: true }),
        revealed: true,
      },
    }));
  }

  function handleAnswer(err: WrongAnswer, wasRight: boolean) {
    if (wasRight) {
      triggerHaptic("success");
      playSuccessSound();
      setRemovingIds((prev) => new Set(prev).add(err.id));
      setTimeout(() => {
        store.removeError(err.id);
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(err.id);
          return next;
        });
        closeReplay(err.id);
        onStoreChange();
        toast.success("Erreur assimilée et retirée du carnet !");
      }, 300);
    } else {
      triggerHaptic("warning");
      playReviewSound();
      toast.error("Faux ! Retentez ou consultez l'explication.");
      setFocusRevealed(true);
      closeReplay(err.id);
    }
  }

  function handleClearAll() {
    triggerHaptic("warning");
    playClickSound();
    store.clearErrors();
    onStoreChange();
    toast.success("Carnet d'erreurs réinitialisé.");
  }

  function handleRemove(id: string) {
    triggerHaptic("light");
    playClickSound();
    store.removeError(id);
    onStoreChange();
  }

  function startAllReplay() {
    triggerHaptic("light");
    playClickSound();
    const next: Record<string, ReplayState> = {};
    for (const err of filteredErrors) {
      next[err.id] = {
        open: true,
        revealed: false,
        correctFirst: Math.random() > 0.5,
      };
    }
    setReplay(next);
  }

  function playTts(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.info("La synthèse vocale n'est pas supportée sur ce navigateur.");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 1.05;
    window.speechSynthesis.speak(utter);
  }

  function handleExportAnki() {
    triggerHaptic("light");
    playClickSound();
    const targetErrors = filteredErrors.length > 0 ? filteredErrors : errors;
    if (targetErrors.length === 0) {
      toast.error("Aucune erreur à exporter.");
      return;
    }

    const lines = targetErrors.map((err) => {
      const front =
        `« ${err.question} » (Erreur passée: ${err.userSelection || "Non spécifiée"})`
          .replace(/\t/g, " ")
          .replace(/\n/g, "<br>");
      const back =
        `<b>Réponse correcte :</b> ${err.correctAnswer}<br><br><b>Explication doctrinale :</b> ${err.explanation}`
          .replace(/\t/g, " ")
          .replace(/\n/g, "<br>");
      const tag = `CarnetErreurs ${TYPE_LABELS[err.type] || err.type}`;
      return `${front}\t${back}\t${tag}`;
    });

    const content = lines.join("\n");
    const blob = new Blob([content], {
      type: "text/tab-separated-values;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `erreurs_anki_${targetErrors.length}_questions.tsv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(
      `${targetErrors.length} erreurs exportées pour Anki (.tsv) !`,
    );
  }

  function handleExportMarkdown() {
    triggerHaptic("light");
    playClickSound();
    const targetErrors = filteredErrors.length > 0 ? filteredErrors : errors;
    if (targetErrors.length === 0) {
      toast.error("Aucune erreur à exporter.");
      return;
    }

    const doc = [
      `# Carnet d'Erreurs Doctrinaux — CNAM`,
      `*Généré le ${new Date().toLocaleDateString("fr-FR")} — ${targetErrors.length} erreurs à consolider*`,
      ``,
      ...targetErrors.map((err, idx) => {
        return [
          `### ${idx + 1}. [${TYPE_LABELS[err.type] || err.type}] « ${err.question} »`,
          `- **Votre réponse passée** : ~~${err.userSelection || "Non spécifiée"}~~`,
          `- **Réponse correcte** : **${err.correctAnswer}**`,
          `- **Explication doctrinale** : *${err.explanation}*`,
          ``,
        ].join("\n");
      }),
    ].join("\n");

    const blob = new Blob([doc], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carnet_erreurs_${targetErrors.length}_questions.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(
      `${targetErrors.length} erreurs exportées en Markdown (.md) !`,
    );
  }

  // Keyboard navigation & drill in Focus mode
  useEffect(() => {
    if (viewMode !== "focus") return;
    const err = currentErr;
    if (!err) return;

    function handleKeyDown(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      if (
        tgt &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(totalFiltered - 1, i + 1));
      } else if (err.type === "pieges") {
        if (key === "1" || key === "v") {
          e.preventDefault();
          handleAnswer(err, err.correctAnswer === "Vrai");
        } else if (key === "2" || key === "f") {
          e.preventDefault();
          handleAnswer(err, err.correctAnswer === "Faux");
        }
      } else if (err.type === "qui") {
        if (!focusRevealed) {
          if (e.key === " " || e.key === "Enter" || key === "1") {
            e.preventDefault();
            setFocusRevealed(true);
            playClickSound();
          }
        } else {
          if (key === "1") {
            e.preventDefault();
            handleAnswer(err, true);
          } else if (key === "2") {
            e.preventDefault();
            handleAnswer(err, false);
          }
        }
      } else {
        // QCM / générique
        if (key === "1") {
          e.preventDefault();
          handleAnswer(err, focusChoiceOrder);
        } else if (key === "2") {
          e.preventDefault();
          handleAnswer(err, !focusChoiceOrder);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, currentErr, focusRevealed, focusChoiceOrder, totalFiltered]);

  if (errors.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-3xl border border-dashed border-border bg-card/60 backdrop-blur-md space-y-3 animate-in fade-in duration-200">
        <div className="size-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <strong className="text-base font-serif font-bold text-foreground block">
            Votre carnet d&apos;erreurs est vide !
          </strong>
          <p className="text-xs text-muted-foreground mt-1 m-0 max-w-sm mx-auto leading-relaxed">
            Toutes vos erreurs passées ont été résolues et assimilées. Continuez
            les quiz pour identifier d&apos;éventuels pièges doctrinaux.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="errorsHost" className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 shadow-2xs">
            <XCircle className="size-3.5" />
            <span>
              {errors.length} erreur{errors.length > 1 ? "s" : ""} à
              retravailler
            </span>
          </span>
          {viewMode === "list" && totalFiltered > 0 && (
            <button
              type="button"
              onClick={startAllReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <RotateCcw className="size-3.5" />
              <span>Tester mes {totalFiltered} erreurs</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportAnki}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Exporter pour l'application Anki (.tsv)"
          >
            <Download className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Anki (.tsv)</span>
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Exporter en fiche Markdown (.md)"
          >
            <FileText className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Fiche (.md)</span>
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-all cursor-pointer shadow-2xs"
              >
                <Trash2 className="size-3" />
                <span>Tout effacer</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Effacer tout le carnet d&apos;erreurs ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action supprimera la liste de vos questions manquées
                  pour ce module.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll}>
                  Effacer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Filters & View Mode Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-muted/40 border border-border">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(
            [
              { id: "all", label: "Toutes", count: typeCounts.all },
              { id: "qcm", label: "QCM", count: typeCounts.qcm },
              { id: "pieges", label: "Pièges V/F", count: typeCounts.pieges },
              { id: "qui", label: "Citations", count: typeCounts.qui },
            ] as const
          ).map((tab) => {
            const active = typeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  triggerHaptic("light");
                  playClickSound();
                  setTypeFilter(tab.id);
                  setFocusIdx(0);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-background/80 hover:bg-muted text-muted-foreground border border-border/80"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active
                      ? "bg-slate-950/20 text-slate-950 font-black"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle (Liste vs Focus) */}
        <div className="flex items-center gap-1 self-end sm:self-auto shrink-0 bg-background/80 p-1 rounded-xl border border-border">
          <button
            type="button"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              setViewMode("list");
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-muted text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="size-3.5" />
            <span>Liste</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              setViewMode("focus");
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              viewMode === "focus"
                ? "bg-amber-500 text-slate-950 shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Focus className="size-3.5" />
            <span>Focus 1 par 1</span>
          </button>
        </div>
      </div>

      {/* Body content based on View Mode */}
      {totalFiltered === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-border bg-card/60 backdrop-blur-md space-y-2">
          <p className="text-xs text-muted-foreground m-0">
            Aucune erreur dans la catégorie «{" "}
            {TYPE_LABELS[typeFilter] ?? "sélectionnée"} ».
          </p>
        </div>
      ) : viewMode === "focus" && currentErr ? (
        /* Focus 1 par 1 Mode */
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="space-y-4"
        >
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{
                width: `${((safeFocusIdx + 1) / totalFiltered) * 100}%`,
              }}
            />
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-card shadow-md space-y-5 transition-all duration-300 ${
              removingIds.has(currentErr.id)
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            }`}
          >
            {/* Focus Card Header */}
            <div className="flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 shadow-2xs">
                {TYPE_LABELS[currentErr.type] ?? currentErr.type}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  {safeFocusIdx + 1} / {totalFiltered}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic("light");
                      playTts(
                        `Question : ${currentErr.question}. Réponse doctrinale : ${currentErr.correctAnswer}. ${currentErr.explanation}`,
                      );
                    }}
                    aria-label="Écouter la question à voix haute"
                    title="Écouter la question (synthèse vocale)"
                    className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground transition-all cursor-pointer"
                  >
                    <Volume2 className="size-4 text-amber-600 dark:text-amber-400" />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrevFocus}
                    disabled={safeFocusIdx === 0}
                    aria-label="Question précédente"
                    className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground disabled:opacity-30 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFocus}
                    disabled={safeFocusIdx >= totalFiltered - 1}
                    aria-label="Question suivante"
                    className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground disabled:opacity-30 transition-all cursor-pointer"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-serif font-bold text-foreground leading-relaxed m-0">
              « {currentErr.question} »
            </h3>

            {/* Error History Reminder */}
            <div className="p-3.5 rounded-2xl border border-border bg-muted/30 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-muted-foreground font-medium">
                  Votre réponse passée :
                </span>
                <span className="line-through text-rose-600 dark:text-rose-400 font-semibold">
                  {currentErr.userSelection || "Non spécifiée"}
                </span>
              </div>
            </div>

            {/* Interactive Drill for Focus Mode */}
            <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-xs space-y-3">
              {currentErr.type === "pieges" && (
                <div className="space-y-3">
                  <div className="text-center text-xs font-mono font-bold text-muted-foreground">
                    Affirmez : Vrai ou Faux ? (Raccourcis: [1] ou V / [2] ou F)
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="p-3.5 rounded-2xl font-mono text-sm font-bold bg-card hover:bg-muted border border-border hover:border-amber-500/50 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
                      onClick={() =>
                        handleAnswer(
                          currentErr,
                          currentErr.correctAnswer === "Vrai",
                        )
                      }
                    >
                      <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                        1
                      </span>
                      <span>Vrai</span>
                    </button>
                    <button
                      type="button"
                      className="p-3.5 rounded-2xl font-mono text-sm font-bold bg-card hover:bg-muted border border-border hover:border-amber-500/50 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
                      onClick={() =>
                        handleAnswer(
                          currentErr,
                          currentErr.correctAnswer === "Faux",
                        )
                      }
                    >
                      <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                        2
                      </span>
                      <span>Faux</span>
                    </button>
                  </div>
                </div>
              )}

              {currentErr.type === "qui" && (
                <div className="space-y-3">
                  {!focusRevealed ? (
                    <button
                      type="button"
                      className="w-full p-3.5 rounded-2xl font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                      onClick={() => {
                        triggerHaptic("light");
                        playClickSound();
                        setFocusRevealed(true);
                      }}
                    >
                      <span>Révéler la réponse attendue</span>
                      <span className="px-2 py-0.5 rounded-md bg-primary-foreground/20 text-[10px]">
                        Espace / 1
                      </span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center text-xs">
                        <span className="text-muted-foreground block text-[11px] mb-1">
                          Auteur attendu :
                        </span>
                        <strong className="text-emerald-700 dark:text-emerald-300 font-mono text-base">
                          {currentErr.correctAnswer}
                        </strong>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className="p-3 rounded-xl font-mono text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
                          onClick={() => handleAnswer(currentErr, true)}
                        >
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-[10px]">
                            1
                          </span>
                          <span>✓ J&apos;avais trouvé !</span>
                        </button>
                        <button
                          type="button"
                          className="p-3 rounded-xl font-mono text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-800 dark:text-rose-300 border border-rose-500/30 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
                          onClick={() => handleAnswer(currentErr, false)}
                        >
                          <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-[10px]">
                            2
                          </span>
                          <span>✗ Toujours pas</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentErr.type !== "pieges" && currentErr.type !== "qui" && (
                <div className="space-y-2.5">
                  <span className="text-xs font-mono font-bold text-muted-foreground block text-center">
                    Choisissez la bonne option (Raccourcis: [1] ou [2]) :
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        val: focusChoiceOrder
                          ? currentErr.correctAnswer
                          : currentErr.userSelection || "Erreur",
                        isCorrect: focusChoiceOrder,
                        idxKey: "1",
                      },
                      {
                        val: !focusChoiceOrder
                          ? currentErr.correctAnswer
                          : currentErr.userSelection || "Erreur",
                        isCorrect: !focusChoiceOrder,
                        idxKey: "2",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.idxKey}
                        type="button"
                        className="w-full text-left p-3.5 rounded-2xl border border-border bg-card hover:bg-muted text-xs font-medium transition-all cursor-pointer shadow-2xs flex items-center gap-3 active:scale-98"
                        onClick={() => handleAnswer(currentErr, opt.isCorrect)}
                      >
                        <span className="px-2 py-0.5 rounded-lg bg-muted border border-border text-[11px] font-mono font-bold text-muted-foreground">
                          {opt.idxKey}
                        </span>
                        <span className="flex-1 text-foreground font-semibold">
                          {opt.val}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Explanation box */}
            <div className="p-3.5 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
              <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5 text-foreground font-semibold">
                  Explication doctrinale :
                </strong>
                <span className="text-muted-foreground">
                  {currentErr.explanation}
                </span>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/70">
              <button
                type="button"
                onClick={handlePrevFocus}
                disabled={safeFocusIdx === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border disabled:opacity-30 cursor-pointer transition-all"
              >
                <ArrowLeft className="size-3.5" />
                <span>Précédent</span>
              </button>

              <button
                type="button"
                onClick={() => handleRemove(currentErr.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-muted/60 hover:bg-muted text-foreground border border-border shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer transition-all"
              >
                <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Marquer assimilé</span>
              </button>

              <button
                type="button"
                onClick={handleNextFocus}
                disabled={safeFocusIdx >= totalFiltered - 1}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border disabled:opacity-30 cursor-pointer transition-all"
              >
                <span>Suivant</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Keyboard & gesture hint */}
            <div className="text-center text-[10px] font-mono text-muted-foreground pt-1">
              Raccourcis : [←] / [→] naviguer • [1] / [2] répondre • Glissez sur
              mobile
            </div>
          </div>
        </div>
      ) : (
        /* Cards list */
        <div className="space-y-3.5">
          {filteredErrors.map((err) => (
            <ErrorCard
              key={err.id}
              err={err}
              removing={removingIds.has(err.id)}
              replay={replay[err.id]}
              onStartReplay={() => startReplay(err)}
              onReveal={() => revealAnswer(err.id)}
              onAnswer={(wasRight) => handleAnswer(err, wasRight)}
              onRemove={() => handleRemove(err.id)}
              onPlayTts={() => {
                triggerHaptic("light");
                playTts(
                  `Question : ${err.question}. Réponse doctrinale : ${err.correctAnswer}. ${err.explanation}`,
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ErrorCard({
  err,
  removing,
  replay,
  onStartReplay,
  onReveal,
  onAnswer,
  onRemove,
  onPlayTts,
}: {
  err: WrongAnswer;
  removing: boolean;
  replay: ReplayState | undefined;
  onStartReplay: () => void;
  onReveal: () => void;
  onAnswer: (wasRight: boolean) => void;
  onRemove: () => void;
  onPlayTts: () => void;
}) {
  const choices = useMemo(() => {
    const correct = {
      val: err.correctAnswer,
      label: `✓ ${err.correctAnswer}`,
    };
    const wrong = {
      val: err.userSelection || "Erreur",
      label: `✗ ${err.userSelection || "Erreur"}`,
    };
    return replay?.correctFirst ? [correct, wrong] : [wrong, correct];
  }, [err.correctAnswer, err.userSelection, replay?.correctFirst]);

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-rose-500/30 bg-card shadow-xs transition-all duration-300 space-y-3.5 ${
        removing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 shadow-2xs">
          {TYPE_LABELS[err.type] ?? err.type}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPlayTts}
            aria-label="Écouter la question"
            title="Écouter à voix haute (synthèse vocale)"
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          >
            <Volume2 className="size-3.5 text-amber-600 dark:text-amber-400" />
          </button>
          <span className="text-[11px] font-mono text-muted-foreground">
            {new Date(err.timestamp).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>

      <h4 className="text-sm sm:text-base font-serif font-bold text-foreground leading-relaxed m-0">
        « {err.question} »
      </h4>

      {/* Answers comparison pill card */}
      <div className="p-3.5 rounded-2xl border border-border bg-muted/30 space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-muted-foreground font-medium">
            Votre réponse passée :
          </span>
          <span className="line-through text-rose-600 dark:text-rose-400 font-semibold">
            {err.userSelection || "Non spécifiée"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-muted-foreground font-medium">
            Réponse correcte :
          </span>
          <span className="text-emerald-700 dark:text-emerald-300 font-bold">
            {err.correctAnswer}
          </span>
        </div>
      </div>

      {/* Explanation pill */}
      <div className="p-3.5 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
        <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 text-foreground font-semibold">
            Explication doctrinale :
          </strong>
          <span className="text-muted-foreground">{err.explanation}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          disabled={replay?.open}
          onClick={onStartReplay}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-40"
        >
          <RotateCcw className="size-3.5" />
          <span>Rejouer</span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
        >
          <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Marquer assimilé</span>
        </button>
      </div>

      {/* Replay zone */}
      {replay?.open && (
        <div className="pt-3 border-t border-border/80 space-y-2.5 animate-in fade-in duration-150">
          {err.type === "pieges" && (
            <div className="space-y-2">
              <span className="text-xs font-serif font-bold text-foreground block text-center">
                Vrai ou Faux ?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="p-2.5 rounded-xl font-mono text-xs font-bold bg-card hover:bg-muted border border-border transition-all cursor-pointer shadow-2xs"
                  onClick={() => onAnswer(err.correctAnswer === "Vrai")}
                >
                  Vrai
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-xl font-mono text-xs font-bold bg-card hover:bg-muted border border-border transition-all cursor-pointer shadow-2xs"
                  onClick={() => onAnswer(err.correctAnswer === "Faux")}
                >
                  Faux
                </button>
              </div>
            </div>
          )}

          {err.type === "qui" && (
            <div className="space-y-2">
              {!replay.revealed ? (
                <button
                  type="button"
                  className="w-full p-2.5 rounded-xl font-mono text-xs font-bold bg-accent text-accent-foreground shadow-xs hover:opacity-90 transition-all cursor-pointer"
                  onClick={onReveal}
                >
                  Révéler la réponse attendue
                </button>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center text-xs">
                    <span className="text-muted-foreground block text-[11px]">
                      Auteur attendu :
                    </span>
                    <strong className="text-emerald-700 dark:text-emerald-300 font-mono text-sm">
                      {err.correctAnswer}
                    </strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="p-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer shadow-2xs"
                      onClick={() => onAnswer(true)}
                    >
                      ✓ J&apos;avais trouvé !
                    </button>
                    <button
                      type="button"
                      className="p-2.5 rounded-xl font-mono text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-800 dark:text-rose-300 border border-rose-500/30 transition-all cursor-pointer shadow-2xs"
                      onClick={() => onAnswer(false)}
                    >
                      ✗ Toujours pas
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {err.type !== "pieges" && err.type !== "qui" && (
            <div className="space-y-2">
              <span className="text-xs font-serif font-bold text-foreground block text-center">
                Choisissez la bonne option :
              </span>
              <div className="grid grid-cols-1 gap-2">
                {choices.map((c) => (
                  <button
                    key={c.val}
                    type="button"
                    className="w-full text-left p-3 rounded-xl border border-border bg-card hover:bg-muted text-xs font-medium transition-all cursor-pointer shadow-2xs"
                    onClick={() => onAnswer(c.val === err.correctAnswer)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
