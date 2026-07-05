import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/useAuthStore";

export function useProjects() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOrchModal, setShowOrchModal] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [orchRepoUrl, setOrchRepoUrl] = useState("");
  const [orchCommitHash, setOrchCommitHash] = useState("");
  const [orchModeHint, setOrchModeHint] = useState<"INIT" | "COMMIT">("INIT");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [orchLoading, setOrchLoading] = useState(false);
  const [orchResult, setOrchResult] = useState<any | null>(null);
  const [latestScanResult, setLatestScanResult] = useState<any | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Gagal mengambil proyek", err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAddLoading(true);
    try {
      const res = await apiClient.post("/projects", {
        title,
        description,
        repositoryUrl,
        reportContent,
      });
      setProjects((prev) => [res.data, ...prev]);
      setShowAddModal(false);
      setTitle("");
      setDescription("");
      setRepositoryUrl("");
      setReportContent("");
    } catch (err: any) {
      alert("Gagal menambahkan proyek: " + (err.response?.data?.message || err.message));
    } finally {
      setAddLoading(false);
    }
  };

  const orchestrateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOrchModal) return;
    setOrchLoading(true);
    setOrchResult(null);

    const formData = new FormData();
    if (orchRepoUrl) formData.append("repositoryUrl", orchRepoUrl);
    if (orchCommitHash) formData.append("commitHash", orchCommitHash);
    formData.append("modeHint", orchModeHint);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const res = await apiClient.post(
        `/projects/${showOrchModal.id}/orchestrate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOrchResult(res.data);
      setLatestScanResult(res.data);
      useAuthStore.getState().fetchCareerProgress();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
        "Gagal menjalankan orkestrasi kode proyek"
      );
    } finally {
      setOrchLoading(false);
    }
  };

  const openOrchestrate = (project: any) => {
    setShowOrchModal(project);
    setOrchRepoUrl(project.repositoryUrl || "");
    setOrchResult(null);
    setSelectedFile(null);
    setOrchCommitHash("");
    setOrchModeHint(project.latestAnalysis ? "COMMIT" : "INIT");
  };

  const closeOrchestrate = () => {
    setShowOrchModal(null);
    setOrchResult(null);
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;
    try {
      await apiClient.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setLatestScanResult(null);
    } catch (err: any) {
      alert("Gagal menghapus proyek: " + (err.response?.data?.message || err.message));
    }
  };

  return {
    projects,
    loading,
    showAddModal,
    setShowAddModal,
    showOrchModal,
    setShowOrchModal,

    title,
    setTitle,
    description,
    setDescription,
    repositoryUrl,
    setRepositoryUrl,
    addLoading,
    createProject,

    orchRepoUrl,
    setOrchRepoUrl,
    orchCommitHash,
    setOrchCommitHash,
    orchModeHint,
    setOrchModeHint,
    selectedFile,
    setSelectedFile,
    orchLoading,
    orchResult,
    latestScanResult,
    setLatestScanResult,
    orchestrateProject,
    openOrchestrate,
    closeOrchestrate,
    deleteProject,
  };
}
