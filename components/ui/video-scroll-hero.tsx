"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
}

export function VideoScrollHero({
  videoSrc = "/assets/hero-video.mp4",
  enableAnimations = true,
  className = "",
  startScale = 0.28,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);
  const [opacity, setOpacity] = useState(1);
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min(scrolled / maxScroll, 1);

      // ── Phase 1 (0 → 75%): scale from startScale → 1 ──────────────────
      const scaleProgress = Math.min(progress / 0.75, 1);
      const eased = 1 - Math.pow(1 - scaleProgress, 3); // ease-out cubic
      const newScale = startScale + eased * (1 - startScale);
      setScrollScale(newScale);

      // ── Phase 2 (75% → 100%): hold full-screen, fade to black ──────────
      const fadeProgress = Math.max(0, (progress - 0.75) / 0.25);
      setOpacity(1 - fadeProgress);

      // ── Auto-scroll to next section when fully faded ────────────────────
      if (fadeProgress >= 1 && !hasAutoScrolled.current) {
        hasAutoScrolled.current = true;
        const nextSectionTop =
          containerRef.current.offsetTop + containerRef.current.offsetHeight;
        window.scrollTo({ top: nextSectionTop, behavior: "smooth" });
      }

      // Reset so user can scroll back up and replay
      if (progress < 0.7) {
        hasAutoScrolled.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`relative ${className}`}>
      {/* Scroll container — tall enough for both phases */}
      <div
        ref={containerRef}
        className="relative h-[260vh] sm:h-[320vh]"
        style={{ background: "var(--ink)" }}
      >
        {/* Sticky viewport — video stays centered while you scroll */}
        <div
          className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
          style={{ background: "var(--ink)" }}
        >
          {/* Video wrapper — scales & fades */}
          <div
            className="will-change-transform"
            style={{
              width: "100%",
              height: "100%",
              transform: shouldAnimate ? `scale(${scrollScale})` : "scale(1)",
              transformOrigin: "center center",
              opacity: shouldAnimate ? opacity : 1,
              transition: "none", // driven entirely by scroll, no CSS transition
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
