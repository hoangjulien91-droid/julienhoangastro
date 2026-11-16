"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/components/common/Link";
import {
  Layers,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
  HardDrive,
  Scale,
  Smartphone,
} from "lucide-react";
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
import { computeGlobalStats, INDEX } from "@/lib/pst/hub-stats";
import { getNextEvent } from "@/lib/pst/planning-stats";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { getEssentielByUnit } from "@/lib/pst/data/essentiel-cours";
import { NextEventCard } from "./NextEventCard";
import { DailyWorkoutCard } from "./DailyWorkoutCard";
import { ModulePortalGrid } from "./ModulePortalGrid";
import { MatriceCourantsTheoriques } from "./MatriceCourantsTheoriques";

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

  const [activeTab, setActiveTab] = useState<
    "essentiel" | "exercices" | "referentiel" | "cursus"
  >("essentiel");
  const [essentielUeFilter, setEssentielUeFilter] = useState<
    "pst106" | "pst108" | "pst123" | "pst120" | "pst124"
  >("pst106");
  const [semesterFilter, setSemesterFilter] = useState<"all" | "s1" | "s2">(
    "s1",
  );
  const [resumeModule, setResumeModule] = useState<{
    id: string;
    label: string;
  }>({ id: "106", label: "PST106" });

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
        setEssentielUeFilter(
          bestMod as "pst106" | "pst108" | "pst123" | "pst120" | "pst124",
        );
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
      <div className="mt-2 sm:mt-4 mb-6 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                Titre RNCP Niveau 7 · Bac+5
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Conservatoire National des Arts et Métiers
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
              Poste de Pilotage PST
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
              5 Unités d&apos;Enseignement · Répétition Espacée SM-2 · Planning
              Bègles &amp; Visio
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setShowSyncModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700 cursor-pointer shadow-xs"
              title="Synchroniser vos révisions entre Mac et iPhone"
            >
              <Smartphone className="size-3.5 text-indigo-500" />
              <span>Synchro Mac ↔ Mobile</span>
            </button>
            <Link
              href={`/pst/${resumeModule.id}/`}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="size-3.5 text-white" />
              <span>Reprendre {resumeModule.label} →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2.bis. BARRE DE RECHERCHE UNIVERSELLE INSTANTANÉE */}
      <HubUniversalSearch />

      {/* 3. Contexte & Échéances Immédiates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <NextEventCard />
        <DailyWorkoutCard />
      </div>

      {/* 4. VOS 5 ATELIERS PST (Cœur du Travail — Immédiatement Accessible) */}
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

      {/* 5. SÉLECTEUR SEGMENTÉ iOS — Navigation Thématique Réajustée */}
      <div className="pt-2 mb-6 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex justify-center overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("essentiel")}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "essentiel"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              ✨ L&apos;Essentiel &amp; Synthèses
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("exercices")}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "exercices"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🎯 Outils 18/20 &amp; Exercices
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("referentiel")}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "referentiel"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📐 Schémas, Frise &amp; Lexique
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cursus")}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "cursus"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🎓 Cursus RNCP, Stats &amp; Synchro
            </button>
          </div>
        </div>
      </div>

      {/* 6. VUE ACTIVE DU SÉLECTEUR */}
      {activeTab === "essentiel" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* L'Essentiel des Cours par UE */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  L&apos;Essentiel des Cours (Thèse, Savoirs, Retenir, Auteurs &amp; Pièges)
                </h3>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 gap-1 flex-wrap">
                  {(
                    [
                      { id: "pst106", label: "PST106 · Clinique", num: "106" },
                      { id: "pst108", label: "PST108 · Langage", num: "108" },
                      { id: "pst123", label: "PST123 · Sociologie", num: "123" },
                      { id: "pst120", label: "PST120 · Santé", num: "120" },
                      { id: "pst124", label: "PST124 · Numérique", num: "124" },
                    ] as const
                  ).map((ue) => {
                    const isSelected = essentielUeFilter === ue.id;
                    return (
                      <button
                        key={ue.id}
                        type="button"
                        onClick={() => setEssentielUeFilter(ue.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {ue.label}
                      </button>
                    );
                  })}
                </div>

                <Link
                  href={`/pst/${essentielUeFilter.replace("pst", "")}/`}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Ouvrir {essentielUeFilter.toUpperCase()}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <EncartEssentielCours
              key={essentielUeFilter}
              cards={getEssentielByUnit(essentielUeFilter)}
            />
          </div>

          {/* Matrice Doctrinale des 7 Écoles */}
          <div
            id="matrice-doctrinale"
            className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Scale className="size-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  Matrice Comparée des 7 Courants Théoriques
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Synthèse Doctrinale Inter-UE
              </span>
            </div>
            <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs">
              <MatriceCourantsTheoriques />
            </div>
          </div>
        </div>
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

      {/* 7. Pied de Page Sobre */}
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
