"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Copy,
  Check,
  Download,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  COMM_TEMPLATES,
  type CommTemplate,
  type CommVars,
} from "@/lib/pst/data/intervention-comms-data";

interface PstInterventionCommsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstInterventionCommsModal: React.FC<
  PstInterventionCommsModalProps
> = ({ isOpen, onClose }) => {
  const [selectedId, setSelectedId] = useState<string>(COMM_TEMPLATES[0].id);
  const [vars, setVars] = useState<CommVars>({
    orgName: "Groupe Industriel / Établissement Santé",
    recipientName: "Directeur des Ressources Humaines",
    practitionerName: "Auditeur Psychologue du Travail CNAM",
    serviceName: "Unité Logistique & Régulation",
  });
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"list" | "preview">("list");

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeTemplate =
    COMM_TEMPLATES.find((t) => t.id === selectedId) || COMM_TEMPLATES[0];

  const fullText = `OBJET : ${activeTemplate.subject(vars)}\n\n${activeTemplate.body(vars)}`;

  const handleCopy = () => {
    triggerHaptic("success");
    navigator.clipboard.writeText(fullText);
    playSuccessSound();
    setCopied(true);
    toast.success("Courrier institutionnel copié dans le presse-papiers.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    triggerHaptic("success");
    playClickSound();
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courrier_pst_${activeTemplate.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Générateur de Courriers et Communications d'Intervention Terrain"
      className="fixed inset-0 z-[130] flex items-center justify-center p-2 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-5xl bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-3.5 sm:px-5 py-3 sm:py-4 border-b border-border/80 flex items-center justify-between gap-2.5 sm:gap-3 bg-muted/20 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl bg-accent/15 text-accent border border-accent/30 flex items-center justify-center shrink-0">
              <Mail className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-accent/15 text-accent font-bold truncate block">
                COMMUNICATIONS OFFICIELLES
              </span>
              <h2 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-foreground m-0 mt-0.5 truncate">
                Générateur de Courriers Cliniques
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Dynamic Variables Bar */}
        <div className="p-3 sm:p-4 border-b border-border/70 bg-muted/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs shrink-0">
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Organisation / Entreprise
            </label>
            <input
              type="text"
              aria-label="Organisation ou Entreprise"
              value={vars.orgName}
              onChange={(e) => setVars({ ...vars, orgName: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Service / Unité observée
            </label>
            <input
              type="text"
              aria-label="Service ou Unité observée"
              value={vars.serviceName}
              onChange={(e) =>
                setVars({ ...vars, serviceName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Destinataire (DRH / Direction)
            </label>
            <input
              type="text"
              aria-label="Destinataire (DRH ou Direction)"
              value={vars.recipientName}
              onChange={(e) =>
                setVars({ ...vars, recipientName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Signataire (Intervenant PST)
            </label>
            <input
              type="text"
              aria-label="Signataire (Intervenant PST)"
              value={vars.practitionerName}
              onChange={(e) =>
                setVars({ ...vars, practitionerName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left selector */}
          <div
            className={`lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border/80 overflow-y-auto p-3 space-y-2 bg-muted/10 ${
              mobileTab === "list" ? "block" : "hidden lg:block"
            }`}
          >
            {COMM_TEMPLATES.map((tpl) => {
              const isSelected = tpl.id === activeTemplate.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    playClickSound();
                    setSelectedId(tpl.id);
                    setMobileTab("preview");
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent/10 shadow-xs"
                      : "border-border/80 bg-card hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      {tpl.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {tpl.recipientRole}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-foreground m-0">
                    {tpl.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Preview */}
          <div
            className={`lg:col-span-7 flex flex-col overflow-hidden p-3.5 sm:p-5 space-y-3 ${
              mobileTab === "preview" ? "flex" : "hidden lg:flex"
            }`}
          >
            {/* Mobile Back Button */}
            <div className="lg:hidden flex items-center justify-between pb-2 border-b border-border/80">
              <button
                type="button"
                onClick={() => setMobileTab("list")}
                className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline py-1"
              >
                <ChevronLeft className="size-4" />
                Retour aux modèles
              </button>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent font-bold">
                {activeTemplate.category}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 shrink-0">
              <span className="text-xs font-mono font-bold text-muted-foreground truncate">
                Destinataire : {activeTemplate.recipientRole}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span className="hidden sm:inline">Exporter .TXT</span>
                  <span className="sm:hidden">.TXT</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold transition-opacity cursor-pointer"
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span className="hidden sm:inline">{copied ? "Copié !" : "Copier le courrier"}</span>
                  <span className="sm:hidden">{copied ? "Copié" : "Copier"}</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 rounded-xl border border-border bg-background font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed select-all">
              {fullText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PstInterventionCommsModal;
