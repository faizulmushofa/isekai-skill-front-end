"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverGlow?: boolean;
  onClick?: () => void;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  glow = false,
  hoverGlow = true,
  onClick,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={onClick || hoverGlow ? { y: -3, scale: 1.01 } : undefined}
      onClick={onClick}
      className={`
        glass-panel p-6 backdrop-blur-md relative overflow-hidden transition-all duration-300
        ${glow ? "glow-border" : "border border-white/5"}
        ${hoverGlow ? "hover:border-primary-blue/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Light sweep animation overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      {children}
    </motion.div>
  );
}
