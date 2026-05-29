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

  useEffect(() => {
    if (isAuthenticated) {
      fetchJournals();
    }
  }, [isAuthenticated]);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/journals");
      setJournals(res.data);
      if (res.data.length > 0 && !selectedJournal) {
        setSelectedJournal(res.data[0]);
      }
    } catch (err: any) {
      alert("Gagal memproses file: " + (err.response?.data?.message || err.message));
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
      setSelectedJournal(res.data);
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
      setSelectedJournal(res.data);
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

  return {
    journals,
    loading,
    selectedJournal,
    setSelectedJournal,
    
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
  };
}
