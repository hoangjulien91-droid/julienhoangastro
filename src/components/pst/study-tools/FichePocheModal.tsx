"use client";

import { useEffect, useState } from "react";
import { X, Printer, Copy, Check, FileText } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import { FichePochePst106 } from "./fiche-poche/FichePochePst106";
import { FichePochePst108 } from "./fiche-poche/FichePochePst108";
import { FichePochePst123 } from "./fiche-poche/FichePochePst123";
import { FichePochePst120 } from "./fiche-poche/FichePochePst120";
import { FichePochePst124 } from "./fiche-poche/FichePochePst124";

interface FichePocheModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

const MODULES_LIST = [
  { id: "pst106", short: "PST106", desc: "Clinique & Ergo" },
  { id: "pst108", short: "PST108", desc: "Langage & Dialogue" },
  { id: "pst123", short: "PST123", desc: "Identités & Déontologie" },
  { id: "pst120", short: "PST120", desc: "Psychodynamique (Dejours)" },
  { id: "pst124", short: "PST124", desc: "Organisation & Numérique" },
] as const;

export function FichePocheModal({
  isOpen,
  onClose,
  defaultModule = "pst108",
}: FichePocheModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "pst108",
  );
  const [copied, setCopied] = useState(false);

  // Synchronisation avec le module actif quand la modale s'ouvre ou defaultModule change
  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
    }
  }, [defaultModule, isOpen]);

  // Écoute des événements d'ouverture avec module spécifique en détail
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const targetMod = (e as CustomEvent)?.detail?.module;
      if (targetMod && /^pst(106|108|120|123|124)$/.test(targetMod)) {
        setSelectedModule(targetMod);
      }
    };
    window.addEventListener("pst:open-fiche-poche", handleEvent);
    return () =>
      window.removeEventListener("pst:open-fiche-poche", handleEvent);
  }, []);

  if (!isOpen) return null;

  function handlePrint() {
    triggerHaptic("success");
    playSuccessSound();
    if (typeof window !== "undefined") {
      document.body.classList.add("printing-fiche-poche");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing-fiche-poche");
      }, 1000);
    }
  }

  function handleCopy() {
    triggerHaptic("success");
    playSuccessSound();
    const el = document.getElementById("fiche-poche-content");
    if (!el) return;
    navigator.clipboard.writeText(el.innerText);
    setCopied(true);
    toast.success("Fiche mémo A4 copiée dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      id="fiche-poche-modal-overlay"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="fiche-poche-modal-card"
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-5 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER MODAL */}
        <div className="no-print flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
              <FileText className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 truncate">
                  Format A4 Recto-Verso
                </span>
                <span className="hidden sm:inline text-xs text-slate-500">
                  Synthèse d&apos;examen Cnam
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 m-0 truncate">
                Fiche Mémo ({selectedModule.toUpperCase()})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Imprimer ou enregistrer en PDF (A4)"
            >
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Imprimer A4 / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Copier le texte complet"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-600" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span className="hidden sm:inline">{copied ? "Copié !" : "Copier"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* SÉLECTEUR DE MODULES AVEC BADGES */}
        <div className="no-print flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap pb-1">
          {MODULES_LIST.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule(mod.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border active:scale-95 shrink-0 ${
                selectedModule === mod.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>{mod.short}</span>
              <span className="hidden sm:inline opacity-80"> · {mod.desc}</span>
            </button>
          ))}
        </div>

        {/* CONTENU IMPRIMABLE (Zone blanche haute densité optimisée print A4) */}
        <div
          id="fiche-poche-content"
          className="p-5 sm:p-6 rounded-2xl bg-white text-slate-900 border border-slate-300 shadow-inner space-y-3.5 text-xs font-sans leading-relaxed print:p-0 print:border-none print:shadow-none"
        >
          {selectedModule === "pst106" && <FichePochePst106 />}
          {selectedModule === "pst108" && <FichePochePst108 />}
          {selectedModule === "pst123" && <FichePochePst123 />}
          {selectedModule === "pst120" && <FichePochePst120 />}
          {selectedModule === "pst124" && <FichePochePst124 />}
        </div>
      </div>
    </div>
  );
}
