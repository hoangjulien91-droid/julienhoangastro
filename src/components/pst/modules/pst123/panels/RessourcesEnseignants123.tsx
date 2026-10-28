"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Sparkles,
  FileCode,
  GraduationCap,
  Layers,
  Bookmark,
  Scale,
  Brain,
  Users,
  Compass,
} from "lucide-react";
import {
  PST123_OFFICIAL_RESOURCES,
  type Pst123OfficialResource,
} from "@/lib/pst/data/pst123-ressources";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function RessourcesEnseignants123() {
  const [filterAuthor, setFilterAuthor] = useState<string>("ALL");
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return PST123_OFFICIAL_RESOURCES.filter((res) => {
      if (filterAuthor !== "ALL" && res.authorFilter !== filterAuthor) {
        return false;
      }
      if (filterCat !== "ALL" && res.category !== filterCat) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.authors.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.keyTakeaway.toLowerCase().includes(q) ||
        (res.localFile && res.localFile.toLowerCase().includes(q)) ||
        res.seanceNumber.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filterAuthor, filterCat, search]);

  const handleCopyApa = (id: string, apa: string) => {
    playSuccessSound();
    triggerHaptic();
    navigator.clipboard.writeText(apa);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyTakeaway = (id: string, takeaway: string) => {
    playSuccessSound();
    triggerHaptic();
    navigator.clipboard.writeText(takeaway);
    setCopiedId(`takeaway_${id}`);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyAll = () => {
    playSuccessSound();
    triggerHaptic();
    const fullText = filteredResources
      .map(
        (r) =>
          `• [${r.seanceNumber}] ${r.title} (${r.authors}, ${r.year})\n  Citation APA 7 : ${r.apa7Citation}\n  Usage Examen Cnam : ${r.keyTakeaway}${
            r.localFile ? `\n  Fichier source (Bureau PST123) : ${r.localFile}` : ""
          }${r.url ? `\n  Lien direct : ${r.url}` : ""}`,
      )
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedId("ALL");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const countsByAuthor = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST123_OFFICIAL_RESOURCES.length,
      Dubar: PST123_OFFICIAL_RESOURCES.filter((r) => r.authorFilter === "Dubar").length,
      Bourdieu: PST123_OFFICIAL_RESOURCES.filter((r) => r.authorFilter === "Bourdieu").length,
      Sainsaulieu: PST123_OFFICIAL_RESOURCES.filter((r) => r.authorFilter === "Sainsaulieu").length,
      "Piaget / Épistémologie": PST123_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Piaget / Épistémologie"
      ).length,
      Honneth: PST123_OFFICIAL_RESOURCES.filter((r) => r.authorFilter === "Honneth").length,
      "Le Bianic / Déonto": PST123_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Le Bianic / Déonto"
      ).length,
      "Weber / Travail": PST123_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Weber / Travail"
      ).length,
      "E. Lucy (Cnam)": PST123_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "E. Lucy (Cnam)"
      ).length,
    };
    return map;
  }, []);

  const countsByCat = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST123_OFFICIAL_RESOURCES.length,
      bourdieu: PST123_OFFICIAL_RESOURCES.filter((r) => r.category === "bourdieu").length,
      epistemologie: PST123_OFFICIAL_RESOURCES.filter((r) => r.category === "epistemologie").length,
      dubar: PST123_OFFICIAL_RESOURCES.filter((r) => r.category === "dubar").length,
      sainsaulieu: PST123_OFFICIAL_RESOURCES.filter((r) => r.category === "sainsaulieu").length,
      honneth: PST123_OFFICIAL_RESOURCES.filter((r) => r.category === "honneth").length,
      psychologue_deonto: PST123_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "psychologue_deonto"
      ).length,
      sociologie_travail: PST123_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "sociologie_travail"
      ).length,
      cours_lucy: PST123_OFFICIAL_RESOURCES.filter((r) => r.category === "cours_lucy").length,
    };
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/25 dark:border-indigo-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5 shadow-2xs">
                <BookOpen className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Corpus Officiel Intégré — Élisabeth LUCY</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                PST123 · Dossier Bureau &quot;Documents ressources Fichier-20261019&quot;
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
              Textes Auteurs, Épistémologie, Bourdieu &amp; Dubar ({PST123_OFFICIAL_RESOURCES.length} documents indexés)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0 max-w-3xl leading-relaxed">
              Tous les documents ressources de votre dossier bureau PST123 (Cairn Dubar/Sainsaulieu, articles de Bourdieu,
              textes épistémologiques de Piaget &amp; Honneth, déontologie Le Bianic) analysés et synthétisés avec leurs citations APA 7 et leurs arguments stratégiques pour l&apos;examen.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyAll}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
            title="Copier l'ensemble des citations académiques au format APA 7e"
          >
            {copiedId === "ALL" ? (
              <>
                <Check className="size-3.5" />
                <span>Bibliographie copiée !</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copier toute la biblio APA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Control Panel: Filters & Search */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 backdrop-blur-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Rechercher dans les ressources enseignants PST123"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par auteur (Bourdieu, Dubar, Honneth, Piaget), concept (habitus, double transaction), fichier ou séance..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Filter Pills by Author */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
            <GraduationCap className="size-3 text-indigo-500" />
            <span>Filtrer par Auteur Référent :</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: `Tous (${countsByAuthor.ALL})` },
              { id: "Dubar", label: `Claude Dubar (${countsByAuthor.Dubar})` },
              { id: "Bourdieu", label: `Pierre Bourdieu (${countsByAuthor.Bourdieu})` },
              { id: "Sainsaulieu", label: `Renaud Sainsaulieu (${countsByAuthor.Sainsaulieu})` },
              { id: "Honneth", label: `Axel Honneth (${countsByAuthor.Honneth})` },
              { id: "Piaget / Épistémologie", label: `Piaget & Épistémo (${countsByAuthor["Piaget / Épistémologie"]})` },
              { id: "Le Bianic / Déonto", label: `Le Bianic & Déonto (${countsByAuthor["Le Bianic / Déonto"]})` },
              { id: "Weber / Travail", label: `Weber & Société (${countsByAuthor["Weber / Travail"]})` },
              { id: "E. Lucy (Cnam)", label: `Syllabus E. Lucy (${countsByAuthor["E. Lucy (Cnam)"]})` },
            ].map((btn) => {
              const active = filterAuthor === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilterAuthor(btn.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Pills by Category */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
            <Layers className="size-3 text-purple-500" />
            <span>Thématique du cours :</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: `Toutes thématiques (${countsByCat.ALL})` },
              { id: "bourdieu", label: `Bourdieu & Habitus (${countsByCat.bourdieu})` },
              { id: "epistemologie", label: `Épistémologie (${countsByCat.epistemologie})` },
              { id: "dubar", label: `Dubar & Socialisation (${countsByCat.dubar})` },
              { id: "sainsaulieu", label: `Sainsaulieu & Modèles (${countsByCat.sainsaulieu})` },
              { id: "honneth", label: `Honneth & Reconnaissance (${countsByCat.honneth})` },
              { id: "psychologue_deonto", label: `Psychologue & Déontologie (${countsByCat.psychologue_deonto})` },
              { id: "sociologie_travail", label: `Travail & Dominations (${countsByCat.sociologie_travail})` },
              { id: "cours_lucy", label: `Supports Cours Cnam (${countsByCat.cours_lucy})` },
            ].map((btn) => {
              const active = filterCat === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilterCat(btn.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs transition cursor-pointer flex items-center gap-1 ${
                    active
                      ? "bg-purple-600 text-white font-semibold"
                      : "bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-mono">
        <span>
          Affichage de <b>{filteredResources.length}</b> document(s) sur{" "}
          {PST123_OFFICIAL_RESOURCES.length}
        </span>
        {(filterAuthor !== "ALL" || filterCat !== "ALL" || search) && (
          <button
            onClick={() => {
              setFilterAuthor("ALL");
              setFilterCat("ALL");
              setSearch("");
            }}
            className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const isCopied = copiedId === res.id;
          const isTakeawayCopied = copiedId === `takeaway_${res.id}`;

          return (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Badges: Category & Seance */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60">
                      {res.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60">
                      {res.seanceNumber}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    {res.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
                  {res.title}
                </h3>

                {/* Authors & Publisher */}
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">
                    {res.authors}
                  </span>
                  {res.sourceOrPublisher && (
                    <span> · {res.sourceOrPublisher}</span>
                  )}
                </div>

                {/* Local file indicator */}
                {res.localFile && (
                  <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                    <FileCode className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="truncate">
                      Dossier bureau : <b>{res.localFile}</b>
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                  {res.description}
                </p>

                {/* Key takeaway for exam */}
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                      <Sparkles className="size-3 text-indigo-500" />
                      <span>Argument d&apos;examen Cnam :</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTakeaway(res.id, res.keyTakeaway)}
                      className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isTakeawayCopied ? (
                        <>
                          <Check className="size-2.5 text-emerald-600" />
                          <span className="text-emerald-600">Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-2.5" />
                          <span>Copier argument</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium m-0">
                    {res.keyTakeaway}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom APA Citation, Web Link & Copy Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full sm:max-w-[65%]">
                  <span className="font-bold">APA 7 :</span> {res.apa7Citation}
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {res.url && (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1 transition"
                      title="Consulter l'article en ligne (Cairn / Persée)"
                    >
                      <ExternalLink className="size-3" />
                      <span>Consulter</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCopyApa(res.id, res.apa7Citation)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      isCopied
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                    title="Copier la citation académique APA 7e"
                  >
                    {isCopied ? (
                      <>
                        <Check className="size-3 text-white" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copier APA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
