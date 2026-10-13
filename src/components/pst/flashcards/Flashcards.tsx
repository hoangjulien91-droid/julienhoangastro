"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap, Flashcard } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";
import { useCurrentCardText } from "@/components/pst/shell/CurrentCardContext";
import { LeitnerBoxes } from "./LeitnerBoxes";
import { SwipeGame } from "./SwipeGame";
import {
  playFlipSound,
  playSuccessSound,
  playReviewSound,
  playDeckCompleteSound,
  isAudioEnabled,
  setAudioEnabled,
} from "@/lib/pst/audio-feedback";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

interface FlashcardsProps {
  store: PstStore;
  cartes: Flashcard[];
  authors: AMap;
  onStoreChange: () => void;
  /** Bump this counter (e.g. from a dashboard "Réviser maintenant" button)
   * to switch the deck into spaced-repetition (Leitner) mode from outside. */
  revisionTrigger?: number;
}

function buildDeck(
  cartes: Flashcard[],
  store: PstStore,
  opts: {
    axis: string;
    onlyKo: boolean;
    dueOnly: boolean;
    dueSet: Set<string>;
    leitnerFilter: number | null;
    search: string;
    leitnerSort: boolean;
    shuffle: boolean;
    hideBonus: boolean;
  },
) {
  let deck = cartes.filter((c) => opts.axis === "all" || c.axis === opts.axis);
  if (opts.hideBonus) deck = deck.filter((c) => c.category !== "bonus");
  if (opts.onlyKo) deck = deck.filter((c) => store.getBox(c.id) === 1);
  if (opts.dueOnly) deck = deck.filter((c) => opts.dueSet.has(c.id));
  if (opts.leitnerFilter !== null) {
    deck = deck.filter((c) => store.getBox(c.id) === opts.leitnerFilter);
  }
  if (opts.search) {
    const q = opts.search.trim().toLowerCase();
    deck = deck.filter(
      (c) =>
        c.q.toLowerCase().includes(q) ||
        c.a.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q),
    );
  }
  if (opts.leitnerSort) {
    deck = deck.slice().sort((a, b) => store.getBox(a.id) - store.getBox(b.id));
  }
  if (opts.shuffle) deck = shuffleArr(deck);
  return deck;
}

export function Flashcards({
  store,
  cartes,
  authors,
  onStoreChange,
  revisionTrigger,
}: FlashcardsProps) {
  const [mode, setMode] = useState<"classic" | "swipe">("classic");
  const [currentAxis, setCurrentAxis] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffleOn, setShuffleOn] = useState(false);
  const [onlyKo, setOnlyKo] = useState(false);
  const [dueOnly, setDueOnly] = useState(false);
  const [hideBonus, setHideBonus] = useState(false);
  const [leitnerSort, setLeitnerSort] = useState(false);
  const [leitnerFilter, setLeitnerFilter] = useState<number | null>(null);
  const [fcIdx, setFcIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [recallText, setRecallText] = useState("");
  const [version, setVersion] = useState(0);
  const [swipeDx, setSwipeDx] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cartes dues aujourd'hui selon l'échéancier SM-2 (nouvelles cartes incluses)
  const dueSet = useMemo(
    () => new Set(store.getDueCardIds(cartes.map((c) => c.id))),
    // version : recalcule après chaque notation de carte
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartes, store, version],
  );

  const firstRevisionTrigger = useRef(revisionTrigger);
  useEffect(() => {
    if (
      revisionTrigger === undefined ||
      revisionTrigger === firstRevisionTrigger.current
    )
      return;
    firstRevisionTrigger.current = revisionTrigger;
    setMode("classic");
    // « Réviser maintenant » : session SM-2 (cartes dues), fragiles d'abord
    setDueOnly(dueSet.size > 0);
    setLeitnerSort(true);
    setLeitnerFilter(null);
    setFcIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revisionTrigger]);

  const deck = useMemo(
    () =>
      buildDeck(cartes, store, {
        axis: currentAxis,
        onlyKo,
        dueOnly,
        dueSet,
        leitnerFilter,
        search: searchQuery,
        leitnerSort,
        shuffle: shuffleOn,
        hideBonus,
      }),
    // shuffleOn intentionally re-shuffles only when toggled, matching source's
    // "re-render only on checkbox change" behaviour rather than every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      cartes,
      currentAxis,
      onlyKo,
      dueOnly,
      leitnerFilter,
      searchQuery,
      leitnerSort,
      shuffleOn,
      hideBonus,
      version,
    ],
  );

  useEffect(() => {
    if (fcIdx >= deck.length) setFcIdx(0);
  }, [deck, fcIdx]);

  const axes = useMemo(
    () => [
      "all",
      ...Object.keys(authors).filter((k) => cartes.some((c) => c.axis === k)),
    ],
    [authors, cartes],
  );

  const card = deck[fcIdx] ?? null;

  const { setText: setSpokenCardText } = useCurrentCardText();
  useEffect(() => {
    if (!card) return;
    setSpokenCardText(
      [card.q, stripHtml(card.a), stripHtml(card.deep)]
        .filter(Boolean)
        .join(". "),
    );
  }, [card, setSpokenCardText]);

  function bump() {
    setVersion((v) => v + 1);
    onStoreChange();
  }

  function markAndAdvance(result: "ok" | "mid" | "ko") {
    if (!deck.length || !card) return;
    if (result === "ok") playSuccessSound();
    else playReviewSound();
    store.markCard(card.id, result);
    const nextIdx = fcIdx + 1;
    if (nextIdx >= deck.length) {
      playDeckCompleteSound();
      setFcIdx(0);
    } else {
      setFcIdx(nextIdx);
    }
    setFlipped(false);
    setRecallText("");
    bump();
  }

  // Raccourcis clavier de drill : Espace = retourner, ←/→ = naviguer,
  // 1/2/3 = À revoir / Moyen / Su (une fois la carte retournée).
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      if (
        tgt &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.tagName === "SELECT" ||
          tgt.tagName === "BUTTON" ||
          tgt.isContentEditable)
      )
        return;
      // N'agit que si le panneau Cartes est l'onglet visible
      const panel = containerRef.current?.closest(".panel");
      if (panel && !panel.classList.contains("on")) return;
      if (mode !== "classic" || !deck.length) return;

      if (e.key === " ") {
        e.preventDefault();
        playFlipSound();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFcIdx((i) => (i + 1) % deck.length);
        setFlipped(false);
        setRecallText("");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFcIdx((i) => (i - 1 + deck.length) % deck.length);
        setFlipped(false);
        setRecallText("");
      } else if (flipped && (e.key === "1" || e.key === "2" || e.key === "3")) {
        e.preventDefault();
        markAndAdvance(e.key === "1" ? "ko" : e.key === "2" ? "mid" : "ok");
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  function resetBoxes() {
    store.resetBoxes();
    setLeitnerFilter(null);
    setFcIdx(0);
    bump();
  }

  let ok = 0;
  cartes.forEach((c) => {
    if (store.getBox(c.id) >= 4) ok++;
  });
  const dueCount = dueSet.size;
  const allMarks = store.getMarks();
  let dueNew = 0;
  dueSet.forEach((id) => {
    if (allMarks[id] === undefined) dueNew++;
  });
  const dueReview = dueCount - dueNew;
  const rest = cartes.length - ok;

  if (mode === "swipe") {
    return (
      <div id="cartes">
        <ModeSwitcher mode={mode} onChange={setMode} />
        <SwipeGame
          cartes={cartes}
          currentAxis={currentAxis}
          authors={authors}
        />
      </div>
    );
  }

  return (
    <div id="cartes" ref={containerRef}>
      <ModeSwitcher mode={mode} onChange={setMode} />
      <p
        className="hint"
        style={{ fontSize: 11.5, color: "var(--muted)", margin: "0 0 10px" }}
      >
        ⌨ Espace : retourner · ←/→ : naviguer · 1/2/3 : À revoir / Moyen / Su
      </p>

      <div className="controls">
        <div
          id="chips"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 10,
          }}
        >
          {axes.map((k) => (
            <button
              key={k}
              className={`chip${k === currentAxis ? " active" : ""}`}
              onClick={() => {
                setCurrentAxis(k);
                setFcIdx(0);
              }}
            >
              {k === "all" ? "Toutes" : authors[k]}
            </button>
          ))}
        </div>
        <div style={{ margin: "10px 0" }}>
          <input
            type="text"
            id="fcSearch"
            placeholder="Rechercher une notion..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFcIdx(0);
            }}
            style={{
              width: "100%",
              maxWidth: 320,
              padding: "6px 12px",
              border: "1px solid var(--line)",
              borderRadius: 6,
              fontSize: 13,
              background: "var(--card)",
              color: "var(--ink)",
              marginBottom: 10,
            }}
          />
        </div>
        {cartes.some((c) => c.category) && (
          <label>
            <input
              type="checkbox"
              id="hideBonus"
              checked={hideBonus}
              onChange={(e) => {
                setHideBonus(e.target.checked);
                setFcIdx(0);
              }}
            />{" "}
            Cœur seulement
          </label>
        )}{" "}
        <label>
          <input
            type="checkbox"
            id="shuffle"
            checked={shuffleOn}
            onChange={(e) => {
              setShuffleOn(e.target.checked);
              setLeitnerFilter(null);
              setFcIdx(0);
            }}
          />{" "}
          Aléatoire
        </label>{" "}
        <label>
          <input
            type="checkbox"
            id="onlyKo"
            checked={onlyKo}
            onChange={(e) => {
              setOnlyKo(e.target.checked);
              setLeitnerFilter(null);
              setFcIdx(0);
            }}
          />{" "}
          Uniquement à revoir
        </label>{" "}
        <label>
          <input
            type="checkbox"
            id="dueOnly"
            checked={dueOnly}
            onChange={(e) => {
              setDueOnly(e.target.checked);
              setLeitnerFilter(null);
              setFcIdx(0);
            }}
          />{" "}
          Dues aujourd&apos;hui ({dueSet.size})
        </label>{" "}
        <label>
          <input
            type="checkbox"
            id="leitner"
            checked={leitnerSort}
            onChange={(e) => {
              setLeitnerSort(e.target.checked);
              setLeitnerFilter(null);
              setFcIdx(0);
            }}
          />{" "}
          Trier par boîte Leitner
        </label>
        {leitnerSort && (
          <LeitnerBoxes
            store={store}
            cartes={cartes}
            activeBox={leitnerFilter}
            onSelectBox={setLeitnerFilter}
          />
        )}
      </div>

      <div
        className="progress"
        style={{
          display: "flex",
          gap: 10,
          margin: "10px 0",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <span id="sOk">{ok}</span> acquises ·{" "}
        <span id="sKo">
          {dueCount} pour aujourd&apos;hui
          {dueCount > 0 && ` (${dueNew} nouv. · ${dueReview} à revoir)`}
        </span>{" "}
        · <span id="sRest">{rest}</span> en cours d&apos;acquisition
      </div>

      {!deck.length ? (
        <p className="hint">
          {dueOnly
            ? "Toutes les cartes dues aujourd'hui sont révisées. Reviens demain !"
            : "Aucune carte ne correspond à ce filtre."}
        </p>
      ) : (
        card && (
          <>
            <div className="relative">
              {Math.abs(swipeDx) > 28 && (
                <div
                  className={`pointer-events-none absolute top-3 z-20 px-3 py-1 rounded-full text-xs font-bold shadow-md transition-opacity ${
                    swipeDx > 0
                      ? "right-3 bg-emerald-600 text-white"
                      : "left-3 bg-rose-600 text-white"
                  }`}
                >
                  {swipeDx > 0 ? "Su ✓ →" : "← À revoir"}
                </div>
              )}
              <div
                className={`fc${flipped ? " flipped" : ""}`}
                id="fc"
                role="button"
                tabIndex={0}
                aria-label={
                  flipped
                    ? "Carte retournée — Entrée pour revoir la question"
                    : "Carte — Entrée ou Espace pour révéler la réponse"
                }
                onClick={() => {
                  if (Math.abs(swipeDx) > 12) return;
                  playFlipSound();
                  setFlipped((f) => !f);
                }}
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  if (!t) return;
                  touchStartRef.current = { x: t.clientX, y: t.clientY };
                  setSwipeDx(0);
                }}
                onTouchMove={(e) => {
                  const start = touchStartRef.current;
                  const t = e.touches[0];
                  if (!start || !t) return;
                  const dx = t.clientX - start.x;
                  const dy = t.clientY - start.y;
                  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
                    setSwipeDx(Math.max(-120, Math.min(120, dx)));
                  }
                }}
                onTouchEnd={() => {
                  if (swipeDx > 65) {
                    setSwipeDx(0);
                    touchStartRef.current = null;
                    markAndAdvance("ok");
                  } else if (swipeDx < -65) {
                    setSwipeDx(0);
                    touchStartRef.current = null;
                    markAndAdvance("ko");
                  } else {
                    setSwipeDx(0);
                    touchStartRef.current = null;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setFlipped((f) => !f);
                  }
                }}
                style={{
                  cursor: "pointer",
                  transform:
                    swipeDx !== 0
                      ? `translateX(${swipeDx * 0.45}px) rotate(${swipeDx * 0.04}deg)`
                      : undefined,
                  transition: swipeDx === 0 ? "transform 0.2s ease" : "none",
                }}
              >
                <div className="face front">
                  <div
                    style={{
                      padding: "0 20px 10px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <textarea
                      id="fcRecallInput"
                      placeholder="Saisis ta réponse de mémoire (facultatif)..."
                      value={recallText}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setRecallText(e.target.value)}
                      style={{
                        width: "100%",
                        height: 60,
                        padding: 8,
                        border: "1px solid var(--line)",
                        borderRadius: 6,
                        fontSize: 12.5,
                        background: "var(--paper)",
                        color: "var(--ink)",
                        resize: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div id="fcTag">{card.tag}</div>
                  <div id="fcQ">{card.q}</div>
                </div>
                <div className="face back">
                  <div id="fcTagB">
                    {card.tag} · Boîte {store.getBox(card.id)}
                  </div>
                  <div id="fcA" dangerouslySetInnerHTML={{ __html: card.a }} />
                  <div
                    id="fcDeep"
                    dangerouslySetInnerHTML={{ __html: card.deep }}
                  />
                  {flipped && (
                    <div
                      id="fcCompareWrap"
                      style={{
                        padding: "10px 20px",
                        borderTop: "1px dashed var(--line)",
                        background: "var(--paper)",
                        fontSize: 12.5,
                        textAlign: "left",
                        borderRadius: "0 0 var(--r) var(--r)",
                        marginTop: "auto",
                        boxSizing: "border-box",
                        display: recallText.trim() ? "block" : "none",
                      }}
                    >
                      <div
                        style={{
                          color: "var(--muted)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Ta réponse rédigée :
                      </div>
                      <div
                        style={{
                          fontStyle: "italic",
                          color: "var(--ink)",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {recallText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              id="fcCount"
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "var(--muted)",
                margin: "6px 0",
              }}
            >
              {fcIdx + 1} / {deck.length} ·{" "}
              <span className="text-[11px] opacity-80">
                 Glisser ← À revoir / Su →
              </span>
            </div>

            <div
              className="srsrow"
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <button
                id="markKo"
                className="btn"
                onClick={() => markAndAdvance("ko")}
              >
                À revoir
              </button>
              <button
                id="markMid"
                className="btn"
                onClick={() => markAndAdvance("mid")}
              >
                Moyen
              </button>
              <button
                id="markOk"
                className="btn solid"
                onClick={() => markAndAdvance("ok")}
              >
                Su
              </button>
            </div>

            <div
              className="navrow"
              style={{ display: "flex", gap: 8, justifyContent: "center" }}
            >
              <button
                id="prev"
                className="btn"
                onClick={() => {
                  setFcIdx((i) => (i - 1 + deck.length) % deck.length);
                  setFlipped(false);
                  setRecallText("");
                }}
              >
                ← Précédent
              </button>
              <button
                id="next"
                className="btn"
                onClick={() => {
                  setFcIdx((i) => (i + 1) % deck.length);
                  setFlipped(false);
                  setRecallText("");
                }}
              >
                Suivant →
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "var(--muted)",
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              <span>Raccourcis :</span>
              <kbd style={{ padding: "1px 5px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4, fontFamily: "monospace" }}>Espace</kbd>
              <span>Retourner</span>
              <span>·</span>
              <kbd style={{ padding: "1px 5px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4, fontFamily: "monospace" }}>1</kbd>
              <span>À revoir</span>
              <span>·</span>
              <kbd style={{ padding: "1px 5px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4, fontFamily: "monospace" }}>2</kbd>
              <span>Moyen</span>
              <span>·</span>
              <kbd style={{ padding: "1px 5px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4, fontFamily: "monospace" }}>3</kbd>
              <span>Su</span>
              <span>·</span>
              <kbd style={{ padding: "1px 5px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4, fontFamily: "monospace" }}>←/→</kbd>
              <span>Naviguer</span>
            </div>
          </>
        )
      )}

      <button
        id="resetMarks"
        className="btn small"
        style={{ marginTop: 14 }}
        onClick={resetBoxes}
      >
        Réinitialiser les boîtes Leitner
      </button>
    </div>
  );
}

function ModeSwitcher({
  mode,
  onChange,
}: {
  mode: "classic" | "swipe";
  onChange: (m: "classic" | "swipe") => void;
}) {
  return (
    <div
      id="swipeModeToggle"
      style={{
        marginBottom: 14,
        display: "flex",
        gap: 8,
        borderBottom: "1px solid var(--line)",
        paddingBottom: 10,
      }}
    >
      <button
        className={`chip${mode === "classic" ? " active" : ""}`}
        style={{ fontWeight: 600 }}
        onClick={() => onChange("classic")}
      >
        Mode Répétition (SM-2)
      </button>
      <button
        className={`chip${mode === "swipe" ? " active" : ""}`}
        style={{ fontWeight: 600 }}
        onClick={() => onChange("swipe")}
      >
        Mode Classer (Swipe Game)
      </button>
    </div>
  );
}
