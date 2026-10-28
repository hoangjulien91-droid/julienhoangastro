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
} from "lucide-react";
import {
  PST108_OFFICIAL_RESOURCES,
} from "@/lib/pst/data/pst108";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function RessourcesEnseignants108() {
  const [filterProf, setFilterProf] = useState<string>("ALL");
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return PST108_OFFICIAL_RESOURCES.filter((res) => {
      if (filterProf !== "ALL" && !res.prof.toLowerCase().includes(filterProf.toLowerCase())) {
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
        res.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filterProf, filterCat, search]);

  const handleCopyApa = (id: string, apa: string) => {
    playSuccessSound();
    triggerHaptic();
    navigator.clipboard.writeText(apa);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyAll = () => {
    playSuccessSound();
    triggerHaptic();
    const fullText = filteredResources
      .map(
        (r) =>
          `• [${r.prof}] ${r.title} (${r.authors}, ${r.year})\n  Citation APA 7 : ${r.apa7Citation}\n  Usage Examen : ${r.keyTakeaway}${
            r.localFile ? `\n  Fichier source : ${r.localFile}` : ""
          }${r.url ? `\n  Lien direct : ${r.url}` : ""}`,
      )
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedId("ALL");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const countsByProf = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST108_OFFICIAL_RESOURCES.length,
      LUCY: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("LUCY")).length,
      MAROT: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("MAROT")).length,
      VALLS: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("VALLS")).length,
      Cnam: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("Cnam")).length,
    };
    return map;
  }, []);

  const countsByCat = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST108_OFFICIAL_RESOURCES.length,
      article_prof: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "article_prof").length,
      texte_fondateur: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "texte_fondateur").length,
      ouvrage_socle: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "ouvrage_socle").length,
      media_audio_video: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "media_audio_video").length,
      etude_cas: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "etude_cas").length,
    };
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-amber-500/10 via-indigo-500/5 to-transparent border border-amber-500/25 dark:border-amber-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 shadow-2xs">
                <BookOpen className="size-3 text-amber-600 dark:text-amber-400" />
                <span>Corpus Officiel Intégré des Enseignants Cnam</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                PST108 · Dossier Ressources 20261019 &amp; Supports de Cours
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
              Articles, Textes Fondateurs, Audios &amp; Documents Plateforme ({PST108_OFFICIAL_RESOURCES.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl m-0">
              L&apos;intégralité des <b>articles envoyés par vos professeurs</b> (Habermas <i>Entre factualité et validité</i>, Honneth <i>La théorie de la reconnaissance : une esquisse</i>, Calori &amp; Koëhl <i>Philosophie et dév. organisationnel</i> Cairn, Fonteneau <i>La société du mépris</i> Cause freudienne, Sarah Hanley <i>Lit de justice</i>), les <b>recherches d&apos;Éric Lucy et Francis Valls</b>, les <b>documents du Cours 1 de Mme Marot</b> (Freud bobine Fort/Da, Vygotski, Clot), et les <b>ressources audiovisuelles</b> (France Culture, Philorama, INA, Collège de France).
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyAll}
            className="self-start sm:self-auto shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs inline-flex items-center gap-2 transition cursor-pointer"
          >
            {copiedId === "ALL" ? (
              <>
                <Check className="size-3.5 text-white" />
                <span>Tous les résumés copiés !</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Exporter la bibliographie complète ({filteredResources.length})</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Filter Bars */}
        <div className="mt-5 pt-4 border-t border-amber-500/15 flex flex-col gap-3">
          {/* Row 1: Enseignant */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <GraduationCap className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>Enseignant :</span>
            </span>
            {[
              { id: "ALL", label: `Tous (${countsByProf.ALL})` },
              { id: "LUCY", label: `M. Éric LUCY (${countsByProf.LUCY})` },
              { id: "MAROT", label: `Mme Véronique MAROT (${countsByProf.MAROT})` },
              { id: "VALLS", label: `M. Francis VALLS (${countsByProf.VALLS})` },
              { id: "Cnam", label: `Collectif Cnam (${countsByProf.Cnam})` },
            ].map((p) => {
              const active = filterProf === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilterProf(p.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    active
                      ? "bg-amber-600 text-white shadow-2xs font-bold"
                      : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: Type */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Layers className="size-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Format :</span>
            </span>
            {[
              { id: "ALL", label: `Tous (${countsByCat.ALL})` },
              { id: "article_prof", label: `Articles & Recherches (${countsByCat.article_prof})` },
              { id: "texte_fondateur", label: `Textes Fondateurs (${countsByCat.texte_fondateur})` },
              { id: "ouvrage_socle", label: `Ouvrages Socles (${countsByCat.ouvrage_socle})` },
              { id: "media_audio_video", label: `Audios & Vidéos (${countsByCat.media_audio_video})` },
              { id: "etude_cas", label: `Études de cas (${countsByCat.etude_cas})` },
            ].map((c) => {
              const active = filterCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilterCat(c.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    active
                      ? "bg-indigo-600 text-white shadow-2xs font-bold"
                      : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 relative">
          <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Rechercher dans les ressources enseignants PST108"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par titre (Habermas, Honneth, Calori, Hanley, Fonteneau, Lucy...), mot-clé, fichier local..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const isCopied = copiedId === res.id;
          const isProf = res.category === "article_prof";
          const isMedia = res.category === "media_audio_video";
          const isCas = res.category === "etude_cas";

          return (
            <div
              key={res.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-2xs flex flex-col justify-between ${
                isProf
                  ? "border-indigo-500/35 hover:border-indigo-500/60 hover:shadow-indigo-500/5 ring-1 ring-indigo-500/15"
                  : isMedia
                  ? "border-emerald-500/35 hover:border-emerald-500/60 hover:shadow-emerald-500/5 ring-1 ring-emerald-500/15"
                  : isCas
                  ? "border-rose-500/35 hover:border-rose-500/60 hover:shadow-rose-500/5 ring-1 ring-rose-500/15"
                  : "border-amber-500/35 hover:border-amber-500/60 hover:shadow-amber-500/5 ring-1 ring-amber-500/15"
              }`}
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isProf
                          ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                          : isMedia
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                          : isCas
                          ? "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30"
                          : "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {res.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {res.prof}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
                    {res.year}
                  </span>
                </div>

                {/* Title & Authors */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
                    {res.title}
                  </h3>
                  <p className="text-[11px] font-mono font-semibold text-amber-700 dark:text-amber-400 mt-0.5 m-0">
                    {res.authors} · <span className="text-slate-500 dark:text-slate-400">{res.sourceOrPublisher}</span>
                  </p>
                </div>

                {/* Local file tag if present */}
                {res.localFile && (
                  <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                    <FileCode className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="truncate">Fichier prof : <b>{res.localFile}</b></span>
                  </div>
                )}

                {/* Platform Notice badge if any */}
                {res.platformNotice && (
                  <div className="text-[11px] font-medium text-amber-900 dark:text-amber-200 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                    <FileText className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{res.platformNotice}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                  {res.description}
                </p>

                {/* Key takeaway for exam */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                    <Sparkles className="size-3 text-indigo-500" />
                    <span>Rôle stratégique pour l&apos;examen Cnam :</span>
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
                      title="Ouvrir la ressource en ligne (Cairn, Persée, INA, YouTube, France Culture)"
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
                    title="Copier la citation APA 7e"
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
