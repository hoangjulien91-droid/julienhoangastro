"use client";

import { X, Link2, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "next-view-transitions";
import { PONTS, MODULE_LABELS, type Pont } from "@/lib/pst/data/ponts";

interface SmartBridgeSlideOverProps {
  pont: Pont | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SmartBridgeSlideOver({
  pont,
  isOpen,
  onClose,
}: SmartBridgeSlideOverProps) {
  if (!isOpen || !pont) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 size-full">
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <Link2 className="size-4" />
              <span>Passerelle Transversale</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-800 dark:text-amber-300 rounded-full text-xs font-semibold mb-2">
              <Sparkles className="size-3.5" />
              <span>Concept Clé Inter-Modules</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 m-0">
              {pont.c}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Répercussions dans les ateliers PST :
            </div>
            {Object.entries(pont.m).map(([modId, text]) => {
              const label = MODULE_LABELS[modId] || modId.toUpperCase();
              return (
                <div
                  key={modId}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                    <span>{modId.toUpperCase()}</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      {label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 m-0 leading-relaxed font-medium">
                    {text}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex justify-end">
                    <Link
                      href={`/pst/${modId.replace("pst", "")}/`}
                      onClick={onClose}
                      className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Accéder au module {modId.toUpperCase()}</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors"
          >
            Fermer le panneau
          </button>
        </div>
      </div>
    </div>
  );
}
