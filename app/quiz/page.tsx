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
  } = useQuizStore();

  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

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

          {/* Full-width Immersive Conversational GPT Chatbot Terminal */}
          <section className="flex-1 min-h-0 w-full flex flex-col">
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
        </div>
      </main>
    </div>
  );
}
