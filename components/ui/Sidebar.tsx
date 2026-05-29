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
  User,
  GitBranch,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, parentSkills } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Skill Tree", href: "/graph", icon: GitBranch },
    { name: "Quiz Arena", href: "/quiz", icon: Sword },
    { name: "Projects", href: "/projects", icon: FolderGit2 },
    { name: "Journals", href: "/journals", icon: BookOpen },
  ];

  const totalSkillsCount = parentSkills.length;
  const averageProgress = totalSkillsCount > 0 
    ? Math.round(parentSkills.reduce((acc, curr) => acc + (curr.progress || 0), 0) / totalSkillsCount)
    : 0;

  const currentLevel = totalSkillsCount > 0
    ? Math.floor(averageProgress / 10) + 1
    : 1;

  const xpPercent = averageProgress % 10 * 10;
  const userInitial = user?.username?.charAt(0).toUpperCase() ?? "A";

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari Aether?")) {
      await logout();
    }
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden w-full h-16 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/40 px-4 flex items-center justify-between z-40 fixed top-0 left-0">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles size={20} className="text-sky-300" />
          <span className="text-xl font-bold tracking-wider text-white font-outfit">AETHER</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-slate-200 hover:text-sky-300 rounded-lg bg-slate-900/80 border border-slate-800/60 cursor-pointer"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            className="md:hidden fixed top-0 left-0 w-[280px] h-full bg-white/95 border-r border-primary-blue/10 p-6 z-50 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold tracking-wider gradient-text">AETHER</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1 text-slate-500 hover:text-primary-blue cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Profile Card */}
              <div className="p-4 rounded-2xl bg-white border border-primary-blue/10 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue font-extrabold text-sm select-none">
                    {userInitial}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{user?.username}</h4>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                {parentSkills.length > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Level {currentLevel}</span>
                      <span>{xpPercent}% XP</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full" style={{ width: `${xpPercent}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Menu */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300
                        ${isActive 
                          ? "bg-primary-blue/10 text-primary-blue border border-primary-blue/25 shadow-[0_0_15px_rgba(59,130,246,0.05)]" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent"}
                      `}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={18} />
              <span>Keluar</span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
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
                    <span className="text-xl font-bold tracking-wider text-slate-900 font-outfit">AETHER</span>
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-w-0"
                >
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
                  <div className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full" style={{ width: `${xpPercent}%` }} />
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
                    ${isActive 
                      ? "bg-primary-blue/10 text-primary-blue border border-primary-blue/25 shadow-[0_0_15px_rgba(59,130,246,0.04)]" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/60 border border-transparent"}
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Keluar
            </motion.span>
          )}
        </button>
      </motion.aside>
    </>
  );
}
