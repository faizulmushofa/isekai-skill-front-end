"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Sword,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  GitBranch,
  Sparkles,
  User,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, parentSkills } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Skill Tree", href: "/graph", icon: GitBranch },
    { name: "Quiz", href: "/quiz", icon: Sword },
    { name: "Projects", href: "/projects", icon: FolderGit2 },
    { name: "Journals", href: "/journals", icon: BookOpen },
  ];

  const totalSkillsCount = parentSkills.length;
  const averageProgress =
    totalSkillsCount > 0
      ? Math.round(
          parentSkills.reduce((acc, curr) => acc + (curr.progress || 0), 0) /
            totalSkillsCount
        )
      : 0;

  const currentLevel = totalSkillsCount > 0
    ? Math.floor(averageProgress / 10) + 1
    : 1;

  const xpPercent = (averageProgress % 10) * 10;
  const userInitial = user?.username?.charAt(0).toUpperCase() ?? "A";

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari Aether?")) {
      await logout();
    }
  };

  return (
    <>
      {/* ── MOBILE: Bottom Navigation Bar ─────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(37,99,235,0.06)]">
        {/* Safe area padding for iPhone */}
        <div className="flex items-center justify-around px-1 pt-2 pb-[env(safe-area-inset-bottom,8px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px] ${
                  isActive
                    ? "text-primary-blue"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary-blue/10 shadow-sm"
                      : ""
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span
                  className={`text-[10px] font-bold leading-tight ${
                    isActive ? "text-primary-blue" : "text-slate-400"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Profile / Logout button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px] text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <div className="p-1.5 rounded-xl">
              <User size={20} strokeWidth={1.8} />
            </div>
            <span className="text-[10px] font-bold leading-tight">Profil</span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE: Profile Sheet (slide-up) ──────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.08, duration: 0.38 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl p-6 flex flex-col gap-5 shadow-2xl border-t border-slate-200/60 max-h-[85vh] overflow-y-auto"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
            >
              {/* Handle row with Close Button */}
              <div className="flex items-center justify-between -mt-2 mb-1 w-full relative">
                <div className="w-10 h-1 bg-slate-200 rounded-full absolute left-1/2 -translate-x-1/2" />
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer shadow-sm"
                    aria-label="Tutup"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* User card */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue font-extrabold text-base select-none shrink-0">
                  {userInitial}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800 truncate">{user?.username}</h4>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>

              {/* XP bar */}
              {parentSkills.length > 0 && (
                <div className="px-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Level {currentLevel}</span>
                    <span className="text-primary-blue font-bold">{xpPercent}% XP</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full transition-all duration-500"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                Keluar dari Aether
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP: Persistent Sidebar ────────────────────────────── */}
      <motion.aside
        animate={{ width: isCollapsed ? 88 : 280 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="hidden md:flex flex-col justify-between h-screen sticky top-0 left-0 bg-white/45 backdrop-blur-xl border-r border-primary-blue/10 p-6 z-30 overflow-hidden shadow-[4px_0_24px_rgba(59,130,246,0.02)]"
      >
        {/* Toggle Collapse Trigger */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-18 right-2 p-1.5 rounded-lg bg-white border border-primary-blue/10 text-slate-500 hover:text-primary-blue cursor-pointer hover:bg-slate-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="flex flex-col gap-10">
          {/* Logo Title */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 h-10">
              <Sparkles size={20} className="text-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.25)]" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col"
                  >
                    <span className="text-xl font-bold tracking-wider text-slate-900 font-outfit">
                      AETHER
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium leading-tight uppercase tracking-[0.18em]">
                      Where progress becomes measurable.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-white/60 border border-primary-blue/5 flex flex-col gap-3 overflow-hidden shadow-[0_4px_16px_rgba(59,130,246,0.03)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0 font-extrabold text-sm select-none">
                {userInitial}
              </div>
              {!isCollapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
                  <h4 className="font-semibold text-slate-800 truncate">{user?.username}</h4>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </motion.div>
              )}
            </div>
            {!isCollapsed && parentSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 border-t border-slate-100 pt-2"
              >
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Level {currentLevel}</span>
                  <span>{xpPercent}% XP</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 relative
                    ${
                      isActive
                        ? "bg-primary-blue/10 text-primary-blue border border-primary-blue/25 shadow-[0_0_15px_rgba(59,130,246,0.04)]"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/60 border border-transparent"
                    }
                  `}
                >
                  <Icon size={18} className="shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 transition-all duration-300 cursor-pointer"
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Keluar
            </motion.span>
          )}
        </button>
      </motion.aside>
    </>
  );
}
