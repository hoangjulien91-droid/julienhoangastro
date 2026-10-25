"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Copy,
  Check,
  Search,
  Sparkles,
  AlertTriangle,
  FileText,
  GraduationCap,
  Scale,
  Video,
  Users,
  Send,
  ArrowRight,
  ExternalLink,
  Table,
} from "lucide-react";
import { toast } from "sonner";
import {
  type SeanceCoursItem,
  type SeancePointCle,
  SEANCES_COURS_DATA,
} from "@/lib/pst/data/seances-cours";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SeancesCoursPanelProps {
  moduleKey: "pst106" | "pst108" | "pst123";
  onGoTab?: (tabId: string) => void;
}

export function SeancesCoursPanel({
  moduleKey,
  onGoTab,
}: SeancesCoursPanelProps) {
  const seances = useMemo(() => {
    return SEANCES_COURS_DATA.filter((s) => s.moduleKey === moduleKey);
  }, [moduleKey]);

  const [selectedSeanceId, setSelectedSeanceId] = useState<string>(
    seances[0]?.id || "",
  );
  const [activeTab, setActiveTab] = useState<
    "synthese" | "transcription" | "consignes"
  >("synthese");
  const [verbatimSearch, setVerbatimSearch] = useState<string>("");
  const [copiedVerbatim, setCopiedVerbatim] = useState<boolean>(false);

  const activeSeance = useMemo(() => {
    return seances.find((s) => s.id === selectedSeanceId) || seances[0];
  }, [seances, selectedSeanceId]);

  function handleCopyVerbatim() {
    if (!activeSeance) return;
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        activeSeance.transcriptionIntegraleVerbatim,
      );
      setCopiedVerbatim(true);
      playSuccessSound();
      triggerHaptic();
      toast.success("Transcription intégrale copiée dans le presse-papier !");
      setTimeout(() => setCopiedVerbatim(false), 3000);
    }
  }

  // Filtrage du texte verbatim selon la recherche
  const highlightedVerbatim = useMemo(() => {
    if (!activeSeance) return "";
    const raw = activeSeance.transcriptionIntegraleVerbatim;
    if (!verbatimSearch.trim()) return raw;
    return raw;
  }, [activeSeance, verbatimSearch]);

  const matchCount = useMemo(() => {
    if (!activeSeance || !verbatimSearch.trim()) return 0;
    const q = verbatimSearch.toLowerCase();
    const count = (
      activeSeance.transcriptionIntegraleVerbatim.toLowerCase().match(
        new RegExp(q, "g"),
      ) || []
    ).length;
    return count;
  }, [activeSeance, verbatimSearch]);

  if (!activeSeance) {
    return (
      <div className="p-12 text-center text-neutral-400 bg-neutral-900/50 border border-neutral-800 rounded-3xl">
        <BookOpen className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white">
          Aucun cours retranscrit pour le moment
        </h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
          Les séances enregistrées et les retranscriptions écrites de ce module
          seront ajoutées au fil du semestre.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barre de sélection des séances disponibles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          {seances.map((seance) => {
            const isSelected = seance.id === activeSeance.id;
            return (
              <button
                key={seance.id}
                onClick={() => {
                  playClickSound();
                  setSelectedSeanceId(seance.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  isSelected
                    ? "bg-amber-950/70 text-amber-300 border-amber-800/80 shadow-sm"
                    : "bg-neutral-800/40 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                <Video className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Séance {seance.numeroSeance}</span>
                <span className="text-[10px] opacity-75 font-mono">
                  ({seance.dateSeance})
                </span>
              </button>
            );
          })}
        </div>

        {/* Onglets internes */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab("synthese");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "synthese"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Synthèse &amp; Notes</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab("transcription");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "transcription"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Transcription Intégrale</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab("consignes");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "consignes"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Consignes du Prof ({activeSeance.consignesOralesProf.length})</span>
          </button>
        </div>
      </div>

      {/* En-tête de la séance active */}
      <div className="p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 font-mono font-bold uppercase rounded-md bg-amber-950 text-amber-300 border border-amber-800">
              {activeSeance.moduleLabel} · Séance {activeSeance.numeroSeance}
            </span>
            <span className="text-neutral-400">
              Enseignant : <b className="text-white">{activeSeance.enseignant}</b>
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {activeSeance.dateSeance}
            </span>
            {activeSeance.dureeEnregistrement && (
              <>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {activeSeance.dureeEnregistrement}
                </span>
              </>
            )}
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/80">
            ✓ Cours certifié conforme
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {activeSeance.titre}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {activeSeance.sousTitre}
          </p>
        </div>

        {/* Résumé exécutif en puces */}
        <div className="p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Repères fondamentaux abordés lors de la séance :
          </span>
          <ul className="text-xs text-neutral-300 space-y-1.5 pl-4 list-disc leading-relaxed">
            {activeSeance.resumeExecutif.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── ONGLET 1 : SYNTHÈSE & NOTES DE CORDÉE ───────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "synthese" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Modalités officielles de l'examen si renseignées */}
          {activeSeance.modalitesExamen && (
            <div className="p-5 bg-gradient-to-r from-purple-950/30 via-neutral-900 to-indigo-950/30 border border-purple-800/40 rounded-3xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-purple-400" />
                  Modalités d&apos;examen annoncées par {activeSeance.enseignant}
                </span>
                <span className="text-xs font-mono text-purple-300 font-bold bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800">
                  Épreuve de {activeSeance.modalitesExamen.duree} · Sans documents
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-400 font-semibold block">
                    Dates des deux sessions officielles :
                  </span>
                  <div className="text-white font-mono font-medium">
                    Session 1 :{" "}
                    <b className="text-amber-400">
                      {activeSeance.modalitesExamen.session1Date}
                    </b>
                  </div>
                  <div className="text-white font-mono font-medium">
                    Session 2 :{" "}
                    <b className="text-amber-400">
                      {activeSeance.modalitesExamen.session2Date}
                    </b>
                  </div>
                </div>

                <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-400 font-semibold block">
                    Format des sujets d&apos;examen :
                  </span>
                  <ul className="text-neutral-300 space-y-1 pl-4 list-disc">
                    {activeSeance.modalitesExamen.optionsAuChoix.map(
                      (opt, oIdx) => (
                        <li key={oIdx}>{opt}</li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <p className="text-xs text-purple-200/90 italic bg-purple-950/40 p-2.5 rounded-xl border border-purple-900/40">
                💡 Recommandation de l&apos;enseignante :{" "}
                {activeSeance.modalitesExamen.recommandationsNotation}
              </p>
            </div>
          )}

          {/* Sections rédigées du cours */}
          <div className="space-y-4">
            {activeSeance.syntheseSections.map((sec) => (
              <div
                key={sec.numero}
                className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                    {sec.numero}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {sec.titre}
                  </h3>
                </div>

                <div className="space-y-3 pt-1">
                  {sec.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 bg-neutral-950/60 rounded-xl border border-neutral-800/80 space-y-1.5"
                    >
                      <h4 className="text-xs sm:text-sm font-semibold text-neutral-200">
                        {pt.titre}
                      </h4>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {pt.contenu}
                      </p>
                      {pt.auteurs && pt.auteurs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {pt.auteurs.map((aut, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono"
                            >
                              {aut}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tableaux comparatifs interactifs (ex: Piaget vs Vygotski) */}
          {activeSeance.tableauxComparatifs &&
            activeSeance.tableauxComparatifs.length > 0 && (
              <div className="space-y-4">
                {activeSeance.tableauxComparatifs.map((tab, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-3 shadow-md overflow-x-auto"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Table className="w-4 h-4 text-amber-400" />
                      <span>{tab.titre}</span>
                    </div>
                    {tab.description && (
                      <p className="text-xs text-neutral-400 italic">
                        {tab.description}
                      </p>
                    )}

                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-800 bg-neutral-950">
                          {tab.colonnes.map((col, cIdx) => (
                            <th
                              key={cIdx}
                              className="p-3 font-semibold text-neutral-300 uppercase tracking-wider text-[11px]"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 font-sans">
                        {tab.lignes.map((lig, lIdx) => (
                          <tr
                            key={lIdx}
                            className="hover:bg-neutral-800/30 transition-colors"
                          >
                            <td className="p-3 font-bold text-amber-300 whitespace-nowrap align-top">
                              {lig.axe}
                            </td>
                            {lig.valeurs.map((val, vIdx) => (
                              <td
                                key={vIdx}
                                className="p-3 text-neutral-300 leading-relaxed align-top"
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

          {/* Rectifications factuelles et pièges d'examen */}
          {activeSeance.rectificationsExamen &&
            activeSeance.rectificationsExamen.length > 0 && (
              <div className="p-5 bg-amber-950/15 border border-amber-800/30 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>
                    Notes Critiques &amp; Rectifications Factuelles pour l&apos;Examen
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {activeSeance.rectificationsExamen.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 bg-neutral-950/80 rounded-2xl border border-neutral-800 space-y-1.5"
                    >
                      <span className="font-bold text-white block">
                        {rec.titre}
                      </span>
                      <div className="text-red-400/90 line-through">
                        Erreur fréquente : {rec.erreurCourante}
                      </div>
                      <div className="text-emerald-300 font-medium leading-relaxed">
                        ✓ Rectification attendue : {rec.rectificationAttendue}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono block pt-1">
                        {rec.contexte}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Bibliographie citée dans la séance */}
          {activeSeance.bibliographieCitee.length > 0 && (
            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Ouvrages &amp; références clés recommandés par l&apos;enseignant :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeSeance.bibliographieCitee.map((b, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-0.5"
                  >
                    <span className="font-bold text-white block">
                      {b.titre}
                    </span>
                    <span className="text-amber-400 text-[11px] font-mono">
                      {b.auteur} {b.annee ? `(${b.annee})` : ""}
                    </span>
                    <p className="text-neutral-400 text-[11px] leading-snug pt-1">
                      {b.remarque}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── ONGLET 2 : RETRANSCRIPTION INTÉGRALE VERBATIM ──────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "transcription" && (
        <div className="p-6 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-4 shadow-xl animate-fadeIn">
          {/* Barre d'outils et recherche instantanée */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                Texte intégral mot à mot de la séance
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={verbatimSearch}
                  onChange={(e) => setVerbatimSearch(e.target.value)}
                  placeholder="Rechercher mot, auteur, consigne..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-xl focus:outline-none focus:border-amber-500 w-48 sm:w-64"
                />
              </div>

              {matchCount > 0 && (
                <span className="text-[11px] font-mono px-2 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800">
                  {matchCount} occurrence{matchCount > 1 ? "s" : ""}
                </span>
              )}

              <button
                onClick={handleCopyVerbatim}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors flex items-center gap-1.5"
              >
                {copiedVerbatim ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Tout copier
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Affichage du texte verbatim avec scroll agréable */}
          <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans bg-neutral-950 p-5 rounded-2xl border border-neutral-800/80 whitespace-pre-line max-h-[600px] overflow-y-auto">
            {highlightedVerbatim}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── ONGLET 3 : CONSIGNES DU PROF & TRAVAIL À PRÉPARER (AD) ─────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "consignes" && (
        <div className="space-y-4 animate-fadeIn">
          {activeSeance.consignesOralesProf.map((c, cIdx) => (
            <div
              key={cIdx}
              className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-800">
                    Consigne #{cIdx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {c.titre}
                  </h3>
                </div>

                <span className="text-xs text-amber-400 font-mono font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Échéance : {c.echeance}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
                <span className="font-semibold text-neutral-400 block mb-1">
                  Consigne exacte formulée par {activeSeance.enseignant} :
                </span>
                {c.consigneExacte}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-neutral-400">
                <div>
                  <span className="font-semibold text-neutral-300">
                    Modalité de rendu :{" "}
                  </span>
                  <span>{c.modaliteRendu}</span>
                </div>

                {c.lienAdId && onGoTab && (
                  <button
                    onClick={() => {
                      playClickSound();
                      onGoTab("ad");
                    }}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Rédiger cette AD dans l&apos;espace dédié</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
