"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  BookOpen,
  Calendar,
  Sparkles,
  Layers,
  GraduationCap,
  ArrowRight,
  X,
  Keyboard,
  Sun,
  Moon,
  Clock,
  Download,
  Flame,
  Database,
  Scale,
  Zap,
  FileSignature,
  BookMarked,
  FileText,
  Briefcase,
  ClipboardList,
  Plus,
  MapPin,
  Video,
  CheckCircle2,
  Swords,
  ShieldCheck,
  Printer,
  ShieldAlert,
  HeartHandshake,
  History,
  Palette,
  Compass,
  GitFork,
  Quote,
  Timer,
  Mic,
  Gavel,
  Activity,
  FileSearch,
  MessageSquare,
  Film,
  User,
  Target,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { useRouter } from "@/components/common/Navigation";
import { INDEX, MODULES } from "@/lib/pst/hub-stats";
import { PLANNING_EVENTS } from "@/lib/pst/data/planning";
import { PONTS } from "@/lib/pst/data/ponts";
import { DEFINITIONS_CANONIQUES } from "@/lib/pst/data/definitions-canoniques";
import { MATCHS_AUTEURS } from "@/lib/pst/data/match-auteurs";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import { formatFrDate } from "@/lib/pst/planning-stats";
import { downloadIcs } from "@/lib/pst/ics-export";
import { playSuccessSound } from "@/lib/pst/audio-feedback";
import { PST106_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst106";
import { PST108_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst108";
import { PST123_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst123";
import { PstStore } from "@/lib/pst/store";
import { toast } from "sonner";

interface PstCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWorkshopSlideOver?: (moduleId: string) => void;
}

export function PstCommandPalette({
  isOpen,
  onClose,
  onOpenWorkshopSlideOver,
}: PstCommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [quickUe, setQuickUe] = useState("PST106");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global Keyboard listener for ⌘K / Ctrl+K & Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or parent
          window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered Results
  const trimmed = query.trim().toLowerCase();

  // 1. Matching Workshops
  const matchedWorkshops = useMemo(() => {
    if (!trimmed) return MODULES;
    return MODULES.filter(
      (m) =>
        m.id.toLowerCase().includes(trimmed) ||
        m.title.toLowerCase().includes(trimmed) ||
        m.subject.toLowerCase().includes(trimmed),
    );
  }, [trimmed]);

  // 2. Matching Glossary terms
  const matchedGlossary = useMemo(() => {
    if (!trimmed) return [];
    return INDEX.glossaire
      .filter(
        (g) =>
          g.w.toLowerCase().includes(trimmed) ||
          g.def.toLowerCase().includes(trimmed),
      )
      .slice(0, 10);
  }, [trimmed]);

  // 3. Matching CNAM Planning Sessions (official sessions)
  const matchedSessions = useMemo(() => {
    if (!trimmed) return [];
    return PLANNING_EVENTS.filter((ev) => {
      const hay = [
        ev.unit,
        ev.date,
        formatFrDate(ev.date),
        ev.day,
        ev.type,
        ev.teacher ?? "",
        ev.room ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 8);
  }, [trimmed]);

  // Matching cross-module conceptual bridges (PONTS)
  const matchedConcepts = useMemo(() => {
    if (!trimmed) return [];
    return PONTS.filter((p) => {
      const hay = (p.c + " " + Object.values(p.m).join(" ")).toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 6);
  }, [trimmed]);

  // Matching Canonical Definitions
  const matchedDefinitions = useMemo(() => {
    if (!trimmed) return [];
    return DEFINITIONS_CANONIQUES.filter((d) => {
      const hay = [
        d.terme,
        d.auteur,
        d.modules.join(" "),
        d.definitionOfficielle,
        ...(d.motsClesObligatoires || []),
        d.exemplePratique,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 5);
  }, [trimmed]);

  // Matching Author duels
  const matchedDuels = useMemo(() => {
    if (!trimmed) return [];
    return MATCHS_AUTEURS.filter((m) => {
      const hay = [
        m.titre,
        m.auteurA.nom,
        m.auteurB.nom,
        m.auteurA.diagnosticSituation,
        m.auteurB.diagnosticSituation,
        m.situationTravailReel,
        m.syntheseDialectiqueExamen,
        ...(m.motsClesCopies || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 3);
  }, [trimmed]);

  // Matching Schemas & Matrices Visuelles SVG
  const matchedSchemas = useMemo(() => {
    if (!trimmed) return [];
    return SCHEMAS_MATRICES.filter((s) => {
      const hay = [
        s.titre,
        s.auteur,
        s.formuleCle,
        s.moduleKey,
        s.descriptionPedagogique,
        "schéma schema matrice svg dessin",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 4);
  }, [trimmed]);

  // Matching Official Teacher Resources
  const matchedResources = useMemo(() => {
    if (!trimmed || trimmed.length < 2) return [];
    const all = [
      ...PST106_OFFICIAL_RESOURCES.map((r) => ({
        ...r,
        uPath: "/pst/106#ressources",
        mod: "PST106",
      })),
      ...PST108_OFFICIAL_RESOURCES.map((r) => ({
        ...r,
        uPath: "/pst/108#ressources",
        mod: "PST108",
      })),
      ...PST123_OFFICIAL_RESOURCES.map((r) => ({
        ...r,
        uPath: "/pst/123#ressources",
        mod: "PST123",
      })),
    ];
    return all
      .filter((r) => {
        const hay = [
          r.title,
          r.authors,
          r.description,
          r.keyTakeaway,
          r.tags.join(" "),
          r.localFile || "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(trimmed);
      })
      .slice(0, 5);
  }, [trimmed]);

  // Key authors shortcuts
  const AUTHORS = [
    {
      name: "Yves Clot",
      mod: "pst106",
      desc: "Clinique de l'activité, réel, genre et style",
    },
    {
      name: "Christophe Dejours",
      mod: "pst120",
      desc: "Psychodynamique du travail, souffrance, reconnaissance",
    },
    {
      name: "Alain Wisner",
      mod: "pst106",
      desc: "Ergonomie, travail prescrit vs réel",
    },
    {
      name: "Claude Dubar",
      mod: "pst123",
      desc: "Double transaction, identité pour soi vs autrui",
    },
    {
      name: "Pierre Bourdieu",
      mod: "pst123",
      desc: "Habitus, capital, champ, double vérité du travail",
    },
    {
      name: "Renaud Sainsaulieu",
      mod: "pst123",
      desc: "Modèles relationnels, l'identité au travail",
    },
    {
      name: "Axel Honneth",
      mod: "pst123",
      desc: "Théorie de la reconnaissance, mépris social",
    },
    {
      name: "Lev Vygotski",
      mod: "pst108",
      desc: "Théorie historico-culturelle, médiation sémiotique",
    },
    {
      name: "Jürgen Habermas",
      mod: "pst108",
      desc: "Agir communicationnel, prétentions à la validité",
    },
    {
      name: "Karl Bühler",
      mod: "pst108",
      desc: "Organon du langage, expression, appel, représentation",
    },
    {
      name: "Suzanne Pacaud",
      mod: "pst106",
      desc: "Sélection psychotechnique et régulation réelle",
    },
    {
      name: "Frederick Herzberg",
      mod: "pst106",
      desc: "Théorie bifactorielle, facteurs d'hygiène et motivation",
    },
    {
      name: "Jacques Leplat",
      mod: "pst106",
      desc: "Activité vs tâche, régulation ergonomique",
    },
    {
      name: "Pascale Molinier",
      mod: "pst120",
      desc: "Idéologies défensives, éthique du care",
    },
    {
      name: "Pierre Rabardel",
      mod: "pst124",
      desc: "Genèse instrumentale, artefact et schèmes",
    },
    {
      name: "Georges Canguilhem",
      mod: "pst120",
      desc: "Le normal et le pathologique, santé normative",
    },
    {
      name: "Thomas Le Bianic",
      mod: "pst123",
      desc: "Identité et autonomisation des psychologues du travail",
    },
  ];

  const matchedAuthors = useMemo(() => {
    if (!trimmed) return AUTHORS.slice(0, 4);
    return AUTHORS.filter(
      (a) =>
        a.name.toLowerCase().includes(trimmed) ||
        a.desc.toLowerCase().includes(trimmed),
    );
  }, [trimmed]);

  // Matching Carnet d'Erreurs actif à retravailler
  const allErrors = useMemo(() => {
    if (!isOpen || typeof window === "undefined") return [];
    const keysMap: Record<string, string> = {
      "106": "pst106_v1",
      "108": "pst108_atelier_v10",
      "120": "pst120_atelier_v10",
      "123": "pst123_atelier_v10",
      "124": "pst124_atelier_v10",
    };
    const items: Array<{
      id: string;
      modNum: string;
      question: string;
      correctAnswer: string;
      type: string;
    }> = [];
    Object.entries(keysMap).forEach(([modNum, key]) => {
      try {
        const store = new PstStore(key);
        const errs = store.getErrors();
        errs.forEach((e) => {
          items.push({
            id: e.id,
            modNum,
            question: e.question,
            correctAnswer: e.correctAnswer,
            type: e.type,
          });
        });
      } catch {
        /* ignore */
      }
    });
    return items;
  }, [isOpen]);

  const matchedErrors = useMemo(() => {
    if (!trimmed) return allErrors.slice(0, 4);
    return allErrors
      .filter(
        (e) =>
          e.question.toLowerCase().includes(trimmed) ||
          e.correctAnswer.toLowerCase().includes(trimmed) ||
          e.type.toLowerCase().includes(trimmed) ||
          `pst${e.modNum}`.includes(trimmed),
      )
      .slice(0, 6);
  }, [allErrors, trimmed]);

  function handleQuickAddTask() {
    const cleanText = query.replace(/^\+\s*/, "").trim();
    if (!cleanText) return;
    try {
      const raw = localStorage.getItem("pst_academic_todos_v1");
      const current = raw ? JSON.parse(raw) : [];
      const next = [
        {
          id: "t_" + Date.now(),
          title: cleanText,
          ue: quickUe,
          priority: "haute",
          isDone: false,
        },
        ...current,
      ];
      try {
        localStorage.setItem("pst_academic_todos_v1", JSON.stringify(next));
      } catch {
        // Silencieux
      }
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      toast.success(`Tâche ajoutée (${quickUe}) : « ${cleanText} »`);
      setQuery("");
      onClose();
    } catch {
      // ignore
    }
  }

  function handleQuickAddFieldNote() {
    const cleanText = query.replace(/^\+\s*/, "").trim();
    if (!cleanText) return;
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
          ue: quickUe,
          category: "note_reflexive",
          operatorCode: "Capture Spotlight ⌘K",
          content: cleanText,
        },
        ...current,
      ];
      try {
        localStorage.setItem("pst_field_journal_v1", JSON.stringify(next));
      } catch {
        // Silencieux
      }
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      toast.success(`Note consignée dans la Chronique (${quickUe})`);
      setQuery("");
      onClose();
    } catch {
      // ignore
    }
  }

  function handleNavigate(path: string) {
    onClose();
    router.push(path);
  }

  function handleToggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("pst_theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("pst_theme", "dark");
      }
    } catch {
      // Silencieux
    }
    window.dispatchEvent(new CustomEvent("pst:theme-changed"));
    onClose();
  }

  function triggerHubModal(eventName: string) {
    onClose();
    window.dispatchEvent(new CustomEvent(eventName));
  }

  function handleExportIcs() {
    onClose();
    downloadIcs();
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palette de commandes PST (⌘K)"
      className="fixed inset-0 z-50 flex items-end sm:items-start justify-center p-0 sm:p-4 sm:pt-20 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Palette Window (iOS Bottom Sheet on mobile, Spotlight Window on desktop) */}
      <div
        className="relative w-full max-w-2xl bg-card/95 backdrop-blur-xl border-t sm:border border-border shadow-2xl rounded-t-3xl sm:rounded-2xl overflow-hidden z-10 transition-all flex flex-col max-h-[85vh] sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile iOS Drag Handle */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-border/80 px-4 py-3 bg-muted/20 shrink-0">
          <Search className="size-4.5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Rechercher un atelier, une séance Bègles, un auteur, un terme ou capturer une note"
            placeholder="Rechercher séance (Bègles, Salane...), concept, auteur, ou saisir une note..."
            className="w-full bg-transparent px-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
              aria-label="Effacer le texte"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px] border border-border">
              Échap
            </kbd>
          )}
        </div>

        {/* Quick Capture Bar (when text is typed) */}
        {query.trim().length > 1 && (
          <div className="px-3.5 py-2 bg-accent/8 border-b border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent shrink-0" />
              <span className="font-semibold text-foreground text-[11px]">
                Capture Rapide :
              </span>
              <select
                value={quickUe}
                onChange={(e) => setQuickUe(e.target.value)}
                aria-label="Unité d'enseignement cible"
                className="px-1.5 py-0.5 rounded-md border border-border bg-card text-[11px] font-mono font-bold text-foreground"
              >
                <option value="PST106">PST106</option>
                <option value="PST108">PST108</option>
                <option value="PST123">PST123</option>
                <option value="PST120">PST120</option>
                <option value="PST124">PST124</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleQuickAddTask}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="size-3" />
                <span>Ajouter Tâche</span>
              </button>
              <button
                type="button"
                onClick={handleQuickAddFieldNote}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 text-white text-[11px] font-semibold hover:bg-teal-500 active:scale-95 transition-all cursor-pointer"
              >
                <ClipboardList className="size-3" />
                <span>Noter au Carnet</span>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Results */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs flex-1">
          {/* 0. Séances du Planning CNAM Bègles / ENF (si recherche tapée) */}
          {matchedSessions.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Séances Planning CNAM ({matchedSessions.length})
              </span>
              <div className="space-y-1">
                {matchedSessions.map((ev, idx) => (
                  <div
                    key={`${ev.unit}-${ev.date}-${ev.start}-${idx}`}
                    onClick={() => handleNavigate("/pst/planning")}
                    className="flex items-center justify-between gap-2 p-2 rounded-xl border border-border/70 bg-card hover:bg-muted/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold text-[10px] shrink-0">
                        {ev.unit.toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate flex items-center gap-1.5">
                          <span>
                            {ev.day} {formatFrDate(ev.date)} ({ev.start}–
                            {ev.end})
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            · {ev.type}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                          {ev.type === "COURS" ? (
                            <MapPin className="size-3 text-amber-600 shrink-0" />
                          ) : (
                            <Video className="size-3 text-teal-600 shrink-0" />
                          )}
                          <span>
                            {ev.type === "COURS"
                              ? `Cnam Bègles — ${ev.room ?? ""}`
                              : (ev.room ?? "ENF")}
                            {ev.teacher ? ` · ${ev.teacher}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 0. Carnet d'Erreurs Actif */}
          {matchedErrors.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="size-3" />
                <span>
                  Erreurs de Quiz à Retravailler ({matchedErrors.length})
                </span>
              </span>
              <div className="space-y-0.5">
                {matchedErrors.map((err) => (
                  <div
                    key={err.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-rose-500/10 transition-colors group cursor-pointer border border-rose-500/20"
                    onClick={() => handleNavigate(`/pst/${err.modNum}/#errors`)}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 shrink-0">
                        PST{err.modNum} · {err.type.toUpperCase()}
                      </span>
                      <div className="truncate">
                        <span className="font-semibold text-foreground text-xs block truncate">
                          {err.question}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate block">
                          Solution : {err.correctAnswer.replace(/<[^>]*>/g, "")}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-rose-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 0 bis. Textes & Ressources Officielles des Profs */}
          {matchedResources.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
                <BookOpen className="size-3" />
                <span>Textes &amp; Ressources Profs ({matchedResources.length})</span>
              </span>
              <div className="space-y-0.5">
                {matchedResources.map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-500/10 transition-colors group cursor-pointer border border-indigo-500/20"
                    onClick={() => handleNavigate(res.uPath)}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 shrink-0">
                        {res.mod}
                      </span>
                      <div className="truncate">
                        <span className="font-semibold text-foreground text-xs block truncate">
                          {res.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate block">
                          {res.authors} ({res.year}) · {res.keyTakeaway}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1. Ateliers PST */}
          {matchedWorkshops.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Ateliers de Psychologie du Travail ({matchedWorkshops.length})
              </span>
              <div className="space-y-0.5">
                {matchedWorkshops.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition-colors group cursor-pointer"
                    onClick={() =>
                      handleNavigate(`/pst/${m.id.replace("pst", "")}/`)
                    }
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="size-6 rounded-md bg-primary/10 text-primary font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                        {m.id.toUpperCase()}
                      </span>
                      <div className="truncate">
                        <span className="font-semibold text-foreground block truncate">
                          {m.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate block">
                          {m.subject} · {m.cards} fiches
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {onOpenWorkshopSlideOver && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                            onOpenWorkshopSlideOver(m.id);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted hover:bg-muted/90 text-muted-foreground hover:text-foreground border border-border"
                        >
                          Inspecter
                        </button>
                      )}
                      <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Auteurs & Doctrines */}
          {matchedAuthors.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Auteurs Fondamentaux
              </span>
              <div className="space-y-0.5">
                {matchedAuthors.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition-colors group cursor-pointer"
                    onClick={() =>
                      handleNavigate(`/pst/${a.mod.replace("pst", "")}/`)
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="size-4 text-accent shrink-0" />
                      <div>
                        <span className="font-semibold text-foreground text-xs">
                          {a.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          {a.desc} ({a.mod.toUpperCase()})
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Ponts Conceptuels Transversaux */}
          {matchedConcepts.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Ponts Conceptuels Transversaux ({matchedConcepts.length})
              </span>
              <div className="space-y-1">
                {matchedConcepts.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleNavigate("/pst#concepts")}
                    className="p-2.5 rounded-xl border border-border/80 bg-card hover:border-accent/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                        <Sparkles className="size-3 text-amber-500" />
                        <span>{p.c}</span>
                      </span>
                      <div className="flex items-center gap-1">
                        {Object.keys(p.m).map((ue) => (
                          <span
                            key={ue}
                            className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-muted text-muted-foreground"
                          >
                            {ue.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground m-0 line-clamp-1">
                      {Object.entries(p.m)
                        .map(([ue, txt]) => `${ue.toUpperCase()} : ${txt}`)
                        .join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Termes du Glossaire (si recherche tapée) */}
          {matchedGlossary.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Glossaire Clinique ({matchedGlossary.length})
              </span>
              <div className="space-y-1">
                {matchedGlossary.map((g, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      handleNavigate(`/pst/${g.m.replace("pst", "")}/#lexique`)
                    }
                    className="p-2.5 rounded-xl border border-border/80 bg-card hover:border-accent/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground text-xs">
                        {g.w}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground">
                        {g.m.toUpperCase()} →
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground m-0 line-clamp-2 font-serif">
                      {g.def}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Définitions Canoniques Clés en Main */}
          {matchedDefinitions.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
                <span>
                  Définitions Canoniques Clés en Main (
                  {matchedDefinitions.length})
                </span>
                <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">
                  Critères 18/20
                </span>
              </span>
              <div className="space-y-1">
                {matchedDefinitions.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(
                        new CustomEvent("pst:open-definitions"),
                      );
                    }}
                    className="p-3 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 hover:border-indigo-400 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                        <ShieldCheck className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{d.terme}</span>
                        <span className="text-[10px] font-normal text-muted-foreground">
                          ({d.auteur})
                        </span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        {d.modules.join(" · ").toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 line-clamp-2 italic font-serif">
                      « {d.definitionOfficielle} »
                    </p>
                    {d.motsClesObligatoires &&
                      d.motsClesObligatoires.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap mt-1.5">
                          <span className="text-[9px] font-bold text-slate-500">
                            Mots imposés :
                          </span>
                          {d.motsClesObligatoires.map((m, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-white/80 dark:bg-slate-800 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schémas & Matrices Visuelles SVG (18/20) */}
          {matchedSchemas.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
                <span>
                  Schémas Vectoriels &amp; Matrices SVG ({matchedSchemas.length}
                  )
                </span>
                <span className="text-[9px] text-cyan-600 dark:text-cyan-400 font-bold">
                  Mémoire Visuelle 18/20
                </span>
              </span>
              <div className="space-y-1">
                {matchedSchemas.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(
                        new CustomEvent("pst:open-schemas", {
                          detail: { schemaId: s.id, moduleKey: s.moduleKey },
                        }),
                      );
                    }}
                    className="p-3 rounded-2xl border border-cyan-200/70 dark:border-cyan-900/50 bg-cyan-50/40 dark:bg-cyan-950/20 hover:border-cyan-400 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                        <Palette className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{s.titre}</span>
                        <span className="text-[10px] font-normal text-muted-foreground">
                          ({s.auteur})
                        </span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                        {s.moduleKey.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 line-clamp-1 font-semibold text-cyan-800 dark:text-cyan-300">
                      ⚡ {s.formuleCle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Match des Auteurs (Duels Dialectiques) */}
          {matchedDuels.length > 0 && (
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
                <span>
                  Match des Auteurs · Duels Dialectiques ({matchedDuels.length})
                </span>
                <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">
                  1 vs 1
                </span>
              </span>
              <div className="space-y-1">
                {matchedDuels.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(
                        new CustomEvent("pst:open-match-auteurs"),
                      );
                    }}
                    className="p-3 rounded-2xl border border-rose-200/70 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-400 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                        <Swords className="size-3.5 text-rose-600 dark:text-rose-400" />
                        <span>{m.titre}</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300">
                        {m.modules.join(" · ").toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0 line-clamp-1">
                      <b>Cas :</b> {m.situationTravailReel}
                    </p>
                    <p className="text-[11px] text-slate-800 dark:text-slate-200 m-0 line-clamp-2 mt-1">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        Synthèse d&apos;examen :{" "}
                      </span>
                      {m.syntheseDialectiqueExamen}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Actions Exécutives & Studios Cliniques */}
          <div className="space-y-1 pt-1 border-t border-border/60">
            <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Exercices Cliniques &amp; Outils d&apos;Étude RNCP 7
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-match-auteurs"),
                  );
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Swords className="size-4 text-rose-500 shrink-0" />
                <span className="font-medium">
                  Match des Auteurs (Comparateur 1 vs 1)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-definitions"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <ShieldCheck className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium">
                  Coffre des Définitions Clés (Auto-Test 18/20)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-fiche-poche"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Printer className="size-4 text-emerald-500 shrink-0" />
                <span className="font-medium">
                  Fiche Mémo de Poche A4 (Imprimable)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-speed-run"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Flame className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium">
                  Sprint Chronométré 3 Min (Mémorisation)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-detective"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <ShieldAlert className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium">
                  Détective des Pièges d'Examen (18/20)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-sujets-dissertation"),
                  );
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <GraduationCap className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium">
                  Sujets de Dissertation &amp; Plans 18/20
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-roleplay"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <HeartHandshake className="size-4 text-teal-500 shrink-0" />
                <span className="font-medium">
                  Jeu de Rôle Clinique &amp; Négociation IOD
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-schemas"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Palette className="size-4 text-cyan-500 shrink-0" />
                <span className="font-medium">
                  Schémas Vectoriels &amp; Matrices SVG 18/20 (Mémoire Visuelle)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-blind-test"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Quote className="size-4 text-violet-500 shrink-0" />
                <span className="font-medium">
                  Défi Citations Mystères &amp; Blind-Test Auteurs Cnam
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-chronologie"));
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <History className="size-4 text-emerald-500 shrink-0" />
                <span className="font-medium">
                  Frise Historique &amp; Généalogie (1880-2026)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-ponts-transversaux"),
                  );
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <GitFork className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium">
                  Ponts &amp; Passerelles Transversales inter-PST (17 Synergies
                  &amp; 7 Courants)
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-palais-memoire"),
                  );
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Compass className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium">
                  Le Palais de la Mémoire Tri-Module (PST 106-108-123)
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-ponts-s1")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20"
              >
                <Compass className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium text-indigo-600 dark:text-indigo-300">
                  Ponts Conceptuels S1 (PST 106 - 108 - 123) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-flash-citations-s1")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20"
              >
                <Quote className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium text-amber-600 dark:text-amber-300">
                  Flash-Citations Incontournables S1 (Mode Trous / Audio) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-chrono-examen")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20"
              >
                <Timer className="size-4 text-emerald-500 shrink-0" />
                <span className="font-medium text-emerald-600 dark:text-emerald-300">
                  Simulateur Chrono-Examen Écrit (2h / 3h CNAM) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/123/#matrice")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20"
              >
                <Layers className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium text-purple-600 dark:text-purple-300">
                  Matrice Dubar &amp; Sainsaulieu (PST123 Cas Pratiques) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-generateur-intro")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20"
              >
                <FileSignature className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium text-indigo-600 dark:text-indigo-300">
                  Générateur d&apos;Introductions &amp; Problématiques 18/20 ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-dictaphone-oral")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20"
              >
                <Mic className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium text-purple-600 dark:text-purple-300">
                  Dictaphone Vocal d&apos;Auto-Évaluation (Flash-Oral 2 min) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/106/#diagnostic")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-teal-500/20 bg-teal-50/30 dark:bg-teal-950/20"
              >
                <Activity className="size-4 text-teal-500 shrink-0" />
                <span className="font-medium text-teal-600 dark:text-teal-300">
                  Labo Diagnostic 106 (Leplat &amp; Hoc $\times$ Yves Clot) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/108/#iod")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20"
              >
                <HeartHandshake className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium text-amber-600 dark:text-amber-300">
                  Simulateur de Négociation IOD (Francis Valls &amp; Castra) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/123/#deonto")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20"
              >
                <Gavel className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium text-indigo-600 dark:text-indigo-300">
                  Tribunal Déontologique du Titre (Loi 1985 &amp; Code 2021) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/106/#autoconfrontation")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-teal-500/20 bg-teal-50/30 dark:bg-teal-950/20"
              >
                <Film className="size-4 text-teal-500 shrink-0" />
                <span className="font-medium text-teal-600 dark:text-teal-300">
                  Simulateur d&apos;Autoconfrontation &amp; Sosie (PST106) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/108/#langage")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20"
              >
                <MessageSquare className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium text-amber-600 dark:text-amber-300">
                  Décodeur Langage &amp; Pragmatique (PST108 Bühler &amp; Habermas) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/pst/123/#biographie")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20"
              >
                <User className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium text-purple-600 dark:text-purple-300">
                  Annotateur de Récits de Vie (PST123 Bourdieu &amp; Hughes) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-correcteur-copie")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20"
              >
                <FileSearch className="size-4 text-rose-500 shrink-0" />
                <span className="font-medium text-rose-600 dark:text-rose-300">
                  Correcteur &amp; Scanner Anti-Psychologisation CNAM ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-radar-s1")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20"
              >
                <Target className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium text-indigo-600 dark:text-indigo-300">
                  Radar de Maîtrise S1 &amp; Bootcamp Express (15 min) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-tableau-ad")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20"
              >
                <Calendar className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium text-amber-600 dark:text-amber-300">
                  Tableau de Bord Unifié des AD (13 Travaux Distants S1) ✦
                </span>
              </button>
              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-briefing-30s")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Zap className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium">
                  Briefing Tactique 30s (Oral / Partiel)
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-memoire-studio")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <FileText className="size-4 text-indigo-500 shrink-0" />
                <span className="font-medium">
                  Studio Mémoire &amp; Verrou Pré-Soutenance
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-clinical-protocols")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <FileSignature className="size-4 text-emerald-500 shrink-0" />
                <span className="font-medium">
                  Actes &amp; Protocoles Cliniques (6 modèles)
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-biblio-vault")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <BookMarked className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-medium">
                  Coffre Bibliographique APA 7
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-exam-simulator")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Clock className="size-4 text-rose-500 shrink-0" />
                <span className="font-medium">
                  Simulateur Examen Blanc (2h00)
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-clinical-cases")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Briefcase className="size-4 text-cyan-500 shrink-0" />
                <span className="font-medium">
                  Banque de Cas Cliniques Corrigés
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-field-journal")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <ClipboardList className="size-4 text-teal-500 shrink-0" />
                <span className="font-medium">
                  Chronique d'Activité &amp; Dictée Vocale
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-deonto-audit")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Scale className="size-4 text-rose-500 shrink-0" />
                <span className="font-medium">
                  Audit Déontologique &amp; Dilemmes (Code 2021)
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-oral-defense")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <GraduationCap className="size-4 text-amber-500 shrink-0" />
                <span className="font-medium">
                  Soutenance Orale &amp; Grand Jury (15m/30m)
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-intervention-comms")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <FileSignature className="size-4 text-accent shrink-0" />
                <span className="font-medium">
                  Courriers &amp; Notes d'Intervention Terrain
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerHubModal("pst:open-disaster-recovery")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Database className="size-4 text-cyan-500 shrink-0" />
                <span className="font-medium">
                  Inspecteur Stockage &amp; Restauration
                </span>
              </button>
            </div>
          </div>

          {/* 5. Navigation Rapide */}
          <div className="space-y-1 pt-1 border-t border-border/60">
            <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Navigation Rapide
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleNavigate("/pst")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Layers className="size-4 text-primary shrink-0" />
                <span className="font-medium">Poste de Pilotage PST</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/pst/planning")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Calendar className="size-4 text-accent shrink-0" />
                <span className="font-medium">Planning &amp; Frise</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/pst/#pyramide")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <GraduationCap className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Pyramide RNCP 7</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/pst/#matrice-doctrinale")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Scale className="size-4 text-accent shrink-0" />
                <span className="font-medium">Matrice des 5 Courants</span>
              </button>

              <button
                type="button"
                onClick={handleExportIcs}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Download className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-medium">Exporter l'agenda (.ics)</span>
              </button>

              <button
                type="button"
                onClick={handleToggleTheme}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Sun className="size-4 text-amber-500 shrink-0 dark:hidden" />
                <Moon className="size-4 text-blue-400 shrink-0 hidden dark:block" />
                <span className="font-medium">
                  Basculer le thème Sombre / Clair
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <BookOpen className="size-4 text-muted-foreground shrink-0" />
                <span className="font-medium">Retour au cabinet public</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="border-t border-border/70 px-4 py-2.5 bg-muted/30 text-muted-foreground flex items-center justify-between text-[11px] shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                K
              </kbd>
              <span className="ml-0.5">Palette</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                Échap
              </kbd>
              <span className="ml-0.5">Fermer</span>
            </span>
          </div>

          <span className="text-[10px]">CNAM · RNCP 7</span>
        </div>
      </div>
    </div>
  );
}
