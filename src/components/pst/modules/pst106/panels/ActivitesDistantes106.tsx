"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Calendar,
  Sparkles,
  Copy,
  ChevronDown,
  Layers,
  ArrowRight,
  ShieldAlert,
  Brain,
  Quote,
  GraduationCap,
} from "lucide-react";
import {
  AD1_TAYLORISME_QUESTIONS,
  PHILOSOPHY_WORK_SUMMARY,
  MASON_EXERCISE_MODEL_ANSWER,
  HERZBERG_TWO_FACTOR_MODEL,
  PACAUD_TELEPHONISTES_SUMMARY,
  PST106_UNIFIED_ADS,
} from "@/lib/pst/data/pst106-ad";
import { AdInteractiveWorkspace } from "@/components/pst/modules/shared/panels/AdInteractiveWorkspace";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

export function ActivitesDistantes106() {
  const [activeAd, setActiveAd] = useState<"workspace" | "cours1" | "ad1" | "ad2" | "ad3">("workspace");
  const [ad1SubTab, setAd1SubTab] = useState<"macon" | "qcm" | "philo">("macon");

  // État du QCM AD 1
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAllCorrections, setShowAllCorrections] = useState(false);

  // État de copie
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  function handleSelectAnswer(qId: number, optionLabel: string) {
    playClickSound();
    setUserAnswers((prev) => ({ ...prev, [qId]: optionLabel }));
  }

  function handleCopyForForum(text: string, sectionKey: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(null), 3000);
      playSuccessSound();
    }
  }

  // Calcul score QCM
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = AD1_TAYLORISME_QUESTIONS.filter(
    (q) => userAnswers[q.id] === q.correct,
  ).length;

  return (
    <div className="space-y-6">
      {/* ── BANDEAU OFFICIEL SÉANCE CNAM ─────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 border border-amber-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5">
              <Calendar className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Séance du 23 octobre 2026</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30">
              Corrigé collectif : 28 octobre 2026 (1ère heure)
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Enseignante : Mme LAGABRIELLE (PST106)
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
            Activités Distantes (AD) · Préparation &amp; Analyse Critique du Travail
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
            « Exceptionnellement, au regard de l&apos;annulation du cours, les activités distantes vont être utiles pour préparer le cours en amont. La 1ère heure de la séance du 28 octobre sera consacrée aux corrigés collectifs. Vous pouvez déposer vos travaux sur le forum si vous le souhaitez. »
          </p>
        </div>
      </div>

      {/* ── SÉLECTEUR DES SÉANCES & ACTIVITÉS DISTANTES ─────────────────── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("workspace");
          }}
          className={`flex-1 min-w-[210px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "workspace"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="size-3.5 text-amber-300" />
          <span>Espace Rédaction Interactif ✦</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("cours1");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "cours1"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <GraduationCap className="size-3.5" />
          <span>Cours 1 · Cadre &amp; Conceptions</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad1");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad1"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="size-3.5" />
          <span>AD 1 · Taylorisme &amp; Gilbreth</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad2");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad2"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Brain className="size-3.5" />
          <span>AD 2 · F. Herzberg (Motivations)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad3");
          }}
          className={`flex-1 min-w-[190px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad3"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="size-3.5" />
          <span>AD 3 · S. Pacaud (Téléphonistes)</span>
        </button>
      </div>

      {/* ── ESPACE RÉDACTIONNEL INTERACTIF (AD 1, 2, 3) ────────────────── */}
      {activeAd === "workspace" && (
        <div className="animate-fadeIn">
          <AdInteractiveWorkspace
            ads={PST106_UNIFIED_ADS}
            moduleTheme="emerald"
          />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU COURS 1 : CADRE THÉORIQUE & CONCEPTIONS (PR. LAGABRIELLE) ─ */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeAd === "cours1" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Card Présentation & Alliance de travail */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Enseignante responsable : Pr. Christine LAGABRIELLE (Professeure émérite, Le Travail Humain, AIPTLF)
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
                  Cours 1 : Les Fondements du Travail &amp; Cartographie de la Discipline
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopyForForum(
                    `PST106 — COURS 1 : SYNTHÈSE & CONCEPTS CLÉS (Pr. LAGABRIELLE)\n\n1. Règle d'or : « Nos outils à nous, ce sont les concepts. Le maçon a sa truelle, le psychologue ses concepts scientifiques. »\n2. Définition du travail (Lévy-Leboyer) : Effort, Orientation vers un but, Contraintes (sociales, affectives avec Warr, éthiques/culturelles).\n3. Hannah Arendt : Labor (servitude vitale) vs Work (œuvre durable de l'artisan) vs Action (parole et débat politique citoyen).\n4. Henri Wallon : Activité forcée en décalage avec le jeu spontané des fonctions physiques et mentales.\n5. Marie Jahoda (Marienthal) : Les 5 fonctions latentes indispensables à la santé psychique (temps, liens sociaux, buts collectifs, statut, activité régulière).\n6. Cartographie épistémologique : Psychologie du travail (englobante) ➔ Clinique du travail (travail comme opérateur central) ➔ Psychodynamique (Dejours) vs Clinique de l'activité (Clot).\n7. Enquête ASH : Le psychologue ne doit jamais avoir de préjugés sur les métiers. L'analyse clinique révèle une haute technicité chimique d'asepsie et un rôle relationnel vital d'écoute.`,
                    "cours1",
                  )
                }
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3" />
                <span>{copiedSection === "cours1" ? "Copié !" : "Copier la fiche de cours"}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200 space-y-1 font-serif">
              <p className="font-bold m-0 flex items-center gap-1.5">
                <Quote className="size-3 text-amber-600" />
                <span>La règle d&apos;or pour réussir l&apos;examen (11 février 2027) :</span>
              </p>
              <p className="m-0 italic">
                « Nos outils à nous, ce sont les concepts. Le maçon a sa truelle, l&apos;informaticien son ordinateur. Nous, psychologues, nous avons des concepts : pas des opinions, pas des idées vagues, mais des concepts scientifiques forgés par des recherches rigoureuses. »
              </p>
            </div>
          </div>

          {/* Grille 2 colonnes : 1. Niveaux & Critères | 2. Arendt & Wallon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 1. Les 3 Niveaux & Critères de Lévy-Leboyer */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-1.5 text-amber-700 dark:text-amber-400">
                1. Les 3 Niveaux d&apos;Énonciation &amp; Définition
              </h5>
              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <b>Le FAIRE (Processus) :</b> ce que le sujet réalise concrètement (tâches, gestes, opérations).
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <b>L&apos;ÊTRE (Statut) :</b> la place symbolique occupée dans la hiérarchie sociale et le regard d&apos;autrui.
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <b>L&apos;AVOIR (Résultat) :</b> l&apos;œuvre achevée produite pour le collectif.
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pt-1">
                <b>Les 3 critères de Lévy-Leboyer :</b> 1. <b>Effort</b> (énergie, attention) · 2. <b>Orientation vers un but</b> (tâche prescrite) · 3. <b>Contraintes</b> (internes sociales, externes affectives/instrumentales, éthiques et religieuses).
              </p>
            </div>

            {/* 2. Hannah Arendt & Henri Wallon */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-1.5 text-indigo-700 dark:text-indigo-400">
                2. Servitude vs Émancipation (Arendt &amp; Wallon)
              </h5>
              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60">
                  <b>Hannah Arendt (1958) :</b>
                  <ul className="pl-3.5 m-0 mt-0.5 space-y-0.5 list-disc text-[11px]">
                    <li><b>Labor (Travail) :</b> nécessité biologique cyclique, condition animale servile.</li>
                    <li><b>Work (Œuvre) :</b> fabrication d&apos;objets durables par l&apos;artisan (*l&apos;œuvrier*).</li>
                    <li><b>Action (Action) :</b> délibération, parole, controverse et citoyenneté politique dans la cité.</li>
                  </ul>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <b>Henri Wallon :</b> Le travail est une <b>« activité forcée »</b> dont l&apos;objet demeure étranger aux besoins spontanés, imposant un décalage avec le jeu physique et mental.
                </div>
              </div>
            </div>
          </div>

          {/* Marie Jahoda & Les 5 Fonctions Latentes */}
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h5 className="font-bold text-slate-900 dark:text-white m-0 uppercase tracking-wide text-amber-700 dark:text-amber-400">
                3. Marie Jahoda &amp; L&apos;Enquête de Marienthal (1933/1937)
              </h5>
              <span className="text-[10px] font-mono font-bold text-slate-500">
                Fonction manifeste vs 5 fonctions latentes
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 m-0 font-serif leading-relaxed">
              Le salaire n&apos;est que la <b>fonction manifeste</b>. Le chômage détruit le sujet parce qu&apos;il le prive des <b>5 fonctions latentes indispensables à la santé psychique</b> :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <b className="text-amber-900 dark:text-amber-200 block mb-0.5">1. Temps</b>
                <span>Structure la journée et la semaine, évitant l&apos;angoisse du vide.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <b className="text-amber-900 dark:text-amber-200 block mb-0.5">2. Liens</b>
                <span>Procure des interactions sociales hors du cercle familial restreint.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <b className="text-amber-900 dark:text-amber-200 block mb-0.5">3. Collectif</b>
                <span>Insère le sujet dans un dessein qui dépasse son existence individuelle.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <b className="text-amber-900 dark:text-amber-200 block mb-0.5">4. Statut</b>
                <span>Confère une identité, un sentiment d&apos;utilité et le respect d&apos;autrui.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <b className="text-amber-900 dark:text-amber-200 block mb-0.5">5. Énergie</b>
                <span>Canalise et mobilise l&apos;énergie physique et cognitive quotidienne.</span>
              </div>
            </div>
          </div>

          {/* Grille : Cycles de vie (Super vs Schlossberg) & Hofstede */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Cycles de vie & carrières */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
                4. Carrières : Stades Linéaires vs Crises &amp; Transitions
              </h5>
              <p className="text-slate-600 dark:text-slate-300 m-0">
                <b>Donald Super (1957) :</b> les 4 stades sur des rails linéaires (Exploration 15–24, Établissement 25–44, Maintien 45–64, Désengagement 65+).
              </p>
              <p className="text-slate-600 dark:text-slate-300 m-0">
                <b>Nancy Schlossberg :</b> les carrières contemporaines sont éclatées, scandées par des ruptures technologiques (IA), des chocs de précarité et des transitions qui imposent de réexplorer à tout âge.
              </p>
            </div>

            {/* Dimensions culturelles d'Hofstede */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
                5. Geert Hofstede : Les 4 Dimensions Culturelles
              </h5>
              <ul className="pl-3.5 m-0 space-y-0.5 list-disc text-slate-600 dark:text-slate-300 text-[11px]">
                <li><b>Individualisme vs Collectivisme (IDV)</b></li>
                <li><b>Distance hiérarchique (PDI)</b></li>
                <li><b>Contrôle de l&apos;incertitude (UAI)</b></li>
                <li><b>Masculinité vs Féminité (MAS)</b></li>
              </ul>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 m-0 font-medium">
                💡 <b>Profil France :</b> forte distance hiérarchique, fort individualisme, fort contrôle de l&apos;incertitude et faible masculinité (ouverture des orientations).
              </p>
            </div>
          </div>

          {/* Cartographie de la Discipline & Clinique du Travail */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/25 space-y-3 text-xs">
            <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide text-indigo-900 dark:text-indigo-200">
              6. Cartographie Épistémologique : Qu&apos;est-ce que la Clinique du Travail ?
            </h5>
            <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-indigo-200/60 dark:border-indigo-800/60 space-y-1.5 font-serif">
              <p className="m-0 font-bold text-slate-900 dark:text-white">
                Le travail n&apos;est pas un simple terrain d&apos;application : c&apos;est un opérateur central de la psychologie humaine.
              </p>
              <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                La clinique du travail ne consiste pas à plaquer la psychanalyse sur l&apos;entreprise. Elle étudie les rapports entre l&apos;<b>activité réelle</b> et la <b>subjectivité</b>, et s&apos;articule en deux écoles majeures :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] font-sans">
                <div className="p-2 rounded bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700">
                  <b className="text-indigo-700 dark:text-indigo-300">Psychodynamique du Travail (C. Dejours) :</b>
                  <p className="m-0 mt-0.5">Analyse du couple plaisir/souffrance, des stratégies défensives collectives et de la reconnaissance.</p>
                </div>
                <div className="p-2 rounded bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-purple-700">
                  <b className="text-purple-700 dark:text-purple-300">Clinique de l&apos;Activité (Y. Clot / CRTD) :</b>
                  <p className="m-0 mt-0.5">Analyse du réel de l&apos;activité, du développement du pouvoir d&apos;agir, du genre professionnel et du style.</p>
                </div>
              </div>
            </div>

            {/* Anecdote des ASH */}
            <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 text-[11px] space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 block">
                Exemple clinique de Pr. Lagabrielle : L&apos;enquête auprès des ASH (Agents des Services Hospitaliers)
              </span>
              <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                Contre le préjugé positiviste qui juge le métier d&apos;ASH dévalorisé, l&apos;analyse clinique montre : 1. Une haute technicité chimique de dosage pour empêcher les maladies nosocomiales vitale pour les chirurgiens · 2. Une fonction d&apos;écoute humaine irremplaçable où les malades osent confier leurs angoisses intimes de mort et d&apos;isolement.
              </p>
            </div>
          </div>
        </div>
      )}
      {activeAd === "ad1" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Sous-onglets AD 1 */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setAd1SubTab("macon")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                ad1SubTab === "macon"
                  ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              1. Exercice des Maçons (Gilbreth)
            </button>
            <button
              type="button"
              onClick={() => setAd1SubTab("qcm")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                ad1SubTab === "qcm"
                  ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              2. QCM de Compréhension (25 Questions)
            </button>
            <button
              type="button"
              onClick={() => setAd1SubTab("philo")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                ad1SubTab === "philo"
                  ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              3. Fiche « Le travail selon... » (8 Philosophes)
            </button>
          </div>

          {/* 1. EXERCICE DES MAÇONS */}
          {ad1SubTab === "macon" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white m-0">
                    Étude de cas : La rationalisation du métier de maçon (Frank B. Gilbreth)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyForForum(
                        `${MASON_EXERCISE_MODEL_ANSWER.title}\n\n${MASON_EXERCISE_MODEL_ANSWER.q1_analysis}\n\n${MASON_EXERCISE_MODEL_ANSWER.q2_alternative_org}\n\n${MASON_EXERCISE_MODEL_ANSWER.q3_rational_procedure}`,
                        "macon",
                      )
                    }
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="size-3" />
                    <span>{copiedSection === "macon" ? "Copié !" : "Copier pour le forum"}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                      Question 1 : À partir du relevé des gestes observés, déterminez les gestes inutiles et ceux strictement nécessaires.
                    </p>
                    <p className="whitespace-pre-line font-serif">
                      {MASON_EXERCISE_MODEL_ANSWER.q1_analysis}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                      Question 2 : Proposez une autre organisation du travail pour simplifier les tâches, réduire la fatigue et augmenter la productivité.
                    </p>
                    <p className="whitespace-pre-line font-serif">
                      {MASON_EXERCISE_MODEL_ANSWER.q2_alternative_org}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                      Question 3 : Proposez la meilleure façon de monter le mur en rationalisant le travail du maçon (The One Best Way).
                    </p>
                    <p className="whitespace-pre-line font-serif">
                      {MASON_EXERCISE_MODEL_ANSWER.q3_rational_procedure}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. LE QCM INTERACTIF (25 QUESTIONS) */}
          {ad1SubTab === "qcm" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex-wrap">
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Score : {correctCount} / {AD1_TAYLORISME_QUESTIONS.length}
                  </span>
                  <span className="text-slate-500 ml-2">
                    ({answeredCount} questions répondues)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAllCorrections((v) => !v)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    {showAllCorrections ? "Masquer les corrigés" : "Afficher tous les corrigés"}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {AD1_TAYLORISME_QUESTIONS.map((q) => {
                  const userAns = userAnswers[q.id];
                  const isAnswered = !!userAns;
                  const isCorrect = userAns === q.correct;
                  const showCorr = showAllCorrections || isAnswered;

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border transition-all text-xs space-y-2.5 ${
                        isAnswered
                          ? isCorrect
                            ? "bg-emerald-500/5 border-emerald-500/30"
                            : "bg-rose-500/5 border-rose-500/30"
                          : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Question {q.id}. {q.question}
                        </span>
                        {isAnswered && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              isCorrect
                                ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                                : "bg-rose-500/20 text-rose-800 dark:text-rose-300"
                            }`}
                          >
                            {isCorrect ? "Correct ✓" : "Erreur ✗"}
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-1.5">
                        {q.options.map((opt) => {
                          const isSelected = userAns === opt.label;
                          const isTheCorrectOpt = opt.label === q.correct;

                          let btnStyle =
                            "bg-slate-50 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/70 hover:bg-slate-100 text-slate-800 dark:text-slate-200";
                          if (showCorr) {
                            if (isTheCorrectOpt) {
                              btnStyle =
                                "bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                            } else if (isSelected && !isTheCorrectOpt) {
                              btnStyle =
                                "bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200";
                            }
                          } else if (isSelected) {
                            btnStyle = "bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-bold";
                          }

                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => handleSelectAnswer(q.id, opt.label)}
                              className={`w-full text-left p-2 rounded-lg border text-xs transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                            >
                              <span className="font-mono font-bold shrink-0">
                                [{opt.label}]
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explication & Clé CNAM */}
                      {showCorr && (
                        <div className="p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] leading-relaxed space-y-1">
                          <p className="m-0 text-slate-700 dark:text-slate-300">
                            <b>Corrigé :</b> {q.explanation}
                          </p>
                          <span className="inline-block text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                            Concept 18/20 : {q.keyConcept}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. FICHE « LE TRAVAIL SELON... » */}
          {ad1SubTab === "philo" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs text-amber-900 dark:text-amber-200 font-semibold">
                  Synthèse complète des 8 penseurs fondamentaux du travail (document ODT remis par Mme Lagabrielle)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyForForum(
                      PHILOSOPHY_WORK_SUMMARY.map(
                        (p) => `${p.author} — ${p.title}\nThèse : ${p.coreIdea}\nCitation : ${p.citation}\nUsage PST106 : ${p.relevancePst}`,
                      ).join("\n\n---\n\n"),
                      "philo",
                    )
                  }
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="size-3" />
                  <span>{copiedSection === "philo" ? "Copié !" : "Copier la fiche"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PHILOSOPHY_WORK_SUMMARY.map((p) => (
                  <div
                    key={p.author}
                    className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <h4 className="font-bold text-slate-900 dark:text-white m-0">
                        {p.author}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Philosophie du travail
                      </span>
                    </div>

                    <p className="font-semibold text-amber-700 dark:text-amber-400 m-0">
                      {p.title}
                    </p>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
                      {p.coreIdea}
                    </p>

                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[11px] italic text-slate-700 dark:text-slate-300">
                      <Quote className="size-3 text-amber-500 inline mr-1" />
                      {p.citation}
                    </div>

                    <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                      💡 <b>Valorisation Cnam :</b> {p.relevancePst}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU AD 2 : FREDERICK HERZBERG (MOTIVATIONS PERDUES) ───────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeAd === "ad2" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Fiche introductive Herzberg */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Article classique HBR (1968 / 1977)
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                  À la recherche des motivations perdues (One more time: How do you motivate employees?)
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopyForForum(
                    `FREDERICK HERZBERG — THÉORIE BI-FACTORIELLE\n\n1. Critique du KITA : Le bâton et la carotte ne motivent pas l'employé, ils ne font que mettre le chien en mouvement.\n2. Facteurs d'Hygiène (Insatisfaction) : Salaire, conditions, politique, hiérarchie.\n3. Facteurs de Motivation (Satisfaction) : Accomplissement, responsabilité, travail en lui-même.\n4. Enrichissement vertical (autonomie réelle) vs élargissement horizontal (additionner zéro plus zéro).`,
                    "herzberg",
                  )
                }
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3" />
                <span>{copiedSection === "herzberg" ? "Copié !" : "Copier la synthèse"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
              Herzberg rompt avec la vision linéaire de la motivation. L&apos;inverse de l&apos;insatisfaction n&apos;est pas la satisfaction, mais l&apos;<b>absence d&apos;insatisfaction</b>. Soigner les conditions de travail ou augmenter le salaire (facteurs d&apos;hygiène) empêche les salariés de se plaindre, mais ne les motive jamais durablement à travailler avec cœur. Seul l&apos;<b>enrichissement vertical des tâches</b> crée une satisfaction réelle.
            </p>
          </div>

          {/* Tableau comparatif des Facteurs d'Hygiène vs Motivation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facteurs d'Hygiène */}
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <h5 className="font-bold text-xs text-rose-900 dark:text-rose-200 m-0 uppercase tracking-wide">
                  Facteurs d&apos;Hygiène (Extrinsèques)
                </h5>
                <span className="text-[10px] font-mono text-rose-700 dark:text-rose-300 font-bold">
                  Évitent la douleur
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0">
                Liés au <b>milieu</b> et à l&apos;environnement. S&apos;ils manquent ➔ forte insatisfaction. S&apos;ils sont optimaux ➔ neutralité (non-insatisfaction).
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 m-0 pl-0 list-none">
                {HERZBERG_TWO_FACTOR_MODEL.hygieneFactors.map((f) => (
                  <li key={f.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-rose-500/10">
                    <span>{f.name}</span>
                    <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                      {f.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facteurs de Motivation */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 m-0 uppercase tracking-wide">
                  Facteurs Moteurs (Intrinsèques)
                </h5>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                  Grandissement psychologique
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0">
                Liés au <b>contenu</b> du travail lui-même. Ce sont les SEULS générateurs d&apos;engagement et de performance durable.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 m-0 pl-0 list-none">
                {HERZBERG_TWO_FACTOR_MODEL.motivationFactors.map((f) => (
                  <li key={f.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-emerald-500/10">
                    <span>{f.name}</span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {f.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Principes de l'enrichissement vertical */}
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
            <h5 className="font-bold text-slate-900 dark:text-white m-0">
              Les 5 Principes de l&apos;Accroissement Vertical (vs Élargissement Horizontal)
            </h5>
            <div className="space-y-2">
              {HERZBERG_TWO_FACTOR_MODEL.enrichmentPrinciples.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      {p.action}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 m-0 mt-0.5">
                      {p.principe}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                    Principe {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU AD 3 : SUZANNE PACAUD (LES TÉLÉPHONISTES SNCF) ───────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeAd === "ad3" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Fiche introductive Pacaud */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Revue Le Travail Humain · Laboratoire de Psychotechnique SNCF
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                  Recherches sur le travail des téléphonistes : étude psychologique d&apos;un métier (Suzanne Pacaud)
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopyForForum(
                    `SUZANNE PACAUD — RECHERCHES SUR LE TRAVAIL DES TÉLÉPHONISTES (1953)\n\n1. Rupture épistémologique : Pacaud ne part pas de la marche normale du travail, mais montre que le travail réel consiste à vaincre 14 difficultés saillantes permanentes.\n2. Écart Prescrit vs Réel : Le tableau des 15 fautes édicté par la direction est intenable. Les fautes sont des régulations de survie opératoires.\n3. Réfutation de la prédisposition aux accidents et invention de la « plasticité fonctionnelle » au 41 rue Gay-Lussac.`,
                    "pacaud",
                  )
                }
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3" />
                <span>{copiedSection === "pacaud" ? "Copié !" : "Copier la synthèse"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
              {PACAUD_TELEPHONISTES_SUMMARY.ruptureEpistemologique}
            </p>
          </div>

          {/* Les 14 difficultés du travail réel */}
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h5 className="font-bold text-xs text-slate-900 dark:text-white m-0">
                Les 14 Difficultés Saillantes de l&apos;Activité Réelle observées in situ
              </h5>
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                Contre le mythe du travail simple
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PACAUD_TELEPHONISTES_SUMMARY.quatorzeDifficultes.map((d, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2 text-slate-700 dark:text-slate-300"
                >
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-[10px] shrink-0">
                    #{i + 1}
                  </span>
                  <span className="leading-snug">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lien avec le 41 rue Gay-Lussac et la Clinique de l'activité */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-400/25 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="size-3.5 text-amber-500" />
              <span>Pourquoi ce texte fonde l&apos;ergonomie du CNAM (PST106) :</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 font-serif">
              {PACAUD_TELEPHONISTES_SUMMARY.conclusionCnam}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
              Comme le démontrent Xavier Cuny et Annie Weill-Fassina (2012), l&apos;étude de Pacaud marque le passage historique de la <b>sélection psychotechnique</b> (adapter l&apos;homme au travail) vers l&apos;<b>analyse du travail réel</b> (adapter le travail à l&apos;homme).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
