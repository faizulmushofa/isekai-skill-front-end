import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardState {
  currentQuestion: string | null;
  currentDimension: string | null;
  careerOptions: any[];
  onboardingMessage: string;

  setDashboardState: (state: Partial<DashboardState>) => void;
  clearDashboardState: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      currentQuestion: null,
      currentDimension: null,
      careerOptions: [],
      onboardingMessage: "",

      setDashboardState: (state) => set((prev) => ({ ...prev, ...state })),
      clearDashboardState: () =>
        set({
          currentQuestion: null,
          currentDimension: null,
          careerOptions: [],
          onboardingMessage: "",
        }),
    }),
    {
      name: "aether_dashboard_state",
    }
  )
);
