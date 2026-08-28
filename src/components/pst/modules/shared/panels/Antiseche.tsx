"use client";

import { useState } from "react";

interface TableGroup {
  sectionTitle: string;
  headers: string[];
  rows: string[][];
}

interface AntisecheProps {
  title: string;
  subtitle: string;
  groups: TableGroup[];
}

export function Antiseche({ title, subtitle, groups }: AntisecheProps) {
  const [hideAnswers, setHideAnswers] = useState(false);

  function handlePrint() {
    document.body.classList.add("printing-anti");
    window.print();
    setTimeout(() => document.body.classList.remove("printing-anti"), 500);
  }

  return (
    <div>
      <p className="hint">
        Une <b>antisèche condensée</b>. Imprime-la (ou enregistre-la en PDF)
        pour t&apos;entraîner à la reproduire de mémoire ou l&apos;utiliser en
        support papier.
      </p>
      <div
        className="no-print"
        style={{ display: "flex", gap: 10, marginBottom: 15, flexWrap: "wrap" }}
      >
        <button
          className="btn"
          style={{
            background: "var(--dejours)",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "var(--r)",
          }}
          onClick={handlePrint}
        >
          Imprimer en PDF
        </button>
        <button
          className="btn ghost"
          style={{ padding: "8px 16px", borderRadius: "var(--r)" }}
          onClick={() => setHideAnswers((h) => !h)}
        >
          {hideAnswers
            ? "Afficher les réponses"
            : "Mode Test (Masquer les réponses)"}
        </button>
      </div>
      <div
        id="antiSheet"
        className={hideAnswers ? "hide-answers" : ""}
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "var(--r)",
          padding: 25,
        }}
      >
        <h2
          style={{ margin: "0 0 5px", fontSize: 18, color: "var(--dejours)" }}
        >
          {title}
        </h2>
        <div
          className="sub"
          style={{ fontSize: 12, color: "var(--muted)", marginBottom: 15 }}
        >
          {subtitle}
        </div>

        {groups.map((group, gi) => (
          <div key={gi}>
            <div className="sec">{group.sectionTitle}</div>
            <table>
              <thead>
                <tr>
                  {group.headers.map((h, hi) => (
                    <th key={hi}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row, ri) => (
                  <tr key={ri}>
                    <th scope="row">{row[0]}</th>
                    {row.slice(1).map((cell, ci) => (
                      <td key={ci}>
                        <span className="ans">{cell}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
