"use client";

import { formatMonthLabelFr } from "@/lib/pst/planning-stats";

interface PlanningListMonthHeaderProps {
  date: string;
  monthStat?: { count: number; hours: number };
}

export function PlanningListMonthHeader({
  date,
  monthStat,
}: PlanningListMonthHeaderProps) {
  return (
    <li className="pt-4 pb-2 px-1 flex items-center justify-between border-b border-slate-300/70 dark:border-slate-700/70">
      <span className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
        {formatMonthLabelFr(date)}
      </span>
      {monthStat && (
        <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {monthStat.count} séance{monthStat.count > 1 ? "s" : ""} ·{" "}
          {monthStat.hours}h
        </span>
      )}
    </li>
  );
}
