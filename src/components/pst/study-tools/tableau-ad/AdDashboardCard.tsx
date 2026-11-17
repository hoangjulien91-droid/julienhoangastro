import {
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  type UnifiedAdItem,
  type AdStatus,
  AD_STATUS_CONFIG,
} from "@/lib/pst/data/ad-common";

interface LiveAdItem extends UnifiedAdItem {
  currentStatus: AdStatus;
  wordCount: number;
  hasDraft: boolean;
}

interface AdDashboardCardProps {
  ad: LiveAdItem;
  onStatusChange: (adId: string, status: AdStatus) => void;
  onNavigateToAd: (ad: UnifiedAdItem) => void;
}

export function AdDashboardCard({
  ad,
  onStatusChange,
  onNavigateToAd,
}: AdDashboardCardProps) {
  const cfg = AD_STATUS_CONFIG[ad.currentStatus];
  const moduleBadgeColors = {
    pst106:
      "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-500/30",
    pst108:
      "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/30",
    pst123:
      "bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-500/30",
  }[ad.moduleKey];

  return (
    <div className="p-3 sm:p-5 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border ${moduleBadgeColors}`}
            >
              {ad.moduleLabel}
            </span>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              {ad.enseignant}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {ad.dateSeance}
            </span>
            {ad.dateLimite && (
              <>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 font-mono font-semibold">
                  <Clock className="w-3 h-3 shrink-0" />
                  {ad.dateLimite}
                </span>
              </>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
            {ad.titre}
          </h3>
        </div>

        {/* Statut & Sélecteur interactif */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
          <select
            value={ad.currentStatus}
            onChange={(e) =>
              onStatusChange(ad.id, e.target.value as AdStatus)
            }
            className={`text-xs font-semibold border rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer flex-1 sm:flex-initial min-w-0 ${cfg.badgeClass}`}
          >
            {(Object.keys(AD_STATUS_CONFIG) as AdStatus[]).map((k) => (
              <option key={k} value={k}>
                {AD_STATUS_CONFIG[k].label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onNavigateToAd(ad)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50/90 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
          >
            <span>Ouvrir</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Consigne courte et concepts clés */}
      <div className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed bg-slate-50/90 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 font-sans">
        {ad.consigne}
      </div>

      {/* Tags concepts & indicateur de brouillon */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {ad.conceptsCles.slice(0, 3).map((concept, cIdx) => (
            <span
              key={cIdx}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-50/90 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
            >
              {concept}
            </span>
          ))}
          {ad.conceptsCles.length > 3 && (
            <span className="text-[10px] text-slate-600 dark:text-slate-400 self-center">
              +{ad.conceptsCles.length - 3} autres
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          {ad.hasDraft ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              {ad.wordCount} mots sauvegardés
            </span>
          ) : (
            <span className="text-slate-600 dark:text-slate-400 italic">
              Pas de brouillon rédigé
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
