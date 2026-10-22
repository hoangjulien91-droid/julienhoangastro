import React, { useState, useEffect } from "react";
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Copy,
  Check,
  AlertTriangle,
  BookOpen,
  FileWarning,
  CheckCircle2,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PstDeontoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EthicalDilemmaScenario {
  id: string;
  title: string;
  severity: "CRITIQUE" | "ÉLEVÉ";
  ueRefs: string[];
  terrainSituation: string;
  codeArticles: { ref: string; title: string; rule: string }[];
  clinicalPosture: string;
  institutionalRefusalScript: string;
}

const ETHICAL_DILEMMAS: EthicalDilemmaScenario[] = [
  {
    id: "levee-anonymat-drh",
    title:
      "1. Pression de la Direction pour identifier les auteurs de verbatims",
    severity: "CRITIQUE",
    ueRefs: ["PST106", "PST123"],
    terrainSituation:
      "Lors de la restitution en Comité de Pilotage (COPIL), le DRH demande de savoir dans quel service précis ou par quel opérateur un contournement de procédure de sécurité (catachrèse) a été évoqué, au motif de « prévenir les risques juridiques ».",
    codeArticles: [
      {
        ref: "Principe I & Art. 7 (Code 2021)",
        title: "Respect des droits de la personne & Secret professionnel",
        rule: "Le psychologue est soumis au secret professionnel dans les conditions définies par la loi (Art. 226-13 du Code pénal). Cette obligation s'applique à tout ce qu'il a vu, entendu ou compris au cours de sa pratique.",
      },
      {
        ref: "Article 19 (Code 2021)",
        title: "Liberté de consentement et confidentialité en institution",
        rule: "Les personnes concernées ont droit au respect de leur vie privée et à la confidentialité des informations les concernant, même vis-à-vis de l'employeur ou du commanditaire.",
      },
      {
        ref: "Article 44 (Code 2021)",
        title: "Protection des données brutes et traces cliniques",
        rule: "Les notes personnelles, enregistrements et verbatims bruts appartiennent exclusivement au praticien et ne sont jamais transmissibles aux tiers.",
      },
    ],
    clinicalPosture:
      "En Clinique de l'activité (Clot, 2008) comme en Psychodynamique du travail (Dejours, 1993), la parole authentique sur le travail réel (et ses infractions nécessaires pour tenir les objectifs) ne peut émerger que si l'espace clinique est hermétiquement protégé de toute sanction managériale. Céder à l'identification détruit immédiatement le dispositif.",
    institutionalRefusalScript:
      "« Conformément au Principe I et aux articles 7, 19 et 44 du Code de déontologie des psychologues (2021) rappelés dans notre note de cadrage initiale, l'intégralité des propos recueillis et des séquences observées est couverte par la confidentialité et l'anonymat absolus. L'analyse porte sur les contradictions de l'organisation du travail et du genre professionnel, et non sur les personnes. Aucune donnée permettant d'identifier directement ou indirectement un salarié ne sera communiquée. »",
  },
  {
    id: "evaluation-deguisee-rps",
    title: "2. Demande d'évaluation individuelle déguisée en diagnostic RPS",
    severity: "CRITIQUE",
    ueRefs: ["PST106", "PST108", "PST123"],
    terrainSituation:
      "Un directeur d'établissement sollicite une intervention sur la « souffrance au travail » d'une équipe, mais demande officieusement d'évaluer la « fragilité psychologique » ou l'aptitude relationnelle de deux salariés considérés comme « éléments perturbateurs ».",
    codeArticles: [
      {
        ref: "Principe III & Art. 2 (Code 2021)",
        title: "Responsabilité et autonomie professionnelle",
        rule: "Le psychologue définit librement ses méthodes et refuse toute intervention qui instrumentaliserait sa fonction à des fins de sélection, d'exclusion ou de contrôle disciplinaire non explicitées.",
      },
      {
        ref: "Article 12 & 17 (Code 2021)",
        title: "Distinction entre évaluation et intervention clinique",
        rule: "Le praticien ne peut procéder à une évaluation à l'insu des personnes ou sous couvert d'un dispositif d'écoute et d'accompagnement collectif.",
      },
    ],
    clinicalPosture:
      "C'est l'opération fondatrice du passage de la Commande à la Demande (Wisner, 1995 ; Clot, 1999) : refuser la psychologisation individuelle des conflits organisationnels pour déplacer l'investigation vers le travail réel et ses empêchements.",
    institutionalRefusalScript:
      "« En application du Principe III (Responsabilité et autonomie) et des articles 2 et 12 du Code de déontologie des psychologues, notre intervention ne saurait constituer une expertise psychologique individuelle ni un outil d'aide à la décision disciplinaire. Notre méthodologie analyse exclusivement les déterminants organisationnels, techniques et collectifs de l'activité de travail. »",
  },
  {
    id: "conservation-videos-autoconfrontation",
    title:
      "3. Réclamation par l'entreprise des séquences vidéo d'autoconfrontation",
    severity: "CRITIQUE",
    ueRefs: ["PST106", "PST120", "PST123"],
    terrainSituation:
      "Après un cycle d'autoconfrontations croisées filmées, le service communication / formation demande la remise des fichiers vidéo au motif que l'entreprise a financé l'intervention et souhaite les utiliser comme supports pédagogiques internes.",
    codeArticles: [
      {
        ref: "Article 20 & 44 (Code 2021)",
        title: "Propriété intellectuelle et garde des traces cliniques",
        rule: "Le financement de l'intervention par un commanditaire ne lui confère aucun droit de propriété ni d'accès sur les matériaux cliniques bruts (films d'activité, bandes-son, transcriptions intégrales).",
      },
      {
        ref: "Article 9 du Code civil & RGPD",
        title: "Droit à l'image et finalité stricte du traitement",
        rule: "Le consentement éclairé signé par les opérateurs limite strictement l'usage de l'image à la co-analyse clinique au sein du groupe de pairs.",
      },
    ],
    clinicalPosture:
      "Dans la méthodologie d'Yves Clot, le film n'est pas une « preuve objective » du travail mais un instrument psychologique de médiation dialogique appartenant au collectif des professionnels volontaires. Seuls les extraits formellement choisis et validés par les opérateurs eux-mêmes peuvent, avec leur accord écrit spécifique, être montrés au COPIL.",
    institutionalRefusalScript:
      "« Les enregistrements vidéo réalisés dans le cadre des autoconfrontations constituent des matériaux cliniques confidentiels protégés par les articles 20 et 44 du Code de déontologie des psychologues ainsi que par le consentement restrictif signé par chaque professionnel. Ces fichiers demeurent sous la garde exclusive de l'intervenant et seront détruits à l'issue de l'étude. Seule la synthèse écrite anonymisée constitue le livrable contractuel. »",
  },
  {
    id: "bilan-competences-transmission-employeur",
    title:
      "4. Demande de transmission de la synthèse d'un Bilan de compétences à la RH",
    severity: "ÉLEVÉ",
    ueRefs: ["PST108"],
    terrainSituation:
      "Dans le cadre d'un bilan de compétences financé sur le plan de développement des compétences de l'entreprise, le responsable RH demande une copie du document de synthèse finale du salarié bénéficiaire.",
    codeArticles: [
      {
        ref: "Art. L. 6313-4 du Code du travail",
        title: "Propriété exclusive de la synthèse par le bénéficiaire",
        rule: "Les résultats détaillés et le document de synthèse du bilan de compétences sont la propriété exclusive du bénéficiaire. Ils ne peuvent être communiqués à un tiers (y compris l'employeur financeur) qu'avec l'accord écrit exprès du salarié.",
      },
      {
        ref: "Art. L. 6322-50 du Code du travail",
        title: "Secret professionnel des organismes de bilan",
        rule: "Toutes les personnes chargées de réaliser et de détenir les bilans sont soumises aux dispositions de l'article 226-13 du Code pénal (secret professionnel).",
      },
    ],
    clinicalPosture:
      "En PST108, la sécurisation des parcours professionnels repose sur l'asymétrie protectrice de la loi : l'employeur finance un droit au développement du pouvoir d'agir, mais n'achète jamais un droit de regard sur la délibération subjective du sujet.",
    institutionalRefusalScript:
      "« En vertu de l'article L. 6313-4 du Code du travail et de l'article 226-13 du Code pénal, le document de synthèse du bilan de compétences est la propriété exclusive du bénéficiaire. Seule l'attestation de présence administrative peut être transmise à l'employeur financeur ; le contenu du bilan ne peut être communiqué par nul autre que le salarié lui-même, s'il le décide librement. »",
  },
  {
    id: "danger-grave-imminent-suicide",
    title:
      "5. Révélation d'un risque suicidaire aigu ou danger grave et imminent en entretien",
    severity: "CRITIQUE",
    ueRefs: ["PST106", "PST123"],
    terrainSituation:
      "Au cours d'un entretien clinique individuel sur le terrain, un salarié exprime des idées suicidaires scénarisées imminentes liées à une situation d'isolement organisationnel aigu, tout en demandant au psychologue de « ne rien dire à personne ».",
    codeArticles: [
      {
        ref: "Art. 223-6 & 226-14 du Code pénal",
        title: "Assistance à personne en péril & Dérogation légale au secret",
        rule: "Lorsque la vie ou l'intégrité physique d'une personne est en péril imminent, l'obligation légale de porter secours (Art. 223-6 CP) prime et autorise le partage strictement nécessaire d'informations avec les professionnels de santé (Médecin du travail / SAMU 15).",
      },
      {
        ref: "Article 8 (Code 2021)",
        title: "Information partagée en situation de péril",
        rule: "Le psychologue informe la personne de la nécessité d'alerter un tiers médical qualifié et limite strictement sa transmission aux éléments indispensables à la mise en sécurité.",
      },
    ],
    clinicalPosture:
      "Distinction clinique vitale : alerter immédiatement le Médecin du travail (soumis au secret médical) ou les secours d'urgence avec l'information du sujet, sans jamais livrer les confidences cliniques ni le contenu de l'entretien à la hiérarchie managériale.",
    institutionalRefusalScript:
      "« Conformément à l'article 8 du Code de déontologie des psychologues et à l'obligation légale d'assistance à personne en péril (Art. 223-6 du Code pénal), j'ai procédé à l'orientation immédiate de la situation vers le Médecin du travail du Service de Prévention et de Santé au Travail (SPST), seul habilité médicalement, tout en préservant l'intégralité du secret professionnel vis-à-vis de la ligne hiérarchique. »",
  },
];

export const PstDeontoAuditModal: React.FC<PstDeontoAuditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>(ETHICAL_DILEMMAS[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const current =
    ETHICAL_DILEMMAS.find((d) => d.id === selectedId) || ETHICAL_DILEMMAS[0];

  const handleCopyScript = async () => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(current.institutionalRefusalScript);
      setCopied(true);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-deonto-audit-title"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold">
                  CONTRÔLE INTERNE &amp; AUDIT DÉONTOLOGIQUE · CODE 2021
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Art. 226-13 CP · L. 6313-4 CT
                </span>
              </div>
              <h2
                id="pst-deonto-audit-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Vérificateur de Dilemmes Éthiques &amp; Opposabilité
                Institutionnelle CNAM
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            aria-label="Fermer l'audit déontologique"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Split Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left: Dilemma Selector */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4 overflow-y-auto space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Situations Critiques de Terrain ({ETHICAL_DILEMMAS.length})
            </span>

            {ETHICAL_DILEMMAS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    playClickSound();
                    setSelectedId(item.id);
                    setCopied(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-rose-500/50 shadow-xs"
                      : "bg-transparent border-slate-200/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        item.severity === "CRITIQUE"
                          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      RISQUE {item.severity}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.ueRefs.join(" · ")}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {item.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Legal & Clinical Resolution */}
          <div className="lg:col-span-8 p-5 sm:p-6 overflow-y-auto space-y-5 bg-white dark:bg-[#0B0F17]">
            {/* Situation */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Scénario d'injonction ou de conflit sur le terrain</span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {current.terrainSituation}
              </p>
            </div>

            {/* Articles opposables */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2.5">
                Fondements Opposables (Code de Déontologie 2021 &amp; Droit
                Positif)
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {current.codeArticles.map((art, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {art.ref}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {art.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {art.rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Posture Clinique CNAM */}
            <div className="p-4 rounded-xl border border-indigo-500/25 bg-indigo-500/5">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                <BookOpen className="w-4 h-4" />
                <span>
                  Justification Clinique &amp; Épistémologique CNAM (Jury RNCP
                  7)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {current.clinicalPosture}
              </p>
            </div>

            {/* Script de recadrage prêt à copier */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Formule de Recadrage Opposable (COPIL / Note de Cadrage /
                    Examen)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Formule copiée
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copier la clause opposable
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-slate-900 dark:text-slate-100 leading-relaxed bg-white/80 dark:bg-slate-950/70 p-3.5 rounded-lg border border-emerald-500/20">
                {current.institutionalRefusalScript}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PstDeontoAuditModal;
