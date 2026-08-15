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

  const currentCycleBalance = payouts.filter(p => p.status === "PROCESSING").reduce((acc, p) => acc + p.grossAmount, 0);
  const lifetimeClearedEarnings = payouts.filter(p => p.status === "PAID").reduce((acc, p) => acc + p.grossAmount, 0);
  const totalApprovedVideos = payouts.reduce((acc, p) => acc + p.approvedCount, 0);
  const qualityTierPercentage = submissions.length > 0 ? ((approvedEpisodes.length / submissions.length) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                FINANCIAL & QUALITY ASSURANCE
              </span>
              <span className="text-xs text-zinc-500">Automated Escrow & Video Review</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              Payouts & QA Diagnostics
            </h2>
            <p className="mt-1 text-xs text-zinc-500 max-w-2xl">
              Track your earnings per approved video submission, review feedback for any rejected
              videos, and access your weekly payout receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-zinc-200 bg-white p-1 text-xs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`rounded-lg px-3 py-1.5 font-semibold text-xs transition-all ${
                  activeTab === "overview"
                    ? "bg-zinc-100 text-cyan-300 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Earnings Summary
              </button>
              <button
                onClick={() => setActiveTab("rejections")}
                className={`rounded-lg px-3 py-1.5 font-semibold text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === "rejections"
                    ? "bg-zinc-100 text-rose-300 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
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
                    ? "bg-zinc-100 text-emerald-300 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Current Cycle Balance
              </span>
              <div className="mt-2 text-3xl font-black font-mono text-emerald-600">
                {formatCurrency(currentCycleBalance)}
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">Scheduled for next payout cycle</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Lifetime Cleared Earnings
              </span>
              <div className="mt-2 text-3xl font-black font-mono text-zinc-900">
                {formatCurrency(lifetimeClearedEarnings)}
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">{totalApprovedVideos} approved video submissions</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Creator Quality Tier
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-black">{qualityTierPercentage}%</span>
                <span className="text-xs font-semibold text-emerald-400">Tier 1 Verified</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">Quality score based on approvals</p>
            </div>
          </div>

          {/* Breakdown by Recipe */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider pb-3 border-b border-zinc-200">
              Earnings By Recipe Domain
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-700">Clinical - Surgical Tool Handover</span>
                  <span className="font-mono text-cyan-300 font-bold">$0.00 (0 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full w-[0%] rounded-full bg-cyan-400"></div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-zinc-700">Household - Load Dishwasher A</span>
                  <span className="font-mono text-emerald-300 font-bold">$0.00 (0 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full w-[0%] rounded-full bg-emerald-400"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-700">Warehouse - Cable Routing Bay B</span>
                  <span className="font-mono text-purple-300 font-bold">$0.00 (0 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full w-[0%] rounded-full bg-purple-400"></div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-zinc-700">Industrial & Agriculture</span>
                  <span className="font-mono text-amber-300 font-bold">$0.00 (0 ep)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full w-[0%] rounded-full bg-amber-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QA Rejections Diagnostics Tab */}
      {activeTab === "rejections" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertOctagon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Video Review Feedback
                </h3>
                <p className="text-xs text-zinc-500">
                  Review why specific videos were not accepted to improve your future submissions.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {rejectedEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  className="rounded-xl border border-rose-500/30 bg-white p-4 space-y-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-zinc-200">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-sm font-bold text-rose-400">{ep.id}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-semibold text-zinc-800">{ep.recipeTitle}</span>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">{ep.submittedAt}</span>
                  </div>

                  <div className="rounded-lg bg-rose-100 p-3 border border-rose-200 text-xs text-rose-800">
                    <span className="font-bold block text-rose-900 mb-1">
                      Critical Reason: {ep.rejectionReason}
                    </span>
                    <p className="text-zinc-700 text-[11px] leading-relaxed">{ep.qaFeedback}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                      <span>Device: {ep.rigId}</span>
                      <span>Upload Latency: {ep.teleopLatencyMs}ms</span>
                    </div>
                    <button
                      onClick={() => onNavigateToUpload(ep.recipeId)}
                      className="rounded-lg bg-black border border-black px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-800"
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
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Settlement & ACH Wire History
            </h3>
            <span className="font-mono text-xs text-zinc-500">Direct Deposit: JPMorgan Chase (•••4892)</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-3 px-3">Period</th>
                  <th className="py-3 px-3">Total / Approved</th>
                  <th className="py-3 px-3">Gross Amount</th>
                  <th className="py-3 px-3">Wire Reference</th>
                  <th className="py-3 px-3">Paid Date</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-mono">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-white">
                    <td className="py-3.5 px-3 font-semibold text-zinc-800 font-sans">{p.period}</td>
                    <td className="py-3.5 px-3 text-zinc-500">
                      {p.episodesCount} total ({p.approvedCount} approved)
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-600 text-sm">
                      {formatCurrency(p.grossAmount)}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-500 text-[11px]">{p.transactionRef}</td>
                    <td className="py-3.5 px-3 text-zinc-500 font-sans">{p.paidDate}</td>
                    <td className="py-3.5 px-3 text-right font-sans">
                      {p.status === "PAID" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 border border-amber-200">
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
