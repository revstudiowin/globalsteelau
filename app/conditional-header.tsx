"use client";
import { usePathname } from "next/navigation";
import { Header } from "./ui";

export function ConditionalHeader() {
  const path = usePathname();
  // Hide the old sticky header on the homepage — the hero has its own navbar
  if (path === "/") return null;
  return <Header />;
}

