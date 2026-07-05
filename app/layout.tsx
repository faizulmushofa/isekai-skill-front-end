import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Aether | Progression and Growth System",
  description: "AI-driven skill progression and measurable career growth operating system.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col font-outfit bg-midnight text-slate-900 relative overflow-x-hidden">
        {/* Subtle Cybernetic Lighting Gradients - contained within viewport */}
        <div className="fixed top-0 left-0 w-[40%] h-[40%] bg-glow-blue opacity-30 pointer-events-none blur-3xl" />
        <div className="fixed bottom-[20%] right-0 w-[40%] h-[40%] bg-glow-cyan opacity-25 pointer-events-none blur-3xl" />
        
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
