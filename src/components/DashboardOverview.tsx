"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  Layers,
  Database,
  ArrowUpRight,
  Info,
  ExternalLink,
  ShieldCheck,
  AlertOctagon,
  HardDrive,
  FileVideo,
} from "lucide-react";
import { EpisodeSubmission, QAStatus } from "@/lib/types";
import { formatBytes, formatCurrency } from "@/lib/utils";

interface DashboardOverviewProps {
  submissions: EpisodeSubmission[];
  onNavigateToUpload: (recipeId?: string) => void;
  onNavigateToQA: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  submissions,
  onNavigateToUpload,
  onNavigateToQA,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeSubmission | null>(null);

  // Derived metrics
  const totalSubmissions = submissions.length + 1420; // 1428 total lifetime
  const approvedSubmissions = submissions.filter((s) => s.status === "APPROVED").length + 1371;
  const pendingSubmissions = submissions.filter((s) => s.status === "PENDING").length + 36;
  const approvalPercentage = ((approvedSubmissions / totalSubmissions) * 100).toFixed(1);
  const currentEarnings = 4890.0;

  // Filtered recent activity
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.environment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === "ALL" ? true : item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Rig Context */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-cyan-950/30 p-6 glass-panel">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                ACTIVE CYCLE • WEEK 32
              </span>
              <span className="text-xs text-zinc-400">LeRobot Multimodal Ingest</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Welcome back, <span className="text-cyan-400">Operator 042</span>
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
              Your bimanual ALOHA teleoperation rig is streaming live with 3.8ms latency. 4 target
              recipes currently have increased payout bounties.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToUpload()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ingest New Episode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Required Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Episodes Submitted */}
        <div className="rounded-2xl border border-zinc-800 glass-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Episodes Submitted
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-100">
              {totalSubmissions.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5 inline" /> +12%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">128 episodes ingested in current cycle</p>
        </div>

        {/* Metric 2: QA Approved */}
        <div className="rounded-2xl border border-emerald-500/30 glass-card p-5 bg-emerald-950/10 shadow-[0_0_25px_rgba(16,185,129,0.08)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              QA Approved
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-emerald-400 neon-green-glow">
              {approvalPercentage}%
            </span>
            <span className="text-xs font-semibold text-emerald-500">
              ({approvedSubmissions.toLocaleString()} runs)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400">Exceeds fleet threshold target (95.0%)</p>
        </div>

        {/* Metric 3: Pending Review */}
        <div className="rounded-2xl border border-amber-500/30 glass-card p-5 bg-amber-950/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Pending Review
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-amber-400">
              {pendingSubmissions}
            </span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
              In Pipeline
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400">Automated Kinematics + Occlusion check</p>
        </div>

        {/* Metric 4: Current Earnings */}
        <div className="rounded-2xl border border-cyan-500/30 glass-card p-5 bg-cyan-950/10 shadow-[0_0_25px_rgba(0,240,255,0.08)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Current Earnings
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-cyan-300 neon-cyan-glow">
              {formatCurrency(currentEarnings)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Settlement: Aug 11</span>
            <button
              onClick={onNavigateToQA}
              className="text-[10px] font-semibold text-cyan-400 hover:underline"
            >
              Breakdown →
            </button>
          </p>
        </div>
      </div>

      {/* Telemetry & Pipeline Status Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 glass-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                S3 Storage Buffer
              </span>
            </div>
            <span className="font-mono text-xs text-cyan-400">100 Gbps Direct</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Current Session Staging:</span>
              <span className="font-mono text-zinc-200">34.18 GB / 100 GB</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[34%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>Target: us-east-1 S3</span>
              <span className="text-emerald-400">Fast Path Active</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 glass-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <FileVideo className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                Sensor Sync Parity
              </span>
            </div>
            <span className="font-mono text-xs text-emerald-400">99.98% Parity</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="rounded-lg bg-zinc-900/80 p-2 border border-zinc-800">
              <span className="text-zinc-500 block text-[9px] uppercase">RGB Stream</span>
              <span className="font-mono font-bold text-emerald-400">30.00 FPS</span>
            </div>
            <div className="rounded-lg bg-zinc-900/80 p-2 border border-zinc-800">
              <span className="text-zinc-500 block text-[9px] uppercase">Depth Map</span>
              <span className="font-mono font-bold text-emerald-400">30.00 FPS</span>
            </div>
            <div className="rounded-lg bg-zinc-900/80 p-2 border border-zinc-800">
              <span className="text-zinc-500 block text-[9px] uppercase">Kinematics</span>
              <span className="font-mono font-bold text-emerald-400">200 Hz</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                QA Auto-Review Engine
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">LeRobot v2.1</span>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Automated verification checks: Timestamp sync, 6-DoF acceleration bounds, and depth
            frame drop detection.
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500 text-[11px]">Avg QA Turnaround:</span>
            <span className="font-mono text-zinc-200 font-semibold">1.4 minutes</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Card */}
      <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
        {/* Table Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-zinc-800">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <span>Recent Activity Submissions</span>
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400">
                {filteredSubmissions.length} episodes
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Audited logs of your teleoperated episodes and real-time QA grading
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search Episode ID, Recipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-xl border border-zinc-800 bg-zinc-900/90 p-1 text-xs">
              {["ALL", "APPROVED", "PENDING", "REJECTED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`rounded-lg px-2.5 py-1 font-semibold text-[11px] transition-all ${
                    statusFilter === tab
                      ? "bg-zinc-800 text-cyan-300 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-3 px-3">Episode ID</th>
                <th className="py-3 px-3">Task / Recipe</th>
                <th className="py-3 px-3">Environment</th>
                <th className="py-3 px-3">Duration / Frames</th>
                <th className="py-3 px-3">Package Size</th>
                <th className="py-3 px-3">Submission Date</th>
                <th className="py-3 px-3 text-center">QA Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {filteredSubmissions.map((ep) => {
                const isApproved = ep.status === "APPROVED";
                const isPending = ep.status === "PENDING";
                const isRejected = ep.status === "REJECTED";

                return (
                  <tr
                    key={ep.id}
                    className="group transition-colors hover:bg-zinc-900/60 cursor-pointer"
                    onClick={() => setSelectedEpisode(ep)}
                  >
                    {/* Episode ID */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400 group-hover:underline">
                          {ep.id}
                        </span>
                      </div>
                    </td>

                    {/* Task Name */}
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-zinc-200 block">{ep.recipeTitle}</span>
                      <span className="text-[10px] font-mono text-zinc-500">{ep.recipeId}</span>
                    </td>

                    {/* Environment */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border ${
                          ep.environment === "Clinical"
                            ? "bg-purple-950/40 text-purple-300 border-purple-800/40"
                            : ep.environment === "Household"
                            ? "bg-blue-950/40 text-blue-300 border-blue-800/40"
                            : ep.environment === "Industrial"
                            ? "bg-amber-950/40 text-amber-300 border-amber-800/40"
                            : "bg-emerald-950/40 text-emerald-300 border-emerald-800/40"
                        }`}
                      >
                        {ep.environment}
                      </span>
                    </td>

                    {/* Duration / Frames */}
                    <td className="py-3.5 px-3 font-mono text-zinc-300">
                      <span>{ep.durationSeconds}s</span>
                      <span className="text-[10px] text-zinc-500 block">
                        {ep.totalFrames.toLocaleString()} frames
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-3 font-mono text-zinc-400">
                      <span>{formatBytes(ep.totalSize)}</span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-zinc-400">
                      {ep.submittedAt}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center">
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                          <CheckCircle2 className="h-3 w-3" />
                          Approved
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/60 px-2.5 py-1 text-[11px] font-bold text-amber-400 border border-amber-500/40">
                          <Clock className="h-3 w-3 animate-spin" />
                          Pending
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-950/60 px-2.5 py-1 text-[11px] font-bold text-rose-400 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
                          <XCircle className="h-3 w-3" />
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEpisode(ep);
                        }}
                        className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:bg-zinc-800 hover:text-cyan-300"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Episode Inspection Modal */}
      {selectedEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-2xl border border-zinc-800 glass-dropdown p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-cyan-400">
                  {selectedEpisode.id}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-semibold text-zinc-200">
                  {selectedEpisode.recipeTitle}
                </span>
              </div>
              <button
                onClick={() => setSelectedEpisode(null)}
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* QA Status block */}
              <div
                className={`rounded-xl border p-4 ${
                  selectedEpisode.status === "APPROVED"
                    ? "border-emerald-500/30 bg-emerald-950/20"
                    : selectedEpisode.status === "PENDING"
                    ? "border-amber-500/30 bg-amber-950/20"
                    : "border-rose-500/30 bg-rose-950/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedEpisode.status === "APPROVED" && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    )}
                    {selectedEpisode.status === "PENDING" && (
                      <Clock className="h-5 w-5 text-amber-400" />
                    )}
                    {selectedEpisode.status === "REJECTED" && (
                      <AlertOctagon className="h-5 w-5 text-rose-400" />
                    )}
                    <div>
                      <h4 className="font-bold text-zinc-100">
                        Status: {selectedEpisode.status}
                      </h4>
                      {selectedEpisode.qaScore && (
                        <p className="text-[11px] text-zinc-400">
                          QA Score: <span className="font-bold text-zinc-200">{selectedEpisode.qaScore}/100</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    Reviewer: {selectedEpisode.qaReviewer}
                  </span>
                </div>

                {selectedEpisode.rejectionReason && (
                  <div className="mt-3 rounded-lg bg-rose-950/50 p-2.5 border border-rose-500/30 text-rose-200">
                    <span className="font-bold block text-[11px]">Rejection Reason:</span>
                    <p className="mt-0.5 text-[11px]">{selectedEpisode.rejectionReason}</p>
                  </div>
                )}

                {selectedEpisode.qaFeedback && (
                  <p className="mt-2 text-zinc-300 leading-relaxed text-[11px]">
                    <span className="font-semibold text-zinc-400">Notes: </span>
                    {selectedEpisode.qaFeedback}
                  </p>
                )}
              </div>

              {/* Multimodal Package details */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
                <h5 className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                  Multimodal LeRobot Package Files
                </h5>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                  <div className="rounded-lg bg-zinc-950 p-2 border border-zinc-800">
                    <span className="text-zinc-500 block text-[9px]">rgb.mp4</span>
                    <span className="text-cyan-400 font-semibold">{formatBytes(selectedEpisode.rgbSize)}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-950 p-2 border border-zinc-800">
                    <span className="text-zinc-500 block text-[9px]">depth.mp4</span>
                    <span className="text-cyan-400 font-semibold">{formatBytes(selectedEpisode.depthSize)}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-950 p-2 border border-zinc-800">
                    <span className="text-zinc-500 block text-[9px]">kinematics.parquet</span>
                    <span className="text-cyan-400 font-semibold">{formatBytes(selectedEpisode.kinematicsSize)}</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-zinc-500 font-mono space-y-1">
                  <div>S3 Key Hash: {selectedEpisode.s3Hash}</div>
                  <div>Teleoperation Rig: {selectedEpisode.rigId} (Latency: {selectedEpisode.teleopLatencyMs}ms)</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              {selectedEpisode.status === "REJECTED" && (
                <button
                  onClick={() => {
                    setSelectedEpisode(null);
                    onNavigateToUpload(selectedEpisode.recipeId);
                  }}
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-cyan-400"
                >
                  Re-Ingest This Recipe
                </button>
              )}
              <button
                onClick={() => setSelectedEpisode(null)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
