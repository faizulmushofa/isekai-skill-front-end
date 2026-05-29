import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Sparkles, Clock, FolderGit2 } from "lucide-react";

export default function ActiveBuffsWidget() {
  return (
    <GlassCard className="flex flex-col gap-4 border border-primary-blue/5 bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-100 pb-3 flex items-center gap-1.5">
        <Sparkles size={14} className="text-primary-blue animate-pulse" />
        Efek Pasif & Buff Aktif
      </h3>

      <div className="flex flex-col gap-4">
        {/* Buff 1 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
            <Sparkles size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="flex flex-col min-w-0 gap-0.5">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              Aura Kognitif Aether
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            </span>
            <span className="text-[10px] text-slate-500 font-semibold leading-relaxed">Penyerapan kompetensi +15% dari hasil parsing kode sumber AI.</span>
          </div>
        </div>

        {/* Buff 2 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shadow-sm shrink-0">
            <Clock size={16} className="animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0 gap-0.5">
            <span className="text-xs font-bold text-slate-800">Fokus Adaptif Aktif</span>
            <span className="text-[10px] text-slate-500 font-semibold leading-relaxed">AI Quiz Arena menyesuaikan pertanyaan secara real-time dengan tingkat XP Anda.</span>
          </div>
        </div>

        {/* Buff 3 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-500 shadow-sm shrink-0">
            <FolderGit2 size={16} />
          </div>
          <div className="flex flex-col min-w-0 gap-0.5">
            <span className="text-xs font-bold text-slate-800">Jaringan Bintang Unlocked</span>
            <span className="text-[10px] text-slate-500 font-semibold leading-relaxed">Constellation Tree interaktif tersinkronisasi penuh di tab navigasi Skill Tree.</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
