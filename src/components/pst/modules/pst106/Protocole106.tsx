import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { PROTO, APPROCHES } from "@/lib/pst/data/pst106-inline";
import { ShieldAlert, ArrowRight } from "lucide-react";

export function Protocole106() {
  return (
    <div className="space-y-6">
      <Protocole
        data={PROTO}
        hint="La chronologie rigoureuse de l'intervention en clinique de l'activité (Clot & Faïta), puis la posture face aux RPS (séance 14)."
        referenceExplanation="Le comité de pilotage paritaire (1) est un prérequis politique avant toute observation (2). La trace vidéo (3) rend possible l'autoconfrontation simple (4), qui prépare le sujet à affronter le regard d'un pair en autoconfrontation croisée (5) — la controverse professionnelle. L'intervention se conclut par la restitution organisationnelle (6), qui redonne aux travailleurs la main sur la transformation de leur métier."
      />

      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
            <ShieldAlert className="size-3 text-rose-600 dark:text-rose-400" />
            <span>Séance 14 · Quelle posture d&apos;intervention face aux RPS ?</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {APPROCHES.map((ap) => (
            <div
              key={ap.title}
              className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 relative overflow-hidden"
              style={{ borderTopColor: ap.col, borderTopWidth: 4 }}
            >
              <div
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: ap.col }}
              >
                {ap.title}
              </div>

              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {ap.sub}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium m-0">
                {ap.desc}
              </p>

              <div
                className="text-xs font-bold pt-2 flex items-center gap-1"
                style={{ color: ap.col }}
              >
                <ArrowRight className="size-3 shrink-0" />
                <span>{ap.verdict}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
