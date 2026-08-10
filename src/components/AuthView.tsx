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
  User,
} from "lucide-react";

interface AuthViewProps {
  onLoginSuccess: (email: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callsign, setCallsign] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useHardwareKey, setUseHardwareKey] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !callsign)) {
      setError("Please provide all required credentials.");
      return;
    }
    setError(null);
    setIsLoading(true);

    // Simulate Supabase authentication & Rig token validation
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 900);
  };

  const handleQuickDemoFill = () => {
    setIsLogin(true);
    setEmail("creator_042@dave.com");
    setPassword("PhysicalAI_Teleop_2026!");
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 bg-grid-pattern px-4 py-12">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Main Gated Access Card */}
      <div className="relative w-full max-w-md">
        {/* Top security tag */}
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-cyan-400 uppercase">
              Gated Ingestion Gateway • v2.4
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">SEC-LEVEL-3</span>
        </div>

        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-2xl">
          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                <path d="M3 6C3 6 7 2 12 6C17 10 21 6 21 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M3 12C3 12 7 8 12 12C17 16 21 12 21 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M3 18C3 18 7 14 12 18C17 22 21 18 21 18" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-black tracking-wider text-zinc-100 uppercase">
              DAVE
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              {isLogin
                ? "Physical AI Data Collection Portal"
                : "Apply for Operator Network Access"}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Operator Callsign
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={callsign}
                    onChange={(e) => setCallsign(e.target.value)}
                    placeholder="e.g. OP-GHOST-99"
                    required={!isLogin}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-xs font-mono text-zinc-100 placeholder-zinc-600 transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
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
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-xs font-mono text-zinc-100 placeholder-zinc-600 transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
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
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-xs font-mono text-zinc-100 placeholder-zinc-600 transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Hardware Key Checkbox */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-emerald-400" />
                <span className="text-zinc-300 font-medium">
                  Telemetry Rig Key (RIG-042)
                </span>
              </div>
              <input
                type="checkbox"
                checked={useHardwareKey}
                onChange={(e) => setUseHardwareKey(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-zinc-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Radio className="h-4 w-4 animate-spin" />
                  <span>Verifying Rig Telemetry...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? "Authenticate Operator" : "Apply for Access"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 border-t border-zinc-800/80 pt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-[11px] font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              {isLogin
                ? "Not in the network? Apply for Operator Access"
                : "Already an Operator? Log In Here"}
            </button>
          </div>

          {/* Quick Demo Pre-fill */}
          {isLogin && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] font-mono text-cyan-400/80 hover:text-cyan-300 underline underline-offset-4"
              >
                ⚡ Auto-fill Demo Credentials (Operator 042)
              </button>
            </div>
          )}
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
