"use client";

/**
 * Root wrapper for every /pst* route. Intentionally does NOT render the
 * site's Navbar/Footer (InnerPageLayout) — these are self-contained app
 * pages (quiz/flashcards), not editorial content, matching the standalone
 * HTML documents the original Astro pages were.
 */

import "./pst-globals.css";
import {
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
  type ReactNode,
} from "react";
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
import { PstAudioPodcastPlayer } from "./PstAudioPodcastPlayer";

// Lazy-loaded Study Modals to reduce initial bundle size by > 80%
const MatchAuteursModal = lazy(() =>
  import("@/components/pst/study-tools/MatchAuteursModal").then((m) => ({
    default: m.MatchAuteursModal,
  })),
);
const CoffreDefinitionsModal = lazy(() =>
  import("@/components/pst/study-tools/CoffreDefinitionsModal").then((m) => ({
    default: m.CoffreDefinitionsModal,
  })),
);
const FichePocheModal = lazy(() =>
  import("@/components/pst/study-tools/FichePocheModal").then((m) => ({
    default: m.FichePocheModal,
  })),
);
const SpeedRunChronoModal = lazy(() =>
  import("@/components/pst/study-tools/SpeedRunChronoModal").then((m) => ({
    default: m.SpeedRunChronoModal,
  })),
);
const PiegesDetectiveModal = lazy(() =>
  import("@/components/pst/study-tools/PiegesDetectiveModal").then((m) => ({
    default: m.PiegesDetectiveModal,
  })),
);
const SujetsDissertationModal = lazy(() =>
  import("@/components/pst/study-tools/SujetsDissertationModal").then((m) => ({
    default: m.SujetsDissertationModal,
  })),
);
const SimulateurJeuDeRoleModal = lazy(() =>
  import("@/components/pst/study-tools/SimulateurJeuDeRoleModal").then((m) => ({
    default: m.SimulateurJeuDeRoleModal,
  })),
);
const SchemasMatricesModal = lazy(() =>
  import("@/components/pst/study-tools/SchemasMatricesModal").then((m) => ({
    default: m.SchemasMatricesModal,
  })),
);
const BlindTestAudioModal = lazy(() =>
  import("@/components/pst/study-tools/BlindTestAudioModal").then((m) => ({
    default: m.BlindTestAudioModal,
  })),
);
const ChronologieHistoriqueModal = lazy(() =>
  import("@/components/pst/study-tools/ChronologieHistoriqueModal").then(
    (m) => ({ default: m.ChronologieHistoriqueModal }),
  ),
);
const PalaisMemoireModal = lazy(() =>
  import("@/components/pst/study-tools/PalaisMemoireModal").then((m) => ({
    default: m.PalaisMemoireModal,
  })),
);
const PstBriefing30sModal = lazy(() =>
  import("@/components/pst/hub/PstBriefing30sModal").then((m) => ({
    default: m.PstBriefing30sModal,
  })),
);
const PontsTransversauxModal = lazy(() =>
  import("@/components/pst/study-tools/PontsTransversauxModal").then((m) => ({
    default: m.PontsTransversauxModal,
  })),
);
const PstCommandPalette = lazy(() =>
  import("./PstCommandPalette").then((m) => ({ default: m.PstCommandPalette })),
);

const Pst106Page = lazy(() =>
  import("@/components/pst/modules/pst106/Pst106Page").then((m) => ({
    default: m.Pst106Page,
  })),
);
const Pst108Page = lazy(() =>
  import("@/components/pst/modules/pst108/Pst108Page").then((m) => ({
    default: m.Pst108Page,
  })),
);
const Pst120Page = lazy(() =>
  import("@/components/pst/modules/pst120/Pst120Page").then((m) => ({
    default: m.Pst120Page,
  })),
);
const Pst123Page = lazy(() =>
  import("@/components/pst/modules/pst123/Pst123Page").then((m) => ({
    default: m.Pst123Page,
  })),
);
const Pst124Page = lazy(() =>
  import("@/components/pst/modules/pst124/Pst124Page").then((m) => ({
    default: m.Pst124Page,
  })),
);
const PlanningContent = lazy(() =>
  import("@/components/pst/planning/PlanningContent").then((m) => ({
    default: m.PlanningContent,
  })),
);

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
  const [matchAuteursOpen, setMatchAuteursOpen] = useState(false);
  const [definitionsOpen, setDefinitionsOpen] = useState(false);
  const [fichePocheOpen, setFichePocheOpen] = useState(false);
  const [fichePocheModule, setFichePocheModule] = useState(
    /^pst(106|108|120|123|124)$/.test(moduleKey) ? moduleKey : "pst108",
  );
  const [speedRunOpen, setSpeedRunOpen] = useState(false);

  useEffect(() => {
    if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
      setFichePocheModule(moduleKey);
    }
  }, [moduleKey]);
  const [detectiveOpen, setDetectiveOpen] = useState(false);
  const [sujetsOpen, setSujetsOpen] = useState(false);
  const [roleplayOpen, setRoleplayOpen] = useState(false);
  const [schemasOpen, setSchemasOpen] = useState(false);
  const [blindTestOpen, setBlindTestOpen] = useState(false);
  const [chronologieOpen, setChronologieOpen] = useState(false);
  const [palaisMemoireOpen, setPalaisMemoireOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [pontsTransversauxOpen, setPontsTransversauxOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const isWorkshopModule = /^pst(106|108|120|123|124)$/.test(moduleKey);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("standard");
  const [sideTab, setSideTab] = useState<"notes" | "lexique">("notes");
  const [scratchNotes, setScratchNotes] = useState("");
  const [sideSearch, setSideSearch] = useState("");

  useEffect(() => {
    const handleOpenMatch = () => setMatchAuteursOpen(true);
    const handleOpenDefs = () => setDefinitionsOpen(true);
    const handleOpenPoche = (e?: Event) => {
      const customMod = (e as CustomEvent)?.detail?.module;
      if (customMod && /^pst(106|108|120|123|124)$/.test(customMod)) {
        setFichePocheModule(customMod);
      } else if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
        setFichePocheModule(moduleKey);
      }
      setFichePocheOpen(true);
    };
    const handleOpenSpeedRun = () => setSpeedRunOpen(true);
    const handleOpenDetective = () => setDetectiveOpen(true);
    const handleOpenSujets = () => setSujetsOpen(true);
    const handleOpenRoleplay = () => setRoleplayOpen(true);
    const handleOpenSchemas = () => setSchemasOpen(true);
    const handleOpenBlindTest = () => setBlindTestOpen(true);
    const handleOpenChronologie = () => setChronologieOpen(true);
    const handleOpenPalaisMemoire = () => setPalaisMemoireOpen(true);
    const handleOpenBriefing = () => setBriefingOpen(true);
    const handleOpenPonts = () => setPontsTransversauxOpen(true);
    const handleOpenCommandPalette = () => setCommandPaletteOpen(true);

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
    window.addEventListener("pst:open-palais-memoire", handleOpenPalaisMemoire);
    window.addEventListener("pst:open-briefing-30s", handleOpenBriefing);
    window.addEventListener("pst:open-ponts-transversaux", handleOpenPonts);
    window.addEventListener(
      "pst:open-command-palette",
      handleOpenCommandPalette,
    );

    // Global shortcut Ctrl+K / Cmd+K
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Support ouverture directe via paramètre d'URL ?open=
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const openParam = params.get("open");
        if (openParam) {
          if (openParam === "pst:open-briefing-30s") setBriefingOpen(true);
          else if (openParam === "pst:open-fiche-poche")
            setFichePocheOpen(true);
          else if (openParam === "pst:open-schemas") setSchemasOpen(true);
          else if (openParam === "pst:open-speed-run") setSpeedRunOpen(true);
          else if (openParam === "pst:open-detective") setDetectiveOpen(true);
          else if (openParam === "pst:open-sujets-dissertation")
            setSujetsOpen(true);
          else if (openParam === "pst:open-roleplay") setRoleplayOpen(true);
          else if (openParam === "pst:open-match-auteurs")
            setMatchAuteursOpen(true);
          else if (openParam === "pst:open-definitions")
            setDefinitionsOpen(true);
          else if (openParam === "pst:open-blind-test") setBlindTestOpen(true);
          else if (openParam === "pst:open-chronologie")
            setChronologieOpen(true);
          else if (openParam === "pst:open-palais-memoire")
            setPalaisMemoireOpen(true);
          else if (openParam === "pst:open-ponts-transversaux")
            setPontsTransversauxOpen(true);
          else if (openParam === "pst:open-command-palette")
            setCommandPaletteOpen(true);
          window.history.replaceState({}, "", window.location.pathname);
        }
      } catch {
        /* ignore */
      }
    }

    return () => {
      window.removeEventListener("pst:open-match-auteurs", handleOpenMatch);
      window.removeEventListener("pst:open-definitions", handleOpenDefs);
      window.removeEventListener("pst:open-fiche-poche", handleOpenPoche);
      window.removeEventListener("pst:open-speed-run", handleOpenSpeedRun);
      window.removeEventListener("pst:open-detective", handleOpenDetective);
      window.removeEventListener(
        "pst:open-sujets-dissertation",
        handleOpenSujets,
      );
      window.removeEventListener("pst:open-roleplay", handleOpenRoleplay);
      window.removeEventListener("pst:open-schemas", handleOpenSchemas);
      window.removeEventListener("pst:open-blind-test", handleOpenBlindTest);
      window.removeEventListener("pst:open-chronologie", handleOpenChronologie);
      window.removeEventListener(
        "pst:open-palais-memoire",
        handleOpenPalaisMemoire,
      );
      window.removeEventListener("pst:open-briefing-30s", handleOpenBriefing);
      window.removeEventListener(
        "pst:open-ponts-transversaux",
        handleOpenPonts,
      );
      window.removeEventListener(
        "pst:open-command-palette",
        handleOpenCommandPalette,
      );
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isWorkshopModule) return;
    try {
      const savedMode = localStorage.getItem(
        "pst_layout_mode_v1",
      ) as LayoutMode | null;
      if (
        savedMode === "standard" ||
        savedMode === "wide" ||
        savedMode === "split"
      ) {
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
      toast.success(
        `Notes envoyées vers la Chronique de Terrain (${moduleKey.toUpperCase()})`,
      );
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

  const isEffectiveWide =
    wide || layoutMode === "wide" || layoutMode === "split";

  return (
    <PstThemeProvider moduleKey={moduleKey}>
      <CurrentCardProvider>
        {isWorkshopModule && (
          <div className="hidden lg:flex items-center justify-end gap-2 max-w-6xl mx-auto mb-3">
            <div className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1 rounded-xl shadow-2xs text-xs">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Disposition :
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
            <Suspense
              fallback={
                <div className="min-h-[40vh] flex items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-500 animate-pulse">
                  Chargement de l'atelier...
                </div>
              }
            >
              {resolvedContent}
            </Suspense>
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
                      Synthèse &amp; arguments d&apos;examen (
                      {moduleKey.toUpperCase()})
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
        <Suspense fallback={null}>
          {matchAuteursOpen && (
            <MatchAuteursModal
              isOpen={matchAuteursOpen}
              onClose={() => setMatchAuteursOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {definitionsOpen && (
            <CoffreDefinitionsModal
              isOpen={definitionsOpen}
              onClose={() => setDefinitionsOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {fichePocheOpen && (
            <FichePocheModal
              isOpen={fichePocheOpen}
              onClose={() => setFichePocheOpen(false)}
              defaultModule={fichePocheModule}
            />
          )}
          {speedRunOpen && (
            <SpeedRunChronoModal
              isOpen={speedRunOpen}
              onClose={() => setSpeedRunOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {detectiveOpen && (
            <PiegesDetectiveModal
              isOpen={detectiveOpen}
              onClose={() => setDetectiveOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {sujetsOpen && (
            <SujetsDissertationModal
              isOpen={sujetsOpen}
              onClose={() => setSujetsOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {roleplayOpen && (
            <SimulateurJeuDeRoleModal
              isOpen={roleplayOpen}
              onClose={() => setRoleplayOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {schemasOpen && (
            <SchemasMatricesModal
              isOpen={schemasOpen}
              onClose={() => setSchemasOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {blindTestOpen && (
            <BlindTestAudioModal
              isOpen={blindTestOpen}
              onClose={() => setBlindTestOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {chronologieOpen && (
            <ChronologieHistoriqueModal
              isOpen={chronologieOpen}
              onClose={() => setChronologieOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {palaisMemoireOpen && (
            <PalaisMemoireModal
              isOpen={palaisMemoireOpen}
              onClose={() => setPalaisMemoireOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {briefingOpen && (
            <PstBriefing30sModal
              isOpen={briefingOpen}
              onClose={() => setBriefingOpen(false)}
              defaultModule={moduleKey}
            />
          )}
          {pontsTransversauxOpen && (
            <PontsTransversauxModal
              isOpen={pontsTransversauxOpen}
              onClose={() => setPontsTransversauxOpen(false)}
            />
          )}
          {commandPaletteOpen && (
            <PstCommandPalette
              isOpen={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
            />
          )}
        </Suspense>
        <PstAudioPodcastPlayer />
        <Toaster />
      </CurrentCardProvider>
    </PstThemeProvider>
  );
}
