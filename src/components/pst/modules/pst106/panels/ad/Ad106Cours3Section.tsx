"use client";

import React from "react";
import { Brain, Copy, GraduationCap, Quote } from "lucide-react";

export interface Ad106Cours3SectionProps {
  onCopy: (text: string, key: string) => void;
  copiedSection: string | null;
}

export function Ad106Cours3Section({
  onCopy,
  copiedSection,
}: Ad106Cours3SectionProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Card Présentation & Enseignante */}
      <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Enseignante responsable : Pr. Christine LAGABRIELLE · Séance du 28 octobre 2026
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
              Cours 3 : Du Facteur Humain à l&apos;Analyse de l&apos;Activité de Travail
            </h4>
          </div>
          <button
            type="button"
            onClick={() =>
              onCopy(
                `PST106 — COURS 3 : FACTEUR HUMAIN, ERGONOMIE & PSYCHOPATHOLOGIE (Pr. LAGABRIELLE)\n\n1. Règle d'or : « On ne motive pas les personnes ! L'organisation crée les conditions, c'est l'individu qui se motive. »\n2. Elton Mayo (Hawthorne 1927-1932) : L'Effet Hawthorne montre que la reconnaissance du facteur humain et l'attention portée au groupe augmentent l'engagement de 20%. L'instinct d'association et les normes informelles dépassent l'intérêt financier individuel.\n3. Maslow & Herzberg : Maslow n'a jamais dessiné de pyramide (vulgarisation). Herzberg montre que les facteurs d'hygiène (salaire, climat) ne font qu'éliminer l'insatisfaction, seuls les facteurs moteurs (autonomie, responsabilité, reconnaissance) créent la satisfaction durable.\n4. Alain Wisner : « Adapter le travail à l'homme et non l'homme au travail ». Écart structurel entre Travail Prescrit et Travail Réel (le paradoxe ergonomique).\n5. Jacques Leplat : Le modèle des 5 carrés et la Double Régulation (interne vers le sujet, externe vers la tâche).\n6. Louis Le Guillant : Le travail comme « condition sociale » et pathologie du quotidien (névrose des téléphonistes, asthénie des cheminots, drame des sœurs Papin).\n7. Filiation Cnam : Jules Amar, Lahy, Pacaud, Faverge, Leplat, scission de 1990 (Dejours / Clot) et Marc-Éric Bobillier-Chaumon (clinique des usages).\n8. Consigne orale officielle : Cas Harwood (Coch & French 1948 sur la confection de pyjamas) pour analyser la résistance au changement.`,
                "cours3",
              )
            }
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="size-3" />
            <span>{copiedSection === "cours3" ? "Copié !" : "Copier la fiche de cours"}</span>
          </button>
        </div>

        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200 space-y-1 font-serif">
          <p className="font-bold m-0 flex items-center gap-1.5">
            <Quote className="size-3 text-amber-600" />
            <span>La mise au point de Pr. Lagabrielle sur la motivation :</span>
          </p>
          <p className="m-0 italic">
            « Retenez bien cela pour votre pratique professionnelle et vos écrits d&apos;examen : on ne motive pas les personnes ! L&apos;organisation crée des conditions managériales et organisationnelles, et c&apos;est le sujet qui se motive en fonction du sens qu&apos;il trouve à son activité. »
          </p>
        </div>
      </div>

      {/* Grille 3 colonnes : 1. Relations Humaines | 2. Ergonomie & 5 carrés | 3. Le Guillant & Cnam */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* 1. Relations Humaines & Motivation */}
        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-1.5 text-amber-700 dark:text-amber-400">
            1. Facteur Humain &amp; Motivations
          </h5>
          <div className="space-y-1.5">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Elton Mayo &amp; Hawthorne :</b> Découverte capitale de l&apos;organisation informelle et de la régulation de groupe qui surpasse le salaire au rendement.
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Herzberg (Bi-factoriel) :</b> Facteurs d&apos;hygiène (extrinsèques : salaire, confort) <i>vs</i> Facteurs moteurs (intrinsèques : autonomie, contenu).
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Lewin &amp; McGregor :</b> Décision de groupe (30% d&apos;abats consommés vs 3%), dynamique de forces et Théorie X vs Y.
            </div>
          </div>
        </div>

        {/* 2. Ergonomie francophone & Leplat */}
        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-1.5 text-indigo-700 dark:text-indigo-400">
            2. Ergonomie &amp; 5 Carrés
          </h5>
          <div className="space-y-1.5">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Wisner (Prescrit / Réel) :</b> « Adapter le travail à l&apos;homme ». L&apos;écart est la signature même de l&apos;ingéniosité humaine face aux aléas.
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Faverge (1955) :</b> Les 4 composantes universelles de tout travail : motrices, informationnelles, régulatoires, intellectuelles.
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Jacques Leplat (5 carrés) :</b> Double régulation : régulation interne (préservation de l&apos;opérateur) et externe (efficacité de la tâche).
            </div>
          </div>
        </div>

        {/* 3. Le Guillant & Cnam */}
        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <h5 className="font-bold text-slate-900 dark:text-white m-0 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-1.5 text-emerald-700 dark:text-emerald-400">
            3. Condition Sociale &amp; Cnam
          </h5>
          <div className="space-y-1.5">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Louis Le Guillant :</b> « Le drame humain du travail ». Névrose des téléphonistes, asthénie des cheminots et crime des sœurs Papin.
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Arbre des Causes (1970) :</b> Rompre avec la recherche de coupable individuel au profit de la chaîne causale systémique.
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <b>Scission 1990 :</b> Départ de Goguelin &rarr; Découplage Dejours (Psychodynamique) et Clot (Clinique de l&apos;activité).
            </div>
          </div>
        </div>
      </div>

      {/* Cas Harwood & Texte Maslow (Documents officiels distribués) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cas Harwood (Coch & French 1948) */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-200 text-xs">
              <GraduationCap className="size-4 text-emerald-600" />
              <span>Étude de Cas Harwood · Coch &amp; French (1948)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
              PDF 3 pages
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            Expérience historique menée à l&apos;usine de confection de pyjamas Harwood (Marion, Virginie) sous l&apos;égide de <b>Kurt Lewin</b> :
          </p>
          <div className="space-y-1.5 text-[11px]">
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <b className="text-rose-700 dark:text-rose-300">Groupe 1 (Sans participation · Contrôle) :</b> Décision descendante imposée. Chute de productivité à <b>50 unités</b>, 17% de démissions en 40 jours, absentéisme, agressivité contre le contremaître.
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <b className="text-amber-700 dark:text-amber-300">Groupe 2 (Représentation par délégués) :</b> 8 ouvrières élues conçoivent les aménagements avec l&apos;ingénieur. Retour au standard initial (60 unités) en 14 jours, climat correct.
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <b className="text-emerald-700 dark:text-emerald-300">Groupes 3 &amp; 4 (Participation directe totale) :</b> Toutes les ouvrières participent au dégel et chronomètrent elles-mêmes. Rebond à <b>70 unités (+14%)</b>, 0 démission, coopération active.
            </div>
          </div>
          <p className="text-[11px] text-emerald-900 dark:text-emerald-300 font-semibold m-0 bg-emerald-500/15 p-2 rounded-lg">
            💡 <b>Thèse d&apos;examen :</b> La résistance au changement n&apos;est pas une tare individuelle, mais une force homéostatique de groupe (Lewin). Réuni plus tard en participation totale, le Groupe 1 a bondi lui aussi à 70 unités !
          </p>
        </div>

        {/* Texte Maslow sur les Plaintes (1971) */}
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200 text-xs">
              <Brain className="size-4 text-indigo-600" />
              <span>Texte de Maslow · Théorie des Plaintes (1971)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 font-bold">
              Questions C. Prost
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            Dans <i>The Farther Reaches of Human Nature</i>, Maslow analyse la nature des récriminations au travail :
          </p>
          <div className="space-y-1.5 text-[11px]">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <b className="text-slate-800 dark:text-slate-200">1. Plaintes de bas niveau (Low grumbles) :</b> Froid, humidité, bruit destructeur, danger mortel, salaire de famine.
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <b className="text-slate-800 dark:text-slate-200">2. Plaintes supérieures (High grumbles) :</b> Dignité, sécurité de l&apos;emploi, justice managériale, estime et appartenance.
            </div>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <b className="text-indigo-700 dark:text-indigo-300">3. Métaplaintes (Meta-grumbles) :</b> Revendications de vérité, de justice sociale, de perfection éthique et de beauté du travail bien fait.
            </div>
          </div>
          <p className="text-[11px] text-indigo-900 dark:text-indigo-300 font-semibold m-0 bg-indigo-500/15 p-2 rounded-lg">
            💡 <b>Thèse d&apos;examen (Corinne Prost) :</b> Une entreprise sans plaintes est une chimère morbide. Améliorer le travail ne supprime pas les plaintes, cela les élève vers des métaplaintes (signe d&apos;accomplissement démocratique).
          </p>
        </div>
      </div>
    </div>
  );
}
