"use client";

import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, X, Award } from "lucide-react";

interface ProfilePanelProps {
  user: any;
  parentSkills: any[];
  d: any;
}

export default function ProfilePanel({ user, parentSkills, d }: ProfilePanelProps) {
  const [activeModalSkill, setActiveModalSkill] = useState<any | null>(null);

  const totalSkills = parentSkills.length;
  const totalProgressSum = parentSkills.reduce((acc, curr) => acc + (curr.progress || 0), 0);
  const averageProgress = totalSkills > 0 ? Math.round(totalProgressSum / totalSkills) : 0;
  const currentLevel = Math.floor(averageProgress / 10) + 1;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-[fadeIn_0.4s_ease-out]">
      {/* Profile Overview Ring Card */}
      <GlassCard className="flex flex-col items-center justify-center p-8 gap-5 border border-primary-blue/5 bg-white shadow-md rounded-2xl">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase text-center w-full border-b border-slate-100 pb-3">
          Ringkasan Karir & Level
        </h3>
        
        {/* Circular Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring (Soft Grey) */}
            <circle
              className="text-slate-100"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="38"
              cx="50"
              cy="50"
            />
            {/* Active Progress Ring */}
            <circle
              className="text-primary-blue"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - averageProgress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="38"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LEVEL</span>
            <span className="text-3xl font-black text-slate-800">{currentLevel}</span>
            <span className="text-[10px] text-primary-blue font-black mt-0.5">{averageProgress}% XP</span>
          </div>
        </div>

        <div className="text-center">
          <h4 className="font-extrabold text-slate-800 text-lg leading-none">{user?.username}</h4>
          <p className="text-xs text-slate-500 font-semibold mt-1.5">Siswa Angkatan Ke-4 AI</p>
        </div>
      </GlassCard>

      {/* Skill List Percentage List */}
      <GlassCard className="lg:col-span-2 flex flex-col gap-4 border border-primary-blue/5 bg-white shadow-md rounded-2xl p-6 md:p-8">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-100 pb-3">
          Progres Kompetensi Saat Ini (Skill)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[220px] overflow-y-auto pr-1">
          {parentSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setActiveModalSkill(skill)}
              className="p-3.5 rounded-xl border bg-white border-slate-200 hover:border-primary-blue/35 hover:bg-primary-blue/5 transition-all duration-300 flex items-center justify-between cursor-pointer shadow-sm hover:scale-[1.01]"
            >
              <div className="flex flex-col gap-1 min-w-0 pr-3">
                <span className="text-sm font-extrabold text-slate-800 truncate">{skill.name}</span>
                <span className="text-[10px] text-primary-blue font-bold tracking-wide">
                  {skill.children?.length || 0} Sub Skill • Klik detail
                </span>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-xs font-black text-primary-blue">
                  {Math.round(skill.progress || 0)}%
                </span>
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full" style={{ width: `${skill.progress || 0}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Sub-skills / Child Skills Pop-up Modal */}
      <AnimatePresence>
        {activeModalSkill && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalSkill(null)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />
            {/* Modal Card content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md z-10 glass-panel p-6 border border-primary-blue/15 shadow-2xl relative bg-white flex flex-col gap-5 rounded-2xl"
            >
              <button
                onClick={() => setActiveModalSkill(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue shadow-sm shrink-0">
                  <GitBranch size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm tracking-wide leading-tight">
                    {activeModalSkill.name}
                  </h4>
                  <span className="text-[10px] text-primary-blue font-bold tracking-wide mt-1 inline-block">
                    Rincian Sub Skill
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sub Skill Terdeteksi ({activeModalSkill.children?.length || 0})</span>
                <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
                  {activeModalSkill.children && activeModalSkill.children.length > 0 ? (
                    activeModalSkill.children.map((child: any) => (
                      <div
                        key={child.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <Award size={14} className="text-primary-blue shrink-0" />
                          <span className="truncate max-w-[200px]">{child.name}</span>
                        </div>
                        <span className="text-primary-blue font-black">{Math.round(child.progress)}%</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl bg-slate-50 font-medium">
                      Belum ada Sub Skill terpetakan.
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full" style={{ width: `${activeModalSkill.progress}%` }} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
