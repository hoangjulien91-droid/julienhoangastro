"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { PONTS, type Pont } from "@/lib/pst/data/ponts";
import { SmartBridgeSlideOver } from "./SmartBridgeSlideOver";

interface SmartBridgeBadgeProps {
  conceptQuery: string;
  label?: string;
}

export function SmartBridgeBadge({
  conceptQuery,
  label,
}: SmartBridgeBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const matchedPont: Pont | undefined = PONTS.find(
    (p) =>
      p.c.toLowerCase().includes(conceptQuery.toLowerCase()) ||
      conceptQuery.toLowerCase().includes(p.c.toLowerCase()),
  );

  if (!matchedPont) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 rounded-md text-[11px] font-semibold transition-all cursor-pointer mx-1 align-middle"
        title={`Passerelle transversale : ${matchedPont.c}`}
      >
        <Link2 className="text-amber-600 dark:text-amber-400 size-3" />
        <span>{label || matchedPont.c.split("·")[0]}</span>
      </button>

      <SmartBridgeSlideOver
        pont={matchedPont}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
