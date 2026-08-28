"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { PstStore, WrongAnswer } from "@/lib/pst/store";
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
      }, 300);
    } else {
      toast.error("Faux ! Retentez une prochaine fois.");
      closeReplay(err.id);
    }
  }

  function handleClearAll() {
    store.clearErrors();
    onStoreChange();
  }

  function handleRemove(id: string) {
    store.removeError(id);
    onStoreChange();
  }

  if (errors.length === 0) {
    return (
      <div
        className="empty-state"
        style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "var(--muted)",
          fontSize: 15,
        }}
      >
        <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>
          📔✨
        </span>
        <strong>Votre carnet d&apos;erreurs est vide !</strong>
        <p style={{ margin: "8px 0 0", fontSize: 13 }}>
          Toutes vos erreurs passées ont été résolues et assimilées.
        </p>
      </div>
    );
  }

  return (
    <div id="errorsHost">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          {errors.length} erreur{errors.length > 1 ? "s" : ""} enregistrée
          {errors.length > 1 ? "s" : ""}
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="btn small"
              style={{
                fontSize: 11,
                padding: "3px 8px",
                borderColor: "var(--bad)",
                color: "var(--bad)",
              }}
            >
              Tout effacer
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Effacer tout le carnet d&apos;erreurs ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible.
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
      <div
        className="errors-list"
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
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
      label: `✔️ ${err.correctAnswer}`,
    };
    const wrong = {
      val: err.userSelection || "Erreur",
      label: `❌ ${err.userSelection || "Erreur"}`,
    };
    return replay?.correctFirst ? [correct, wrong] : [wrong, correct];
  }, [err.correctAnswer, err.userSelection, replay?.correctFirst]);

  return (
    <div
      className="qcard"
      style={{
        borderLeft: "4px solid var(--bad, #ef4444)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: removing ? 0 : 1,
        transform: removing ? "scale(0.95)" : "none",
      }}
    >
      <div
        className="qhead"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          className="qnum"
          style={{
            background: "var(--badbg, #fef2f2)",
            color: "var(--bad, #ef4444)",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {TYPE_LABELS[err.type] ?? err.type}
        </span>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>
          {new Date(err.timestamp).toLocaleDateString("fr-FR")}
        </span>
      </div>
      <div
        className="qtext"
        style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}
      >
        {err.question}
      </div>

      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: 10,
          fontSize: 12.5,
          marginBottom: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div>
          ❌ Votre réponse :{" "}
          <span
            style={{
              textDecoration: "line-through",
              color: "var(--bad)",
              fontWeight: 600,
            }}
          >
            {err.userSelection || "Non spécifiée"}
          </span>
        </div>
        <div>
          ✅ Bonne réponse :{" "}
          <span style={{ color: "var(--good, #10b981)", fontWeight: 600 }}>
            {err.correctAnswer}
          </span>
        </div>
      </div>

      <div
        className="explain show"
        style={{
          marginBottom: 12,
          fontSize: 12.5,
          borderColor: "var(--line)",
          padding: 10,
        }}
      >
        <strong>Explication :</strong> {err.explanation}
      </div>

      <div
        className="actions-row"
        style={{ display: "flex", gap: 10, marginTop: 12 }}
      >
        <button
          className="btn small btn-replay"
          disabled={replay?.open}
          style={{
            flex: 1,
            justifyContent: "center",
            fontSize: 12,
            padding: "6px 12px",
            background: "var(--bonusbg)",
            color: "var(--bonusink)",
            borderColor: "var(--bonusink)",
          }}
          onClick={onStartReplay}
        >
          🎯 Rejouer
        </button>
        <button
          className="btn small btn-remove"
          style={{
            flex: 1,
            justifyContent: "center",
            fontSize: 12,
            padding: "6px 12px",
            borderColor: "var(--line)",
          }}
          onClick={onRemove}
        >
          Retirer
        </button>
      </div>

      {replay?.open && (
        <div
          className="replay-zone"
          style={{ marginTop: 12, display: "block" }}
        >
          {err.type === "pieges" && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Vrai ou Faux ?
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn small"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => onAnswer(err.correctAnswer === "Vrai")}
                >
                  Vrai
                </button>
                <button
                  className="btn small"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => onAnswer(err.correctAnswer === "Faux")}
                >
                  Faux
                </button>
              </div>
            </>
          )}

          {err.type === "qui" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {!replay.revealed ? (
                <button
                  className="btn small solid"
                  style={{
                    justifyContent: "center",
                    background: "var(--accent)",
                  }}
                  onClick={onReveal}
                >
                  👁️ Révéler la réponse
                </button>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      padding: 8,
                      borderRadius: 4,
                      fontSize: 12.5,
                      textAlign: "center",
                    }}
                  >
                    Auteur attendu :{" "}
                    <strong style={{ color: "var(--good)", fontSize: 14 }}>
                      {err.correctAnswer}
                    </strong>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn small"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        borderColor: "var(--good)",
                        color: "var(--good)",
                      }}
                      onClick={() => onAnswer(true)}
                    >
                      J&apos;ai trouvé !
                    </button>
                    <button
                      className="btn small"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        borderColor: "var(--bad)",
                        color: "var(--bad)",
                      }}
                      onClick={() => onAnswer(false)}
                    >
                      Toujours pas
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {err.type !== "pieges" && err.type !== "qui" && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Choisissez la bonne réponse :
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {choices.map((c) => (
                  <button
                    key={c.val}
                    className="btn small"
                    style={{ justifyContent: "left", fontSize: 12 }}
                    onClick={() => onAnswer(c.val === err.correctAnswer)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
