"use client";

import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import { GitBranch } from "lucide-react";
import { useRouter } from "next/navigation";

interface SkillDetailPanelProps {
  selectedSkill: any;
  setSelectedSkill: (skill: any) => void;
  fetchCareerProgress: () => void;
}

export default function SkillDetailPanel({
  selectedSkill,
  setSelectedSkill,
  fetchCareerProgress,
}: SkillDetailPanelProps) {
  const router = useRouter();

  return (
    <GlassCard className="p-6 border border-primary-blue/5 bg-white/90 shadow-md rounded-2xl flex flex-col justify-between min-h-[580px] animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col gap-6">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-100 pb-3">
          Rincian Node Kemampuan
        </h3>

        {selectedSkill ? (
          <div className="flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shadow-sm">
                <GitBranch size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base tracking-wide leading-tight">
                  {selectedSkill.name}
                </h4>
                <span className="text-[10px] text-primary-blue bg-primary-blue/10 px-2 py-0.5 rounded-full border border-primary-blue/20 font-bold inline-block mt-1">
                  Unlocked • Level {Math.floor(selectedSkill.progress / 10) + 1}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-200/60 font-medium">
              {selectedSkill.description || "Node ini melambangkan fondasi keahlian inti yang dihasilkan secara adaptif menggunakan AI."}
            </p>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Metrik Kemajuan</span>
              <div className="flex justify-between items-center text-xs text-slate-700 font-semibold">
                <span>Progress Kumulatif</span>
                <span className="font-black text-primary-blue">{Math.round(selectedSkill.progress || 0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full transition-all duration-500"
                  style={{ width: `${selectedSkill.progress || 0}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sub-Skills Terdeteksi</span>
              <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {selectedSkill.children && selectedSkill.children.length > 0 ? (
                  selectedSkill.children.map((child: any) => (
                    <div key={child.id} className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] text-slate-700 font-bold flex items-center justify-between shadow-sm">
                      <span className="truncate">{child.name}</span>
                      <span className="text-primary-blue font-extrabold">{Math.round(child.progress)}%</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-slate-400 text-[10px] border border-dashed border-slate-200 rounded-xl font-medium">
                    Belum ada sub-skills terpetakan.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 text-xs py-10 font-medium">
            Pilih salah satu node pada graf di samping untuk melihat rincian progres AI.
          </div>
        )}
      </div>

      {/* Actions Quick-Access */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 mt-6">
        <NeonButton
          variant="secondary"
          onClick={() => router.push("/quiz")}
          className="w-full text-xs py-2 bg-slate-50 hover:bg-slate-100 text-slate-700"
        >
          Ikut Tes Kuis / Ulasan
        </NeonButton>
        <NeonButton
          variant="ghost"
          onClick={() => router.push("/projects")}
          className="w-full text-xs py-2 text-slate-500 hover:text-primary-blue font-bold"
        >
          Scan Repositori Proyek
        </NeonButton>
      </div>
    </GlassCard>
  );
}
