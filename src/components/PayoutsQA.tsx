"use client";

import React, { useState } from "react";
import {
  DollarSign,
  CheckCircle2,
  AlertOctagon,
  Clock,
  TrendingUp,
  Download,
  AlertTriangle,
  FileCheck,
  CreditCard,
  Building,
  ShieldCheck,
} from "lucide-react";
import { EpisodeSubmission, PayoutRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface PayoutsQAProps {
  payouts: PayoutRecord[];
  submissions: EpisodeSubmission[];
  onNavigateToUpload: (recipeId?: string) => void;
}

export const PayoutsQA: React.FC<PayoutsQAProps> = ({
  payouts,
  submissions,
  onNavigateToUpload,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "rejections" | "history">("overview");

  const rejectedEpisodes = submissions.filter((s) => s.status === "REJECTED");
  const approvedEpisodes = submissions.filter((s) => s.status === "APPROVED");

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                FINANCIAL & QUALITY ASSURANCE
              </span>
              <span className="text-xs text-zinc-400">Automated Escrow & QA Audit</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Payouts & QA Diagnostics
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
              Track your earnings per approved manipulation episode, inspect automated QA rejection
              diagnostics, and access weekly ACH wire receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-zinc-800 bg-zinc-900/90 p-1 text-xs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`rounded-lg px-3 py-1.5 font-semibold text-xs transition-all ${
                  activeTab === "overview"
                    ? "bg-zinc-800 text-cyan-300 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Earnings Summary
              </button>
              <button
                onClick={() => setActiveTab("rejections")}
                className={`rounded-lg px-3 py-1.5 font-semibold text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === "rejections"
                    ? "bg-zinc-800 text-rose-300 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>QA Diagnostics</span>
                <span className="rounded-full bg-rose-500/20 px-1.5 py-0.2 font-mono text-[10px] text-rose-400">
                  {rejectedEpisodes.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`rounded-lg px-3 py-1.5 font-semibold text-xs transition-all ${
                  activeTab === "history"
                    ? "bg-zinc-800 text-emerald-300 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Payout History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Earnings Overview Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 glass-card p-5 bg-emerald-950/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Current Cycle Balance (Week 32)
              </span>
              <div className="mt-2 text-3xl font-black font-mono text-emerald-400 neon-green-glow">
                {formatCurrency(4890.0)}
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">Scheduled for direct wire on Aug 11, 2026</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 glass-card p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Lifetime Cleared Earnings
              </span>
              <div className="mt-2 text-3xl font-black font-mono text-zinc-100">
                {formatCurrency(28450.0)}
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">1,376 approved teleoperation episodes</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 glass-card p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Fleet Quality Tier
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-cyan-400">96.4%</span>
                <span className="text-xs font-semibold text-emerald-400">Tier 2 Verified</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">+$2.50 per episode bonus active</p>
            </div>
          </div>

          {/* Breakdown by Recipe */}
          <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider pb-3 border-b border-zinc-800">
              Earnings By Recipe Domain
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300">Clinical - Surgical Tool Handover</span>
                  <span className="font-mono text-cyan-300 font-bold">$1,900.00 (50 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[38%] rounded-full bg-cyan-400"></div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-zinc-300">Household - Load Dishwasher A</span>
                  <span className="font-mono text-emerald-300 font-bold">$1,575.00 (70 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[32%] rounded-full bg-emerald-400"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300">Warehouse - Cable Routing Bay B</span>
                  <span className="font-mono text-purple-300 font-bold">$816.00 (24 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[18%] rounded-full bg-purple-400"></div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-zinc-300">Industrial & Agriculture</span>
                  <span className="font-mono text-amber-300 font-bold">$599.00 (26 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[12%] rounded-full bg-amber-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QA Rejections Diagnostics Tab */}
      {activeTab === "rejections" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-rose-500/30 glass-panel p-6 bg-rose-950/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertOctagon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                  Automated QA Rejection Diagnostic Feed
                </h3>
                <p className="text-xs text-zinc-400">
                  Review why specific episodes failed automated LeRobot validation to prevent future drops.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {rejectedEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  className="rounded-xl border border-rose-500/30 bg-zinc-900/80 p-4 space-y-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-sm font-bold text-rose-400">{ep.id}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-semibold text-zinc-200">{ep.recipeTitle}</span>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">{ep.submittedAt}</span>
                  </div>

                  <div className="rounded-lg bg-rose-950/40 p-3 border border-rose-500/20 text-xs text-rose-200">
                    <span className="font-bold block text-rose-300 mb-1">
                      Critical Reason: {ep.rejectionReason}
                    </span>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">{ep.qaFeedback}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                      <span>Rig: {ep.rigId}</span>
                      <span>Recorded Latency: {ep.teleopLatencyMs}ms</span>
                    </div>
                    <button
                      onClick={() => onNavigateToUpload(ep.recipeId)}
                      className="rounded-lg bg-cyan-500/20 border border-cyan-500/30 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30"
                    >
                      Re-Ingest Episode →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payout History Tab */}
      {activeTab === "history" && (
        <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Settlement & ACH Wire History
            </h3>
            <span className="font-mono text-xs text-zinc-400">Direct Deposit: JPMorgan Chase (•••4892)</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-3 px-3">Period</th>
                  <th className="py-3 px-3">Total / Approved</th>
                  <th className="py-3 px-3">Gross Amount</th>
                  <th className="py-3 px-3">Wire Reference</th>
                  <th className="py-3 px-3">Paid Date</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/40">
                    <td className="py-3.5 px-3 font-semibold text-zinc-200 font-sans">{p.period}</td>
                    <td className="py-3.5 px-3 text-zinc-400">
                      {p.episodesCount} total ({p.approvedCount} approved)
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-400 text-sm">
                      {formatCurrency(p.grossAmount)}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-500 text-[11px]">{p.transactionRef}</td>
                    <td className="py-3.5 px-3 text-zinc-400 font-sans">{p.paidDate}</td>
                    <td className="py-3.5 px-3 text-right font-sans">
                      {p.status === "PAID" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/40">
                          <CheckCircle2 className="h-3 w-3" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/60 px-2.5 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-500/40">
                          <Clock className="h-3 w-3" /> Processing
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
