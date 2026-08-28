"use client";

import { useState } from "react";
import {
  ANTISECHE_HISTOIRE,
  ANTISECHE_MATRICE,
  ANTISECHE_AUTEURS,
  ANTISECHE_DEJOURS,
  ANTISECHE_BONUS,
  ANTISECHE_EXEMPLES,
  ANTISECHE_METHODE,
} from "@/lib/pst/data/pst106-antiseche";

function AuthorBlock({
  color,
  title,
  lines,
}: {
  color: string;
  title: string;
  lines: { b: string; t: string }[];
}) {
  return (
    <div>
      <div
        className="sec"
        style={{
          color,
          fontWeight: 700,
          fontSize: 13,
          textTransform: "uppercase",
          margin: "14px 0 8px",
        }}
      >
        {title}
      </div>
      {lines.map((l, i) => (
        <p
          className="mini"
          key={i}
          style={{ fontSize: 12.5, lineHeight: 1.5, margin: "0 0 6px" }}
        >
          <b>{l.b} : </b>
          <span dangerouslySetInnerHTML={{ __html: l.t }} />
        </p>
      ))}
    </div>
  );
}

export function Antiseche106() {
  const [hideAnswers, setHideAnswers] = useState(false);

  function mask(text: string) {
    if (!hideAnswers) return <>{text}</>;
    return (
      <span
        style={{
          color: "transparent",
          borderBottom: "1px solid #999",
          background: "#f0f0f0",
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <div>
      <p className="anti-intro">
        Une <b>antisèche d&apos;une seule page</b>, dense : concepts, auteurs,
        flèches, dates et chiffres clés en format tableau. Imprime-la (ou
        enregistre-la en PDF) pour t&apos;entraîner à la{" "}
        <b>reproduire à la main</b> — l&apos;exercice de mémorisation le plus
        efficace — ou comme support de révision papier.{" "}
        <b>
          Rappel : c&apos;est un outil de révision, pas à apporter le jour J.
        </b>
      </p>
      <div
        className="anti-bar"
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <button type="button" className="btn" onClick={() => window.print()}>
          Imprimer / PDF
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={() => setHideAnswers((h) => !h)}
        >
          {hideAnswers
            ? "Afficher les réponses"
            : "Masquer les réponses (mode test)"}
        </button>
      </div>

      <div id="antiSheet">
        <h2>PST106 — Antisèche Clinique &amp; Psychologie du travail</h2>
        <div className="sub">
          Wisner · Clot · Dejours + histoire — à reproduire de mémoire
        </div>

        <div className="sec">
          ① Histoire &amp; Psychotechnique (Question probable 1)
        </div>
        <table>
          <tbody>
            {ANTISECHE_HISTOIRE.map((row, i) => (
              <tr key={i}>
                <th scope="row">{row.th}</th>
                <td dangerouslySetInnerHTML={{ __html: row.td }} />
              </tr>
            ))}
          </tbody>
        </table>

        <div className="sec">
          ② La matrice — 3 courants (Cœur de l&apos;examen)
        </div>
        <table>
          <thead>
            <tr>
              {ANTISECHE_MATRICE.headers.map((h, i) => (
                <th
                  key={i}
                  className={
                    i === 1
                      ? "cErg"
                      : i === 2
                        ? "cAct"
                        : i === 3
                          ? "cPsy"
                          : undefined
                  }
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ANTISECHE_MATRICE.rows.map((row, i) => (
              <tr key={i}>
                <th scope="row">{row.axe}</th>
                <td className="cErg">{mask(row.erg)}</td>
                <td className="cAct">{mask(row.act)}</td>
                <td className="cPsy">{mask(row.psy)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="two"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {ANTISECHE_AUTEURS.slice(0, 2).map((auteur) => (
            <AuthorBlock
              key={auteur.title}
              color={auteur.color}
              title={auteur.title}
              lines={auteur.lines}
            />
          ))}
        </div>
        <div
          className="two"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <AuthorBlock
            color={ANTISECHE_DEJOURS.color}
            title={ANTISECHE_DEJOURS.title}
            lines={ANTISECHE_DEJOURS.lines}
          />
          <AuthorBlock
            color="var(--ink)"
            title={ANTISECHE_BONUS.title}
            lines={ANTISECHE_BONUS.lines}
          />
        </div>

        <div className="sec">
          ⑦ Exemples cliniques concrets à placer le jour J
        </div>
        <table>
          <tbody>
            {ANTISECHE_EXEMPLES.map((row, i) => (
              <tr key={i}>
                <th
                  scope="row"
                  style={row.color ? { color: row.color } : undefined}
                >
                  {row.th}
                </th>
                <td>{row.td}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="sec">⑧ Méthode de réponse (Jour J)</div>
        <p
          className="mini"
          dangerouslySetInnerHTML={{ __html: ANTISECHE_METHODE }}
        />
      </div>
    </div>
  );
}
