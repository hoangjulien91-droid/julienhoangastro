"use client";

import React, { useState } from "react";
import {
  Scale,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  PROTOCOLS,
  type ProtocolId,
} from "@/lib/pst/data/clinical-protocols-data";

interface ClinicalProtocolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PstClinicalProtocolsModal({
  isOpen,
  onClose,
}: ClinicalProtocolsModalProps) {
  const [activeId, setActiveId] = useState<ProtocolId>("consentement");
  const [intervenant, setIntervenant] = useState(
    "Julien Hoang (Psychologue du Travail CNAM)",
  );
  const [organisation, setOrganisation] = useState(
    "Établissement / Organisation d'accueil",
  );
  const [collectif, setCollectif] = useState(
    "Collectif des opérateurs volontaires",
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const current = PROTOCOLS.find((p) => p.id === activeId) || PROTOCOLS[0];
  const generatedText = current.generateText(
    intervenant,
    organisation,
    collectif,
  );

  function handleCopy() {
    triggerHaptic("success");
    playSuccessSound();
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    toast.success("Protocole copié dans le presse-papier.");
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrint() {
    triggerHaptic("light");
    playClickSound();
    if (typeof document !== "undefined") {
      document.body.classList.add("printing-clinical-protocols");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing-clinical-protocols");
      }, 1000);
    } else {
      window.print();
    }
  }

  return (
    <div
      id="clinical-protocols-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Actes et Protocoles Cliniques d'Intervention"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        id="clinical-protocols-modal-card"
        className="relative w-full max-w-5xl max-h-[92vh] bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-3 sm:p-4 sm:px-6 border-b border-border bg-muted/20 flex items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Scale className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-xs sm:text-base font-serif font-bold text-foreground m-0 truncate">
                  Actes &amp; Protocoles Cliniques
                </h2>
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 shrink-0">
                  {current.code}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground m-0 truncate hidden sm:block">
                Cadres méthodologiques et déontologiques prêts pour vos dossiers
                CNAM et interventions terrain
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Protocol Tabs */}
        <div className="px-3 sm:px-4 py-2 border-b border-border/70 bg-background flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-xs shrink-0">
          {PROTOCOLS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveId(p.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeId === p.id
                  ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">{p.code}</span>
              <span>{p.label.split("(")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Dynamic variables inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl border border-border bg-muted/20 text-xs">
            <div>
              <label className="font-semibold text-foreground block mb-1 text-[11px]">
                Intervenant / Psychologue :
              </label>
              <input
                type="text"
                aria-label="Nom de l'intervenant ou psychologue"
                value={intervenant}
                onChange={(e) => setIntervenant(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1 text-[11px]">
                Organisation / Terrain :
              </label>
              <input
                type="text"
                aria-label="Organisation ou Terrain"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1 text-[11px]">
                Collectif de métier :
              </label>
              <input
                type="text"
                aria-label="Collectif de métier"
                value={collectif}
                onChange={(e) => setCollectif(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
              />
            </div>
          </div>

          {/* Legal reference banner */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-xs">
            <div className="flex items-center gap-2 text-accent font-semibold">
              <ShieldCheck className="size-4 shrink-0" />
              <span>
                Fondement réglementaire &amp; doctrinal : {current.refLegale}
              </span>
            </div>
          </div>

          {/* Document Output */}
          <pre className="p-5 rounded-xl border border-border bg-background font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap select-all overflow-x-auto scrollbar-none">
            {generatedText}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 sm:px-6 border-t border-border bg-muted/10 flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3 sm:px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Fermer
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="size-3.5 text-accent" />
              <span className="hidden sm:inline">Imprimer / PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-300" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span className="hidden sm:inline">Copier l'Acte Officiel</span>
                  <span className="sm:hidden">Copier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
