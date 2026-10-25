"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter,
  BarChart2,
  Calendar,
  Send,
  ExternalLink,
  Search,
  Check,
  Copy,
  Layers,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import {
  type UnifiedAdItem,
  type AdStatus,
  AD_STATUS_CONFIG,
  loadAdStatus,
  saveAdStatus,
  loadAdDraft,
} from "@/lib/pst/data/ad-common";
import { PST106_UNIFIED_ADS } from "@/lib/pst/data/pst106-ad";
import { PST108_UNIFIED_ADS } from "@/lib/pst/data/pst108-ad";
import { PST123_AD_DATA } from "@/lib/pst/data/pst123-ad";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface TableauBordAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TableauBordAdModal({ isOpen, onClose }: TableauBordAdModalProps) {
  const [moduleFilter, setModuleFilter] = useState<"all" | "pst106" | "pst108" | "pst123">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | AdStatus>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tick, setTick] = useState<number>(0);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Toutes les AD du Semestre 1 réunies
  const allAds: UnifiedAdItem[] = useMemo(() => {
    return [...PST106_UNIFIED_ADS, ...PST108_UNIFIED_ADS, ...PST123_AD_DATA];
  }, []);

  // Écoute des mises à jour des ADs depuis les autres onglets / composants
  useEffect(() => {
    function handleUpdate() {
      setTick((t) => t + 1);
    }
    window.addEventListener("pst:ad-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("pst:ad-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Fermeture par Échap
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Statuts live pour chaque AD
  const adsWithLiveState = useMemo(() => {
    return allAds.map((ad) => {
      const status = loadAdStatus(ad.id, "todo");
      const draft = loadAdDraft(ad.id, "");
      const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
      return { ...ad, currentStatus: status, wordCount, hasDraft: draft.trim().length > 0 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAds, tick]);

  // Statistiques globales
  const stats = useMemo(() => {
    const total = adsWithLiveState.length;
    const todo = adsWithLiveState.filter((a) => a.currentStatus === "todo").length;
    const draft = adsWithLiveState.filter((a) => a.currentStatus === "draft").length;
    const ready = adsWithLiveState.filter((a) => a.currentStatus === "ready").length;
    const submitted = adsWithLiveState.filter((a) => a.currentStatus === "submitted").length;
    const corrected = adsWithLiveState.filter((a) => a.currentStatus === "corrected").length;
    const completed = submitted + corrected;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, todo, draft, ready, submitted, corrected, completed, percent };
  }, [adsWithLiveState]);

  // Filtrage
  const filteredAds = useMemo(() => {
    return adsWithLiveState.filter((ad) => {
      if (moduleFilter !== "all" && ad.moduleKey !== moduleFilter) return false;
      if (statusFilter !== "all" && ad.currentStatus !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = ad.titre.toLowerCase().includes(q);
        const matchProf = ad.enseignant.toLowerCase().includes(q);
        const matchConcepts = ad.conceptsCles.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchProf && !matchConcepts) return false;
      }
      return true;
    });
  }, [adsWithLiveState, moduleFilter, statusFilter, searchQuery]);

  function handleStatusChange(adId: string, newStatus: AdStatus) {
    playClickSound();
    saveAdStatus(adId, newStatus);
    setTick((t) => t + 1);
    toast.success(`Statut mis à jour : ${AD_STATUS_CONFIG[newStatus].label}`);
  }

  function handleNavigateToAd(ad: UnifiedAdItem) {
    playClickSound();
    onClose();
    if (typeof window !== "undefined") {
      window.location.href = `/${ad.moduleKey}?tab=ad`;
    }
  }

  function handleCopySummary() {
    playClickSound();
    const lines = [
      `📊 SUIVI DES ACTIVITÉS DISTANTES S1 (CNAM)`,
      `Progression globale : ${stats.completed}/${stats.total} terminées (${stats.percent}%)`,
      `Statuts : ${stats.submitted} déposées, ${stats.draft} en cours, ${stats.todo} à faire.`,
      "",
      ...adsWithLiveState.map(
        (ad) =>
          `- [${ad.moduleLabel}] ${ad.titre} (${ad.enseignant}) -> ${AD_STATUS_CONFIG[ad.currentStatus].label} (${ad.wordCount} mots)`,
      ),
    ];
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(lines.join("\n"));
      setCopiedSummary(true);
      playSuccessSound();
      triggerHaptic();
      toast.success("Synthèse copiée dans le presse-papier !");
      setTimeout(() => setCopiedSummary(false), 3000);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* En-tête */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-amber-950 text-amber-300 border border-amber-800">
                  Cockpit S1
                </span>
                <span className="text-xs text-neutral-400">
                  13 Travaux Distants · PST106 · PST108 · PST123
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Tableau de Bord Unifié des Activités Distantes (AD)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copié !
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copier la synthèse
                </>
              )}
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barre de KPI et progression globale */}
        <div className="p-4 bg-neutral-950/80 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Progression globale :</span>
              <span className="font-bold text-white font-mono text-sm">
                {stats.completed}/{stats.total}
              </span>
              <span className="text-emerald-400 font-mono font-semibold">
                ({stats.percent}%)
              </span>
            </div>

            <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-neutral-300">
                <b>{stats.submitted}</b> déposées
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-neutral-300">
                <b>{stats.draft}</b> brouillons
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-500" />
              <span className="text-neutral-300">
                <b>{stats.todo}</b> à faire
              </span>
            </div>
          </div>

          {/* Barre de progression visuelle */}
          <div className="w-full md:w-64 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>

        {/* Barre de filtres et recherche */}
        <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          {/* Filtre par module */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
            {(
              [
                { key: "all", label: "Tous (13)" },
                { key: "pst106", label: "PST106 (3)" },
                { key: "pst108", label: "PST108 (6)" },
                { key: "pst123", label: "PST123 (4)" },
              ] as const
            ).map((m) => (
              <button
                key={m.key}
                onClick={() => {
                  playClickSound();
                  setModuleFilter(m.key);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  moduleFilter === m.key
                    ? "bg-neutral-800 text-white shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs bg-neutral-950 text-neutral-300 border border-neutral-800 rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="todo">À faire</option>
              <option value="draft">Brouillon en cours</option>
              <option value="ready">Prête</option>
              <option value="submitted">Déposée sur Moodle</option>
              <option value="corrected">Corrigée</option>
            </select>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher concept, auteur, prof..."
                className="pl-8 pr-3 py-1.5 text-xs bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-xl focus:outline-none focus:border-neutral-600 w-44 sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* Liste des cartes d'AD (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredAds.length === 0 ? (
            <div className="p-12 text-center text-neutral-400 text-sm">
              Aucune activité distante ne correspond aux critères de recherche.
            </div>
          ) : (
            filteredAds.map((ad) => {
              const cfg = AD_STATUS_CONFIG[ad.currentStatus];
              const moduleBadgeColors = {
                pst106: "bg-emerald-950/70 text-emerald-300 border-emerald-800",
                pst108: "bg-amber-950/70 text-amber-300 border-amber-800",
                pst123: "bg-indigo-950/70 text-indigo-300 border-indigo-800",
              }[ad.moduleKey];

              return (
                <div
                  key={ad.id}
                  className="p-4 sm:p-5 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border ${moduleBadgeColors}`}
                        >
                          {ad.moduleLabel}
                        </span>
                        <span className="text-xs text-neutral-400 font-medium">
                          {ad.enseignant}
                        </span>
                        <span className="text-neutral-600">·</span>
                        <span className="text-xs text-neutral-400">
                          {ad.dateSeance}
                        </span>
                        {ad.dateLimite && (
                          <>
                            <span className="text-neutral-600">·</span>
                            <span className="text-xs text-amber-400/90 flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              {ad.dateLimite}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {ad.titre}
                      </h3>
                    </div>

                    {/* Statut & Sélecteur interactif */}
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={ad.currentStatus}
                        onChange={(e) =>
                          handleStatusChange(ad.id, e.target.value as AdStatus)
                        }
                        className={`text-xs font-semibold border rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer ${cfg.badgeClass}`}
                      >
                        {(Object.keys(AD_STATUS_CONFIG) as AdStatus[]).map((k) => (
                          <option key={k} value={k}>
                            {AD_STATUS_CONFIG[k].label}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleNavigateToAd(ad)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors flex items-center gap-1.5"
                      >
                        <span>Ouvrir</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Consigne courte et concepts clés */}
                  <div className="text-xs text-neutral-400 line-clamp-2 leading-relaxed bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-800/60 font-sans">
                    {ad.consigne}
                  </div>

                  {/* Tags concepts & indicateur de brouillon */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-neutral-900 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {ad.conceptsCles.slice(0, 3).map((concept, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800"
                        >
                          {concept}
                        </span>
                      ))}
                      {ad.conceptsCles.length > 3 && (
                        <span className="text-[10px] text-neutral-500 self-center">
                          +{ad.conceptsCles.length - 3} autres
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      {ad.hasDraft ? (
                        <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {ad.wordCount} mots sauvegardés
                        </span>
                      ) : (
                        <span className="text-neutral-500 italic">
                          Pas de brouillon rédigé
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pied de page */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span className="hidden sm:inline">
            💡 Astuce : Vos rédactions sont sauvegardées sur votre navigateur et
            synchronisées en temps réel entre toutes les fenêtres.
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-colors ml-auto sm:ml-0"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
