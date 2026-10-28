"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import {
  PST124_OFFICIAL_RESOURCES,
  type Pst124OfficialResource,
} from "@/lib/pst/data/pst124-ressources";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function RessourcesEnseignants124() {
  const [filterAuthor, setFilterAuthor] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return PST124_OFFICIAL_RESOURCES.filter((res) => {
      if (filterAuthor !== "ALL" && res.authorFilter !== filterAuthor) {
        return false;
      }
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.authors.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.keyTakeaway.toLowerCase().includes(q) ||
        res.seanceNumber.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filterAuthor, search]);

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
          `• [${r.seanceNumber}] ${r.title} (${r.authors}, ${r.year})\n  Citation APA 7 : ${r.apa7Citation}\n  Usage Examen Cnam : ${r.keyTakeaway}`,
      )
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedId("ALL");
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/25 dark:border-cyan-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 inline-flex items-center gap-1.5 shadow-2xs">
                <BookOpen className="size-3 text-cyan-600 dark:text-cyan-400" />
                <span>Corpus Officiel Intégré — PST124</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                Transitions Digitales &amp; Technologies Émergentes
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
              Textes Auteurs &amp; Ergonomie des TIC ({PST124_OFFICIAL_RESOURCES.length} documents indexés)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0 max-w-3xl leading-relaxed">
              Pierre Rabardel (genèse instrumentale : artefact vs instrument), Marc-Éric Bobillier Chaumon (acceptation située et technologies capacitantes), Yrjö Engeström (théorie de l&apos;activité et apprentissage expansif), Gérard Valléry &amp; Flore Barcellini et Dominique Méda.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyAll}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
            title="Copier toute la bibliographie au format APA 7e"
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
        <div className="relative">
          <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Rechercher dans les ressources enseignants PST124"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par auteur (Rabardel, Bobillier Chaumon, Engeström), concept (instrumentation, capacitant)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
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

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "ALL", label: "Tous les auteurs" },
            { id: "Pierre Rabardel", label: "Pierre Rabardel (Instrument)" },
            { id: "Marc-Éric Bobillier Chaumon", label: "Bobillier Chaumon (Usages)" },
            { id: "Yrjö Engeström", label: "Yrjö Engeström (Activité)" },
            { id: "Gérard Valléry & Flore Barcellini", label: "Valléry & Barcellini (Simulation)" },
            { id: "Dominique Méda", label: "Dominique Méda (Plateformes)" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => {
                playClickSound();
                setFilterAuthor(btn.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                filterAuthor === btn.id
                  ? "bg-cyan-600 text-white shadow-xs font-semibold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const isCopied = copiedId === res.id;
          const isTakeawayCopied = copiedId === `takeaway_${res.id}`;

          return (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-cyan-400 dark:hover:border-cyan-600 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
                    {res.authorFilter}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    {res.year}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
                  {res.title}
                </h3>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">
                    {res.authors}
                  </span>
                  {res.sourceOrPublisher && (
                    <span> · {res.sourceOrPublisher}</span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                  {res.description}
                </p>

                <div className="p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-800/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
                      <Sparkles className="size-3 text-cyan-500" />
                      <span>Argument d&apos;examen Cnam :</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTakeaway(res.id, res.keyTakeaway)}
                      className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isTakeawayCopied ? (
                        <>
                          <Check className="size-2.5 text-emerald-600" />
                          <span className="text-emerald-600">Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-2.5" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium m-0">
                    {res.keyTakeaway}
                  </p>
                </div>

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

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[70%]">
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
          );
        })}
      </div>
    </div>
  );
}
