"use client";

import { useMemo, useState, useRef } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Copy,
  Check,
  Search,
  Sparkles,
  AlertTriangle,
  FileText,
  GraduationCap,
  Scale,
  Video,
  Users,
  Send,
  ArrowRight,
  ExternalLink,
  Table as TableIcon,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Type,
  Maximize2,
  Minimize2,
  X,
  ListOrdered,
  Lightbulb,
  FileCheck2,
  Share2,
  HelpCircle,
  Quote,
} from "lucide-react";
import { toast } from "sonner";
import {
  type SeanceCoursItem,
  type SeancePointCle,
  SEANCES_COURS_DATA,
} from "@/lib/pst/data/seances-cours";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SeancesCoursPanelProps {
  moduleKey: "pst106" | "pst108" | "pst123";
  onGoTab?: (tabId: string) => void;
}

interface ParsedChapter {
  id: string;
  title: string;
  lines: string[];
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function SeancesCoursPanel({
  moduleKey,
  onGoTab,
}: SeancesCoursPanelProps) {
  const seances = useMemo(() => {
    return SEANCES_COURS_DATA.filter((s) => s.moduleKey === moduleKey);
  }, [moduleKey]);

  const [selectedSeanceId, setSelectedSeanceId] = useState<string>(
    seances[0]?.id || "",
  );
  const [activeTab, setActiveTab] = useState<
    "synthese" | "transcription" | "consignes"
  >("synthese");

  // Options Mode Lecture (Apple Books HIG)
  const [verbatimSearch, setVerbatimSearch] = useState<string>("");
  const [copiedVerbatim, setCopiedVerbatim] = useState<boolean>(false);
  const [copiedConsigneIndex, setCopiedConsigneIndex] = useState<number | null>(
    null,
  );
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [isWideReader, setIsWideReader] = useState<boolean>(false);
  const [activeChapterFilter, setActiveChapterFilter] = useState<string>("all");

  const activeSeance = useMemo(() => {
    return seances.find((s) => s.id === selectedSeanceId) || seances[0];
  }, [seances, selectedSeanceId]);

  // Découpage du verbatim en chapitres pour une lecture aérée type Apple Books
  const parsedChapters: ParsedChapter[] = useMemo(() => {
    if (!activeSeance?.transcriptionIntegraleVerbatim) return [];
    const rawLines = activeSeance.transcriptionIntegraleVerbatim
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const chapters: ParsedChapter[] = [];
    let current: ParsedChapter = {
      id: "intro",
      title: "Introduction & Cadrage",
      lines: [],
    };

    rawLines.forEach((line) => {
      // Détection des en-têtes [Titre du chapitre]
      if (
        line.startsWith("[") &&
        line.endsWith("]") &&
        !line.startsWith("[00:") &&
        !line.startsWith("[Voir")
      ) {
        if (current.lines.length > 0) {
          chapters.push(current);
        }
        const cleanTitle = line.slice(1, -1).trim();
        const cleanId =
          "chap_" + cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_");
        current = {
          id: cleanId,
          title: cleanTitle,
          lines: [],
        };
      } else {
        current.lines.push(line);
      }
    });

    if (current.lines.length > 0) {
      chapters.push(current);
    }

    return chapters;
  }, [activeSeance]);

  // Calcul des occurrences de recherche
  const matchCount = useMemo(() => {
    if (!activeSeance || !verbatimSearch.trim()) return 0;
    const q = verbatimSearch.toLowerCase();
    const count = (
      activeSeance.transcriptionIntegraleVerbatim.toLowerCase().match(
        new RegExp(escapeRegExp(q), "g"),
      ) || []
    ).length;
    return count;
  }, [activeSeance, verbatimSearch]);

  function handleCopyVerbatim() {
    if (!activeSeance) return;
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        activeSeance.transcriptionIntegraleVerbatim,
      );
      setCopiedVerbatim(true);
      playSuccessSound();
      triggerHaptic("success");
      toast.success("Transcription intégrale copiée dans le presse-papier !");
      setTimeout(() => setCopiedVerbatim(false), 3000);
    }
  }

  function handleCopyConsigne(text: string, index: number) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedConsigneIndex(index);
      playSuccessSound();
      triggerHaptic("light");
      toast.success("Consigne copiée !");
      setTimeout(() => setCopiedConsigneIndex(null), 2500);
    }
  }

  // Rendu avec surlignage des mots-clés recherchés
  function renderHighlightedText(text: string) {
    if (!verbatimSearch.trim()) return text;
    const regex = new RegExp(`(${escapeRegExp(verbatimSearch)})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-amber-400/40 text-amber-950 dark:text-amber-100 font-bold px-1.5 py-0.5 rounded-md shadow-2xs"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  }

  if (!activeSeance) {
    return (
      <div className="p-12 text-center text-muted-foreground bg-card/60 backdrop-blur-md border border-border/60 rounded-3xl space-y-3">
        <BookOpen className="size-10 text-muted-foreground/60 mx-auto mb-2" />
        <h3 className="text-base font-bold text-foreground">
          Aucun cours retranscrit pour le moment
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Les séances enregistrées et les retranscriptions écrites de ce module
          seront ajoutées au fil du semestre.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── BARRE DE CONTRÔLE iOS : SÉANCES & SEGMENTED TABS ───────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-muted/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xs">
        {/* Sélecteur de séances si plusieurs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {seances.map((seance) => {
            const isSelected = seance.id === activeSeance.id;
            return (
              <button
                key={seance.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedSeanceId(seance.id);
                  setActiveChapterFilter("all");
                }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-98 ${
                  isSelected
                    ? "bg-card text-foreground border border-border shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                }`}
              >
                {seance.format === "webconference" ? (
                  <Video
                    className={`size-3.5 ${
                      isSelected ? "text-indigo-500" : "text-muted-foreground"
                    }`}
                  />
                ) : (
                  <Users
                    className={`size-3.5 ${
                      isSelected ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  />
                )}
                <span>Séance {seance.numeroSeance}</span>
                <span className="text-[10px] font-mono opacity-70">
                  ({seance.dateSeance})
                </span>
              </button>
            );
          })}
        </div>

        {/* Apple iOS Segmented Control (Tabs) */}
        <div className="inline-flex items-center p-1 bg-card/80 dark:bg-slate-900/80 rounded-xl border border-border/60 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab("synthese");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "synthese"
                ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="size-3.5 text-amber-400" />
            <span>Synthèse &amp; Notes</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab("transcription");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "transcription"
                ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>Mode Lecture (3h12)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab("consignes");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "consignes"
                ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="size-3.5" />
            <span>Consignes Prof ({activeSeance.consignesOralesProf.length})</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── HERO BANNER SÉANCE (APPLE HIG CARD) ────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="p-6 sm:p-7 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-amber-500/[0.04] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30">
              {activeSeance.moduleLabel} · Séance {activeSeance.numeroSeance}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/60">
              <Calendar className="size-3.5 text-muted-foreground" />
              {activeSeance.dateSeance}
            </span>
            {activeSeance.format === "webconference" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25">
                <Video className="size-3.5 text-indigo-500" />
                Webconférence (Visio)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25">
                <Users className="size-3.5 text-emerald-500" />
                Présentiel
              </span>
            )}
            {activeSeance.dureeEnregistrement && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-900 dark:text-sky-200 border border-sky-500/25">
                <Clock className="size-3.5 text-sky-500" />
                {activeSeance.dureeEnregistrement}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Retranscription intégrale certifiée</span>
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight leading-snug">
            {activeSeance.titre}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed font-sans">
            {activeSeance.sousTitre} ·{" "}
            <strong className="text-foreground">{activeSeance.enseignant}</strong>
          </p>
        </div>

        {/* Repères fondamentaux en Apple Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>Repères doctrinaux essentiels abordés en séance :</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-foreground/90 leading-relaxed pt-1">
            {activeSeance.resumeExecutif.map((pt, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 bg-card/70 p-2.5 rounded-xl border border-border/40 shadow-2xs"
              >
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── ONGLET 1 : SYNTHÈSE STRUCTURÉE & NOTES D'EXAMEN ─────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "synthese" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Modalités officielles de l'examen si renseignées */}
          {activeSeance.modalitesExamen && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/[0.08] via-card to-indigo-500/[0.05] border border-purple-500/30 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
                  <Scale className="size-4 text-purple-500" />
                  <span>
                    Modalités d'examen officielles annoncées par{" "}
                    {activeSeance.enseignant}
                  </span>
                </span>
                <span className="text-xs font-mono font-bold bg-purple-500/15 text-purple-900 dark:text-purple-200 px-3 py-1 rounded-xl border border-purple-500/30">
                  Épreuve de {activeSeance.modalitesExamen.duree} · Sans documents
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-2">
                  <span className="text-muted-foreground font-semibold block uppercase tracking-wider text-[11px]">
                    Dates des deux sessions officielles :
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-foreground">
                      <span>1ère Session (Février) :</span>
                      <strong className="font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        {activeSeance.modalitesExamen.session1Date}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-foreground">
                      <span>2nde Session (Avril) :</span>
                      <strong className="font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        {activeSeance.modalitesExamen.session2Date}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-2">
                  <span className="text-muted-foreground font-semibold block uppercase tracking-wider text-[11px]">
                    Format des 2 sujets au choix :
                  </span>
                  <ul className="text-foreground/90 space-y-1.5 pl-3 list-disc">
                    {activeSeance.modalitesExamen.optionsAuChoix.map(
                      (opt, oIdx) => (
                        <li key={oIdx} className="leading-snug">
                          {opt}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-950 dark:text-purple-200 flex items-start gap-2.5">
                <Quote className="size-4 text-purple-500 shrink-0 mt-0.5 opacity-80" />
                <p className="italic leading-relaxed m-0">
                  <strong className="not-italic font-semibold">
                    Recommandation de l'enseignante :
                  </strong>{" "}
                  {activeSeance.modalitesExamen.recommandationsNotation}
                </p>
              </div>
            </div>
          )}

          {/* Sections rédigées du cours (Apple Grouped Cards) */}
          <div className="space-y-4">
            {activeSeance.syntheseSections.map((sec) => (
              <div
                key={sec.numero}
                className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <span className="size-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                    {sec.numero}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
                    {sec.titre}
                  </h3>
                </div>

                <div className="space-y-3 pt-1">
                  {sec.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2"
                    >
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        <span>{pt.titre}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed font-sans">
                        {pt.contenu}
                      </p>
                      {pt.auteurs && pt.auteurs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-mono text-muted-foreground mr-1">
                            Auteurs cités :
                          </span>
                          {pt.auteurs.map((aut, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-card text-foreground border border-border/70 font-mono font-medium shadow-2xs"
                            >
                              {aut}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tableaux comparatifs interactifs (ex: Piaget vs Vygotski / Dejours vs Clot) */}
          {activeSeance.tableauxComparatifs &&
            activeSeance.tableauxComparatifs.length > 0 && (
              <div className="space-y-4">
                {activeSeance.tableauxComparatifs.map((tab, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5 text-base font-serif font-bold text-foreground">
                      <TableIcon className="size-4 text-amber-500" />
                      <span>{tab.titre}</span>
                    </div>
                    {tab.description && (
                      <p className="text-xs text-muted-foreground italic -mt-2">
                        {tab.description}
                      </p>
                    )}

                    <div className="overflow-x-auto rounded-2xl border border-border/60">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-border bg-muted/60">
                            {tab.colonnes.map((col, cIdx) => (
                              <th
                                key={cIdx}
                                className="p-3 font-semibold text-foreground uppercase tracking-wider text-[11px]"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 font-sans">
                          {tab.lignes.map((lig, lIdx) => (
                            <tr
                              key={lIdx}
                              className="hover:bg-muted/40 transition-colors"
                            >
                              <td className="p-3.5 font-bold text-amber-800 dark:text-amber-300 whitespace-nowrap align-top bg-card/60">
                                {lig.axe}
                              </td>
                              {lig.valeurs.map((val, vIdx) => (
                                <td
                                  key={vIdx}
                                  className="p-3.5 text-foreground/85 leading-relaxed align-top"
                                >
                                  {val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Rectifications factuelles et pièges d'examen (Apple HIG Warning Style) */}
          {activeSeance.rectificationsExamen &&
            activeSeance.rectificationsExamen.length > 0 && (
              <div className="p-6 rounded-3xl bg-amber-500/[0.06] border border-amber-500/25 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-300">
                  <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
                  <span>
                    Points Critiques &amp; Rectifications Factuelles Exigées à l'Examen
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {activeSeance.rectificationsExamen.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 rounded-2xl bg-card border border-border/60 space-y-2 shadow-2xs"
                    >
                      <strong className="font-serif text-sm font-bold text-foreground block">
                        {rec.titre}
                      </strong>
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200 line-through decoration-rose-500/70">
                        Erreur fréquente : {rec.erreurCourante}
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                        ✓ Rectification attendue : {rec.rectificationAttendue}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono block pt-1">
                        {rec.contexte}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Bibliographie clé (Apple Books style) */}
          {activeSeance.bibliographieCitee.length > 0 && (
            <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <BookOpen className="size-3.5 text-amber-500" />
                <span>Ouvrages &amp; références clés recommandés par l'enseignant :</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeSeance.bibliographieCitee.map((b, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-3.5 rounded-2xl bg-muted/30 border border-border/50 space-y-1"
                  >
                    <strong className="font-semibold text-foreground block">
                      {b.titre}
                    </strong>
                    <div className="text-amber-700 dark:text-amber-400 text-[11px] font-mono">
                      {b.auteur} {b.annee ? `(${b.annee})` : ""}
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-snug pt-0.5 m-0">
                      {b.remarque}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── ONGLET 2 : MODE LECTURE & RETRANSCRIPTION (APPLE BOOKS HIG) ────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "transcription" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Apple Books Toolbar */}
          <div className="p-4 rounded-3xl bg-card border border-border/70 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Live Search */}
            <div className="flex items-center gap-2 flex-1 min-w-[260px]">
              <div className="relative flex-1">
                <Search className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={verbatimSearch}
                  onChange={(e) => setVerbatimSearch(e.target.value)}
                  placeholder="Rechercher mot, auteur, consigne..."
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                {verbatimSearch && (
                  <button
                    type="button"
                    onClick={() => setVerbatimSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {matchCount > 0 && (
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 whitespace-nowrap font-bold">
                  {matchCount} match{matchCount > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Typography & Layout Controls */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Stepper taille de police */}
              <div className="inline-flex items-center p-1 bg-muted/60 rounded-xl border border-border/50 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFontSize("sm");
                  }}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    fontSize === "sm"
                      ? "bg-card text-foreground shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Texte compact (13px)"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFontSize("base");
                  }}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    fontSize === "base"
                      ? "bg-card text-foreground shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Texte standard (15px)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFontSize("lg");
                  }}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    fontSize === "lg"
                      ? "bg-card text-foreground shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Texte aéré grand confort (17px)"
                >
                  A+
                </button>
              </div>

              {/* Largeur de lecture */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsWideReader((w) => !w);
                }}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isWideReader
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
                }`}
                title={
                  isWideReader
                    ? "Passer en largeur optimale (70 caractères)"
                    : "Passer en plein écran"
                }
              >
                {isWideReader ? (
                  <Minimize2 className="size-3.5" />
                ) : (
                  <Maximize2 className="size-3.5" />
                )}
                <span className="hidden sm:inline">
                  {isWideReader ? "Largeur confort" : "Plein écran"}
                </span>
              </button>

              {/* Copier tout */}
              <button
                type="button"
                onClick={handleCopyVerbatim}
                className="px-3 py-2 rounded-xl bg-muted/60 hover:bg-muted text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                {copiedVerbatim ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Tout copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sommaire interactif rapide (Pills Horizontales) */}
          {parsedChapters.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveChapterFilter("all");
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeChapterFilter === "all"
                    ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/40 font-bold"
                    : "bg-muted/40 text-muted-foreground border border-border/60 hover:text-foreground"
                }`}
              >
                Tout le cours ({parsedChapters.length} chapitres)
              </button>
              {parsedChapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveChapterFilter(chap.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    activeChapterFilter === chap.id
                      ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/40 font-bold"
                      : "bg-muted/40 text-muted-foreground border border-border/60 hover:text-foreground"
                  }`}
                >
                  <span>
                    {idx + 1}. {chap.title}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Surface de lecture Apple Books */}
          <div
            className={`p-6 sm:p-10 rounded-3xl bg-card border border-border/70 shadow-xs space-y-8 mx-auto transition-all ${
              isWideReader ? "max-w-none" : "max-w-3xl"
            }`}
          >
            {parsedChapters
              .filter(
                (c) =>
                  activeChapterFilter === "all" ||
                  c.id === activeChapterFilter,
              )
              .map((chap, cIdx) => (
                <article
                  key={chap.id}
                  id={chap.id}
                  className="space-y-4 pb-6 border-b border-border/40 last:border-0 last:pb-0"
                >
                  {/* Bannière de Chapitre */}
                  <div className="flex items-center gap-2.5 pt-2">
                    <span className="size-7 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center justify-center font-mono">
                      {cIdx + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-serif font-bold text-foreground">
                      {chap.title}
                    </h2>
                  </div>

                  {/* Lignes & Paragraphes du chapitre */}
                  <div
                    className={`space-y-3.5 font-sans leading-relaxed text-foreground/90 ${
                      fontSize === "sm"
                        ? "text-xs sm:text-sm leading-relaxed"
                        : fontSize === "base"
                          ? "text-sm sm:text-base leading-relaxed"
                          : "text-base sm:text-lg leading-loose"
                    }`}
                  >
                    {chap.lines.map((line, lIdx) => {
                      const isTeacherTurn =
                        line.includes("PR. LAGABRIELLE") ||
                        line.startsWith("[00:00:00]");

                      if (isTeacherTurn) {
                        return (
                          <div
                            key={lIdx}
                            className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2 my-2"
                          >
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                              <span className="size-6 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                                CL
                              </span>
                              <span>Pr. Christine Lagabrielle (Directrice de séance)</span>
                            </div>
                            <p className="m-0 italic">
                              {renderHighlightedText(line)}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <p key={lIdx} className="m-0">
                          {renderHighlightedText(line)}
                        </p>
                      );
                    })}
                  </div>
                </article>
              ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── ONGLET 3 : CONSIGNES DU PROF & TRAVAIL À PRÉPARER (AD) ─────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "consignes" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {activeSeance.consignesOralesProf.map((c, cIdx) => (
            <div
              key={cIdx}
              className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-900 dark:text-purple-200 border border-purple-500/30">
                    Consigne #{cIdx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-foreground">
                    {c.titre}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 self-start sm:self-auto">
                  <Clock className="size-3.5 text-amber-500" />
                  <span>Échéance : {c.echeance}</span>
                </span>
              </div>

              {/* Consigne exacte formulée en cours */}
              <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  Consigne exacte formulée à l'oral par {activeSeance.enseignant} :
                </span>
                <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed m-0 font-serif">
                  « {c.consigneExacte} »
                </p>
              </div>

              {/* Modalités & Recommandations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-card border border-border/50 space-y-1">
                  <span className="font-semibold text-muted-foreground block text-[11px]">
                    Modalité de travail &amp; Rendu :
                  </span>
                  <span className="text-foreground">{c.modaliteRendu}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-card border border-border/50 space-y-1">
                  <span className="font-semibold text-muted-foreground block text-[11px]">
                    Recommandations de réussite :
                  </span>
                  <span className="text-foreground">
                    {c.recommandationsProf}
                  </span>
                </div>
              </div>

              {/* Actions Apple-grade */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-border/40">
                <button
                  type="button"
                  onClick={() =>
                    handleCopyConsigne(c.consigneExacte, cIdx)
                  }
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  {copiedConsigneIndex === cIdx ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span>Consigne copiée !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copier la consigne</span>
                    </>
                  )}
                </button>

                {c.lienAdId && onGoTab && (
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onGoTab("ad");
                    }}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto"
                  >
                    <span>Rédiger cette AD dans l'espace dédié</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
