import { create } from "zustand";
import { apiClient } from "@/lib/api-client";

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
  options?: Array<{ text: string; value: string }>;
  quizData?: any;
}

interface QuizState {
  messages: ChatMessage[];
  quizState: "IDLE" | "DECISION_REQUIRED" | "QUESTION_DELIVERED" | "QUIZ_FINISHED" | "EXIT";
  topic: string | null;
  attemptId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: { id: string; questionText: string } | null;
  isLoading: boolean;

  startQuiz: (topic: string) => Promise<void>;
  selectMode: (mode: "1" | "2") => Promise<void>;
  submitAnswer: (answerText: string) => Promise<void>;
  resetQuiz: () => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  messages: [
    {
      id: "welcome",
      sender: "ai",
      text: "Selamat datang di Arena Tantangan Kemampuan Aether. Ketik topik atau materi apa yang ingin Anda pelajari atau uji hari ini (contoh: TypeScript, Backend Security, Database Migrations).",
      timestamp: new Date(),
    },
  ],
  quizState: "IDLE",
  topic: null,
  attemptId: null,
  currentQuestionIndex: 0,
  totalQuestions: 0,
  currentQuestion: null,
  isLoading: false,

  addMessage: (msg) => {
    const newMessage: ChatMessage = {
      ...msg,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
  },

  startQuiz: async (topic) => {
    set({ isLoading: true, topic });
    get().addMessage({ sender: "user", text: topic });

    try {
      const res = await apiClient.post("/quiz/start", { topic });
      const { state, message, data } = res.data;

      set({
        quizState: state,
        isLoading: false,
      });

      get().addMessage({
        sender: "ai",
        text: message,
        options: [
          { text: "1. Cerita Belajar (Story Mode)", value: "1" },
          { text: "2. Ujian Adaptif 7 Soal (Scoring Mode)", value: "2" },
        ],
        quizData: data,
      });
    } catch (err: any) {
      set({ isLoading: false });
      get().addMessage({
        sender: "ai",
        text: `Maaf, gagal memulai kuis: ${err.response?.data?.message || err.message}`,
      });
    }
  },

  selectMode: async (mode) => {
    const topic = get().topic;
    if (!topic) return;

    set({ isLoading: true });
    
    const modeLabel = mode === "1" ? "Story Mode" : "Scoring Mode";
    get().addMessage({ sender: "user", text: modeLabel });

    try {
      const res = await apiClient.post("/quiz/mode", { mode, topic });
      const { state, message, data } = res.data;

      if (state === "EXIT") {
        set({
          quizState: "EXIT",
          isLoading: false,
        });
        get().addMessage({
          sender: "ai",
          text: message,
        });
      } else if (state === "QUESTION_DELIVERED") {
        set({
          quizState: "QUESTION_DELIVERED",
          attemptId: data.attemptId,
          currentQuestionIndex: data.currentQuestionIndex,
          totalQuestions: data.totalQuestions,
          currentQuestion: data.question,
          isLoading: false,
        });

        get().addMessage({
          sender: "ai",
          text: `${message}\n\n**Soal ${data.currentQuestionIndex + 1} dari ${data.totalQuestions}**:\n${data.question.questionText}`,
        });
      }
    } catch (err: any) {
      set({ isLoading: false });
      get().addMessage({
        sender: "ai",
        text: `Maaf, gagal memproses pilihan mode: ${err.response?.data?.message || err.message}`,
      });
    }
  },

  submitAnswer: async (answerText) => {
    if (get().quizState !== "QUESTION_DELIVERED") return;

    set({ isLoading: true });
    get().addMessage({ sender: "user", text: answerText });

    try {
      const res = await apiClient.post("/quiz/answer", { answerText });
      const { state, message, data } = res.data;

      if (state === "QUESTION_DELIVERED") {
        set({
          currentQuestionIndex: data.currentQuestionIndex,
          currentQuestion: data.question,
          isLoading: false,
        });

        get().addMessage({
          sender: "ai",
          text: `Jawaban Anda berhasil direkam!\n\n**Soal ${data.currentQuestionIndex + 1} dari ${data.totalQuestions}**:\n${data.question.questionText}`,
        });
      } else if (state === "QUIZ_FINISHED") {
        set({
          quizState: "QUIZ_FINISHED",
          attemptId: null,
          currentQuestionIndex: 0,
          currentQuestion: null,
          isLoading: false,
        });

        const breakdownStr = data.skillBreakdown
          ?.map((sb: any) => `- **${sb.skillNode}**: +${sb.evidenceScore.toFixed(0)} XP`)
          .join("\n");

        get().addMessage({
          sender: "ai",
          text: `🎉 **Kuis Selesai!** Seluruh jawaban Anda telah dievaluasi serentak oleh AI.\n\n🏆 **Skor Akhir:** ${data.score}/100\n\n📈 **Progres Kemampuan Baru:**\n${breakdownStr || "Tidak ada progres terdeteksi."}\n\nKetik topik baru jika Anda ingin kembali menantang diri Anda!`,
        });
      }
    } catch (err: any) {
      set({ isLoading: false });
      get().addMessage({
        sender: "ai",
        text: `Gagal mengirimkan jawaban: ${err.response?.data?.message || err.message}`,
      });
    }
  },

  resetQuiz: () => {
    set({
      messages: [
        {
          id: "welcome",
          sender: "ai",
          text: "Selamat datang kembali di Arena Tantangan Kemampuan Aether. Silakan ketik topik keahlian baru yang ingin Anda ulas atau uji.",
          timestamp: new Date(),
        },
      ],
      quizState: "IDLE",
      topic: null,
      attemptId: null,
      currentQuestionIndex: 0,
      totalQuestions: 0,
      currentQuestion: null,
      isLoading: false,
    });
  },
}));
