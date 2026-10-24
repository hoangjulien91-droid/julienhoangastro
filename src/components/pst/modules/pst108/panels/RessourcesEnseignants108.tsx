"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  FileText,
  BookmarkCheck,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  PST108_OFFICIAL_RESOURCES,
  type Pst108OfficialResource,
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
      if (filterProf !== "ALL" && !res.prof.includes(filterProf)) return false;
      if (filterCat !== "ALL" && res.category !== filterCat) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.authors.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.keyTakeaway.toLowerCase().includes(q) ||
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
      .map((r) => `• ${r.apa7Citation}\n  -> Examen : ${r.keyTakeaway}`)
      .join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedId("ALL");
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-amber-500/10 via-indigo-500/5 to-transparent border border-amber-500/25 dark:border-amber-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
                <BookOpen className="size-3 text-amber-600 dark:text-amber-400" />
                <span>Ressources officielles des Enseignants Cnam</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                PST108 · Marot · Lucy · Valls
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
              Corpus Bibliographique &amp; Documents Plateforme
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl m-0">
              L&apos;intégralité des <b>articles déposés sur Moodle/ENF</b> (article de Freud sur la bobine, réseau Langage et Travail), des <b>ouvrages socles prescrits</b> (Vygotski, Clot, Bourdieu, Habermas, Honneth) et des <b>recherches publiées par vos enseignants</b> au Cnam (Mme Marot, M. Lucy, M. Valls). Citations prêtes à l&apos;emploi sous norme <b>APA 7e édition</b>.
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
                <span>Citations copiées !</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copier la bibliographie ({filteredResources.length})</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Filter Bars */}
        <div className="mt-5 pt-4 border-t border-amber-500/15 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
              Enseignant :
            </span>
            {[
              { id: "ALL", label: "Tous les enseignants" },
              { id: "MAROT", label: "Mme MAROT (Cours 1)" },
              { id: "LUCY", label: "M. LUCY (Pouvoir & Discussion)" },
              { id: "VALLS", label: "M. VALLS (Méthode IOD)" },
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

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
              Type :
            </span>
            {[
              { id: "ALL", label: "Tous" },
              { id: "plateforme", label: "Plateforme Moodle / ENF" },
              { id: "socle", label: "Ouvrages socles" },
              { id: "recherche_prof", label: "Recherche Enseignants" },
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par auteur (Freud, Vygotski, Clot, Bion, Bourdieu...), titre, concept..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const isCopied = copiedId === res.id;
          const isPlatform = res.category === "plateforme";
          const isProf = res.category === "recherche_prof";

          return (
            <div
              key={res.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-2xs flex flex-col justify-between ${
                isPlatform
                  ? "border-amber-500/35 hover:border-amber-500/60 hover:shadow-amber-500/5 ring-1 ring-amber-500/15"
                  : isProf
                  ? "border-indigo-500/35 hover:border-indigo-500/60 hover:shadow-indigo-500/5 ring-1 ring-indigo-500/15"
                  : "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isPlatform
                          ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
                          : isProf
                          ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
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

              {/* Bottom APA Citation & Copy Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[75%]">
                  <span className="font-bold">APA 7 :</span> {res.apa7Citation}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyApa(res.id, res.apa7Citation)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isCopied
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  }`}
                  title="Copier la citation APA 7e pour dissertation ou mémoire"
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
          );
        })}
      </div>
    </div>
  );
}
