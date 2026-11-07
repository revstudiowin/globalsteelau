"use client";

import { VideoScrollHero } from "@/components/ui/video-scroll-hero";
import { motion } from "framer-motion";

export default function VideoScrollHeroPage() {
  return (
    <div className="min-h-screen">
      <VideoScrollHero videoSrc="/assets/hero-video.mp4" />

      {/* Next Section */}
      <motion.section
        className="relative -mt-8 rounded-t-3xl min-h-screen"
        style={{ background: "var(--paper)" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        <div className="container mx-auto px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-8"
              style={{ color: "var(--ink)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
            >
              Steel. Built to Scale.
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-12"
              style={{ color: "var(--muted)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
            >
              The video has reached full size and now you can continue scrolling
              through the rest of the content.
            </motion.p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(
                [
                  ["Steel Bar", "ACRS certified reinforcing bar in standard and custom lengths."],
                  ["Steel Mesh", "Reinforcing mesh cut and bent to your project specification."],
                  ["Accessories", "Ties, chairs, couplers and all the essentials for the job."],
                ] as [string, string][]
              ).map(([title, desc], index) => (
                <motion.div
                  key={title}
                  className="p-6 rounded-xl shadow-sm"
                  style={{
                    background: "white",
                    border: "1px solid var(--line)",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "var(--brand)" }}
                  >
                    <div className="w-6 h-6 rounded" style={{ background: "var(--ink)" }} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px" }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

