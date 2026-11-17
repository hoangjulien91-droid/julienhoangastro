"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/components/common/Link";
import { Layers } from "lucide-react";
import {
  restoreGlobalPstData,
  copyPstSyncCode,
  restorePstFromSyncCode,
} from "@/lib/pst/global-sync";
import { HubSyncModal } from "./HubSyncModal";
import { HubUniversalSearch } from "./HubUniversalSearch";
import { HubExercicesPanel } from "./HubExercicesPanel";
import { HubReferentielPanel } from "./HubReferentielPanel";
import { HubProgressionPanel } from "./HubProgressionPanel";
import { computeGlobalStats } from "@/lib/pst/hub-stats";
import { getNextEvent } from "@/lib/pst/planning-stats";
import { NextEventCard } from "./NextEventCard";
import { DailyWorkoutCard } from "./DailyWorkoutCard";
import { ModulePortalGrid } from "./ModulePortalGrid";
import { HubHeader } from "./HubHeader";
import { HubTabBar, type HubTab } from "./HubTabBar";
import { HubEssentielTab, type EssentielUnitId } from "./HubEssentielTab";

export function HubContent() {
  const [stats, setStats] = useState(() => computeGlobalStats());
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncCopied, setSyncCopied] = useState(false);
  const [pasteCode, setPasteCode] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleStorageUpdate = () => setStats(computeGlobalStats());
    window.addEventListener("pst:storage-updated", handleStorageUpdate);
    return () =>
      window.removeEventListener("pst:storage-updated", handleStorageUpdate);
  }, []);

  async function handleCopySync() {
    const ok = await copyPstSyncCode();
    if (ok) {
      setSyncCopied(true);
      setTimeout(() => setSyncCopied(false), 3000);
    }
  }

  function handlePasteSync() {
    if (!pasteCode.trim()) return;
    const ok = restorePstFromSyncCode(pasteCode);
    if (ok) {
      setPasteCode("");
      setShowSyncModal(false);
      setStats(computeGlobalStats());
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result;
      if (typeof content === "string") {
        const ok = restoreGlobalPstData(content);
        if (ok) {
          setShowSyncModal(false);
          setStats(computeGlobalStats());
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  const [activeTab, setActiveTab] = useState<HubTab>("essentiel");
  const [essentielUeFilter, setEssentielUeFilter] = useState<EssentielUnitId>("pst106");
  const [semesterFilter, setSemesterFilter] = useState<"all" | "s1" | "s2">("s1");
  const [resumeModule, setResumeModule] = useState<{ id: string; label: string }>({
    id: "106",
    label: "PST106",
  });

  useEffect(() => {
    try {
      const candidates = ["pst106", "pst108", "pst123", "pst120", "pst124"];
      let bestMod = "";
      let bestDate = "";
      for (const mod of candidates) {
        const visited = window.localStorage.getItem("st_visit_" + mod);
        if (visited && visited >= bestDate) {
          bestDate = visited;
          bestMod = mod;
        }
      }
      if (!bestMod) {
        const nextEv = getNextEvent();
        if (nextEv?.unit) bestMod = nextEv.unit.toLowerCase();
      }
      if (bestMod && /^pst(106|108|120|123|124)$/.test(bestMod)) {
        const num = bestMod.replace("pst", "");
        setResumeModule({ id: num, label: `PST${num}` });
        setEssentielUeFilter(bestMod as EssentielUnitId);
      }
    } catch {
      // ignore
    }

    const checkHash = () => {
      const h = window.location.hash;
      if (h === "#matrice-doctrinale") {
        setActiveTab("essentiel");
        setTimeout(() => {
          const el = document.querySelector(h);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      } else if (h === "#concepts") {
        setActiveTab("referentiel");
        setTimeout(() => {
          const el = document.querySelector(h);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      } else if (h === "#pyramide") {
        setActiveTab("cursus");
        setTimeout(() => {
          const el = document.querySelector(h);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div className="pb-16 max-w-7xl mx-auto">
      {/* En-tête Épuré iOS — Minimaliste & Fonctionnel */}
      <HubHeader
        resumeModule={resumeModule}
        onOpenSyncModal={() => setShowSyncModal(true)}
      />

      {/* Barre de Recherche Universelle */}
      <HubUniversalSearch />

      {/* Contexte & Échéances Immédiates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <NextEventCard />
        <DailyWorkoutCard />
      </div>

      {/* Ateliers PST au Programme */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 px-1">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
              Ateliers PST au Programme
            </h2>
          </div>

          {/* Toggle de filtrage par Semestre */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSemesterFilter("s1")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                semesterFilter === "s1"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Semestre 1 Actif (3)
            </button>
            <button
              type="button"
              onClick={() => setSemesterFilter("all")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                semesterFilter === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Tous (5)
            </button>
            <button
              type="button"
              onClick={() => setSemesterFilter("s2")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                semesterFilter === "s2"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Semestre 2 (2)
            </button>
          </div>
        </div>
        <ModulePortalGrid
          allStats={stats.allStats}
          semesterFilter={semesterFilter}
          onInspect={(moduleId) =>
            window.dispatchEvent(
              new CustomEvent("pst:open-atelier-slideover", {
                detail: { moduleId },
              }),
            )
          }
        />
      </div>

      {/* Sélecteur Segmenté iOS */}
      <HubTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Vue Active du Sélecteur */}
      {activeTab === "essentiel" && (
        <HubEssentielTab
          essentielUeFilter={essentielUeFilter}
          onSelectUe={setEssentielUeFilter}
        />
      )}

      {activeTab === "exercices" && (
        <HubExercicesPanel unitId={essentielUeFilter} />
      )}

      {activeTab === "referentiel" && <HubReferentielPanel />}

      {activeTab === "cursus" && (
        <HubProgressionPanel
          stats={stats}
          syncCopied={syncCopied}
          onCopySync={handleCopySync}
          onOpenSyncModal={() => setShowSyncModal(true)}
          onTriggerFileInput={() => fileInputRef.current?.click()}
        />
      )}

      {/* Modal Universelle Synchro */}
      <HubSyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        syncCopied={syncCopied}
        onCopySync={handleCopySync}
        pasteCode={pasteCode}
        onChangePasteCode={setPasteCode}
        onPasteSync={handlePasteSync}
        onTriggerFileInput={() => fileInputRef.current?.click()}
      />

      {/* Input de fichier caché pour restauration JSON */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Pied de Page Sobre */}
      <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <Link
          className="font-medium hover:text-slate-900 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-1"
          href="/"
        >
          ← Retour à l&apos;accueil du site
        </Link>
        <span className="font-mono text-[11px]">
          Psychologie du Travail Cnam · Titre RNCP 7
        </span>
      </div>
    </div>
  );
}
