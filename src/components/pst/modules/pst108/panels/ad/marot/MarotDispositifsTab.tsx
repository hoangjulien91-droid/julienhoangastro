"use client";

import React from "react";
import type { Pst108DispositifMarot } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { Brain, Check, Copy, Sparkles } from "lucide-react";

interface MarotDispositifsTabProps {
  dispositifsMarot?: Pst108DispositifMarot[];
  selectedDispId: string;
  onSelectDispId: (id: string) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const MarotDispositifsTab: React.FC<MarotDispositifsTabProps> = ({
  dispositifsMarot,
  selectedDispId,
  onSelectDispId,
  onCopy,
  copiedKey,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-900 dark:text-indigo-200">
        <span className="font-bold">
          Programme officiel de Mme Marot (Séances des 27/11 et 10/12) :
        </span>{" "}
        « Les dispositifs d&apos;entretien en psychologie clinique du travail :
        L&apos;instruction au sosie, l&apos;autoconfrontation simple,
        l&apos;autoconfrontation croisée. »
      </div>

      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        {dispositifsMarot?.map((disp: Pst108DispositifMarot) => (
          <button
            key={disp.id}
            type="button"
            onClick={() => {
              playClickSound();
              onSelectDispId(disp.id);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedDispId === disp.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {disp.nom}
          </button>
        ))}
      </div>

      {dispositifsMarot
        ?.filter((disp: Pst108DispositifMarot) => disp.id === selectedDispId)
        .map((disp: Pst108DispositifMarot) => (
          <div
            key={disp.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Dispositif Clinique Cnam · Fondateurs : {disp.inventeur}
                </span>
                <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                  {disp.nom}
                </h4>
              </div>

              <button
                type="button"
                onClick={() =>
                  onCopy(
                    `【${disp.nom} - ${disp.inventeur}】\nProtocole : ${disp.protocole}\n\nCas concret : ${disp.casCliniqueConcret.titre} (${disp.casCliniqueConcret.profession})\n${disp.casCliniqueConcret.analyse}\n\nDéplacement clinique : ${disp.casCliniqueConcret.deplacementClinique}`,
                    disp.id,
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
              >
                {copiedKey === disp.id ? (
                  <>
                    <Check className="size-3 text-emerald-600" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copier la fiche méthodologique</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white">
                Protocole d&apos;intervention :{" "}
              </span>
              {disp.protocole}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-50 dark:to-slate-800/50 border border-indigo-500/20 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Brain className="size-4 text-indigo-600 dark:text-indigo-400" />
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white m-0">
                    Cas Clinique de Référence : {disp.casCliniqueConcret.titre}
                  </h5>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
                  {disp.casCliniqueConcret.profession}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {disp.casCliniqueConcret.analyse}
              </p>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2">
                <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                    Effet psychologique &amp; Déplacement clinique (18/20 à
                    l&apos;examen) :
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium leading-relaxed">
                    {disp.casCliniqueConcret.deplacementClinique}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {disp.conceptsCles.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                >
                  ✦ {c}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
