"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import { Compass, BrainCircuit, Activity, Trophy, ArrowRight } from "lucide-react";

interface OnboardingPanelProps {
  user: any;
  onboardingStep: string | null;
  d: any;
}

export default function OnboardingPanel({ user, onboardingStep, d }: OnboardingPanelProps) {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glowing Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-glow-blue opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-glow-cyan opacity-20 pointer-events-none" />

      <div className="w-full max-w-2xl z-10 animate-[fadeIn_0.5s_ease-out]">
        <GlassCard hoverGlow={false} className="p-8 border border-primary-blue/10 relative bg-white/95 shadow-2xl rounded-3xl">
          <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-slate-400 flex items-center gap-1.5 uppercase">
            <Compass size={12} className="animate-spin text-primary-blue" />
            AI PATHFINDER ONBOARDING
          </div>

          <AnimatePresence>
            {d.initLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl"
              >
                <div className="w-16 h-16 border-4 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin mb-4"></div>
                <h3 className="text-primary-blue font-bold tracking-widest uppercase text-sm animate-pulse">
                  AI is Analyzing...
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* STEP 0: Classification Start */}
            {(onboardingStep === null || onboardingStep === "CLASSIFY") && (
              <motion.div
                key="classify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shadow-[0_4px_15px_rgba(79,70,229,0.12)]">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-wide font-outfit">
                      Choose Your Career Path
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Inisialisasi sistem perkembangan keahlian berbasis minat dan AI.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Selamat datang, <strong className="text-primary-blue font-bold">{user?.username}</strong>! Aether akan melacak kemampuan, menyajikan peta keahlian interaktif, dan kuis adaptif. Beritahu kami apa minat atau impian karir Anda, atau kosongkan jika Anda masih ragu mencari jati diri.
                </p>

                <form onSubmit={d.handleStartOnboarding} className="flex flex-col gap-4">
                  <GlowInput
                    placeholder="Contoh: Saya ingin menjadi Backend Engineer, atau saya suka coding Python..."
                    value={d.initInput}
                    onChange={(e) => d.setInitInput(e.target.value)}
                    disabled={d.initLoading}
                    autoFocus
                  />
                  <div className="flex justify-end gap-3 mt-2">
                    <NeonButton
                      type="submit"
                      loading={d.initLoading}
                      className="px-8 text-sm font-bold bg-primary-blue hover:bg-sky-blue"
                    >
                      Mulai Analisis
                      <ArrowRight size={16} />
                    </NeonButton>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 1: Discovery (RIASEC Adaptive Quiz) */}
            {onboardingStep === "DISCOVERY" && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-blue/10 border border-sky-blue/20 flex items-center justify-center text-sky-blue">
                      <Activity size={20} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-800 tracking-wide font-outfit">
                        RIASEC Discovery Test
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Dimensi Aktif: <span className="text-primary-blue font-bold">{d.currentDimension}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Pertanyaan {d.onboardingQuestionIndex}/10
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-inner">
                  <p className="text-base text-slate-800 font-semibold leading-relaxed">
                    {d.currentQuestion}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                    Pilih Tanggapan Anda:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => d.handleAnswerDiscovery(4)}
                      disabled={d.initLoading}
                      className="px-4 py-3 rounded-xl bg-white border border-slate-200/80 hover:border-primary-blue/30 hover:bg-primary-blue/5 text-slate-700 text-sm font-semibold transition-all text-left cursor-pointer shadow-sm"
                    >
                      🟢 Sangat Suka / Setuju
                    </button>
                    <button
                      onClick={() => d.handleAnswerDiscovery(3)}
                      disabled={d.initLoading}
                      className="px-4 py-3 rounded-xl bg-white border border-slate-200/80 hover:border-primary-blue/30 hover:bg-primary-blue/5 text-slate-700 text-sm font-semibold transition-all text-left cursor-pointer shadow-sm"
                    >
                      🔵 Suka / Cukup Tertarik
                    </button>
                    <button
                      onClick={() => d.handleAnswerDiscovery(2)}
                      disabled={d.initLoading}
                      className="px-4 py-3 rounded-xl bg-white border border-slate-200/80 hover:border-primary-blue/30 hover:bg-primary-blue/5 text-slate-700 text-sm font-semibold transition-all text-left cursor-pointer shadow-sm"
                    >
                      ⚪ Biasa Saja / Netral
                    </button>
                    <button
                      onClick={() => d.handleAnswerDiscovery(1)}
                      disabled={d.initLoading}
                      className="px-4 py-3 rounded-xl bg-white border border-slate-200/80 hover:border-red-500/20 hover:bg-red-500/5 text-slate-700 text-sm font-semibold transition-all text-left cursor-pointer shadow-sm"
                    >
                      🔴 Tidak Suka / Menolak
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
                  <button
                    onClick={d.handleResetSession}
                    className="text-xs text-slate-500 hover:text-red-500 font-bold transition-colors cursor-pointer"
                  >
                    Batal & Reset
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Career Selection */}
            {onboardingStep === "CAREER_SELECTION" && (
              <motion.div
                key="career-select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-soft-cyan/10 border border-soft-cyan/20 flex items-center justify-center text-soft-cyan shadow-[0_4px_15px_rgba(217,119,6,0.12)]">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-wide font-outfit">
                      Rekomendasi Karir AI
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {d.onboardingMessage || "Silakan pilih salah satu karir untuk memfinalisasi perkembangan keahlian Anda."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {d.careerOptions && d.careerOptions.map((career: any) => (
                    <div
                      key={career.title}
                      onClick={() => d.handleSelectCareer(career.title)}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-primary-blue/35 hover:bg-primary-blue/5 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-sm"
                    >
                      <div className="flex flex-col gap-1.5 pr-4">
                        <h4 className="font-bold text-slate-800 group-hover:text-primary-blue transition-colors text-sm">
                          {career.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {career.reason}
                        </p>
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          {career.matchFactors?.map((f: string) => (
                            <span key={f} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-lg text-slate-600 font-bold border border-slate-200">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-[10px] font-bold text-primary-blue bg-primary-blue/10 px-2.5 py-0.5 rounded-full border border-primary-blue/20">
                          {(career.confidence * 100).toFixed(0)}% Match
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 group-hover:text-slate-800">
                          Pilih <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
                  <button
                    onClick={d.handleResetSession}
                    className="text-xs text-slate-500 hover:text-red-500 font-bold transition-colors cursor-pointer"
                  >
                    Mulai Ulang Tes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </main>
  );
}
