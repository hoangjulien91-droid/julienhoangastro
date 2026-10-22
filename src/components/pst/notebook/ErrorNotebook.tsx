"use client";

import { useMemo, useState } from "react";
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
  BookOpen,
  HelpCircle,
  Check,
  X,
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

const TYPE_LABELS: Record<string, string> = {
  qcm: "QCM",
  pieges: "Piège V/F",
  qui: "Citation",
};

export function ErrorNotebook({ store, onStoreChange }: ErrorNotebookProps) {
  const errors = store.getErrors();
  const [replay, setReplay] = useState<Record<string, ReplayState>>({});
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

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
      toast.error("Faux ! Retentez une prochaine fois.");
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
            les quiz pour identifier d'éventuels pièges doctrinaux.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="errorsHost" className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 shadow-2xs">
          <XCircle className="size-3.5" />
          <span>
            {errors.length} erreur{errors.length > 1 ? "s" : ""} à retravailler
          </span>
        </span>

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
                Cette action supprimera la liste de vos questions manquées pour
                ce module.
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

      {/* Cards list */}
      <div className="space-y-3.5">
        {errors.map((err) => (
          <ErrorCard
            key={err.id}
            err={err}
            removing={removingIds.has(err.id)}
            replay={replay[err.id]}
            onStartReplay={() => startReplay(err)}
            onReveal={() => revealAnswer(err.id)}
            onAnswer={(wasRight) => handleAnswer(err, wasRight)}
            onRemove={() => handleRemove(err.id)}
          />
        ))}
      </div>
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
}: {
  err: WrongAnswer;
  removing: boolean;
  replay: ReplayState | undefined;
  onStartReplay: () => void;
  onReveal: () => void;
  onAnswer: (wasRight: boolean) => void;
  onRemove: () => void;
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
        <span className="text-[11px] font-mono text-muted-foreground">
          {new Date(err.timestamp).toLocaleDateString("fr-FR")}
        </span>
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
                      ✓ J'avais trouvé !
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
