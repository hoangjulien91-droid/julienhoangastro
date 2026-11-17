import { Search, Sparkles, Copy, Check } from "lucide-react";
import { Link } from "@/components/common/Link";
import { MODULE_LABELS, type Pont } from "@/lib/pst/data/ponts";
import { triggerHaptic, playClickSound } from "@/lib/pst/audio-feedback";

interface PontsPasserellesTabProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterPair: string;
  setFilterPair: (val: string) => void;
  filteredPonts: Pont[];
  copyPont: (p: Pont) => void;
  copiedId: string | null;
}

const FILTER_PAIRS = [
  { key: "all", label: "Toutes les synergies" },
  { key: "pst106-pst120", label: "PST106 ↔ PST120 (Clot / Dejours)" },
  { key: "pst108-pst123", label: "PST108 ↔ PST123 (Langage / Identité)" },
  { key: "pst106-pst124", label: "PST106 ↔ PST124 (Outils / Digital)" },
];

export function PontsPasserellesTab({
  searchQuery,
  setSearchQuery,
  filterPair,
  setFilterPair,
  filteredPonts,
  copyPont,
  copiedId,
}: PontsPasserellesTabProps) {
  return (
    <div className="space-y-4">
      {/* Barre de recherche & Filtres de paires */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            aria-label="Chercher un concept transversal"
            placeholder="Chercher un concept transversal (ex. Dejours, Vygotski, Prescrit/Réel, Reconnaissance...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_PAIRS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setFilterPair(p.key);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                filterPair === p.key
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des cartes de passerelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredPonts.length === 0 ? (
          <div className="col-span-full p-8 text-center text-xs text-slate-500">
            Aucune passerelle conceptuelle trouvée pour cette recherche.
          </div>
        ) : (
          filteredPonts.map((p) => (
            <div
              key={p.c}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3 hover:border-amber-500/50 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 m-0">
                    <Sparkles className="size-3.5 text-amber-500 shrink-0" />
                    <span>{p.c}</span>
                  </h3>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => copyPont(p)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                      title="Copier les correspondances"
                    >
                      {copiedId === p.c ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Répercussions par module */}
                <div className="space-y-1.5">
                  {Object.entries(p.m).map(([modId, text]) => {
                    const label = MODULE_LABELS[modId] || modId.toUpperCase();
                    return (
                      <div
                        key={modId}
                        className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs flex items-start gap-2"
                      >
                        <span className="font-mono font-bold text-[10px] text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                          {modId.toUpperCase()}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold block text-[11px] text-slate-500 dark:text-slate-400">
                            {label}
                          </span>
                          <p className="m-0 text-slate-800 dark:text-slate-200 leading-snug">
                            {text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Liens rapides vers les ateliers */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono">
                  Consulter l'atelier :
                </span>
                <div className="flex items-center gap-1.5">
                  {Object.keys(p.m).map((modId) => (
                    <Link
                      key={modId}
                      href={`/pst/${modId.replace("pst", "")}/`}
                      className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-slate-200/70 dark:bg-slate-800 hover:bg-amber-600 hover:text-white transition-colors"
                    >
                      {modId.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
