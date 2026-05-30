"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import GlassCard from "@/components/ui/GlassCard";
import { KeyRound, Mail, Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message;
      if (errorMsg === "Please verify your email first") {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        return;
      }
      setError(
        errorMsg || 
        "Gagal masuk. Silakan periksa kembali email dan kata sandi Anda."
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
            <h1 className="text-3xl font-black tracking-wider text-primary-blue font-outfit">
              ✦ AETHER GATEWAY ✦
            </h1>
            <p className="text-sm text-slate-600 font-bold tracking-wide mt-1">
              Where progress becomes measurable.
            </p>
          </div>

          {/* Error Banner */}
          {error ? (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center shadow-sm">
              {error}
            </div>
          ) : null}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <GlowInput
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              className="text-slate-800"
              icon={<Mail className="w-5 h-5" />}
            />

            <GlowInput
              label="Kata Sandi"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              className="text-slate-800"
              icon={<KeyRound className="w-5 h-5" />}
            />

            <div className="flex justify-end -mt-3 mb-2">
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-slate-500 hover:text-primary-blue transition-colors duration-200"
              >
                Lupa Password?
              </Link>
            </div>

            <NeonButton
              type="submit"
              loading={formLoading}
              className="w-full mt-2 text-sm font-bold"
            >
              Masuk Sesi
              <Sparkles size={16} />
            </NeonButton>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center text-xs text-slate-500 font-medium border-t border-slate-100 pt-6">
            Belum memiliki kode akses?{" "}
            <Link
              href="/register"
              className="text-primary-blue hover:text-sky-blue font-bold transition-colors duration-200"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
