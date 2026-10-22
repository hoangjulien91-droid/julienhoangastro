"use client";

import { useMemo, useState } from "react";
import {
  Briefcase,
  AlertTriangle,
  Search,
  X,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { DEONTOLOGIE_PRINCIPLES } from "@/lib/pst/data/pst123";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export function DeontoExplorer() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      DEONTOLOGIE_PRINCIPLES.filter(
        (p) =>
          p.n.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.eg.toLowerCase().includes(q) ||
          p.trap.toLowerCase().includes(q),
      ),
    [q],
  );

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <BookOpen className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Explorateur du Code de Déontologie (Mise à jour 2021)</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
          {filtered.length} principes
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
        Citez précisément les principes déontologiques à l&apos;examen. Utilisez
        la barre de recherche ci-dessous pour filtrer les principes et
        visualiser des cas pratiques en entreprise.
      </p>

      {/* Instant Search Bar */}
      <div className="relative">
        <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un principe ou mot-clé (ex: secret, consentement, autonomie)..."
          className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              setQuery("");
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Principles List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 italic">
            Aucun principe déontologique ne correspond à votre recherche «{" "}
            {query} ».
          </div>
        ) : (
          filtered.map((p, idx) => (
            <details
              key={p.n}
              className="group p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-3 transition-all"
            >
              <summary
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                }}
                className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                    Principe {idx + 1}
                  </span>
                  <span>{p.n}</span>
                </div>
                <ChevronDown className="size-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <b className="text-slate-900 dark:text-slate-100">
                    Description officielle du Code :
                  </b>
                  <p className="mt-1 m-0">{p.desc}</p>
                </div>

                {/* Practical Enterprise Example */}
                <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    <Briefcase className="size-3 text-emerald-600" />
                    <span>Exemple Pratique en Entreprise :</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {p.eg}
                  </div>
                </div>

                {/* Exam Trap */}
                <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="size-3 text-rose-600" />
                    <span>Piège d&apos;Examen (Violation Déontologique) :</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {p.trap}
                  </div>
                </div>
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
