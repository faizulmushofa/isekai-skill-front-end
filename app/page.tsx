"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import NeonButton from "@/components/ui/NeonButton";
import { 
  Sparkles, 
  Brain, 
  Code, 
  Network, 
  Compass, 
  ChevronRight, 
  Terminal, 
  Layers, 
  GitBranch, 
  Award, 
  Workflow, 
  Check, 
  ArrowRight,
  UserCheck
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"journal" | "project" | "quiz">("journal");
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Handle auto-redirect if already logged in
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  // Cycle through terminal mockup animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin" />
        <p className="text-slate-500 font-semibold tracking-wide animate-pulse">
          Menginisialisasi Aether Gateway...
        </p>
      </div>
    );
  }

  // If already authenticated, return null as we are redirecting to dashboard
  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-outfit relative overflow-hidden">
      
      {/* Background Radial Orbs (Matches globals.css body design) */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary-blue/[0.03] via-soft-cyan/[0.02] to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/[0.04] blur-3xl pointer-events-none rounded-full z-0" />
      <div className="absolute top-1/2 right-10 translate-x-1/3 w-[500px] h-[500px] bg-soft-cyan/[0.03] blur-3xl pointer-events-none rounded-full z-0" />

      {/* ── HEADER ─────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-primary-blue/10 w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-primary-blue/10 flex items-center justify-center shadow-sm relative overflow-hidden shrink-0 group">
              <Image
                src="/logo.png"
                alt="Aether Logo"
                width={36}
                height={36}
                className="shrink-0 object-contain drop-shadow-[0_0_8px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl font-black tracking-wider text-slate-900 font-outfit">
              AETHER
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#features" className="hover:text-primary-blue transition-colors">Fitur Utama</a>
            <a href="#philosophy" className="hover:text-primary-blue transition-colors">Filosofi</a>
            <a href="#pipeline" className="hover:text-primary-blue transition-colors">Sistem Pipeline</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <NeonButton variant="ghost" className="text-sm font-bold px-4 py-2">
                Masuk
              </NeonButton>
            </Link>
            <Link href="/register">
              <NeonButton className="text-sm font-bold px-5 py-2">
                Masuki Gateway
              </NeonButton>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ─────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col items-center text-center">
        
        {/* Animated Rotating Cosmic Sigil */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 mb-10 flex items-center justify-center">
          {/* External cosmic orbit rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-primary-blue/30 animate-[spin_40s_linear_infinite]" />
          <div className="absolute -inset-3 rounded-full border border-primary-blue/10 animate-[spin_60s_linear_infinite_reverse]" />
          
          {/* Radial soft cyan/blue glow backdrop */}
          <div className="absolute w-24 h-24 bg-primary-blue/10 rounded-full blur-xl animate-pulse" />

          {/* Central floating container */}
          <div className="w-24 h-24 md:w-30 md:h-30 rounded-[28px] bg-white border border-primary-blue/10 flex items-center justify-center shadow-lg drop-shadow-[0_4px_20px_rgba(37,99,235,0.08)] overflow-hidden relative floating-panel z-10">
            <Image
              src="/logo.png"
              alt="Aether Central Sigil"
              width={160}
              height={160}
              className="shrink-0 object-contain filter contrast-105 saturate-110 drop-shadow-[0_0_12px_rgba(37,99,235,0.3)]"
            />
          </div>
        </div>

        {/* Pulsating system label */}
        <div className="inline-flex items-center gap-2 bg-primary-blue/5 border border-primary-blue/15 px-4 py-1.5 rounded-full mb-6 text-xs font-black text-primary-blue uppercase tracking-[0.2em] shadow-sm animate-pulse">
          <Sparkles size={12} className="animate-spin-slow" />
          AI-Driven Learning Intelligence
        </div>

        {/* Premium Display Typography */}
        <h1 className="text-5xl md:text-8xl font-black font-outfit tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl">
          Evolusikan Kemampuanmu Bersama{" "}
          <span className="gradient-text drop-shadow-[0_2px_10px_rgba(37,99,235,0.08)] font-black">
            AETHER
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed mb-10">
          Aether mengubah setiap aktivitas—jurnal harian, proyek riil, hingga tantangan kuis—menjadi peta perkembangan skill yang hidup, real-time, dan terukur.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/register">
            <NeonButton className="text-base font-black px-8 py-4 shadow-md flex items-center gap-2 group">
              Mulai Petualangan Skill
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </NeonButton>
          </Link>
          <a href="#features">
            <NeonButton variant="secondary" className="text-base font-bold px-8 py-4">
              Jelajahi Fitur
            </NeonButton>
          </a>
        </div>
      </section>

      {/* ── CORE VALUE PROPOSITION (TRUTH vs CRUD) ─────────────────────────── */}
      <section id="philosophy" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">Filosofi Inti</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit">Sistem Kebenaran Kemampuan</h3>
          <p className="text-slate-500 font-medium mt-3 max-w-lg mx-auto">Aether melampaui paradigma belajar tradisional untuk merekam evolusi kompetensi sejati Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Boring CRUD Platform */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between opacity-80">
            <div>
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-6 border border-slate-200">
                <Layers size={22} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Aplikasi CRUD Konvensional</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                Platform belajar tradisional sekadar menyimpan berkas statis. Mereka adalah tumpukan database pasif yang merekam apa yang Anda *baca*, bukan apa yang Anda *kuasai*.
              </p>
              <ul className="flex flex-col gap-3 text-slate-500 text-sm font-semibold">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold">✕</span>
                  Hanya berfokus pada penyimpanan data terisolasi.
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold">✕</span>
                  Daftar checklist yang tidak mencerminkan perkembangan nyata.
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold">✕</span>
                  Tidak ada kecerdasan kontekstual untuk menganalisis aktivitas.
                </li>
              </ul>
            </div>
            <div className="border-t border-slate-100 pt-6 mt-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Learning is Consumption
            </div>
          </div>

          {/* Living Reality Engine (Aether) */}
          <div className="bg-white border border-primary-blue/15 rounded-3xl p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
            {/* Glowing Accent Orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="w-12 h-12 bg-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue mb-6 border border-primary-blue/20">
                <Brain size={22} className="animate-pulse" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                Aether Skill Evolution Engine
                <span className="text-[10px] font-black bg-primary-blue/10 text-primary-blue border border-primary-blue/25 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Living</span>
              </h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                Aether adalah **learning reality engine**. Setiap interaksi dianalisis oleh AI menjadi rangkaian kontribusi skill dinamis yang secara instan merajut peta kognitif masa depan Anda.
              </p>
              <ul className="flex flex-col gap-3 text-slate-700 text-sm font-semibold">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0 text-xs font-black">✓</span>
                  Evolusi skill terpadu yang didorong oleh kecerdasan AI.
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0 text-xs font-black">✓</span>
                  Visualisasi konstelasi skill tree interaktif mirip RPG.
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0 text-xs font-black">✓</span>
                  Pengalaman berbasis leveling dan quest perkembangan karir.
                </li>
              </ul>
            </div>
            <div className="border-t border-slate-100 pt-6 mt-8 text-xs font-bold text-primary-blue uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} className="animate-spin-slow" />
              Learning is Transformation
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES SHOWCASE ─────────────────────────── */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">Fitur Utama</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit">Sistem Terintegrasi Penuh</h3>
          <p className="text-slate-500 font-medium mt-3 max-w-lg mx-auto">Empat pilar utama yang menyusun pipeline evolusi kemampuan di dalam Aether.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          
          {/* PILAR 1: Activity Ingestion Layer */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300">
            <div>
              <div className="w-11 h-11 bg-primary-blue/5 border border-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue mb-6">
                <Layers size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">1. Activity Ingestion Layer</h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                Pintu masuk utama setiap bukti perkembangan Anda. Bukan sekadar isian formulir, melainkan input multi-dimensi untuk merefleksikan dan memvalidasi keahlian.
              </p>
              
              {/* Interactive Ingestion Mockup Tabs */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mt-2">
                <div className="flex border-b border-slate-200/60 pb-2 mb-3 gap-2">
                  {(["journal", "project", "quiz"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                        activeTab === tab 
                          ? "bg-white text-primary-blue border border-primary-blue/10 shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                {activeTab === "journal" && (
                  <div className="text-xs flex flex-col gap-2 animate-fadeIn">
                    <div className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Refleksi Pembelajaran</div>
                    <div className="font-semibold text-slate-800 font-outfit">Jurnal #42: Integrasi PostgreSQL API</div>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      "Hari ini saya membangun endpoint migrasi skema tabel transaksi dan berhasil menyelesaikan optimasi performa query."
                    </p>
                  </div>
                )}

                {activeTab === "project" && (
                  <div className="text-xs flex flex-col gap-2 animate-fadeIn">
                    <div className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Bukti Nyata Kemampuan</div>
                    <div className="font-semibold text-slate-800 font-outfit">Repository: Aether Skill Engine (Backend)</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-md font-mono text-[9px]">REST API</span>
                      <span className="bg-primary-blue/5 text-primary-blue border border-primary-blue/10 px-2 py-0.5 rounded-md font-mono text-[9px]">Node.js</span>
                    </div>
                  </div>
                )}

                {activeTab === "quiz" && (
                  <div className="text-xs flex flex-col gap-2 animate-fadeIn">
                    <div className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">Validasi Pemahaman</div>
                    <div className="font-semibold text-slate-800 font-outfit">Kuis Arena: Teori Algoritma & Struktur Data</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-primary-blue h-full w-[85%] rounded-full" />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>Skor Validasi</span>
                      <span>85% (COMPLETED)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PILAR 2: AI Skill Processing Engine */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300">
            <div>
              <div className="w-11 h-11 bg-primary-blue/5 border border-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue mb-6">
                <Brain size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">2. AI Skill Processing Engine</h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                Kecerdasan AI membaca konteks aktivitas Anda, mengidentifikasi kontribusi skill secara presisi, lalu menetapkan hubungan relasi keahlian secara otomatis.
              </p>
              
              {/* Simulated Terminal Interface */}
              <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono text-[10px] shadow-inner relative overflow-hidden flex flex-col gap-2.5 h-[135px]">
                <div className="absolute top-0 left-0 right-0 bg-slate-850 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Aether Engine Console</span>
                </div>
                
                <div className="mt-4 flex flex-col gap-2 overflow-y-auto leading-relaxed">
                  {terminalStep >= 0 && (
                    <div className="text-slate-400">
                      <span className="text-primary-blue font-bold">$</span> ingest --activity "Jurnal #42"
                    </div>
                  )}
                  {terminalStep >= 1 && (
                    <div className="text-yellow-400 flex items-center gap-1.5">
                      <Terminal size={10} className="animate-pulse" />
                      [AI CORE] Menganalisis konteks log & relasi skill...
                    </div>
                  )}
                  {terminalStep >= 2 && (
                    <div className="text-green-400 font-bold">
                      SUCCESS: SkillEvent dihasilkan!
                    </div>
                  )}
                  {terminalStep >= 3 && (
                    <div className="text-slate-500 font-mono text-[8px] bg-slate-850 p-1.5 rounded border border-slate-800 whitespace-pre">
                      {`{ "Skill": "PostgreSQL API", "Progress": "+12 XP", "Lvl": 2 }`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PILAR 3: Skill Graph System */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300">
            <div>
              <div className="w-11 h-11 bg-primary-blue/5 border border-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue mb-6">
                <GitBranch size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">3. Skill Graph System (Skill Tree RPG)</h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                Struktur hierarki parent-child yang cerdas mengagregasi progres Anda menjadi gambaran konstelasi keahlian interaktif layaknya pohon keahlian di game RPG.
              </p>
              
              {/* Interactive Vector RPG Skill Tree Mockup */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[135px]">
                <svg className="w-full max-w-[280px] h-[95px]" viewBox="0 0 280 100">
                  {/* Skill Node Connectors */}
                  <line x1="140" y1="20" x2="60" y2="75" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse" />
                  <line x1="140" y1="20" x2="220" y2="75" stroke="#0ea5e9" strokeWidth="2" className="animate-pulse" />
                  
                  {/* Central Main Skill Node */}
                  <circle cx="140" cy="20" r="12" fill="#2563eb" className="animate-pulse" />
                  <text x="140" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-800 font-outfit">Software Eng</text>
                  
                  {/* Branch Skill Node (Left) */}
                  <circle cx="60" cy="75" r="9" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="60" y="93" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500 font-outfit">Frontend</text>
                  
                  {/* Branch Skill Node (Right - Active) */}
                  <circle cx="220" cy="75" r="9" fill="#0ea5e9" className="animate-[ping_3s_infinite]" />
                  <circle cx="220" cy="75" r="9" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="220" y="93" textAnchor="middle" className="text-[8px] font-bold fill-slate-800 font-outfit">Backend</text>
                </svg>
              </div>
            </div>
          </div>

          {/* PILAR 4: Career Progression System */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300">
            <div>
              <div className="w-11 h-11 bg-primary-blue/5 border border-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue mb-6">
                <Award size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">4. Career Progression System</h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                Jalur karir (CareerGoal) diubah menjadi baris misi utama ("quest line"). Kemampuan Anda bukan sekadar coretan checklist, melainkan jalur perkembangan petualang sejati.
              </p>
              
              {/* Quest Line Mockup Widget */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2.5 min-h-[135px] justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-primary-blue bg-primary-blue/10 border border-primary-blue/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Questline Aktif</span>
                  <span className="text-[9px] font-semibold text-slate-400">Level 8 Adventurer</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue shrink-0 mt-0.5">
                    <Compass size={14} className="animate-spin-slow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Menjadi Lead Backend Architect</div>
                    
                    {/* XP Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-gradient-to-r from-primary-blue to-soft-cyan h-full w-[70%]" />
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-bold mt-1">
                      <span>Progres Jalur Karir</span>
                      <span>70% XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SYSTEM FLOW (PIPELINE EVOLUSI) ─────────────────────────── */}
      <section id="pipeline" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 bg-white/40 backdrop-blur-sm rounded-3xl border border-slate-200/50">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">Sistem Aliran Data</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit">Satu Pipeline Konsisten</h3>
          <p className="text-slate-500 font-medium mt-3 max-w-lg mx-auto">Mekanisme otomatisasi bagaimana setiap aktivitas diubah menjadi evolusi kemampuan sejati.</p>
        </div>

        {/* Pipeline Diagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 max-w-5xl mx-auto items-center">
          
          {/* STEP 1 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">1</span>
            <div className="font-bold text-xs text-slate-800 mb-1">Input Activity</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-medium">Jurnal, Proyek, Kuis</p>
          </div>

          <div className="hidden md:flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          {/* STEP 2 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">2</span>
            <div className="font-bold text-xs text-slate-800 mb-1">AI Analysis</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-medium">Interpretasi Konteks</p>
          </div>

          <div className="hidden md:flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          {/* STEP 3 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">3</span>
            <div className="font-bold text-xs text-slate-800 mb-1">SkillEvent</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-medium">Payload Kontribusi</p>
          </div>

          <div className="hidden md:flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          {/* STEP 4 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">4</span>
            <div className="font-bold text-xs text-slate-800 mb-1">Aggregation</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-medium">Skill Hierarchy</p>
          </div>

          <div className="hidden md:flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          {/* STEP 5 */}
          <div className="bg-white border border-primary-blue/20 p-5 rounded-2xl shadow-md text-center flex flex-col items-center ring-2 ring-primary-blue/10">
            <span className="w-7 h-7 bg-primary-blue/10 border border-primary-blue/20 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3 animate-pulse">5</span>
            <div className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-1">
              Evolution
              <Sparkles size={10} className="text-primary-blue animate-pulse" />
            </div>
            <p className="text-primary-blue text-[10px] leading-relaxed font-black">UserSkill Level Up!</p>
          </div>

        </div>
        
        <p className="text-center text-xs font-bold text-slate-500 mt-10">
          Tidak ada satu pun aktivitas pembelajaran yang terbuang sia-sia tanpa teragregasi menjadi progress.
        </p>
      </section>

      {/* ── VISION STATEMENT & COSMIC QUOTE ─────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-br from-primary-blue/[0.04] to-soft-cyan/[0.04] border border-primary-blue/10 p-12 rounded-[36px] relative overflow-hidden shadow-sm flex flex-col items-center">
          {/* Subtle Decorative Star Element */}
          <div className="absolute top-6 left-6 text-primary-blue/20 animate-pulse">
            <Sparkles size={36} />
          </div>
          
          <div className="w-12 h-12 rounded-full bg-white border border-primary-blue/10 flex items-center justify-center shadow-sm text-primary-blue mb-6">
            <Workflow size={20} className="animate-spin-slow" />
          </div>

          <blockquote className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-relaxed max-w-3xl font-outfit mb-8">
            “Learning is not consumption. <br className="hidden md:inline" />
            Learning is <span className="gradient-text font-black">transformation</span>.”
          </blockquote>
          
          <cite className="text-xs font-bold text-slate-500 uppercase tracking-widest not-italic">
            — Aether Core Philosophy
          </cite>
        </div>
      </section>

      {/* ── FINAL CALL TO ACTION ─────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28 text-center flex flex-col items-center">
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-4">
          Masuki Gerbang Evolusimu
        </h3>
        
        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed max-w-xl mb-8">
          Bangun skill nyata dari setiap aktivitas harian Anda, dan saksikan bagaimana diri Anda bertransformasi menjadi versi yang lebih terarah, terstruktur, dan terukur.
        </p>

        <Link href="/register">
          <NeonButton className="text-base font-black px-8 py-4 shadow-md flex items-center gap-2 group">
            Masuki Aether Gateway
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </NeonButton>
        </Link>
      </section>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-12 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="Aether Logo Footer"
                width={28}
                height={28}
                className="shrink-0 object-contain filter contrast-105 saturate-110"
              />
            </div>
            <span className="font-bold text-slate-600 tracking-wider font-outfit">AETHER</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Aether System. Built with event-driven learning intelligence philosophy.
          </div>

          <div className="flex items-center gap-4 font-bold">
            <a href="#features" className="hover:text-primary-blue transition-colors">Fitur</a>
            <a href="#philosophy" className="hover:text-primary-blue transition-colors">Filosofi</a>
            <Link href="/login" className="hover:text-primary-blue transition-colors">Gateway</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
