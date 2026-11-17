"use client";

import { Bell, X } from "lucide-react";
import { Link } from "@/components/common/Link";

interface RemindersPopoverProps {
  stale: { id: string; days: number }[];
  onRequestNotifications: () => void;
  onClose: () => void;
}

export function RemindersPopover({
  stale,
  onRequestNotifications,
  onClose,
}: RemindersPopoverProps) {
  return (
    <div
      className="mb-3 w-76 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      role="dialog"
      aria-label="Rappels de révision"
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
          <Bell className="size-4 text-amber-500" />
          <span>Rappels de Révision</span>
        </div>
        <button
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Fermer"
          onClick={onClose}
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="my-2.5 max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
        {stale.length === 0 ? (
          <div className="p-3 text-center text-slate-500 font-medium">
            Tout est à jour. Aucun module en retard de plus de 3 jours.
          </div>
        ) : (
          stale.map((s) => (
            <div
              key={s.id}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-2"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {s.id.toUpperCase()}
                </span>
                <span className="block text-[10px] text-slate-500">
                  Non ouvert depuis {s.days} jours
                </span>
              </div>
              <Link
                href={`/pst/${s.id.replace("pst", "")}/`}
                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold"
              >
                Ouvrir
              </Link>
            </div>
          ))
        )}
      </div>
      <button
        type="button"
        onClick={onRequestNotifications}
        className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all active:scale-95 cursor-pointer"
      >
        Activer notifications navigateur
      </button>
    </div>
  );
}
