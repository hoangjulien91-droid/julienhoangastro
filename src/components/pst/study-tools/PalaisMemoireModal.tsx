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

interface PalaisMemoireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

interface DimensionSynoptique {
  dimension: string;
  pst106: {
    focus: string;
    conceptCle: string;
    formule: string;
    schemaId: string;
    schemaNom: string;
  };
  pst108: {
    focus: string;
    conceptCle: string;
    formule: string;
    schemaId: string;
    schemaNom: string;
  };
  pst123: {
    focus: string;
    conceptCle: string;
    formule: string;
    schemaId: string;
    schemaNom: string;
  };
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

  useEffect(() => {
    if (isOpen) {
      setSelectedModuleFocus(defaultModule);
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
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Compass className="size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Le Palais de la Mémoire Tri-Module 18/20</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-300 font-extrabold uppercase">
                  PST 106 · 108 · 123
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Matrice synoptique panoramique croisant l&apos;Ergonomie, la
                Sociologie de l&apos;Action et l&apos;Orientation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { key: "synoptique", label: "Vue Synoptique Panoramique" },
              {
                key: "constellation",
                label: "Les 11 Schémas en Constellation",
              },
              { key: "pieges", label: "Pièges Croisés Transversaux" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setActiveTab(tab.key as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === "synoptique" && (
            <div className="space-y-6">
              {/* Pillar Headers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    Auteurs : Wisner, Leplat, Clot, Dejours
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 dark:text-indigo-300">
                      PST108
                    </span>
                    <span className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200">
                      Sociologie de l&apos;Action &amp; Comm.
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                    Auteurs : Bourdieu, Habermas, Honneth, Bühler, Valls
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-300">
                      PST123
                    </span>
                    <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                      Orientation &amp; Socialisation
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                    Auteurs : Dubar, Sainsaulieu, Castel, Hughes
                  </p>
                </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "constellation" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-800 dark:text-slate-200">
                <strong>Les 11 Schémas Canoniques Réunis :</strong> Cliquez sur
                n&apos;importe quelle carte pour ouvrir le schéma vectoriel SVG
                plein écran avec ses composantes interactives et ses conseils de
                reproduction d&apos;examen.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    id: "schema-leplat-regulation",
                    mod: "PST106",
                    auteur: "Leplat & Hoc (1983)",
                    titre: "Modèle Tâche - Activité & Régulation",
                  },
                  {
                    id: "schema-clot-activite-reelle",
                    mod: "PST106",
                    auteur: "Yves Clot (1999)",
                    titre: "L'Iceberg du Réel & Genre Professionnel",
                  },
                  {
                    id: "schema-dejours-reconnaissance",
                    mod: "PST106",
                    auteur: "Christophe Dejours (1993)",
                    titre: "Le Double Jugement de Reconnaissance",
                  },
                  {
                    id: "schema-bourdieu-algorithme",
                    mod: "PST108",
                    auteur: "Pierre Bourdieu (1979)",
                    titre: "L'Algorithme de la Pratique Sociale",
                  },
                  {
                    id: "schema-habermas-validite",
                    mod: "PST108",
                    auteur: "Jürgen Habermas (1981)",
                    titre: "Le Tétraèdre de la Validité",
                  },
                  {
                    id: "schema-honneth-spheres",
                    mod: "PST108",
                    auteur: "Axel Honneth (1992)",
                    titre: "Les 3 Sphères de la Reconnaissance",
                  },
                  {
                    id: "schema-buhler-organon",
                    mod: "PST108",
                    auteur: "Karl Bühler (1934)",
                    titre: "Le Modèle de l'Organon du Langage",
                  },
                  {
                    id: "schema-valls-iod",
                    mod: "PST108",
                    auteur: "Valls & Castra (1998)",
                    titre: "L'Entonnoir Inversé IOD",
                  },
                  {
                    id: "schema-dubar-double-transaction",
                    mod: "PST123",
                    auteur: "Claude Dubar (1991)",
                    titre: "La Double Transaction Identitaire",
                  },
                  {
                    id: "schema-sainsaulieu-matrice",
                    mod: "PST123",
                    auteur: "Renaud Sainsaulieu (1977)",
                    titre: "La Matrice des 4 Cultures d'Entreprise",
                  },
                  {
                    id: "schema-castel-desaffiliation",
                    mod: "PST123",
                    auteur: "Robert Castel (1995)",
                    titre: "L'Escalier du Décrochage Social",
                  },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleOpenSchema(s.id)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 uppercase">
                        {s.mod}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {s.auteur}
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
                  Les 4 Pièges de Confusion Transversale aux Examens Cnam :
                </strong>
              </div>

              {[
                {
                  titre:
                    "Confusion Reconnaissance Dejours (PST106) vs Honneth (PST108)",
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
