"use client";

/**
 * Root wrapper for every /pst* route. Intentionally does NOT render the
 * site's Navbar/Footer (InnerPageLayout) — these are self-contained app
 * pages (quiz/flashcards), not editorial content, matching the standalone
 * HTML documents the original Astro pages were.
 */

import "./pst-globals.css";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Columns2,
  Maximize2,
  Minimize2,
  NotebookPen,
  BookOpen,
  Send,
  Search,
  ArrowUp,
} from "lucide-react";
import { PstThemeProvider } from "./PstThemeProvider";
import { CurrentCardProvider } from "./CurrentCardContext";
import { StudyTools } from "@/components/pst/study-tools/StudyTools";
import { PstCommandPalette } from "./PstCommandPalette";
import { PstAudioPodcastPlayer } from "./PstAudioPodcastPlayer";
import { MatchAuteursModal } from "@/components/pst/study-tools/MatchAuteursModal";
import { CoffreDefinitionsModal } from "@/components/pst/study-tools/CoffreDefinitionsModal";
import { FichePocheModal } from "@/components/pst/study-tools/FichePocheModal";
import { SpeedRunChronoModal } from "@/components/pst/study-tools/SpeedRunChronoModal";
import { PiegesDetectiveModal } from "@/components/pst/study-tools/PiegesDetectiveModal";
import { SujetsDissertationModal } from "@/components/pst/study-tools/SujetsDissertationModal";
import { SimulateurJeuDeRoleModal } from "@/components/pst/study-tools/SimulateurJeuDeRoleModal";
import { SchemasMatricesModal } from "@/components/pst/study-tools/SchemasMatricesModal";
import { BlindTestAudioModal } from "@/components/pst/study-tools/BlindTestAudioModal";
import { ChronologieHistoriqueModal } from "@/components/pst/study-tools/ChronologieHistoriqueModal";
import { Pst106Page } from "@/components/pst/modules/pst106/Pst106Page";
import { Pst108Page } from "@/components/pst/modules/pst108/Pst108Page";
import { Pst120Page } from "@/components/pst/modules/pst120/Pst120Page";
import { Pst123Page } from "@/components/pst/modules/pst123/Pst123Page";
import { Pst124Page } from "@/components/pst/modules/pst124/Pst124Page";
import { PlanningContent } from "@/components/pst/planning/PlanningContent";
import { INDEX } from "@/lib/pst/hub-stats";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface PstPageShellProps {
  moduleKey: string;
  children?: ReactNode;
  /** Désactive le max-width: 760px de `.wrap` (cf. planning.css) pour les
   * pages qui ont besoin de toute la largeur de l'écran, comme la frise du
   * planning — inutile pour les pages quiz/flashcards, centrées à dessein. */
  wide?: boolean;
}

type LayoutMode = "standard" | "wide" | "split";

export function PstPageShell({ moduleKey, children, wide }: PstPageShellProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matchAuteursOpen, setMatchAuteursOpen] = useState(false);
  const [definitionsOpen, setDefinitionsOpen] = useState(false);
  const [fichePocheOpen, setFichePocheOpen] = useState(false);
  const [speedRunOpen, setSpeedRunOpen] = useState(false);
  const [detectiveOpen, setDetectiveOpen] = useState(false);
  const [sujetsOpen, setSujetsOpen] = useState(false);
  const [roleplayOpen, setRoleplayOpen] = useState(false);
  const [schemasOpen, setSchemasOpen] = useState(false);
  const [blindTestOpen, setBlindTestOpen] = useState(false);
  const [chronologieOpen, setChronologieOpen] = useState(false);
  const isWorkshopModule = /^pst(106|108|120|123|124)$/.test(moduleKey);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("standard");
  const [sideTab, setSideTab] = useState<"notes" | "lexique">("notes");
  const [scratchNotes, setScratchNotes] = useState("");
  const [sideSearch, setSideSearch] = useState("");

  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true);
    const handleOpenMatch = () => setMatchAuteursOpen(true);
    const handleOpenDefs = () => setDefinitionsOpen(true);
    const handleOpenPoche = () => setFichePocheOpen(true);
    const handleOpenSpeedRun = () => setSpeedRunOpen(true);
    const handleOpenDetective = () => setDetectiveOpen(true);
    const handleOpenSujets = () => setSujetsOpen(true);
    const handleOpenRoleplay = () => setRoleplayOpen(true);
    const handleOpenSchemas = () => setSchemasOpen(true);
    const handleOpenBlindTest = () => setBlindTestOpen(true);
    const handleOpenChronologie = () => setChronologieOpen(true);

    window.addEventListener("pst:open-command-palette", handleOpenPalette);
    window.addEventListener("pst:open-match-auteurs", handleOpenMatch);
    window.addEventListener("pst:open-definitions", handleOpenDefs);
    window.addEventListener("pst:open-fiche-poche", handleOpenPoche);
    window.addEventListener("pst:open-speed-run", handleOpenSpeedRun);
    window.addEventListener("pst:open-detective", handleOpenDetective);
    window.addEventListener("pst:open-sujets-dissertation", handleOpenSujets);
    window.addEventListener("pst:open-roleplay", handleOpenRoleplay);
    window.addEventListener("pst:open-schemas", handleOpenSchemas);
    window.addEventListener("pst:open-blind-test", handleOpenBlindTest);
    window.addEventListener("pst:open-chronologie", handleOpenChronologie);

    const openBtn = document.getElementById("open-command-palette-btn");
    if (openBtn) {
      openBtn.addEventListener("click", handleOpenPalette);
    }
    return () => {
      window.removeEventListener("pst:open-command-palette", handleOpenPalette);
      window.removeEventListener("pst:open-match-auteurs", handleOpenMatch);
      window.removeEventListener("pst:open-definitions", handleOpenDefs);
      window.removeEventListener("pst:open-fiche-poche", handleOpenPoche);
      window.removeEventListener("pst:open-speed-run", handleOpenSpeedRun);
      window.removeEventListener("pst:open-detective", handleOpenDetective);
      window.removeEventListener("pst:open-sujets-dissertation", handleOpenSujets);
      window.removeEventListener("pst:open-roleplay", handleOpenRoleplay);
      window.removeEventListener("pst:open-schemas", handleOpenSchemas);
      window.removeEventListener("pst:open-blind-test", handleOpenBlindTest);
      window.removeEventListener("pst:open-chronologie", handleOpenChronologie);
      if (openBtn) {
        openBtn.removeEventListener("click", handleOpenPalette);
      }
    };
  }, []);

  useEffect(() => {
    if (!isWorkshopModule) return;
    try {
      const savedMode = localStorage.getItem("pst_layout_mode_v1") as LayoutMode | null;
      if (savedMode === "standard" || savedMode === "wide" || savedMode === "split") {
        setLayoutMode(savedMode);
      }
      const savedNote = localStorage.getItem(`pst_scratch_${moduleKey}`) ?? "";
      setScratchNotes(savedNote);
    } catch {
      // ignore
    }
  }, [isWorkshopModule, moduleKey]);

  function changeLayoutMode(mode: LayoutMode) {
    playClickSound();
    setLayoutMode(mode);
    try {
      localStorage.setItem("pst_layout_mode_v1", mode);
    } catch {
      // ignore
    }
  }

  function handleSaveScratch(val: string) {
    setScratchNotes(val);
    try {
      localStorage.setItem(`pst_scratch_${moduleKey}`, val);
    } catch {
      // ignore
    }
  }

  function sendScratchToFieldJournal() {
    if (!scratchNotes.trim()) return;
    try {
      const raw = localStorage.getItem("pst_field_journal_v1");
      const current = raw ? JSON.parse(raw) : [];
      const now = new Date();
      const stamp = `${now.toLocaleDateString("fr-FR")} · ${now
        .toTimeString()
        .slice(0, 5)}`;
      const next = [
        {
          id: "fj-" + Date.now(),
          timestamp: stamp,
          ue: moduleKey.toUpperCase(),
          category: "note_reflexive",
          operatorCode: `Split-View ${moduleKey.toUpperCase()}`,
          content: scratchNotes.trim(),
        },
        ...current,
      ];
      localStorage.setItem("pst_field_journal_v1", JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      toast.success(`Notes envoyées vers la Chronique de Terrain (${moduleKey.toUpperCase()})`);
    } catch {
      // ignore
    }
  }

  const sideGlossary = useMemo(() => {
    const q = sideSearch.trim().toLowerCase();
    const list = INDEX.glossaire.filter((g) =>
      q
        ? g.w.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)
        : g.m === moduleKey,
    );
    return list.slice(0, 25);
  }, [sideSearch, moduleKey]);

  const resolvedContent =
    children ??
    (moduleKey === "pst106" ? (
      <Pst106Page />
    ) : moduleKey === "pst108" ? (
      <Pst108Page />
    ) : moduleKey === "pst120" ? (
      <Pst120Page />
    ) : moduleKey === "pst123" ? (
      <Pst123Page />
    ) : moduleKey === "pst124" ? (
      <Pst124Page />
    ) : moduleKey === "planning" ? (
      <PlanningContent />
    ) : null);

  const isEffectiveWide = wide || layoutMode === "wide" || layoutMode === "split";

  return (
    <PstThemeProvider moduleKey={moduleKey}>
      <CurrentCardProvider>
        {isWorkshopModule && (
          <div className="hidden lg:flex items-center justify-end gap-2 max-w-6xl mx-auto mb-3">
            <div className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1 rounded-xl shadow-2xs text-xs">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Affichage iPadOS :
              </span>
              <button
                type="button"
                onClick={() => changeLayoutMode("standard")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "standard"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Colonne centrée de lecture (760px)"
              >
                <Minimize2 className="size-3.5" />
                <span>Confort</span>
              </button>
              <button
                type="button"
                onClick={() => changeLayoutMode("wide")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "wide"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Mode Large (1120px)"
              >
                <Maximize2 className="size-3.5" />
                <span>Large</span>
              </button>
              <button
                type="button"
                onClick={() => changeLayoutMode("split")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "split"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Double écran : Atelier à gauche + Calepin & Glossaire épinglé à droite"
              >
                <Columns2 className="size-3.5" />
                <span>Double Écran Calepin</span>
              </button>
            </div>
          </div>
        )}

        <div
          className={
            isWorkshopModule && layoutMode === "split"
              ? "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              : undefined
          }
        >
          <div
            className={
              isWorkshopModule && layoutMode === "split"
                ? "lg:col-span-8 min-w-0"
                : `wrap${isEffectiveWide ? " wrap-wide" : ""}`
            }
          >
            {resolvedContent}
          </div>

          {isWorkshopModule && layoutMode === "split" && (
            <aside
              aria-label="Panneau latéral Double Écran : Calepin et Glossaire"
              className="hidden lg:flex lg:col-span-4 sticky top-16 flex-col rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-md overflow-hidden"
            >
              {/* Segmented Switcher Notes / Lexique */}
              <div className="p-2.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/50 flex items-center justify-between gap-2">
                <div className="grid grid-cols-2 gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl w-full text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSideTab("notes")}
                    className={`py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      sideTab === "notes"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <NotebookPen className="size-3.5 text-amber-600" />
                    <span>Calepin {moduleKey.toUpperCase()}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSideTab("lexique")}
                    className={`py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      sideTab === "lexique"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <BookOpen className="size-3.5 text-amber-600" />
                    <span>Glossaire ({sideGlossary.length})</span>
                  </button>
                </div>
              </div>

              {sideTab === "notes" ? (
                <div className="p-3.5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold">
                      Synthèse &amp; arguments d&apos;examen ({moduleKey.toUpperCase()})
                    </span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                      Auto-sauvegardé
                    </span>
                  </div>
                  <textarea
                    value={scratchNotes}
                    onChange={(e) => handleSaveScratch(e.target.value)}
                    rows={12}
                    placeholder={`Notez ici vos articulations théoriques, citations clés ou plans de copie pendant votre lecture de ${moduleKey.toUpperCase()}...`}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500 resize-y"
                  />
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {scratchNotes.length} caract.
                    </span>
                    <button
                      type="button"
                      onClick={sendScratchToFieldJournal}
                      disabled={!scratchNotes.trim()}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Send className="size-3.5" />
                      <span>Vers Chronique Terrain</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 space-y-2.5 max-h-[70vh] flex flex-col">
                  <div className="relative">
                    <Search className="size-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      value={sideSearch}
                      onChange={(e) => setSideSearch(e.target.value)}
                      placeholder="Chercher dans tout le glossaire PST..."
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                    {sideGlossary.map((g, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs"
                      >
                        <div className="flex items-center justify-between gap-1 font-bold text-slate-900 dark:text-slate-100 mb-0.5">
                          <span>{g.w}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {g.m.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0 leading-snug">
                          {g.def}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>

        <StudyTools moduleKey={moduleKey} />
        <PstCommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
        <MatchAuteursModal
          isOpen={matchAuteursOpen}
          onClose={() => setMatchAuteursOpen(false)}
        />
        <CoffreDefinitionsModal
          isOpen={definitionsOpen}
          onClose={() => setDefinitionsOpen(false)}
        />
        <FichePocheModal
          isOpen={fichePocheOpen}
          onClose={() => setFichePocheOpen(false)}
          defaultModule={moduleKey}
        />
        <SpeedRunChronoModal
          isOpen={speedRunOpen}
          onClose={() => setSpeedRunOpen(false)}
          defaultModule={moduleKey}
        />
        <PiegesDetectiveModal
          isOpen={detectiveOpen}
          onClose={() => setDetectiveOpen(false)}
          defaultModule={moduleKey}
        />
        <SujetsDissertationModal
          isOpen={sujetsOpen}
          onClose={() => setSujetsOpen(false)}
          defaultModule={moduleKey}
        />
        <SimulateurJeuDeRoleModal
          isOpen={roleplayOpen}
          onClose={() => setRoleplayOpen(false)}
          defaultModule={moduleKey}
        />
        <SchemasMatricesModal
          isOpen={schemasOpen}
          onClose={() => setSchemasOpen(false)}
          defaultModule={moduleKey}
        />
        <BlindTestAudioModal
          isOpen={blindTestOpen}
          onClose={() => setBlindTestOpen(false)}
          defaultModule={moduleKey}
        />
        <ChronologieHistoriqueModal
          isOpen={chronologieOpen}
          onClose={() => setChronologieOpen(false)}
          defaultModule={moduleKey}
        />
        <PstAudioPodcastPlayer />
        <Toaster />
      </CurrentCardProvider>
    </PstThemeProvider>
  );
}

