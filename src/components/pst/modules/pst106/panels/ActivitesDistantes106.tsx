"use client";

import { useState } from "react";
import {
  FileText,
  Calendar,
  Sparkles,
  Layers,
  Brain,
  GraduationCap,
} from "lucide-react";
import { PST106_UNIFIED_ADS } from "@/lib/pst/data/pst106-ad";
import { AdInteractiveWorkspace } from "@/components/pst/modules/shared/panels/AdInteractiveWorkspace";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { Ad106Cours1Section } from "./ad/Ad106Cours1Section";
import { Ad106Cours3Section } from "./ad/Ad106Cours3Section";
import { Ad106Ad1TaylorismeSection } from "./ad/Ad106Ad1TaylorismeSection";
import { Ad106Ad2HerzbergSection } from "./ad/Ad106Ad2HerzbergSection";
import { Ad106Ad3PacaudSection } from "./ad/Ad106Ad3PacaudSection";

export function ActivitesDistantes106() {
  const [activeAd, setActiveAd] = useState<"workspace" | "cours1" | "cours3" | "ad1" | "ad2" | "ad3">("workspace");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  function handleCopyForForum(text: string, sectionKey: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(null), 3000);
      playSuccessSound();
    }
  }

  return (
    <div className="space-y-6">
      {/* ── BANDEAU OFFICIEL SÉANCE CNAM ─────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 border border-amber-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5">
              <Calendar className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Séance du 23 octobre 2026</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30">
              Corrigé collectif : 28 octobre 2026 (1ère heure)
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Enseignante : Mme LAGABRIELLE (PST106)
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
            Activités Distantes (AD) · Préparation &amp; Analyse Critique du Travail
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
            « Exceptionnellement, au regard de l&apos;annulation du cours, les activités distantes vont être utiles pour préparer le cours en amont. La 1ère heure de la séance du 28 octobre sera consacrée aux corrigés collectifs. Vous pouvez déposer vos travaux sur le forum si vous le souhaitez. »
          </p>
        </div>
      </div>

      {/* ── SÉLECTEUR DES SÉANCES & ACTIVITÉS DISTANTES ─────────────────── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("workspace");
          }}
          className={`flex-1 min-w-[210px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "workspace"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="size-3.5 text-amber-300" />
          <span>Espace Rédaction Interactif ✦</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("cours1");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "cours1"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <GraduationCap className="size-3.5" />
          <span>Cours 1 · Cadre &amp; Conceptions</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("cours3");
          }}
          className={`flex-1 min-w-[210px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "cours3"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="size-3.5 text-amber-300" />
          <span>✨ Cours 3 · Facteur Humain (28 oct)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad1");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad1"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="size-3.5" />
          <span>AD 1 · Taylorisme &amp; Gilbreth</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad2");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad2"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Brain className="size-3.5" />
          <span>AD 2 · F. Herzberg (Motivations)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad3");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad3"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="size-3.5" />
          <span>AD 3 · S. Pacaud (Téléphonistes)</span>
        </button>
      </div>

      {/* ── ESPACE RÉDACTIONNEL INTERACTIF (AD 1, 2, 3) ────────────────── */}
      {activeAd === "workspace" && (
        <div className="animate-fadeIn">
          <AdInteractiveWorkspace
            ads={PST106_UNIFIED_ADS}
            moduleTheme="emerald"
          />
        </div>
      )}

      {/* ── CONTENU COURS 1 : CADRE THÉORIQUE & CONCEPTIONS ─────────────── */}
      {activeAd === "cours1" && (
        <Ad106Cours1Section
          onCopy={handleCopyForForum}
          copiedSection={copiedSection}
        />
      )}

      {/* ── CONTENU COURS 3 : DU FACTEUR HUMAIN À L'ACTIVITÉ ───────────── */}
      {activeAd === "cours3" && (
        <Ad106Cours3Section
          onCopy={handleCopyForForum}
          copiedSection={copiedSection}
        />
      )}

      {/* ── CONTENU AD 1 : TAYLORISME & GILBRETH ───────────────────────── */}
      {activeAd === "ad1" && (
        <Ad106Ad1TaylorismeSection
          onCopy={handleCopyForForum}
          copiedSection={copiedSection}
        />
      )}

      {/* ── CONTENU AD 2 : FREDERICK HERZBERG (MOTIVATIONS) ────────────── */}
      {activeAd === "ad2" && (
        <Ad106Ad2HerzbergSection
          onCopy={handleCopyForForum}
          copiedSection={copiedSection}
        />
      )}

      {/* ── CONTENU AD 3 : SUZANNE PACAUD (LES TÉLÉPHONISTES) ──────────── */}
      {activeAd === "ad3" && (
        <Ad106Ad3PacaudSection
          onCopy={handleCopyForForum}
          copiedSection={copiedSection}
        />
      )}
    </div>
  );
}
