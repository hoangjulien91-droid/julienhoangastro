"use client";

import { useState } from "react";
import {
  Scale,
  ShieldAlert,
  ShieldCheck,
  Gavel,
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  FileText,
  AlertTriangle,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface CasDeonto123 {
  id: string;
  titre: string;
  contexte: string;
  demandeTiers: string;
  qualificationAttendue: "conforme" | "manquement_code" | "delit_penal";
  articlesViolés: string[];
  reponseRecommandee: string;
  explicationJuridique: string;
  piegeExamen: string;
}

const CAS_DEONTOLOGIE_123: CasDeonto123[] = [
  {
    id: "c1",
    titre: "Transmission des Comptes-Rendus d'Entretiens pour un PSE",
    contexte:
      "Dans le cadre d'un Plan de Sauvegarde de l'Emploi (PSE), le psychologue du travail salarié d'un grand groupe reçoit en entretien individuel des salariés en souffrance.",
    demandeTiers:
      "La DRH convoque le psychologue et exige la transmission des fiches d'entretiens individuels annotées pour 'identifier les salariés les plus fragiles psychologiquement afin de ne pas les licencier brutalement'.",
    qualificationAttendue: "delit_penal",
    articlesViolés: [
      "Article 226-13 du Code pénal (Violation du secret professionnel)",
      "Principe 1 du Code 2021 (Respect de la personne et confidentialité)",
      "Principe 6 du Code 2021 (Respect du but assigné : interdiction de détourner les données cliniques)",
    ],
    reponseRecommandee:
      "Refus catégorique et absolu. Le secret professionnel ne se partage pas avec la DRH, même sous un prétexte 'protecteur'. Le psychologue peut seulement transmettre des bilans statistiques anonymisés collectifs sur les facteurs de risques psycho-sociaux.",
    explicationJuridique:
      "Le secret professionnel du psychologue est d'ordre public. Même avec le consentement supposé du salarié, la transmission de données nominatives à l'employeur constitue le délit pénal de violation du secret professionnel (1 an d'emprisonnement et 15 000 € d'amende).",
    piegeExamen:
      "Ne pas céder au piège de 'l'intention bienveillante de la DRH'. En droit, la violation du secret reste punissable quelle que soit la finalité invoquée.",
  },
  {
    id: "c2",
    titre: "Usurpation du Titre par un Coach / Consultant RH",
    contexte:
      "Un cabinet de conseil recrute un titulaire d'un Master 2 en Gestion des Ressources Humaines qui a suivi une certification de coaching de 3 semaines.",
    demandeTiers:
      "Sur son profil LinkedIn, ses cartes de visite et ses rapports d'audit de climat social, ce consultant signe : 'Jean Dupont, Psychologue des Organisations et Coach certifié'.",
    qualificationAttendue: "delit_penal",
    articlesViolés: [
      "Loi n° 85-772 du 25 juillet 1985 (Protection du titre de psychologue)",
      "Article 433-17 du Code pénal (Usurpation de titre réglementé)",
      "Décret n° 90-255 du 22 mars 1990 (Exigence de la licence + maîtrise/master en psychologie + stage professionnel de 500h)",
    ],
    reponseRecommandee:
      "Signalement à la commission déontologique et obligation de mise en demeure. L'usage du qualificatif 'psychologue des organisations' sans inscription au répertoire ADELI/RPPS constitue une usurpation d'un titre protégé par la loi.",
    explicationJuridique:
      "L'usage du titre de psychologue sans posséder les diplômes requis par la loi de 1985 est un délit puni d'un an de prison et de 15 000 euros d'amende. L'adjonction d'un adjectif ('organisationnel', 'd'entreprise', 'du travail') ne contourne pas la loi.",
    piegeExamen:
      "Croire qu'une formation certifiante en coaching ou un diplôme RH permet d'utiliser le mot 'psychologue' : c'est rigoureusement interdit.",
  },
  {
    id: "c3",
    titre: "Détournement d'un Test de Personnalité pour une Promotion",
    contexte:
      "Une entreprise organise une session d'évaluation interne pour pourvoir un poste de directeur commercial. Le psychologue interne fait passer un inventaire de personnalité (ex: Big Five / NEO-PI).",
    demandeTiers:
      "Le directeur général demande au psychologue de lui remettre les scores bruts détaillés et les profils psychologiques complets de tous les candidats non retenus.",
    qualificationAttendue: "manquement_code",
    articlesViolés: [
      "Principe 3 du Code 2021 (Responsabilité et autonomie : le psychologue est seul responsable de ses conclusions)",
      "Principe 4 du Code 2021 (Rigueur méthodologique : les scores bruts sont ininterprétables par des non-psychologues)",
      "Article 15 du Code (Restitution : les résultats ne peuvent être commentés qu'au sujet concerné)",
    ],
    reponseRecommandee:
      "Le psychologue ne doit transmettre à la direction qu'une synthèse d'adéquation au poste, sans jamais divulguer les scores bruts ou les données intimes de personnalité. Il doit obligatoirement réaliser une restitution orale individuelle préalable à chaque candidat.",
    explicationJuridique:
      "Le Code de déontologie interdit formellement de communiquer des protocoles ou données brutes à des tiers non habilités. Seule la conclusion relative aux compétences professionnelles requises peut être transmise.",
    piegeExamen:
      "Oublier l'obligation de restitution préalable au salarié : le sujet a un droit strict à connaître ses conclusions avant son employeur.",
  },
  {
    id: "c4",
    titre: "Double Commande : Expertise CSE et Mission Direction",
    contexte:
      "Un psychologue du travail indépendant est sollicité par la Direction d'une usine pour 'animer un atelier sur la communication bienveillante'.",
    demandeTiers:
      "Trois semaines plus tard, le Comité Social et Économique (CSE) de la même usine le sollicite pour réaliser une expertise légale pour 'Risque Grave' suite à une vague de tentatives de suicide.",
    qualificationAttendue: "manquement_code",
    articlesViolés: [
      "Principe 2 du Code 2021 (Intégrité et probité : prévention des conflits d'intérêts)",
      "Principe 3 du Code 2021 (Préservation de l'indépendance professionnelle)",
      "Article 18 du Code (Le psychologue ne peut accepter une mission si ses liens antérieurs compromettent sa neutralité)",
    ],
    reponseRecommandee:
      "Refuser la mission d'expertise du CSE en expliquant en toute transparence le conflit d'intérêts né de la prestation rémunérée par la direction. Le psychologue doit orienter le CSE vers un confrère ou un cabinet indépendant agréé.",
    explicationJuridique:
      "Le cumul d'une mission de conseil auprès de la direction et d'une expertise agréée CSE dans le même établissement détruit la neutralité et le positionnement tiers indispensable à l'intervention clinique.",
    piegeExamen:
      "Penser qu'on peut rester 'objectif' malgré le double financement : la déontologie exige de refuser pour préserver la confiance des salariés.",
  },
];

export function TribunalDeonto123() {
  const [currentCasIdx, setCurrentCasIdx] = useState(0);
  const [selectedVerdict, setSelectedVerdict] = useState<
    "conforme" | "manquement_code" | "delit_penal" | null
  >(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [solvedCas, setSolvedCas] = useState<Record<string, boolean>>({});

  const cas = CAS_DEONTOLOGIE_123[currentCasIdx];

  const handleSelectVerdict = (v: "conforme" | "manquement_code" | "delit_penal") => {
    if (hasValidated) return;
    setSelectedVerdict(v);
    playClickSound();
    triggerHaptic();
  };

  const handleValidate = () => {
    if (!selectedVerdict) return;
    setHasValidated(true);
    const isWin = selectedVerdict === cas.qualificationAttendue;

    if (isWin) {
      playSuccessSound();
      triggerHaptic();
      if (!solvedCas[cas.id]) {
        setScore((s) => s + 1);
        setSolvedCas((prev) => ({ ...prev, [cas.id]: true }));
      }
    } else {
      playReviewSound();
      triggerHaptic();
    }
  };

  const handleNextCas = () => {
    playClickSound();
    triggerHaptic();
    setSelectedVerdict(null);
    setHasValidated(false);
    setCurrentCasIdx((i) => (i + 1) % CAS_DEONTOLOGIE_123.length);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/70 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              <Scale className="h-3.5 w-3.5 text-indigo-400" />
              <span>PST123 · Éthique, Déontologie &amp; Titre de Psychologue</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Le Tribunal Déontologique (Loi 1985 &amp; Code 2021)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Exercez votre discernement juridique et éthique. Face aux pressions de la direction ou des cabinets RH, qualifiez l&apos;infraction, citez les articles de loi et formulez la posture déontologique conforme.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Dilemmes Réussis</span>
              <span className="text-lg font-mono font-extrabold text-indigo-400">
                {score} / {CAS_DEONTOLOGIE_123.length}
              </span>
            </div>
            <Gavel className="h-7 w-7 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Main Dilemma Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Cas Pratique n°{currentCasIdx + 1} : {cas.titre}
          </span>
          <span className="text-xs text-slate-400">
            Élisabeth Lucy · Déontologie du Psychologue
          </span>
        </div>

        {/* Narrative Box */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-200 block mb-1">Contexte professionnel :</strong>
            {cas.contexte}
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-purple-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Demande ou Comportement Litigieux :</span>
            </div>
            <p className="italic text-sm text-purple-100">{cas.demandeTiers}</p>
          </div>
        </div>

        {/* Verdict Selector */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Quelle est la qualification juridique et déontologique ?
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "conforme",
                label: "Pratique Conforme",
                desc: "Aucune infraction à la loi ni au code de déontologie.",
                color: "emerald",
              },
              {
                id: "manquement_code",
                label: "Manquement Déontologique",
                desc: "Infraction au Code de Déontologie 2021 (principe d'intégrité, de rigueur ou de but assigné).",
                color: "amber",
              },
              {
                id: "delit_penal",
                label: "Délit Pénal / Légal",
                desc: "Infraction au Code Pénal (secret professionnel ou usurpation de titre Loi 1985).",
                color: "rose",
              },
            ].map((opt) => {
              const isSelected = selectedVerdict === opt.id;
              const isCorrect = hasValidated && opt.id === cas.qualificationAttendue;
              const isWrong = hasValidated && isSelected && !isCorrect;

              return (
                <button
                  key={opt.id}
                  disabled={hasValidated}
                  onClick={() =>
                    handleSelectVerdict(opt.id as "conforme" | "manquement_code" | "delit_penal")
                  }
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                    isCorrect
                      ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold"
                      : isWrong
                      ? "bg-rose-950/40 border-rose-500 text-rose-200"
                      : isSelected
                      ? "bg-indigo-600/30 border-indigo-400 text-white font-semibold shadow-md"
                      : "bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-sm font-bold block">{opt.label}</span>
                    <p className="text-[11px] text-slate-400 leading-snug">{opt.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="text-[10px] uppercase font-bold text-indigo-400">
                      Choix sélectionné
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation */}
        {!hasValidated ? (
          <div className="flex justify-end pt-2">
            <button
              disabled={!selectedVerdict}
              onClick={handleValidate}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center gap-2 ${
                selectedVerdict
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-indigo-950/50"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <Gavel className="h-4 w-4" />
              <span>Prononcer le Jugement</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-3 border-t border-slate-800 animate-fadeIn text-xs leading-relaxed">
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                selectedVerdict === cas.qualificationAttendue
                  ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/30 border-rose-500/40 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedVerdict === cas.qualificationAttendue ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Qualification exacte (+1 point)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span>Erreur de qualification juridique</span>
                  </>
                )}
              </div>
              <p>{cas.explicationJuridique}</p>

              <div className="space-y-1 pt-2 border-t border-slate-700/40">
                <strong className="text-[11px] uppercase tracking-wider block text-slate-300">
                  Articles et Principes violés à citer à l&apos;examen :
                </strong>
                <ul className="list-disc list-inside space-y-0.5 text-slate-200">
                  {cas.articlesViolés.map((art, idx) => (
                    <li key={idx}>{art}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <strong className="text-indigo-300 block uppercase text-[10px]">
                Posture exigée du psychologue du travail :
              </strong>
              <p className="text-slate-300">{cas.reponseRecommandee}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-200/90 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Piège d&apos;examen :</strong> {cas.piegeExamen}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextCas}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-950/50 transition-all cursor-pointer"
              >
                <span>Dilemme suivant</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
