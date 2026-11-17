"use client";

import { useEffect, useMemo, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { RecitsToolbar } from "./recits/RecitsToolbar";
import { RecitCard, type RecitMode } from "./recits/RecitCard";

export interface RecitPart {
  beat: string;
  html: string;
}
export interface RecitEntry {
  a: string;
  ic: string;
  t: string;
  sub: string;
  parts: RecitPart[];
}
export interface RecitFilter {
  key: string;
  label: string;
}

export type { RecitMode };

interface RecitsProps {
  store: PstStore;
  onStoreChange: () => void;
  data: RecitEntry[];
  kwDefs: Record<string, string>;
  filters: RecitFilter[];
  colors: Record<string, string>;
}

export function Recits({
  store,
  onStoreChange,
  data,
  kwDefs,
  filters,
  colors,
}: RecitsProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [modes, setModes] = useState<Record<number, RecitMode>>({});

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function toggleMastery(ri: number) {
    const key = "recit_mastery_" + ri;
    const cur = !!store.getMarks()[key];
    store.setMark(key, !cur);
    onStoreChange();
  }

  function setMode(ri: number, mode: RecitMode) {
    setModes((prev) => ({ ...prev, [ri]: mode }));
  }

  function handleKwClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest(".kw");
    if (target) target.classList.toggle("revealed");
  }

  const marks = store.getMarks();
  const cleanQuery = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      data
        .map((r, ri) => ({ r, ri }))
        .filter(({ r }) => {
          if (filter !== "all" && r.a !== filter) return false;
          if (!cleanQuery) return true;
          const hay = [
            r.t,
            r.sub,
            r.parts.map((p) => p.beat + " " + p.html).join(" "),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(cleanQuery);
        }),
    [data, filter, cleanQuery],
  );

  const masteredCount = data.filter(
    (_, i) => !!marks["recit_mastery_" + i],
  ).length;
  const totalRecits = data.length;
  const pct = totalRecits ? Math.round((100 * masteredCount) / totalRecits) : 0;

  return (
    <div>
      <RecitsToolbar
        masteredCount={masteredCount}
        totalRecits={totalRecits}
        pct={pct}
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <div id="recitsHost">
        {visible.map(({ r, ri }) => (
          <RecitCard
            key={ri}
            entry={r}
            ri={ri}
            isMastered={!!marks["recit_mastery_" + ri]}
            mode={modes[ri] ?? "full"}
            colors={colors}
            kwDefs={kwDefs}
            marks={marks}
            onToggleMastery={toggleMastery}
            onSetMode={setMode}
            onSetMark={(k, v) => {
              store.setMark(k, v);
              onStoreChange();
            }}
            onKwClick={handleKwClick}
          />
        ))}
      </div>
    </div>
  );
}
