"use client";

import React from "react";
import { motion } from "framer-motion";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  loading?: boolean;
}

export default function NeonButton({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
  loading = false,
}: NeonButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-primary-blue via-sky-blue to-soft-cyan text-white shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.3)] border-none font-bold";
      case "secondary":
        return "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm font-semibold";
      case "danger":
        return "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 font-semibold shadow-sm";
      case "ghost":
        return "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 font-medium border-none";
      default:
        return "";
    }
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.015 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.985 } : undefined}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-6 py-2.5 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2
        transition-all duration-300 backdrop-blur-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
        ${getStyles()}
        ${className}
      `}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
}
