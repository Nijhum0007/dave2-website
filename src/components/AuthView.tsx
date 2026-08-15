"use client";

import React, { useState } from "react";
import {
  Bot,
  Lock,
  Mail,
  Shield,
  Radio,
  AlertCircle,
  Fingerprint,
  ArrowRight,
  ArrowLeft,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthViewProps {
  onLoginSuccess: (email: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useHardwareKey, setUseHardwareKey] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide all required credentials.");
      return;
    }
    setError(null);
    setIsLoading(true);

    // Use Supabase client for real authentication
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
    } else {
      onLoginSuccess(email);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail("creator_042@dave.com");
    setPassword("PhysicalAI_Teleop_2026!");
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-50 bg-grid-pattern px-4 py-12">
      {/* Back Button to Home */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10">
        <button 
          type="button"
          onClick={() => router.back()}
          className="group flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border border-zinc-200 text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 hover:text-black hover:shadow-md hover:scale-105 active:scale-95"
          title="Return to previous page"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>

      {/* Main Gated Access Card */}
      <div className="relative w-full max-w-md">
        {/* Top security tag */}
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-black uppercase">
              Gated Ingestion Gateway • v2.4
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">SEC-LEVEL-3</span>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm backdrop-blur-2xl">
          {/* Header Brand */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="mx-auto mb-4 flex justify-center">
              <img src="/logo.png" alt="Dave Logo" className="h-16 w-auto object-contain invert" />
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Physical AI Data Collection Portal
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wider">
                Creator Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator_042@dave.com"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-xs font-mono text-zinc-900 placeholder-zinc-600 transition-all focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Access Key / Password
                </label>
                <span className="font-mono text-[10px] text-zinc-500">
                  AES-256 Encrypted
                </span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-xs font-mono text-zinc-900 placeholder-zinc-600 transition-all focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            {/* Hardware Key Checkbox */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-emerald-400" />
                <span className="text-zinc-700 font-medium">
                  Telemetry Rig Key (RIG-042)
                </span>
              </div>
              <input
                type="checkbox"
                checked={useHardwareKey}
                onChange={(e) => setUseHardwareKey(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 bg-zinc-100 text-black focus:ring-black focus:ring-offset-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-zinc-900 to-black py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Radio className="h-4 w-4 animate-spin" />
                  <span>Verifying Rig Telemetry...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Operator</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] font-mono text-black hover:text-zinc-700 underline underline-offset-4"
            >
              ⚡ Auto-fill Demo Credentials (Operator 042)
            </button>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="mt-6 flex items-center justify-between px-2 text-[10px] text-zinc-600 font-mono">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-zinc-500" /> AES-256 S3 Enclave
          </span>
          <span>LeRobot v2.1 Format Compliant</span>
        </div>
      </div>
    </div>
  );
};
