import { create } from "zustand";
import { apiClient, setAccessToken } from "@/lib/api-client";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  careerGoal: string | null;
  parentSkills: any[];
  isLoading: boolean;
  onboardingStep: string | null; // CLASSIFY | DISCOVERY | CAREER_SELECTION | SKILLS_GENERATION | DONE | null
  
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setOnboardingStep: (step: string | null) => void;
  setCareerGoal: (goal: string | null) => void;
  fetchCareerProgress: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  if (typeof window !== "undefined") {
    window.addEventListener("auth_session_expired", () => {
      set({ user: null, isAuthenticated: false, careerGoal: null, parentSkills: [] });
    });
  }

  return {
    user: null,
    isAuthenticated: false,
    careerGoal: null,
    parentSkills: [],
    isLoading: true,
    onboardingStep: null,

    setOnboardingStep: (step) => set({ onboardingStep: step }),
    setCareerGoal: (goal) => set({ careerGoal: goal }),

    initializeAuth: async () => {
      set({ isLoading: true });
      try {

        const profileRes = await apiClient.get("/users/me");
        const profile = profileRes.data;

        let onboardingStep = null;
        try {
          const statusRes = await apiClient.get("/skill-init/status");
          onboardingStep = statusRes.data.step;
        } catch (e) {
          console.error("Failed to fetch onboarding status", e);
        }

        set({
          user: profile,
          careerGoal: profile.careerGoal || null,
          isAuthenticated: true,
          onboardingStep,
        });

        await get().fetchCareerProgress();
      } catch (error) {
        console.error("Auth initialization failed", error);
        setAccessToken(null);
        set({ isAuthenticated: false, user: null });
      } finally {
        set({ isLoading: false });
      }
    },

    login: async (email, password) => {
      set({ isLoading: true });
      try {
        const res = await apiClient.post("/auth/login", { email, password });
        const accessToken = res?.data?.accessToken;
        if (!accessToken) {
          throw new Error("Login response missing accessToken");
        }

        setAccessToken(accessToken);
        
        const profileRes = await apiClient.get("/users/me");
        const profile = profileRes.data;

        let onboardingStep = null;
        try {
          const statusRes = await apiClient.get("/skill-init/status");
          onboardingStep = statusRes.data.step;
        } catch (e) {
          console.error(e);
        }

        set({
          user: profile,
          careerGoal: profile.careerGoal || null,
          isAuthenticated: true,
          onboardingStep,
        });

        await get().fetchCareerProgress();
        set({ isLoading: false });
        return res.data;
      } catch (error: any) {
        set({ isLoading: false });
        throw error;
      }
    },

    register: async (email, username, password) => {
      set({ isLoading: true });
      try {
        const res = await apiClient.post("/auth/register", {
          email,
          username,
          password,
        });
        set({ isLoading: false });
        return res.data;
      } catch (error: any) {
        set({ isLoading: false });
        throw error;
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await apiClient.post("/auth/logout");
      } catch (e) {
        console.error("Logout request failed", e);
      } finally {
        setAccessToken(null);
        set({
          user: null,
          isAuthenticated: false,
          careerGoal: null,
          parentSkills: [],
          onboardingStep: null,
          isLoading: false,
        });
      }
    },

    fetchCareerProgress: async () => {
      try {
        const treeRes = await apiClient.get("/skill-aggregator/tree");
        const treeData = treeRes.data;

        if (treeData && treeData.length > 0) {
          const progressRes = await apiClient.get("/skill-aggregator/progress");
          const progressData = progressRes.data;

          set({
            parentSkills: treeData,
            onboardingStep: get().careerGoal ? "DONE" : get().onboardingStep,
          });
        } else {
          set({ parentSkills: [], careerGoal: null });
        }
      } catch (error) {
        console.error("Failed to fetch career progress", error);
      }
    },
  };
});
