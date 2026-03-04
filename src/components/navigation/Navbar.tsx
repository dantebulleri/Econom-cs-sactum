"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme/ThemeToggle";

const navItems = [
  { label: "Inicio", href: "/", icon: HomeIcon },
  { label: "Buscador", href: "/search", icon: SearchIcon },
  { label: "Chat", href: "/chat", icon: ChatIcon },
  { label: "Lab", href: "/lab", icon: LabIcon },
  { label: "Bóveda", href: "/vault", icon: VaultIcon },
  { label: "Lienzo", href: "/canvas", icon: CanvasIcon },
];

export function Navbar() {
  const pathname = usePathname();

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-nav-bg backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface transition-colors group-hover:border-accent">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="hidden sm:block font-serif text-sm tracking-wide text-text-primary">
            Economic Lab
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = checkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors"
              >
                <item.icon active={isActive} />
                <span
                  className={`hidden md:block font-sans text-[11px] tracking-wide ${
                    isActive
                      ? "text-text-primary font-medium"
                      : "text-text-tertiary hover:text-text-secondary"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md border border-border bg-surface"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={active ? "text-accent" : "text-text-muted"}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={active ? "text-accent" : "text-text-muted"}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={active ? "text-accent" : "text-text-muted"}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function LabIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={active ? "text-accent" : "text-text-muted"}>
      <path d="M9 3h6v7l4 9H5l4-9V3z" />
      <line x1="9" y1="3" x2="15" y2="3" />
    </svg>
  );
}

function VaultIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={active ? "text-accent" : "text-text-muted"}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CanvasIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={active ? "text-accent" : "text-text-muted"}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
