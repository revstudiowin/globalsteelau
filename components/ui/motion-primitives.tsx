"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// ─── 1. FADE IN / FADE OUT (IN-PLACE FADE) ────────────────────────────────────
// Goes from fully transparent to fully visible in place when it appears,
// and fades back out the same way when it leaves: gentle, with no movement or scaling.
// Once it has faded out, it can no longer be clicked or reached with the keyboard.
// Switches instantly when prefers-reduced-motion is enabled.
export interface FadeInOutProps {
  isVisible: boolean;
  children: ReactNode;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeInOut({
  isVisible,
  children,
  duration = 0.5,
  className = "",
  style = {},
}: FadeInOutProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: shouldReduce ? 0 : duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{
        ...style,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: !isVisible && !shouldReduce ? "hidden" : "visible",
      }}
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      {children}
    </motion.div>
  );
}

// ─── 2. CLIP REVEAL (MASK REVEAL / WIPE REVEAL) ───────────────────────────────
// A clipping edge sweeps across from left to right so the content is uncovered
// progressively while it stays still: smooth, starting and ending softly.
// Reserves element space from the start so nothing shifts.
// Shows fully uncovered when prefers-reduced-motion is active.
export interface ClipRevealProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ClipReveal({
  children,
  duration = 1.1,
  delay = 0,
  className = "",
  style = {},
}: ClipRevealProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...style }}
    >
      <motion.div
        className="w-full h-full"
        initial={shouldReduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{
          duration: shouldReduce ? 0 : duration,
          delay: shouldReduce ? 0 : delay,
          // Soft start and soft end ease
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          // Content stays completely still while the clip edge sweeps
          transform: "none",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── 3. BACK IN (DELIBERATE TWO-STEP ENTRANCE) ────────────────────────────────
// Arrives from beyond an edge while shrunk and slightly faded, then grows to full size
// once it reaches its place: a deliberate two-step move rather than a quick pop.
// Plays every time the element enters view, and shows in place without motion when prefers-reduced-motion is set.
export interface BackInProps {
  children: ReactNode;
  direction?: "up" | "down";
  distance?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function BackIn({
  children,
  direction = "up",
  distance = 70,
  delay = 0,
  className = "",
  style = {},
}: BackInProps) {
  const shouldReduce = useReducedMotion();
  const startY = direction === "up" ? distance : -distance;

  return (
    <motion.div
      className={className}
      style={style}
      initial={
        shouldReduce
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.72, y: startY }
      }
      whileInView={
        shouldReduce
          ? { opacity: 1, scale: 1, y: 0 }
          : {
              // Two-step deliberate entrance:
              // Step 1: Arrives from beyond edge while shrunk and faded -> reaches place at 65% time
              // Step 2: Expands from 0.88 to full 1.0 size in place at 100% time
              opacity: [0, 0.85, 1],
              y: [startY, 0, 0],
              scale: [0.72, 0.88, 1],
            }
      }
      viewport={{ once: false, margin: "-40px" }}
      transition={{
        duration: shouldReduce ? 0 : 0.85,
        delay: shouldReduce ? 0 : delay,
        times: [0, 0.65, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── 4. BACK OUT (DELIBERATE TWO-STEP EXIT) ───────────────────────────────────
// First shrinks back slightly in place, then slides off toward an edge while fading out:
// a deliberate two-step exit, not a single quick fade.
// Removed only after animation ends so the layout doesn't jump mid-motion.
// Removed instantly when prefers-reduced-motion is set.
export interface BackOutContainerProps {
  isVisible: boolean;
  children: ReactNode;
  direction?: "down" | "up" | "right";
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
  onExitComplete?: () => void;
}

export function BackOutContainer({
  isVisible,
  children,
  direction = "down",
  distance = 80,
  className = "",
  style = {},
  onExitComplete,
}: BackOutContainerProps) {
  const shouldReduce = useReducedMotion();

  const getExitTarget = () => {
    if (direction === "down") return { y: distance, x: 0 };
    if (direction === "up") return { y: -distance, x: 0 };
    return { x: distance, y: 0 };
  };

  const exitTarget = getExitTarget();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="back-out-item"
          className={className}
          style={style}
          // Back In entrance
          initial={
            shouldReduce
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.72, y: direction === "down" ? distance : -distance }
          }
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            transition: {
              duration: shouldReduce ? 0 : 0.8,
              times: [0, 0.65, 1],
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          // Back Out exit:
          // Step 1: Shrinks back slightly in place (scale: 0.9, y: 0)
          // Step 2: Slides off toward the edge while fading out
          exit={
            shouldReduce
              ? { opacity: 0, transition: { duration: 0 } }
              : {
                  scale: [1, 0.9, 0.72],
                  y: [0, 0, exitTarget.y],
                  x: [0, 0, exitTarget.x],
                  opacity: [1, 0.92, 0],
                  transition: {
                    duration: 0.75,
                    times: [0, 0.35, 1],
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
          }
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
