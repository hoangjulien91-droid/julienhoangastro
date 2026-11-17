"use client";

import {
  BookOpen,
  GraduationCap,
  Trophy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CurriculumGuideAccordionProps {
  showGuide: boolean;
  onToggleGuide: () => void;
}

export function CurriculumGuideAccordion({
  showGuide,
  onToggleGuide,
}: CurriculumGuideAccordionProps) {
  return (
    <div className="mt-6 border-t border-slate-200/80 dark:border-slate-800 pt-4">
      <button
        onClick={onToggleGuide}
        className="w-full flex items-center justify-between p-3.5 bg-white/70 hover:bg-white/90 dark:bg-slate-800/60 dark:hover:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-xl ring-1 ring-amber-500/20">
            <BookOpen className="size-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>
                Guide Pédagogique, Parcours Théorique &amp; Pratique CNAM
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Recommandations d&apos;inscription, pré-requis du PST108 et agréments du mémoire (PST219)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://formation.cnam.fr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded-xl transition-all shadow-xs active:scale-95"
          >
            <span>S&apos;inscrire aux UE</span>
            <ExternalLink className="size-3" />
          </a>
          {showGuide ? (
            <ChevronUp className="size-4 text-slate-400" />
          ) : (
            <ChevronDown className="size-4 text-slate-400" />
          )}
        </div>
      </button>

      {showGuide && (
        <div className="mt-3 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-4 shadow-2xs">
          <div className="space-y-1.5">
            <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <BookOpen className="size-3.5" />
              <span>1. La Formation Théorique (Années 1 &amp; 2)</span>
            </div>
            <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
              Les UE d&apos;introduction (Année 1) et les UE de spécialisation
              clinique (Année 2) sont gérées <b>&quot;à la carte&quot;</b>.
              <br />
              <b>Conseil pédagogique :</b> Il est vivement conseillé de
              débuter et valider les 4 UE d&apos;introduction avant d&apos;aborder la
              spécialisation.
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <GraduationCap className="size-3.5" />
              <span>
                2. La Formation Pratique &amp; Clinique (Années 3 &amp; 4)
              </span>
            </div>
            <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
              L&apos;accès aux modules exige la validation préalable de{" "}
              <b>toute la formation théorique</b>.
              <br />
              <b>Exception dérogatoire :</b> Le <code>PST108</code> peut être
              validé de manière dérogatoire lors de la 1ère année de pratique
              (Année 3).
              <br />
              <b>Agrément obligatoire :</b> Les UE de professionnalisation
              sont soumises à l&apos;agrément préalable.
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <Trophy className="size-3.5" />
              <span>3. Travaux de fin d&apos;études (Année 5 / PST219)</span>
            </div>
            <p className="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">
              <b>Conditions préalables indispensables :</b>
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-1">
              <li>Validé l&apos;ensemble des UE du cursus (ou obtenu une VES).</li>
              <li>Validé l&apos;expérience professionnelle de 2 ans.</li>
              <li>Reçu l&apos;agrément officiel.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
