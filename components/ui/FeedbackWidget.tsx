"use client";

import { useState } from "react";
import { MessageSquarePlus, Bug, MessageCircle, Send, X, CheckCircle2 } from "lucide-react";
import GlassCard from "./GlassCard";
import NeonButton from "./NeonButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { apiClient } from "@/lib/api-client";

export default function FeedbackWidget() {
  const { isAuthenticated, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'bug' | 'feedback'>('bug');
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      await apiClient.post("/mail/feedback", {
        type,
        message,
        username: user?.username || "Unknown",
        email: user?.email || "Unknown",
      });
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setSuccess(false);
          setMessage("");
        }, 500);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 md:top-auto md:bottom-6 md:right-6 z-[999]">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-primary-blue"
        }`}
        style={{
          boxShadow: isOpen 
            ? "0 0 20px rgba(239, 68, 68, 0.4)" 
            : "0 0 20px rgba(37, 99, 235, 0.4)"
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquarePlus size={24} />}
      </button>

      {/* Pop-up Form */}
      <div 
        className={`absolute top-14 md:top-auto md:bottom-16 right-0 w-85 sm:w-96 transition-all duration-300 origin-top-right md:origin-bottom-right ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-[-10px] md:translate-y-4 pointer-events-none"
        }`}
      >
        <GlassCard hoverGlow={false} className="p-5 shadow-2xl border border-slate-200/50 bg-white/95 backdrop-blur-xl">
          {success ? (
            <div className="flex flex-col items-center text-center p-6 space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-outfit font-bold text-xl text-slate-800">Terkirim!</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {type === 'bug' 
                  ? "Terima kasih! Teknisi kami akan segera meninjau laporan kendala ini." 
                  : "Terima kasih banyak atas saran Anda! Setiap masukan sangat berharga untuk membangun Aether Gateway menjadi lebih baik."}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="font-outfit font-bold text-lg text-primary-blue">Kirim Pesan</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Masukan Anda membantu kami berkembang.
                </p>
              </div>

              <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setType('bug')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-md transition-all ${
                    type === 'bug' 
                      ? "bg-white text-red-500 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Bug size={14} /> Bug / Error
                </button>
                <button
                  type="button"
                  onClick={() => setType('feedback')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-md transition-all ${
                    type === 'feedback' 
                      ? "bg-white text-primary-blue shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <MessageCircle size={14} /> Pesan Pribadi
                </button>
              </div>

              {error && (
                <div className="mb-3 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    type === 'bug' 
                      ? "Jelaskan error yang Anda alami..." 
                      : "Tuliskan saran atau pesan Anda..."
                  }
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary-blue/50 focus:ring-1 focus:ring-primary-blue/50 resize-none h-28"
                />
                <NeonButton 
                  type="submit" 
                  loading={loading} 
                  disabled={!message.trim()}
                  variant="primary" 
                  className="w-full py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Kirim {type === 'bug' ? 'Laporan' : 'Pesan'}
                </NeonButton>
              </form>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
