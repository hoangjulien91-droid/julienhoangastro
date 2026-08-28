"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import {
  CheckCircle2,
  Trophy,
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface ModuleProgress {
  id: string;
  code: string;
  title: string;
  ects: number;
  status: "valide" | "en_cours" | "a_venir";
  sitePath?: string;
  level: number;
  note?: string;
}

const STORAGE_KEY = "cnam_pst_curriculum_progress_v1";

const INITIAL_MODULES: ModuleProgress[] = [
  // Niveau 1
  {
    id: "pst001",
    code: "PST 001",
    title: "Statistiques & Initiation psychologie",
    ects: 4,
    status: "valide",
    level: 1,
    note: "Éligible VES",
  },
  {
    id: "pst002",
    code: "PST 002",
    title: "Intro psychologie clinique",
    ects: 6,
    status: "valide",
    level: 1,
  },
  {
    id: "pst003",
    code: "PST 003",
    title: "Intro psychologie sociale des orgs",
    ects: 6,
    status: "valide",
    level: 1,
  },
  {
    id: "pst004",
    code: "PST 004",
    title: "Intro psychologie cognitive",
    ects: 6,
    status: "valide",
    level: 1,
  },

  // Niveau 2
  {
    id: "pst106",
    code: "PST 106",
    title: "Clinique de l'activité",
    ects: 6,
    status: "en_cours",
    sitePath: "/pst/106/",
    level: 2,
  },
  {
    id: "pst108",
    code: "PST 108*",
    title: "Langage & clinique du dialogue",
    ects: 6,
    status: "en_cours",
    sitePath: "/pst/108/",
    level: 2,
    note: "Validable en Année 3 (Dérogatoire)",
  },
  {
    id: "pst120",
    code: "PST 120",
    title: "Psychodynamique & psychopathologie",
    ects: 6,
    status: "en_cours",
    sitePath: "/pst/120/",
    level: 2,
  },
  {
    id: "pst123",
    code: "PST 123",
    title: "Le psychologue, le travail & l'emploi",
    ects: 6,
    status: "en_cours",
    sitePath: "/pst/123/",
    level: 2,
  },
  {
    id: "pst124",
    code: "PST 124",
    title: "Transformation digitale & usages",
    ects: 6,
    status: "en_cours",
    sitePath: "/pst/124/",
    level: 2,
  },

  // Niveau 3
  {
    id: "pst116",
    code: "PST 116",
    title: "Clinique de l'expérience pro",
    ects: 12,
    status: "a_venir",
    level: 3,
    note: "Agrément requis",
  },
  {
    id: "pst117",
    code: "PST 117",
    title: "Textes & théories en psychologie",
    ects: 12,
    status: "a_venir",
    level: 3,
    note: "Agrément requis",
  },

  // Niveau 4
  {
    id: "pst115",
    code: "PST 115",
    title: "Méthodes psychométriques",
    ects: 6,
    status: "a_venir",
    level: 4,
  },
  {
    id: "pst218",
    code: "PST 218",
    title: "Pratiques de terrain & Stage",
    ects: 12,
    status: "a_venir",
    level: 4,
  },

  // Niveau 5
  {
    id: "rncp_uas08",
    code: "UA S08",
    title: "Dossier RNCP + Rapport d'expérience pro",
    ects: 34,
    status: "a_venir",
    level: 5,
  },
  {
    id: "pst219",
    code: "PST 219",
    title: "Méthodologie du mémoire & Séminaire",
    ects: 12,
    status: "a_venir",
    level: 5,
    note: "Pré-requis : Cursus + 2 ans exp pro + Agrément",
  },
  {
    id: "memoire",
    code: "MÉMOIRE",
    title: "Soutenance du mémoire de Titre 7",
    ects: 48,
    status: "a_venir",
    level: 5,
  },
];

const TOTAL_ECTS = INITIAL_MODULES.reduce((acc, m) => acc + m.ects, 0); // 188 ECTS

export function CurriculumPyramidCard() {
  const [modules, setModules] = useState<ModuleProgress[]>(INITIAL_MODULES);
  const [hydrated, setHydrated] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Record<string, "valide" | "en_cours" | "a_venir"> =
          JSON.parse(stored);
        setModules((prev) =>
          prev.map((m) => ({
            ...m,
            status: parsed[m.id] ?? m.status,
          })),
        );
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  function toggleStatus(id: string) {
    setModules((prev) => {
      const next = prev.map((m) => {
        if (m.id !== id) return m;
        const nextStatus: "valide" | "en_cours" | "a_venir" =
          m.status === "valide"
            ? "en_cours"
            : m.status === "en_cours"
              ? "a_venir"
              : "valide";
        return { ...m, status: nextStatus };
      });

      if (hydrated) {
        const savedMap: Record<string, string> = {};
        next.forEach((m) => {
          savedMap[m.id] = m.status;
        });
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMap));
        } catch {
          // ignore
        }
      }

      return next;
    });
  }

  const validatedEcts = modules
    .filter((m) => m.status === "valide")
    .reduce((acc, m) => acc + m.ects, 0);

  const pctValidated = Math.round((validatedEcts * 100) / TOTAL_ECTS);

  const getMod = (id: string) => modules.find((m) => m.id === id);

  return (
    <div className="card bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 rounded-2xl mb-6 shadow-sm overflow-hidden">
      {/* Header & Progobarre ECTS */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-xl">
            <Trophy className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
              <span>
                Parcours &amp; Pyramide RNCP 7 — Psychologue du travail
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              Cliquez sur n&apos;importe quelle UE pour ajuster son statut
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
          <Award className="size-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-black text-slate-900 dark:text-slate-100">
            {validatedEcts} / {TOTAL_ECTS} ECTS
          </span>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold ml-1">
            ({pctValidated}%)
          </span>
        </div>
      </div>

      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6 border border-slate-200/60 dark:border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${pctValidated}%` }}
        />
      </div>

      {/* Le Mur de Briques (Pyramide Solide) */}
      <div className="flex flex-col rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 overflow-x-auto lg:overflow-x-visible">
        <div className="min-w-150 lg:min-w-0 flex flex-col w-full ring-1 ring-black/5 dark:ring-white/5">
          {/* LIGNE NIVEAU 5 */}
          <div className="flex w-full bg-sky-950">
            {/* Année & Flèche */}
            <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80">
              <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
                Année 5{" "}
                <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                  1 an
                </span>
              </div>
              <div className="w-5 sm:w-6 relative flex justify-center pt-3">
                <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 rounded-t-sm h-full relative shadow-sm">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-b-[6px] border-b-amber-400 dark:border-b-amber-500/80 size-0 border-x-[5px] border-x-transparent" />
                </div>
              </div>
            </div>
            {/* Centre */}
            <div className="flex-1 flex flex-col min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
              <PyramidBlock
                item={getMod("memoire")}
                onToggle={toggleStatus}
                bgClass="bg-sky-950 text-sky-50"
              />
              <div className="grid grid-cols-2">
                <PyramidBlock
                  item={getMod("pst219")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-950 text-sky-50"
                />
                <PyramidBlock
                  item={getMod("rncp_uas08")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-900 text-sky-50"
                />
              </div>
            </div>
            {/* Catégorie droite */}
            <div className="w-32 lg:w-44 shrink-0 flex flex-col border-l border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex-1 p-2 flex flex-col justify-center relative">
                <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
                <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                  Préparation et rédaction
                </span>
                <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                  60 ECTS
                </span>
              </div>
              <div className="flex-1 p-2 flex flex-col justify-center border-t border-slate-200 dark:border-slate-700/80 relative">
                <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
                <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                  Dépôt du dossier
                </span>
                <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                  34 ECTS
                </span>
              </div>
            </div>
          </div>

          {/* LIGNE NIVEAU 4 */}
          <div className="flex w-full bg-sky-900">
            {/* Année & Flèche */}
            <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
                Année 4{" "}
                <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                  1 an
                </span>
              </div>
              <div className="w-5 sm:w-6 relative flex justify-center">
                <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full shadow-sm" />
              </div>
            </div>
            {/* Centre */}
            <div className="flex-1 flex flex-col min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
              <div className="grid grid-cols-2 h-full">
                <PyramidBlock
                  item={getMod("pst115")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-900 text-sky-50"
                />
                <PyramidBlock
                  item={getMod("pst218")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-900 text-sky-50"
                />
              </div>
            </div>
            {/* Catégorie droite */}
            <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
              <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
              <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                Module de pro. (suite)
              </span>
            </div>
          </div>

          {/* LIGNE NIVEAU 3 */}
          <div className="flex w-full bg-sky-800">
            {/* Année & Flèche */}
            <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
                Année 3{" "}
                <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                  1 an
                </span>
              </div>
              <div className="w-5 sm:w-6 relative flex justify-center">
                <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full shadow-sm" />
              </div>
            </div>
            {/* Centre */}
            <div className="flex-1 flex flex-col min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
              <div className="grid grid-cols-2 h-full">
                <PyramidBlock
                  item={getMod("pst116")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-800 text-sky-50"
                />
                <PyramidBlock
                  item={getMod("pst117")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-800 text-sky-50"
                />
              </div>
            </div>
            {/* Catégorie droite */}
            <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
              <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
              <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                Module de pro.
              </span>
              <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                42 ECTS (A3 + A4)
              </span>
            </div>
          </div>

          {/* LIGNE NIVEAU 2 */}
          <div className="flex w-full bg-sky-700">
            {/* Année & Flèche */}
            <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
                Année 2{" "}
                <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                  1 an
                </span>
              </div>
              <div className="w-5 sm:w-6 relative flex justify-center">
                <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full shadow-sm" />
              </div>
            </div>
            {/* Centre */}
            <div className="flex-1 min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
              <div className="grid grid-cols-5 h-full">
                <PyramidBlock
                  item={getMod("pst106")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-700 text-sky-50"
                  isSiteModule
                />
                <PyramidBlock
                  item={getMod("pst108")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-700 text-sky-50"
                  isSiteModule
                />
                <PyramidBlock
                  item={getMod("pst120")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-700 text-sky-50"
                  isSiteModule
                />
                <PyramidBlock
                  item={getMod("pst123")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-700 text-sky-50"
                  isSiteModule
                />
                <PyramidBlock
                  item={getMod("pst124")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-700 text-sky-50"
                  isSiteModule
                />
              </div>
            </div>
            {/* Catégorie droite */}
            <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
              <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
              <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                Psychologie du travail et clinique
              </span>
              <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                30 ECTS
              </span>
            </div>
          </div>

          {/* LIGNE NIVEAU 1 */}
          <div className="flex w-full bg-sky-600">
            {/* Année & Flèche */}
            <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
                Année 1{" "}
                <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                  1 an
                </span>
              </div>
              <div className="w-5 sm:w-6 relative flex justify-center pb-3">
                <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full rounded-b-full shadow-sm" />
              </div>
            </div>
            {/* Centre */}
            <div className="flex-1 min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
              <div className="grid grid-cols-4 h-full">
                <PyramidBlock
                  item={getMod("pst001")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-600 text-sky-50"
                />
                <PyramidBlock
                  item={getMod("pst002")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-600 text-sky-50"
                />
                <PyramidBlock
                  item={getMod("pst003")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-600 text-sky-50"
                />
                <PyramidBlock
                  item={getMod("pst004")}
                  onToggle={toggleStatus}
                  bgClass="bg-sky-600 text-sky-50"
                />
              </div>
            </div>
            {/* Catégorie droite */}
            <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
              <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
              <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2 flex flex-col gap-1">
                <span>Introduction à la psychologie</span>
              </span>
              <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                22 ECTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordéon Informations Pédagogiques & Inscriptions CNAM */}
      <div className="mt-6 border-t border-slate-200/80 dark:border-slate-800 pt-4">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700/80 text-left transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-lg">
              <BookOpen className="size-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>
                  Guide Pédagogique, Parcours Théorique &amp; Pratique CNAM
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Recommandations d'inscription, pré-requis du PST108 et agréments
                du mémoire (PST219)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://formation.cnam.fr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded-lg transition-all shadow-xs"
            >
              <span>S'inscrire aux UE</span>
              <ExternalLink className="size-3" />
            </a>
            {showGuide ? (
              <ChevronUp className="size-4 text-slate-400" />
            ) : (
              <ChevronDown className="size-4 text-slate-400" />
            )}
          </div>
        </button>

        {showGuide && (
          <div className="mt-3 p-4 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-4">
            <div className="space-y-1.5">
              <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <BookOpen className="size-3.5" />
                <span>1. La Formation Théorique (Années 1 &amp; 2)</span>
              </div>
              <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                Les UE d'introduction (Année 1) et les UE de spécialisation
                clinique (Année 2) sont gérées <b>&quot;à la carte&quot;</b>.
                <br />
                💡 <b>Conseil pédagogique :</b> Il est vivement conseillé de
                débuter et valider les 4 UE d'introduction avant d'aborder la
                spécialisation.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <GraduationCap className="size-3.5" />
                <span>
                  2. La Formation Pratique &amp; Clinique (Années 3 &amp; 4)
                </span>
              </div>
              <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                L'accès aux modules exige la validation préalable de{" "}
                <b>toute la formation théorique</b>.
                <br />
                ⚠️ <b>Exception dérogatoire :</b> Le <code>PST108</code> peut
                être validé de manière dérogatoire lors de la 1ère année de
                pratique (Année 3).
                <br />
                🔑 <b>Agrément obligatoire :</b> Les UE de professionnalisation
                sont soumises à l'agrément préalable.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Trophy className="size-3.5" />
                <span>3. Travaux de fin d'études (Année 5 / PST219)</span>
              </div>
              <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                📋 <b>Conditions préalables indispensables :</b>
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-1">
                <li>Validé l'ensemble des UE du cursus (ou obtenu une VES).</li>
                <li>Validé l'expérience professionnelle de 2 ans.</li>
                <li>Reçu l'agrément officiel.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Légende interactive en bas de carte */}
      <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Légende clics :
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
            <span className="size-2.5 rounded-sm bg-emerald-600 inline-block" />{" "}
            Validé
          </span>
          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
            <span className="size-2.5 rounded-sm bg-amber-600 inline-block" />{" "}
            En cours
          </span>
          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
            <span className="size-2.5 rounded-sm bg-[#5189B4] inline-block" /> À
            venir
          </span>
        </div>

        <div className="text-[11px] text-slate-500 italic">
          💡 Les couleurs par défaut reflètent la maquette officielle du CNAM.
        </div>
      </div>
    </div>
  );
}

function PyramidBlock({
  item,
  onToggle,
  bgClass,
  isSiteModule = false,
}: {
  item?: ModuleProgress | undefined;
  onToggle: (id: string) => void;
  bgClass: string;
  isSiteModule?: boolean;
}) {
  if (!item) return null;

  const isValidated = item.status === "valide";
  const isInProgress = item.status === "en_cours";

  // Les briques ont des bordures strictes et pas de rounded
  const activeClass = isValidated
    ? "bg-emerald-600 text-white"
    : isInProgress
      ? "bg-amber-600 text-white"
      : `${bgClass} opacity-95 hover:opacity-100`;

  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`p-2.5 border border-black/20 dark:border-white/10 transition-colors cursor-pointer relative group flex flex-col justify-between h-full ${activeClass}`}
    >
      <div className="flex items-center justify-between text-[11px] font-black tracking-wide">
        <span className="flex items-center gap-1">
          {item.code}
          {isValidated && (
            <CheckCircle2 className="size-3 text-white shrink-0" />
          )}
        </span>
        <span className="opacity-90 font-mono text-[10px]">
          ({item.ects} ects)
        </span>
      </div>

      <div
        className="text-[11px] font-bold truncate mt-1 leading-tight"
        title={item.title}
      >
        {item.title}
      </div>

      {item.note && (
        <div
          className="text-[9px] font-medium opacity-85 italic truncate mt-0.5"
          title={item.note}
        >
          {item.note}
        </div>
      )}

      {isSiteModule && item.sitePath && (
        <div className="mt-2 pt-1 flex items-center justify-end">
          <Link
            href={item.sitePath}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="text-[10px] font-black uppercase hover:underline flex items-center gap-0.5"
          >
            <span>Atelier</span>
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
