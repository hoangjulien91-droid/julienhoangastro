"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/components/common/Link";
import {
  Layers,
  BookOpen,
  History,
  Zap,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Swords,
  ShieldAlert,
  Printer,
  Compass,
  Palette,
  ArrowRight,
  Calendar,
  Search,
  X,
  Sparkles,
  GitFork,
} from "lucide-react";
import { computeGlobalStats, INDEX } from "@/lib/pst/hub-stats";
import { ModulesNav } from "@/components/pst/shell/ModulesNav";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import { SUJETS_DISSERTATION } from "@/components/pst/study-tools/SujetsDissertationModal";
import { NextEventCard } from "./NextEventCard";
import { DailyWorkoutCard } from "./DailyWorkoutCard";
import { ModulePortalGrid } from "./ModulePortalGrid";
import { GlossarySearch } from "./GlossarySearch";
import { ConceptGraphSvg } from "./ConceptGraphSvg";
import { GlobalTimeline } from "./GlobalTimeline";
import { ExamCountdownCard } from "./ExamCountdownCard";
import { CurriculumPyramidCard } from "./CurriculumPyramidCard";
import { StatsCards } from "./StatsCards";
import { ActivityHeatmap } from "./ActivityHeatmap";

interface ExerciceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  event: string;
}

const EXERCICES: ExerciceItem[] = [
  {
    id: "ponts",
    title: "Ponts & Passerelles Transversales",
    description:
      "Articulations dialectiques, résonances conceptuelles et matrice comparée des 7 courants pour faire le lien inter-PST.",
    badge: "Synergies & Liens",
    icon: GitFork,
    event: "pst:open-ponts-transversaux",
  },
  {
    id: "match",
    title: "Match des Auteurs (1 vs 1)",
    description:
      "Confrontez deux théoriciens sur une situation réelle (Clot vs Dejours, Austin vs Bourdieu, Honneth vs Castel...).",
    badge: "Dialectique",
    icon: Swords,
    event: "pst:open-match-auteurs",
  },
  {
    id: "speedrun",
    title: "Sprint Chronométré (3 min)",
    description:
      "Entraînement réflexe sous contrainte temporelle pour consolider les notions clés.",
    badge: "Chrono 180s",
    icon: Zap,
    event: "pst:open-speed-run",
  },
  {
    id: "detective",
    title: "Détective des Pièges d'Examen",
    description:
      "Identifiez les confusions classiques (prescrit vs réel, tâche vs activité, déviance vs étiquetage...).",
    badge: "Auto-Évaluation",
    icon: ShieldAlert,
    event: "pst:open-detective",
  },
  {
    id: "sujets",
    title: "Sujets de Dissertation & Plans",
    description:
      "Banque d'annales officielles décortiquées avec problématiques et plans détaillés d'examen.",
    badge: "Écrit & Plans",
    icon: GraduationCap,
    event: "pst:open-sujets-dissertation",
  },
  {
    id: "fiche",
    title: "Fiche Mémo de Poche A4",
    description:
      "Support synthétique imprimable recto-verso regroupant l'essentiel des 5 UE pour les révisions nomades.",
    badge: "Support A4",
    icon: Printer,
    event: "pst:open-fiche-poche",
  },
  {
    id: "audio",
    title: "Écoute Audio des Auteurs",
    description:
      "Écoute immersive de citations canoniques à identifier à l'oreille pour stimuler la mémoire auditive.",
    badge: "Mémoire Audio",
    icon: Headphones,
    event: "pst:open-blind-test",
  },
  {
    id: "palais",
    title: "Palais de la Mémoire",
    description:
      "Cartographie spatiale et conceptuelle articulant PST106, PST108 et PST123 en un seul édifice.",
    badge: "Transversal",
    icon: Compass,
    event: "pst:open-palais-memoire",
  },
  {
    id: "briefing",
    title: "Briefing Flash 30s (Jour J)",
    description:
      "Thèse centrale, citations clés, concepts incontournables et erreurs fatales par UE pour les révisions express.",
    badge: "Réflexe 30s",
    icon: Zap,
    event: "pst:open-briefing-30s",
  },
  {
    id: "roleplay",
    title: "Simulation & Négociation IOD",
    description:
      "Mise en situation professionnelle : posture du psychologue face aux demandes managériales et d'insertion.",
    badge: "Posture Clinique",
    icon: HeartHandshake,
    event: "pst:open-roleplay",
  },
];

export function HubContent() {
  const stats = useMemo(() => computeGlobalStats(), []);
  const [activeTab, setActiveTab] = useState<
    "exercices" | "schemas" | "lexique"
  >("exercices");
  const [searchQuery, setSearchQuery] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<"all" | "s1" | "s2">(
    "s1",
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return null;

    const glossaireMatches = INDEX.glossaire
      .filter(
        (g) => g.w.toLowerCase().includes(q) || g.def.toLowerCase().includes(q),
      )
      .slice(0, 4);

    const schemaMatches = SCHEMAS_MATRICES.filter(
      (s) =>
        s.titre.toLowerCase().includes(q) ||
        s.auteur.toLowerCase().includes(q) ||
        s.descriptionPedagogique.toLowerCase().includes(q),
    ).slice(0, 3);

    const dissertationMatches = SUJETS_DISSERTATION.filter(
      (d) =>
        d.titre.toLowerCase().includes(q) ||
        d.problematique.toLowerCase().includes(q),
    ).slice(0, 3);

    const hasAny =
      glossaireMatches.length > 0 ||
      schemaMatches.length > 0 ||
      dissertationMatches.length > 0;
    return { glossaireMatches, schemaMatches, dissertationMatches, hasAny };
  }, [searchQuery]);

  function openSchema(schemaId: string, moduleKey: string) {
    window.dispatchEvent(
      new CustomEvent("pst:open-schemas", {
        detail: { schemaId, moduleKey },
      }),
    );
  }

  return (
    <div className="pb-16 max-w-7xl mx-auto">
      {/* 1. Navigation Principale */}
      <ModulesNav active="hub" />

      {/* 2. En-tête Épuré iOS — Minimaliste & Fonctionnel */}
      <div className="mt-4 sm:mt-6 mb-6 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xs">
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

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/pst/106/"
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="size-3.5 text-white" />
              <span>Reprendre l&apos;étude →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2.bis. BARRE DE RECHERCHE UNIVERSELLE INSTANTANÉE */}
      <div className="mb-6 space-y-2">
        <div className="relative group focus-within:ring-2 focus-within:ring-indigo-500/50 rounded-2xl transition-all">
          <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un auteur (Dejours, Clot, Bourdieu), un concept ou un sujet d'examen..."
            className="w-full pl-10 pr-16 py-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 backdrop-blur-md shadow-xs focus:outline-none transition-all"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Suggestions rapides si champ vide */}
        {!searchQuery && (
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none px-1 text-[11px]">
            <span className="text-slate-400 font-mono">Suggestions :</span>
            {[
              "Yves Clot",
              "Christophe Dejours",
              "Pierre Bourdieu",
              "Méthode IOD",
              "Code de déontologie",
              "Wisner",
              "Pouvoir d'agir",
            ].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 dark:hover:border-indigo-800/60 border border-transparent text-slate-700 dark:text-slate-300 font-medium transition-all active:scale-95 cursor-pointer shadow-2xs"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Résultats groupés instantanés */}
        {searchResults && (
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Résultats pour « {searchQuery} »
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                Fermer
              </button>
            </div>

            {!searchResults.hasAny ? (
              <p className="text-xs text-slate-500 m-0 py-2">
                Aucun résultat exact trouvé. Essayez avec un mot-clé plus court.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Concepts du Glossaire */}
                {searchResults.glossaireMatches.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                      Glossaire &amp; Définitions
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.glossaireMatches.map((g) => (
                        <div
                          key={g.w}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              {g.w}
                            </span>
                            <span className="text-[9.5px] font-mono uppercase px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300">
                              {g.m.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 m-0 leading-snug">
                            {g.def}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Schémas & Matrices */}
                {searchResults.schemaMatches.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                      Schémas Vectoriels SVG
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.schemaMatches.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            openSchema(s.id, s.moduleKey);
                            setSearchQuery("");
                          }}
                          className="p-2.5 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 cursor-pointer transition-all space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-cyan-950 dark:text-cyan-200">
                              {s.titre}
                            </span>
                            <span className="text-[9.5px] font-mono text-cyan-600">
                              {s.moduleKey.toUpperCase()}
                            </span>
                          </div>
                          <span className="block text-[10.5px] text-slate-500">
                            {s.auteur} · {s.annee}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Sujets de Dissertation */}
                {searchResults.dissertationMatches.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                      Sujets d&apos;Examen 18/20
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.dissertationMatches.map((d) => (
                        <div
                          key={d.id}
                          onClick={() => {
                            window.dispatchEvent(
                              new CustomEvent("pst:open-sujets-dissertation"),
                            );
                            setSearchQuery("");
                          }}
                          className="p-2.5 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 cursor-pointer transition-all space-y-1"
                        >
                          <span className="font-bold text-indigo-950 dark:text-indigo-200 line-clamp-2 block leading-snug">
                            {d.titre}
                          </span>
                          <span className="block text-[10px] text-indigo-600 dark:text-indigo-400">
                            {d.moduleKey.toUpperCase()} · Consulter le plan
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

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
        />
      </div>

      {/* 5. SÉLECTEUR SEGMENTÉ iOS — Navigation Thématique sans Scroll Infini */}
      <div className="pt-2 mb-6 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("exercices")}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "exercices"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Exercices &amp; Entraînement
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("schemas")}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "schemas"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Schémas &amp; Histoire
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("lexique")}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "lexique"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Lexique &amp; Cursus
            </button>
          </div>
        </div>
      </div>

      {/* 6. VUE ACTIVE DU SÉLECTEUR */}
      {activeTab === "exercices" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                Outils d&apos;Entraînement Clinique
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {EXERCICES.length} Exercices Interactifs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {EXERCICES.map((ex) => {
              const Icon = ex.icon;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent(ex.event))
                  }
                  className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all text-left flex flex-col justify-between group active:scale-[0.98] cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="size-4.5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80">
                        {ex.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                      {ex.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {ex.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    <span>Lancer l&apos;exercice</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "schemas" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Section Schémas Vectoriels */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Palette className="size-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  11 Schémas &amp; Matrices Visuelles d&apos;Examen
                </h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("pst:open-schemas"))
                }
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ouvrir la visionneuse plein écran</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {SCHEMAS_MATRICES.map((sch) => (
                <div
                  key={sch.id}
                  onClick={() => openSchema(sch.id, sch.moduleKey)}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 shadow-2xs transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        {sch.moduleKey.toUpperCase()}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {sch.annee}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                      {sch.titre}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 m-0">
                      {sch.auteur}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed m-0">
                      {sch.descriptionPedagogique}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                    <span>Explorer &amp; Schématiser</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Frise Chronologique */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <History className="size-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  Chronologie Historique des Théories (1880 — 2026)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Généalogie des Écoles
              </span>
            </div>
            <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs">
              <GlobalTimeline />
            </div>
          </div>
        </div>
      )}

      {activeTab === "lexique" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Glossaire & Cartes Mémo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  Glossaire Transversal &amp; Auto-Évaluation
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {INDEX.glossaire.length} Concepts Définis
              </span>
            </div>
            <GlossarySearch />
          </div>

          {/* Graphe Relationnel des Concepts */}
          <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Compass className="size-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  Carte des Concepts &amp; Controverses
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Topologie Inter-Modules
              </span>
            </div>
            <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs">
              <ConceptGraphSvg />
            </div>
          </div>

          {/* Échéancier Examens & Pyramide Cursus */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <ExamCountdownCard />
            <CurriculumPyramidCard />
          </div>

          {/* Progression Globale */}
          <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
              Progression Globale &amp; Assiduité SM-2
            </h4>
            <StatsCards stats={stats} />
            <div className="pt-2">
              <ActivityHeatmap activeDays={stats.activeDays} />
            </div>
          </div>
        </div>
      )}

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
