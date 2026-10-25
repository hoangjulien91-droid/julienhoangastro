"use client";

import { useState } from "react";
import {
  Video,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Brain,
  Quote,
  Eye,
  Award,
  Film,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface DialogueTurn {
  id: number;
  phase: "simple" | "croisee" | "sosie";
  titrePhase: string;
  contexteVideo: string;
  verbatimOperateur: string;
  choixPsychologue: {
    id: "a" | "b" | "c";
    texte: string;
    points: number;
    verdict: "optimal" | "acceptable" | "inadapte";
    analyseClinique: string;
    conceptClot: string;
  }[];
}

const DIALOGUES_AUTOCONFRONTATION: DialogueTurn[] = [
  {
    id: 1,
    phase: "simple",
    titrePhase: "Étape 1 · Auto-Confrontation Simple (Face à sa propre trace)",
    contexteVideo:
      "Marc, conducteur de train avec 12 ans d'expérience, visionne la vidéo où on le voit ralentir très tôt à l'approche d'un aiguillage, bien avant le repère officiel prescrit.",
    verbatimOperateur:
      "Marc (regardant l'écran, un peu gêné) : « Là, vous voyez, je freine déjà. C'est pas dans le règlement, je sais que l'encadrement me reprocherait de perdre 40 secondes... mais je ne peux pas m'en empêcher. »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« Pourquoi ne respectez-vous pas le règlement ? Vous avez peur d'un déraillement ou c'est un manque de confiance en vous ? »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Erreur classique : la question 'Pourquoi' pousse le salarié à se justifier ou à psychologiser sa peur. Le psychologue se positionne en censeur ou en inspecteur.",
        conceptClot:
          "L'intervenant ne doit jamais demander 'pourquoi' (culpabilisation), mais 'comment' et 'qu'est-ce qui se passe ici'.",
      },
      {
        id: "b",
        texte:
          "« Qu'est-ce qui se joue pour vous à cet endroit précis de la voie pour que votre main anticipe le geste de freinage ? »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Relance clinique parfaite : elle déplace le regard de la faute vers l'expérience incorporée et les repères sensoriels invisibles du métier.",
        conceptClot:
          "L'auto-confrontation simple transforme l'activité réalisée en un objet d'observation pour le sujet lui-même (Vygotski/Clot).",
      },
      {
        id: "c",
        texte:
          "« C'est très intéressant, je note dans mon rapport que le règlement prescrit est inadapté à ce virage. »",
        points: 1,
        verdict: "acceptable",
        analyseClinique:
          "L'intervenant conclut à la place du travailleur et transforme prématurément une intuition en revendication sans laisser Marc élaborer son geste.",
        conceptClot:
          "Le psychologue n'est pas un expert du contenu : il est le garant du cadre d'élaboration de la pensée.",
      },
    ],
  },
  {
    id: 2,
    phase: "croisee",
    titrePhase: "Étape 2 · Auto-Confrontation Croisée (La controverse de métier)",
    contexteVideo:
      "Marc et son collègue Julien (conducteur plus jeune, 3 ans d'ancienneté) regardent ensemble la même séquence vidéo. Julien réagit vivement.",
    verbatimOperateur:
      "Julien : « Mais Marc, pourquoi tu freines si tôt ? Moi je garde la traction jusqu'au jalon jaune ! Si on freine tous comme toi, on flingue la grille horaire et les usagers râlent. »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« Julien, calmez-vous, Marc a plus d'expérience que vous, respectez son ancienneté. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Étuvage de la controverse : le psychologue fait appel à l'autorité statutaire et éteint le débat technique qui est pourtant le moteur du développement du genre professionnel.",
        conceptClot:
          "La dispute professionnelle réglée est la condition vitale de la santé du collectif (le 'genre'). La policer, c'est tuer la pensée.",
      },
      {
        id: "b",
        texte:
          "« Marc, que réponds-tu à Julien sur cette tension entre la grille horaire et ce que tu ressens dans la motrice à ce moment-là ? Et toi Julien, as-tu déjà conduit sur cette voie par temps de pluie ? »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Relance dialectique idéale : l'intervenant maintient la controverse ouverte, convoque les conditions réelles (la pluie, les rails gras) et invite à délibérer sur la qualité du travail.",
        conceptClot:
          "L'auto-confrontation croisée met le style singulier de chacun à l'épreuve du genre professionnel partagé.",
      },
      {
        id: "c",
        texte:
          "« On voit bien que vous n'êtes pas d'accord. Faisons un vote pour savoir qui a raison. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Absurdité méthodologique : la clinique de l'activité ne cherche pas un consensus mou ou un vote majoritaire, mais la richesse des controverses de métier.",
        conceptClot:
          "Le collectif n'est pas unanime : c'est un ensemble d'arbitrages contradictoires vivants.",
      },
    ],
  },
  {
    id: 3,
    phase: "sosie",
    titrePhase: "Étape 3 · L'Instruction au Sosie (Transmission de l'indicible)",
    contexteVideo:
      "Exercice d'instruction au sosie (Oddone) avec une infirmière expérimentée en réanimation pédiatrique préparant un cathéter complexe.",
    verbatimOperateur:
      "L'infirmière : « Comment je fais ? Ben, je pique dans la veine, c'est tout, c'est l'habitude, ça ne s'explique pas... »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« D'accord, si ça ne s'explique pas, je vais me baser sur le manuel de procédure de la Haute Autorité de Santé. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Renoncement total à l'explicitation des savoirs tacites : le psychologue retombe dans la tâche prescrite désincarnée.",
        conceptClot:
          "L'instruction au sosie a justement pour vocation de rendre dicible l'indicible du travail réel.",
      },
      {
        id: "b",
        texte:
          "« Imagine que demain je suis ton sosie parfait. J'ai ton visage, ta blouse, mais je n'y connais rien. À quel détail de la peau du nouveau-né, à quelle résistance sous tes doigts dois-je prêter attention pour que personne dans le service ne découvre la supercherie ? »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Formulation canonique de l'instruction au sosie d'Ivar Oddone : la fiction du remplacement oblige à verbaliser les micromouvements, les sensations tactiles et les ruses de métier.",
        conceptClot:
          "« Le sosie oblige le sujet à devenir l'observateur instruit de sa propre activité. » (Ivar Oddone, 1981)",
      },
      {
        id: "c",
        texte:
          "« Vous devez faire un effort de mémoire, c'est important pour notre recherche universitaire. »",
        points: 1,
        verdict: "inadapte",
        analyseClinique:
          "Pression académique inutile qui bloque l'élaboration et renforce la position de défense de l'opératrice.",
        conceptClot:
          "La méthode doit être au service du pouvoir d'agir des travailleurs, pas de la publication du chercheur.",
      },
    ],
  },
  {
    id: 4,
    phase: "croisee",
    titrePhase: "Étape 4 · Du Dialogue au Pouvoir d'Agir (Restitution collective)",
    contexteVideo:
      "La séance d'auto-confrontation se termine. Les opérateurs ont mis au jour que la consigne prescrite les oblige à tricher pour tenir la qualité.",
    verbatimOperateur:
      "Marc et Julien : « Bon, maintenant qu'on a discuté entre nous et qu'on est d'accord sur le fait que la procédure est inapplicable, vous allez voir la direction pour leur dire de changer la règle ? »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« Oui, je vais voir la direction demain matin et je leur impose vos conclusions au nom de la psychologie du travail. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Posture de substitut héroïque : le psychologue confisque le pouvoir d'agir des salariés en devenant leur porte-parole providentiel.",
        conceptClot:
          "Le psychologue ne se substitue jamais aux collectifs ni aux partenaires sociaux.",
      },
      {
        id: "b",
        texte:
          "« Non, mon rôle s'arrête ici, je suis clinicien, ce que vous en faites avec votre direction ne me regarde pas. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Cynisme clinique d'abandon : susciter des controverses sans organiser leur résonance dans l'organisation crée de la frustration et de l'amertume.",
        conceptClot:
          "L'intervention doit créer des arènes de délibération durable dans l'entreprise pour transformer le travail.",
      },
      {
        id: "c",
        texte:
          "« Nous allons préparer ensemble la restitution. Vous présenterez vous-mêmes à la direction les extraits vidéo choisis et les dilemmes du métier, pour ouvrir une négociation paritaire sur les critères du travail bien fait. Je serai là comme garant de la méthode. »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Dénouement magistral conforme à Yves Clot : les professionnels deviennent les auteurs et les acteurs de la transformation de leur propre travail.",
        conceptClot:
          "Le pouvoir d'agir restauré : le travailleur retrouve sa capacité à agir sur son milieu et sur son organisation (Canguilhem/Clot).",
      },
    ],
  },
];

export function SimulateurAutoconfrontation106() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [selectedChoixId, setSelectedChoixId] = useState<string | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const turn = DIALOGUES_AUTOCONFRONTATION[currentTurnIdx];

  const handleSelectChoix = (id: "a" | "b" | "c") => {
    if (hasValidated) return;
    setSelectedChoixId(id);
    playClickSound();
    triggerHaptic();
  };

  const handleValidate = () => {
    if (!selectedChoixId) return;
    setHasValidated(true);
    const chosen = turn.choixPsychologue.find((c) => c.id === selectedChoixId);
    if (chosen) {
      setScore((s) => s + chosen.points);
      if (chosen.verdict === "optimal") {
        playSuccessSound();
      } else {
        playReviewSound();
      }
      triggerHaptic();
    }
  };

  const handleNextTurn = () => {
    playClickSound();
    triggerHaptic();
    if (currentTurnIdx < DIALOGUES_AUTOCONFRONTATION.length - 1) {
      setCurrentTurnIdx((i) => i + 1);
      setSelectedChoixId(null);
      setHasValidated(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    playClickSound();
    triggerHaptic();
    setCurrentTurnIdx(0);
    setSelectedChoixId(null);
    setHasValidated(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/40 via-emerald-950/20 to-slate-900/70 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 border border-teal-500/30">
              <Film className="h-3.5 w-3.5 text-teal-400" />
              <span>PST106 · Méthodologie d&apos;Intervention Clinique</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Simulateur d&apos;Autoconfrontation Croisée &amp; Sosie
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Incarnez le clinicien de l&apos;activité face aux opérateurs. Maîtrisez les relances clés pour animer la controverse de métier, faire émerger les savoirs tacites et restaurer le pouvoir d&apos;agir.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Maîtrise Posture</span>
              <span className="text-lg font-mono font-extrabold text-teal-400">
                {score} / 20
              </span>
            </div>
            <Award className="h-7 w-7 text-teal-400" />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase">
                {turn.phase}
              </span>
              <span className="text-xs font-bold text-white">
                {turn.titrePhase}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Étape {currentTurnIdx + 1} / {DIALOGUES_AUTOCONFRONTATION.length}
            </span>
          </div>

          {/* Video Scene Card */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <Video className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                  Scène Vidéo Observée en Séance :
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {turn.contexteVideo}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-800/40 relative space-y-1">
              <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs">
                <Quote className="h-4 w-4" />
                <span>Parole de l&apos;opérateur en direct :</span>
              </div>
              <p className="text-sm text-teal-100 font-medium italic">
                {turn.verbatimOperateur}
              </p>
            </div>
          </div>

          {/* Psychologist choices */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Quelle est votre relance clinique en tant que psychologue ?
            </span>

            <div className="space-y-2.5">
              {turn.choixPsychologue.map((c) => {
                const isSelected = selectedChoixId === c.id;
                const isOptimal = hasValidated && c.verdict === "optimal";
                const isInadapte = hasValidated && isSelected && c.verdict !== "optimal";

                return (
                  <button
                    key={c.id}
                    disabled={hasValidated}
                    onClick={() => handleSelectChoix(c.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                      isOptimal
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium"
                        : isInadapte
                        ? "bg-rose-950/40 border-rose-500 text-rose-200"
                        : isSelected
                        ? "bg-teal-500/20 border-teal-400 text-white font-medium"
                        : "bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800/60"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold uppercase ${
                        isSelected
                          ? "bg-teal-600 border-teal-400 text-white"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {c.id}
                    </div>
                    <div className="space-y-1">
                      <p className="leading-snug">{c.texte}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation & Feedback */}
          {!hasValidated ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedChoixId}
                onClick={handleValidate}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center gap-2 ${
                  selectedChoixId
                    ? "bg-teal-600 hover:bg-teal-500 text-white cursor-pointer shadow-teal-950/50"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Valider la relance</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-3 border-t border-slate-800 animate-fadeIn text-xs leading-relaxed">
              {(() => {
                const chosen = turn.choixPsychologue.find((c) => c.id === selectedChoixId);
                const isWin = chosen?.verdict === "optimal";

                return (
                  <div
                    className={`p-4 rounded-xl border space-y-2 ${
                      isWin
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : "bg-amber-950/30 border-amber-500/40 text-amber-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {isWin ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>Posture clinique exemplaire (+5 points)</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="h-4 w-4 text-amber-400" />
                          <span>Posture discutable (+{chosen?.points} pts)</span>
                        </>
                      )}
                    </div>
                    <p>{chosen?.analyseClinique}</p>

                    <div className="pt-2 border-t border-slate-700/40 text-slate-200 font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                      <span>Règle clinique (Yves Clot) : {chosen?.conceptClot}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  onClick={handleNextTurn}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-teal-950/50 transition-all cursor-pointer"
                >
                  <span>
                    {currentTurnIdx < DIALOGUES_AUTOCONFRONTATION.length - 1
                      ? "Étape suivante"
                      : "Bilan méthodologique"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final Assessment */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-xl">
          <div className="inline-flex p-4 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Award className="h-12 w-12" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Simulation d&apos;Autoconfrontation Terminée !
            </h3>
            <p className="text-sm text-slate-300">
              Score de posture clinique :{" "}
              <strong className="text-teal-400 font-mono text-xl">
                {score} / 20
              </strong>
            </p>
          </div>

          <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 text-left space-y-2">
            <strong className="text-teal-300 block uppercase">
              Les 4 lois d&apos;airain de la clinique de l&apos;activité (Yves Clot) :
            </strong>
            <ul className="list-disc list-inside space-y-1">
              <li><b>Ne jamais demander « Pourquoi » :</b> traquer le « comment » pour faire émerger l&apos;analyse du geste sans culpabilité.</li>
              <li><b>Nourrir la controverse :</b> le conflit de métier entre pairs est le poumon du genre professionnel.</li>
              <li><b>Le sosie (Oddone) :</b> fictivité totale pour obliger le travailleur à devenir instructeur de son travail.</li>
              <li><b>Restituer le pouvoir d&apos;agir :</b> les opérateurs doivent présenter eux-mêmes leurs arbitrages à la direction.</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Recommencer l&apos;intervention</span>
          </button>
        </div>
      )}
    </div>
  );
}
