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
  Headphones,
  Video,
  FileCheck,
} from "lucide-react";
import {
  PST106_OFFICIAL_RESOURCES,
  type Pst106OfficialResource,
} from "@/lib/pst/data/pst106-ressources";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function RessourcesEnseignants106() {
  const [filterAuthor, setFilterAuthor] = useState<string>("ALL");
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return PST106_OFFICIAL_RESOURCES.filter((res) => {
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
            r.localFile ? `\n  Fichier source : ${r.localFile}` : ""
          }${r.url ? `\n  Lien direct : ${r.url}` : ""}`,
      )
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedId("ALL");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const countsByAuthor = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST106_OFFICIAL_RESOURCES.length,
      "Pr. Christine Lagabrielle": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Pr. Christine Lagabrielle"
      ).length,
      "Yves Clot": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Yves Clot"
      ).length,
      "Alain Wisner": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Alain Wisner"
      ).length,
      "Christophe Dejours": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Christophe Dejours"
      ).length,
      "Suzanne Pacaud": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Suzanne Pacaud"
      ).length,
      "Frederick Herzberg": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Frederick Herzberg"
      ).length,
      "Taylor & OST": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Taylor & OST"
      ).length,
      "Philosophie du Travail": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Philosophie du Travail"
      ).length,
      "Collectif Cnam": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Collectif Cnam"
      ).length,
    };
    return map;
  }, []);

  const countsByCat = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST106_OFFICIAL_RESOURCES.length,
      cours_lagabrielle: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "cours_lagabrielle"
      ).length,
      histoire_psychotechnique: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "histoire_psychotechnique"
      ).length,
      motivation_organisation: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "motivation_organisation"
      ).length,
      clinique_activite_clot: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "clinique_activite_clot"
      ).length,
      methodes_intervention: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "methodes_intervention"
      ).length,
      ergonomie_wisner: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "ergonomie_wisner"
      ).length,
      psychodynamique_dejours: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "psychodynamique_dejours"
      ).length,
      audio_podcasts: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "audio_podcasts"
      ).length,
      annales_officielles: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "annales_officielles"
      ).length,
    };
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/25 dark:border-emerald-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-2xs">
                <BookOpen className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span>Corpus Officiel Intégré — Pr. Christine LAGABRIELLE</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                PST106 · Dossier Bureau &amp; Archives Clinique de l&apos;activité
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
              Textes Auteurs, Fiches de Cours, Audios &amp; Annales ({PST106_OFFICIAL_RESOURCES.length} documents indexés)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0 max-w-3xl leading-relaxed">
              Tous les documents ressources de votre dossier bureau PST106 (Cours 1 de Christine Lagabrielle, vidéo MKV,
              transcription Buzz 3h12, textes de Pacaud et Herzberg, histoire de Gay-Lussac, polycopié intégral de 108k caractères,
              audios et 8 sujets d&apos;examen) analysés avec citations APA 7e et arguments d&apos;examen.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyAll}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
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
        {/* Search Input */}
        <div className="relative">
          <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Rechercher dans les ressources enseignants PST106"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par auteur (Clot, Lagabrielle, Pacaud, Herzberg, Wisner), concept (genre, pouvoir d'agir), fichier ou séance..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
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
            <GraduationCap className="size-3 text-emerald-500" />
            <span>Filtrer par Auteur Référent :</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: `Tous (${countsByAuthor.ALL})` },
              { id: "Pr. Christine Lagabrielle", label: `Pr. Lagabrielle (${countsByAuthor["Pr. Christine Lagabrielle"]})` },
              { id: "Yves Clot", label: `Yves Clot (${countsByAuthor["Yves Clot"]})` },
              { id: "Alain Wisner", label: `Wisner (Ergonomie) (${countsByAuthor["Alain Wisner"]})` },
              { id: "Christophe Dejours", label: `Dejours (${countsByAuthor["Christophe Dejours"]})` },
              { id: "Suzanne Pacaud", label: `Suzanne Pacaud (${countsByAuthor["Suzanne Pacaud"]})` },
              { id: "Frederick Herzberg", label: `Herzberg (${countsByAuthor["Frederick Herzberg"]})` },
              { id: "Taylor & OST", label: `Taylor & OST (${countsByAuthor["Taylor & OST"]})` },
              { id: "Philosophie du Travail", label: `Philosophie (${countsByAuthor["Philosophie du Travail"]})` },
              { id: "Collectif Cnam", label: `Cnam & Gay-Lussac (${countsByAuthor["Collectif Cnam"]})` },
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
                      ? "bg-emerald-600 text-white shadow-xs font-semibold"
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
            <Layers className="size-3 text-teal-500" />
            <span>Thématique du cours :</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: `Toutes thématiques (${countsByCat.ALL})` },
              { id: "cours_lagabrielle", label: `Cours Lagabrielle & Vidéo (${countsByCat.cours_lagabrielle})` },
              { id: "clinique_activite_clot", label: `Clinique de l'activité (${countsByCat.clinique_activite_clot})` },
              { id: "methodes_intervention", label: `Sosie & Autoconfrontation (${countsByCat.methodes_intervention})` },
              { id: "histoire_psychotechnique", label: `Histoire & Psychotechnique (${countsByCat.histoire_psychotechnique})` },
              { id: "motivation_organisation", label: `Motivation & Philosophie (${countsByCat.motivation_organisation})` },
              { id: "ergonomie_wisner", label: `Ergonomie (${countsByCat.ergonomie_wisner})` },
              { id: "psychodynamique_dejours", label: `Psychodynamique (${countsByCat.psychodynamique_dejours})` },
              { id: "audio_podcasts", label: `Podcasts Audio (${countsByCat.audio_podcasts})` },
              { id: "annales_officielles", label: `8 Sujets d'Examen (${countsByCat.annales_officielles})` },
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
                      ? "bg-teal-600 text-white font-semibold"
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
          {PST106_OFFICIAL_RESOURCES.length}
        </span>
        {(filterAuthor !== "ALL" || filterCat !== "ALL" || search) && (
          <button
            onClick={() => {
              setFilterAuthor("ALL");
              setFilterCat("ALL");
              setSearch("");
            }}
            className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
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
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Badges: Category & Seance */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                      {res.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800/60">
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
                    <FileCode className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">
                      Fichier source : <b>{res.localFile}</b>
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                  {res.description}
                </p>

                {/* Key takeaway for exam */}
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="size-3 text-emerald-500" />
                      <span>Rôle d&apos;examen Cnam :</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTakeaway(res.id, res.keyTakeaway)}
                      className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
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

                {/* Audio Player if audioUrl is present */}
                {res.audioUrl && (
                  <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                        <Headphones className="size-3.5 text-teal-600 dark:text-teal-400" />
                        <span>Podcast Officiel Intégré (Lecture directe)</span>
                      </div>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                        Audio HD
                      </span>
                    </div>
                    <audio
                      controls
                      preload="metadata"
                      className="w-full h-8 rounded-lg"
                      src={res.audioUrl}
                    >
                      Votre navigateur ne supporte pas l&apos;élément audio.
                    </audio>
                  </div>
                )}

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
                      className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition"
                      title="Consulter l'article en ligne (PISTES / OpenEdition)"
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
