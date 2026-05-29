"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useJournals } from "@/hooks/useJournals";
import Sidebar from "@/components/ui/Sidebar";
import JournalSidebarList from "@/components/journal/JournalSidebarList";
import JournalEditorViewer from "@/components/journal/JournalEditorViewer";
import NeonButton from "@/components/ui/NeonButton";
import { BookOpen, Plus } from "lucide-react";

export default function JournalsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const j = useJournals();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 relative">
      <Sidebar />

      <main className="flex-1 px-4 py-4 md:p-10 flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto w-full z-10 pb-28 md:pb-10 overflow-y-auto">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-0">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-sky-blue uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen size={12} />
              BUKU LOG PEMBELAJARAN
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">
              Learning Journals
            </h1>
          </div>

          <NeonButton
            onClick={() => {
              j.setIsCreating(true);
              j.setSelectedJournal(null);
            }}
            className="text-xs py-2 px-4"
          >
            Tulis Jurnal Baru
            <Plus size={16} />
          </NeonButton>
        </header>

        {/* Sidebar + Editor Split Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-2">
          {/* Left Column: Journals List & Dropzone */}
          <JournalSidebarList j={j} />

          {/* Right Column: Editor / Reader Panel */}
          <div className="lg:col-span-2">
            <JournalEditorViewer j={j} />
          </div>
        </section>
      </main>
    </div>
  );
}
