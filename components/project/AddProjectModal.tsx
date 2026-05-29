"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import { FolderGit2 } from "lucide-react";

interface AddProjectModalProps {
  p: any;
}

export default function AddProjectModal({ p }: AddProjectModalProps) {
  return (
    <AnimatePresence>
      {p.showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => p.setShowAddModal(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg z-10 glass-panel p-6 border border-primary-blue/10 shadow-2xl relative bg-white"
          >
            <h3 className="text-lg font-bold text-slate-900 tracking-wide flex items-center gap-2 mb-6">
              <FolderGit2 size={20} className="text-primary-blue" />
              Hubungkan Proyek Baru
            </h3>

            <form onSubmit={p.createProject} className="flex flex-col gap-4">
              <GlowInput
                label="Nama / Judul Proyek"
                placeholder="E-Commerce Backend"
                value={p.title}
                onChange={(e) => p.setTitle(e.target.value)}
                required
              />
              <GlowInput
                label="Deskripsi Proyek"
                placeholder="Sistem backend microservices menggunakan NestJS dan PostgreSQL"
                value={p.description}
                onChange={(e) => p.setDescription(e.target.value)}
              />
              <GlowInput
                label="URL Git Repositori (Opsional)"
                placeholder="https://github.com/username/repository"
                value={p.repositoryUrl}
                onChange={(e) => p.setRepositoryUrl(e.target.value)}
              />
              
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => p.setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <NeonButton type="submit" loading={p.addLoading} className="text-xs">
                  Simpan Proyek
                </NeonButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
