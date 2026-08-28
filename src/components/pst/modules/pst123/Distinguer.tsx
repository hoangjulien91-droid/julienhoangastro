"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { DISTINCTION } from "@/lib/pst/data/pst123";
import { shuffleArr } from "@/lib/pst/utils";

type Zone = "pool" | "cat1" | "cat2";

const CAT1 = ["demande", "clinique"];
const CAT2 = ["mandat", "change"];

interface DistinguerProps {
  store: PstStore;
  onAnswered?: () => void;
}

export function Distinguer({ store, onAnswered }: DistinguerProps) {
  const [items] = useState(() =>
    shuffleArr(DISTINCTION.map((item, idx) => ({ ...item, idx }))),
  );
  const [zones, setZones] = useState<Record<number, Zone>>(() =>
    Object.fromEntries(items.map((it) => [it.idx, "pool" as Zone])),
  );
  const [checked, setChecked] = useState(false);

  function cycle(idx: number) {
    setZones((prev) => {
      const cur = prev[idx] ?? "pool";
      const next: Zone =
        cur === "pool" ? "cat1" : cur === "cat1" ? "cat2" : "pool";
      return { ...prev, [idx]: next };
    });
    setChecked(false);
  }

  function reset() {
    setZones(Object.fromEntries(items.map((it) => [it.idx, "pool" as Zone])));
    setChecked(false);
  }

  const pool = items.filter((it) => (zones[it.idx] ?? "pool") === "pool");
  const inCat1 = items.filter((it) => zones[it.idx] === "cat1");
  const inCat2 = items.filter((it) => zones[it.idx] === "cat2");

  function isCorrect(item: (typeof items)[number]) {
    const zone = zones[item.idx];
    if (zone === "cat1") return CAT1.includes(item.cat);
    if (zone === "cat2") return CAT2.includes(item.cat);
    return false;
  }

  function check() {
    if (pool.length > 0) return;
    setChecked(true);
    const correct = items.filter((it) => isCorrect(it)).length;
    store.recordScore("distinguer", correct, items.length);
    onAnswered?.();
  }

  const allCorrect = checked && items.every((it) => isCorrect(it));

  return (
    <div>
      <p className="hint">
        Distingue les concepts voisins de la déontologie pour éviter les
        amalgames le jour de l&apos;examen.
      </p>
      <div id="distHost">
        <div className="qbox">
          <div
            style={{
              fontWeight: 700,
              color: "var(--accent)",
              fontSize: 14,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Concepts mélangés
          </div>
          <p
            style={{
              fontSize: 12.5,
              color: "var(--muted)",
              margin: "0 0 12px",
            }}
          >
            Clique chaque concept pour le faire défiler entre les zones (pool →
            colonne 1 → colonne 2 → pool), puis vérifie.
          </p>
          <div
            className="dist-items"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 15,
              minHeight: 60,
            }}
          >
            {pool.map((item) => (
              <div
                key={item.idx}
                className="dist-item"
                role="button"
                tabIndex={0}
                onClick={() => cycle(item.idx)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && cycle(item.idx)
                }
              >
                {item.label}
              </div>
            ))}
          </div>
          <div
            className="dist-row"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div className="dist-col">
              <div
                className="dist-title"
                style={{ color: "var(--deontologie)" }}
              >
                Demande / Prévention organisationnelle
              </div>
              <div className="dist-items">
                {inCat1.map((item) => {
                  const ok = checked ? isCorrect(item) : undefined;
                  return (
                    <div
                      key={item.idx}
                      className={`dist-item${checked ? (ok ? " ok" : " bad") : ""}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => cycle(item.idx)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && cycle(item.idx)
                      }
                    >
                      {item.label}
                      {checked && <b> {ok ? "✓" : "✗"}</b>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="dist-col">
              <div className="dist-title" style={{ color: "var(--mandat)" }}>
                Mandat / Adaptation individuelle
              </div>
              <div className="dist-items">
                {inCat2.map((item) => {
                  const ok = checked ? isCorrect(item) : undefined;
                  return (
                    <div
                      key={item.idx}
                      className={`dist-item${checked ? (ok ? " ok" : " bad") : ""}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => cycle(item.idx)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && cycle(item.idx)
                      }
                    >
                      {item.label}
                      {checked && <b> {ok ? "✓" : "✗"}</b>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="navrow" style={{ marginTop: 14 }}>
            <button className="btn solid small" onClick={check}>
              Vérifier
            </button>
            <button className="btn small" onClick={reset}>
              Recommencer
            </button>
          </div>
          {checked && (
            <div
              style={{
                marginTop: 12,
                fontWeight: 700,
                fontSize: 13,
                textAlign: "center",
                color: allCorrect ? "var(--good)" : "var(--bad)",
              }}
            >
              {allCorrect
                ? "✓ Tout est correctement classé !"
                : "✗ Certains concepts sont mal classés. Regarde les items en rouge."}
            </div>
          )}
          {pool.length > 0 && (
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              Place d&apos;abord tous les concepts dans une colonne.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
