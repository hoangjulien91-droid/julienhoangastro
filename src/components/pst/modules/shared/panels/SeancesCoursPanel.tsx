"use client";

import React, { useMemo, useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-types";
import { getEssentielBySeanceId } from "@/lib/pst/data/essentiel-cours";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  SeanceCourseSelector,
} from "./seances/SeanceCourseSelector";
import {
  SeanceTabBar,
} from "./seances/SeanceTabBar";
import {
  SeanceHeroBanner,
} from "./seances/SeanceHeroBanner";
import {
  SeanceAudioReader,
} from "./seances/SeanceAudioReader";
import {
  SeanceSyntheseTab,
} from "./seances/SeanceSyntheseTab";
import {
  SeanceVerbatimsTab,
  type ParsedChapter,
} from "./seances/SeanceVerbatimsTab";
import {
  SeanceConsignesTab,
} from "./seances/SeanceConsignesTab";

export interface SeancesCoursPanelProps {
  moduleKey: "pst106" | "pst108" | "pst123";
  onGoTab?: (tabId: string) => void;
}

async function loadSeancesForModule(
  moduleKey: "pst106" | "pst108" | "pst123",
): Promise<SeanceCoursItem[]> {
  if (moduleKey === "pst106") {
    const mod = await import("@/lib/pst/data/seances-pst106");
    return mod.SEANCES_PST106;
  }
  if (moduleKey === "pst108") {
    const mod = await import("@/lib/pst/data/seances-pst108");
    return mod.SEANCES_PST108;
  }
  const mod = await import("@/lib/pst/data/seances-pst123");
  return mod.SEANCES_PST123;
}

function resolveInitialSeanceId(
  seances: SeanceCoursItem[],
  moduleKey: string,
): string {
  if (typeof window !== "undefined" && seances.length > 0) {
    const hash = window.location.hash.toLowerCase();
    const directMatch = seances.find((s) => hash.includes(s.id.toLowerCase()));
    if (directMatch) return directMatch.id;

    const coursMatch = hash.match(/(?:cours|seance)-?(\d+)/);
    if (coursMatch?.[1]) {
      const targetId = `${moduleKey}-s${coursMatch[1]}`;
      if (seances.some((s) => s.id === targetId)) return targetId;
    }
  }
  return seances[seances.length - 1]?.id || seances[0]?.id || "";
}

export function SeancesCoursPanel({
  moduleKey,
  onGoTab,
}: SeancesCoursPanelProps) {
  const [seances, setSeances] = useState<SeanceCoursItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeanceId, setSelectedSeanceId] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    loadSeancesForModule(moduleKey)
      .then((loaded) => {
        if (cancelled) return;
        setSeances(loaded);
        setSelectedSeanceId((prev) =>
          prev && loaded.some((s) => s.id === prev)
            ? prev
            : resolveInitialSeanceId(loaded, moduleKey),
        );
        setIsLoading(false);
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [moduleKey]);

  // Écoute de l'événement custom pour sélectionner directement une séance (ex: depuis Accueil)
  useEffect(() => {
    function handleCustomSelect(e: Event) {
      const id = (e as CustomEvent).detail?.seanceId;
      if (id && (seances.length === 0 || seances.some((s) => s.id === id))) {
        setSelectedSeanceId(id);
      }
    }
    window.addEventListener("pst:select-seance", handleCustomSelect);
    return () => window.removeEventListener("pst:select-seance", handleCustomSelect);
  }, [seances]);

  const [activeTab, setActiveTab] = useState<
    "synthese" | "transcription" | "consignes"
  >("synthese");
  const [showAudioReader, setShowAudioReader] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  const activeSeance = useMemo(() => {
    return seances.find((s) => s.id === selectedSeanceId) || seances[0];
  }, [seances, selectedSeanceId]);

  const activeEssentiel = useMemo(() => {
    return activeSeance ? getEssentielBySeanceId(activeSeance.id) : undefined;
  }, [activeSeance]);

  // Estimation du temps de lecture en minutes (base ~180 mots/min)
  const readingMinutes = useMemo(() => {
    if (!activeSeance) return 5;
    const syntheseWords = activeSeance.syntheseSections
      .flatMap((s) => s.points.map((p) => p.contenu + " " + p.titre))
      .join(" ")
      .split(/\s+/).length;
    const resumeWords = activeSeance.resumeExecutif.join(" ").split(/\s+/).length;
    const totalWords = syntheseWords + resumeWords;
    return Math.max(3, Math.round(totalWords / 180));
  }, [activeSeance]);

  // Navigation clavier rapide J / K entre les séances
  useEffect(() => {
    if (seances.length <= 1) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (e.target as HTMLElement | null)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        const curIdx = seances.findIndex((s) => s.id === activeSeance?.id);
        const nextIdx = (curIdx + 1) % seances.length;
        if (seances[nextIdx]) {
          playClickSound();
          setSelectedSeanceId(seances[nextIdx].id);
        }
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        const curIdx = seances.findIndex((s) => s.id === activeSeance?.id);
        const prevIdx = (curIdx - 1 + seances.length) % seances.length;
        if (seances[prevIdx]) {
          playClickSound();
          setSelectedSeanceId(seances[prevIdx].id);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [seances, activeSeance?.id]);

  // Découpage du verbatim en chapitres pour une lecture aérée type Apple Books
  const parsedChapters: ParsedChapter[] = useMemo(() => {
    if (!activeSeance?.transcriptionIntegraleVerbatim) return [];
    const rawLines = activeSeance.transcriptionIntegraleVerbatim
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const chapters: ParsedChapter[] = [];
    let current: ParsedChapter = {
      id: "intro",
      title: "Introduction & Cadrage",
      lines: [],
    };

    rawLines.forEach((line) => {
      // Détection des en-têtes [Titre du chapitre]
      if (
        line.startsWith("[") &&
        line.endsWith("]") &&
        !/^\[\d{2}:\d{2}/.test(line) &&
        !line.startsWith("[Voir")
      ) {
        if (current.lines.length > 0) {
          chapters.push(current);
        }
        const cleanTitle = line.slice(1, -1).trim();
        const cleanId =
          "chap_" + cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_");
        current = {
          id: cleanId,
          title: cleanTitle,
          lines: [],
        };
      } else {
        current.lines.push(line);
      }
    });

    if (current.lines.length > 0) {
      chapters.push(current);
    }

    return chapters;
  }, [activeSeance]);

  if (isLoading) {
    return (
      <div className="p-10 text-center text-muted-foreground bg-card/60 backdrop-blur-md border border-border/60 rounded-3xl space-y-3 animate-pulse">
        <BookOpen className="size-8 text-muted-foreground/60 mx-auto" />
        <p className="text-xs font-medium text-muted-foreground">
          Chargement des séances et synthèses {moduleKey.toUpperCase()}…
        </p>
      </div>
    );
  }

  if (!activeSeance) {
    return (
      <div className="p-12 text-center text-muted-foreground bg-card/60 backdrop-blur-md border border-border/60 rounded-3xl space-y-3">
        <BookOpen className="size-10 text-muted-foreground/60 mx-auto mb-2" />
        <h3 className="text-base font-bold text-foreground">
          Aucun cours retranscrit pour le moment
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Les séances enregistrées et les retranscriptions écrites de ce module
          seront ajoutées au fil du semestre.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 pb-20 transition-all ${
        isFocusMode ? "max-w-4xl mx-auto pt-2" : ""
      }`}
    >
      {/* 1. Sélecteur panoramique (masqué en mode focus pour concentration totale) */}
      {!isFocusMode && (
        <SeanceCourseSelector
          seances={seances}
          selectedSeanceId={activeSeance.id}
          onSelectSeance={setSelectedSeanceId}
        />
      )}

      {/* 2. Barre de contrôle (séances & tabs) */}
      <SeanceTabBar
        seances={seances}
        activeSeance={activeSeance}
        onSelectSeance={setSelectedSeanceId}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* 2.bis Lecteur audio podcast de L'Essentiel */}
      {showAudioReader && (
        <SeanceAudioReader
          essentiel={activeEssentiel ?? null}
          titreSeance={activeSeance.titre}
          enseignant={activeSeance.enseignant}
          onClose={() => setShowAudioReader(false)}
        />
      )}

      {/* 3. Hero banner séance & L'Essentiel Bento */}
      <SeanceHeroBanner
        activeSeance={activeSeance}
        activeEssentiel={activeEssentiel ?? null}
        readingMinutes={readingMinutes}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode((f) => !f)}
        showAudioReader={showAudioReader}
        onToggleAudioReader={() => setShowAudioReader((r) => !r)}
      />

      {/* 4. Onglets thématiques */}
      {activeTab === "synthese" && (
        <SeanceSyntheseTab activeSeance={activeSeance} />
      )}

      {activeTab === "transcription" && (
        <SeanceVerbatimsTab
          activeSeance={activeSeance}
          parsedChapters={parsedChapters}
        />
      )}

      {activeTab === "consignes" && (
        <SeanceConsignesTab
          activeSeance={activeSeance}
          onGoTab={onGoTab}
        />
      )}
    </div>
  );
}
