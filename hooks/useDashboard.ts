import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useDashboardStore } from "@/stores/useDashboardStore";

export function useDashboard() {
  const {
    parentSkills,
    fetchCareerProgress,
    onboardingStep,
    setOnboardingStep,
  } = useAuthStore();

  const {
    currentQuestion,
    currentDimension,
    careerOptions,
    onboardingMessage,
    setDashboardState,
    clearDashboardState,
  } = useDashboardStore();

  const [initInput, setInitInput] = useState("");
  const [initLoading, setInitLoading] = useState(false);
  const [onboardingQuestionIndex, setOnboardingQuestionIndex] = useState(1);

  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  useEffect(() => {
    if (parentSkills && parentSkills.length > 0 && !selectedSkill) {
      setSelectedSkill(parentSkills[0]);
    }
  }, [parentSkills, selectedSkill]);

  const handleStartOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setInitLoading(true);
    try {
      const res = await apiClient.post("/skill-init/start", {
        userInput: initInput,
      });
      const { step, message, question, dimension, careerOptions: options } = res.data;

      setOnboardingStep(step);
      setDashboardState({
        onboardingMessage: message || "",
        currentQuestion: question || null,
        currentDimension: dimension || null,
        careerOptions: options || [],
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memulai inisialisasi skill");
    } finally {
      setInitLoading(false);
    }
  };

  const handleAnswerDiscovery = async (answerValue: number) => {
    setInitLoading(true);
    try {
      const res = await apiClient.post("/skill-init/answer", {
        answer: answerValue,
      });
      const { step, message, question, dimension, careerOptions: options } = res.data;


      setOnboardingStep(step);
      setDashboardState({
        onboardingMessage: message || "",
        careerOptions: options || [],
      });
      
      if (question) {
        setDashboardState({ currentQuestion: question });
        setOnboardingQuestionIndex((prev) => prev + 1);
      } else {
        setDashboardState({ currentQuestion: null });
      }
      if (dimension) setDashboardState({ currentDimension: dimension });
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal merekam jawaban");
    } finally {
      setInitLoading(false);
    }
  };

  const handleSelectCareer = async (careerName: string) => {
    setInitLoading(true);
    try {
      const res = await apiClient.post("/skill-init/select-career", {
        careerName,
      });
      setOnboardingStep("DONE");
      setDashboardState({ onboardingMessage: res.data.message });
      
      useAuthStore.getState().setCareerGoal(careerName);

      await fetchCareerProgress();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menyelesaikan karir");
    } finally {
      setInitLoading(false);
    }
  };

  const handleResetSession = async () => {
    if (confirm("Reset seluruh progress inisialisasi skill saat ini?")) {
      setInitLoading(true);
      try {
        await apiClient.delete("/skill-init/reset");
        setOnboardingStep(null);
        setInitInput("");
        clearDashboardState();
        setOnboardingQuestionIndex(1);
      } catch (err) {
      } finally {
        setInitLoading(false);
      }
    }
  };

  return {
    initInput,
    setInitInput,
    initLoading,
    currentQuestion,
    currentDimension,
    careerOptions,
    onboardingMessage,
    onboardingQuestionIndex,

    handleStartOnboarding,
    handleAnswerDiscovery,
    handleSelectCareer,
    handleResetSession,

    selectedSkill,
    setSelectedSkill,
  };
}
