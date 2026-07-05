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
  ArrowRight,
  HelpCircle,
  Play,
  ArrowUpRight,
  CheckCircle
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-outfit relative overflow-x-hidden">
      
      {/* Background Radial Orbs (Matches globals.css body design) */}
      <div className="absolute top-0 left-0 right-0 h-[400px] md:h-[800px] bg-gradient-to-b from-primary-blue/[0.03] via-soft-cyan/[0.02] to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary-blue/[0.04] blur-3xl pointer-events-none rounded-full z-0" />
      <div className="absolute top-1/2 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-soft-cyan/[0.03] blur-3xl pointer-events-none rounded-full z-0" />

      {/* ── HEADER ─────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-primary-blue/10 w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-primary-blue/10 flex items-center justify-center shadow-sm relative overflow-hidden shrink-0 group">
              <Image
                src="/logo.png"
                alt="Aether Logo"
                width={36}
                height={36}
                className="shrink-0 object-contain drop-shadow-[0_0_8px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-wider text-slate-900 font-outfit">
              AETHER
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-slate-500">
            <a href="#value-prop" className="hover:text-primary-blue transition-colors">Value Proposition</a>
            <a href="#philosophy" className="hover:text-primary-blue transition-colors">Filosofi</a>
            <a href="#features" className="hover:text-primary-blue transition-colors">Fitur Utama</a>
            <a href="#pipeline" className="hover:text-primary-blue transition-colors">Pipeline</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link href="/login">
              <NeonButton variant="ghost" className="text-xs sm:text-sm font-bold px-3 sm:px-4 py-2">
                Masuk
              </NeonButton>
            </Link>
            <Link href="/register">
              <NeonButton className="text-xs sm:text-sm font-bold px-3 sm:px-5 py-2">
                Mulai
              </NeonButton>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ─────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14 md:pt-24 md:pb-28 flex flex-col items-center text-center">
        
        {/* Animated Rotating Cosmic Sigil */}
        <div className="relative w-36 h-36 md:w-40 md:h-40 mb-8 flex items-center justify-center">
          {/* External cosmic orbit rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-primary-blue/30 animate-[spin_40s_linear_infinite]" />
          <div className="absolute -inset-3 rounded-full border border-primary-blue/10 animate-[spin_60s_linear_infinite_reverse]" />
          
          {/* Radial soft cyan/blue glow backdrop */}
          <div className="absolute w-24 h-24 bg-primary-blue/10 rounded-full blur-xl animate-pulse" />

          {/* Central floating container */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-[28px] bg-white border border-primary-blue/10 flex items-center justify-center shadow-lg drop-shadow-[0_4px_20px_rgba(37,99,235,0.08)] overflow-hidden relative floating-panel z-10">
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
          Skill Evolution Engine
        </div>

        {/* Premium Display Typography */}
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-black font-outfit tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight max-w-5xl">
          Evolusikan Dirimu Bersama <br className="hidden md:inline" />
          <span className="gradient-text drop-shadow-[0_2px_10px_rgba(37,99,235,0.08)] font-black">
            AETHER
          </span>
        </h1>

        {/* Verbatim Tagline */}
        <p className="text-base md:text-xl text-slate-700 font-bold max-w-3xl leading-relaxed mb-6">
          Aether adalah <span className="text-primary-blue">AI-driven learning intelligence system</span> yang mengubah setiap aktivitas manusia menjadi struktur perkembangan skill yang hidup dan terukur.
        </p>

        {/* Verbatim Sub-tagline */}
        <div className="bg-white border border-primary-blue/10 px-6 py-4 rounded-2xl shadow-sm max-w-2xl mb-10 text-slate-500 text-xs md:text-sm font-semibold tracking-wide leading-relaxed">
          "Setiap jurnal, proyek, dan kuis bukan lagi data terpisah — semuanya menjadi bagian dari satu sistem utama: <span className="text-primary-blue font-bold">Skill Evolution Engine</span>."
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/register">
            <NeonButton className="text-base font-black px-8 py-4 shadow-md flex items-center gap-2 group">
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </NeonButton>
          </Link>
          <a href="#value-prop">
            <NeonButton variant="secondary" className="text-base font-bold px-8 py-4">
              How We Work
            </NeonButton>
          </a>
        </div>
      </section>

      {/* ── CORE VALUE PROPOSITION (VERBATIM) ─────────────────────────── */}
      <section id="value-prop" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-primary-blue uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
            <Brain size={12} className="animate-pulse" />
            Core Value Proposition
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit">Bukan Sekadar Platform Belajar</h3>
        </div>

        {/* High-Impact Glass Banner for Core Value Proposition */}
        <div className="max-w-4xl mx-auto bg-white border border-primary-blue/10 rounded-[32px] p-8 md:p-12 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 text-center md:text-left relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0 shadow-sm animate-pulse">
                <Sparkles size={26} />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {/* Wording 1 */}
                <h4 className="text-2xl font-black text-slate-900 font-outfit">
                  Aether bukan platform belajar.
                </h4>
                {/* Wording 2 - sisakan badge saja */}
                <div className="text-lg font-extrabold text-primary-blue font-outfit flex items-center justify-center md:justify-start gap-1">
                  <span className="bg-primary-blue/10 border border-primary-blue/20 px-3 py-1 rounded-xl shadow-xs">system of learning truth</span>.
                </div>
                {/* Wording 3 */}
                <p className="text-slate-650 font-medium text-sm md:text-base leading-relaxed mt-2">
                  Di dalamnya, setiap interaksi pengguna diproses menjadi <span className="text-primary-blue font-bold">SkillEvent</span>, dianalisis oleh AI, lalu diagregasi menjadi <span className="text-primary-blue font-bold">UserSkill</span> yang membentuk peta perkembangan karier secara real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY BANNER (VERBATIM & HIGH IMPRESSION) ─────────────────────────── */}
      <section id="philosophy" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/5 to-primary-blue/5 border border-amber-500/20 rounded-[28px] p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 shadow-xs animate-bounce-slow">
            <span className="text-2xl font-bold">⚠️</span>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1 font-outfit">
              Core Philosophy
            </h4>
            <p className="text-base md:text-lg font-black text-slate-800 leading-relaxed font-outfit">
              Aether bukan aplikasi CRUD.
            </p>
            <p className="text-sm md:text-base font-semibold text-slate-600 mt-1">
              Aether adalah <span className="text-primary-blue font-bold">learning reality engine</span> yang menjadikan aktivitas manusia sebagai sumber kebenaran perkembangan skill.
            </p>
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES GRID (VERBATIM BULLETS) ─────────────────────────── */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-primary-blue uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
            <Code size={12} className="animate-spin-slow" />
            Core Features
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit">Struktur Fungsional Sistem</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          
          {/* CARD 1: Activity Ingestion Layer */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 bg-primary-blue/5 border border-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue mb-6 group-hover:scale-105 transition-transform duration-300">
                <Layers size={22} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2 font-outfit">📝 Activity Ingestion Layer</h4>
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">
                Gerbang utama penyerapan data aktivitas secara komprehensif dari berbagai sumber.
              </p>
              
              {/* Verbatim Bullet Points */}
              <ul className="flex flex-col gap-3.5 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Journal sebagai refleksi pembelajaran
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Project sebagai bukti skill real-world
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Quiz sebagai validasi pemahaman
                </li>
              </ul>
              
              {/* Ingestion Micro Tabs */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-2">
                <div className="flex border-b border-slate-200 pb-2 mb-3 gap-2">
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
                  <div className="text-xs flex flex-col gap-2">
                    <div className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">JURNAL REFLEKSI</div>
                    <div className="font-bold text-slate-800">Menulis REST API NestJS</div>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      "Skema basis data dirancang menggunakan Postgres dan terintegrasi penuh."
                    </p>
                  </div>
                )}

                {activeTab === "project" && (
                  <div className="text-xs flex flex-col gap-2">
                    <div className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">REAL-WORLD EVIDENCE</div>
                    <div className="font-bold text-slate-800">isekai-skill-engine-backend</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-green-50 text-green-600 border border-green-200 px-2.5 py-0.5 rounded-md font-mono text-[9px] font-bold">API skema</span>
                      <span className="bg-primary-blue/5 text-primary-blue border border-primary-blue/10 px-2.5 py-0.5 rounded-md font-mono text-[9px] font-bold">Node.js</span>
                    </div>
                  </div>
                )}

                {activeTab === "quiz" && (
                  <div className="text-xs flex flex-col gap-2">
                    <div className="text-[10px] font-bold text-primary-blue uppercase tracking-wider">VALIDASI PEMAHAMAN</div>
                    <div className="font-bold text-slate-800">Skor Kuis Backend API: 85%</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-primary-blue h-full w-[85%] rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: AI Skill Processing Engine */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 bg-primary-blue/5 border border-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue mb-6 group-hover:scale-105 transition-transform duration-300">
                <Brain size={22} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2 font-outfit">🧩 AI Skill Processing Engine</h4>
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">
                Kecerdasan buatan terpadu yang memetakan aktivitas ke dalam metrik skill terstruktur.
              </p>
              
              {/* Verbatim Bullet Points */}
              <ul className="flex flex-col gap-3.5 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  AI menginterpretasi konteks aktivitas
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Menghasilkan SkillEvent berbasis kontribusi skill
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Menentukan relasi skill secara otomatis
                </li>
              </ul>
              
              {/* Visible High-contrast Console Terminal */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 font-mono text-[10px] shadow-inner relative overflow-hidden flex flex-col gap-2 h-[135px]">
                <div className="absolute top-0 left-0 right-0 bg-slate-800 px-3 py-1.5 border-b border-slate-750 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Aether AI Engine Console</span>
                </div>
                
                <div className="mt-4 flex flex-col gap-2 overflow-y-auto leading-relaxed">
                  {terminalStep >= 0 && (
                    <div className="text-slate-400">
                      <span className="text-sky-400 font-bold">$</span> ingest --activity "Jurnal #42"
                    </div>
                  )}
                  {terminalStep >= 1 && (
                    <div className="text-yellow-400 flex items-center gap-1.5">
                      <Terminal size={10} className="animate-pulse" />
                      [AI ENGINE] Menganalisis konteks log aktivitas...
                    </div>
                  )}
                  {terminalStep >= 2 && (
                    <div className="text-green-400 font-bold">
                      SUCCESS: SkillEvent baru dihasilkan!
                    </div>
                  )}
                  {terminalStep >= 3 && (
                    <div className="text-sky-300 font-mono text-[8.5px] bg-slate-800 p-1.5 rounded border border-slate-700 whitespace-pre">
                      {`{ "Skill": "PostgreSQL skema", "Progress": "+12 XP", "Level": 2 }`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Skill Graph System */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 bg-primary-blue/5 border border-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue mb-6 group-hover:scale-105 transition-transform duration-300">
                <GitBranch size={22} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2 font-outfit">📊 Skill Graph System</h4>
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">
                Gambaran lengkap perkembangan seluruh keahlian dalam konstelasi semantik terpadu.
              </p>
              
              {/* Verbatim Bullet Points */}
              <ul className="flex flex-col gap-3.5 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Skill hierarchy berbasis parent-child
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Aggregasi progres menjadi UserSkill
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Visualisasi perjalanan skill seperti skill tree RPG
                </li>
              </ul>
              
              {/* Vector RPG Skill Tree Mockup */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[135px]">
                <svg className="w-full max-w-[280px] h-[95px]" viewBox="0 0 280 100">
                  <line x1="140" y1="20" x2="60" y2="75" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="140" y1="20" x2="220" y2="75" stroke="#0ea5e9" strokeWidth="2" />
                  
                  <circle cx="140" cy="20" r="12" fill="#2563eb" />
                  <text x="140" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-800 font-outfit">Software Eng</text>
                  
                  <circle cx="60" cy="75" r="9" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="60" y="93" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500 font-outfit">Frontend</text>
                  
                  <circle cx="220" cy="75" r="9" fill="#0ea5e9" className="animate-[ping_3s_infinite]" />
                  <circle cx="220" cy="75" r="9" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="220" y="93" textAnchor="middle" className="text-[8px] font-bold fill-slate-800 font-outfit">Backend</text>
                </svg>
              </div>
            </div>
          </div>

          {/* CARD 4: Career Progression System */}
          <div className="bg-white border border-primary-blue/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-primary-blue/20 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 bg-primary-blue/5 border border-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue mb-6 group-hover:scale-105 transition-transform duration-300">
                <Award size={22} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2 font-outfit">🎮 Career Progression System</h4>
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">
                Struktur gamifikasi adaptif untuk meningkatkan motivasi petualangan karir Anda.
              </p>
              
              {/* Verbatim Bullet Points */}
              <ul className="flex flex-col gap-3.5 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  CareerGoal sebagai “quest line”
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Skill sebagai unlockable progression path
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-[10px] text-primary-blue shrink-0">✓</span>
                  Sistem belajar berbasis leveling, bukan checklist
                </li>
              </ul>
              
              {/* Quest Line Mockup Widget */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2.5 min-h-[135px] justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-primary-blue bg-primary-blue/10 border border-primary-blue/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Questline Aktif</span>
                  <span className="text-[9px] font-bold text-slate-400">Level 8 Adventurer</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue shrink-0 mt-0.5 animate-pulse">
                    <Compass size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Menjadi Lead Backend Architect</div>
                    
                    {/* XP Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-gradient-to-r from-primary-blue to-soft-cyan h-full w-[70%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SYSTEM FLOW (VERBATIM PIPELINE & SUMMARY) ─────────────────────────── */}
      <section id="pipeline" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 border-t border-slate-100 bg-white/40 backdrop-blur-sm rounded-3xl border border-slate-200/50">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-primary-blue uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
            <Workflow size={12} className="animate-spin-slow" />
            🔄 System Flow
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit">Alur Operasional Pipeline</h3>
        </div>

        {/* Pipeline Diagram Cards - Mobile: vertical, Desktop: horizontal */}
        {/* Mobile layout */}
        <div className="flex flex-col gap-2 max-w-xs mx-auto md:hidden">
          {[
            { n: "1", title: "Input Activity", desc: "Jurnal, Proyek, Kuis", highlight: false },
            { n: "2", title: "AI Analysis", desc: "Interpretasi Konteks", highlight: false },
            { n: "3", title: "SkillEvent", desc: "Payload Kontribusi", highlight: false },
            { n: "4", title: "Aggregation Engine", desc: "Skill Hierarchy", highlight: false },
            { n: "5", title: "UserSkill Evolution", desc: "Level Up!", highlight: true },
          ].map((step, i) => (
            <div key={step.n}>
              <div className={`bg-white border rounded-2xl shadow-sm p-4 flex items-center gap-4 ${step.highlight ? "border-primary-blue/20 ring-2 ring-primary-blue/10" : "border-slate-200"}`}>
                <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-black ${step.highlight ? "bg-primary-blue/10 border border-primary-blue/20 text-primary-blue animate-pulse" : "bg-primary-blue/5 border border-primary-blue/10 text-primary-blue"}`}>{step.n}</span>
                <div className="flex-1 text-left">
                  <div className={`font-bold text-xs mb-0.5 flex items-center gap-1 ${step.highlight ? "text-slate-900" : "text-slate-800"}`}>
                    {step.title}
                    {step.highlight && <Sparkles size={9} className="text-primary-blue animate-pulse" />}
                  </div>
                  <p className={`text-[10px] font-semibold ${step.highlight ? "text-primary-blue font-black" : "text-slate-400"}`}>{step.desc}</p>
                </div>
              </div>
              {i < 4 && (
                <div className="flex justify-center py-0.5 text-primary-blue/30">
                  <ChevronRight className="rotate-90" size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-6 max-w-5xl mx-auto items-center">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">1</span>
            <div className="font-bold text-xs text-slate-800 mb-1">Input Activity</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-semibold">Jurnal, Proyek, Kuis</p>
          </div>

          <div className="flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">2</span>
            <div className="font-bold text-xs text-slate-800 mb-1">AI Analysis</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-semibold">Interpretasi Konteks</p>
          </div>

          <div className="flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">3</span>
            <div className="font-bold text-xs text-slate-800 mb-1">SkillEvent</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-semibold">Payload Kontribusi</p>
          </div>

          <div className="flex justify-center text-primary-blue/40 col-span-5 my-1">
            <div className="flex w-full max-w-md items-center gap-1">
              <div className="flex-1 h-px bg-primary-blue/10" />
              <ChevronRight className="animate-[ping_3s_infinite] text-primary-blue/40" />
              <div className="flex-1 h-px bg-primary-blue/10" />
              <ChevronRight className="animate-[ping_3s_infinite] text-primary-blue/40" />
              <div className="flex-1 h-px bg-primary-blue/10" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center col-span-2">
            <span className="w-7 h-7 bg-primary-blue/5 border border-primary-blue/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3">4</span>
            <div className="font-bold text-xs text-slate-800 mb-1">Aggregation Engine</div>
            <p className="text-slate-400 text-[10px] leading-relaxed font-semibold">Skill Hierarchy</p>
          </div>

          <div className="flex justify-center text-primary-blue/40">
            <ChevronRight className="animate-[ping_3s_infinite]" />
          </div>

          <div className="bg-white border border-primary-blue/20 p-5 rounded-2xl shadow-md text-center flex flex-col items-center ring-2 ring-primary-blue/10 col-span-2">
            <span className="w-7 h-7 bg-primary-blue/10 border border-primary-blue/20 rounded-full flex items-center justify-center text-[10px] font-black text-primary-blue mb-3 animate-pulse">5</span>
            <div className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-1">
              UserSkill Evolution
              <Sparkles size={10} className="text-primary-blue animate-pulse" />
            </div>
            <p className="text-primary-blue text-[10px] leading-relaxed font-black">Level Up!</p>
          </div>
        </div>
        
        {/* Verbatim Summary Statement */}
        <p className="text-center text-sm font-bold text-slate-600 mt-12 bg-white/70 border border-slate-200/80 px-6 py-4.5 rounded-2xl max-w-3xl mx-auto shadow-xs leading-relaxed">
          "Tidak ada aktivitas yang hilang tanpa menjadi progress."
          <span className="block text-[11px] text-slate-400 mt-1 font-semibold">Semua proses ini berjalan sebagai satu pipeline yang konsisten.</span>
        </p>
      </section>

      {/* ── VISION STATEMENT (VERBATIM & COSMIC STYLE) ─────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24 text-center">
        <div className="bg-gradient-to-br from-primary-blue/[0.04] to-soft-cyan/[0.04] border border-primary-blue/10 p-10 md:p-14 rounded-[36px] relative overflow-hidden shadow-sm flex flex-col items-center">
          {/* Subtle Decorative Star Element */}
          <div className="absolute top-6 left-6 text-primary-blue/25 animate-pulse">
            <Sparkles size={36} />
          </div>
          
          <div className="w-12 h-12 rounded-full bg-white border border-primary-blue/10 flex items-center justify-center shadow-sm text-primary-blue mb-6">
            <span className="text-xl">🌌</span>
          </div>

          <h4 className="text-xs font-black text-primary-blue uppercase tracking-[0.2em] mb-4">
            Vision Statement
          </h4>

          <blockquote className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-relaxed max-w-4xl font-outfit mb-6">
            "Aether dibangun dengan satu prinsip: <br className="hidden md:inline" />
            <span className="gradient-text font-black">Every action is learning.</span>"
          </blockquote>
          
          <p className="text-slate-500 font-semibold text-xs md:text-sm max-w-2xl leading-relaxed mt-2 border-t border-slate-200/60 pt-6">
            Sistem ini mendefinisikan ulang pembelajaran sebagai proses evolusi skill berbasis <span className="text-primary-blue font-bold">event-driven intelligence</span>, bukan sekadar penyimpanan materi.
          </p>
        </div>
      </section>

      {/* ── FINAL CALL TO ACTION (VERBATIM) ─────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-28 text-center flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-4">
          <Award size={18} className="animate-bounce" />
        </div>
        
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 font-outfit mb-6 flex items-center gap-2 justify-center">
          🎯 Call to Action
        </h3>
        
        {/* Verbatim Call to Action Wording */}
        <p className="text-slate-700 font-extrabold text-base md:text-xl leading-relaxed max-w-2xl mb-8">
          Masuki Aether. Bangun skill dari setiap aktivitas. Dan lihat bagaimana dirimu berevolusi menjadi versi yang lebih terstruktur, terarah, dan terukur.
        </p>

        <Link href="/login">
          <NeonButton className="text-base font-black px-10 py-4.5 shadow-md flex items-center gap-2 group">
            Masuki Aether Gateway
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform animate-pulse" />
          </NeonButton>
        </Link>
      </section>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white/40 backdrop-blur-md py-6 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-white border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0">
              <Image src="/logo.png" alt="Aether" width={14} height={14} className="object-contain" />
            </div>
            <span>&copy; {new Date().getFullYear()} Aether System.</span>
          </div>
          <div className="text-center sm:text-right">
            Built with event-driven learning intelligence · emuyforge company.
          </div>
        </div>
      </footer>



    </div>
  );
}
