"use client";

import React from "react";

interface GlowInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function GlowInput({
  label,
  error,
  className = "",
  id,
  type = "text",
  icon,
  ...props
}: GlowInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const isPasswordType = type === "password";
  const currentType = isPasswordType && isPasswordVisible ? "text" : type;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit"
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={currentType}
          className={`
            w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400
            transition-all duration-300 outline-none
            focus:border-primary-blue/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.08)]
            ${icon ? "pl-11" : ""}
            ${isPasswordType ? "pr-12" : ""}
            ${error ? "border-red-300 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.08)]" : ""}
          `}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-4 text-slate-400 hover:text-primary-blue transition-colors flex items-center justify-center"
          >
            {isPasswordVisible ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        )}
      </div>
      {error ? (
        <span className="text-xs text-red-500 font-semibold mt-0.5">{error}</span>
      ) : null}
    </div>
  );
}
