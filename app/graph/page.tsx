"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { useDashboard } from "@/hooks/useDashboard";
import Sidebar from "@/components/ui/Sidebar";
import SkillGraphCanvas from "@/components/dashboard/SkillGraphCanvas";
import { Sparkles } from "lucide-react";

export default function SkillGraphPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    parentSkills,
    initializeAuth,
    fetchCareerProgress,
    onboardingStep,
    careerGoal,
  } = useAuthStore();

  const d = useDashboard();

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

  if (parentSkills.length === 0 || onboardingStep !== "DONE") {
    router.push("/");
    return null;
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
              <div className="md:hidden w-11 h-11 rounded-2xl bg-white border border-primary-blue/10 flex items-center justify-center p-1.5 shrink-0 shadow-sm drop-shadow-[0_0_8px_rgba(14,165,233,0.15)]">
                <Image
                  src="/logo.png"
                  alt="Aether Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-xs font-bold text-primary-blue uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={12} className="animate-pulse" />
                  SISTEM PROGRESS KEMAMPUAN AETHER
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">
                  Skill Constellation Tree
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white border border-primary-blue/10 px-4 py-2 rounded-2xl shadow-sm">
              <span className="text-xs font-semibold text-slate-555">Jalur Karir Aktif:</span>
              <span className="text-sm font-bold text-primary-blue bg-primary-blue/10 px-3 py-1 rounded-xl border border-primary-blue/20">
                {careerGoal || "Direct Pathway"}
              </span>
            </div>
          </header>

          {/* Spacious SVG Skill Graph - Full Page Width */}
          <section className="w-full flex flex-col flex-1 min-h-[480px] md:min-h-[620px]">
            <SkillGraphCanvas
              parentSkills={parentSkills}
              selectedSkill={d.selectedSkill}
              setSelectedSkill={d.setSelectedSkill}
              fetchCareerProgress={fetchCareerProgress}
              careerGoal={careerGoal}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
