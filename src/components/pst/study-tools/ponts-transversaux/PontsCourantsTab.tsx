import { ArrowRight } from "lucide-react";
import { Link } from "@/components/common/Link";
import type { CourantTheorique } from "@/lib/pst/data/ponts-transversaux-data";
import { triggerHaptic, playClickSound } from "@/lib/pst/audio-feedback";

interface PontsCourantsTabProps {
  courants: CourantTheorique[];
  selectedCourantId: string;
  setSelectedCourantId: (id: string) => void;
  activeCourant: CourantTheorique;
}

export function PontsCourantsTab({
  courants,
  selectedCourantId,
  setSelectedCourantId,
  activeCourant,
}: PontsCourantsTabProps) {
  return (
    <div className="space-y-4">
      {/* Sélecteur de Courants */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {courants.map((c) => {
          const isSelected = c.id === selectedCourantId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedCourantId(c.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900"
              }`}
            >
              <span>{c.nom}</span>
              <span className="ml-1 opacity-75 font-mono text-[10px]">
                ({c.uePrincipale})
              </span>
            </button>
          );
        })}
      </div>

      {/* Fiche Détaillée du Courant Théorique Sélectionné */}
      <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white bg-slate-900 dark:bg-slate-700">
                {activeCourant.uePrincipale}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Auteurs majeurs : {activeCourant.auteurs.join(", ")}
              </span>
            </div>
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 m-0">
              {activeCourant.nom}
            </h3>
          </div>

          <Link
            href={`/pst/${activeCourant.uePrincipale.toLowerCase().replace("pst", "")}/`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Ouvrir l'Atelier {activeCourant.uePrincipale}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
              1. Définition du Statut du « Réel » :
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
              {activeCourant.statutReel}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
              2. Rôle du Collectif &amp; Genre :
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
              {activeCourant.collectifGenre}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
              3. Méthodologie d'Intervention :
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
              {activeCourant.methodeIntervention}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
              4. Conflit Central Élucidé :
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
              {activeCourant.conflitCentral}
            </p>
          </div>
        </div>

        {/* Question Examen & Piège */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
          <div>
            <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[10px] block">
              🎯 Question d'examen type :
            </span>
            <p className="font-serif italic text-slate-800 dark:text-slate-200 m-0">
              {activeCourant.questionExamen}
            </p>
          </div>
          <div className="pt-2 border-t border-amber-500/20">
            <span className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-[10px] block">
              ⚠️ Piège impardonnable à éviter en copie :
            </span>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              {activeCourant.piegeEviter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
