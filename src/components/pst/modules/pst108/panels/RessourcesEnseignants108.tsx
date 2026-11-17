"use client";

import { useState, useMemo } from "react";
import { PST108_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst108";
import { playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { Ressource108Card } from "./ressources/Ressource108Card";
import { Ressources108Header } from "./ressources/Ressources108Header";

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
    return {
      ALL: PST108_OFFICIAL_RESOURCES.length,
      LUCY: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("LUCY")).length,
      MAROT: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("MAROT")).length,
      VALLS: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("VALLS")).length,
      Cnam: PST108_OFFICIAL_RESOURCES.filter((r) => r.prof.includes("Cnam")).length,
    };
  }, []);

  const countsByCat = useMemo(() => {
    return {
      ALL: PST108_OFFICIAL_RESOURCES.length,
      article_prof: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "article_prof").length,
      texte_fondateur: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "texte_fondateur").length,
      ouvrage_socle: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "ouvrage_socle").length,
      media_audio_video: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "media_audio_video").length,
      etude_cas: PST108_OFFICIAL_RESOURCES.filter((r) => r.category === "etude_cas").length,
    };
  }, []);

  return (
    <div className="space-y-6">
      <Ressources108Header
        totalCount={PST108_OFFICIAL_RESOURCES.length}
        filteredCount={filteredResources.length}
        filterProf={filterProf}
        setFilterProf={setFilterProf}
        filterCat={filterCat}
        setFilterCat={setFilterCat}
        search={search}
        setSearch={setSearch}
        copiedId={copiedId}
        onCopyAll={handleCopyAll}
        countsByProf={countsByProf}
        countsByCat={countsByCat}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <Ressource108Card
            key={res.id}
            res={res}
            isCopied={copiedId === res.id}
            onCopyApa={handleCopyApa}
          />
        ))}
      </div>
    </div>
  );
}
