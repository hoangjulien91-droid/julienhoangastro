"use client";

import { useMemo, useState } from "react";
import { Sparkles, BookOpen } from "lucide-react";
import {
  PST108_AD_DATA,
  PST108_UNIFIED_ADS,
  type Pst108TeacherAd,
} from "@/lib/pst/data/pst108-ad";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { AdInteractiveWorkspace } from "@/components/pst/modules/shared/panels/AdInteractiveWorkspace";
import { Ad108HeaderBanner } from "./ad/Ad108HeaderBanner";
import { Ad108TeacherHeader } from "./ad/Ad108TeacherHeader";
import { AdTeacherMarotSection } from "./ad/AdTeacherMarotSection";
import { AdTeacherVallsSection } from "./ad/AdTeacherVallsSection";
import { AdTeacherLucySection } from "./ad/AdTeacherLucySection";

export function ActivitesDistantes108() {
  const [mode, setMode] = useState<"workspace" | "professeurs">("workspace");
  const [activeProf, setActiveProf] = useState<"lucy" | "valls" | "marot">("marot");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCasId, setExpandedCasId] = useState<string | null>(null);

  // Sous-onglets spécifiques pour Francis Valls
  const [vallsTab, setVallsTab] = useState<"exercices" | "cas" | "theorie" | "docs">("exercices");
  const [selectedExNum, setSelectedExNum] = useState<number>(1);

  // Sous-onglets spécifiques pour Véronique Marot
  const [marotTab, setMarotTab] = useState<"dispositifs" | "ad_miossec" | "theorie" | "textes">("dispositifs");
  const [selectedDispId, setSelectedDispId] = useState<string>("marot-disp-sosie");
  const [selectedAdDate, setSelectedAdDate] = useState<"04nov" | "10nov">("04nov");

  const teacherData: Pst108TeacherAd = PST108_AD_DATA[activeProf];

  function handleCopy(text: string, key: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 3000);
      playSuccessSound();
    }
  }

  // Filtrage des documents (pour M. Lucy)
  const filteredDocs = useMemo(() => {
    let docs = teacherData.documentsClefs;
    if (activeProf === "lucy" && selectedCat !== "all") {
      docs = docs.filter((d) => d.categorie === selectedCat);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      docs = docs.filter(
        (d) =>
          d.titre.toLowerCase().includes(q) ||
          d.auteur.toLowerCase().includes(q) ||
          d.fichierLocal.toLowerCase().includes(q) ||
          d.concept18.toLowerCase().includes(q) ||
          d.resumePedagogique.toLowerCase().includes(q),
      );
    }
    return docs;
  }, [teacherData.documentsClefs, activeProf, selectedCat, searchQuery]);

  return (
    <div className="space-y-6">
      <Ad108HeaderBanner />

      {/* ── SÉLECTEUR DE MODE : ESPACE RÉDACTION VS RESSOURCES PROFESSEURS ── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setMode("workspace");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            mode === "workspace"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="size-4 text-amber-300" />
          <span>Espace Rédaction Interactif ({PST108_UNIFIED_ADS.length} AD PST108) ✦</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setMode("professeurs");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            mode === "professeurs"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="size-4" />
          <span>Ressources &amp; Dispositifs des 3 Profs (Marot, Valls, Lucy)</span>
        </button>
      </div>

      {mode === "workspace" ? (
        <div className="animate-fadeIn">
          <AdInteractiveWorkspace
            ads={PST108_UNIFIED_ADS}
            moduleTheme="amber"
          />
        </div>
      ) : (
        <>
          <Ad108TeacherHeader
            activeProf={activeProf}
            onSelectProf={(p) => {
              setActiveProf(p);
              setSelectedDocId(null);
              if (p === "lucy") setSelectedCat("all");
            }}
            teacherData={teacherData}
          />

          {/* ── CONTENU SPÉCIFIQUE MME VÉRONIQUE MAROT ── */}
          {activeProf === "marot" && (
            <AdTeacherMarotSection
              teacherData={teacherData}
              marotTab={marotTab}
              onMarotTabChange={setMarotTab}
              selectedAdDate={selectedAdDate}
              onSelectAdDate={setSelectedAdDate}
              selectedDispId={selectedDispId}
              onSelectDispId={setSelectedDispId}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
              onCopy={handleCopy}
              copiedKey={copiedKey}
            />
          )}

          {/* ── CONTENU M. FRANCIS VALLS ── */}
          {activeProf === "valls" && (
            <AdTeacherVallsSection
              teacherData={teacherData}
              vallsTab={vallsTab}
              onVallsTabChange={setVallsTab}
              selectedExNum={selectedExNum}
              onSelectExNum={setSelectedExNum}
              expandedCasId={expandedCasId}
              onToggleExpandedCasId={setExpandedCasId}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
              onCopy={handleCopy}
              copiedKey={copiedKey}
            />
          )}

          {/* ── CONTENU M. ÉRIC LUCY (31 DOCUMENTS & AD) ── */}
          {activeProf === "lucy" && (
            <AdTeacherLucySection
              teacherData={teacherData}
              selectedCat={selectedCat}
              onSelectCat={setSelectedCat}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              filteredDocs={filteredDocs}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
              onCopy={handleCopy}
              copiedKey={copiedKey}
            />
          )}
        </>
      )}
    </div>
  );
}
