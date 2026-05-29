import React from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { Sparkles, ArrowRight } from "lucide-react";

interface ActiveQuestsBoardProps {
  parentSkills: any[];
  projectsCount: number;
  journalsCount: number;
}

export default function ActiveQuestsBoard({ parentSkills, projectsCount, journalsCount }: ActiveQuestsBoardProps) {
  const level = Math.floor(
    parentSkills.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (parentSkills.length || 1) / 10
  ) + 1;

  return (
    <GlassCard className="flex flex-col gap-4 border border-primary-blue/5 bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
            <Sparkles size={14} className="text-primary-blue animate-pulse" />
            Papan Misi RPG Aether (Active Quests)
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Selesaikan misi untuk mempercepat peningkatan level kompetensi Anda</p>
        </div>
        <span className="text-[9px] text-primary-blue bg-primary-blue/10 px-2 py-0.5 rounded-md border border-primary-blue/20 font-bold">
          Level {level}
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {/* Main Quest */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={parentSkills.length > 0}
              readOnly
              className="mt-1 w-4 h-4 rounded text-primary-blue border-slate-350 focus:ring-primary-blue shrink-0 pointer-events-none"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-black border border-amber-200">UTAMA</span>
                Menguasai Core Constellation
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">Tingkatkan seluruh skill hingga mencapai tingkat kemahiran mahir.</span>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 mt-1 md:mt-0">
            <span className="text-[10px] text-primary-blue font-black bg-primary-blue/10 px-2 py-0.5 rounded-md border border-primary-blue/20">Title Expert</span>
            <Link href="/graph" className="text-[10px] font-bold text-primary-blue hover:text-sky-blue flex items-center gap-0.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:scale-[1.03] transition-all">
              Lihat Tree <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Daily Quest 1 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={projectsCount > 0}
              readOnly
              className="mt-1 w-4 h-4 rounded text-primary-blue border-slate-350 focus:ring-primary-blue shrink-0 pointer-events-none"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="text-[9px] bg-primary-blue/10 text-primary-blue px-1.5 py-0.5 rounded font-black border border-primary-blue/20">HARIAN</span>
                Analisis Kode Sumber Proyek
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">Hubungkan repositori Git untuk memetakan Sub Skill secara otomatis.</span>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 mt-1 md:mt-0">
            <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150">+15 XP</span>
            <Link href="/projects" className="text-[10px] font-bold text-primary-blue hover:text-sky-blue flex items-center gap-0.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:scale-[1.03] transition-all">
              Tautkan Proyek <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Daily Quest 2 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={journalsCount > 0}
              readOnly
              className="mt-1 w-4 h-4 rounded text-primary-blue border-slate-350 focus:ring-primary-blue shrink-0 pointer-events-none"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="text-[9px] bg-primary-blue/10 text-primary-blue px-1.5 py-0.5 rounded font-black border border-primary-blue/20">HARIAN</span>
                Dokumentasikan Jurnal Belajar
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">Tulis catatan belajar hari ini untuk mengonsolidasikan pemahaman Anda.</span>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 mt-1 md:mt-0">
            <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150">+10 XP</span>
            <Link href="/journals" className="text-[10px] font-bold text-primary-blue hover:text-sky-blue flex items-center gap-0.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:scale-[1.03] transition-all">
              Tulis Jurnal <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Daily Quest 3 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={false}
              readOnly
              className="mt-1 w-4 h-4 rounded text-primary-blue border-slate-350 focus:ring-primary-blue shrink-0 pointer-events-none"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="text-[9px] bg-primary-blue/10 text-primary-blue px-1.5 py-0.5 rounded font-black border border-primary-blue/20">HARIAN</span>
                Uji Tanding di Quiz Arena
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">Ikuti kuis adaptif Aether hari ini untuk membuktikan pemahaman teori.</span>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 mt-1 md:mt-0">
            <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150">+20 XP</span>
            <Link href="/quiz" className="text-[10px] font-bold text-primary-blue hover:text-sky-blue flex items-center gap-0.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:scale-[1.03] transition-all">
              Masuk Arena <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
