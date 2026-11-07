"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MetallicButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "dark" | "cyan";
  icon?: React.ReactNode;
  className?: string;
}

export function MetallicButton({
  href,
  onClick,
  children,
  variant = "dark",
  icon = "↗",
  className = "",
}: MetallicButtonProps) {
  const isCyan = variant === "cyan";

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-between gap-4 rounded-full px-6 py-3 select-none text-[13px] font-semibold tracking-tight transition-all duration-300 ${className}`}
      style={{
        background: isCyan
          ? "linear-gradient(180deg, #cdecf0 0%, #badfe4 45%, #9bc7ce 100%)"
          : "linear-gradient(180deg, #1f2c31 0%, #0d171b 100%)",
        color: isCyan ? "#01222c" : "#f1f5f9",
        border: isCyan
          ? "1px solid rgba(255, 255, 255, 0.85)"
          : "1px solid rgba(255, 255, 255, 0.22)",
        boxShadow: isCyan
          ? "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.9), inset 0 -1.5px 2px 0 rgba(1, 34, 44, 0.35), 0 4px 16px rgba(1, 34, 44, 0.35)"
          : "inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.85), 0 4px 18px rgba(0, 0, 0, 0.6)",
      }}
    >
      <span>{children}</span>

      {/* Circular metallic badge icon */}
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{
          background: isCyan
            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(1, 34, 44, 0.2) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)",
          border: isCyan
            ? "1px solid rgba(255, 255, 255, 0.9)"
            : "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.35)",
          color: "inherit",
        }}
      >
        {icon}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block group outline-none">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" className="inline-block group outline-none">
      {content}
    </button>
  );
}

