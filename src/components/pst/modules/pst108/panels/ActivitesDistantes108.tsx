"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  BookOpen,
  Sparkles,
  ExternalLink,
  Headphones,
  Building2,
  Users,
  GraduationCap,
} from "lucide-react";
import {
  PST108_AD_DATA,
  PST108_UNIFIED_ADS,
  type Pst108TeacherAd,
} from "@/lib/pst/data/pst108-ad";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { AdInteractiveWorkspace } from "@/components/pst/modules/shared/panels/AdInteractiveWorkspace";
import { AdTeacherMarotSection } from "./ad/AdTeacherMarotSection";
import { AdTeacherVallsSection } from "./ad/AdTeacherVallsSection";
import { AdTeacherLucySection } from "./ad/AdTeacherLucySection";

export function ActivitesDistantes108() {
  const [mode, setMode] = useState<"workspace" | "professeurs">("workspace");
  const [activeProf, setActiveProf] = useState<"lucy" | "valls" | "marot">("marot");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCasId, setExpandedCasId] = useState<string | null>(null);

  // Sous-onglets spécifiques pour Francis Valls
  const [vallsTab, setVallsTab] = useState<"exercices" | "cas" | "theorie" | "docs">("exercices");
  const [selectedExNum, setSelectedExNum] = useState<number>(1);

  // Sous-onglets spécifiques pour Véronique Marot
  const [marotTab, setMarotTab] = useState<"dispositifs" | "ad_miossec" | "theorie" | "textes">("dispositifs");
  const [selectedDispId, setSelectedDispId] = useState<string>("marot-disp-sosie");
  const [selectedAdDate, setSelectedAdDate] = useState<"04nov" | "10nov">("04nov");

  const teacherData: Pst108TeacherAd = PST108_AD_DATA[activeProf];

  function handleCopy(text: string, key: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 3000);
      playSuccessSound();
    }
  }

  // Filtrage des documents (pour M. Lucy)
  const filteredDocs = useMemo(() => {
    let docs = teacherData.documentsClefs;
    if (activeProf === "lucy" && selectedCat !== "all") {
      docs = docs.filter((d) => d.categorie === selectedCat);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      docs = docs.filter(
        (d) =>
          d.titre.toLowerCase().includes(q) ||
          d.auteur.toLowerCase().includes(q) ||
          d.fichierLocal.toLowerCase().includes(q) ||
          d.concept18.toLowerCase().includes(q) ||
          d.resumePedagogique.toLowerCase().includes(q),
      );
    }
    return docs;
  }, [teacherData.documentsClefs, activeProf, selectedCat, searchQuery]);

  return (
    <div className="space-y-6">
      {/* ── BANDEAU OFFICIEL SÉANCE CNAM PST108 ───────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-amber-500/15 border border-indigo-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30 flex items-center gap-1.5">
              <Calendar className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Semestre 1 · Cnam Nouvelle-Aquitaine</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-500/30">
              3 Enseignants Responsables
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30">
              Moodle Synchronisé
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            PST108 · Psychologie du Langage &amp; Clinique du Dialogue
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
            Activités Distantes (AD) &amp; Travaux Préparatoires aux Webconférences
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
            Retrouvez pour chaque enseignant l&apos;ensemble des consignes officielles, des modèles de réponses rédigés (critères 18/20), des études de cas, des dispositifs d&apos;intervention et des textes ressources.
          </p>
        </div>
      </div>

      {/* ── SÉLECTEUR DE MODE : ESPACE RÉDACTION VS RESSOURCES PROFESSEURS ── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setMode("workspace");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            mode === "workspace"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="size-4 text-amber-300" />
          <span>Espace Rédaction Interactif ({PST108_UNIFIED_ADS.length} AD PST108) ✦</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setMode("professeurs");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            mode === "professeurs"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="size-4" />
          <span>Ressources &amp; Dispositifs des 3 Profs (Marot, Valls, Lucy)</span>
        </button>
      </div>

      {mode === "workspace" ? (
        <div className="animate-fadeIn">
          <AdInteractiveWorkspace
            ads={PST108_UNIFIED_ADS}
            moduleTheme="amber"
          />
        </div>
      ) : (
        <>
          {/* ── SÉLECTEUR DES 3 PROFESSEURS ──────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveProf("marot");
                setSelectedDocId(null);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeProf === "marot"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Users className="size-4 shrink-0" />
              <div className="text-left">
                <div>Mme Véronique MAROT ✦</div>
                <div className="text-[10px] font-normal opacity-80">Sosie, Autoconfrontation &amp; AD 04/11 &amp; 10/11</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveProf("valls");
                setSelectedDocId(null);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeProf === "valls"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Building2 className="size-4 shrink-0" />
              <div className="text-left">
                <div>M. Francis VALLS ✦</div>
                <div className="text-[10px] font-normal opacity-80">Approche psychosociale &amp; Exercices 1-2-3</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveProf("lucy");
                setSelectedDocId(null);
                setSelectedCat("all");
              }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeProf === "lucy"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              <GraduationCap className="size-4 shrink-0" />
              <div className="text-left">
                <div>M. Éric LUCY (31 docs &amp; AD)</div>
                <div className="text-[10px] font-normal opacity-80">Pragmatique, Reconnaissance &amp; Tour de Babel</div>
              </div>
            </button>
          </div>

          {/* ── EN-TÊTE DU MODULE DE L'ENSEIGNANT CHOISI ────────────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                    {teacherData.prof}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    Moodle : {teacherData.moodleSectionId}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {teacherData.role} · <em>{teacherData.themeGeneral}</em>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={teacherData.moodleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                >
                  <span>Accéder à l&apos;espace Moodle</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Podcast Philorama (pour Lucy) */}
            {teacherData.audioResource && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 mt-0.5">
                    <Headphones className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {teacherData.audioResource.title}
                      </span>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-200">
                        {teacherData.audioResource.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {teacherData.audioResource.summary}
                    </p>
                  </div>
                </div>
                <a
                  href={teacherData.audioResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs shrink-0"
                >
                  <span>Écouter le podcast</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── CONTENU SPÉCIFIQUE MME VÉRONIQUE MAROT ───────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeProf === "marot" && (
            <AdTeacherMarotSection
              teacherData={teacherData}
              marotTab={marotTab}
              onMarotTabChange={setMarotTab}
              selectedAdDate={selectedAdDate}
              onSelectAdDate={setSelectedAdDate}
              selectedDispId={selectedDispId}
              onSelectDispId={setSelectedDispId}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
              onCopy={handleCopy}
              copiedKey={copiedKey}
            />
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── CONTENU M. FRANCIS VALLS ────────────────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeProf === "valls" && (
            <AdTeacherVallsSection
              teacherData={teacherData}
              vallsTab={vallsTab}
              onVallsTabChange={setVallsTab}
              selectedExNum={selectedExNum}
              onSelectExNum={setSelectedExNum}
              expandedCasId={expandedCasId}
              onToggleExpandedCasId={setExpandedCasId}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
              onCopy={handleCopy}
              copiedKey={copiedKey}
            />
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── CONTENU M. ÉRIC LUCY (31 DOCUMENTS & AD) ─────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeProf === "lucy" && (
            <AdTeacherLucySection
              teacherData={teacherData}
              selectedCat={selectedCat}
              onSelectCat={setSelectedCat}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              filteredDocs={filteredDocs}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
              onCopy={handleCopy}
              copiedKey={copiedKey}
            />
          )}
        </>
      )}
    </div>
  );
}
