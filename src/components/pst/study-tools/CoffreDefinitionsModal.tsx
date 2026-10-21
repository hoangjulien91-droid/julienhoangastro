"use client";

import { useMemo, useState } from "react";
import {
  DEFINITIONS_CANONIQUES,
  type DefinitionCanonique,
} from "@/lib/pst/data/definitions-canoniques";
import {
  X,
  BookMarked,
  Search,
  Eye,
  EyeOff,
  Copy,
  Check,
  Headphones,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface CoffreDefinitionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function CoffreDefinitionsModal({
  isOpen,
  onClose,
  defaultModule,
}: CoffreDefinitionsModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [query, setQuery] = useState("");
  const [revealedSet, setRevealedSet] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = DEFINITIONS_CANONIQUES.filter((d) => {
    if (selectedModule !== "all" && !d.modules.includes(selectedModule)) {
      return false;
    }
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      d.terme.toLowerCase().includes(q) ||
      d.auteur.toLowerCase().includes(q) ||
      d.definitionOfficielle.toLowerCase().includes(q) ||
      d.motsClesObligatoires.some((m) => m.toLowerCase().includes(q))
    );
  });

  function toggleReveal(id: string) {
    triggerHaptic("selection");
    playClickSound();
    setRevealedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function revealAll() {
    triggerHaptic("selection");
    playClickSound();
    setRevealedSet(new Set(filtered.map((d) => d.id)));
  }

  function hideAll() {
    triggerHaptic("selection");
    playClickSound();
    setRevealedSet(new Set());
  }

  function copyDef(d: DefinitionCanonique) {
    triggerHaptic("success");
    playSuccessSound();
    const text = `${d.terme} (${d.auteur})\n\nDÉFINITION OFFICIELLE (CNAM) :\n${d.definitionOfficielle}\n\nMOTS-CLÉS OBLIGATOIRES :\n${d.motsClesObligatoires.join(" · ")}\n\nEXEMPLE :\n${d.exemplePratique}`;
    navigator.clipboard.writeText(text);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function playAudioDef(d: DefinitionCanonique) {
    triggerHaptic("selection");
    playClickSound();
    const text = `Définition canonique de ${d.terme}, selon ${d.auteur}. ${d.definitionOfficielle}. Exemple d'application : ${d.exemplePratique}.`;
    window.dispatchEvent(
      new CustomEvent("pst:play-audio", {
        detail: {
          title: `Définition : ${d.terme}`,
          author: d.auteur,
          moduleKey: d.modules[0],
          text,
        },
      }),
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-5 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER MODAL iOS */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600">
              <BookMarked className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                  Standard 18+/20 Cnam
                </span>
                <span className="text-xs text-slate-500">Mots-clés obligatoires</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                Le Coffre-fort des Définitions Canoniques
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* BARRE DE CONTRÔLE : FILTRES MODULES & RECHERCHE */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* iOS Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule("all");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedModule === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Tous ({DEFINITIONS_CANONIQUES.length})
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule("pst108");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedModule === "pst108"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              PST108
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule("pst106");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedModule === "pst106"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              PST106
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule("pst123");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedModule === "pst123"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              PST123
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={revealAll}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Tout afficher
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={hideAll}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Tout masquer (Auto-test)
            </button>
          </div>
        </div>

        {/* INPUT DE RECHERCHE RAPIDE */}
        <div className="relative">
          <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un concept (ex: habitus, agir communicationnel, activité empêchée, IOD, réification)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* LISTE DES CARTES DE DÉFINITIONS CANONIQUES */}
        <div className="space-y-4">
          {filtered.map((d) => {
            const isRevealed = revealedSet.has(d.id);
            return (
              <div
                key={d.id}
                className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3 transition-all hover:border-indigo-400"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 m-0">
                      {d.terme}
                    </h3>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      ({d.auteur})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {d.modules.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase"
                      >
                        {m}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => toggleReveal(d.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                      title={isRevealed ? "Masquer la définition" : "Révéler la définition"}
                    >
                      {isRevealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* MOTS-CLÉS OBLIGATOIRES POUR LA NOTE MAXIMALE */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                    Mots indispensables :
                  </span>
                  {d.motsClesObligatoires.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* CORPS DE LA DÉFINITION (AVEC MODE MASQUÉ / AUTO-TEST) */}
                {isRevealed ? (
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif animate-fadeIn">
                    {d.definitionOfficielle}
                  </div>
                ) : (
                  <div
                    onClick={() => toggleReveal(d.id)}
                    className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500 cursor-pointer hover:bg-slate-200/60 dark:hover:bg-slate-750 transition-all"
                  >
                    🙈 Définition masquée pour auto-test. Récitez les mots-clés dans votre tête puis <b>cliquez ici pour révéler</b>.
                  </div>
                )}

                {/* EXEMPLE & PIÈGE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                      Exemple de travail réel :
                    </span>
                    {d.exemplePratique}
                  </div>

                  {d.piegeConfondreAvec && (
                    <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
                      <span className="font-bold block mb-0.5">⚠️ Attention :</span>
                      {d.piegeConfondreAvec}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => playAudioDef(d)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Headphones className="size-3.5" />
                    <span>Écouter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copyDef(d)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === d.id ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    <span>{copiedId === d.id ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
