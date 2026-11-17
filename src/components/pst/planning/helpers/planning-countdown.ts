"use client";

import { useEffect, useState } from "react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { formatFrDate } from "@/lib/pst/planning-stats";

export interface CountdownText {
  badge: string;
  label: string;
  mobileLabel?: string;
  isNow: boolean;
  isToday: boolean;
}

export function usePlanningCountdown(nextImmediate: PlanningEvent | null) {
  const [countdownText, setCountdownText] = useState<CountdownText | null>(null);

  useEffect(() => {
    const ev = nextImmediate;
    if (!ev) return;

    function computeCountdown() {
      if (!ev) return;
      const now = new Date();
      const [y, m, d] = ev.date.split("-").map(Number);
      const [h, min] = ev.start.split(":").map(Number);
      const targetStart = new Date(y, m - 1, d, h, min, 0);

      const [hEnd, minEnd] = ev.end.split(":").map(Number);
      const targetEnd = new Date(y, m - 1, d, hEnd, minEnd, 0);

      const unitCode = ev.unit.toUpperCase();

      if (now >= targetStart && now <= targetEnd) {
        setCountdownText({
          badge: "EN DIRECT",
          label: `Séance ${unitCode} en cours jusqu'à ${ev.end}`,
          mobileLabel: `${unitCode} en cours jusqu'à ${ev.end}`,
          isNow: true,
          isToday: true,
        });
        return;
      }

      const diffMs = targetStart.getTime() - now.getTime();
      const isToday =
        now.getFullYear() === y &&
        now.getMonth() === m - 1 &&
        now.getDate() === d;

      if (isToday && diffMs > 0) {
        const diffHours = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        setCountdownText({
          badge: "AUJOURD'HUI",
          label: `${unitCode} à ${ev.start} (dans ${diffHours}h ${diffMins}m)`,
          mobileLabel: `${unitCode} à ${ev.start} (${diffHours}h${diffMins > 0 ? diffMins : ""})`,
          isNow: false,
          isToday: true,
        });
        return;
      }

      if (diffMs > 0) {
        const totalSec = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);

        const shortDay = ev.day.slice(0, 3) + ".";
        const shortDate = formatFrDate(ev.date).slice(0, 5);

        setCountdownText({
          badge: `J-${days}`,
          label: `Prochaine séance : ${ev.day} ${formatFrDate(ev.date)} à ${ev.start} (${unitCode} · ${hours}h ${minutes}m)`,
          mobileLabel: `Prochaine : ${shortDay} ${shortDate} à ${ev.start} (${unitCode})`,
          isNow: false,
          isToday: false,
        });
      } else {
        setCountdownText(null);
      }
    }

    computeCountdown();
    const timer = setInterval(computeCountdown, 1000);
    return () => clearInterval(timer);
  }, [nextImmediate]);

  return countdownText;
}
