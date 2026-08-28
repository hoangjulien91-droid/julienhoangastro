import type { PstStore } from "./store";

export interface AxisRow {
  ax: string;
  mast: number;
  tot: number;
}

export function computeAxisRows(
  cards: { id: string; axis: string }[],
  cardAxes: string[],
  store: PstStore,
): AxisRow[] {
  return cardAxes
    .map((ax) => {
      const ids = cards.filter((c) => c.axis === ax).map((c) => c.id);
      return {
        ax,
        mast: ids.filter((id) => store.getBox(id) >= 4).length,
        tot: ids.length,
      };
    })
    .filter((r) => r.tot > 0);
}

export function weakestAxis(rows: AxisRow[]): AxisRow | undefined {
  return rows.slice().sort((a, b) => a.mast / a.tot - b.mast / b.tot)[0];
}
