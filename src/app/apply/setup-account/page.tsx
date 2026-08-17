"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

function SetupAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    // Use Supabase client for real sign up
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    // Supabase automatically logs the user in if email confirmation is disabled.
    // We explicitly sign them out here so they are forced to log in manually on the next screen.
    if (!signUpError) {
      await supabase.auth.signOut();
    }

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // In a real app, this might log them in directly or redirect to login.
      router.push("/login?setup=success");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-3">
          Set up your account
        </h1>
        <p className="text-zinc-500">
          Create a secure password to access the Creator Dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 sm:p-10 space-y-6">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-900">
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              disabled
              value={email}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 text-sm text-zinc-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-900">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pl-11 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-900">
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pl-11 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-black px-8 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Setting up account..." : "Set Password & Complete Setup"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SetupAccountPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white flex flex-col">
      {/* Simple Header */}
      <header className="flex h-20 items-center justify-between px-6 lg:px-8 border-b border-zinc-100 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Dave Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold tracking-tight text-xl hidden sm:inline-block">Creator Network</span>
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
        >
          Already a Creator? Log in
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <Suspense fallback={<div className="text-sm text-zinc-500">Loading form...</div>}>
          <SetupAccountForm />
        </Suspense>
      </main>
    </div>
  );
}
