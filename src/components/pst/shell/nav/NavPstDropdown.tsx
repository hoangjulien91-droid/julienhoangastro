"use client";

import { GraduationCap } from "lucide-react";
import { Link } from "@/components/common/Link";
import { INDEX } from "@/lib/pst/hub-stats";
import { getUnitSemesterStatus } from "@/lib/pst/planning-stats";

const MODULE_IDS = ["106", "108", "120", "123", "124"] as const;

interface NavPstDropdownProps {
  activeId?: string;
  progressMap: Record<string, number>;
  onClose: () => void;
}

export function NavPstDropdown({
  activeId,
  progressMap,
  onClose,
}: NavPstDropdownProps) {
  return (
    <>
      <div className="px-2.5 py-1.5 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span>Ateliers Cursus PST</span>
        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
          5 Modules
        </span>
      </div>

      <div className="space-y-1">
        {MODULE_IDS.map((id) => {
          const isCurrent = id === activeId;
          const pct = progressMap[id] ?? 0;
          const semStatus = getUnitSemesterStatus(`pst${id}`);
          const moduleMeta =
            INDEX.modules[`pst${id}` as keyof typeof INDEX.modules];

          return (
            <Link
              key={id}
              href={`/pst/${id}/`}
              onClick={onClose}
              className={`flex items-center justify-between p-2 rounded-xl transition-all border ${
                isCurrent
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 font-bold shadow-xs"
                  : "bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`px-2 py-1 rounded-lg font-mono font-black text-xs shrink-0 ${
                    isCurrent
                      ? "bg-amber-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  PST{id}
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-xs font-bold truncate">
                    {moduleMeta?.title ?? `Atelier PST ${id}`}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {semStatus.isDormant
                      ? `Semestre 2 · Rentrée ${semStatus.firstSessionLabel}`
                      : "Semestre 1 · En cours"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 font-mono text-xs pl-2">
                <span className="font-bold">{pct}%</span>
                <span
                  className={`size-2.5 rounded-full ${
                    pct >= 75
                      ? "bg-emerald-500 ring-2 ring-emerald-500/20"
                      : pct > 20
                        ? "bg-amber-500 ring-2 ring-amber-500/20"
                        : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-[11px]">
        <Link
          href="/pst/#pyramide"
          onClick={onClose}
          className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <GraduationCap className="size-3.5 text-indigo-500" />
          <span>Maquette RNCP 7</span>
        </Link>
        <a
          href="https://lecnam.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <span>Espace ENF ↗</span>
        </a>
      </div>
    </>
  );
}
