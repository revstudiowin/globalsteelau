"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

// ─── Nimbus Icons (inline SVG paths) ───────────────────────────────────────
export const NimbusIcons = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="8" x2="12" y2="8.01"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2z"/>
    </svg>
  ),
  plane: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  ),
  drop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

type FxType = "glow" | "spin" | "plane" | "drop" | "wave" | "none";

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  fx?: FxType;
  onClick?: () => void;
}

interface LiquidNavbarProps {
  items?: NavItem[];
  tone?: "light" | "dark";
  defaultActive?: number;
  sound?: boolean;
  className?: string;
}

function NavButton({
  item,
  isActive,
  onClick,
  tone,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  tone: "light" | "dark";
}) {
  const [hovered, setHovered] = useState(false);
  const isDark = tone === "dark";

  const iconColor = isActive
    ? "#01222c"
    : isDark
    ? "rgba(255,255,255,0.7)"
    : "rgba(1,34,44,0.6)";

  const labelColor = isActive
    ? "#01222c"
    : isDark
    ? "rgba(255,255,255,0.7)"
    : "rgba(1,34,44,0.6)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-1 px-3.5 py-1.5 rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#badfe4]"
      style={{
        minWidth: 54,
        background: isActive ? "rgba(186,223,228,0.95)" : "transparent",
        boxShadow: isActive ? "0 2px 14px rgba(186,223,228,0.45)" : "none",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
      aria-pressed={isActive}
      aria-label={item.label}
    >
      <motion.span
        style={{ color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}
        animate={{
          scale: hovered ? 1.15 : 1,
          rotate: item.fx === "spin" && hovered ? 360 : 0,
          y: item.fx === "plane" && hovered ? -2 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.icon}
      </motion.span>

      <span
        style={{
          fontSize: 9.5,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: labelColor,
          lineHeight: 1,
        }}
      >
        {item.label}
      </span>

      {isActive && (
        <motion.span
          layoutId="navdot"
          className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-[#01222c]"
          style={{ x: "-50%" }}
          transition={{ type: "spring", stiffness: 450, damping: 32 }}
        />
      )}
    </button>
  );
}

export function LiquidNavbar({
  items,
  tone = "dark",
  className = "",
}: LiquidNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const defaultItems: NavItem[] = [
    { label: "Home", icon: NimbusIcons.home, href: "/", fx: "glow" },
    { label: "Products", icon: NimbusIcons.grid, href: "/products", fx: "none" },
    { label: "About", icon: NimbusIcons.info, href: "/about", fx: "wave" },
    { label: "Contact", icon: NimbusIcons.mail, href: "/contact", fx: "drop" },
  ];

  const navItems = items ?? defaultItems;

  // Determine active index based on current URL path
  let activeIndex = 0;
  if (pathname.startsWith("/products")) activeIndex = 1;
  else if (pathname.startsWith("/about")) activeIndex = 2;
  else if (pathname.startsWith("/contact")) activeIndex = 3;
  else activeIndex = 0;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isDark = tone === "dark";

  return (
    <motion.nav
      className={`flex items-center gap-1 p-1.5 rounded-[26px] ${className}`}
      style={{
        background: isDark
          ? scrolled
            ? "rgba(1, 34, 44, 0.9)"
            : "rgba(1, 34, 44, 0.65)"
          : scrolled
          ? "rgba(255,255,255,0.85)"
          : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.6)",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)"
          : "0 4px 16px rgba(0,0,0,0.08)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {navItems.map((item, i) => (
        <NavButton
          key={item.label}
          item={item}
          isActive={activeIndex === i}
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            } else if (item.href) {
              router.push(item.href);
            }
          }}
          tone={tone}
        />
      ))}
    </motion.nav>
  );
}
