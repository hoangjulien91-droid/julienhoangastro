"use client";

import { useState } from "react";
import {
  Activity,
  Layers,
  Brain,
  Copy,
  Check,
  Workflow,
} from "lucide-react";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type SituationMetier106,
  SITUATIONS_METIER_106,
} from "@/lib/pst/data/labo-diagnostic-106-data";
import { LeplatHocTabView } from "./labo-diagnostic/LeplatHocTabView";
import { ClotTabView } from "./labo-diagnostic/ClotTabView";
import { ProtocoleTabView } from "./labo-diagnostic/ProtocoleTabView";

export type { SituationMetier106 };
export { SITUATIONS_METIER_106 };

export function LaboDiagnostic106() {
  const [selectedSitId, setSelectedSitId] = useState<string>(
    SITUATIONS_METIER_106[0].id,
  );
  const [activeTab, setActiveTab] = useState<"leplat" | "clot" | "protocole">(
    "leplat",
  );
  const [copied, setCopied] = useState(false);

  const situation =
    SITUATIONS_METIER_106.find((s) => s.id === selectedSitId) ??
    SITUATIONS_METIER_106[0];

  const handleCopyAnalysis = () => {
    const text = `ANALYSE DU TRAVAIL SELON LEPLAT & HOC ET CLOT (PST106)
Situation : ${situation.titre} (${situation.secteur})

1. MODÈLE DE LEPLAT & HOC (1983)
- Tâche prescrite : ${situation.descriptionPrescrite}
- Conditions internes : ${situation.conditionsInternes.join(", ")}
- Conditions externes : ${situation.conditionsExternes.join(", ")}
- Activité réelle (Régulation opératoire) : ${situation.compromisOperatoires.join(", ")}
- Effets sur l'opérateur : ${situation.effetsOperateur.join(", ")}
- Effets sur le système : ${situation.effetsSysteme.join(", ")}

2. DIAGNOSTIC CLINIQUE DE L'ACTIVITÉ (YVES CLOT)
- Statut de l'activité : Activité ${situation.diagnosticClot.statutActivite.toUpperCase()}
- État du genre professionnel : ${situation.diagnosticClot.etatGenre.toUpperCase()}
- Analyse clinique : ${situation.diagnosticClot.explicationClinique}
- Marge de style : ${situation.diagnosticClot.stylePossible}

3. DÉMARCHE ERGONOMIQUE ET CLINIQUE D'INTERVENTION
- Étape 1 : ${situation.protocoleRecommande.etape1}
- Étape 2 : ${situation.protocoleRecommande.etape2}
- Dispositif central : ${situation.protocoleRecommande.dispositifCle}
- Argumentaire examen CNAM : ${situation.protocoleRecommande.justificationExamen}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-white/90 to-teal-500/[0.06] dark:from-emerald-950/40 dark:via-slate-900/90 dark:to-teal-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
              <Activity className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                PST106 · Laboratoire d&apos;Analyse Clinique &amp; Ergonomique
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white m-0">
              Le Labo Diagnostic 106 · Leplat &amp; Hoc × Yves Clot
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Décortiquez n&apos;importe quelle situation de travail en combinant
              la régulation ergonomique (Leplat &amp; Hoc, 1983) et la clinique de
              l&apos;activité (Clot, 1999). Produisez le diagnostic parfait
              attendu par le jury CNAM.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={handleCopyAnalysis}
              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              <span>
                {copied ? "Analyses copiées !" : "Copier pour la copie (/20)"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Situation Selector */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Sélectionnez un cas de terrain à diagnostiquer :
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SITUATIONS_METIER_106.map((sit) => {
            const isSelected = sit.id === situation.id;
            return (
              <button
                key={sit.id}
                type="button"
                onClick={() => {
                  setSelectedSitId(sit.id);
                  playClickSound();
                  triggerHaptic();
                }}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                }`}
              >
                {sit.titre.split(" (")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Segmented Tabs — Mobile Scrollable */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTab("leplat");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === "leplat"
              ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="size-3.5 shrink-0" />
          <span>1. Grille Leplat &amp; Hoc (Régulation)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("clot");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === "clot"
              ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Brain className="size-3.5 shrink-0" />
          <span>2. Clinique de l&apos;Activité (Clot)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("protocole");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === "protocole"
              ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Workflow className="size-3.5 shrink-0" />
          <span>3. Démarche d&apos;Intervention CNAM</span>
        </button>
      </div>

      {/* TAB 1 : LEPLAT & HOC */}
      {activeTab === "leplat" && <LeplatHocTabView situation={situation} />}

      {/* TAB 2 : YVES CLOT */}
      {activeTab === "clot" && <ClotTabView situation={situation} />}

      {/* TAB 3 : PROTOCOLE ERGONOMIQUE */}
      {activeTab === "protocole" && <ProtocoleTabView situation={situation} />}
    </div>
  );
}

export default LaboDiagnostic106;
