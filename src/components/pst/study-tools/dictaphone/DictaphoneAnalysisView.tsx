"use client";

import { Check, AlertCircle, Sparkles } from "lucide-react";

interface DictaphoneAnalysisViewProps {
  totalWords: number;
  totalTics: number;
  ticsDetectes: { label: string; count: number }[];
  detectedKeywords: { keyword: string; isDetected: boolean }[];
  transcript: string;
  onTranscriptChange: (val: string) => void;
  isSpeechSupported: boolean;
  reponseIdealeSynthese: string;
}

export function DictaphoneAnalysisView({
  totalWords,
  totalTics,
  ticsDetectes,
  detectedKeywords,
  transcript,
  onTranscriptChange,
  isSpeechSupported,
  reponseIdealeSynthese,
}: DictaphoneAnalysisViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Oral Filler / Tics de langage Scanner */}
      {totalWords > 0 && (
        <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Hygiène Oratoire ({totalWords} mots prononcés) :
            </span>
            {totalTics === 0 ? (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                ✓ 0 tic de langage détecté
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                ⚠️ {totalTics} tic(s) parasite(s) à gommer
              </span>
            )}
          </div>
          {ticsDetectes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {ticsDetectes.map((t) => (
                <span
                  key={t.label}
                  className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/25 text-[10px] font-semibold"
                >
                  « {t.label} » ×{t.count}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Keyword detection badges */}
      <div className="space-y-2 p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Mots-clés attendus par le jury (détection en direct) :
        </span>
        <div className="flex flex-wrap gap-2">
          {detectedKeywords.map((k) => (
            <span
              key={k.keyword}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                k.isDetected
                  ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 font-bold"
                  : "bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-300/70 dark:border-slate-700/60"
              }`}
            >
              {k.isDetected ? (
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
              )}
              <span>{k.keyword}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Transcript / Manual text area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Transcription de votre parole (ou saisie manuelle) :
          </span>
          {!isSpeechSupported && (
            <span className="text-amber-600 dark:text-amber-400 text-[11px] flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>Micro non supporté par ce navigateur, mode texte activé</span>
            </span>
          )}
        </div>
        <textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder="Parlez dans votre micro... Vos propos apparaîtront ici et les mots-clés seront automatiquement analysés en direct !"
          rows={4}
          className="w-full p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
        />
      </div>

      {/* Ideal model answer */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/40 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300 uppercase text-[10px]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Modèle de synthèse orale idéale :</span>
        </div>
        <p className="text-indigo-950 dark:text-indigo-200 italic leading-relaxed">
          « {reponseIdealeSynthese} »
        </p>
      </div>
    </div>
  );
}
