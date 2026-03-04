"use client";

import { motion } from "framer-motion";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="relative rounded-md px-3 py-1.5 font-sans text-xs transition-colors"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 rounded-md bg-background border border-border-subtle"
              style={{ zIndex: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 ${
              activeTab === tab ? "text-text-primary" : "text-text-muted"
            }`}
          >
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
