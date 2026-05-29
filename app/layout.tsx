import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import FeedbackWidget from "@/components/ui/FeedbackWidget";

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
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-outfit bg-midnight text-slate-900 relative">
        {/* Subtle Cybernetic Lighting Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-glow-blue opacity-50 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-glow-cyan opacity-40 pointer-events-none" />
        
        <Providers>
          {children}
          <FeedbackWidget />
        </Providers>
      </body>
    </html>
  );
}
