"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { LiquidNavbar, NimbusIcons } from "@/components/ui/liquid-glass-navbar";
import FloatingMenu from "@/components/ui/liquid-morph-floating-menu";
import { VideoScrollHero } from "@/components/ui/video-scroll-hero";
import { CircularProductRing } from "@/components/ui/circular-product-ring";
import {
  FadeInOut,
  ClipReveal,
  BackIn,
  BackOutContainer,
} from "@/components/ui/motion-primitives";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

function Arrow() {
  return <span style={{ display: "inline-block", fontFamily: "Arial, sans-serif" }}>↗</span>;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const shouldReduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [showLiveStatus, setShowLiveStatus] = useState(true);
  const words = ["build.", "project.", "structure.", "vision."];

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="hero-new"
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "var(--ink)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/assets/hero.webp"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "55% 50%",
            opacity: 0.35,
          }}
        />
        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(1,34,44,0.95) 0%, rgba(1,34,44,0.6) 50%, rgba(1,34,44,0.3) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(1,34,44,1) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Navbar */}
      <div
        className="w-full flex items-center justify-between gap-3 sm:gap-4 flex-wrap md:flex-nowrap relative z-20 px-4 sm:px-8 lg:px-14 py-4 sm:py-6"
      >
        <Link href="/" aria-label="Global Steel home" className="shrink-0">
          <img
            src="/assets/logo.svg"
            alt="Global Steel"
            width={200}
            height={35}
            className="w-[150px] sm:w-[185px] md:w-[210px] h-auto"
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-center">
          <LiquidNavbar tone="dark" />
        </div>

        <Link
          href="/contact#quote"
          className="header-quote ml-auto md:ml-0 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
        >
          <span className="hidden sm:inline">Request a quote</span>
          <span className="sm:hidden">Quote</span> <span className="metallic-badge">↗</span>
        </Link>

        {/* Mobile Navbar Row */}
        <div className="md:hidden w-full flex justify-center pt-1 pb-1">
          <LiquidNavbar tone="dark" />
        </div>
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 px-4 sm:px-8 lg:px-14 pt-6 pb-14 sm:pb-20 max-w-[1600px] w-full mx-auto"
      >
        {/* Left Side: Editorial Typography & Actions */}
        <div className="w-full lg:max-w-[720px] lg:flex-[1_1_55%]">
          {/* Eyebrow */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex items-center gap-2.5 mb-6 sm:mb-8 flex-wrap"
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--brand)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "var(--brand)",
                fontSize: 11,
                letterSpacing: "0.17em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Australian · Indigenous-owned · ACRS Certified
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.h1
              initial={shouldReduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              style={{
                fontSize: "clamp(38px, 6.2vw, 108px)",
                lineHeight: 0.96,
                letterSpacing: "-0.055em",
                fontWeight: 500,
                color: "white",
                margin: 0,
              }}
            >
              The strength
              <br />
              behind your
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 28 }}>
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              style={{
                fontSize: "clamp(38px, 6.2vw, 108px)",
                lineHeight: 0.96,
                letterSpacing: "-0.055em",
                fontWeight: 500,
                color: "var(--brand)",
                height: "1em",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={tick % words.length}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  style={{ display: "block" }}
                >
                  {words[tick % words.length]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Body + CTA row */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-end flex-wrap"
          >
            <div className="max-w-[420px]">
              <p
                style={{
                  color: "rgba(226,229,229,0.85)",
                  fontSize: "clamp(14px,1.2vw,16px)",
                  lineHeight: 1.65,
                  margin: "0 0 24px",
                }}
              >
                Steel bar, reinforcing mesh and construction accessories.
                Supplied by an Australian Indigenous-owned team to builders and
                contractors across Australia.
              </p>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <Link
                  href="/contact#quote"
                  className="button"
                >
                  <span>Request a quote</span> <Arrow />
                </Link>
                <Link
                  href="/products"
                  className="button secondary"
                >
                  <span>Explore products</span> <Arrow />
                </Link>
              </div>

              {/* Fade In / Fade Out Live Notice (In-place, no shift, inert when hidden) */}
              <div className="mt-5 min-h-[34px] flex items-center">
                <FadeInOut isVisible={showLiveStatus} duration={0.5}>
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[11px] text-[#badfe4]">
                    <span className="w-2 h-2 rounded-full bg-[#badfe4] animate-pulse shrink-0" />
                    <span>Sydney &amp; Melbourne Hubs: Daily Dispatch · ACRS Certified Steel</span>
                    <button
                      type="button"
                      onClick={() => setShowLiveStatus(false)}
                      className="ml-1 text-white/50 hover:text-white transition-colors cursor-pointer text-xs"
                      aria-label="Dismiss supply notice"
                      title="Dismiss notice (Fade out)"
                    >
                      ✕
                    </button>
                  </div>
                </FadeInOut>
                {!showLiveStatus && (
                  <button
                    type="button"
                    onClick={() => setShowLiveStatus(true)}
                    className="text-[11px] text-[#badfe4]/80 hover:text-[#badfe4] underline transition-colors cursor-pointer"
                  >
                    + Show dispatch status
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-8 pt-2 sm:pt-0">
              {[
                ["ACRS", "Certified"],
                ["3", "Ranges"],
                ["AU", "Nationwide"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: "clamp(22px,2.5vw,36px)",
                      fontWeight: 500,
                      color: "var(--brand)",
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(226,229,229,0.6)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Circular Product Cards Ring */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="w-full lg:w-auto flex items-center justify-center lg:flex-[1_1_45%]"
        >
          <CircularProductRing />
        </motion.div>
      </div>

    </section>
  );
}

// ─── Credentials Bar ──────────────────────────────────────────────────────────
function CredentialsBar() {
  const creds = [
    ["01", "Australian", "Indigenous-owned"],
    ["02", "Specialising in", "ACRS certified steel"],
    ["03", "Project-specific", "Cutting & bending"],
    ["04", "Supplying projects", "Across Australia"],
  ];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 py-7">
        {creds.map(([num, line1, line2], idx) => (
          <div
            key={num}
            className={`flex items-center gap-4 py-2 px-0 sm:px-4 lg:px-6 ${
              idx < 3 ? "lg:border-r border-[var(--line)]" : ""
            } ${idx % 2 === 0 ? "sm:border-r sm:border-[var(--line)] lg:border-r" : ""}`}
          >
            <span style={{ fontSize: 26, fontWeight: 400, color: "var(--muted)" }}>{num}</span>
            <p style={{ fontSize: 11, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
              {line1}
              <br />
              <strong style={{ color: "var(--ink)", fontSize: 12, fontWeight: 500 }}>{line2}</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────
function ProductsSection() {
  const products = [
    {
      slug: "steel-bar",
      number: "01",
      name: "Steel Bar",
      image: "/assets/bar.webp",
      desc: "Reinforcement at the core of your build. Stock bars, processed steel and dowels for project-specific requirements.",
      tags: ["Deformed Stock Bar", "Processing", "Galvanised Dowels"],
    },
    {
      slug: "steel-mesh",
      number: "02",
      name: "Steel Mesh",
      image: "/assets/mesh.webp",
      desc: "Practical reinforcement for slabs, footings and paths, with mesh formats to suit the job.",
      tags: ["Truck Mesh", "Trench Mesh", "Rectangular Mesh"],
    },
    {
      slug: "accessories",
      number: "03",
      name: "Accessories",
      image: "/assets/accessories.webp",
      desc: "The details that bring the job together. Supports, spacers, tying products and site essentials.",
      tags: ["Wire Bar Chairs", "Tie Wire", "Bar Caps"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="range">
      <div className="wrap">
        {/* Heading */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-10 mb-10 sm:mb-14"
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "0.17em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--muted)",
                marginBottom: 20,
              }}
            >
              01 / Materials for what's next
            </span>
            <h2 style={{ color: "var(--ink)", margin: 0 }}>
              Steel. In
              <br />
              <span style={{ color: "var(--muted)" }}>every form.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 360 }}>
            <p style={{ fontSize: 14, marginBottom: 20 }}>
              From the core reinforcement to the finishing details. Find the
              right starting point for your build.
            </p>
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
                fontSize: 13,
                fontWeight: 600,
                borderBottom: "1px solid currentColor",
                padding: "8px 0",
                color: "var(--ink)",
              }}
            >
              The complete product range <Arrow />
            </Link>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              data-reveal
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Link
                href={`/products/${p.slug}`}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="relative overflow-hidden bg-[#e9ecea]"
                  style={{
                    aspectRatio: i === 0 ? "1.2" : "1.1",
                  }}
                >
                  <ClipReveal duration={1.0} delay={i * 0.12} className="w-full h-full">
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: p.slug === "accessories" ? "contain" : "cover",
                        transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />
                  </ClipReveal>
                  <span
                    style={{
                      position: "absolute",
                      top: 18,
                      left: 18,
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      background: "white",
                      padding: "3px 10px",
                    }}
                  >
                    RANGE / {p.number}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 50,
                      height: 50,
                      display: "grid",
                      placeItems: "center",
                      background: "var(--brand)",
                      fontSize: 20,
                    }}
                  >
                    ↗
                  </span>
                </div>

                <div style={{ marginTop: 20 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    GLOBAL STEEL / {p.number}
                  </span>
                  <h3
                    style={{
                      fontSize: "clamp(22px,2.2vw,30px)",
                      letterSpacing: "-0.025em",
                      margin: "0 0 10px",
                      color: "var(--ink)",
                    }}
                  >
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10,
                          padding: "4px 10px",
                          border: "1px solid var(--line)",
                          color: "var(--muted)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Capability Section ───────────────────────────────────────────────────────
function CapabilitySection() {
  const rows = [
    ["01", "A range that works together", "Steel bar, reinforcing mesh and essential accessories. One team to discuss your requirements."],
    ["02", "Made to your requirements", "Cutting and bending, custom orders and sourcing through our partner network."],
    ["03", "Support from enquiry to supply", "Talk through quantities, specifications and delivery requirements with our team."],
  ];

  return (
    <section className="py-16 sm:py-24 bg-[var(--paper)]">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div
            data-reveal
            className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[560px] overflow-hidden rounded-xl"
          >
            <ClipReveal duration={1.2} className="w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-[560px]">
              <img
                src="/assets/bar.webp"
                alt="Close detail of reinforcing steel"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% center" }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 24,
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  background: "white",
                  padding: "7px 12px",
                  textTransform: "uppercase",
                }}
              >
                GS / Material Study
              </span>
            </ClipReveal>
          </div>

          <motion.div
            data-reveal
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "0.17em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--muted)",
                marginBottom: 28,
              }}
            >
              02 / Supply, considered.
            </span>
            <h2 style={{ color: "var(--ink)", margin: "0 0 24px" }}>
              Your specification.
              <br />
              Our starting point.
            </h2>
            <p style={{ fontSize: 15, maxWidth: 440, margin: "0 0 32px" }}>
              From standard reinforcement to a specific project requirement, we
              help bring your materials list together.
            </p>

            {rows.map(([n, title, body]) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  gap: 24,
                  padding: "22px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span style={{ fontSize: 10, paddingTop: 4, color: "var(--muted)", flexShrink: 0 }}>{n}</span>
                <div>
                  <h3 style={{ fontSize: 18, letterSpacing: "-0.02em", margin: "0 0 9px", color: "var(--ink)" }}>{title}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 390 }}>{body}</p>
                </div>
              </div>
            ))}

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
                fontSize: 13,
                fontWeight: 600,
                borderBottom: "1px solid currentColor",
                padding: "10px 0",
                marginTop: 12,
                color: "var(--ink)",
              }}
            >
              Discuss your requirements <Arrow />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Quote Banner ─────────────────────────────────────────────────────────────
function QuoteBanner() {
  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden bg-[var(--brand)]"
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          right: -60,
          top: -30,
          width: 420,
          height: 420,
          border: "1px solid rgba(22,28,32,0.08)",
          borderRadius: "50%",
          transform: "rotate(-35deg)",
          pointerEvents: "none",
        }}
      />
      <div className="wrap">
        <span
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 36,
          }}
        >
          Let's make a start / Global Steel Australia
        </span>
        <BackIn direction="up" delay={0.15}>
          <div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12"
          >
            <h2 style={{ fontSize: "clamp(38px,6vw,96px)", color: "var(--ink)", margin: 0 }}>
              Your next build.
              <br />
              <span style={{ color: "var(--ink)", opacity: 0.6 }}>Our next conversation.</span>
            </h2>
            <div>
              <p style={{ color: "#33494d", fontSize: 14, marginBottom: 24 }}>
                A materials list. A specification. An idea.
                <br />
                Tell us what you need, and let's take it from there.
              </p>
              <Link
                href="/contact#quote"
                className="button secondary w-full sm:w-auto min-w-[200px]"
              >
                <span>Request a quote</span> <Arrow />
              </Link>
            </div>
          </div>
        </BackIn>
      </div>
    </section>
  );
}

// ─── Applications ─────────────────────────────────────────────────────────────
function ApplicationsSection() {
  const apps = [
    { number: "01", name: "Residential", desc: "From the foundations up. Mesh and bar for slabs, footings and pool reinforcement." },
    { number: "02", name: "Commercial", desc: "The strength beneath the surface. Reinforcement for commercial construction." },
    { number: "03", name: "Infrastructure", desc: "Built for large-scale projects. Certified steel for bridges, roads and civil works." },
    { number: "04", name: "Fabrication", desc: "A specification-led approach. Bar and processed steel for project-specific requirements." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="wrap">
        <div data-reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-10 mb-10 sm:mb-12">
          <div>
            <span style={{ display: "block", fontSize: 11, letterSpacing: "0.17em", textTransform: "uppercase", fontWeight: 600, color: "var(--muted)", marginBottom: 20 }}>
              03 / Where strength takes shape
            </span>
            <h2 style={{ color: "var(--ink)", margin: 0 }}>
              Different builds.
              <br />
              <span style={{ color: "var(--muted)" }}>One strong foundation.</span>
            </h2>
          </div>
          <p style={{ maxWidth: 320, fontSize: 14 }}>
            Explore the applications behind the materials.
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--line)" }}>
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              data-reveal
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="flex items-start sm:items-center justify-between gap-4 sm:gap-10 py-6 sm:py-7 border-b border-[var(--line)] cursor-pointer transition-all duration-200"
              whileHover={{ paddingLeft: 14, paddingRight: 14, backgroundColor: "var(--paper)" }}
            >
              <span style={{ fontSize: 10, color: "var(--muted)", flexShrink: 0, paddingTop: 4 }}>{app.number}</span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 lg:gap-14">
                <h3 style={{ fontSize: "clamp(22px,2.5vw,33px)", letterSpacing: "-0.025em", color: "var(--ink)", margin: 0 }} className="sm:min-w-[180px] lg:min-w-[220px]">
                  {app.name}
                </h3>
                <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 420, margin: 0 }}>{app.desc}</p>
              </div>
              <span style={{ fontSize: 26, color: "var(--ink)", flexShrink: 0 }}>↗</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Strip ──────────────────────────────────────────────────────────────
function AboutStrip() {
  return (
    <section className="py-16 sm:py-24 border-t border-[var(--line)] bg-white">
      <div className="wrap">
        <span style={{ display: "block", fontSize: 11, letterSpacing: "0.17em", textTransform: "uppercase", fontWeight: 600, color: "var(--muted)", marginBottom: 40 }}>
          04 / The company behind the supply
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div data-reveal>
            <h2 style={{ color: "var(--ink)", marginBottom: 24 }}>
              Built on
              <br />
              <span style={{ color: "var(--muted)" }}>connection.</span>
            </h2>
            <p style={{ fontSize: 15, maxWidth: 465, marginBottom: 20 }}>
              Global Steel is an Australian Indigenous-owned supplier supporting
              builders and contractors with steel products and practical sourcing
              support.
            </p>
            <p style={{ fontSize: 15, maxWidth: 465, marginBottom: 24 }}>
              We connect your project requirements with a diverse product range
              and a network of supply partners.
            </p>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
                fontSize: 13,
                fontWeight: 600,
                borderBottom: "1px solid currentColor",
                padding: "10px 0",
                color: "var(--ink)",
              }}
            >
              Our story. Our approach. <Arrow />
            </Link>
          </div>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              ["Est. 2022", "Founded with a focus on accessible, certified steel supply for Australian construction."],
              ["ACRS Certified", "Products that meet Australian Reinforcing Bar and Coil Standard for quality and compliance."],
              ["Nationwide", "Supplying projects across Australia, from residential to large-scale commercial builds."],
            ].map(([title, body]) => (
              <div key={title} style={{ padding: "24px 0", borderTop: "1px solid var(--line)" }}>
                <h3 style={{ fontSize: 16, letterSpacing: "-0.02em", marginBottom: 10, color: "var(--ink)" }}>{title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Fast Quote Assistant (Back In & Back Out) ───────────────────────────────
function FastQuoteAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolling past 400px down, open with Back In
      if (window.scrollY > 400 && !hasDismissed && !isOpen) {
        setIsOpen(true);
      } else if (window.scrollY < 180 && isOpen) {
        // When scrolling back up near top, exit with Back Out so it shows again on next scroll down
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDismissed, isOpen]);

  return (
    <aside aria-label="Fast steel supply takeoff assistant">
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col items-end gap-3">
        {/* Back In entrance & Back Out exit container */}
        <BackOutContainer
          isVisible={isOpen}
          direction="down"
          distance={90}
          className="pointer-events-auto w-[310px] sm:w-[360px] p-5 rounded-2xl bg-[#01222c]/95 backdrop-blur-xl border border-[#badfe4]/40 shadow-2xl text-white select-none"
        >
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#badfe4] animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#badfe4]">
                Supply Takeoff Assistant
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setHasDismissed(true);
              }}
              className="text-white/60 hover:text-white p-1 -mr-1 -mt-1 transition-colors cursor-pointer text-sm"
              aria-label="Dismiss assistant (plays Back Out animation)"
              title="Close (plays Back Out)"
            >
              ✕
            </button>
          </div>

          <h4 className="text-sm font-medium text-white mb-1.5 leading-snug">
            Need an immediate steel bar or reinforcing mesh quote?
          </h4>
          <p className="text-xs text-white/70 mb-4 leading-relaxed">
            Send your project schedule to our Sydney &amp; Melbourne supply desks for fast turnaround.
          </p>

          <div className="flex items-center gap-2.5">
            <Link
              href="/contact#quote"
              className="button text-xs py-2 px-4 min-h-[40px] flex-1 justify-center"
            >
              <span>Instant Quote</span> <span className="metallic-badge text-xs">↗</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setHasDismissed(true);
              }}
              className="text-xs px-3.5 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </BackOutContainer>

        {/* Summon button when assistant is closed */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsOpen(true);
              setHasDismissed(false);
            }}
            className="pointer-events-auto header-quote text-xs px-4 py-2.5 flex items-center gap-2 shadow-2xl cursor-pointer"
            aria-label="Open Fast Quote Assistant (plays Back In animation)"
          >
            <span>✦ Fast Quote Desk</span>
            <span className="metallic-badge text-xs">↑</span>
          </motion.button>
        )}
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Video scroll reveal — directly after hero */}
      <VideoScrollHero
        videoSrc="/assets/hero-video.mp4"
        startScale={0.3}
      />

      {/* 3. Credentials bar */}
      <CredentialsBar />

      {/* 4. Products */}
      <ProductsSection />

      {/* 5. Capability */}
      <CapabilitySection />

      {/* 6. Applications */}
      <ApplicationsSection />

      {/* 7. About */}
      <AboutStrip />

      {/* 8. Quote CTA */}
      <QuoteBanner />

      {/* 9. Floating menu */}
      <FloatingMenu
        items={[
          { label: "Home", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
          { label: "Products", onClick: () => document.getElementById("range")?.scrollIntoView({ behavior: "smooth" }) },
          { label: "About", onClick: () => (window.location.href = "/about") },
          { label: "Contact", onClick: () => (window.location.href = "/contact#quote") },
        ]}
      />

      {/* 10. Interactive Fast Quote Assistant (Demonstrates Back In & Back Out) */}
      <FastQuoteAssistant />
    </>
  );
}
