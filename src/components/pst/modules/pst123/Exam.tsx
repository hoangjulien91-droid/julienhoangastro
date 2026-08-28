"use client";

import { useEffect, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { EXAM_SUBJECTS } from "@/lib/pst/data/pst123";

type ExamType = "random" | "dissertation" | "demande" | "cas";

function pickSubject(type: ExamType) {
  const pool =
    type === "random"
      ? EXAM_SUBJECTS
      : EXAM_SUBJECTS.filter((s) => s.type === type);
  const list = pool.length ? pool : EXAM_SUBJECTS;
  return list[Math.floor(Math.random() * list.length)] ?? EXAM_SUBJECTS[0];
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

interface ExamProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Exam({ store, onStoreChange }: ExamProps) {
  const [view, setView] = useState<"setup" | "active" | "debrief">("setup");
  const [examType, setExamType] = useState<ExamType>("random");
  const [duration, setDuration] = useState(45);
  const [subject, setSubject] = useState(() => EXAM_SUBJECTS[0]);
  const [draft, setDraft] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (view !== "active" || remaining <= 0) return;
    const iv = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(iv);
  }, [view, remaining]);

  function start() {
    setSubject(pickSubject(examType));
    setDraft("");
    setRemaining(duration * 60);
    setChecked(new Set());
    setSaved(false);
    setView("active");
  }

  function finish() {
    setView("debrief");
  }

  function abandon() {
    setView("setup");
  }

  function toggleCriterion(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function save() {
    if (!subject) return;
    store.addExam({
      score: checked.size,
      total: subject.criteria.length,
      date: new Date().toISOString().slice(0, 10),
      type: subject.type,
    });
    onStoreChange();
    setSaved(true);
  }

  const history = store.getExams();

  return (
    <div>
      <p className="hint">
        Mets-toi en conditions réelles d&apos;examen : sujet tiré au sort ou
        choisi, chrono, zone de rédaction de brouillon, et auto-évaluation
        guidée avec corrigé d&apos;élite.
      </p>

      {view === "setup" && (
        <div className="qbox" id="examSetup">
          <h3 style={{ marginTop: 0, color: "var(--deontologie)" }}>
            Préparer mon entraînement
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.45,
              marginBottom: 20,
            }}
          >
            Sélectionne ton mode de tirage et la durée pour démarrer le
            simulateur d&apos;examen blanc.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 15,
              marginBottom: 20,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 6,
                }}
              >
                Type d&apos;exercice
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                  fontFamily: "inherit",
                  fontSize: 13,
                }}
              >
                <option value="random">🎲 Tirage Aléatoire</option>
                <option value="dissertation">✍️ Dissertation</option>
                <option value="demande">📋 Analyse de Demande</option>
                <option value="cas">🛠️ Étude de Cas Professionnel</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 6,
                }}
              >
                Durée de composition
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                  fontFamily: "inherit",
                  fontSize: 13,
                }}
              >
                <option value={15}>
                  ⏱️ 15 minutes (Brouillon &amp; Plan express)
                </option>
                <option value={45}>⏱️ 45 minutes (Rédaction accélérée)</option>
                <option value={90}>
                  ⏱️ 90 minutes (Conditions réelles CNAM)
                </option>
              </select>
            </div>
          </div>
          <button
            className="btn solid"
            style={{ width: "100%" }}
            onClick={start}
          >
            Commencer l&apos;épreuve
          </button>
        </div>
      )}

      {view === "active" && subject && (
        <div className="qbox" id="examActive">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--line)",
              paddingBottom: 12,
              marginBottom: 15,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span
              className="chip"
              style={{
                background: "var(--deontologie)",
                color: "#fff",
                borderColor: "var(--deontologie)",
                fontWeight: 700,
              }}
            >
              SUJET D&apos;EXAMEN
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}
              >
                Temps restant :
              </span>
              <span
                style={{ fontSize: 24, fontWeight: 800, color: "var(--rps)" }}
              >
                {fmtTime(remaining)}
              </span>
            </div>
          </div>
          <h3
            style={{
              margin: "0 0 15px",
              fontSize: 18,
              lineHeight: 1.45,
              color: "var(--ink)",
            }}
          >
            {subject.t}
          </h3>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 6,
              }}
            >
              Zone de rédaction
            </label>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              style={{
                width: "100%",
                height: 250,
                padding: 12,
                borderRadius: 8,
                border: "1px solid var(--line)",
                fontFamily: "inherit",
                fontSize: 13,
                lineHeight: 1.5,
                resize: "vertical",
              }}
              placeholder="Rédigez votre introduction, problématique et structure de plan ici..."
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button className="btn warn" onClick={abandon}>
              Abandonner
            </button>
            <button
              className="btn solid"
              style={{
                background: "var(--good)",
                borderColor: "var(--good)",
                color: "#fff",
              }}
              onClick={finish}
            >
              Terminer et voir le corrigé
            </button>
          </div>
        </div>
      )}

      {view === "debrief" && subject && (
        <div className="qbox" id="examDebrief">
          <h3 style={{ marginTop: 0, color: "var(--good)" }}>
            Épreuve Terminée ! Place à l&apos;auto-évaluation
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.45,
              marginBottom: 20,
            }}
          >
            Prends le temps de relire ta copie. Coche ci-dessous les critères de
            déontologie et de posture que tu as réussi à intégrer dans tes
            écrits :
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginBottom: 20,
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 15,
              }}
            >
              <h4
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  textTransform: "uppercase",
                  color: "var(--ink)",
                }}
              >
                Critères du correcteur
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {subject.criteria.map((c, i) => (
                  <label
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked.has(i)}
                      onChange={() => toggleCriterion(i)}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: 10,
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--muted)",
                  }}
                >
                  Score : {checked.size} / {subject.criteria.length}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--deontologie)",
                  }}
                >
                  {Math.round((100 * checked.size) / subject.criteria.length)}%
                </span>
              </div>
            </div>
            <div>
              <details className="fcard" style={{ margin: 0 }}>
                <summary>📖 Consulter la Copie d&apos;Élite Rédigée</summary>
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    maxHeight: 350,
                    overflowY: "auto",
                    padding: 15,
                    borderTop: "1px solid var(--line)",
                  }}
                  dangerouslySetInnerHTML={{ __html: subject.corrige }}
                />
              </details>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <button className="btn ghost" onClick={() => setView("setup")}>
              Retour au menu
            </button>
            <button
              className="btn solid"
              style={{
                background: "var(--deontologie)",
                borderColor: "var(--deontologie)",
              }}
              disabled={saved}
              onClick={save}
            >
              {saved ? "Essai enregistré ✓" : "Enregistrer mon essai"}
            </button>
          </div>
        </div>
      )}

      <div className="qbox" id="examHistoryCard" style={{ marginTop: 20 }}>
        <div
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: 14,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          🗂️ Historique de vos examens blancs
        </div>
        <p
          style={{ fontSize: 12.5, color: "var(--muted)", margin: "0 0 15px" }}
        >
          Retrouvez ici vos sessions d&apos;entraînement passées et vos scores
          d&apos;auto-évaluation.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {history.length === 0 ? (
            <div
              style={{
                fontSize: 12.5,
                color: "var(--muted)",
                textAlign: "center",
                padding: 12,
              }}
            >
              Aucun essai enregistré pour le moment.
            </div>
          ) : (
            history.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  padding: "8px 10px",
                  background: "var(--paper)",
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                }}
              >
                <span>
                  {h.date} {h.type ? `· ${h.type}` : ""}
                </span>
                <span style={{ fontWeight: 700 }}>
                  {h.score} / {h.total}
                </span>
              </div>
            ))
          )}
        </div>
        {history.length > 0 && (
          <div style={{ textAlign: "right", marginTop: 12 }}>
            <button
              className="btn small warn"
              onClick={() => {
                store.clearExams();
                onStoreChange();
              }}
            >
              Effacer l&apos;historique
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
