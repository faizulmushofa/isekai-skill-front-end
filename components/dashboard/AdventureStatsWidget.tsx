import React from "react";
import GlassCard from "@/components/ui/GlassCard";

interface AdventureStatsWidgetProps {
  parentSkills: any[];
  projectsCount: number;
  journalsCount: number;
}

export default function AdventureStatsWidget({ parentSkills, projectsCount, journalsCount }: AdventureStatsWidgetProps) {
  const subSkillsCount = parentSkills.reduce((acc, curr) => acc + (curr.children?.length || 0), 0);

  return (
    <GlassCard className="flex flex-col gap-4 border border-primary-blue/5 bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-100 pb-3">
        Statistik Petualang
      </h3>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-0.5 shadow-sm">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Skill</span>
          <span className="text-2xl font-black text-slate-800 font-outfit">{parentSkills.length}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-0.5 shadow-sm">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Sub Skill</span>
          <span className="text-2xl font-black text-slate-800 font-outfit">
            {subSkillsCount}
          </span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-0.5 shadow-sm">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Connected Git</span>
          <span className="text-2xl font-black text-slate-800 font-outfit">{projectsCount}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-0.5 shadow-sm">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Catatan Jurnal</span>
          <span className="text-2xl font-black text-slate-800 font-outfit">{journalsCount}</span>
        </div>
      </div>
    </GlassCard>
  );
}
