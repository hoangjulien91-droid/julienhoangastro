"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import type { RedacItem } from "@/lib/pst/types";

interface RedacProps {
  data: RedacItem[];
  hint: string;
}

export function Redac({ data, hint }: RedacProps) {
  const [openPlan, setOpenPlan] = useState<Set<number>>(new Set());
  const [openCorrige, setOpenCorrige] = useState<Set<number>>(new Set());
  const [doneItems, setDoneItems] = useState<Set<string>>(new Set());

  function toggleSet(
    setFn: Dispatch<SetStateAction<Set<number>>>,
    idx: number,
  ) {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleDone(key: string) {
    setDoneItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div id="redacHost">
        {data.map(([subject, points, corrige], idx) => {
          const planOpen = openPlan.has(idx);
          const corrigeOpen = openCorrige.has(idx);
          return (
            <div className="rcard" key={idx}>
              <div className="qnum">Sujet {idx + 1}</div>
              <div className="qtext">{subject}</div>
              <button
                className="btn"
                onClick={() => toggleSet(setOpenPlan, idx)}
              >
                {planOpen
                  ? "Masquer le plan"
                  : "Voir le plan d'une bonne réponse"}
              </button>
              {planOpen && (
                <div className="plan show">
                  <div className="lbl">Squelette de réponse attendu</div>
                  <ol>
                    {points.map((point, pi) => {
                      const key = `${idx}-${pi}`;
                      return (
                        <li
                          key={pi}
                          className={doneItems.has(key) ? "done" : ""}
                          onClick={() => toggleDone(key)}
                        >
                          {point}
                        </li>
                      );
                    })}
                  </ol>
                  <div className="corrige-wrap">
                    <button
                      className="corrige-btn"
                      onClick={() => toggleSet(setOpenCorrige, idx)}
                    >
                      {corrigeOpen
                        ? "Masquer la copie rédigée"
                        : "Lire la copie modèle rédigée"}
                    </button>
                    {corrigeOpen && (
                      <div className="corrige show">
                        <div className="lab">
                          Copie modèle S-Tier (Validation table)
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: corrige }} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
