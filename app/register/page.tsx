"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import GlassCard from "@/components/ui/GlassCard";
import { Mail, User, KeyRound, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuthStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setFormLoading(true);

    try {
      await register(email, username, password);
      setSuccess("Pendaftaran berhasil! Mengarahkan ke verifikasi email...");
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Gagal mendaftar. Pastikan email belum digunakan sebelumnya."
      );
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-midnight">
      {/* Visual celestial overlays in soft blue */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-blue/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-soft-cyan/5 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-md z-10">
        <GlassCard hoverGlow={false} className="border border-primary-blue/10 p-8 shadow-xl relative bg-white rounded-2xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-8 text-center">
            <Image
              src="/logo.png"
              alt="Aether Logo"
              width={80}
              height={80}
              priority
              className="mb-3 shrink-0 object-contain drop-shadow-[0_0_20px_rgba(14,165,233,0.3)] filter contrast-110"
            />
            <h1 className="text-3xl font-black tracking-wider text-primary-blue font-outfit">
              ✦ CREATE IDENTITY ✦
            </h1>
            <p className="text-sm text-slate-600 font-bold tracking-wide mt-1">
              Mulai ukur dan kembangkan keahlian Anda secara measurable.
            </p>
          </div>

          {/* Success Banner */}
          {success ? (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center shadow-sm animate-pulse">
              {success}
            </div>
          ) : null}

          {/* Error Banner */}
          {error ? (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center shadow-sm">
              {error}
            </div>
          ) : null}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <GlowInput
              label="Nama Pengguna"
              placeholder="namaunik"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              id="username"
              className="text-slate-850"
              icon={<User className="w-5 h-5" />}
            />

            <GlowInput
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              className="text-slate-850"
              icon={<Mail className="w-5 h-5" />}
            />

            <GlowInput
              label="Kata Sandi"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              id="password"
              className="text-slate-850"
              icon={<KeyRound className="w-5 h-5" />}
            />

            {/* Confirm Password Field (Appears only after typing password) */}
            <div className={`transition-all duration-300 overflow-hidden ${password.length > 0 ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
              <GlowInput
                label="Konfirmasi Kata Sandi"
                type="password"
                placeholder="Ketik ulang kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={password.length > 0}
                minLength={6}
                id="confirmPassword"
                className="text-slate-850"
                icon={<KeyRound className="w-5 h-5" />}
              />
            </div>

            <NeonButton
              type="submit"
              loading={formLoading}
              className="w-full mt-2 text-sm font-bold"
            >
              Daftarkan Diri
              <Sparkles size={16} />
            </NeonButton>
          </form>

          {/* Navigation Links */}
          <div className="mt-8 text-center text-xs text-slate-500 font-medium border-t border-slate-100 pt-6">
            Sudah terdaftar?{" "}
            <Link
              href="/login"
              className="text-primary-blue hover:text-sky-blue font-bold transition-colors duration-200"
            >
              Masuk Gateway
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
