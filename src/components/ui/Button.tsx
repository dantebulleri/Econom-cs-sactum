import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
}

const variants = {
  primary:
    "border-accent bg-accent/10 text-accent hover:bg-accent/20",
  secondary:
    "border-border bg-background text-text-secondary hover:border-accent hover:text-accent",
  ghost:
    "border-transparent text-text-tertiary hover:text-text-secondary hover:bg-surface-hover",
};

const sizes = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "secondary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md border font-sans transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
