"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import GlowInput from "@/components/ui/GlowInput";
import { ShieldCheck, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { apiClient } from "@/lib/api-client";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams.get("email") || "";
  
  const [email, setEmail] = useState(emailQuery);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await apiClient.post("/auth/verify-otp", { email, otpCode });
      setSuccess("Email berhasil diverifikasi! Mengalihkan ke login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Verifikasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Email tidak boleh kosong");
      return;
    }
    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      await apiClient.post("/auth/resend-otp", { email });
      setSuccess("OTP baru telah dikirim ke email Anda!");
      setCountdown(60);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengirim ulang OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <GlassCard hoverGlow={false} className="border border-primary-blue/10 p-8 shadow-xl relative bg-white rounded-2xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-8 text-center">
            <ShieldCheck className="text-primary-blue w-16 h-16 mb-2" />
            <h1 className="text-3xl font-black tracking-wider text-primary-blue font-outfit">
              VERIFIKASI EMAIL
            </h1>
            <p className="text-sm text-slate-600 font-bold tracking-wide mt-1">
              Masukkan 6 digit kode OTP yang kami kirim ke email Anda.
            </p>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col gap-5">
            <GlowInput
              id="email"
              type="email"
              label="Alamat Email"
              icon={<Mail size={18} />}
              placeholder="nama@domain.com"
              value={email}
              onChange={() => {}} // Email cannot be changed here
              required
              readOnly
            />
            
            <GlowInput
              id="otp"
              type="text"
              label="Kode OTP (6 Digit)"
              icon={<ShieldCheck size={18} />}
              placeholder="123456"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
              maxLength={6}
            />

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 font-medium">
                {error}
              </div>
            )}
            
            {success && (
              <div className="text-green-600 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20 font-medium">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <NeonButton type="submit" disabled={loading} variant="primary" className="w-full flex items-center justify-center gap-2">
                {loading ? "Memverifikasi..." : "Verifikasi Sekarang"} <ArrowRight size={18} />
              </NeonButton>
              
              <NeonButton 
                type="button" 
                onClick={handleResend} 
                disabled={resendLoading || countdown > 0} 
                variant="secondary" 
                className="w-full flex items-center justify-center gap-2 text-sm"
              >
                {resendLoading ? (
                  "Mengirim..."
                ) : countdown > 0 ? (
                  `Tunggu ${countdown}s untuk mengirim ulang`
                ) : (
                  <>
                    <RefreshCw size={16} /> Kirim Ulang OTP
                  </>
                )}
              </NeonButton>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 font-medium">
            Kembali ke{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-primary-blue hover:text-sky-blue cursor-pointer transition-colors font-bold"
            >
              Halaman Login
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
