"use client";

import { useState } from "react";
import { FileText, Printer, Eye, EyeOff } from "lucide-react";

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
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <FileText className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Synthèse Comparative Examen Cnam</span>
          </span>
          <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase">
            Aide-mémoire express
          </span>
        </div>

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
          <div key={gi} className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="size-2 rounded-full bg-indigo-500" />
              <div className="sec font-bold text-sm text-slate-900 dark:text-slate-100">{group.sectionTitle}</div>
            </div>
            <div className="w-full overflow-x-auto scrollbar-none my-2 rounded-xl border border-slate-200/60 dark:border-slate-800">
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
          </div>
        ))}
      </div>
    </div>
  );
}
