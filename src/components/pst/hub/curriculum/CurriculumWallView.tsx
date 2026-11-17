"use client";

import type { ModuleProgress } from "@/lib/pst/data/curriculum-rncp7";
import { CurriculumPyramidBlock as PyramidBlock } from "../CurriculumPyramidBlock";

interface CurriculumWallViewProps {
  modules: ModuleProgress[];
  onToggleStatus: (id: string) => void;
  onInspectModule: (m: ModuleProgress) => void;
}

export function CurriculumWallView({
  modules,
  onToggleStatus,
  onInspectModule,
}: CurriculumWallViewProps) {
  const getMod = (id: string) => modules.find((m) => m.id === id);

  return (
    <div className="flex flex-col rounded-2xl shadow-lg border border-slate-200/90 dark:border-slate-700/80 overflow-x-auto scrollbar-none">
      <div className="min-w-[640px] flex flex-col w-full ring-1 ring-black/5 dark:ring-white/5">
        {/* LIGNE NIVEAU 5 */}
        <div className="flex w-full bg-sky-950">
          {/* Année & Flèche */}
          <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80">
            <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
              Année 5{" "}
              <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                1 an
              </span>
            </div>
            <div className="w-5 sm:w-6 relative flex justify-center pt-3">
              <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 rounded-t-sm h-full relative shadow-sm">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-b-[6px] border-b-amber-400 dark:border-b-amber-500/80 size-0 border-x-[5px] border-x-transparent" />
              </div>
            </div>
          </div>
          {/* Centre */}
          <div className="flex-1 flex flex-col min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
            <PyramidBlock
              item={getMod("memoire")}
              onToggle={onToggleStatus}
              onInspect={onInspectModule}
              bgClass="bg-sky-950 text-sky-50"
            />
            <div className="grid grid-cols-2">
              <PyramidBlock
                item={getMod("pst219")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-950 text-sky-50"
              />
              <PyramidBlock
                item={getMod("rncp_uas08")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-900 text-sky-50"
              />
            </div>
          </div>
          {/* Catégorie droite */}
          <div className="w-32 lg:w-44 shrink-0 flex flex-col border-l border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex-1 p-2 flex flex-col justify-center relative">
              <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
              <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                Préparation et rédaction
              </span>
              <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                60 ECTS
              </span>
            </div>
            <div className="flex-1 p-2 flex flex-col justify-center border-t border-slate-200 dark:border-slate-700/80 relative">
              <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
              <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
                Dépôt du dossier
              </span>
              <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
                34 ECTS
              </span>
            </div>
          </div>
        </div>

        {/* LIGNE NIVEAU 4 */}
        <div className="flex w-full bg-sky-900">
          {/* Année & Flèche */}
          <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
            <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
              Année 4{" "}
              <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                1 an
              </span>
            </div>
            <div className="w-5 sm:w-6 relative flex justify-center">
              <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full shadow-sm" />
            </div>
          </div>
          {/* Centre */}
          <div className="flex-1 flex flex-col min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
            <div className="grid grid-cols-2 h-full">
              <PyramidBlock
                item={getMod("pst115")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-900 text-sky-50"
              />
              <PyramidBlock
                item={getMod("pst218")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-900 text-sky-50"
              />
            </div>
          </div>
          {/* Catégorie droite */}
          <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
            <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
            <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
              Module de pro. (suite)
            </span>
          </div>
        </div>

        {/* LIGNE NIVEAU 3 */}
        <div className="flex w-full bg-sky-800">
          {/* Année & Flèche */}
          <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
            <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
              Année 3{" "}
              <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                1 an
              </span>
            </div>
            <div className="w-5 sm:w-6 relative flex justify-center">
              <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full shadow-sm" />
            </div>
          </div>
          {/* Centre */}
          <div className="flex-1 flex flex-col min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
            <div className="grid grid-cols-2 h-full">
              <PyramidBlock
                item={getMod("pst116")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-800 text-sky-50"
              />
              <PyramidBlock
                item={getMod("pst117")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-800 text-sky-50"
              />
            </div>
          </div>
          {/* Catégorie droite */}
          <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
            <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
            <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
              Module de pro.
            </span>
            <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
              42 ECTS (A3 + A4)
            </span>
          </div>
        </div>

        {/* LIGNE NIVEAU 2 */}
        <div className="flex w-full bg-sky-700">
          {/* Année & Flèche */}
          <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
            <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
              Année 2{" "}
              <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                1 an
              </span>
            </div>
            <div className="w-5 sm:w-6 relative flex justify-center">
              <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full shadow-sm" />
            </div>
          </div>
          {/* Centre */}
          <div className="flex-1 min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
            <div className="grid grid-cols-5 h-full">
              <PyramidBlock
                item={getMod("pst106")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-700 text-sky-50"
                isSiteModule
              />
              <PyramidBlock
                item={getMod("pst108")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-700 text-sky-50"
                isSiteModule
              />
              <PyramidBlock
                item={getMod("pst120")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-700 text-sky-50"
                isSiteModule
              />
              <PyramidBlock
                item={getMod("pst123")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-700 text-sky-50"
                isSiteModule
              />
              <PyramidBlock
                item={getMod("pst124")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-700 text-sky-50"
                isSiteModule
              />
            </div>
          </div>
          {/* Catégorie droite */}
          <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
            <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
            <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2">
              Psychologie du travail et clinique
            </span>
            <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
              30 ECTS
            </span>
          </div>
        </div>

        {/* LIGNE NIVEAU 1 */}
        <div className="flex w-full bg-sky-600">
          {/* Année & Flèche */}
          <div className="flex w-20 sm:w-24 shrink-0 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700/80 border-t border-slate-200 dark:border-slate-700/80">
            <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 text-slate-600 dark:text-slate-400 font-black text-xs uppercase text-center">
              Année 1{" "}
              <span className="text-[10px] font-medium normal-case mt-0.5 opacity-80">
                1 an
              </span>
            </div>
            <div className="w-5 sm:w-6 relative flex justify-center pb-3">
              <div className="w-1.5 bg-amber-400 dark:bg-amber-500/80 h-full rounded-b-full shadow-sm" />
            </div>
          </div>
          {/* Centre */}
          <div className="flex-1 min-w-0 border-x border-slate-900/20 dark:border-slate-400/10">
            <div className="grid grid-cols-4 h-full">
              <PyramidBlock
                item={getMod("pst001")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-600 text-sky-50"
              />
              <PyramidBlock
                item={getMod("pst002")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-600 text-sky-50"
              />
              <PyramidBlock
                item={getMod("pst003")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-600 text-sky-50"
              />
              <PyramidBlock
                item={getMod("pst004")}
                onToggle={onToggleStatus}
                onInspect={onInspectModule}
                bgClass="bg-sky-600 text-sky-50"
              />
            </div>
          </div>
          {/* Catégorie droite */}
          <div className="w-32 lg:w-44 shrink-0 border-l border-t border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 p-2 flex flex-col justify-center relative">
            <div className="absolute left-0 w-1 bg-amber-500/80 dark:bg-amber-400/60 inset-y-0" />
            <span className="text-[11px] lg:text-xs font-bold leading-tight text-slate-800 dark:text-slate-200 px-2 flex flex-col gap-1">
              <span>Introduction à la psychologie</span>
            </span>
            <span className="text-[9px] lg:text-[10px] font-black text-amber-600 dark:text-amber-400 mt-1 px-2">
              22 ECTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
