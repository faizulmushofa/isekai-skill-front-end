"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { useDashboard } from "@/hooks/useDashboard";
import { useProjects } from "@/hooks/useProjects";
import { useJournals } from "@/hooks/useJournals";
import Sidebar from "@/components/ui/Sidebar";
import OnboardingPanel from "@/components/dashboard/OnboardingPanel";
import ProfilePanel from "@/components/dashboard/ProfilePanel";
import { Sparkles } from "lucide-react";

import ActiveQuestsBoard from "@/components/dashboard/ActiveQuestsBoard";
import ConnectedProjectsGrid from "@/components/dashboard/ConnectedProjectsGrid";
import RecentJournalsGrid from "@/components/dashboard/RecentJournalsGrid";
import AdventureStatsWidget from "@/components/dashboard/AdventureStatsWidget";
import ActiveBuffsWidget from "@/components/dashboard/ActiveBuffsWidget";

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    parentSkills,
    initializeAuth,
    onboardingStep,
    careerGoal,
  } = useAuthStore();

  const d = useDashboard();
  const p = useProjects();
  const j = useJournals();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-midnight flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin" />
        <p className="text-slate-500 font-medium tracking-wide animate-pulse">
          Menginisialisasi Sistem Aether...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!careerGoal || onboardingStep !== "DONE") {
    return <OnboardingPanel user={user} onboardingStep={onboardingStep} d={d} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-midnight relative">
      <Sidebar />

      {/* Main Command Workspace */}
      <main className="flex-1 min-w-0 px-4 py-4 md:px-8 md:py-10 z-10 pb-28 md:pb-10 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
          {/* Header Profile Dashboard Overview */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile-only brand logo wrapper */}
              <div className="md:hidden w-12 h-12 rounded-2xl bg-white border border-primary-blue/10 flex items-center justify-center shrink-0 shadow-sm drop-shadow-[0_0_10px_rgba(14,165,233,0.15)] overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Aether Logo"
                  width={96}
                  height={96}
                  className="shrink-0 object-contain drop-shadow-[0_0_12px_rgba(14,165,233,0.25)] filter contrast-110"
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="text-xs font-bold text-primary-blue uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={12} className="animate-pulse" />
                  SISTEM PROGRESS KEMAMPUAN AETHER
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">
                  Command Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white border border-primary-blue/10 px-3 py-2 rounded-2xl shadow-sm w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Jalur Karir:</span>
              <span className="text-xs font-bold text-primary-blue bg-primary-blue/10 px-2.5 py-1 rounded-xl border border-primary-blue/20 truncate">
                {careerGoal || "Direct Pathway"}
              </span>
            </div>
          </header>

          {/* Profile Stats & Flat Skills Trackers Section */}
          <ProfilePanel user={user} parentSkills={parentSkills} d={d} />

          {/* Master Adventure Grid: 2/3 (Quests & Evidences) and 1/3 (Stats & Buffs) */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-0 md:mt-2">
            
            {/* Left Area (2/3 width on lg): Quests & Learning Logs */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ActiveQuestsBoard 
                parentSkills={parentSkills} 
                projectsCount={p.projects.length} 
                journalsCount={j.journals.length} 
              />
              
              {/* Evidence sub-grids (Recent Projects & Journals side-by-side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ConnectedProjectsGrid loading={p.loading} projects={p.projects} />
                <RecentJournalsGrid loading={j.loading} journals={j.journals} />
              </div>
            </div>

            {/* Right Area (1/3 width on lg): Adventure Stats & Active Buffs */}
            <div className="flex flex-col gap-6">
              <AdventureStatsWidget 
                parentSkills={parentSkills} 
                projectsCount={p.projects.length} 
                journalsCount={j.journals.length} 
              />
              <ActiveBuffsWidget />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
