"use client";

import { useState, useEffect } from "react";
import {
  X,
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Brain,
  GraduationCap,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";

interface PalaisMemoireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

interface ModuleDimensionItem {
  focus: string;
  conceptCle: string;
  formule: string;
  schemaId: string;
  schemaNom: string;
}

interface DimensionSynoptique {
  dimension: string;
  pst106: ModuleDimensionItem;
  pst108: ModuleDimensionItem;
  pst123: ModuleDimensionItem;
  pst120: ModuleDimensionItem;
  pst124: ModuleDimensionItem;
}

const DIMENSIONS_COMPARATIVES: DimensionSynoptique[] = [
  {
    dimension: "1. Objet d'étude & Question Fondamentale",
    pst106: {
      focus: "L'activité réelle de travail et la santé de l'opérateur.",
      conceptCle: "L'écart irréductible Prescrit vs Réel",
      formule: "Comment l'Homme régule-t-il la tâche sans y laisser sa santé ?",
      schemaId: "schema-leplat-regulation",
      schemaNom: "Leplat & Hoc : Régulation",
    },
    pst108: {
      focus: "L'interaction sociale, les rapports de pouvoir et le langage.",
      conceptCle: "L'espace délibératif & la légitimité du discours",
      formule:
        "Comment s'organise la communication entre domination et émancipation ?",
      schemaId: "schema-habermas-validite",
      schemaNom: "Habermas : Tétraèdre",
    },
    pst123: {
      focus:
        "La construction des identités sociales et la trajectoire biographique.",
      conceptCle: "La socialisation & les transactions identitaires",
      formule:
        "Comment l'individu négocie-t-il sa place et son statut dans la société ?",
      schemaId: "schema-dubar-double-transaction",
      schemaNom: "Dubar : Double Transaction",
    },
    pst120: {
      focus: "Le destin psychodynamique de la souffrance et la santé mentale au travail.",
      conceptCle: "La normalité souffrante & la dynamique de reconnaissance",
      formule: "Comment transformer la souffrance de l'épreuve du réel en santé sans décompenser ?",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Psychodynamique",
    },
    pst124: {
      focus: "Les métamorphoses numériques, l'activité instrumentée et la clinique des usages.",
      conceptCle: "L'acceptation située & la genèse instrumentale",
      formule: "Comment les technologies reconfigurent-elles l'activité sans détruire le pouvoir d'agir ?",
      schemaId: "schema-clot-activite-reelle",
      schemaNom: "Bobillier-Chaumon : Usages",
    },
  },
  {
    dimension: "2. Conception du Sujet Humain",
    pst106: {
      focus: "L'Opérateur régulateur & incarné (corps, ruse, souffrance).",
      conceptCle: "Intelligence pratique (Métis) & Mobilisation subjective",
      formule:
        "Le travailleur n'est pas un exécutant mécanique mais un régulateur ingénieux.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Reconnaissance",
    },
    pst108: {
      focus:
        "L'Acteur social situé, porteur d'habitus et d'intérêts symboliques.",
      conceptCle: "Habitus incorporé & Prétention à la validité",
      formule:
        "L'acteur négocie son autorité selon son capital et les règles du champ.",
      schemaId: "schema-bourdieu-algorithme",
      schemaNom: "Bourdieu : Algorithme",
    },
    pst123: {
      focus: "Le Sujet en transition biographique et quête de reconnaissance.",
      conceptCle: "Identité pour soi vs Identité pour autrui",
      formule:
        "L'identité est un compromis permanent entre histoire intime et étiquetage social.",
      schemaId: "schema-sainsaulieu-matrice",
      schemaNom: "Sainsaulieu : 4 Cultures",
    },
    pst120: {
      focus: "Le Sujet souffrant et désirant, animé par sa sensibilité corporelle et sa Mètis.",
      conceptCle: "Corps érogène au travail & Sublimation",
      formule: "Le travail est l'énigme d'un engagement pulsionnel et moral à l'épreuve de la matière.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Molinier : Care & Habiletés",
    },
    pst124: {
      focus: "L'Homme instrumenté créatif (braconnage, catachrèse) dans un système d'activité situé.",
      conceptCle: "Schèmes d'utilisation & Action située (Suchman)",
      formule: "L'utilisateur n'est pas un agent passif : il invente l'instrument dans l'activité.",
      schemaId: "schema-leplat-regulation",
      schemaNom: "Rabardel : Genèse",
    },
  },
  {
    dimension: "3. Diagnostic de la Souffrance / Pathologie",
    pst106: {
      focus:
        "Travail empêché, perte du genre professionnel, déni de reconnaissance.",
      conceptCle: "Souffrance éthique & Stratégies défensives",
      formule:
        "Quand la prescription empêche le travail bien fait ➔ TMS, burn-out, cynisme.",
      schemaId: "schema-clot-activite-reelle",
      schemaNom: "Clot : L'Iceberg du Réel",
    },
    pst108: {
      focus:
        "Violence symbolique, insulte managériale, agir stratégique trompeur.",
      conceptCle: "Colonisation du monde vécu & Mépris social",
      formule:
        "Quand le système instrumentalise le langage ➔ invisibilisation et mépris moral.",
      schemaId: "schema-honneth-spheres",
      schemaNom: "Honneth : 3 Sphères",
    },
    pst123: {
      focus:
        "Désaffiliation, déclassement, assignation subie, précarisation des liens.",
      conceptCle: "Zone de vulnérabilité & Identité de crise",
      formule:
        "Quand l'emploi précaire brise les attaches familiales ➔ décrochage citoyen.",
      schemaId: "schema-castel-desaffiliation",
      schemaNom: "Castel : Désaffiliation",
    },
    pst120: {
      focus: "Souffrance éthique, usure mentale, décompensation somatique et désespoir gestionnaire.",
      conceptCle: "Rupture des défenses collectives & Trahison des valeurs",
      formule: "Quand l'évaluation individuelle détruit la coopération ➔ effondrement et passage à l'acte.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Défenses",
    },
    pst124: {
      focus: "Prolétarisation des savoirs (Stiegler), taylorisme digital et hyper-surveillance algorithmique.",
      conceptCle: "Technologie incapacitante & Perte du jugement clinique",
      formule: "Quand l'algorithme opaque décide à la place de l'expert ➔ sentiment d'impuissance et rejet.",
      schemaId: "schema-cartographie-lagabrielle",
      schemaNom: "Stiegler : Pharmakon",
    },
  },
  {
    dimension: "4. Méthodologie d'Intervention & Transformation",
    pst106: {
      focus:
        "Analyse ergonomique du travail (AET), autoconfrontation croisée, débat sur le genre.",
      conceptCle:
        "Restauration du dialogue sur les critères du travail bien fait",
      formule:
        "Faire parler le réel pour réaménager les postes et soigner le métier.",
      schemaId: "schema-leplat-regulation",
      schemaNom: "Leplat : Ergonomie",
    },
    pst108: {
      focus:
        "Méthode IOD, ouverture d'espaces de délibération non faussés, médiation de poste.",
      conceptCle: "Intervention directe sur l'Offre de droit commun (zéro tri)",
      formule:
        "Négocier avec le patron pour adapter l'environnement à l'homme.",
      schemaId: "schema-valls-iod",
      schemaNom: "Valls & Castra : IOD",
    },
    pst123: {
      focus:
        "Triangulation clinique, co-construction de projet, bilan de trajectoire, déontologie.",
      conceptCle: "Alliance de travail & Indépendance du psychologue",
      formule:
        "Accompagner la bifurcation choisie sans devenir l'auxiliaire de sélection du patron.",
      schemaId: "schema-dubar-double-transaction",
      schemaNom: "Dubar : Bifurcation",
    },
    pst120: {
      focus: "Enquête en psychodynamique du travail, espace de délibération déontique, écoute collective.",
      conceptCle: "Délibération libre sur le travail & Jugement de beauté",
      formule: "Libérer la parole collective sur les tricheries nécessaires pour réhabiliter la sublimation.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Délibération",
    },
    pst124: {
      focus: "Clinique de l'usage, comités d'utilisateurs, conception continuée dans l'usage et technologies capacitantes.",
      conceptCle: "Espaces de controverse sur les outils & Pouvoir d'agir",
      formule: "Auditer l'outil à l'épreuve du travail réel pour adapter l'artefact aux besoins du métier.",
      schemaId: "schema-clot-activite-reelle",
      schemaNom: "Bobillier-Chaumon : Clinique",
    },
  },
];

export function PalaisMemoireModal({
  isOpen,
  onClose,
  defaultModule = "all",
}: PalaisMemoireModalProps) {
  const [activeTab, setActiveTab] = useState<
    "synoptique" | "constellation" | "pieges"
  >("synoptique");
  const [selectedModuleFocus, setSelectedModuleFocus] =
    useState<string>(defaultModule);
  const [scope, setScope] = useState<"s1" | "s2" | "all">("s1");

  useEffect(() => {
    if (isOpen) {
      setSelectedModuleFocus(defaultModule);
      if (defaultModule === "pst120" || defaultModule === "pst124") {
        setScope("s2");
      }
    }
  }, [isOpen, defaultModule]);

  if (!isOpen) return null;

  function handleOpenSchema(schemaId: string) {
    triggerHaptic("selection");
    playClickSound();
    onClose();
    window.dispatchEvent(
      new CustomEvent("pst:open-schemas", {
        detail: { schemaId },
      }),
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palais de Mémoire — Navigation Synoptique RNCP 7"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER iOS */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Compass className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
                <span className="truncate">Palais de la Mémoire 18/20</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-300 font-extrabold uppercase shrink-0">
                  {scope === "all" ? "RNCP 7 (5 UE)" : scope === "s2" ? "Semestre 2" : "Semestre 1"}
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
                Matrice synoptique intégrale des UEs du Titre Psychologue du Travail
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap shrink-0">
          {[
            { key: "synoptique", label: "Vue Synoptique", full: " Panoramique" },
            {
              key: "constellation",
              label: `${SCHEMAS_MATRICES.length} Schémas`,
              full: " en Constellation",
            },
            { key: "pieges", label: "6 Pièges Croisés", full: " Transversaux" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveTab(tab.key as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                activeTab === tab.key
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              <span className="hidden sm:inline">{tab.full}</span>
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === "synoptique" && (
            <div className="space-y-5">
              {/* Scope Switcher (S1 / S2 / All) */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold overflow-x-auto scrollbar-none whitespace-nowrap max-w-full">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setScope("s1");
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    scope === "s1"
                      ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Semestre 1 (PST106 · 108 · 123)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setScope("s2");
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    scope === "s2"
                      ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Semestre 2 (PST120 · 124)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setScope("all");
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    scope === "all"
                      ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Intégrale RNCP 7 (5 UE)
                </button>
              </div>

              {/* Pillar Headers */}
              <div
                className={`grid gap-3 ${
                  scope === "s1"
                    ? "grid-cols-1 md:grid-cols-3"
                    : scope === "s2"
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                }`}
              >
                {(scope === "s1" || scope === "all") && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-cyan-700 dark:text-cyan-300">
                          PST106
                        </span>
                        <span className="text-xs font-extrabold text-cyan-900 dark:text-cyan-200">
                          Ergonomie &amp; Clinique
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                        Wisner, Leplat, Clot
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 dark:text-indigo-300">
                          PST108
                        </span>
                        <span className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200">
                          Sociologie &amp; Comm.
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                        Bourdieu, Habermas, Valls
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-300">
                          PST123
                        </span>
                        <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                          Identités &amp; Emploi
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                        Dubar, Sainsaulieu, Hughes
                      </p>
                    </div>
                  </>
                )}

                {(scope === "s2" || scope === "all") && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-rose-700 dark:text-rose-300">
                          PST120
                        </span>
                        <span className="text-xs font-extrabold text-rose-900 dark:text-rose-200">
                          Psychodynamique S2
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                        Dejours, Molinier, Le Guillant
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-300">
                          PST124
                        </span>
                        <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">
                          Digital &amp; Usages S2
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                        Bobillier-Chaumon, Rabardel
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Rows of comparative dimensions */}
              <div className="space-y-4">
                {DIMENSIONS_COMPARATIVES.map((dim, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0">
                      <Sparkles className="size-4 text-purple-600" />
                      <span>{dim.dimension}</span>
                    </h4>

                    <div
                      className={`grid gap-3 pt-1 ${
                        scope === "s1"
                          ? "grid-cols-1 md:grid-cols-3"
                          : scope === "s2"
                            ? "grid-cols-1 md:grid-cols-2"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                      }`}
                    >
                      {(scope === "s1" || scope === "all") && (
                        <>
                          {/* PST106 Column */}
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-cyan-600 block">
                                PST106 · {dim.pst106.conceptCle}
                              </span>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                                {dim.pst106.focus}
                              </p>
                              <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                                « {dim.pst106.formule} »
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenSchema(dim.pst106.schemaId)}
                              className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyan-500/10 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-500/20 transition-all cursor-pointer mt-2"
                            >
                              <span>{dim.pst106.schemaNom}</span>
                              <Eye className="size-3" />
                            </button>
                          </div>

                          {/* PST108 Column */}
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-indigo-600 block">
                                PST108 · {dim.pst108.conceptCle}
                              </span>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                                {dim.pst108.focus}
                              </p>
                              <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                                « {dim.pst108.formule} »
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenSchema(dim.pst108.schemaId)}
                              className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/10 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-500/20 transition-all cursor-pointer mt-2"
                            >
                              <span>{dim.pst108.schemaNom}</span>
                              <Eye className="size-3" />
                            </button>
                          </div>

                          {/* PST123 Column */}
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-amber-600 block">
                                PST123 · {dim.pst123.conceptCle}
                              </span>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                                {dim.pst123.focus}
                              </p>
                              <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                                « {dim.pst123.formule} »
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenSchema(dim.pst123.schemaId)}
                              className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-200 hover:bg-amber-500/20 transition-all cursor-pointer mt-2"
                            >
                              <span>{dim.pst123.schemaNom}</span>
                              <Eye className="size-3" />
                            </button>
                          </div>
                        </>
                      )}

                      {(scope === "s2" || scope === "all") && (
                        <>
                          {/* PST120 Column */}
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-rose-600 block">
                                PST120 · {dim.pst120.conceptCle}
                              </span>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                                {dim.pst120.focus}
                              </p>
                              <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                                « {dim.pst120.formule} »
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenSchema(dim.pst120.schemaId)}
                              className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-500/10 text-rose-800 dark:text-rose-200 hover:bg-rose-500/20 transition-all cursor-pointer mt-2"
                            >
                              <span>{dim.pst120.schemaNom}</span>
                              <Eye className="size-3" />
                            </button>
                          </div>

                          {/* PST124 Column */}
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-emerald-600 block">
                                PST124 · {dim.pst124.conceptCle}
                              </span>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                                {dim.pst124.focus}
                              </p>
                              <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                                « {dim.pst124.formule} »
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenSchema(dim.pst124.schemaId)}
                              className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-500/20 transition-all cursor-pointer mt-2"
                            >
                              <span>{dim.pst124.schemaNom}</span>
                              <Eye className="size-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "constellation" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-800 dark:text-slate-200">
                <strong>Les {SCHEMAS_MATRICES.length} Schémas Canoniques Réunis :</strong> Cliquez sur
                n&apos;importe quelle carte pour ouvrir le schéma vectoriel SVG
                plein écran avec ses composantes interactives et ses conseils de
                reproduction d&apos;examen.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SCHEMAS_MATRICES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleOpenSchema(s.id)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 uppercase">
                        {s.moduleKey}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {s.auteur} ({s.annee})
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition-colors m-0">
                      {s.titre}
                    </h5>
                    <div className="flex items-center justify-end text-[10.5px] font-semibold text-purple-600 pt-1">
                      <span>Explorer en SVG →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pieges" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs text-slate-800 dark:text-slate-200">
                <strong className="text-rose-700 dark:text-rose-300">
                  Les 6 Pièges de Confusion Transversale aux Examens Cnam :
                </strong>
              </div>

              {[
                {
                  titre:
                    "Confusion Reconnaissance Dejours (PST106/120) vs Honneth (PST108)",
                  piege: "Mélanger les deux théories de la reconnaissance.",
                  antidote:
                    "Pour Dejours, la reconnaissance porte sur le FAIRE et l'effort réel (Jugement d'utilité + Jugement de beauté par les pairs). Pour Honneth, la reconnaissance porte sur l'ÊTRE et le statut moral du sujet à travers 3 sphères universelles (Amour, Droit, Solidarité).",
                },
                {
                  titre:
                    "Confusion Travail Réel Clot (PST106) vs Bourdieu (PST108)",
                  piege:
                    "Penser que l'activité réelle est simplement dictée par l'habitus.",
                  antidote:
                    "Clot montre que le Réel excède toujours ce qui est fait (activités empêchées, contrariées). Bourdieu insiste sur l'incorporation des structures sociales (habitus). La clinique de l'activité redonne du pouvoir d'agir au collectif de pairs, là où la sociologie critique dévoile la domination.",
                },
                {
                  titre:
                    "Confusion Insertion IOD Valls (PST108) vs Orientation Dubar (PST123)",
                  piege:
                    "Réduire IOD à un bilan de compétences ou une transaction biographique.",
                  antidote:
                    "La méthode IOD refuse expressément tout bilan et tout tri préalable du candidat : son levier d'action est l'OFFRE (l'employeur). Dubar analyse au contraire la négociation identitaire intime entre soi et autrui au fil de la vie.",
                },
                {
                  titre:
                    "Confusion Cultures Sainsaulieu (PST123) vs Habitus Bourdieu (PST108)",
                  piege:
                    "Croire que les cultures d'atelier sont des habitus figés.",
                  antidote:
                    "Pour Sainsaulieu, la culture d'entreprise est un apprentissage relationnel de l'adulte au travail (socialisation secondaire). L'atelier est une 'matrice démocratique' où le rapport au pouvoir forge la personnalité politique.",
                },
                {
                  titre:
                    "Confusion Souffrance Éthique Dejours (PST120) vs Activité Empêchée Clot (PST106)",
                  piege:
                    "Confondre l'atteinte morale du sens du travail et l'empêchement opératoire du geste.",
                  antidote:
                    "Pour Dejours, la souffrance éthique naît d'une trahison morale (devoir commettre des actes réprouvés par sa conscience, ex. tromper un client ou soigner trop vite). Pour Clot, l'activité empêchée naît de l'impossibilité matérielle ou organisationnelle de soigner son travail (travailler vite et mal), contrariant le genre professionnel.",
                },
                {
                  titre:
                    "Confusion Acceptation Située Bobillier-Chaumon (PST124) vs Régulation Ergonomique Leplat (PST106)",
                  piege:
                    "Croire que l'acceptation située se résume à l'ajustement moteur du poste.",
                  antidote:
                    "La régulation de Leplat est un compromis opératoire en temps réel face aux aléas de la tâche. L'acceptation située de Bobillier-Chaumon est un processus sociotechnique global à 4 dimensions (utilité, utilisabilité, collectif, identité) évaluant les transformations de la subjectivité et des collectifs face aux artefacts numériques.",
                },
              ].map((p, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                >
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 text-rose-500 shrink-0" />
                    <span>{p.titre}</span>
                  </div>
                  <p className="text-rose-700 dark:text-rose-300 font-medium m-0">
                    <strong>⚠️ Le piège :</strong> {p.piege}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 m-0 pt-0.5 leading-relaxed">
                    <strong>🛡️ La distinction 18/20 :</strong> {p.antidote}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
