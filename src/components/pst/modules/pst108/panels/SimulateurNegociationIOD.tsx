"use client";

import { useState } from "react";
import {
  HeartHandshake,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Building,
  Quote,
  Award,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface EtapeNegociation {
  id: number;
  drhReplique: string;
  objectionType: string;
  choix: {
    id: "a" | "b" | "c";
    reponseTexte: string;
    points: number;
    verdict: "correct" | "moyen" | "erreur";
    justificationTheorique: string;
    citationValls: string;
  }[];
}

const ETAPES_NEGOCIATION_IOD: EtapeNegociation[] = [
  {
    id: 1,
    objectionType: "La Demande de Tri Préalable & de CV",
    drhReplique:
      "« Bonjour. Écoutez, je recrute deux techniciens logistiques. Mais je n'ai pas le temps de voir n'importe qui : envoyez-moi vos 5 meilleurs CV déjà triés et testés, et je convoquerai les deux qui ont le profil parfait. »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« D'accord, je vous sélectionne nos candidats les plus motivés et je vous fais passer leurs résultats aux tests de personnalité et de logique. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Erreur fondamentale anti-IOD : accepter de trier les candidats en amont renforce la ségrégation et valide l'arbitraire du CV. L'IOD refuse le tri préalable.",
        citationValls:
          "« Le tri préalable constitue un processus d'éviction prédictif qui renforce l'exclusion des plus vulnérables. » (Castra & Valls)",
      },
      {
        id: "b",
        reponseTexte:
          "« C'est inadmissible ! Vous discriminez les personnes en difficulté, nous ne fonctionnons pas comme ça avec les entreprises capitalistes. »",
        points: 1,
        verdict: "erreur",
        justificationTheorique:
          "Posture militante moralisatrice : elle braque l'employeur et rompt la négociation. L'intervenant IOD doit être un partenaire technique et pragmatique de l'entreprise.",
        citationValls:
          "« L'intervenant IOD ne moralise pas l'entreprise : il lui offre une prestation de sécurisation du recrutement basée sur l'analyse ergonomique du poste. »",
      },
      {
        id: "c",
        reponseTexte:
          "« Je comprends votre impératif de temps et d'efficacité. Justement, notre méthode IOD ne fonctionne pas au CV sur déclaratif, mais sur le travail réel. Je vous propose de visiter votre quai logistique pendant 45 minutes pour analyser les exigences réelles du poste, puis nous vous présenterons directement une personne prête à occuper ces fonctions, sans vous inonder de paperasse. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Posture IOD parfaite : déplacer l'attention du DRH de l'évaluation abstraite sur CV vers la réalité concrète du poste et la sécurisation du geste de recrutement.",
        citationValls:
          "« Agir sur l'offre d'emploi, c'est d'abord analyser le poste réel pour lever les critères d'embauche artificiels ou surdimensionnés. » (Denis Castra)",
      },
    ],
  },
  {
    id: 2,
    objectionType: "La Crainte du « Trou » sur le CV et de l'Âge",
    drhReplique:
      "« Votre candidat a 48 ans et 3 ans d'inactivité. Comment voulez-vous que je prenne le risque de lui confier une ligne de conditionnement sans garantie sur ses capacités actuelles ? »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« Le trou sur le CV reflète une période de rupture biographique, pas une incompétence. Nous avons vérifié avec lui les conditions ergonomiques du poste. De plus, notre service assure un suivi bilatéral hebdomadaire pendant les premiers mois pour désamorcer immédiatement tout problème d'ajustement. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Argumentation IOD majeure : le contrat moral de suivi bilatéral rassure l'employeur tout en dédramatisant l'historique du demandeur d'emploi.",
        citationValls:
          "« La garantie IOD ne repose pas sur une sélection éliminatoire mais sur un accompagnement médiatisé de l'intégration dans la durée. »",
      },
      {
        id: "b",
        reponseTexte:
          "« Nous allons lui faire passer un bilan de santé complet et un test psychométrique de résistance à l'effort pour vous rassurer. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Contresens complet : faire passer des tests psychométriques déplace la responsabilité sur l'individu et médicalise une problématique d'insertion sociale.",
        citationValls:
          "« La psychologisation des difficultés d'accès à l'emploi exonère l'organisation de son devoir d'aménagement des conditions d'accueil. »",
      },
      {
        id: "c",
        reponseTexte:
          "« Si vous refusez, vous risquez une plainte auprès du Défenseur des Droits pour discrimination liée à l'âge. »",
        points: 1,
        verdict: "erreur",
        justificationTheorique:
          "Menace juridique stérile : elle détruit la relation de confiance nécessaire à l'intégration durable du salarié.",
        citationValls:
          "« L'accès à l'emploi durable se négocie dans la coopération avec le management de proximité, jamais dans la contrainte contentieuse. »",
      },
    ],
  },
  {
    id: 3,
    objectionType: "Le Refus de la Visite de Poste Préalable",
    drhReplique:
      "« Une visite de poste avec vous ? Mais monsieur, nous sommes une entreprise avec des secrets de fabrication et des consignes de sécurité drastiques. Le candidat verra bien le premier jour d'embauche ! »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« D'accord, nous ferons sans la visite, je me fierai à la fiche de poste rédigée par vos services RH. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Abandonner la visite de poste, c'est abandonner l'analyse du travail réel au profit de la tâche prescrite. C'est la mort de la méthode IOD.",
        citationValls:
          "« La fiche de poste est une fiction gestionnaire ; seule l'observation directe révèle les contraintes physiques et relationnelles effectives. »",
      },
      {
        id: "b",
        reponseTexte:
          "« Nous sommes tenus par le secret professionnel le plus strict. La visite de poste est la condition sine qua non de notre engagement : elle nous permet d'identifier les variabilités réelles, de vérifier la conformité des gestes et d'éviter un abandon de poste dès la première semaine. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Démonstration de la valeur ajoutée ergonomique : la visite de poste protège l'entreprise contre les coûts cachés d'une intégration ratée.",
        citationValls:
          "« L'intervention IOD déplace l'expertise : le psychologue analyse l'environnement physique et social pour calibrer l'accueil. »",
      },
      {
        id: "c",
        reponseTexte:
          "« Si vous refusez la visite, envoyez-nous simplement une vidéo tournée avec votre smartphone. »",
        points: 1,
        verdict: "moyen",
        justificationTheorique:
          "Palliatif insuffisant : une vidéo ne permet pas d'observer les ambiances physiques (bruit, chaleur) ni d'interroger les opérateurs en poste.",
        citationValls:
          "« L'observation in situ est irremplaçable pour saisir l'ambiance relationnelle et la culture d'équipe. »",
      },
    ],
  },
  {
    id: 4,
    objectionType: "La Période d'Intégration & le Suivi Bilatéral",
    drhReplique:
      "« Entendu pour le candidat. Mais une fois le contrat signé, je gère mon personnel en interne. Pourquoi tenez-vous tant à ce rendez-vous de suivi bilatéral à J+15 ? »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« Parce que nous devons justifier nos subventions auprès de l'État et de France Travail avec des fiches d'émargement. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Réduction administrative disqualifiante : cela fait passer l'intervention pour une contrainte bureaucratique inutile.",
        citationValls:
          "« L'évaluation de l'action IOD est clinique et qualitative, jamais purement comptable. »",
      },
      {
        id: "b",
        reponseTexte:
          "« Le suivi bilatéral à J+15 est un tiers garant : il permet au salarié d'exprimer ses doutes sans peur de sanction, et à votre chef d'équipe de recadrer les incompréhensions opératoires avant qu'elles ne se transforment en conflit de personnes. C'est l'assurance tous risques de votre embauche. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Définition canonique de la régulation bilatérale : l'intervenant IOD agit comme un médiateur neutre entre la logique productive et la logique subjective d'intégration.",
        citationValls:
          "« Le suivi bilatéral désamorce les stéréotypes naissants et permet d'ajuster en direct la régulation du travail. » (Castra & Valls)",
      },
      {
        id: "c",
        reponseTexte:
          "« Vous avez raison, si le chef d'équipe est bon, nous n'avons pas besoin d'intervenir. Appelez-nous seulement si ça se passe mal. »",
        points: 1,
        verdict: "moyen",
        justificationTheorique:
          "L'intervention 'pompière' en cas de crise arrive toujours trop tard. La méthode IOD impose un calendrier proactif ritualisé.",
        citationValls:
          "« Quand l'entreprise appelle parce que 'ça ne va pas', le rejet identitaire est déjà consommé. Le suivi préventif est capital. »",
      },
    ],
  },
];

export function SimulateurNegociationIOD() {
  const [currentEtapeIdx, setCurrentEtapeIdx] = useState(0);
  const [selectedChoixId, setSelectedChoixId] = useState<string | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [historyAnswers, setHistoryAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const etape = ETAPES_NEGOCIATION_IOD[currentEtapeIdx];

  const handleSelectChoix = (id: string) => {
    if (hasValidated) return;
    setSelectedChoixId(id);
    playClickSound();
    triggerHaptic();
  };

  const handleValidateAnswer = () => {
    if (!selectedChoixId) return;
    setHasValidated(true);
    const chosen = etape.choix.find((c) => c.id === selectedChoixId);
    if (chosen) {
      setTotalScore((s) => s + chosen.points);
      setHistoryAnswers((prev) => ({ ...prev, [etape.id]: chosen.id }));

      if (chosen.verdict === "correct") {
        playSuccessSound();
      } else {
        playReviewSound();
      }
      triggerHaptic();
    }
  };

  const handleNextStep = () => {
    playClickSound();
    triggerHaptic();
    if (currentEtapeIdx < ETAPES_NEGOCIATION_IOD.length - 1) {
      setCurrentEtapeIdx((i) => i + 1);
      setSelectedChoixId(null);
      setHasValidated(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    playClickSound();
    triggerHaptic();
    setCurrentEtapeIdx(0);
    setSelectedChoixId(null);
    setHasValidated(false);
    setTotalScore(0);
    setHistoryAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-orange-950/20 to-slate-900/70 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              <HeartHandshake className="h-3.5 w-3.5 text-amber-400" />
              <span>PST108 · Clinique du Dialogue &amp; Insertion</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Le Simulateur de Négociation IOD en Entreprise
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Incarnez le psychologue du travail intervenant selon la méthode de <b>Francis Valls</b> et <b>Denis Castra</b>. Négociez avec un employeur exigeant sans tri préalable, sur la base du travail réel.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Score IOD</span>
              <span className="text-lg font-mono font-extrabold text-amber-400">
                {totalScore} / 20
              </span>
            </div>
            <Award className="h-7 w-7 text-amber-400" />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                Étape {currentEtapeIdx + 1} / {ETAPES_NEGOCIATION_IOD.length}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {etape.objectionType}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Barème : 5 points par décision
            </span>
          </div>

          {/* DRH Speech Bubble */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 relative space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Building className="h-4 w-4" />
              <span>L&apos;Employeur (DRH d&apos;Entreprise) :</span>
            </div>
            <p className="text-sm font-medium text-slate-100 italic leading-relaxed">
              {etape.drhReplique}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Quelle est votre réplique de négociation IOD ?
            </span>

            <div className="space-y-2.5">
              {etape.choix.map((c) => {
                const isSelected = selectedChoixId === c.id;
                const isCorrect = hasValidated && c.verdict === "correct";
                const isWrong = hasValidated && isSelected && c.verdict !== "correct";

                return (
                  <button
                    key={c.id}
                    disabled={hasValidated}
                    onClick={() => handleSelectChoix(c.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                      isCorrect
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium"
                        : isWrong
                        ? "bg-rose-950/40 border-rose-500 text-rose-200"
                        : isSelected
                        ? "bg-amber-500/20 border-amber-400 text-white font-medium"
                        : "bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800/60"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold uppercase ${
                        isSelected
                          ? "bg-amber-600 border-amber-400 text-white"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {c.id}
                    </div>
                    <div className="space-y-1">
                      <p className="leading-snug">{c.reponseTexte}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation & Correction */}
          {!hasValidated ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedChoixId}
                onClick={handleValidateAnswer}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center gap-2 ${
                  selectedChoixId
                    ? "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer shadow-amber-950/50"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Confirmer ma réponse</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-3 border-t border-slate-800 animate-fadeIn">
              {/* Feedback box */}
              {(() => {
                const chosen = etape.choix.find((c) => c.id === selectedChoixId);
                const isWin = chosen?.verdict === "correct";

                return (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                      isWin
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : "bg-rose-950/30 border-rose-500/40 text-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {isWin ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>Réplique conforme à la méthode IOD (+5 points)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-rose-400" />
                          <span>Attention : piège d&apos;intervention (+{chosen?.points} point)</span>
                        </>
                      )}
                    </div>
                    <p>{chosen?.justificationTheorique}</p>

                    <div className="pt-2 border-t border-slate-700/40 text-slate-300 italic flex items-start gap-2">
                      <Quote className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span>{chosen?.citationValls}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/50 transition-all"
                >
                  <span>
                    {currentEtapeIdx < ETAPES_NEGOCIATION_IOD.length - 1
                      ? "Étape suivante"
                      : "Voir mon bilan IOD"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* End Screen */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-xl">
          <div className="inline-flex p-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Award className="h-12 w-12" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Bilan de Négociation IOD terminé !
            </h3>
            <p className="text-sm text-slate-300">
              Votre score final :{" "}
              <strong className="text-amber-400 font-mono text-xl">
                {totalScore} / 20
              </strong>
            </p>
          </div>

          <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 text-left space-y-2">
            <strong className="text-amber-300 block uppercase">
              Rappel théorique pour la copie de PST108 (Francis Valls) :
            </strong>
            <ul className="list-disc list-inside space-y-1">
              <li><b>Non-tri préalable :</b> l&apos;IOD ne trie pas les demandeurs d&apos;emploi mais agit sur les conditions d&apos;accueil de l&apos;entreprise.</li>
              <li><b>Analyse ergonomique du travail réel :</b> la visite de poste déconstruit les critères formels surdimensionnés du diplôme ou de l&apos;expérience.</li>
              <li><b>Médiation bilatérale :</b> le suivi à J+15 et J+30 sécurise les deux parties et prévient la réactivation des stéréotypes.</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Recommencer la simulation</span>
          </button>
        </div>
      )}
    </div>
  );
}
