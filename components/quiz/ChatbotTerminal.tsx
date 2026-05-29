"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowInput from "@/components/ui/GlowInput";
import { Terminal, Bot, Send } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

interface ChatbotTerminalProps {
  messages: any[];
  quizState: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  quizStoreLoading: boolean;
  selectMode: (mode: "1" | "2") => void;
  handleSend: (e: React.FormEvent) => void;
  inputVal: string;
  setInputVal: (val: string) => void;
}

export default function ChatbotTerminal({
  messages,
  quizState,
  currentQuestionIndex,
  totalQuestions,
  quizStoreLoading,
  selectMode,
  handleSend,
  inputVal,
  setInputVal,
}: ChatbotTerminalProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const userInitial = user?.username?.charAt(0).toUpperCase() ?? "A";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const parseBold = (str: string) => {
    return str.split(/\*\*(.*?)\*\*/g).map((part, i) => {
      return i % 2 === 1 ? <strong key={i}>{part}</strong> : part;
    });
  };

  const formatMessageText = (text: string, isAi = true) => {
    return text.split("\n").map((line, index) => {
      const textColor = isAi ? "text-slate-700" : "text-white";

      if (line.startsWith("- ")) {
        return (
          <li key={index} className={`ml-4 list-disc ${textColor} my-1 font-medium`}>
            {parseBold(line.substring(2))}
          </li>
        );
      }
      return (
        <p key={index} className={`my-1.5 leading-relaxed ${textColor} font-medium`}>
          {parseBold(line)}
        </p>
      );
    });
  };

  return (
    <div className="p-0 border border-slate-200 flex-1 flex flex-col overflow-hidden h-full min-h-0 bg-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.08)] relative rounded-3xl">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-primary-blue shadow-sm">
            <Terminal size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-wider font-outfit uppercase">
              AETHER QUIZ HOST CHATBOT
            </h3>
            <p className="text-[9px] text-slate-500 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online • AI-Active Engine
            </p>
          </div>
        </div>

        {quizState === "QUESTION_DELIVERED" && (
          <span className="text-[10px] font-bold text-primary-blue bg-primary-blue/10 px-2.5 py-1 rounded-full border border-primary-blue/10">
            Soal {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        )}
      </div>

      {/* Message History */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-5 bg-slate-50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col gap-3 max-w-[85%] ${isAi ? "self-start items-start" : "self-end items-end"}`}
              >
                <div className={`flex items-start gap-3 ${isAi ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-transparent text-white font-extrabold shadow-[0_4px_15px_rgba(37,99,235,0.2)] ${
                    isAi
                      ? "bg-slate-100 border-slate-200 text-primary-blue shadow-none"
                      : "bg-gradient-to-r from-primary-blue via-sky-blue to-soft-cyan"
                  }`}>
                    {isAi ? <Bot size={16} /> : <span className="text-sm select-none">{userInitial}</span>}
                  </div>

                  <div className={`px-4.5 py-3 rounded-3xl text-sm leading-relaxed border relative w-full ${
                      isAi
                        ? "bg-white border border-slate-200 text-slate-900 shadow-sm"
                        : "bg-gradient-to-r from-primary-blue via-sky-blue to-soft-cyan border border-transparent text-white shadow-[0_4px_15px_rgba(37,99,235,0.2)]"
                    }`}>
                    {formatMessageText(msg.text, isAi)}
                  </div>
                </div>

                {isAi && msg.options && (
                  <div className="grid gap-3 w-full text-left">
                    {msg.options.map((opt: any) => (
                      <button
                        key={opt.value}
                        onClick={() => selectMode(opt.value)}
                        disabled={quizStoreLoading}
                        className="w-full px-4 py-3 rounded-3xl bg-slate-100 border border-slate-200 text-slate-900 text-sm font-semibold text-left shadow-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-blue hover:via-sky-blue hover:to-soft-cyan hover:text-white hover:border-transparent"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {quizStoreLoading && (
          <div className="flex gap-3 max-w-[85%] self-start animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-primary-blue">
              <Bot size={16} />
            </div>
            <div className="px-4.5 py-3 rounded-3xl bg-slate-100 border border-slate-200 text-slate-500 text-xs flex items-center gap-1.5 font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Form Input Bar */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
        <GlowInput
          className="flex-1"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={quizStoreLoading}
          placeholder={
            quizState === "IDLE" 
              ? "Ketik topik keahlian untuk memulai..." 
              : quizState === "DECISION_REQUIRED"
              ? "Ketik 1 atau 2..."
              : "Ketik jawaban teoritis / analitis Anda..."
          }
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || quizStoreLoading}
          className="w-12 h-12 rounded-xl bg-primary-blue hover:bg-sky-blue disabled:bg-slate-100 border border-transparent disabled:border-slate-200 text-white disabled:text-slate-400 flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
