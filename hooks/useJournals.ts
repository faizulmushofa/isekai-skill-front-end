import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/useAuthStore";

export function useJournals() {
  const { isAuthenticated } = useAuthStore();
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<any | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [reloadLoading, setReloadLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchJournals();
    }
  }, [isAuthenticated]);

  const selectJournal = async (journal: any) => {
    if (!journal) {
      setSelectedJournal(null);
      return;
    }
    setSelectedJournal(journal);
    try {
      const res = await apiClient.get(`/journals/${journal.id}`);
      setSelectedJournal(res.data);
      useAuthStore.getState().fetchCareerProgress();
    } catch (err: any) {
      console.error("Gagal mengambil detail jurnal:", err);
    }
  };

  const reloadSelectedJournal = async () => {
    if (!selectedJournal) return;
    setReloadLoading(true);
    try {
      const res = await apiClient.get(`/journals/${selectedJournal.id}`);
      setSelectedJournal(res.data);
      useAuthStore.getState().fetchCareerProgress();
    } catch (err: any) {
      console.error("Gagal memuat ulang detail jurnal:", err);
    } finally {
      setReloadLoading(false);
    }
  };

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/journals");
      setJournals(res.data);
      if (res.data.length > 0 && !selectedJournal) {
        selectJournal(res.data[0]);
      }
    } catch (err: any) {
      alert("Gagal mengambil daftar jurnal: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const createJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setAddLoading(true);
    try {
      const res = await apiClient.post("/journals", { title, content });
      setJournals((prev) => [res.data, ...prev]);
      // Fetch full journal detail (with skillEvents already in DB after synchronous pipeline)
      const detailRes = await apiClient.get(`/journals/${res.data.id}`);
      setSelectedJournal(detailRes.data);
      setIsCreating(false);
      setTitle("");
      setContent("");
      useAuthStore.getState().fetchCareerProgress();
    } catch (err: any) {
      alert("Gagal menambahkan jurnal: " + (err.response?.data?.message || err.message));
    } finally {
      setAddLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async (file: File) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiClient.post("/journals/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setJournals((prev) => [res.data, ...prev]);
      selectJournal(res.data);
      alert("File jurnal berhasil diupload & dianalisis oleh AI!");
      useAuthStore.getState().fetchCareerProgress();
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Gagal mengunggah file. Pastikan tipe file TXT atau PDF."
      );
    } finally {
      setUploadLoading(false);
    }
  };

  const deleteJournal = async (journalId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jurnal ini?")) return;
    try {
      await apiClient.delete(`/journals/${journalId}`);
      setJournals((prev) => {
        const filtered = prev.filter((j) => j.id !== journalId);
        if (selectedJournal?.id === journalId) {
          selectJournal(filtered.length > 0 ? filtered[0] : null);
        }
        return filtered;
      });
    } catch (err: any) {
      alert("Gagal menghapus jurnal: " + (err.response?.data?.message || err.message));
    }
  };

  return {
    journals,
    loading,
    selectedJournal,
    setSelectedJournal: selectJournal,
    
    isCreating,
    setIsCreating,
    title,
    setTitle,
    content,
    setContent,
    addLoading,
    createJournal,

    dragActive,
    uploadLoading,
    handleDrag,
    handleDrop,
    handleFileSelect,
    deleteJournal,
    reloadSelectedJournal,
    reloadLoading,
  };
}
