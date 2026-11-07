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
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [scaleProgress, setScaleProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [windowDims, setWindowDims] = useState({ width: 0, height: 0 });

  // Track window dimensions for responsive card sizing
  useEffect(() => {
    const updateDims = () => {
      setWindowDims({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDims();
    window.addEventListener("resize", updateDims, { passive: true });
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Ensure autoplay on iOS Safari and mobile browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be deferred until user interaction
      });
    }
  }, []);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const containerHeight = containerRef.current.offsetHeight;
          const windowHeight = window.innerHeight;

          const scrolled = Math.max(0, -rect.top);
          const maxScroll = containerHeight - windowHeight;
          const progress =
            maxScroll > 0
              ? Math.min(Math.max(scrolled / maxScroll, 0), 1)
              : 0;

          // ── Phase 1 (0 → 65%): scale 16:9 card up to full screen ──
          const sProgress = Math.min(progress / 0.65, 1);
          setScaleProgress(sProgress);

          // ── Phase 2 (65% → 95%): hold full-screen, fade to black ──
          const fadeProgress = Math.min(
            Math.max((progress - 0.65) / 0.3, 0),
            1
          );
          setOpacity(1 - fadeProgress);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableAnimations, shouldReduceMotion]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  // Responsive calculations for mobile, tablet, and desktop
  const isMobile = windowDims.width > 0 && windowDims.width < 640;
  const isTablet = windowDims.width >= 640 && windowDims.width < 1024;

  // Starting card dimensions (16:9 aspect ratio, fully visible without cropping)
  const baseWidth =
    windowDims.width > 0
      ? isMobile
        ? Math.min(windowDims.width - 32, 420)
        : isTablet
        ? Math.min(windowDims.width - 64, 680)
        : Math.min(windowDims.width * 0.5, 880)
      : 800;

  const baseHeight = baseWidth > 0 ? baseWidth * (9 / 16) : 450;

  // Target scale factor required to cover the full viewport (with 2% bleed for seamless edges)
  const scaleX =
    windowDims.width > 0 && baseWidth > 0
      ? (windowDims.width / baseWidth) * 1.02
      : 1;
  const scaleY =
    windowDims.height > 0 && baseHeight > 0
      ? (windowDims.height / baseHeight) * 1.02
      : 1;
  const maxScale = Math.max(scaleX, scaleY);

  // Smooth ease-out cubic interpolation
  const eased = 1 - Math.pow(1 - scaleProgress, 3);
  const currentScale = shouldAnimate ? 1 + eased * (maxScale - 1) : 1;
  const currentRadius = shouldAnimate
    ? Math.max(0, (isMobile ? 14 : 20) * (1 - scaleProgress))
    : 0;
  const currentShadow =
    scaleProgress > 0.5
      ? "none"
      : "0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(186, 223, 228, 0.25)";

  return (
    <div className={`relative ${className}`}>
      {/* Scroll container — natural fluid scroll height that never traps or blocks scrolling */}
      <div
        ref={containerRef}
        className="relative h-[180vh] sm:h-[240vh]"
        style={{ background: "var(--ink)" }}
      >
        {/* Sticky viewport — pointer-events-none ensures all mobile touches pass through directly */}
        <div
          className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center pointer-events-none"
          style={{ background: "var(--ink)" }}
        >
          {/* Responsive 16:9 Card that scales to cover the full viewport */}
          <div
            className="will-change-transform overflow-hidden relative"
            style={{
              width: shouldAnimate ? baseWidth : "100%",
              height: shouldAnimate ? baseHeight : "100%",
              maxWidth: shouldAnimate ? "100%" : undefined,
              aspectRatio: shouldAnimate ? "16 / 9" : undefined,
              transform: shouldAnimate ? `scale(${currentScale})` : "none",
              transformOrigin: "center center",
              borderRadius: `${currentRadius}px`,
              boxShadow: currentShadow,
              opacity: shouldAnimate ? opacity : 1,
              transition: "none",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
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
