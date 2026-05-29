"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import { Cpu, Upload, CheckCircle } from "lucide-react";

interface OrchestrateModalProps {
  p: any;
}

export default function OrchestrateModal({ p }: OrchestrateModalProps) {
  return (
    <AnimatePresence>
      {p.showOrchModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!p.orchLoading) {
                p.closeOrchestrate();
              }
            }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl z-10 glass-panel p-6 border border-primary-blue/10 shadow-2xl relative max-h-[85vh] overflow-y-auto bg-white"
          >
            <h3 className="text-lg font-bold text-slate-900 tracking-wide flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Cpu size={20} className="text-primary-blue" />
              AI Skill Orchestrator Scan
            </h3>

            {!p.orchResult ? (
              <form onSubmit={p.orchestrateProject} className="flex flex-col gap-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Orkestrator Aether akan memicu backend NestJS untuk memindai Git Repository Anda secara fully-automated (atau membaca file schema migrasi SQL). Data coding dan file terstruktur Anda akan dievaluasi untuk meningkatkan skill progressions.
                </p>

                <GlowInput
                  label="Git Repo URL Override"
                  placeholder="https://github.com/user/project-repo"
                  value={p.orchRepoUrl}
                  onChange={(e) => p.setOrchRepoUrl(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlowInput
                    label="Target Commit Hash (mode COMMIT)"
                    placeholder="abc1234"
                    value={p.orchCommitHash}
                    onChange={(e) => p.setOrchCommitHash(e.target.value)}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit">
                      Analisis Mode Hint
                    </label>
                    <select
                      value={p.orchModeHint}
                      onChange={(e: any) => p.setOrchModeHint(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 outline-none focus:border-primary-blue/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.08)] text-sm cursor-pointer"
                    >
                      <option value="INIT" className="bg-white text-slate-800" disabled={!!p.showOrchModal?.latestAnalysis}>
                        INIT (Scan Awal) {!!p.showOrchModal?.latestAnalysis && "(Sudah Selesai)"}
                      </option>
                      <option value="COMMIT" className="bg-white text-slate-800">COMMIT (Perbandingan Commit)</option>
                    </select>
                  </div>
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit">
                    Upload File SQL Schema / TXT Report (Opsional)
                  </label>
                  <div className="relative border border-dashed border-slate-200 hover:border-primary-blue/30 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-50">
                    <input
                      type="file"
                      accept=".sql,.txt,.json"
                      onChange={(e: any) => p.setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={24} className="text-slate-400 mx-auto mb-2" />
                    <span className="text-xs font-semibold text-slate-600">
                      {p.selectedFile ? p.selectedFile.name : "Klik atau seret file ke sini (.sql, .txt)"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => p.closeOrchestrate()}
                    disabled={p.orchLoading}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Batal
                  </button>
                  <NeonButton type="submit" loading={p.orchLoading} className="text-xs">
                    Jalankan Orkestrasi AI
                  </NeonButton>
                </div>
              </form>
            ) : (
              /* Orchestrate Results View */
              <div className="flex flex-col gap-5 py-2 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <CheckCircle size={24} className="shrink-0 animate-bounce text-emerald-600" />
                  <div>
                    <h4 className="font-extrabold text-sm text-emerald-900">Scan Proyek Selesai Berhasil!</h4>
                    <p className="text-[11px] text-emerald-700 font-medium">AI telah menganalisis codebase dan memperbarui progres skill Anda.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hasil Delta Progres Kemampuan</span>
                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {p.orchResult.skillDeltas && p.orchResult.skillDeltas.length > 0 ? (
                      p.orchResult.skillDeltas.map((delta: any) => (
                        <div key={delta.skillId} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-slate-800">{delta.skillName}</span>
                            <span className="text-[9px] text-slate-550 font-semibold">Kontribusi: +{delta.contribution?.toFixed(1) || 0}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-slate-500">
                              {Math.round(delta.oldProgress)}%
                            </span>
                            <span className="text-xs font-black text-emerald-600">
                              → {Math.round(delta.newProgress)}%
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-550 text-xs py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                        Analisis selesai, namun tidak ada perubahan progres skill terdeteksi.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <NeonButton
                    onClick={() => p.closeOrchestrate()}
                    className="text-xs"
                  >
                    Selesai & Tutup
                  </NeonButton>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

