"use client";

import { useState } from "react";
import {
  Compass,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  RotateCcw,
  Check,
  Copy,
  Brain,
  Quote,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface DubarQuadrant {
  id: "promotion" | "blocage" | "conversion" | "exclusion";
  nom: string;
  sousTitre: string;
  pourSoi: string; // biographique
  pourAutrui: string; // relationnel
  description: string;
  exemples: string;
  citationDubar: string;
  conseilExamen: string;
  accent: string;
}

const DUBAR_QUADRANTS: DubarQuadrant[] = [
  {
    id: "promotion",
    nom: "Identité de Promotion (ou d'Entreprise)",
    sousTitre: "Accord soi / autrui dans la continuité",
    pourSoi: "Continuité biographique (fidélité à sa trajectoire)",
    pourAutrui: "Reconnaissance institutionnelle positive (statut validé, promotion interne)",
    description:
      "L'individu adhère aux valeurs de l'entreprise qui, en retour, valorise son engagement par des titres, de la mobilité ascendante ou des responsabilités reconnues. L'identité pour soi et l'identité pour autrui coïncident harmonieusement.",
    exemples: "Ouvrier devenu chef d'équipe par promotion interne ; jeune cadre intégrant les codes de la firme.",
    citationDubar: "« L'identité d'entreprise repose sur une transaction relationnelle positive qui confirme la transaction biographique de continuité. » (Dubar, 1991)",
    conseilExamen: "Insistez sur la stabilité identitaire : pas de décalage conflictuel entre ce que le salarié revendique et ce que la hiérarchie lui accorde.",
    accent: "#10b981", // emerald
  },
  {
    id: "blocage",
    nom: "Identité de Blocage (ou Hors-Travail)",
    sousTitre: "Revendication pour soi refusée par l'institution",
    pourSoi: "Continuité biographique ou aspiration à monter (diplôme, compétences réelles)",
    pourAutrui: "Non-reconnaissance institutionnelle (stagnation, assignation à un sous-statut)",
    description:
      "Le salarié possède des qualifications ou une ambition qu'il revendique, mais l'organisation refuse de les reconnaître (absence de promotion, salaire bloqué). Il développe alors un désinvestissement défensif et transfère son identité dans la sphère hors-travail.",
    exemples: "Salarié ayant validé une licence ou un master par le CNAM mais maintenu à son poste d'exécutant.",
    citationDubar: "« Le blocage résulte de la non-reconnaissance par autrui d'une identité pour soi pourtant légitimée par des titres scolaires ou des savoirs d'expérience. »",
    conseilExamen: "Cas d'examen ultra-fréquent au CNAM pour illustrer la crise identitaire et le repli vers le loisir ou la famille.",
    accent: "#ef4444", // red
  },
  {
    id: "conversion",
    nom: "Identité de Conversion (ou Réseau)",
    sousTitre: "Rupture biographique + Reconnaissance externe",
    pourSoi: "Rupture biographique assumée (bifurcation, reconversion professionnelle)",
    pourAutrui: "Reconnaissance de la nouvelle identité par le nouveau collectif de pairs ou le marché",
    description:
      "L'individu quitte son univers d'origine, abandonne ses repères antérieurs et investit un nouveau métier. La réussite de la conversion dépend de l'accueil du nouveau milieu qui valide ses actes d'appartenance par des actes d'attribution légitimes.",
    exemples: "Ancien ingénieur devenant maraîcher bio ou psychologue du travail après une reprise d'études.",
    citationDubar: "« La conversion exige le deuil de l'identité antérieure et l'apprentissage de nouveaux codes de socialisation secondaire. »",
    conseilExamen: "À mobiliser pour analyser les trajectoires d'adultes en formation continue au CNAM (bifurcation existentielle).",
    accent: "#6366f1", // indigo
  },
  {
    id: "exclusion",
    nom: "Identité d'Exclusion (ou de Précarité)",
    sousTitre: "Rupture biographique subie + Non-reconnaissance",
    pourSoi: "Rupture subie, sentiment de déclassement et d'inutilité sociale",
    pourAutrui: "Stigmatisation institutionnelle, étiquetage de 'chômeur', 'inadapté' ou 'intérimaire'",
    description:
      "Double négation : ni le passé n'offre de continuité protectrice, ni le présent n'accorde de statut reconnu. L'individu subit la désaffiliation sociale (Robert Castel) et la perte de tous les repères de reconnaissance.",
    exemples: "Chômeur de longue durée après un plan social ; jeune enchaînant les contrats précaires sans ancrage.",
    citationDubar: "« L'exclusion est la forme limite où la transaction identitaire se brise des deux côtés : ni pour soi ni pour autrui le travail ne fait sens. »",
    conseilExamen: "Liez ce quadrant avec le concept de désaffiliation de Robert Castel et la destruction de l'estime de soi d'Axel Honneth.",
    accent: "#f59e0b", // amber
  },
];

interface SainsaulieuModel {
  id: "fusionnel" | "negociation" | "affinitaire" | "retrait";
  nom: string;
  populationTypique: string;
  pouvoirSurPoste: string;
  dependanceRelationnelle: string;
  valeurCardinale: string;
  rapportAutorite: string;
  citationSainsaulieu: string;
  conseilExamen: string;
  accent: string;
}

const SAINSAULIEU_MODELS: SainsaulieuModel[] = [
  {
    id: "fusionnel",
    nom: "1. Modèle Fusionnel",
    populationTypique: "Ouvriers spécialisés (OS), agents d'exécution répétitive sans marge de manœuvre",
    pouvoirSurPoste: "FAIBLE (tâche parcellaire, cadences imposées)",
    dependanceRelationnelle: "FORTE (besoin vital du groupe des pairs pour tenir face aux cadences)",
    valeurCardinale: "Solidarité égalitaire, camaraderie défensive, refus de toute tête qui dépasse",
    rapportAutorite: "Opposition viscérale au chef ou dépendance affective (le bon contre le mauvais chef)",
    citationSainsaulieu: "« Le modèle fusionnel est la réponse collective des faibles : quand on n'a aucun pouvoir individuel sur sa machine, on se serre les coudes contre la hiérarchie. » (1977)",
    conseilExamen: "Attention : le collectif y est chaleureux mais très conformiste. Quiconque essaie de négocier seul avec la direction est traité de traître.",
    accent: "#ec4899", // pink
  },
  {
    id: "negociation",
    nom: "2. Modèle de Négociation",
    populationTypique: "Ouvriers qualifiés (OQ), techniciens, professionnels de métier, soignants expérimentés",
    pouvoirSurPoste: "FORT (maîtrise technique, savoirs d'expérience indispensables)",
    dependanceRelationnelle: "FORTE (les pairs sont des alliés mais aussi des interlocuteurs exigeants)",
    valeurCardinale: "Discussion démocratique, compromis rationnel, reconnaissance mutuelle des compétences",
    rapportAutorite: "L'autorité doit prouver sa compétence ; conflit légitime et institutionnalisé (syndicats)",
    citationSainsaulieu: "« C'est dans le modèle de négociation que s'épanouit la démocratie industrielle : le pouvoir technique autorise la contestation argumentée. »",
    conseilExamen: "C'est le modèle le plus proche de la clinique de l'activité (PST106) : le genre professionnel vivant permet la controverse réglée.",
    accent: "#3b82f6", // blue
  },
  {
    id: "affinitaire",
    nom: "3. Modèle Affinitaire",
    populationTypique: "Cadres intermédiaires, jeunes diplômés, managers de projet en concurrence",
    pouvoirSurPoste: "MOYEN à FORT (autonomie encadrée)",
    dependanceRelationnelle: "SÉLECTIVE (on choisit ses alliés utiles, constitution de clans)",
    valeurCardinale: "Opportunisme relationnel, mobilité ascendante, affinités électives",
    rapportAutorite: "Séduction hiérarchique, proximité avec les décideurs, jeu politique interne",
    citationSainsaulieu: "« Le modèle affinitaire substitue à la solidarité ouvrière des réseaux sélectifs d'intérêts et de sympathies électives. »",
    conseilExamen: "Montrez que les relations n'y sont pas gratuites : elles sont instrumentées pour la progression de carrière.",
    accent: "#8b5cf6", // purple
  },
  {
    id: "retrait",
    nom: "4. Modèle de Retrait",
    populationTypique: "Employés de bureau isolés, vacataires, intérimaires, salariés désabusés",
    pouvoirSurPoste: "FAIBLE",
    dependanceRelationnelle: "FAIBLE (isolement physique ou psychique, rejet du collectif d'entreprise)",
    valeurCardinale: "Travail alimentaire : 'je fais mes heures et je rentre', la vraie vie est ailleurs",
    rapportAutorite: "Indifférence polie, soumission de façade sans aucun investissement affectif",
    citationSainsaulieu: "« Le retrait n'est pas paresse mais protection subjective : on refuse de donner son âme à une organisation qui ne donne rien en retour. »",
    conseilExamen: "Faites le lien avec l'identité de blocage de Dubar : le retrait est la conséquence d'espoirs professionnels déçus.",
    accent: "#64748b", // slate
  },
];

interface CasCliniqueIdentite {
  id: string;
  nomSalarie: string;
  agePoste: string;
  verbatim: string;
  contexte: string;
  bonneReponseDubar: "promotion" | "blocage" | "conversion" | "exclusion";
  bonneReponseSainsaulieu: "fusionnel" | "negociation" | "affinitaire" | "retrait";
  explicationCopie: string;
  piegeEviter: string;
}

const CAS_CLINIQUES_EXAMEN: CasCliniqueIdentite[] = [
  {
    id: "c1",
    nomSalarie: "Karim, 38 ans",
    agePoste: "Technicien de maintenance industrielle en usine agroalimentaire",
    contexte:
      "Karim est titulaire d'un BTS et a 15 ans d'ancienneté. Les machines n'ont aucun secret pour lui. Quand une panne complexe survient, même les ingénieurs viennent lui demander conseil.",
    verbatim:
      "« Avec les collègues techniciens, on n'est pas toujours d'accord sur le diagnostic, on s'engueule parfois fort sur la méthode pour réparer, mais au final on trouve le compromis. Quand le chef nous impose une pièce pas adaptée, on va dans son bureau avec nos schémas et on discute d'égal à égal jusqu'à ce qu'il cède. »",
    bonneReponseDubar: "promotion",
    bonneReponseSainsaulieu: "negociation",
    explicationCopie:
      "Chez Sainsaulieu, c'est l'archétype du MODÈLE DE NÉGOCIATION : pouvoir fort issu de l'expertise technique, dépendance relationnelle forte mais conflictuelle et argumentée. Chez Dubar, Karim vit une IDENTITÉ DE PROMOTION/MÉTIER : ses compétences réelles sont pleinement reconnues par les pairs et la direction (accord pour soi / pour autrui).",
    piegeEviter:
      "Ne pas confondre avec le modèle fusionnel sous prétexte qu'il 'discute avec les collègues' : le modèle fusionnel refuse le débat contradictoire interne.",
  },
  {
    id: "c2",
    nomSalarie: "Nathalie, 44 ans",
    agePoste: "Adjointe administrative dans une collectivité territoriale",
    contexte:
      "Nathalie a obtenu un Master en droit public en cours du soir il y a 3 ans. Elle postule à chaque poste de cadre disponible, mais la DRH préfère recruter des contractuels externes.",
    verbatim:
      "« J'ai fait 3 ans d'efforts au CNAM en dormant 4h par nuit pour avoir ce diplôme. Au bureau, on me donne toujours le même classement de dossiers. Pour eux, je reste la 'petite secrétaire'. Maintenant, j'arrive à 8h59, je pars à 17h pile. Mon énergie, je la garde pour mon association d'aide aux réfugiés. »",
    bonneReponseDubar: "blocage",
    bonneReponseSainsaulieu: "retrait",
    explicationCopie:
      "Chez Dubar, c'est le cas typique de l'IDENTITÉ DE BLOCAGE (ou hors-travail) : rupture entre les actes d'appartenance revendiqués (diplôme bac+5) et les actes d'attribution de l'institution (assignation au statut d'exécutante). Chez Sainsaulieu, elle bascule dans le MODÈLE DU RETRAIT défensif.",
    piegeEviter:
      "Ne pas diagnostiquer une démotivation psychologique individuelle sans relier cela au refus institutionnel de validation de son titre.",
  },
  {
    id: "c3",
    nomSalarie: "Sylvie et ses collègues",
    agePoste: "Opératrices sur chaîne d'emballage en industrie pharmaceutique",
    contexte:
      "Cadence de 800 boîtes/heure. Caméras au-dessus de la ligne. Le chef de ligne surveille les moindres retards aux pauses toilettes.",
    verbatim:
      "« C'est un boulot de robot. Si on n'était pas là toutes ensemble pour blaguer et se passer les chocolats en douce sous la table, on deviendrait folles. Si l'une a un coup de pompe, les autres accélèrent pour qu'elle ne prenne pas de réprimande. Le chef, c'est l'ennemi juré, on ne lui dit rien et gare à celle qui lui fait des sourires ! »",
    bonneReponseDubar: "blocage",
    bonneReponseSainsaulieu: "fusionnel",
    explicationCopie:
      "Pour Sainsaulieu, c'est la définition pure du MODÈLE FUSIONNEL : pouvoir nul sur le poste, dépendance relationnelle maximale face à la pénibilité, camaraderie égalitaire et rejet total de toute entente avec la hiérarchie.",
    piegeEviter:
      "Ne pas croire que le collectif est serein : le contrôle social entre paires y est féroce (« gare à celle qui sourit au chef »).",
  },
  {
    id: "c4",
    nomSalarie: "Antoine, 31 ans",
    agePoste: "Chef de projet dans une ESN (Entreprise de Services Numériques)",
    contexte:
      "Antoine change de mission tous les 6 mois. Il passe beaucoup de temps aux pots internes et sélectionne soigneusement ses relations.",
    verbatim:
      "« Dans cette boîte, si tu restes dans ton coin à coder comme un technicien, tu es mort. Avec 3 ou 4 autres consultants qui montent, on déjeune toujours ensemble et on s'échange les infos sur les missions prestigieuses avant qu'elles soient publiées. Il faut savoir se rendre indispensable auprès du directeur associé. »",
    bonneReponseDubar: "promotion",
    bonneReponseSainsaulieu: "affinitaire",
    explicationCopie:
      "Chez Sainsaulieu, c'est le MODÈLE AFFINITAIRE par excellence : relations sélectives, courtisanerie stratégique et constitution de coteries pour gravir les échelons hiérarchiques.",
    piegeEviter:
      "Ne pas le qualifier de modèle de négociation : Antoine ne négocie pas des règles démocratiques de métier, il maximise son intérêt individuel en réseau.",
  },
];

export function MatriceDubarSainsaulieu() {
  const [activeTab, setActiveTab] = useState<"dubar" | "sainsaulieu" | "jeu">("dubar");
  const [selectedDubarId, setSelectedDubarId] = useState<DubarQuadrant["id"]>("promotion");
  const [selectedSainsaulieuId, setSelectedSainsaulieuId] = useState<SainsaulieuModel["id"]>("fusionnel");

  // Cas cliniques state
  const [currentCasIdx, setCurrentCasIdx] = useState(0);
  const [selectedCasDubar, setSelectedCasDubar] = useState<string | null>(null);
  const [selectedCasSainsaulieu, setSelectedCasSainsaulieu] = useState<string | null>(null);
  const [hasValidatedCas, setHasValidatedCas] = useState(false);
  const [casScore, setCasScore] = useState(0);
  const [solvedCas, setSolvedCas] = useState<Record<string, boolean>>({});
  const [copiedQuote, setCopiedQuote] = useState(false);

  const selectedDubar = DUBAR_QUADRANTS.find((q) => q.id === selectedDubarId) ?? DUBAR_QUADRANTS[0];
  const selectedSainsaulieu = SAINSAULIEU_MODELS.find((m) => m.id === selectedSainsaulieuId) ?? SAINSAULIEU_MODELS[0];
  const currentCas = CAS_CLINIQUES_EXAMEN[currentCasIdx] ?? CAS_CLINIQUES_EXAMEN[0];

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedQuote(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const handleValidateCas = () => {
    if (!selectedCasDubar || !selectedCasSainsaulieu) return;
    setHasValidatedCas(true);
    const isCorrectDubar = selectedCasDubar === currentCas.bonneReponseDubar;
    const isCorrectSainsaulieu = selectedCasSainsaulieu === currentCas.bonneReponseSainsaulieu;

    if (isCorrectDubar && isCorrectSainsaulieu) {
      playSuccessSound();
      triggerHaptic();
      if (!solvedCas[currentCas.id]) {
        setCasScore((s) => s + 1);
        setSolvedCas((prev) => ({ ...prev, [currentCas.id]: true }));
      }
    } else {
      playReviewSound();
      triggerHaptic();
    }
  };

  const handleNextCas = () => {
    playClickSound();
    triggerHaptic();
    setSelectedCasDubar(null);
    setSelectedCasSainsaulieu(null);
    setHasValidatedCas(false);
    setCurrentCasIdx((i) => (i + 1) % CAS_CLINIQUES_EXAMEN.length);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/60 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              <Compass className="h-3.5 w-3.5 text-indigo-400 animate-spin-slow" />
              <span>PST123 · Atelier Typologies & Dynamique Identitaire</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Matrice de Dubar & Modèles de Sainsaulieu
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Maîtrisez les deux grilles reines de PST123. Expérimentez la double transaction (Dubar) et les cultures d&apos;entreprise (Sainsaulieu), puis entraînez-vous sur les cas cliniques réels d&apos;examen.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => {
                setActiveTab("dubar");
                playClickSound();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === "dubar"
                  ? "bg-indigo-600 text-white shadow-md font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Claude Dubar (2×2)
            </button>
            <button
              onClick={() => {
                setActiveTab("sainsaulieu");
                playClickSound();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === "sainsaulieu"
                  ? "bg-indigo-600 text-white shadow-md font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Renaud Sainsaulieu (4 Modèles)
            </button>
            <button
              onClick={() => {
                setActiveTab("jeu");
                playClickSound();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "jeu"
                  ? "bg-emerald-600 text-white shadow-md font-semibold"
                  : "text-emerald-400 hover:text-emerald-200"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cas Cliniques ({casScore}/{CAS_CLINIQUES_EXAMEN.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================== TAB 1 : DUBAR ===================== */}
      {activeTab === "dubar" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual 2x2 Matrix */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  Matrice 2×2 de la Double Transaction
                </span>
                <span className="text-xs text-slate-400">Cliquez sur un quadrant pour l&apos;examiner</span>
              </div>

              {/* Axis labels */}
              <div className="relative pt-6">
                <div className="text-center pb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    ▲ Transaction Relationnelle (Autrui : Reconnaissance / Statut)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {DUBAR_QUADRANTS.map((quad) => {
                    const isSelected = quad.id === selectedDubarId;
                    return (
                      <button
                        key={quad.id}
                        onClick={() => {
                          setSelectedDubarId(quad.id);
                          playClickSound();
                          triggerHaptic();
                        }}
                        style={{
                          borderColor: isSelected ? quad.accent : "rgba(51, 65, 85, 0.6)",
                          backgroundColor: isSelected ? `${quad.accent}15` : "rgba(15, 23, 42, 0.6)",
                        }}
                        className={`text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.01] flex flex-col justify-between h-44 shadow-md ${
                          isSelected ? "ring-2 ring-indigo-500/50 shadow-indigo-950/50" : "hover:border-slate-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                              style={{
                                color: quad.accent,
                                backgroundColor: `${quad.accent}25`,
                              }}
                            >
                              {quad.id}
                            </span>
                            {isSelected && <CheckCircle2 className="h-4 w-4" style={{ color: quad.accent }} />}
                          </div>
                          <h4 className="text-sm font-bold text-white leading-snug">{quad.nom}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{quad.sousTitre}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 space-y-0.5">
                          <div className="truncate"><span className="text-slate-300 font-medium">Pour soi:</span> {quad.pourSoi}</div>
                          <div className="truncate"><span className="text-slate-300 font-medium">Autrui:</span> {quad.pourAutrui}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center pt-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    ◄ Transaction Biographique (Soi : Continuité vs Rupture) ►
                  </span>
                </div>
              </div>

              {/* Dubar Law reminder */}
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 flex items-start gap-2.5">
                <Brain className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Formule reine du CNAM :</strong> « L&apos;identité est le produit de la double transaction biographique (pour soi dans le temps) et relationnelle (pour autrui dans l&apos;espace social). »
                </div>
              </div>
            </div>

            {/* Quadrant Details Card */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                      style={{
                        color: selectedDubar.accent,
                        backgroundColor: `${selectedDubar.accent}20`,
                      }}
                    >
                      Détail du Quadrant
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedDubar.nom}</h3>
                  </div>
                  <button
                    onClick={() => handleCopyQuote(selectedDubar.citationDubar)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copier la citation pour la copie"
                  >
                    {copiedQuote ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <h5 className="font-semibold text-slate-200 mb-1">Mécanisme sociologique :</h5>
                    <p className="text-slate-300">{selectedDubar.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Processus Biographique</span>
                      <span className="text-slate-200">{selectedDubar.pourSoi}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Processus Relationnel</span>
                      <span className="text-slate-200">{selectedDubar.pourAutrui}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-slate-200 mb-1">Exemple concret :</h5>
                    <p className="text-slate-400 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                      {selectedDubar.exemples}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-xs">
                      <Quote className="h-3.5 w-3.5" />
                      <span>Citation textuelle à citer :</span>
                    </div>
                    <p className="text-purple-200 italic">{selectedDubar.citationDubar}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30">
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Conseil correcteur CNAM :</strong> {selectedDubar.conseilExamen}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2 : SAINSAULIEU ===================== */}
      {activeTab === "sainsaulieu" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAINSAULIEU_MODELS.map((mod) => {
              const isSelected = mod.id === selectedSainsaulieuId;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setSelectedSainsaulieuId(mod.id);
                    playClickSound();
                    triggerHaptic();
                  }}
                  style={{
                    borderColor: isSelected ? mod.accent : "rgba(51, 65, 85, 0.6)",
                    backgroundColor: isSelected ? `${mod.accent}12` : "rgba(15, 23, 42, 0.6)",
                  }}
                  className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 shadow-md hover:scale-[1.01] ${
                    isSelected ? "ring-2 ring-indigo-500/50 shadow-indigo-950/40" : "hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                        style={{
                          color: mod.accent,
                          backgroundColor: `${mod.accent}20`,
                        }}
                      >
                        {mod.id}
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4" style={{ color: mod.accent }} />}
                    </div>
                    <h4 className="text-base font-bold text-white leading-tight">{mod.nom}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{mod.populationTypique}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pouvoir poste :</span>
                      <span className="font-semibold text-slate-200">{mod.pouvoirSurPoste.split(" ")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dépendance pairs :</span>
                      <span className="font-semibold text-slate-200">{mod.dependanceRelationnelle.split(" ")[0]}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sainsaulieu Focus Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider inline-block mb-1"
                  style={{
                    color: selectedSainsaulieu.accent,
                    backgroundColor: `${selectedSainsaulieu.accent}20`,
                  }}
                >
                  Modèle Sélectionné
                </span>
                <h3 className="text-xl font-bold text-white">{selectedSainsaulieu.nom}</h3>
                <p className="text-xs text-slate-400">{selectedSainsaulieu.populationTypique}</p>
              </div>

              <button
                onClick={() => handleCopyQuote(selectedSainsaulieu.citationSainsaulieu)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium self-start transition-colors"
              >
                {copiedQuote ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copier citation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Valeur Cardinale
                </span>
                <p className="text-slate-200 font-medium text-sm">{selectedSainsaulieu.valeurCardinale}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Rapport à l&apos;Autorité
                </span>
                <p className="text-slate-200 font-medium text-sm">{selectedSainsaulieu.rapportAutorite}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                  Structure de Pouvoir
                </span>
                <p className="text-slate-200 font-medium text-sm">
                  Pouvoir : {selectedSainsaulieu.pouvoirSurPoste} · Dépendance : {selectedSainsaulieu.dependanceRelationnelle}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/40 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                <Quote className="h-4 w-4" />
                <span>Citation canonique (L&apos;identité au travail, 1977) :</span>
              </div>
              <p className="text-indigo-200 italic text-sm">{selectedSainsaulieu.citationSainsaulieu}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Point clé copie d&apos;examen :</strong> {selectedSainsaulieu.conseilExamen}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 3 : JEU DE CAS CLINIQUES ===================== */}
      {activeTab === "jeu" && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Cas progress & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Cas {currentCasIdx + 1} sur {CAS_CLINIQUES_EXAMEN.length}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{currentCas.nomSalarie}</h3>
                <p className="text-xs text-slate-400">{currentCas.agePoste}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Score : {casScore} / {CAS_CLINIQUES_EXAMEN.length}
                </span>
                <button
                  onClick={handleNextCas}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <span>Cas suivant</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Situation & Verbatim */}
            <div className="space-y-3">
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <strong className="text-slate-200 block mb-1">Contexte organisationnel :</strong>
                {currentCas.contexte}
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 relative">
                <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-xs mb-1.5">
                  <Quote className="h-4 w-4" />
                  <span>Verbatim recueilli en entretien :</span>
                </div>
                <p className="text-sm font-medium text-purple-100 italic">{currentCas.verbatim}</p>
              </div>
            </div>

            {/* Answer Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Question 1: Dubar */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold">1</span>
                  Forme identitaire selon Claude Dubar ?
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {(["promotion", "blocage", "conversion", "exclusion"] as const).map((fid) => {
                    const isSelected = selectedCasDubar === fid;
                    const isCorrect = hasValidatedCas && fid === currentCas.bonneReponseDubar;
                    const isWrong = hasValidatedCas && isSelected && !isCorrect;

                    return (
                      <button
                        key={fid}
                        disabled={hasValidatedCas}
                        onClick={() => {
                          setSelectedCasDubar(fid);
                          playClickSound();
                          triggerHaptic();
                        }}
                        className={`p-3 rounded-lg text-xs font-medium border text-left transition-all ${
                          isCorrect
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold"
                            : isWrong
                            ? "bg-red-500/20 border-red-500 text-red-200"
                            : isSelected
                            ? "bg-indigo-600 border-indigo-400 text-white font-semibold"
                            : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        <span className="capitalize">{fid}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Sainsaulieu */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold">2</span>
                  Modèle culturel selon Renaud Sainsaulieu ?
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {(["fusionnel", "negociation", "affinitaire", "retrait"] as const).map((mid) => {
                    const isSelected = selectedCasSainsaulieu === mid;
                    const isCorrect = hasValidatedCas && mid === currentCas.bonneReponseSainsaulieu;
                    const isWrong = hasValidatedCas && isSelected && !isCorrect;

                    return (
                      <button
                        key={mid}
                        disabled={hasValidatedCas}
                        onClick={() => {
                          setSelectedCasSainsaulieu(mid);
                          playClickSound();
                          triggerHaptic();
                        }}
                        className={`p-3 rounded-lg text-xs font-medium border text-left transition-all ${
                          isCorrect
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold"
                            : isWrong
                            ? "bg-red-500/20 border-red-500 text-red-200"
                            : isSelected
                            ? "bg-purple-600 border-purple-400 text-white font-semibold"
                            : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        <span className="capitalize">{mid}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Validation & Correction */}
            {!hasValidatedCas ? (
              <div className="flex justify-end pt-2">
                <button
                  disabled={!selectedCasDubar || !selectedCasSainsaulieu}
                  onClick={handleValidateCas}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center gap-2 ${
                    selectedCasDubar && selectedCasSainsaulieu
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-emerald-950/50"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Valider mon diagnostic</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                    selectedCasDubar === currentCas.bonneReponseDubar &&
                    selectedCasSainsaulieu === currentCas.bonneReponseSainsaulieu
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                      : "bg-amber-950/30 border-amber-500/40 text-amber-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedCasDubar === currentCas.bonneReponseDubar &&
                    selectedCasSainsaulieu === currentCas.bonneReponseSainsaulieu ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Diagnostic parfait ! (+1 point)</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="h-4 w-4 text-amber-400" />
                        <span>Explication du corrigé officiel :</span>
                      </>
                    )}
                  </div>
                  <p>{currentCas.explicationCopie}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-rose-300">Piège classique à éviter sur la copie :</div>
                  <p className="text-slate-400">{currentCas.piegeEviter}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextCas}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-950/40 transition-all"
                  >
                    <span>Cas suivant</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
