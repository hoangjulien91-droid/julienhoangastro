"use client";

import { useMemo, useState } from "react";
import { Briefcase, AlertTriangle } from "lucide-react";
import { DEONTOLOGIE_PRINCIPLES } from "@/lib/pst/data/pst123";

export function DeontoExplorer() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      DEONTOLOGIE_PRINCIPLES.filter(
        (p) =>
          p.n.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.eg.toLowerCase().includes(q) ||
          p.trap.toLowerCase().includes(q),
      ),
    [q],
  );

  return (
    <div className="qbox" style={{ marginBottom: 25 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          className="vh"
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          Explorateur du Code de Déontologie (Mise à jour 2021)
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}>
        Citez précisément les principes déontologiques à l&apos;examen. Utilisez
        la barre de recherche ci-dessous pour filtrer les principes et
        visualiser des cas pratiques en entreprise.
      </p>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <input
          type="text"
          style={{
            flex: 1,
            padding: "6px 12px",
            fontSize: 12.5,
            borderRadius: 8,
            border: "1px solid var(--line)",
          }}
          placeholder="Rechercher un principe ou mot-clé (ex: secret, consentement)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="btn small ghost" onClick={() => setQuery("")}>
            Effacer
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 20,
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            Aucun principe ne correspond à votre recherche.
          </div>
        ) : (
          filtered.map((p, idx) => (
            <div
              key={p.n}
              className="fcard"
              style={{
                padding: 15,
                border: "1px solid var(--line)",
                borderRadius: 10,
                background: "var(--card)",
              }}
            >
              <details>
                <summary
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13.5,
                  }}
                >
                  <span>
                    Principe {idx + 1} : {p.n}
                  </span>
                </summary>
                <div
                  style={{
                    marginTop: 10,
                    borderTop: "1px solid var(--line)",
                    paddingTop: 10,
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    color: "var(--muted)",
                  }}
                >
                  <p>
                    <b>Description officielle :</b>
                    <br />
                    {p.desc}
                  </p>
                  <div
                    className="ex p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-500/30 space-y-1 mb-2.5"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      <Briefcase className="size-3 text-emerald-600" />
                      <span>Exemple Pratique en Entreprise :</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {p.eg}
                    </div>
                  </div>
                  <div
                    className="trap p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-500/30 space-y-1"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                      <AlertTriangle className="size-3 text-rose-600" />
                      <span>Piège d&apos;Examen (Violation Déontologique) :</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {p.trap}
                    </div>
                  </div>
                </div>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
