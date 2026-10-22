import React, { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  Copy,
  Check,
  Download,
  Sparkles,
  Scale,
  Layers,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PstClinicalCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ClinicalVignette {
  id: string;
  ue: string;
  title: string;
  sector: string;
  streams: string[];
  rawCommand: string;
  terrainObservables: string;
  step1DemandReformulation: string;
  step2PrescribedVsReal: string;
  step3TheoreticalTension: string;
  step4InterventionDevice: string;
}

const CLINICAL_VIGNETTES: ClinicalVignette[] = [
  {
    id: "case-ehpad-care",
    ue: "PST106 · PST123",
    title:
      "Cas n°1 — EHPAD : « Fatigue compassionnelle » ou empêchement du travail bien fait ?",
    sector: "Secteur Médico-Social · Établissement de 85 résidents",
    streams: [
      "Clinique de l'activité (Clot)",
      "Psychodynamique & Care (Dejours, Molinier)",
    ],
    rawCommand:
      "La direction sollicite un psychologue du travail pour mettre en place des « ateliers de gestion du stress et de prévention de l'épuisement professionnel » à destination des aides-soignantes, suite à une hausse de 18 % des arrêts maladie et à des tensions lors des relèves.",
    terrainObservables:
      "Le chronométrage prescrit alloue 14 minutes par toilette matinale. En observation située, les aides-soignantes interrompent sans cesse leur tâche pour répondre aux sonnettes d'urgence, rassurer un résident désorienté ou aider une collègue novice lors d'un transfert lourd. Les temps de transmission orale de 15 minutes ont été remplacés par un cochage sur tablette numérique.",
    step1DemandReformulation:
      "Déconstruire la commande hygiéniste centrée sur la « fragilité émotionnelle individuelle » des soignantes (refus d'une orthopédie psychologique). Reformuler vers une demande d'analyse des contradictions organisationnelles qui entravent les critères de qualité du soin et privent le collectif de ses espaces de délibération.",
    step2PrescribedVsReal:
      "En mobilisant Leplat & Hoc (1983), on montre que la tâche prescrite (toilette standardisée en 14 min + traçabilité sur tablette) ignore la variabilité intrinsèque du vivant (Wisner, 1995). L'activité réelle implique un arbitrage permanent entre cadence gestionnaire et présence relationnelle. Ce qui fatigue n'est pas ce que les soignantes font, mais ce qu'elles ne peuvent pas faire : l'activité empêchée (Clot, 1999).",
    step3TheoreticalTension:
      "Articulation féconde entre deux courants :\n1. Psychodynamique du travail & Care (Dejours, 1993 ; Molinier, 2013) : la souffrance éthique naît lorsque l'organisation contraint à « bâcler » un soin relationnel, brisant le jugement de beauté des pairs.\n2. Clinique de l'activité (Clot, 2008) : la suppression des relèves orales détruit la dimension transpersonnelle du métier (le genre professionnel), laissant chaque opératrice seule face aux dilemmes.",
    step4InterventionDevice:
      "Institution d'un Comité de Pilotage paritaire (Direction, CSE, Médecin du travail, Encadrement) et d'un groupe de métier de 6 aides-soignantes volontaires (Code de déontologie 2021, Art. 7 & 19). Mise en place d'autoconfrontations croisées sur les séquences de toilette et de relève pour ré-instituer un espace de controverse sur le « soin bien fait ».",
  },
  {
    id: "case-callcenter-script",
    ue: "PST106 · PST120",
    title:
      "Cas n°2 — Plateforme Téléphonique : Scripts prescrits et catachrèses langagières",
    sector: "Relation Client Bancaire · 120 téléconseillers",
    streams: [
      "Analyse dialogique (Vygotski, Bakhtine)",
      "Ergonomie de l'activité",
    ],
    rawCommand:
      "Le responsable qualité déplore le « non-respect des scripts d'appel standardisés » malgré trois sessions de formation, tout en constatant un turnover élevé chez les nouveaux embauchés.",
    terrainObservables:
      "Les téléconseillers expérimentés contournent systématiquement l'arbre de questionnement imposé par le logiciel CRM : ils griffonnent des repères sur un carnet papier et reformulent les phrases juridiques en langage courant pour désamorcer l'agressivité des clients en litige.",
    step1DemandReformulation:
      "Déplacer la commande d'un « problème d'inobservance comportementale du script » vers l'étude des régulations langagières et cognitives indispensables pour tenir simultanément l'objectif de durée moyenne de traitement (DMT) et la résolution effective du litige client.",
    step2PrescribedVsReal:
      "Le script prescrit suppose un interlocuteur standardisé. Or, l'activité langagière réelle (PST120) est foncièrement dialogique (Bakhtine, 1984) : chaque énoncé du conseiller s'ajuste en temps réel aux intonations, à l'incompréhension ou à la colère du destinataire.",
    step3TheoreticalTension:
      "Avec Vygotski (1934/1997), la parole au travail n'est pas l'exécution mécanique d'un texte pré-écrit mais une réalisation de la pensée dans l'interaction. Avec Austin (1970), l'énoncé a une force illocutoire (apaiser, engager). Imposer un script rigide produit un conflit entre le destinataire immédiat (le client) et le surdestinataire gestionnaire (la grille d'écoute).",
    step4InterventionDevice:
      "Co-analyse de transcriptions d'appels anonymisés (avec consentement écrit préalable des conseillers) en séances d'autoconfrontation croisée réunissant anciens et novices afin de formaliser les « ficelles du métier » et de faire évoluer la grille d'évaluation qualité.",
  },
  {
    id: "case-industrie-securite",
    ue: "PST106 · PST123",
    title:
      "Cas n°3 — Maintenance Aéronautique : Infractions de sécurité ou stratégies collectives de défense ?",
    sector: "Industrie Lourde & Maintenance · Atelier de révision mécanique",
    streams: [
      "Psychodynamique du travail (Dejours)",
      "Ergonomie située (Wisner)",
    ],
    rawCommand:
      "Suite à deux presque-accidents, la direction HSE commande une étude sur les « biais cognitifs et la prise de risque volontaire » des techniciens qui retirent ponctuellement leurs gants de protection ou shuntent une étape de consignation.",
    terrainObservables:
      "Certains boulons situés dans des trappes aveugles sont impossibles à sentir tactilement avec les gants épais prescrits. Par ailleurs, une culture de « virilité de métier » tourne en dérision la peur et valorise la vitesse d'exécution lors des pics de remise en ligne des appareils.",
    step1DemandReformulation:
      "Refuser l'explication par l'erreur humaine individuelle ou la négligence. Reformuler la demande autour de deux axes : (1) les incompatibilités technico-ergonomiques des équipements et (2) les mécanismes psychodynamiques collectifs permettant aux opérateurs de tenir face au risque réel.",
    step2PrescribedVsReal:
      "Retirer le gant n'est pas une transgression gratuite mais un compromis opératoire coûteux pour garantir la précision du serrage (qualité perçue du travail) lorsque l'accessibilité mécanique a été mal conçue (ergonomie de correction vs conception — Daniellou).",
    step3TheoreticalTension:
      "Mobilisation centrale de Dejours (1993) : face à un risque résiduel irréductible, le collectif élabore une stratégie collective de défense (déni de la vulnérabilité, bravade virile) pour conjurer la peur. Mais ce bouclier psychique devient ambivalent lorsqu'il aveugle sur le danger physique. En contrepoint, Clot (2008) invite à transformer cette défense en controverse technique sur les gestes sûrs.",
    step4InterventionDevice:
      "Combinaison d'observations ergonomiques des postures en situation réelle et d'une enquête de psychodynamique du travail (collectif de volontaires, élaboration de l'expérience subjective du risque, validation intégrale du rapport par le groupe avant présentation au CSSCT).",
  },
  {
    id: "case-digital-ia-cobots",
    ue: "PST124 · PST106",
    title:
      "Cas n°4 — Déploiement d'un ERP / IA Prédictive : Genèse instrumentale et catachrèses",
    sector: "Logistique Pharmaceutique · Ordonnancement & Préparation",
    streams: [
      "Approche instrumentale (Rabardel)",
      "Clinique de l'usage (Bobillier Chaumon)",
    ],
    rawCommand:
      "La direction des systèmes d'information (DSI) sollicite un accompagnement au changement face à la « résistance au numérique » des planificateurs qui continuent d'utiliser des fichiers Excel parallèles malgré le déploiement d'un algorithme d'ordonnancement par IA.",
    terrainObservables:
      "L'algorithme réalloue automatiquement les priorités toutes les 10 minutes sans afficher ses critères de calcul (boîte noire). Pour éviter la désorganisation des quais en cas d'aléa transporteur, les planificateurs neutralisent certaines alertes et maintiennent un tableur partagé clandestin.",
    step1DemandReformulation:
      "Dépasser le mythe de la « résistance psychologique au changement ». Reformuler vers l'analyse de l'acceptabilité située et des entraves à la genèse instrumentale de ce nouvel artefact algorithmique (Bobillier Chaumon, 2021).",
    step2PrescribedVsReal:
      "Distinction fondamentale de Rabardel (1995) : la DSI a livré un artefact technique (le logiciel), mais celui-ci ne devient un instrument psychologique que s'il s'enrichit des schèmes d'utilisation des opérateurs (instrumentation + instrumentalisation).",
    step3TheoreticalTension:
      "Les tableurs clandestins ne sont pas du sabotage mais des catachrèses régulatrices permettant de préserver l'intelligibilité de la situation et le pouvoir d'agir face à l'opacité algorithmique. Sans marge d'instrumentalisation, la technologie produit une intensification techno-induite et une perte de sens.",
    step4InterventionDevice:
      "Mise en place d'un dispositif de conception participative et de simulation ergonomique réunissant concepteurs DSI et planificateurs autour de scénarios réels d'aléas, afin de redonner la main aux opérateurs sur le paramétrage des règles de priorité.",
  },
  {
    id: "case-parcours-bilan-sosie",
    ue: "PST108 · PST120",
    title:
      "Cas n°5 — Reconversion & Usure Professionnelle : Instruction au sosie et conceptualisation",
    sector: "Accompagnement des Parcours · Salariés seniors de l'industrie",
    streams: [
      "Didactique professionnelle (Pastré)",
      "Instruction au sosie (Oddone, Clot)",
    ],
    rawCommand:
      "Dans le cadre d'un accord GEPP (Gestion des Emplois et des Parcours Professionnels), la DRH souhaite aider des opérateurs de fabrication ayant 25 ans d'ancienneté à « identifier leurs compétences transférables », ceux-ci affirmant « ne rien savoir faire d'autre qu'appuyer sur des boutons ».",
    terrainObservables:
      "En entretien classique, les opérateurs dévalorisent leur savoir-faire tacite. Pourtant, sur ligne, ils anticipent les dérives thermiques de la machine au bruit et à l'odeur bien avant le déclenchement des capteurs.",
    step1DemandReformulation:
      "Passer d'une logique d'inventaire déclaratif de compétences (référentiel RH abstrait) à une démarche développementale d'explicitation des savoirs d'expérience incorporés et des concepts pragmatiques.",
    step2PrescribedVsReal:
      "Avec Pastré (2011), les compétences critiques résident dans la structure conceptuelle de la situation (diagnostic subtil des variables d'état), devenue inconsciente à force d'incorporation dans l'habitude.",
    step3TheoreticalTension:
      "Mobilisation de l'Instruction au sosie (Oddone et al., 1981 ; Clot, 1999) : la consigne indirecte (« Dis-moi comment je dois m'y prendre pour te remplacer demain sans que personne s'en aperçoive ») oblige le sujet à déplier les micro-décisions invisibles et à prendre conscience de son propre style professionnel.",
    step4InterventionDevice:
      "Dispositif garantissant le volontariat et la propriété exclusive des synthèses par le salarié (Art. L. 6313-4 du Code du travail ; Code de déontologie 2021). Séances d'instruction au sosie retranscrites et commentées par le bénéficiaire pour construire son portefeuille de compétences réelles.",
  },
];

export const PstClinicalCasesModal: React.FC<PstClinicalCasesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    CLINICAL_VIGNETTES[0].id,
  );
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
    CLINICAL_VIGNETTES.find((c) => c.id === selectedId) ||
    CLINICAL_VIGNETTES[0];

  const formatMarkdown = (v: ClinicalVignette) => {
    return [
      `# ${v.title}`,
      `**UE Cibles** : ${v.ue} | **Secteur** : ${v.sector}`,
      `**Courants mobilisés** : ${v.streams.join(" · ")}`,
      "",
      "## 0. Commande Initiale & Observables de Terrain",
      `- **Commande institutionnelle** : ${v.rawCommand}`,
      `- **Observables ergonomiques & cliniques** : ${v.terrainObservables}`,
      "",
      "## 1. De la Commande à la Demande (Reformulation Clinique)",
      v.step1DemandReformulation,
      "",
      "## 2. Analyse Ergonomique : Tâche Prescrite vs Activité Réelle",
      v.step2PrescribedVsReal,
      "",
      "## 3. Problématisation & Mise en Tension Théorique",
      v.step3TheoreticalTension,
      "",
      "## 4. Dispositif Méthodologique & Cadre Déontologique (Code 2021)",
      v.step4InterventionDevice,
    ].join("\n");
  };

  const handleCopy = async () => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(formatMarkdown(current));
      setCopied(true);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    triggerHaptic("success");
    playClickSound();
    const md = formatMarkdown(current);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Vignette_Clinique_CNAM_${current.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-clinical-cases-title"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                  BANQUE DE CAS CLINIQUES &amp; CORRIGÉS TYPES CNAM
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Méthode en 4 étapes RNCP 7
                </span>
              </div>
              <h2
                id="pst-clinical-cases-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Vignettes d'Entreprise Corrigées (PST106 · PST108 · PST120 ·
                PST123 · PST124)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Corrigé copié
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copier Corrigé Type
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Exporter (.MD)
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer la banque de cas cliniques"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left: Vignette List */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4 overflow-y-auto space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Études de Cas Canoniques ({CLINICAL_VIGNETTES.length})
            </span>

            {CLINICAL_VIGNETTES.map((v) => {
              const isSelected = v.id === selectedId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    playClickSound();
                    setSelectedId(v.id);
                    setCopied(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-cyan-500/50 shadow-xs"
                      : "bg-transparent border-slate-200/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                      {v.ue}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {v.title}
                  </p>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {v.sector}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: 4-Step Methodological Resolution */}
          <div className="lg:col-span-8 p-5 sm:p-6 overflow-y-auto space-y-4 bg-white dark:bg-[#0B0F17]">
            {/* Contexte & Commande brute */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  Énoncé du Cas &amp; Observables de Terrain
                </span>
                <div className="flex flex-wrap gap-1">
                  {current.streams.map((st, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                <strong>Commande initiale :</strong> {current.rawCommand}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-200/70 dark:border-slate-800">
                <strong>Observables situés :</strong>{" "}
                {current.terrainObservables}
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 gap-3.5">
              <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                  Étape 1 · De la Commande Sociale à la Demande Clinique
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {current.step1DemandReformulation}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-indigo-500/25 bg-indigo-500/5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  Étape 2 · Diagnostic de l'Écart Tâche Prescrite / Activité
                  Réelle
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {current.step2PrescribedVsReal}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/25 bg-purple-500/5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                  Étape 3 · Mise en Tension Théorique &amp; Controverses CNAM
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  {current.step3TheoreticalTension}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  Étape 4 · Architecture du Dispositif &amp; Garanties
                  Déontologiques (Code 2021)
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {current.step4InterventionDevice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PstClinicalCasesModal;
