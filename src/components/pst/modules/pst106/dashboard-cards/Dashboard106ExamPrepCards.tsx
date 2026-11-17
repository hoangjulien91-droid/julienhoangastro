"use client";

import { GraduationCap, Sparkles } from "lucide-react";

export function Dashboard106ExamPrepCards() {
  return (
    <>
      {/* MÉMO DE SURVIE EXAMEN */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Méthodologie Jour J · Les 4 Piliers</span>
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Option A &amp; B
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Mémo de Survie Examen
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Les 4 piliers indispensables pour structurer n&apos;importe quelle
            réponse rédigée le Jour J :
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">
                1
              </span>
              <span>Situer le Concept</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Toujours situer le concept dans sa théorie globale et nommer le
              courant (Ergonomie, Clinique de l&apos;activité, Psychodynamique).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">
                2
              </span>
              <span>Définir le Terme Clé</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Définir scientifiquement le concept (ex: Genre, Style, Activité
              réelle, Reconnaissance, Pouvoir d&apos;agir).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">
                3
              </span>
              <span>Donner l&apos;Exemple Réel</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Utiliser les cas cliniques du cours (ex: le port du casque chez
              les ouvriers, les guichetiers, la découpe de viande).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">
                4
              </span>
              <span>Contraster les Courants</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Montrer la complémentarité ou l&apos;opposition (ex: opposer le
              prescrit/réel ergonomique au pouvoir d&apos;agir ou à la
              souffrance éthique).
            </p>
          </div>
        </div>
      </div>

      {/* RITUEL ANTI-PANIQUE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="size-3 text-amber-600" />
            <span>Gestion du Temps &amp; Sérénité</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">
            5 Réflexes Clés
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Rituel anti-panique du Jour J
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            À appliquer dès la distribution du sujet d&apos;examen — avant
            d&apos;écrire une seule ligne sur la copie :
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            {
              num: "1",
              title: "Respiration lente",
              desc: "Pose ton stylo, 3 respirations profondes. Le stress crée des trous de mémoire, pas le manque de travail.",
            },
            {
              num: "2",
              title: "Double lecture active",
              desc: "Souligne les mots-clés et le verbe de consigne (définir, confronter, analyser la situation).",
            },
            {
              num: "3",
              title: "Plan au brouillon (20 min)",
              desc: "Pose 3-4 arguments avec leurs auteurs canoniques associés avant de rédiger.",
            },
            {
              num: "4",
              title: "Déroulé des 4 piliers",
              desc: "Situer · Définir · Exemple réel · Contraster les courants théoriques.",
            },
            {
              num: "5",
              title: "Relecture finale (10 min)",
              desc: "Vérifie les concepts verbatim, la syntaxe et l'orthographe technique des noms d'auteurs.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2.5"
            >
              <span className="size-5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {item.num}
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500 leading-snug block">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
