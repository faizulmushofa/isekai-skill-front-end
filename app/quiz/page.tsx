"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuizStore } from "@/stores/useQuizStore";
import Sidebar from "@/components/ui/Sidebar";
import ChatbotTerminal from "@/components/quiz/ChatbotTerminal";
import { Sword, RotateCcw } from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, initializeAuth, parentSkills } = useAuthStore();
  const {
    messages,
    quizState,
    currentQuestionIndex,
    totalQuestions,
    isLoading: quizStoreLoading,
    startQuiz,
    selectMode,
    submitAnswer,
    resetQuiz,
    history,
    fetchHistory,
  } = useQuizStore();

  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHistory();
    }
  }, [isAuthenticated, fetchHistory]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || quizStoreLoading) return;

    const value = inputVal.trim();
    setInputVal("");

    if (quizState === "IDLE") {
      startQuiz(value);
    } else if (quizState === "DECISION_REQUIRED") {
      if (value === "1" || value.toLowerCase().includes("cerita") || value.toLowerCase().includes("story")) {
        selectMode("1");
      } else if (value === "2" || value.toLowerCase().includes("uji") || value.toLowerCase().includes("scoring")) {
        selectMode("2");
      } else {
        useQuizStore.getState().addMessage({
          sender: "ai",
          text: "Pilihan tidak valid. Silakan balas **1** untuk Cerita Belajar, atau **2** untuk Ujian Adaptif.",
        });
      }
    } else if (quizState === "QUESTION_DELIVERED") {
      submitAnswer(value);
    }
  };

  const handleStartWithTopic = (topicName: string) => {
    startQuiz(topicName);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 relative">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 pt-4 pb-28 md:px-8 md:py-8 flex flex-col z-10 md:h-full md:overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col gap-4">
          {/* Header */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:mt-6">
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
                <span className="text-xs font-bold text-sky-blue uppercase tracking-widest flex items-center gap-1.5">
                  <Sword size={12} />
                  ARENA TANTANGAN KEMAMPUAN AI
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">
                  Quiz Arena
                </h1>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="p-2 text-slate-600 hover:text-primary-blue rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 flex items-center gap-1.5 text-xs font-bold shadow-sm"
            >
              <RotateCcw size={14} />
              Mulai Ulang Chat
            </button>
          </header>

          {/* Main Grid Layout for Chat & History */}
          <div className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 flex flex-col min-h-0">
              <ChatbotTerminal
                messages={messages}
                quizState={quizState}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                quizStoreLoading={quizStoreLoading}
                selectMode={selectMode}
                handleSend={handleSend}
                inputVal={inputVal}
                setInputVal={setInputVal}
              />
            </section>

            {/* Quiz History Sidebar */}
            <aside className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-4 shadow-sm h-[400px] lg:h-auto overflow-hidden">
              <div className="flex flex-col gap-1 shrink-0">
                <h2 className="text-lg font-black text-slate-800 font-outfit">
                  Riwayat Ujian
                </h2>
                <p className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                  Hasil Uji Kognitif
                </p>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-0">
                {history.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-xs text-slate-400 font-semibold">Belum ada riwayat ujian.</span>
                  </div>
                ) : (
                  history.map((attempt: any) => (
                    <div
                      key={attempt.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex flex-col gap-2 shadow-sm transition hover:border-slate-300"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-extrabold text-slate-750 font-outfit leading-snug">
                            {attempt.quiz?.title || "Ujian Kognitif"}
                          </span>
                          <span className="text-[10px] font-bold text-slate-650">
                            {new Date(attempt.createdAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                        <div className="px-2 py-1 rounded-xl bg-primary-blue/15 border border-primary-blue/30 text-primary-blue text-xs font-black shadow-sm shrink-0">
                          {attempt.score ?? 0}/100
                        </div>
                      </div>

                      {attempt.skillEvents && attempt.skillEvents.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-250/30">
                          {attempt.skillEvents.map((se: any, idx: number) => (
                            <div
                              key={idx}
                              className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-150 text-emerald-700 text-[10px] font-extrabold flex items-center gap-1 shadow-sm"
                            >
                              <span>{se.skill?.name}</span>
                              <span className="text-emerald-500">+{se.rawScore.toFixed(0)} XP</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
