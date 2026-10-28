"use client";

import { useState, useEffect } from "react";
import {
  X,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface DetectiveCase {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124";
  titre: string;
  contexte: string;
  assertions: {
    texte: string;
    isPiege: boolean;
    pourquoiPiege?: string;
  }[];
  professeurVerdict: string;
}

const DETECTIVE_CASES: DetectiveCase[] = [
  // --- PST108 ---
  {
    id: "case-108-1",
    moduleKey: "pst108",
    titre: "Bourdieu, Austin et l'autorité des mots",
    contexte:
      "Une copie d'examen traite de la performativité du langage dans l'évaluation professionnelle.",
    assertions: [
      {
        texte:
          "Selon Bourdieu, le pouvoir d'un discours n'appartient pas aux mots eux-mêmes mais à l'autorité statutaire et institutionnelle déléguée au locuteur.",
        isPiege: false,
      },
      {
        texte:
          "L'efficacité performative (dire c'est faire) est une force magique logée directement dans la grammaire interne et l'éloquence de la phrase.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE MAJEUR ! C'est précisément l'illusion internaliste d'Austin que Bourdieu dénonce. Pour Bourdieu, un ordre ne fonctionne que parce qu'il y a un mandat institutionnel derrière (Status est magistratus), jamais par la seule grammaire.",
      },
      {
        texte:
          "Sarah Hanley montre dans 'Le Lit de Justice' que l'efficacité symbolique de l'État royal s'incarne dans un cérémonial institutionnel codifié.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Ne tombez jamais dans l'illusion internaliste : à l'examen de PST108, opposez toujours Austin (la force illocutoire dans la langue) à Bourdieu (le mandat social délégué).",
  },
  {
    id: "case-108-2",
    moduleKey: "pst108",
    titre: "La Méthode IOD et l'Insertion professionnelle",
    contexte:
      "Un mémoire analyse l'accompagnement des personnes éloignées de l'emploi.",
    assertions: [
      {
        texte:
          "La méthode IOD négocie directement avec l'employeur sur le travail réel sans faire passer de tests de sélection au candidat.",
        isPiege: false,
      },
      {
        texte:
          "Pour garantir la réussite de l'insertion, le chargé de mission IOD évalue et note la motivation du précaire lors d'un bilan psychotechnique préalable.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE ÉLIMINATOIRE ! La règle déontologique n°1 d'IOD (Castra & Valls) est le REFUS ABSOLU DU TRI PRÉALABLE. Tout bilan ou filtrage psychologique est formellement interdit dans la doctrine IOD.",
      },
      {
        texte:
          "Robert Castel soutient l'IOD car elle refuse l'idéologie de l'employabilité préalable et replace l'insertion dans le droit commun de l'entreprise.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Francis Valls sanctionne sévèrement tout étudiant qui confond l'IOD avec les méthodes classiques de tri et d'entraînement à l'employabilité.",
  },
  {
    id: "case-108-3",
    moduleKey: "pst108",
    titre: "Axel Honneth et la Souffrance morale",
    contexte:
      "Une dissertation porte sur le harcèlement moral et le mépris au travail.",
    assertions: [
      {
        texte:
          "L'invisibilisation des personnes sans abri par les passants constitue une forme de mépris social et de déni de reconnaissance.",
        isPiege: false,
      },
      {
        texte:
          "Pour Axel Honneth, la réification managériale est une simple erreur technique de calcul dans les tableurs Excel.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE DOCTRINAL ! Pour Honneth (2007), la réification n'est pas une simple erreur de calcul : c'est un oubli actif et coupable de la reconnaissance intersubjective originaire.",
      },
      {
        texte:
          "Les 3 sphères de reconnaissance (amour, droit, solidarité) conditionnent l'estime de soi et la participation citoyenne au travail.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "La réification est morale et philosophique chez Honneth : montrez que l'organisation oublie que le salarié est d'abord un sujet avant d'être une ressource.",
  },

  // --- PST106 ---
  {
    id: "case-106-1",
    moduleKey: "pst106",
    titre: "Ergonomie, Tâche et Activité (Cnam)",
    contexte: "Une étude de poste dans un centre d'appels téléphoniques.",
    assertions: [
      {
        texte:
          "La tâche prescrite correspond aux objectifs, cadences et procédures fixés par l'organisation du travail.",
        isPiege: false,
      },
      {
        texte:
          "Dans un travail moderne bien géré, l'activité réelle de l'opérateur doit être la copie parfaite et conforme de la tâche prescrite.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE FONDAMENTAL EN ERGONOMIE ! L'écart entre prescrit et réel est structurel et indépassable (Wisner, Leplat). Si un opérateur applique strictement la consigne prescrite, l'usine s'arrête (grève du zèle).",
      },
      {
        texte:
          "L'activité réelle mobilise des régulations cognitives et physiologiques pour faire face aux imprévus du milieu technique.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Rappelez toujours la formule de Wisner : le travail réel dépasse toujours ce que la direction a pu anticiper sur le papier.",
  },
  {
    id: "case-106-2",
    moduleKey: "pst106",
    titre: "Clinique de l'Activité vs Psychodynamique",
    contexte: "Débat théorique entre les approches de Clot et de Dejours.",
    assertions: [
      {
        texte:
          "Yves Clot centre son analyse sur le pouvoir d'agir, le réel de l'activité, le travail bien fait et les controverses de métier.",
        isPiege: false,
      },
      {
        texte:
          "Yves Clot a développé les concepts de stratégies collectives de défense contre la souffrance et de peur d'être blessé.",
        isPiege: true,
        pourquoiPiege:
          "CONFUSION D'AUTEURS CLASSIQUE ! Les stratégies collectives de défense et la métabolisation de la souffrance par la reconnaissance relèvent de Christophe Dejours (Psychodynamique du travail), pas d'Yves Clot.",
      },
      {
        texte:
          "Pour Dejours, la souffrance n'est pas une maladie en soi : elle peut être sublimée en plaisir au travail grâce à la reconnaissance des pairs et de la hiérarchie.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Ne mélangez jamais Clot (Clinique de l'activité, réel, genre/style, auto-confrontation) et Dejours (Psychodynamique, souffrance, défenses, jugement de beauté/utilité).",
  },

  // --- PST123 ---
  {
    id: "case-123-1",
    moduleKey: "pst123",
    titre: "La Double Transaction Identitaire de Dubar",
    contexte: "Une reconversion professionnelle conflictuelle.",
    assertions: [
      {
        texte:
          "L'identité pour autrui découle des actes d'attribution institutionnels et des jugements portés par les employeurs ou l'école.",
        isPiege: false,
      },
      {
        texte:
          "L'identité pour soi est une essence psychologique purement autonome que l'individu forge seul dans son for intérieur sans aucun rapport aux institutions.",
        isPiege: true,
        pourquoiPiege:
          "ERREUR SOCIOLOGIQUE ! Pour Dubar, l'identité pour soi (transaction biographique) est toujours forgée en tension, en dialogue ou en résistance contre les actes d'attribution d'autrui.",
      },
      {
        texte:
          "Dubar distingue 4 formes identitaires selon la concordance entre attribution et revendication : promotion, blocage, conversion, exclusion.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "La force de Claude Dubar est d'articuler psychologie et sociologie dans une double transaction indissociable.",
  },
  {
    id: "case-123-2",
    moduleKey: "pst123",
    titre: "Sainsaulieu et les 4 modèles relationnels",
    contexte: "L'ambiance de travail dans un service administratif.",
    assertions: [
      {
        texte:
          "Dans le modèle fusionnel, la solidarité repose sur l'égalité absolue et l'absence totale de hiérarchie interne au groupe de pairs.",
        isPiege: false,
      },
      {
        texte:
          "Pour Renaud Sainsaulieu, les 4 modèles relationnels s'expliquent par les traits de personnalité génétiques et l'horoscope des salariés.",
        isPiege: true,
        pourquoiPiege:
          "NON-SENS SCIENTIFIQUE ! Pour Sainsaulieu, l'identité au travail est un apprentissage culturel et politique forgé par les conditions objectives d'accès au pouvoir sur le poste de travail.",
      },
      {
        texte:
          "Le modèle négociateur caractérise les experts et cadres capables de rivaliser pacifiquement sur la base de critères d'efficacité partagés.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Insistez sur la thèse de Sainsaulieu : l'entreprise est une institution politique d'apprentissage des relations humaines.",
  },
  // --- PST120 ---
  {
    id: "case-120-1",
    moduleKey: "pst120",
    titre: "Dejours, Molinier et la genèse de la souffrance au travail",
    contexte:
      "Une copie analyse la vague de suicides dans une grande entreprise de télécommunications.",
    assertions: [
      {
        texte:
          "En psychodynamique du travail, le burnout et la dépression s'expliquent d'abord par la fragilité psychologique préexistante de l'individu.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE MAJEUR DE PSYCHOLOGISATION ! Dejours et Marie Pezé récusent formellement la causalité individuelle : c'est l'organisation du travail (isolement, évaluation individualisée des performances, destruction des collectifs) qui déstabilise le psychisme et conduit à la décompensation somatique ou au suicide.",
      },
      {
        texte:
          "La souffrance devient pathogène lorsque les voies de la sublimation et de la reconnaissance par les pairs et la hiérarchie sont verrouillées.",
        isPiege: false,
      },
      {
        texte:
          "Pascale Molinier montre que les idéologies défensives collectives permettent de tenir face à la peur mais anesthésient la sensibilité éthique.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Refusez catégoriquement toute psychologisation ou individualisation de la souffrance : ancrez toujours votre diagnostic dans l'organisation réelle du travail.",
  },
  // --- PST124 ---
  {
    id: "case-124-1",
    moduleKey: "pst124",
    titre: "Rabardel, Bobillier-Chaumon et le déterminisme technologique",
    contexte:
      "Un consultant étudie l'échec de l'adoption d'un logiciel ERP dans un hôpital.",
    assertions: [
      {
        texte:
          "L'échec d'adoption d'un système numérique s'explique par la résistance naturelle et irrationnelle des soignants au progrès technologique.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE CLASSIQUE DU CONSULTANT TECHNOCENTRÉ ! Selon Bobillier-Chaumon et Rabardel, la 'résistance' est le symptôme d'un artefact inadapté qui détruit le pouvoir d'agir et les régulations informelles du soin.",
      },
      {
        texte:
          "Selon Pierre Rabardel, l'instrument n'est pas l'artefact technique : c'est une entité mixte associant l'outil et les schèmes d'utilisation du travailleur.",
        isPiege: false,
      },
      {
        texte:
          "Les catachrèses (détournements d'usage) sont des preuves de l'intelligence pratique de l'opérateur pour combler l'écart entre logiciel prescrit et activité réelle.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Ne blâmez jamais l'utilisateur : traitez les contournements comme des alertes cliniques révélant les failles de la prescription numérique.",
  },
];

interface PiegesDetectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function PiegesDetectiveModal({
  isOpen,
  onClose,
  defaultModule,
}: PiegesDetectiveModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
      setCaseIndex(0);
      setSelectedAssertionIdx(null);
    }
  }, [defaultModule, isOpen]);

  const [caseIndex, setCaseIndex] = useState(0);
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set());
  const [selectedAssertionIdx, setSelectedAssertionIdx] = useState<
    number | null
  >(null);

  const filteredCases = DETECTIVE_CASES.filter((c) =>
    selectedModule === "all" ? true : c.moduleKey === selectedModule,
  );

  const currentCase = filteredCases[caseIndex] || filteredCases[0];

  if (!isOpen) return null;

  function handleSelectAssertion(idx: number) {
    if (selectedAssertionIdx !== null) return;
    setSelectedAssertionIdx(idx);

    const isPiege = currentCase.assertions[idx]?.isPiege;
    if (isPiege) {
      triggerHaptic("success");
      playSuccessSound();
      setSolvedSet((prev) => new Set(prev).add(currentCase.id));
      window.dispatchEvent(new CustomEvent("pst:detective-solved"));
    } else {
      triggerHaptic("error");
      playFlipSound();
    }
  }

  function handleNextCase() {
    triggerHaptic("selection");
    playClickSound();
    setSelectedAssertionIdx(null);
    if (caseIndex < filteredCases.length - 1) {
      setCaseIndex((i) => i + 1);
    } else {
      setCaseIndex(0);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header iOS */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shrink-0">
              <ShieldAlert className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
                <span className="truncate">Détective des Pièges</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-200 font-extrabold uppercase shrink-0">
                  Anti-Faute 18/20
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
                Démasquez le piège fatal parmi les affirmations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4">
          {/* Module Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
              {[
                { key: "all", label: "Tous" },
                { key: "pst106", label: "PST106" },
                { key: "pst108", label: "PST108" },
                { key: "pst120", label: "PST120" },
                { key: "pst123", label: "PST123" },
                { key: "pst124", label: "PST124" },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedModule(m.key);
                    setCaseIndex(0);
                    setSelectedAssertionIdx(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                    selectedModule === m.key
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono font-bold text-slate-400">
              Dossier {caseIndex + 1} / {filteredCases.length} ·{" "}
              {solvedSet.size} résolus
            </span>
          </div>

          {currentCase && (
            <div className="space-y-4">
              {/* Context Box */}
              <div className="p-4 rounded-3xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <span>Dossier : {currentCase.titre}</span>
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/15 px-2 py-0.5 rounded-full">
                    {currentCase.moduleKey.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  « {currentCase.contexte} »
                </p>
              </div>

              {/* 3 Assertions to investigate */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Cliquez sur l&apos;affirmation qui contient le PIÈGE
                  d&apos;examen :
                </span>

                {currentCase.assertions.map((ass, aIdx) => {
                  const isSelected = selectedAssertionIdx === aIdx;
                  const isDone = selectedAssertionIdx !== null;

                  let cardStyle =
                    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 shadow-xs";

                  if (isDone) {
                    if (ass.isPiege) {
                      cardStyle =
                        "bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-950 dark:text-rose-100 shadow-md ring-2 ring-rose-500/30";
                    } else if (isSelected && !ass.isPiege) {
                      cardStyle =
                        "bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-950 dark:text-amber-100";
                    } else {
                      cardStyle =
                        "opacity-50 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <div
                      key={aIdx}
                      onClick={() => handleSelectAssertion(aIdx)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${cardStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="size-5 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + aIdx)}
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed font-medium flex-1 m-0">
                          {ass.texte}
                        </p>
                        {isDone && ass.isPiege && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase shrink-0 flex items-center gap-1">
                            <AlertTriangle className="size-3" />
                            <span>Piège démasqué</span>
                          </span>
                        )}
                        {isDone && isSelected && !ass.isPiege && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase shrink-0">
                            C&apos;était juste !
                          </span>
                        )}
                      </div>

                      {isDone && ass.isPiege && ass.pourquoiPiege && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-900 dark:text-rose-200 animate-fadeIn space-y-1">
                          <p className="font-bold">⚠️ Révélation du piège :</p>
                          <p className="leading-relaxed">{ass.pourquoiPiege}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Professor Verdict Box */}
              {selectedAssertionIdx !== null && (
                <div className="p-4 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 text-xs text-slate-800 dark:text-slate-200 animate-fadeIn space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="size-4 text-amber-500" />
                      Conseil de correction officiel du professeur :
                    </span>
                    <button
                      type="button"
                      onClick={handleNextCase}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Dossier suivant</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                  <p className="leading-relaxed italic m-0">
                    « {currentCase.professeurVerdict} »
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
