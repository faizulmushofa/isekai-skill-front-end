"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProjects } from "@/hooks/useProjects";
import Sidebar from "@/components/ui/Sidebar";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import AddProjectModal from "@/components/project/AddProjectModal";
import OrchestrateModal from "@/components/project/OrchestrateModal";
import { FolderGit2, Plus, ArrowUpRight, CheckCircle } from "lucide-react";

export default function ProjectsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const p = useProjects();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const hasSkillDeltas = p.latestScanResult?.skillDeltas && p.latestScanResult.skillDeltas.length > 0;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 relative">
      <Sidebar />

      <main className="flex-1 px-4 py-4 md:p-10 flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto w-full z-10 pb-28 md:pb-10">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest flex items-center gap-1.5">
              <FolderGit2 size={12} />
              WORKSPACE REPOSITORI PROYEK
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">
              Projects Management
            </h1>
          </div>

          <NeonButton
            onClick={() => p.setShowAddModal(true)}
            className="text-xs py-2 px-4"
          >
            Hubungkan Proyek
            <Plus size={16} />
          </NeonButton>
        </header>

        {/* Loading Spinner */}
        {p.loading && p.projects.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin" />
            <span className="text-xs text-slate-500 font-semibold animate-pulse">Memuat repositori proyek...</span>
          </div>
        ) : null}

        {/* Empty State */}
        {!p.loading && p.projects.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 bg-white/70 shadow-sm rounded-3xl py-24 text-center px-4 max-w-xl mx-auto mt-10">
            <div className="w-14 h-14 rounded-2xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-4 border border-primary-blue/20">
              <FolderGit2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Hubungkan Proyek Pertama Anda</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Hubungkan repositori GitHub Anda atau berkas migrasi database SQL. Engine AI Aether akan melacak progress coding Anda dan menerjemahkannya ke delta kontribusi skill secara dinamis.
            </p>
            <NeonButton
              onClick={() => p.setShowAddModal(true)}
              className="text-xs py-2 mt-6"
            >
              Hubungkan Sekarang
              <Plus size={16} />
            </NeonButton>
          </div>
        ) : null}

        {/* Projects List Grid */}
        {p.projects.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {p.projects.map((project) => (
              <GlassCard
                key={project.id}
                className="flex flex-col justify-between border border-primary-blue/5 bg-white shadow-md rounded-2xl p-6 min-h-[220px]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/15 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0">
                      <FolderGit2 size={20} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 truncate max-w-[150px]">
                      {project.repositoryUrl ? "Git Repository" : "File Upload"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base tracking-wide leading-snug font-outfit">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3 font-semibold">
                      {project.description || "Tidak ada deskripsi ditambahkan."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 mt-6 border-t border-slate-100 pt-4">
                  <NeonButton
                    onClick={() => p.openOrchestrate(project)}
                    className="w-full text-xs py-2"
                  >
                    Orkestrasikan AI Scan
                    <ArrowUpRight size={14} />
                  </NeonButton>
                  {project.latestAnalysis && (
                    <button
                      onClick={() => {
                        let analysisData = project.latestAnalysis;
                        if (typeof analysisData === 'string') {
                          try { analysisData = JSON.parse(analysisData); } catch(e) {}
                        }
                        
                        if (!Array.isArray(analysisData)) analysisData = [];

                        p.setLatestScanResult({ skillDeltas: analysisData });
                        setTimeout(() => {
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full text-xs py-2 text-primary-blue border border-primary-blue/20 rounded-xl hover:bg-primary-blue/5 transition-colors font-bold"
                    >
                      Lihat Hasil Terakhir
                    </button>
                  )}
                </div>
              </GlassCard>
            ))}
          </section>
        )}

        {/* Wide Scan Results Panel (Provides dedicated result space at the bottom) */}
        <GlassCard className="flex flex-col gap-5 border border-primary-blue/10 bg-white shadow-lg rounded-2xl p-6 mt-4 animate-[fadeIn_0.4s_ease-out]">
          <div className="flex justify-between items-center border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                  <CheckCircle size={18} className="animate-bounce" />
                </div>
                <div>
                    <h3 className="text-xs font-black text-slate-900 tracking-wider font-outfit uppercase">
                    Hasil AI Scan Terbaru (Orkestrasi Kode)
                  </h3>
                  <p className="text-[9.5px] text-slate-400 font-bold mt-0.5">Codebase berhasil dipindai dan kontribusi skill telah berhasil didistribusikan</p>
                </div>
              </div>
              <button 
                onClick={() => p.setLatestScanResult(null)}
                className="text-[9.5px] font-bold text-red-500 hover:text-red-650 bg-red-50 border border-red-200 hover:border-red-300 px-3 py-1 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Sembunyikan Hasil Scan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hasSkillDeltas ? (
                p.latestScanResult.skillDeltas.map((delta: any) => (
                  <div key={delta.skillId} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 shadow-sm hover:scale-[1.01] transition-transform duration-200">
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-xs font-black text-slate-800 truncate leading-snug">{delta.skillName}</span>
                      <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150 font-black shrink-0">
                        +{delta.contribution?.toFixed(1) || 0}% Delta
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9.5px] font-bold text-slate-500">
                      <span>Progres Skill</span>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <span>{Math.round(delta.oldProgress)}%</span>
                        <span className="text-emerald-600 font-black">→ {Math.round(delta.newProgress)}%</span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
                      {/* Old Progress Bar (Light Blue) */}
                      <div 
                        className="h-full bg-primary-blue/30 rounded-full absolute left-0 top-0 transition-all duration-500" 
                        style={{ width: `${delta.oldProgress}%` }}
                      />
                      {/* New Progress Bar (Emerald Green) */}
                      <div 
                        className="h-full bg-emerald-500 rounded-full absolute left-0 top-0 transition-all duration-700" 
                        style={{ width: `${delta.newProgress}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500 text-xs py-16 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50/80 font-semibold">
                  <p className="text-sm font-bold text-slate-800 mb-2">Hasil scan belum tersedia</p>
                  <p className="max-w-md mx-auto text-slate-500 leading-relaxed">
                    Jalankan orkestrasi AI Scan pada proyek Anda untuk menampilkan hasil di sini secara otomatis. Jika belum ada, pilih proyek dan klik “Orkestrasikan AI Scan” untuk memulai.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>

        {/* Modular Modals */}
        <AddProjectModal p={p} />
        <OrchestrateModal p={p} />
      </main>
    </div>
  );
}
