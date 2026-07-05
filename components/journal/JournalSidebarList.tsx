"use client";

import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Upload, FileText, Calendar, ChevronRight, Trash2 } from "lucide-react";

interface JournalSidebarListProps {
  j: any;
}

export default function JournalSidebarList({ j }: JournalSidebarListProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Drag & Drop Upload Zone */}
      <GlassCard className="p-4 border border-dashed border-slate-200 relative hover:border-primary-blue/30 transition-all bg-slate-50">
        <div
          onDragEnter={j.handleDrag}
          onDragOver={j.handleDrag}
          onDragLeave={j.handleDrag}
          onDrop={j.handleDrop}
          className="w-full flex flex-col items-center justify-center p-6 text-center text-xs relative"
        >
          <input
            type="file"
            onDragEnter={j.handleDrag}
            onDragOver={j.handleDrag}
            onDragLeave={j.handleDrag}
            onDrop={j.handleDrop}
            accept=".txt,.pdf"
            onChange={j.handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={j.uploadLoading}
          />
          <Upload size={24} className="text-slate-400 mb-2 animate-bounce" />
          <h4 className="font-bold text-slate-800">Unggah File Belajar AI</h4>
          <p className="text-[10px] text-slate-500 mt-1 font-semibold">
            Mendukung berkas TXT/PDF. AI akan mengekstrak progres belajar Anda.
          </p>
          {j.uploadLoading && (
            <div className="mt-2 text-primary-blue font-bold animate-pulse">Mengunggah...</div>
          )}
        </div>
      </GlassCard>

      {/* List of Journals */}
      <GlassCard className="flex flex-col gap-4 max-h-[360px] lg:h-[496px] overflow-y-auto border border-primary-blue/10 bg-white shadow-sm p-5">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-100 pb-3">
          Daftar Catatan Jurnal
        </h3>

        {j.loading && j.journals.length === 0 ? (
          <div className="text-center text-slate-500 text-xs py-8 animate-pulse font-semibold">
            Memuat data jurnal...
          </div>
        ) : null}

        {!j.loading && j.journals.length === 0 ? (
          <div className="text-center text-slate-500 text-xs py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50 font-semibold">
            Belum ada jurnal ditulis.
          </div>
        ) : null}

        {j.journals.map((journal: any) => (
          <div
            key={journal.id}
            onClick={() => {
              j.setSelectedJournal(journal);
              j.setIsCreating(false);
            }}
            className={`
              p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer
              ${j.selectedJournal?.id === journal.id && !j.isCreating
                ? "bg-primary-blue/10 border-primary-blue/40 shadow-sm" 
                : "bg-white border-slate-200 hover:border-primary-blue/20 hover:bg-slate-50"}
            `}
          >
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <FileText size={18} className="text-primary-blue shrink-0" />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-bold text-slate-800 truncate">{journal.title}</span>
                <span className="text-[9px] text-slate-550 flex items-center gap-1 font-semibold">
                  <Calendar size={10} />
                  {new Date(journal.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  j.deleteJournal(journal.id);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Hapus Jurnal"
              >
                <Trash2 size={13} />
              </button>
              <ChevronRight size={14} className="text-slate-500" />
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
