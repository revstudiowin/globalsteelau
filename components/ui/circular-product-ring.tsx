"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";

export type AnimationPhase = "scatter" | "line" | "circle";

interface ProductCardItem {
  id: number;
  number: string;
  name: string;
  category: string;
  image: string;
  slug: string;
  highlight: string;
  specs: string;
}

// 8 Core Primary Products (maintained exact quantity as requested)
const MAIN_PRODUCTS: ProductCardItem[] = [
  {
    id: 1,
    number: "01",
    name: "Deformed Bar",
    category: "Steel Bar",
    image: "/assets/bar.webp",
    slug: "steel-bar",
    highlight: "ACRS Stock & Cut Rebar",
    specs: "Grade 500N · 10-36mm",
  },
  {
    id: 2,
    number: "02",
    name: "Steel Mesh",
    category: "Reinforcing Mesh",
    image: "/assets/mesh.webp",
    slug: "steel-mesh",
    highlight: "Truck, Ute & Trench Formats",
    specs: "SL62 - SL92 · 6m × 2.4m",
  },
  {
    id: 3,
    number: "03",
    name: "Bar Chairs",
    category: "Accessories",
    image: "/assets/accessories.webp",
    slug: "accessories",
    highlight: "Wire & Plastic Spacers",
    specs: "25mm to 100mm Cover",
  },
  {
    id: 4,
    number: "04",
    name: "Processed Steel",
    category: "Processing",
    image: "/assets/hero.webp",
    slug: "steel-bar",
    highlight: "Custom Cutting & Bending",
    specs: "Project Schedule Cut & Bend",
  },
  {
    id: 5,
    number: "05",
    name: "Trench Mesh",
    category: "Steel Mesh",
    image: "/assets/mesh.webp",
    slug: "steel-mesh",
    highlight: "Footings & Ground Trenches",
    specs: "3, 4 & 5-Bar · 6.0m Lengths",
  },
  {
    id: 6,
    number: "06",
    name: "Galv Dowels",
    category: "Steel Bar",
    image: "/assets/bar.webp",
    slug: "steel-bar",
    highlight: "Round & Expansion Joints",
    specs: "Galvanised Joint Dowels",
  },
  {
    id: 7,
    number: "07",
    name: "Tie Wire",
    category: "Accessories",
    image: "/assets/accessories.webp",
    slug: "accessories",
    highlight: "Annealed Site Essentials",
    specs: "1.57mm Black Annealed",
  },
  {
    id: 8,
    number: "08",
    name: "Foundation Bar",
    category: "Steel Bar",
    image: "/assets/hero.webp",
    slug: "steel-bar",
    highlight: "Pools, Slabs & Deep Footings",
    specs: "Pool Rebar & Cages",
  },
];

// --- 3D FlipCard Component with preserve-3d & rotateY on hover ---
function FlipProductCard({
  item,
  index,
  total,
  phase,
  target,
  onHoverChange,
  isHovered,
}: {
  item: ProductCardItem;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  onHoverChange: (hovered: boolean) => void;
  isHovered: boolean;
}) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 45,
        damping: 18,
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 94,
        height: 132,
        marginLeft: -47,
        marginTop: -66,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        zIndex: isHovered ? 60 : 15,
      }}
      className="cursor-pointer group select-none"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <Link
        href={`/products/${item.slug}`}
        className="block w-full h-full"
        onClick={(e) => {
          // On touch screens, first tap flips to reveal specs, second tap follows link
          if (!isHovered && typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
            e.preventDefault();
            onHoverChange(true);
          }
        }}
      >
        <motion.div
          className="relative h-full w-full rounded-[18px]"
          style={{ transformStyle: "preserve-3d" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          animate={{
            rotateY: isHovered ? 180 : 0,
            scale: isHovered ? 1.15 : 1,
          }}
          whileHover={{ rotateY: 180, scale: 1.15 }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden rounded-[18px] shadow-2xl transition-all duration-300"
            style={{
              backfaceVisibility: "hidden",
              border: isHovered ? "2px solid #badfe4" : "1.5px solid rgba(255, 255, 255, 0.22)",
              backgroundColor: "#03151b",
              boxShadow: isHovered
                ? "0 14px 36px rgba(186, 223, 228, 0.4), 0 0 18px rgba(186, 223, 228, 0.25)"
                : "0 8px 24px rgba(0, 0, 0, 0.6)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Range Number Badge */}
            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/65 backdrop-blur-sm border border-white/10 text-[9px] font-mono font-medium text-white/95">
              {item.number}
            </div>

            {/* Bottom Title Gradient */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end">
              <span className="text-[10px] font-semibold text-white tracking-tight line-clamp-1">
                {item.name}
              </span>
            </div>
          </div>

          {/* Back Face (Revealed on 3D RotateY 180deg) */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden rounded-[18px] shadow-2xl bg-[#01222c] border-2 border-[#badfe4] flex flex-col items-center justify-between p-2.5 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 14px 36px rgba(186, 223, 228, 0.45)",
            }}
          >
            <div className="w-full flex justify-between items-center text-[8px] font-mono text-[#badfe4] border-b border-white/10 pb-1">
              <span>ACRS</span>
              <span>{item.number}</span>
            </div>

            <div className="my-auto">
              <p className="text-[8px] font-bold text-[#badfe4] uppercase tracking-widest mb-0.5">
                {item.category}
              </p>
              <p className="text-[11px] font-semibold text-white leading-tight">
                {item.name}
              </p>
              <p className="text-[8px] text-white/70 mt-1 line-clamp-2">
                {item.specs}
              </p>
            </div>

            <div className="w-full pt-1 border-t border-white/10">
              <span className="text-[8px] font-bold text-[#badfe4] uppercase tracking-wider flex items-center justify-center gap-0.5">
                View Details ↗
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// --- Main Circular Product Showcase Component ---
export function CircularProductRing({ className = "" }: { className?: string }) {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [hoveredItem, setHoveredItem] = useState<ProductCardItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = 215; // Circle radius in px
  const total = MAIN_PRODUCTS.length;

  // --- Intro Sequence: Scatter -> Line -> Circle ---
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 400);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 1800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // --- Randomized Scatter Positions on initial load ---
  const scatterPositions = useMemo(() => {
    return MAIN_PRODUCTS.map(() => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.5,
      opacity: 0,
    }));
  }, []);

  // --- Mouse Parallax Motion ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 35, damping: 20 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = smoothMouseX.on("change", (v) =>
      setParallaxOffset((prev) => ({ ...prev, x: v }))
    );
    const unsubY = smoothMouseY.on("change", (v) =>
      setParallaxOffset((prev) => ({ ...prev, y: v }))
    );
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothMouseX, smoothMouseY]);

  // Track container mouse movement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;
      mouseX.set((relativeX - 0.5) * 40);
      mouseY.set((relativeY - 0.5) * 40);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- Virtual Wheel Rotation & Touch Swipe (User can spin the ring) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Don't block page scroll completely, just nudge rotation gently
      setWheelRotation((prev) => prev + e.deltaY * 0.15);
    };

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchStartX - touchX;
        touchStartX = touchX;
        setWheelRotation((prev) => prev + deltaX * 0.4);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[340px] min-[390px]:max-w-[390px] sm:max-w-[460px] md:max-w-[500px] lg:max-w-[560px] h-[330px] min-[390px]:h-[370px] sm:h-[460px] md:h-[500px] lg:h-[560px] flex items-center justify-center overflow-visible mx-auto">
      <div
        ref={containerRef}
        className={`relative flex items-center justify-center select-none scale-[0.56] min-[390px]:scale-[0.66] sm:scale-[0.82] md:scale-[0.9] lg:scale-100 origin-center transition-transform duration-300 ${className}`}
        style={{
          width: 560,
          height: 560,
          perspective: "1000px",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredItem(null);
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        {/* Background ambient radial glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(186, 223, 228, 0.16) 0%, rgba(1, 34, 44, 0) 70%)",
          }}
        />

        {/* Subtle guide ring */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: radius * 2,
            height: radius * 2,
            border: "1px dashed rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* Center Static Hub Content */}
        <div
          className="relative z-20 flex flex-col items-center justify-center text-center p-4 pointer-events-none max-w-[220px]"
          style={{
            transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`,
          }}
        >
          <motion.span
            key={hoveredItem ? hoveredItem.category : "default-kicker"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#badfe4] mb-1.5"
          >
            {hoveredItem ? hoveredItem.category : "Core Steel Range"}
          </motion.span>

          <motion.h3
            key={hoveredItem ? hoveredItem.name : "default-title"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="text-lg md:text-xl font-medium text-white tracking-tight leading-snug"
          >
            {hoveredItem ? hoveredItem.name : "Strength for your next build."}
          </motion.h3>

          <motion.p
            key={hoveredItem ? hoveredItem.highlight : "default-desc"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[10px] tracking-[0.14em] text-white/70 mt-2 font-normal"
          >
            {hoveredItem ? hoveredItem.specs : "Hover to flip 3D · Click to view"}
          </motion.p>
        </div>

        {/* Cards Container with Ambient Spin & Parallax */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          style={{
            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px) rotate(${wheelRotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: introPhase === "circle" ? 360 : 0,
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: isPaused ? 180 : 50,
            }}
          >
            {MAIN_PRODUCTS.map((item, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === "scatter") {
                target = scatterPositions[i];
              } else if (introPhase === "line") {
                const lineSpacing = 68;
                const lineTotalWidth = total * lineSpacing;
                const lineX = i * lineSpacing - lineTotalWidth / 2;
                target = { x: lineX, y: 0, rotation: 0, scale: 0.85, opacity: 0.9 };
              } else {
                // Circle phase
                const angleDeg = (i / total) * 360;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = radius * Math.cos(angleRad);
                const y = radius * Math.sin(angleRad);
                const rotation = angleDeg + 90;

                target = {
                  x,
                  y,
                  rotation,
                  scale: 1,
                  opacity: 1,
                };
              }

              return (
                <FlipProductCard
                  key={item.id}
                  item={item}
                  index={i}
                  total={total}
                  phase={introPhase}
                  target={target}
                  isHovered={hoveredItem?.id === item.id}
                  onHoverChange={(hovered) => {
                    if (hovered) {
                      setHoveredItem(item);
                    } else if (hoveredItem?.id === item.id) {
                      setHoveredItem(null);
                    }
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
