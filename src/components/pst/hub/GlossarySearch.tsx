"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Link } from "next-view-transitions";
import { INDEX, MODULES, type GlossaryTerm } from "@/lib/pst/hub-stats";

function highlightMatches(text: string, query: string): ReactNode {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

function accentOf(id: string) {
  return INDEX.modules[id]?.accent ?? "var(--accent)";
}

export function GlossarySearch() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDEX.glossaire.filter((t: GlossaryTerm) => {
      if (filter !== "all" && t.m !== filter) return false;
      if (!q) return true;
      return (t.w + " " + t.def).toLowerCase().includes(q);
    });
  }, [filter, query]);

  const q = query.trim().toLowerCase();

  return (
    <div className="card">
      <div className="gctrl">
        <input
          type="search"
          id="gsearch"
          className="gsearch"
          placeholder="Rechercher un terme ou une définition dans tous les PST…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips" id="gchips">
          <button
            className="chip"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Tous
          </button>
          {MODULES.map((m) => (
            <button
              key={m.id}
              className="chip"
              aria-pressed={filter === m.id}
              onClick={() => setFilter(m.id)}
            >
              {m.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="gcount" id="gcount">
        {list.length} terme{list.length > 1 ? "s" : ""}
      </div>
      <div className="glist" id="glist">
        {list.map((t, i) => (
          <div
            className="gterm"
            key={i}
            style={{ ["--mc" as string]: accentOf(t.m) }}
          >
            <div className="w">{highlightMatches(t.w, q)}</div>
            <div className="d">{highlightMatches(t.def, q)}</div>
            <Link className="tag" href={`/${t.m}/`}>
              {t.m.toUpperCase()}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
