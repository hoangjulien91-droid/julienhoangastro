"use client";

import { useState } from "react";
import { Briefcase, CheckCircle2, RotateCcw, ListFilter, Target, BookmarkPlus } from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
} from "@/lib/pst/audio-feedback";

interface CaseAnswers {
  q1: number | null;
  q2: number | null;
}

interface CasProps {
  data: CaseItem[];
  hint: string;
}

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

export function Cas({ data, hint }: CasProps) {
  const [answers, setAnswers] = useState<CaseAnswers[]>(() =>
    data.map(() => ({ q1: null, q2: null })),
  );
  const [mode, setMode] = useState<"list" | "focus">("list");
  const [focusIdx, setFocusIdx] = useState(0);
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);

  function answer(caseIdx: number, question: "q1" | "q2", optIdx: number) {
    const c = data[caseIdx];
    if (!c) return;
    const isOk = !!c[question].options[optIdx]?.ok;
    if (isOk) playSuccessSound();
    else playReviewSound();

    setAnswers((prev) => {
      const next = prev.slice();
      const cur = next[caseIdx];
      if (!cur || cur[question] !== null) return prev;
      next[caseIdx] = { ...cur, [question]: optIdx };
      return next;
    });
  }

  function exportCaseToJournal(c: CaseItem, idx: number) {
    try {
      const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const ok1 = c.q1.options.find((o) => o.ok);
      const ok2 = c.q2.options.find((o) => o.ok);
      const entry = {
        id: `cas-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        context: `Vignette clinique #${idx + 1}`,
        ue: "PST106",
        observation: c.vignette,
        concept: ok1 ? ok1.label : c.q1.prompt,
        posture: ok2 ? `${ok2.label} — ${ok2.fb}` : c.q2.prompt,
      };
      const next = Array.isArray(list) ? [entry, ...list] : [entry];
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      setExportedIdx(idx);
      setTimeout(() => setExportedIdx(null), 1800);
    } catch {
      // ignore
    }
  }

  const totalQuestions = data.length * 2;
  let answeredQuestions = 0;
  let correctQuestions = 0;
  answers.forEach((ans, idx) => {
    const c = data[idx];
    if (!c) return;
    if (ans.q1 !== null) {
      answeredQuestions++;
      if (c.q1.options[ans.q1]?.ok) correctQuestions++;
    }
    if (ans.q2 !== null) {
      answeredQuestions++;
      if (c.q2.options[ans.q2]?.ok) correctQuestions++;
    }
  });

  const pct =
    totalQuestions > 0
      ? Math.round((answeredQuestions * 100) / totalQuestions)
      : 0;
  const pctAcc =
    answeredQuestions > 0
      ? Math.round((correctQuestions * 100) / answeredQuestions)
      : 0;

  function renderCaseCard(c: CaseItem, idx: number) {
    const ans = answers[idx] ?? { q1: null, q2: null };
    const q1Answered = ans.q1 !== null;
    const q2Answered = ans.q2 !== null;
    return (
      <div className="qcard" key={idx}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <Briefcase className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Vignette Clinique #{idx + 1} / {data.length}</span>
          </span>
          <button
            type="button"
            className="btn small inline-flex items-center gap-1"
            style={{ padding: "3px 9px", fontSize: 11 }}
            onClick={() => exportCaseToJournal(c, idx)}
            title="Archiver cette vignette clinique et sa résolution dans le Carnet de Terrain"
          >
            <BookmarkPlus className="size-3 text-slate-500" />
            <span>{exportedIdx === idx ? "✓ Archivé au Carnet" : "Carnet Terrain"}</span>
          </button>
        </div>
        <p style={{ fontSize: 14, fontStyle: "italic" }}>« {c.vignette} »</p>

        <div
          className="qbox"
          style={{
            marginTop: 14,
            borderTop: "1px solid var(--line)",
            paddingTop: 14,
          }}
        >
          <div className="qtext">{c.q1.prompt}</div>
          <div className="opts">
            {c.q1.options.map((opt, oIdx) => {
              const cls = q1Answered
                ? opt.ok
                  ? "opt correct"
                  : oIdx === ans.q1
                    ? "opt wrong"
                    : "opt"
                : "opt";
              return (
                <button
                  key={oIdx}
                  className={cls}
                  disabled={q1Answered}
                  onClick={() => answer(idx, "q1", oIdx)}
                >
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
          {q1Answered && ans.q1 !== null && (
            <div
              className={`explain show${!c.q1.options[ans.q1]?.ok ? " miss" : ""}`}
              dangerouslySetInnerHTML={{
                __html: c.q1.options[ans.q1]?.fb ?? "",
              }}
            />
          )}
        </div>

        {q1Answered && (
          <div
            className="qbox"
            style={{
              marginTop: 14,
              borderTop: "1px solid var(--line)",
              paddingTop: 14,
            }}
          >
            <div className="qtext">{c.q2.prompt}</div>
            <div className="opts">
              {c.q2.options.map((opt, oIdx) => {
                const cls = q2Answered
                  ? opt.ok
                    ? "opt correct"
                    : oIdx === ans.q2
                      ? "opt wrong"
                      : "opt"
                  : "opt";
                return (
                  <button
                    key={oIdx}
                    className={cls}
                    disabled={q2Answered}
                    onClick={() => answer(idx, "q2", oIdx)}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            {q2Answered && ans.q2 !== null && (
              <div
                className={`explain show${!c.q2.options[ans.q2]?.ok ? " miss" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: c.q2.options[ans.q2]?.fb ?? "",
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div
        className="qcard"
        style={{
          position: "sticky",
          top: 52,
          zIndex: 15,
          marginBottom: 14,
          padding: "10px 14px",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
              <Target className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Étapes cliniques : {answeredQuestions} / {totalQuestions} ({pct}%)</span>
            </span>
            {answeredQuestions > 0 && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>Diagnostic : {correctQuestions}/{answeredQuestions} ({pctAcc}%)</span>
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              type="button"
              className={`btn small${mode === "list" ? " primary" : ""}`}
              style={{ padding: "3px 9px", fontSize: 11 }}
              onClick={() => {
                playClickSound();
                setMode("list");
              }}
            >
              Vue Liste ({data.length})
            </button>
            <button
              type="button"
              className={`btn small${mode === "focus" ? " primary" : ""}`}
              style={{ padding: "3px 9px", fontSize: 11 }}
              onClick={() => {
                playClickSound();
                setMode("focus");
              }}
            >
              Focus 1 par 1
            </button>
            <button
              type="button"
              className="btn small"
              style={{ padding: "3px 9px", fontSize: 11 }}
              onClick={() => {
                playClickSound();
                setAnswers(data.map(() => ({ q1: null, q2: null })));
                setFocusIdx(0);
              }}
            >
              ↻ Réinitialiser
            </button>
          </div>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: "var(--rule)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "var(--accent)",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

      {mode === "focus" ? (
        <div>
          {data[focusIdx] && renderCaseCard(data[focusIdx]!, focusIdx)}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <button
              type="button"
              className="btn small"
              disabled={focusIdx <= 0}
              onClick={() => {
                playClickSound();
                setFocusIdx((i) => Math.max(0, i - 1));
              }}
            >
              ← Vignette précédente
            </button>
            <span className="qnum">
              {focusIdx + 1} / {data.length}
            </span>
            <button
              type="button"
              className="btn small primary"
              disabled={focusIdx >= data.length - 1}
              onClick={() => {
                playClickSound();
                setFocusIdx((i) => Math.min(data.length - 1, i + 1));
              }}
            >
              Vignette suivante →
            </button>
          </div>
        </div>
      ) : (
        <div id="casHost">
          {data.map((c, idx) => renderCaseCard(c, idx))}
        </div>
      )}
    </div>
  );
}
