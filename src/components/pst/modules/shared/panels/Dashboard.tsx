"use client";

import type { ReactNode } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap } from "@/lib/pst/types";
import { ALL_BADGE_DESCS, QUIZ_LABELS } from "@/lib/pst/data/badges";
import {
  BackupReminder,
  BackupRestorePanel,
} from "@/components/pst/quiz/BackupRestorePanel";

export interface DashboardAdvice {
  title: string;
  text: string;
  btn: string;
  panel: string;
  leitner: boolean;
}

interface DashboardProps {
  store: PstStore;
  cards: { id: string; axis: string }[];
  ficheCount: number;
  authors: AMap;
  cardAxes: string[];
  streakHint: string;
  toolboxTitle: string;
  toolboxDesc: ReactNode;
  mindmapLabel: string;
  protocoleLabel: string;
  advice: DashboardAdvice;
  onStoreChange: () => void;
  onGoTab: (panel: string) => void;
  onTriggerRevision: () => void;
  /** Extra module-specific cards rendered after the standard toolbox card. */
  extraCards?: ReactNode;
}

export function Dashboard({
  store,
  cards,
  ficheCount,
  authors,
  cardAxes,
  streakHint,
  toolboxTitle,
  toolboxDesc,
  mindmapLabel,
  protocoleLabel,
  advice,
  onStoreChange,
  onGoTab,
  onTriggerRevision,
  extraCards,
}: DashboardProps) {
  const badges = store.getBadges();
  const streak = store.getStreak();
  const marks = store.getMarks();
  const masteredFiches = Object.keys(marks).filter(
    (k) => k.startsWith("fiche_mastery_") && marks[k],
  ).length;
  const pctFiches = ficheCount
    ? Math.round((100 * masteredFiches) / ficheCount)
    : 0;
  const masteredCards = cards.filter((c) => store.getBox(c.id) >= 4).length;
  const dueIds = store.getDueCardIds(cards.map((c) => c.id));
  const dueCount = dueIds.length;
  const dueNew = dueIds.filter((id) => marks[id] === undefined).length;
  const dueReview = dueCount - dueNew;

  const axisRows = cardAxes
    .map((ax) => {
      const ids = cards.filter((c) => c.axis === ax).map((c) => c.id);
      return {
        ax,
        mast: ids.filter((id) => store.getBox(id) >= 4).length,
        tot: ids.length,
      };
    })
    .filter((r) => r.tot > 0);

  return (
    <div id="dashHost">
      <BackupReminder store={store} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 15,
          marginBottom: 18,
        }}
      >
        <div className="schema" style={{ margin: 0, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            Série de révision
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "var(--accent)",
              margin: "6px 0",
            }}
          >
            {streak} jours
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            {streakHint}
          </div>
        </div>
        <div className="schema" style={{ margin: 0, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            Fiches mémorisées
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "var(--sante)",
              margin: "6px 0",
            }}
          >
            {masteredFiches} / {ficheCount}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            {pctFiches}% du programme maîtrisé
          </div>
        </div>
        <div className="schema" style={{ margin: 0, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            Cartes maîtrisées
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "var(--molinier)",
              margin: "6px 0",
            }}
          >
            {masteredCards} / {cards.length}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Boîtes 4-5 de la répétition espacée.
          </div>
        </div>
      </div>

      <div
        className="qcard next"
        style={{ borderLeft: "4px solid var(--accent)", marginBottom: 18 }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--muted)",
            fontWeight: 700,
          }}
        >
          Prochaine étape conseillée
        </div>
        <h3
          style={{ margin: "4px 0 6px", fontSize: 16, color: "var(--accent)" }}
        >
          {advice.title}
        </h3>
        <p style={{ fontSize: 13, margin: "0 0 12px", lineHeight: 1.5 }}>
          {advice.text}
        </p>
        <button
          className="btn small solid"
          onClick={() => {
            onGoTab(advice.panel);
            if (advice.leitner) onTriggerRevision();
          }}
        >
          {advice.btn} →
        </button>
      </div>

      <div className="qcard" style={{ marginBottom: 18 }}>
        <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--accent)" }}>
          Cartes maîtrisées par axe
        </h3>
        {axisRows.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
            Marque tes cartes pour voir ta progression par axe.
          </p>
        ) : (
          axisRows.map((r) => {
            const pct = r.tot ? Math.round((100 * r.mast) / r.tot) : 0;
            const col = `var(--${r.ax})`;
            return (
              <div
                key={r.ax}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                  fontSize: 13,
                }}
              >
                <span style={{ flex: "none", width: 170, fontWeight: 600 }}>
                  {authors[r.ax]}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: 6,
                    background: "var(--line)",
                    borderRadius: 999,
                    overflow: "hidden",
                    display: "block",
                  }}
                >
                  <i
                    style={{
                      display: "block",
                      height: "100%",
                      width: `${pct}%`,
                      background: col,
                    }}
                  />
                </span>
                <span
                  style={{
                    flex: "none",
                    width: 48,
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 600,
                    color: col,
                  }}
                >
                  {r.mast}/{r.tot}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="qcard" style={{ marginBottom: 18 }}>
        <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--accent)" }}>
          Tes derniers scores
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
            gap: 10,
          }}
        >
          {Object.keys(QUIZ_LABELS).map((m) => {
            const s = store.getScore(m);
            const hist = store.getScoreHistory(m);
            const last = hist[hist.length - 1];
            const prev = hist[hist.length - 2];
            const trend =
              last && prev
                ? last.pct > prev.pct
                  ? " ↗"
                  : last.pct < prev.pct
                    ? " ↘"
                    : " →"
                : "";
            const col = !s
              ? "var(--muted)"
              : s.pct >= 80
                ? "var(--good)"
                : s.pct >= 60
                  ? "var(--precurseurs)"
                  : "var(--bad)";
            return (
              <div
                key={m}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "10px 6px",
                  textAlign: "center",
                }}
                title={
                  hist.length
                    ? `Dernières tentatives : ${hist
                        .slice(-5)
                        .map((h) => h.pct + "%")
                        .join(" → ")}`
                    : undefined
                }
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: col }}>
                  {s ? `${s.pct}%${trend}` : "—"}
                </div>
                <div
                  style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}
                >
                  {QUIZ_LABELS[m]}
                </div>
              </div>
            );
          })}
        </div>
        {Object.keys(QUIZ_LABELS).every((m) => !store.getScore(m)) && (
          <div
            style={{
              marginTop: 10,
              fontSize: 12.5,
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "var(--muted)" }}>
              Aucun score encore enregistré.
            </span>
            <button className="btn small solid" onClick={() => onGoTab("qcm")}>
              Lancer mon premier QCM →
            </button>
          </div>
        )}
      </div>

      <div
        className="qcard"
        style={{ borderLeft: "4px solid var(--sante)", marginBottom: 18 }}
      >
        <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--sante)" }}>
          Révision du jour
        </h3>
        <p style={{ fontSize: 13, margin: "0 0 10px" }}>
          {dueCount > 0 ? (
            <>
              <b>{dueCount} carte(s)</b> pour aujourd&apos;hui selon
              l&apos;échéancier <b>SM-2</b>
              {dueNew > 0 && dueReview > 0 ? (
                <>
                  {" "}
                  : {dueNew} nouvelles à découvrir, {dueReview} à revoir — les
                  plus fragiles d&apos;abord.
                </>
              ) : dueReview > 0 ? (
                <> : les notions les plus fragiles d&apos;abord.</>
              ) : (
                <> — toutes nouvelles, à découvrir à ton rythme.</>
              )}
            </>
          ) : (
            <>
              🎉 Aucune carte due aujourd&apos;hui — l&apos;échéancier{" "}
              <b>SM-2</b> est à jour. Session libre possible.
            </>
          )}
        </p>
        <button
          className="btn small solid"
          onClick={() => {
            onGoTab("cartes");
            onTriggerRevision();
          }}
        >
          {dueCount > 0
            ? `Réviser les ${dueCount} cartes dues`
            : "Réviser maintenant"}
        </button>
      </div>

      <div
        className="qcard"
        style={{ borderLeft: "4px solid var(--accent)", marginBottom: 18 }}
      >
        <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--accent)" }}>
          {toolboxTitle}
        </h3>
        <p style={{ fontSize: 13, margin: "0 0 10px" }}>{toolboxDesc}</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn small solid"
            onClick={() => onGoTab("mindmap")}
          >
            {mindmapLabel}
          </button>
          <button className="btn small" onClick={() => onGoTab("protocole")}>
            {protocoleLabel}
          </button>
        </div>
      </div>

      {extraCards}

      {badges.length > 0 && (
        <div
          className="qcard"
          style={{ borderLeft: "4px solid var(--accent)", marginBottom: 18 }}
        >
          <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--accent)" }}>
            🏆 Tes Badges Déverrouillés
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {badges.map((b) => (
              <span
                key={b}
                className="chip"
                style={{
                  background: "var(--bonusbg)",
                  color: "var(--bonusink)",
                  borderColor: "var(--bonusink)",
                  fontWeight: 600,
                  padding: "4px 8px",
                  fontSize: 11,
                }}
              >
                {ALL_BADGE_DESCS[b] || b}
              </span>
            ))}
          </div>
        </div>
      )}

      <BackupRestorePanel store={store} onUpdate={onStoreChange} />
    </div>
  );
}
