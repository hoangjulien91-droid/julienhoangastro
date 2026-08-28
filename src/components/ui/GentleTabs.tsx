"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface GentleTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export function GentleTabs({ tabs, defaultTabId, className }: GentleTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className={cn("my-8", className)}>
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-3 mb-6">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer",
                isActive
                  ? "bg-accent text-accent-foreground shadow-xs font-semibold"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="bg-card border border-border/40 rounded-2xl p-6 sm:p-8 shadow-xs animate-in fade-in-50 duration-200">
        {currentTab?.content}
      </div>
    </div>
  );
}
