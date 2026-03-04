import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "accent";
  className?: string;
}

const variants = {
  default: "bg-surface text-text-muted border-border",
  success: "bg-success/15 text-success border-success/20",
  warning: "bg-warning/15 text-warning border-warning/20",
  accent: "bg-accent/15 text-accent border-accent/20",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
