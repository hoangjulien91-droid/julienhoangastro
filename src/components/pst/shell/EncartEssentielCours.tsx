"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  ListChecks,
  Copy,
  Check,
  Zap,
  Volume2,
  Square,
} from "lucide-react";
import type { EssentielCoursCard } from "@/lib/pst/data/essentiel-cours";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { EncartEssentielBlitzView } from "./encart-essentiel/EncartEssentielBlitzView";
import { EncartEssentielFullView } from "./encart-essentiel/EncartEssentielFullView";

interface EncartEssentielCoursProps {
  cards: EssentielCoursCard[];
  initialCardId?: string;
  /** Optional detailed executive summary bullets (for SeancesCoursPanel toggle) */
  detailBullets?: string[];
  compact?: boolean;
}

export function EncartEssentielCours({
  cards,
  initialCardId,
  detailBullets,
  compact = false,
}: EncartEssentielCoursProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialCardId ?? cards[0]?.id ?? "",
  );
  const [viewMode, setViewMode] = useState<"essentiel" | "blitz" | "detail">(
    "essentiel",
  );
  const [copied, setCopied] = useState(false);
  const [copiedPunchlineIdx, setCopiedPunchlineIdx] = useState<number | null>(
    null,
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeCard =
    cards.find((c) => c.id === selectedId) ?? cards[0] ?? null;

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!activeCard) return null;

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleToggleSpeech = () => {
    playClickSound();
    triggerHaptic();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    window.speechSynthesis.cancel();
    const script = [
      `${activeCard.badge}. ${activeCard.titre}.`,
      `Fil directeur : ${activeCard.filConducteur}`,
      `Ce qu'il faut retenir pour l'examen : ${activeCard.ceQuIlFautRetenir.join(" ")}`,
      `Auteurs incontournables : ${activeCard.auteursCles.map((a) => `${a.nom} : ${a.apport}`).join(". ")}`,
      `Attention, piège d'examen à éviter : ${activeCard.piegeExamen}`,
    ].join(" ");

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "fr-FR";
    utterance.rate = 1.03;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyPunchline = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPunchlineIdx(idx);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedPunchlineIdx(null), 1800);
  };

  const handleCopySummary = () => {
    const text = `FICHE SYNTHÈSE CNAM : ${activeCard.badge} — ${activeCard.titre}

FIL CONDUCTEUR :
${activeCard.filConducteur}

1. CE QU'IL FAUT SAVOIR :
${activeCard.ceQuIlFautSavoir.map((s, i) => `${i + 1}. ${s}`).join("\n")}

2. CE QU'IL FAUT RETENIR (POUR L'EXAMEN) :
${activeCard.ceQuIlFautRetenir.map((r) => `• ${r}`).join("\n")}

3. AUTEURS CLÉS :
${activeCard.auteursCles.map((a) => `- ${a.nom} : ${a.apport}`).join("\n")}

4. CONCEPTS CLÉS :
${activeCard.conceptsCles.map((c) => `- ${c.terme} : ${c.definitionCourte}`).join("\n")}

PIÈGE D'EXAMEN À ÉVITER :
${activeCard.piegeExamen}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playSuccessSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-amber-500/[0.07] via-card to-indigo-500/[0.05] border border-amber-500/30 shadow-xs ${
        compact ? "p-4 sm:p-5 space-y-3.5" : "p-5 sm:p-6 space-y-4"
      }`}
    >
      {/* En-tête de l'encart + sélecteur de cours ou mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-border/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/35">
              <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Fiche L&apos;Essentiel</span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-muted-foreground">
              {activeCard.badge}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-serif font-bold text-foreground leading-snug">
            {activeCard.titre}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
          {cards.length > 1 && (
            <div className="inline-flex items-center p-1 rounded-xl bg-muted/70 border border-border/60 gap-1 flex-wrap">
              {cards.map((c) => {
                const isSelected = c.id === activeCard.id;
                const shortLabel = c.coursNum
                  ? `Cours ${c.coursNum}`
                  : "Synthèse UE";
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      stopSpeech();
                      playClickSound();
                      setSelectedId(c.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          )}

          {/* Sélecteur de mode : L'Essentiel vs Blitz J-7 vs Détail */}
          <div className="inline-flex items-center p-1 rounded-xl bg-muted/70 border border-border/60 gap-1">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("essentiel");
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === "essentiel"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="size-3" />
              <span>L&apos;Essentiel</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("blitz");
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === "blitz"
                  ? "bg-rose-600 text-white shadow-2xs"
                  : "text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200"
              }`}
              title="Mode Révision Express J-7 : uniquement les formules 20/20 et le piège éliminatoire"
            >
              <Zap className="size-3" />
              <span>Blitz J-7</span>
            </button>
            {detailBullets && detailBullets.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("detail");
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "detail"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ListChecks className="size-3" />
                <span>Détail ({detailBullets.length})</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0 ${
              isSpeaking
                ? "bg-rose-600 text-white border-rose-500 animate-pulse"
                : "bg-card hover:bg-muted text-foreground border-border/80"
            }`}
            title={
              isSpeaking
                ? "Arrêter la lecture vocale"
                : "Écouter la fiche en synthèse vocale (Audio TTS)"
            }
          >
            {isSpeaking ? (
              <Square className="size-3 fill-current" />
            ) : (
              <Volume2 className="size-3.5 text-amber-600 dark:text-amber-400" />
            )}
            <span className="hidden sm:inline">
              {isSpeaking ? "Stop" : "Écouter"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border/80 text-[11px] font-bold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
            title="Copier la fiche synthèse pour réviser"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="size-3.5 text-muted-foreground" />
            )}
            <span className="hidden xs:inline">
              {copied ? "Fiche copiée !" : "Copier"}
            </span>
          </button>
        </div>
      </div>

      {viewMode === "detail" && detailBullets ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-foreground/90 leading-relaxed">
          {detailBullets.map((pt, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 bg-card/85 p-3 rounded-2xl border border-border/50 shadow-2xs"
            >
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      ) : viewMode === "blitz" ? (
        <EncartEssentielBlitzView
          card={activeCard}
          copiedPunchlineIdx={copiedPunchlineIdx}
          onCopyPunchline={handleCopyPunchline}
        />
      ) : (
        <EncartEssentielFullView card={activeCard} />
      )}
    </div>
  );
}
