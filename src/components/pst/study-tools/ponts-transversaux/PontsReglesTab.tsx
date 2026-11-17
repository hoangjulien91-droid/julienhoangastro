import { ShieldCheck } from "lucide-react";
import { REGLES_OR_TRANSVERSALES } from "@/lib/pst/data/ponts-transversaux-data";

export function PontsReglesTab() {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 text-xs">
        <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
          <ShieldCheck className="size-4 text-emerald-600" />
          <span>
            Comment mobiliser plusieurs PST sans commettre de contre-sens
          </span>
        </h3>
        <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed">
          Le jury du Cnam et les correcteurs de dissertation valorisent hautement la
          capacité à tisser des passerelles transversales, à condition de respecter
          scrupuleusement les frontières épistémologiques propres à chaque courant.
        </p>
      </div>

      <div className="space-y-3">
        {REGLES_OR_TRANSVERSALES.map((r) => (
          <div
            key={r.num}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-black flex items-center justify-center">
                {r.num}
              </span>
              <span className="text-sm font-serif">{r.titre}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7 m-0">
              {r.regle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
