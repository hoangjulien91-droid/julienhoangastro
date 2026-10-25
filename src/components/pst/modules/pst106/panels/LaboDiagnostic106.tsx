"use client";

import { useState } from "react";
import {
  Activity,
  Layers,
  ArrowRight,
  Brain,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
  HelpCircle,
  FileText,
  Workflow,
  Eye,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SituationMetier106 {
  id: string;
  titre: string;
  secteur: string;
  descriptionPrescrite: string;
  conditionsInternes: string[];
  conditionsExternes: string[];
  compromisOperatoires: string[];
  effetsOperateur: string[];
  effetsSysteme: string[];
  diagnosticClot: {
    statutActivite: "réalisée" | "contrariée" | "suspendue" | "empêchée";
    etatGenre: "vivant" | "affaibli" | "mortifère";
    explicationClinique: string;
    stylePossible: string;
  };
  protocoleRecommande: {
    etape1: string;
    etape2: string;
    dispositifCle: string;
    justificationExamen: string;
  };
}

const SITUATIONS_METIER_106: SituationMetier106[] = [
  {
    id: "teleconseiller",
    titre: "Téléconseiller en Centre d'Appels « Urgences Mutuelle »",
    secteur: "Services / Santé",
    descriptionPrescrite:
      "DMT (Durée Moyenne de Traitement) imposée : max 180 secondes par appel. Script téléphonique rigide à suivre au mot près. Note de satisfaction client visée : 4.8/5.",
    conditionsInternes: [
      "Fatigue vocale et auditive en fin de journée",
      "Empathie naturelle heurtée par le chronomètre",
      "Peur de l'évaluation mensuelle individuelle",
    ],
    conditionsExternes: [
      "Double écran avec logiciel de ticketing lent (latence de 4s)",
      "Bruit ambiant du plateau téléphonique (open space 50 pers.)",
      "Usagers souvent en situation de détresse financière ou médicale",
    ],
    compromisOperatoires: [
      "Raccourcir les salutations pour taper les notes pendant que l'usager parle",
      "Écrire des abréviations non homologuées dans le CRM pour gagner 20 secondes",
      "Rassurer l'usager tout en coupant le micro pour souffler (bricolage gestuel)",
    ],
    effetsOperateur: [
      "Souffrance éthique : sentiment de 'bâcler' des personnes vulnérables",
      "Tension permanente, céphalées et troubles musculosquelettiques cervicaux",
      "Démotivation progressive et absentéisme du lundi",
    ],
    effetsSysteme: [
      "Taux de réitération des appels de 28% (dossiers mal clôturés dans l'urgence)",
      "Turnover annuel de 45% chez les opérateurs",
      "Dégradation progressive de l'image de marque de la mutuelle",
    ],
    diagnosticClot: {
      statutActivite: "contrariée",
      etatGenre: "affaibli",
      explicationClinique:
        "L'activité est contrariée : l'opérateur a le souci du travail bien fait et de l'écoute, mais le carcan gestionnaire (DMT de 3 min) lui interdit d'exercer son métier dignement. Le genre professionnel est appauvri car les astuces informelles ne sont pas mises en délibération collective.",
      stylePossible:
        "Le style individuel est étouffé par l'algorithme d'écoute et les grilles de double écoute hiérarchique.",
    },
    protocoleRecommande: {
      etape1: "Analyse ergonomique du travail : observation systématique des interactions voix/écran et chronométrage réel des temps de réponse informatique.",
      etape2: "Dispositif d'auto-confrontation simple puis croisée sur des séquences d'appels conflictuels.",
      dispositifCle: "Mise en débat collectif des critères de la 'qualité du service' entre opérateurs, superviseurs et direction.",
      justificationExamen: "Permet de déplacer le problème d'une faute individuelle de cadence vers une incohérence du système de prescription.",
    },
  },
  {
    id: "cariste",
    titre: "Préparateur de Commandes sous Guidage Vocal (Logistique Lean)",
    secteur: "Grande Distribution / Logistique",
    descriptionPrescrite:
      "Casque audio transmettant les consignes d'allée et de colisage à la seconde. Validation par mot-clé ('0-4-2'). Vitesse minimale imposée : 140 colis/heure.",
    conditionsInternes: [
      "Charge mentale continue liée à la voix robotique dans l'oreille",
      "Douleurs lombaires et plantaires (18 km de marche quotidienne)",
      "Perte de repères temporels (rythme dicté par la machine)",
    ],
    conditionsExternes: [
      "Allées encombrées par les palettes des transporteurs",
      "Emballages fragiles ou mal étiquetés par les fournisseurs",
      "Éclairage zénithal aveuglant dans certains rayons hauts",
    ],
    compromisOperatoires: [
      "Porter deux colis à la fois pour économiser un aller-retour (sur-sollicitation biomécanique)",
      "Mémoriser l'ordre des 3 prochains emplacements pour anticiper le chariot",
      "Désactiver temporairement le bip de sécurité pour manœuvrer plus vite",
    ],
    effetsOperateur: [
      "TMS précoces des membres supérieurs et lombalgies chroniques",
      "Sentiment d'aliénation : 'être devenu le bras d'un ordinateur'",
      "Isolement sensoriel : impossibilité d'échanger avec les collègues croisés",
    ],
    effetsSysteme: [
      "Casse de marchandises en hausse de 18% lors des pics de cadence",
      "Accidents du travail fréquents (chutes de plain-pied, collisions)",
      "Coût élevé de formation des intérimaires remplaçants",
    ],
    diagnosticClot: {
      statutActivite: "empêchée",
      etatGenre: "mortifère",
      explicationClinique:
        "L'activité est empêchée et le genre professionnel est réduit à néant. L'isolement auditif permanent détruit toute possibilité de construction d'une mémoire collective du métier. Les défenses deviennent mortifères car le salarié sacrifie sa santé physique pour tenir la cadence prescrite.",
      stylePossible:
        "Aucun style personnel toléré : toute variabilité dans la trajectoire est détectée comme une sous-productivité.",
    },
    protocoleRecommande: {
      etape1: "Instruction au Sosie (Oddone) : faire verbaliser aux caristes experts les stratégies invisibles d'évitement des accidents dans les allées.",
      etape2: "Auto-confrontation croisée sur des manœuvres de chargement à risque.",
      dispositifCle: "Suppression du guidage vocal au profit d'écrans embarqués sur chariots et rétablissement des zones de concertation d'équipe.",
      justificationExamen: "Démontre que l'automatisation sans marge de régulation cognitive détruit le collectif et génère des TMS massifs.",
    },
  },
  {
    id: "aide-soignante",
    titre: "Aide-Soignante en EHPAD en Sous-Effectif",
    secteur: "Santé / Gérontologie",
    descriptionPrescrite:
      "Protocole de soins : 12 toilettes et habillages complets à réaliser en 3h30 (soit ~17 minutes par résident dépendant, aide au lever et transmission comprises).",
    conditionsInternes: [
      "Épuisement émotionnel face à la fin de vie et à la démence",
      "Attachement affectif aux résidents en contradiction avec la vitesse imposée",
      "Sentiment de culpabilité d'accélérer les gestes de toilette",
    ],
    conditionsExternes: [
      "Résidents désorientés refusant les soins ou agressifs dans la panique",
      "Matériel de transfert (lève-malade) partagé entre 3 couloirs distants",
      "Absence fréquente d'une collègue non remplacée (charge doublée)",
    ],
    compromisOperatoires: [
      "Faire les transferts au lit seule au lieu d'être à deux pour ne pas déranger la collègue",
      "Réduire la toilette à la petite toilette intime les jours de grand manque d'effectif",
      "Parler doucement et chanter pour apaiser le résident pendant un geste rapide",
    ],
    effetsOperateur: [
      "Souffrance éthique aiguë : 'maltraitance institutionnelle involontaire'",
      "Lombalgies sévères dues aux transferts individuels sans assistance mécanique",
      "Départs en burn-out et reconversions forcées hors du médico-social",
    ],
    effetsSysteme: [
      "Escarres et chutes de résidents en augmentation",
      "Tensions et agressivité exacerbée au sein de l'équipe soignante",
      "Plaintes des familles sur le manque d'attention humaine",
    ],
    diagnosticClot: {
      statutActivite: "contrariée",
      etatGenre: "affaibli",
      explicationClinique:
        "L'activité contrariée atteint ici le seuil critique de la souffrance éthique (Dejours/Clot). Le genre soignant historique (soin relationnel, respect de la pudeur) est broyé par la cadence fordiste des soins minutés. Le pouvoir d'agir est amputé.",
      stylePossible:
        "Les soignantes tentent de préserver un style (humour, chansons, douceur vocale) pour masquer la brutalité de la cadence imposée.",
    },
    protocoleRecommande: {
      etape1: "Chronobiologie et analyse de l'activité réelle de manutention et d'écoute au chevet du patient.",
      etape2: "Groupe d'auto-confrontation croisée sur la question du 'soin empêché'.",
      dispositifCle: "Refonte collective des tournées de soins avec la direction et négociation d'un ratio soignant/résident conforme au réel.",
      justificationExamen: "Illustre parfaitement l'articulation entre ergonomie physique (manutention) et clinique du travail (souffrance éthique).",
    },
  },
];

export function LaboDiagnostic106() {
  const [selectedSitId, setSelectedSitId] = useState<string>(SITUATIONS_METIER_106[0].id);
  const [activeTab, setActiveTab] = useState<"leplat" | "clot" | "protocole">("leplat");
  const [copied, setCopied] = useState(false);

  const situation =
    SITUATIONS_METIER_106.find((s) => s.id === selectedSitId) ?? SITUATIONS_METIER_106[0];

  const handleCopyAnalysis = () => {
    const text = `ANALYSE DU TRAVAIL SELON LEPLAT & HOC ET CLOT (PST106)
Situation : ${situation.titre} (${situation.secteur})

1. MODÈLE DE LEPLAT & HOC (1983)
- Tâche prescrite : ${situation.descriptionPrescrite}
- Conditions internes : ${situation.conditionsInternes.join(", ")}
- Conditions externes : ${situation.conditionsExternes.join(", ")}
- Activité réelle (Régulation opératoire) : ${situation.compromisOperatoires.join(", ")}
- Effets sur l'opérateur : ${situation.effetsOperateur.join(", ")}
- Effets sur le système : ${situation.effetsSysteme.join(", ")}

2. DIAGNOSTIC CLINIQUE DE L'ACTIVITÉ (YVES CLOT)
- Statut de l'activité : Activité ${situation.diagnosticClot.statutActivite.toUpperCase()}
- État du genre professionnel : ${situation.diagnosticClot.etatGenre.toUpperCase()}
- Analyse clinique : ${situation.diagnosticClot.explicationClinique}
- Marge de style : ${situation.diagnosticClot.stylePossible}

3. DÉMARCHE ERGONOMIQUE ET CLINIQUE D'INTERVENTION
- Étape 1 : ${situation.protocoleRecommande.etape1}
- Étape 2 : ${situation.protocoleRecommande.etape2}
- Dispositif central : ${situation.protocoleRecommande.dispositifCle}
- Argumentaire examen CNAM : ${situation.protocoleRecommande.justificationExamen}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-teal-950/20 to-slate-900/70 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>PST106 · Laboratoire d&apos;Analyse Clinique &amp; Ergonomique</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Le Labo Diagnostic 106 · Leplat &amp; Hoc $\times$ Yves Clot
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Décortiquez n&apos;importe quelle situation de travail en combinant la régulation ergonomique (Leplat &amp; Hoc, 1983) et la clinique de l&apos;activité (Clot, 1999). Produisez le diagnostic parfait attendu par le jury CNAM.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAnalysis}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Analyses copiées !" : "Copier pour la copie (/20)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Situation Selector */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Sélectionnez un cas de terrain à diagnostiquer :
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {SITUATIONS_METIER_106.map((sit) => {
            const isSelected = sit.id === situation.id;
            return (
              <button
                key={sit.id}
                onClick={() => {
                  setSelectedSitId(sit.id);
                  playClickSound();
                  triggerHaptic();
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? "bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-950/50"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {sit.titre.split(" (")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTab("leplat");
            playClickSound();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "leplat"
              ? "bg-teal-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>1. Grille Leplat &amp; Hoc (Régulation)</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("clot");
            playClickSound();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "clot"
              ? "bg-emerald-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Brain className="h-4 w-4" />
          <span>2. Clinique de l&apos;Activité (Clot)</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("protocole");
            playClickSound();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "protocole"
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Workflow className="h-4 w-4" />
          <span>3. Démarche d&apos;Intervention CNAM</span>
        </button>
      </div>

      {/* TAB 1 : LEPLAT & HOC */}
      {activeTab === "leplat" && (
        <div className="space-y-4">
          {/* Prescrit vs Conditions vs Régulation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Tâche Prescrite */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                  Tâche Prescrite
                </span>
                <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded font-mono">
                  Organisation
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-serif">
                {situation.descriptionPrescrite}
              </p>
            </div>

            {/* Box 2: Conditions Internes & Externes */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Conditions Internes / Externes
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">
                  Variabilité
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-400 text-[10px] uppercase block">Conditions internes :</strong>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    {situation.conditionsInternes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-slate-400 text-[10px] uppercase block">Conditions externes :</strong>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    {situation.conditionsExternes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Box 3: Activité Réelle & Régulation */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 bg-emerald-950/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Activité Réelle (Régulation)
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  Compromis
                </span>
              </div>
              <ul className="list-disc list-inside text-slate-200 space-y-1 text-xs">
                {situation.compromisOperatoires.map((comp, i) => (
                  <li key={i} className="leading-snug">{comp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Effets sur l'Homme et sur le Système */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block pb-1 border-b border-slate-800">
                Effets sur l&apos;Opérateur (Santé, Fatigue, Usure)
              </span>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {situation.effetsOperateur.map((eff, i) => (
                  <li key={i}>{eff}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block pb-1 border-b border-slate-800">
                Effets sur le Système Productif (Qualité, Coûts, Pannes)
              </span>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {situation.effetsSysteme.map((eff, i) => (
                  <li key={i}>{eff}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 : YVES CLOT */}
      {activeTab === "clot" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Statut de l'activité */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Statut de l&apos;Activité (Architecture du Réel)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-extrabold uppercase">
                  Activité {situation.diagnosticClot.statutActivite}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {situation.diagnosticClot.explicationClinique}
              </p>
            </div>

            {/* Genre & Style */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Genre Professionnel &amp; Marge de Style
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold uppercase">
                  Genre {situation.diagnosticClot.etatGenre}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <strong className="text-slate-400 text-[10px] uppercase block">Possibilité du Style :</strong>
                  <p>{situation.diagnosticClot.stylePossible}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200/90 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong>Formule canonique d&apos;examen (Clot, 1999) :</strong> « Le réel de l&apos;activité déborde ce qui est réalisé : il est constitué de ce qu&apos;on cherche à faire, de ce qu&apos;on aurait voulu faire, et de ce qu&apos;on fait pour ne pas faire ce qui est prescrit. C&apos;est dans cette résistance du réel que réside le pouvoir d&apos;agir. »
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 : PROTOCOLE ERGONOMIQUE */}
      {activeTab === "protocole" && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Protocole d&apos;Intervention Préconisé par le Psychologue du Travail
            </span>
            <h4 className="text-base font-bold text-white">
              Démarche Méthodologique en 3 Étapes
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
              <span className="font-bold text-slate-300 uppercase text-[10px] block">
                Étape 1 · Constat &amp; Mesure
              </span>
              <p className="text-slate-300 leading-snug">{situation.protocoleRecommande.etape1}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
              <span className="font-bold text-slate-300 uppercase text-[10px] block">
                Étape 2 · Confrontation Clinique
              </span>
              <p className="text-slate-300 leading-snug">{situation.protocoleRecommande.etape2}</p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/40 space-y-1.5">
              <span className="font-bold text-indigo-300 uppercase text-[10px] block">
                Étape 3 · Transformation Délibérative
              </span>
              <p className="text-indigo-200 leading-snug">{situation.protocoleRecommande.dispositifCle}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Argumentaire clé pour la copie :</strong> {situation.protocoleRecommande.justificationExamen}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
