"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  delay?: number;
}

export function ToolCard({ title, description, href, icon, delay = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link
        href={href}
        className="group block rounded-lg border border-border bg-surface/50 p-5 transition-all hover:border-accent-light hover:bg-surface-hover"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background transition-colors group-hover:border-accent">
          {icon}
        </div>
        <h3 className="mb-1 font-serif text-base text-text-primary transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="font-sans text-xs leading-relaxed text-text-tertiary">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}
