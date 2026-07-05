"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import { ArrowLeft, Calendar, Sparkles, BookMarked, RefreshCw } from "lucide-react";

interface JournalEditorViewerProps {
  j: any;
}

export default function JournalEditorViewer({ j }: JournalEditorViewerProps) {
  return (
    <GlassCard className={`p-6 border border-primary-blue/10 flex flex-col bg-white shadow-sm transition-all duration-300 ${
      (j.isCreating || j.selectedJournal) 
        ? "fixed inset-0 z-[60] h-full rounded-none border-none p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,20px))] pt-[calc(1.5rem+env(safe-area-inset-top,20px))] lg:relative lg:inset-auto lg:z-auto lg:h-[700px] lg:rounded-2xl lg:border lg:p-6"
        : "hidden lg:flex lg:relative lg:inset-auto lg:z-auto lg:h-[700px] lg:rounded-2xl"
    }`}>
      <AnimatePresence mode="wait">
        {/* WRITE / CREATE NEW JOURNAL */}
        {j.isCreating ? (
          <motion.form
            key="create-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={j.createJournal}
            className="flex flex-col gap-5 flex-1 h-full min-h-0"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => {
                  j.setIsCreating(false);
                  if (window.innerWidth < 1024) {
                    j.setSelectedJournal(null);
                  } else if (j.journals.length > 0) {
                    j.setSelectedJournal(j.journals[0]);
                  }
                }}
                className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Tulis Jurnal Baru
              </h3>
            </div>

            <GlowInput
              label="Judul Jurnal Belajar"
              placeholder="Hari ini saya mempelajari setup prisma..."
              value={j.title}
              onChange={(e) => j.setTitle(e.target.value)}
              required
            />

            <div className="flex flex-col gap-2 flex-1 min-h-0">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit">
                Catatan Belajar / Isi Log
              </label>
              <textarea
                required
                value={j.content}
                onChange={(e) => j.setContent(e.target.value)}
                placeholder="Tuliskan materi yang Anda pelajari, rangkuman konsep, kendala yang dihadapi, serta keberhasilan yang dicapai..."
                className="w-full flex-1 min-h-0 p-4 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 transition-all outline-none focus:border-primary-blue/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.08)] text-sm resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <NeonButton type="submit" loading={j.addLoading} className="text-xs">
                Simpan Jurnal & Analisis AI
              </NeonButton>
            </div>
          </motion.form>
        ) : j.selectedJournal ? (
          /* READ JOURNAL DETAILS */
          <motion.div
            key="read-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-5 flex-1 h-full min-h-0"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => j.setSelectedJournal(null)}
                  className="lg:hidden p-1 text-slate-500 hover:text-slate-800 cursor-pointer shrink-0"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[10px] text-primary-blue font-bold bg-primary-blue/10 px-2.5 py-0.5 rounded-full border border-primary-blue/20 inline-block w-fit">
                    Journal Log
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-wide leading-tight truncate max-w-[160px] xs:max-w-xs sm:max-w-md">
                    {j.selectedJournal.title}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-650 font-bold bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 shrink-0">
                <Calendar size={12} />
                {new Date(j.selectedJournal.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Content Markdown/Text viewport */}
            <div className="flex-1 min-h-0 bg-slate-50 border border-slate-200 rounded-2xl p-5 overflow-y-auto text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {j.selectedJournal.content}
            </div>

            {/* Extracted Skills / XP Section */}
            <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex justify-between items-center gap-3">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                  <Sparkles size={12} className="text-primary-blue animate-pulse" />
                  XP Yang Diperoleh:
                </span>
                <button
                  type="button"
                  onClick={j.reloadSelectedJournal}
                  disabled={j.reloadLoading}
                  className="px-2.5 py-1.5 rounded-xl text-slate-600 hover:text-primary-blue hover:bg-slate-100 disabled:opacity-50 transition-all flex items-center gap-1.5 text-[10px] font-black cursor-pointer border border-slate-200 bg-white shadow-sm shrink-0 whitespace-nowrap"
                  title="Lihat / Muat Ulang XP"
                >
                  <RefreshCw size={11} className={`${j.reloadLoading ? 'animate-spin text-primary-blue' : 'text-slate-400'}`} />
                  {j.reloadLoading ? 'Memuat...' : 'Lihat / Muat Ulang XP'}
                </button>
              </div>

              {j.selectedJournal.skillEvents && j.selectedJournal.skillEvents.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {j.selectedJournal.skillEvents.map((se: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-150 text-emerald-700 text-xs font-black shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{se.skill?.name || "Skill"}</span>
                      <span className="text-emerald-500 font-extrabold">+{se.contribution.toFixed(2)}% XP</span>
                      <span className="text-slate-400 text-[10px] font-semibold">({se.rawScore.toFixed(0)}% Match)</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 font-semibold p-3 bg-slate-100/50 rounded-xl border border-slate-200/60 flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                  <span>AI sedang memproses ekstraksi XP... Silakan klik tombol di atas untuk menyegarkan data.</span>
                </div>
              )}
            </div>

            {/* Informative notification box */}
            <div className="p-4 rounded-xl bg-primary-blue/10 border border-primary-blue/20 text-slate-650 text-xs flex items-center gap-3 font-semibold">
              <Sparkles size={18} className="text-primary-blue shrink-0 animate-pulse" />
              <span>Catatan jurnal ini telah terindeks secara kognitif. Bayesian Engine Aether memperbarui tingkat pemahaman skill terhubung Anda secara fully-automated.</span>
            </div>
          </motion.div>
        ) : (
          /* EMPTY STATE DETAIL VIEW */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <BookMarked size={48} className="text-slate-400 mb-4" />
            <h3 className="text-base font-extrabold text-slate-750">Pilih Jurnal untuk Dibaca</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm font-semibold">
              Pilih dari daftar di kiri, atau tulis jurnal baru untuk mencatat progress petualangan belajar Anda hari ini.
            </p>
          </div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
