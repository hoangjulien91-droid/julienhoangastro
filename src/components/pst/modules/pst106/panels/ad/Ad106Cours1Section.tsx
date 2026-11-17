"use client";

import React from "react";
import { Copy, Quote } from "lucide-react";

export interface Ad106Cours1SectionProps {
  onCopy: (text: string, key: string) => void;
  copiedSection: string | null;
}

export function Ad106Cours1Section({
  onCopy,
  copiedSection,
}: Ad106Cours1SectionProps) {
  return (
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
              onCopy(
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
  );
}
