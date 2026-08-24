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
  operatorName: string;
  currentEarnings: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  submissions,
  onNavigateToUpload,
  onNavigateToQA,
  operatorName,
  currentEarnings,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeSubmission | null>(null);

  // Derived metrics
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter((s) => s.status === "APPROVED").length;
  const pendingSubmissions = submissions.filter((s) => s.status === "PENDING").length;
  const approvalPercentage = totalSubmissions > 0 ? ((approvedSubmissions / totalSubmissions) * 100).toFixed(1) : "0.0";

  // Calculate weekly growth (last 7 days vs prior 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const recentCount = submissions.filter(s => new Date(s.submittedAt) >= sevenDaysAgo).length;
  const previousCount = submissions.filter(s => {
    const date = new Date(s.submittedAt);
    return date >= fourteenDaysAgo && date < sevenDaysAgo;
  }).length;
  const weeklyGrowth = previousCount > 0
    ? Math.round(((recentCount - previousCount) / previousCount) * 100)
    : null;

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
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-zinc-100 text-zinc-600 px-2 py-0.5 font-mono text-[10px] font-bold border border-zinc-200">
                CURRENT PERIOD
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
              Welcome back, <span className="text-black">{operatorName || "Creator"}</span>
            </h2>
            <p className="mt-1 text-xs text-zinc-500 max-w-2xl">
              You have 4 tasks available to record today. Capture video using your smartphone and submit your drive links to earn.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToUpload()}
              className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span>Submit Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Required Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Videos Submitted */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Total Videos Submitted
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900">
              {totalSubmissions.toLocaleString()}
            </span>
            {weeklyGrowth !== null && (
              <span className={`text-xs font-semibold flex items-center ${weeklyGrowth >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                <TrendingUp className={`h-3 w-3 mr-0.5 inline ${weeklyGrowth < 0 ? 'rotate-180' : ''}`} />
                {weeklyGrowth >= 0 ? '+' : ''}{weeklyGrowth}%
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">{totalSubmissions} videos submitted this period</p>
        </div>

        {/* Metric 2: QA Approved */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              QA Approved
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900">
              {approvalPercentage}%
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              ({approvedSubmissions.toLocaleString()} videos)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">
            {totalSubmissions === 0 ? "No ratings yet" : parseFloat(approvalPercentage) >= 90 ? "Excellent approval rating" : "Average approval rating"}
          </p>
        </div>

        {/* Metric 3: Pending Review */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Pending Review
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900">
              {pendingSubmissions}
            </span>
            {pendingSubmissions > 0 && (
              <span className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-zinc-700">
                In Pipeline
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">
            {pendingSubmissions > 0 ? "Currently being reviewed by QA team" : "No pending reviews"}
          </p>
        </div>

        {/* Metric 4: Current Earnings */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Current Earnings
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900">
              {formatCurrency(currentEarnings)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>Settlement: Next Cycle</span>
            <button
              onClick={onNavigateToQA}
              className="text-[10px] font-semibold text-black hover:underline"
            >
              Breakdown →
            </button>
          </p>
        </div>
      </div>



      {/* Recent Activity Table Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {/* Table Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-zinc-200">
          <div>
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <span>Recent Submissions</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-500 border border-zinc-200">
                {filteredSubmissions.length} videos
              </span>
            </h3>
            <p className="text-xs text-zinc-500">
              Track the status of your video submissions
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
                className="rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 placeholder-zinc-500 focus:border-black focus:outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-xl border border-zinc-200 bg-white p-1 text-xs">
              {["ALL", "APPROVED", "PENDING", "REJECTED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`rounded-lg px-2.5 py-1 font-semibold text-[11px] transition-all ${
                    statusFilter === tab
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900"
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
              <tr className="border-b border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
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
            <tbody className="divide-y divide-zinc-200 font-sans">
              {filteredSubmissions.map((ep) => {
                const isApproved = ep.status === "APPROVED";
                const isPending = ep.status === "PENDING";
                const isRejected = ep.status === "REJECTED";

                return (
                  <tr
                    key={ep.id}
                    className="group transition-colors hover:bg-white cursor-pointer"
                    onClick={() => setSelectedEpisode(ep)}
                  >
                    {/* Episode ID */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-black group-hover:underline">
                          {ep.id}
                        </span>
                      </div>
                    </td>

                    {/* Task Name */}
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-zinc-800 block">{ep.recipeTitle}</span>
                      <span className="text-[10px] font-mono text-zinc-500">{ep.recipeId}</span>
                    </td>

                    {/* Environment */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border ${
                          ep.environment === "Clinical"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : ep.environment === "Household"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : ep.environment === "Industrial"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {ep.environment}
                      </span>
                    </td>

                    {/* Duration / Frames */}
                    <td className="py-3.5 px-3 font-mono text-zinc-700">
                      <span>{ep.durationSeconds}s</span>
                      <span className="text-[10px] text-zinc-500 block">
                        {ep.totalFrames.toLocaleString()} frames
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-3 font-mono text-zinc-500">
                      <span>{formatBytes(ep.totalSize)}</span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-zinc-500">
                      {ep.submittedAt}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center">
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          Approved
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200">
                          <Clock className="h-3 w-3 animate-spin text-amber-600" />
                          Pending
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 border border-rose-200">
                          <XCircle className="h-3 w-3 text-rose-600" />
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
                        className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-700"
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
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-black">
                  {selectedEpisode.id}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-semibold text-zinc-800">
                  {selectedEpisode.recipeTitle}
                </span>
              </div>
              <button
                onClick={() => setSelectedEpisode(null)}
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* QA Status block */}
              <div
                className={`rounded-xl border p-4 ${
                  selectedEpisode.status === "APPROVED"
                    ? "border-emerald-200 bg-emerald-50"
                    : selectedEpisode.status === "PENDING"
                    ? "border-amber-200 bg-amber-50"
                    : "border-rose-200 bg-rose-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedEpisode.status === "APPROVED" && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    )}
                    {selectedEpisode.status === "PENDING" && (
                      <Clock className="h-5 w-5 text-amber-600" />
                    )}
                    {selectedEpisode.status === "REJECTED" && (
                      <AlertOctagon className="h-5 w-5 text-rose-600" />
                    )}
                    <div>
                      <h4 className="font-bold text-zinc-900">
                        Status: {selectedEpisode.status}
                      </h4>
                      {selectedEpisode.qaScore && (
                        <p className="text-[11px] text-zinc-500">
                          QA Score: <span className="font-bold text-zinc-800">{selectedEpisode.qaScore}/100</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">
                    Reviewer: {selectedEpisode.qaReviewer}
                  </span>
                </div>

                {selectedEpisode.rejectionReason && (
                  <div className="mt-3 rounded-lg bg-rose-100 p-2.5 border border-rose-200 text-rose-800">
                    <span className="font-bold block text-[11px]">Rejection Reason:</span>
                    <p className="mt-0.5 text-[11px]">{selectedEpisode.rejectionReason}</p>
                  </div>
                )}

                {selectedEpisode.qaFeedback && (
                  <p className="mt-2 text-zinc-700 leading-relaxed text-[11px]">
                    <span className="font-semibold text-zinc-500">Notes: </span>
                    {selectedEpisode.qaFeedback}
                  </p>
                )}
              </div>

              {/* Multimodal Package details */}
              <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2">
                <h5 className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                  Multimodal LeRobot Package Files
                </h5>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                  <div className="rounded-lg bg-zinc-50 p-2 border border-zinc-200">
                    <span className="text-zinc-500 block text-[9px]">rgb.mp4</span>
                    <span className="text-black font-semibold">{formatBytes(selectedEpisode.rgbSize)}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-2 border border-zinc-200">
                    <span className="text-zinc-500 block text-[9px]">depth.mp4</span>
                    <span className="text-black font-semibold">{formatBytes(selectedEpisode.depthSize)}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-2 border border-zinc-200">
                    <span className="text-zinc-500 block text-[9px]">kinematics.parquet</span>
                    <span className="text-black font-semibold">{formatBytes(selectedEpisode.kinematicsSize)}</span>
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
                  className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-cyan-400"
                >
                  Re-Ingest This Recipe
                </button>
              )}
              <button
                onClick={() => setSelectedEpisode(null)}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
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
