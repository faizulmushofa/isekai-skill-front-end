import React from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { FolderGit2, ArrowRight } from "lucide-react";

interface ConnectedProjectsGridProps {
  loading: boolean;
  projects: any[];
}

export default function ConnectedProjectsGrid({ loading, projects }: ConnectedProjectsGridProps) {
  return (
    <GlassCard className="flex flex-col h-full border border-primary-blue/5 bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
          <FolderGit2 size={14} className="text-primary-blue" />
          Proyek Terhubung
        </h3>
        <Link href="/projects" className="text-[11px] font-bold text-primary-blue hover:text-sky-blue flex items-center gap-0.5 transition-colors shrink-0 whitespace-nowrap">
          Lihat Semua <ArrowRight size={10} className="shrink-0" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 flex-1 mt-3 justify-center">
        {loading && projects.length === 0 ? (
          <div className="text-center text-slate-500 text-xs py-8 animate-pulse font-semibold">
            Memuat data proyek...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-slate-400 text-xs py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50 font-medium">
            Belum ada proyek terhubung.
          </div>
        ) : (
          projects.slice(0, 2).map((project) => (
            <div key={project.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-sm hover:scale-[1.01] transition-transform duration-200">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-primary-blue/10 flex items-center justify-center text-primary-blue shrink-0">
                  <FolderGit2 size={16} />
                </div>
                <div className="flex flex-col min-w-0 gap-0.5">
                  <span className="text-xs font-bold text-slate-800 truncate">{project.title}</span>
                  <span className="text-[9px] text-slate-500 truncate font-semibold">{project.repositoryUrl || "File Upload"}</span>
                </div>
              </div>
              <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150 font-bold shrink-0">
                Connected
              </span>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
