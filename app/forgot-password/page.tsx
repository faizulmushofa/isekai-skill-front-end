"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import GlowInput from "@/components/ui/GlowInput";
import NeonButton from "@/components/ui/NeonButton";
import GlassCard from "@/components/ui/GlassCard";
import { KeyRound, Mail, Sparkles, Hash, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, verifyResetOtp, resetPassword, isAuthenticated } = useAuthStore();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Gagal memproses permintaan. Pastikan email valid."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      await verifyResetOtp(email, otpCode);
      setStep(3);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "OTP tidak valid atau telah kedaluwarsa."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setFormLoading(true);

    try {
      await resetPassword(email, otpCode, newPassword, confirmPassword);
      setStep(4);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Gagal mereset password. Silakan coba lagi."
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
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-6">
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>
        <GlassCard hoverGlow={false} className="border border-primary-blue/10 p-8 shadow-xl relative bg-white rounded-2xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-8 text-center">
            <h1 className="text-2xl font-black tracking-wider text-primary-blue font-outfit">
              {step === 4 ? "PASSWORD BERHASIL DIUBAH" : "LUPA PASSWORD"}
            </h1>
            <p className="text-sm text-slate-600 font-bold tracking-wide mt-1">
              {step === 1 && "Masukkan email untuk menerima kode OTP"}
              {step === 2 && "Masukkan kode OTP yang dikirim ke email Anda"}
              {step === 3 && "Buat password baru untuk akun Anda"}
              {step === 4 && "Silakan masuk menggunakan password baru Anda"}
            </p>
          </div>

          {/* Error Banner */}
          {error ? (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center shadow-sm">
              {error}
            </div>
          ) : null}

          {/* Form Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-5">
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
              <NeonButton
                type="submit"
                loading={formLoading}
                className="w-full mt-2 text-sm font-bold"
              >
                Kirim Kode OTP
                <Sparkles size={16} />
              </NeonButton>
            </form>
          )}

          {/* Form Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
              <div className="text-xs font-medium text-slate-500 mb-2">
                Kode OTP telah dikirim ke <span className="text-primary-blue font-bold">{email}</span>
              </div>
              <GlowInput
                label="Kode OTP (6 digit)"
                type="text"
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                id="otpCode"
                maxLength={6}
                className="text-slate-850 tracking-widest font-mono text-center"
                icon={<Hash className="w-5 h-5" />}
              />
              <NeonButton
                type="submit"
                loading={formLoading}
                className="w-full mt-2 text-sm font-bold"
              >
                Verifikasi OTP
                <Sparkles size={16} />
              </NeonButton>
              <div className="mt-4 text-center">
                 <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                 >
                   Ganti Alamat Email
                 </button>
              </div>
            </form>
          )}

          {/* Form Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">
              <GlowInput
                label="Kata Sandi Baru"
                type="password"
                placeholder="Minimal 6 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                id="newPassword"
                className="text-slate-850"
                icon={<KeyRound className="w-5 h-5" />}
              />
              <GlowInput
                label="Konfirmasi Kata Sandi"
                type="password"
                placeholder="Ulangi kata sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                id="confirmPassword"
                className="text-slate-850"
                icon={<KeyRound className="w-5 h-5" />}
              />
              <NeonButton
                type="submit"
                loading={formLoading}
                className="w-full mt-2 text-sm font-bold"
              >
                Simpan Password Baru
                <Sparkles size={16} />
              </NeonButton>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <Link href="/login" className="w-full">
                <NeonButton className="w-full text-sm font-bold">
                  Kembali ke Halaman Login
                </NeonButton>
              </Link>
            </div>
          )}

        </GlassCard>
      </div>
    </main>
  );
}
