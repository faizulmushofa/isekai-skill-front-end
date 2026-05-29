"use client";

import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Play } from "lucide-react";

interface TopicsPanelProps {
  parentSkills: any[];
  quizState: string;
  quizStoreLoading: boolean;
  handleStartWithTopic: (topicName: string) => void;
}

export default function TopicsPanel({
  parentSkills,
  quizState,
  quizStoreLoading,
  handleStartWithTopic,
}: TopicsPanelProps) {
  return (
    <GlassCard className="p-5 border border-primary-blue/10 bg-white shadow-sm flex flex-col gap-4 flex-1">
      <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-100 pb-2">
        Pilih Topik Keahlian
      </h3>
      
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] pr-1">
        {parentSkills.length > 0 ? (
          parentSkills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => handleStartWithTopic(skill.name)}
              disabled={quizState !== "IDLE" || quizStoreLoading}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 hover:border-primary-blue/30 hover:bg-primary-blue/5 text-left transition-all duration-300 flex items-center justify-between group disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="text-xs font-bold text-slate-700 group-hover:text-primary-blue truncate max-w-[120px]">
                {skill.name}
              </span>
              <Play size={12} className="text-slate-400 group-hover:text-primary-blue shrink-0 ml-2" />
            </button>
          ))
        ) : (
          <div className="text-[10px] text-slate-500 border border-dashed border-slate-200 rounded-xl p-4 text-center">
            Selesaikan inisialisasi karir di dashboard terlebih dahulu.
          </div>
        )}
      </div>

      {/* Tips Widget */}
      <div className="mt-auto p-4 rounded-xl bg-slate-50 border border-slate-150 text-[10px] text-slate-500 leading-relaxed">
        💡 **Tips**: Gunakan **Ujian Adaptif (Scoring Mode)** untuk menguji pemahaman teori, analisis, dan studi kasus guna mendapatkan XP tingkat keahlian permanen di sistem Aether!
      </div>
    </GlassCard>
  );
}
