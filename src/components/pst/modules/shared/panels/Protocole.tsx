"use client";

import { useState, type ReactNode } from "react";
import type { ProtoStep } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";

interface ProtocoleProps {
  data: ProtoStep[];
  hint: string;
  referenceExplanation: ReactNode;
}

export function Protocole({
  data,
  hint,
  referenceExplanation,
}: ProtocoleProps) {
  const [pool, setPool] = useState<number[]>(() =>
    shuffleArr(data.map((p) => p.n)),
  );
  const [order, setOrder] = useState<number[]>([]);

  function pick(n: number) {
    setOrder((prev) => [...prev, n]);
  }

  function reset() {
    setPool(shuffleArr(data.map((p) => p.n)));
    setOrder([]);
  }

  const finished = order.length === data.length;
  const correct = finished && order.every((n, i) => n === i + 1);
  const remaining = pool.filter((n) => !order.includes(n));

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="schema" id="protoFrise" style={{ marginBottom: 18 }}>
        {data.map((s) => (
          <div className="proto-step" key={s.n}>
            <div className="proto-num">{s.n}</div>
            <div>
              <div className="proto-t">
                {s.t} <span className="proto-role">· {s.role}</span>
              </div>
              <div className="proto-d">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="qcard">
        <div className="qtext">Remettre dans l&apos;ordre chronologique :</div>
        <div className="chips" style={{ marginBottom: 14 }}>
          {remaining.map((n) => {
            const step = data.find((p) => p.n === n);
            return (
              <button key={n} className="chip" onClick={() => pick(n)}>
                {step?.t}
              </button>
            );
          })}
        </div>
        <div style={{ marginBottom: 14, minHeight: 40 }}>
          {order.length === 0 ? (
            <span style={{ color: "var(--muted)", fontSize: 13 }}>
              Clique sur les étapes pour les ordonner chronologiquement.
            </span>
          ) : (
            order.map((n, i) => {
              const step = data.find((p) => p.n === n);
              return (
                <span
                  key={i}
                  className={`proto-chip ${n === i + 1 ? "good" : "bad"}`}
                >
                  {i + 1}. {step?.t}
                </span>
              );
            })
          )}
        </div>
        {finished && (
          <div className={`explain show${correct ? "" : " miss"}`}>
            <b>{correct ? "Parfait - Ordre correct !" : "Ordre incorrect."}</b>
            <p>{referenceExplanation}</p>
          </div>
        )}
        <div className="navrow">
          <span />
          <button className="btn" onClick={reset}>
            Recommencer le jeu
          </button>
        </div>
      </div>
    </div>
  );
}
