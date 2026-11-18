"use client";

import { useState, useMemo } from "react";
import { BookOpen, Copy, Check } from "lucide-react";
import {
  PST123_OFFICIAL_RESOURCES,
} from "@/lib/pst/data/pst123-ressources";
import {
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { RessourceCard123 } from "./ressources/RessourceCard123";
import { RessourcesFilterBar123 } from "./ressources/RessourcesFilterBar123";

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
                <span>Corpus Officiel Intégré — M. Éric LUCY</span>
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
      <RessourcesFilterBar123
        search={search}
        onSearchChange={setSearch}
        filterAuthor={filterAuthor}
        onFilterAuthorChange={setFilterAuthor}
        filterCat={filterCat}
        onFilterCatChange={setFilterCat}
        countsByAuthor={countsByAuthor}
        countsByCat={countsByCat}
      />

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
        {filteredResources.map((res) => (
          <RessourceCard123
            key={res.id}
            res={res}
            isCopied={copiedId === res.id}
            isTakeawayCopied={copiedId === `takeaway_${res.id}`}
            onCopyApa={handleCopyApa}
            onCopyTakeaway={handleCopyTakeaway}
          />
        ))}
      </div>
    </div>
  );
}
