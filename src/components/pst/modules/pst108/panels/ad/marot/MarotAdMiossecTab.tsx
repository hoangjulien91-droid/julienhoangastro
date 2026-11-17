"use client";

import React from "react";
import type { Pst108AdMarot } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { Check, Copy, HelpCircle } from "lucide-react";

interface MarotAdMiossecTabProps {
  adSeancesMarot?: Pst108AdMarot[];
  selectedAdDate: "04nov" | "10nov";
  onSelectAdDate: (date: "04nov" | "10nov") => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const MarotAdMiossecTab: React.FC<MarotAdMiossecTabProps> = ({
  adSeancesMarot,
  selectedAdDate,
  onSelectAdDate,
  onCopy,
  copiedKey,
}) => {
  return (
    <div className="space-y-4">
      {/* Sélecteur de la partie d'AD */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onSelectAdDate("04nov");
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            selectedAdDate === "04nov"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
          }`}
        >
          📅 Séance du 04 novembre 2026 (Partie 1/2 : Problématique &amp; Rôle)
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onSelectAdDate("10nov");
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            selectedAdDate === "10nov"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
          }`}
        >
          📅 Séance du 10 novembre 2026 (Partie 2/2 : Effets santé &amp; Réfutation)
        </button>
      </div>

      {/* Rendu de l'AD choisie */}
      {adSeancesMarot
        ?.filter((ad: Pst108AdMarot) =>
          selectedAdDate === "04nov"
            ? ad.id === "ad-marot-4nov"
            : ad.id === "ad-marot-10nov",
        )
        .map((ad: Pst108AdMarot) => (
          <div
            key={ad.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                    {ad.seanceDate} · {ad.partie}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Mme MAROT
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-1">
                  {ad.titre}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Lecture officielle : <strong>{ad.lecturePrescrite}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onCopy(ad.texteCompletCopier, ad.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
              >
                {copiedKey === ad.id ? (
                  <>
                    <Check className="size-3 text-emerald-600" />
                    <span>Copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copier tout pour le Forum Moodle</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white">
                Objectif visé :{" "}
              </span>
              {ad.objectif}
            </div>

            {/* Liste des questions officielles avec corrigé 18/20 */}
            <div className="space-y-4">
              {ad.questions.map((q) => (
                <div
                  key={q.num}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/50 dark:bg-slate-800/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <HelpCircle className="size-3.5" />
                      <span>
                        Question {q.num} : {q.titreQuestion}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onCopy(
                          `【Question ${q.num} : ${q.titreQuestion}】\n\n${q.reponseRedigee18}`,
                          `${ad.id}-q${q.num}`,
                        )
                      }
                      className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `${ad.id}-q${q.num}` ? (
                        <Check className="size-3 text-emerald-600" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                      <span>
                        {copiedKey === `${ad.id}-q${q.num}`
                          ? "Copié !"
                          : "Copier la question"}
                      </span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold italic">
                    « {q.enonceOfficiel} »
                  </div>

                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {q.reponseRedigee18}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {q.pointsCles.map((pk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                      >
                        ✓ {pk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
