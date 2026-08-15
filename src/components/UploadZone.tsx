"use client";

import React, { useState, useEffect } from "react";
import { Link2, Sparkles, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { Recipe, EpisodeSubmission } from "@/lib/types";

interface UploadZoneProps {
  recipes: Recipe[];
  initialRecipeId?: string;
  onUploadComplete: (newEpisode: EpisodeSubmission) => void;
  onNavigateToDashboard: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  recipes,
  initialRecipeId,
  onUploadComplete,
  onNavigateToDashboard,
}) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(
    initialRecipeId || recipes[0]?.id || "rec-dish-01"
  );
  const [driveLink, setDriveLink] = useState("");
  const [notes, setNotes] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [createdEpisode, setCreatedEpisode] = useState<EpisodeSubmission | null>(null);

  useEffect(() => {
    if (initialRecipeId) {
      setSelectedRecipeId(initialRecipeId);
    }
  }, [initialRecipeId]);

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];
  const isValidLink = driveLink.trim().length > 5 && driveLink.includes("http");

  const handleSubmit = () => {
    if (!isValidLink) return;
    setStatus("submitting");

    // Simulate backend submission delay
    setTimeout(() => {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#000000", "#10b981", "#ffffff"],
        });
      } catch {
        // gracefully catch if confetti fails
      }

      const newEp: EpisodeSubmission = {
        id: `VID-${Math.floor(8000 + Math.random() * 1000)}`,
        recipeId: selectedRecipe.id,
        recipeTitle: selectedRecipe.title,
        environment: selectedRecipe.environment,
        submittedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        durationSeconds: selectedRecipe.expectedDurationSec,
        totalFrames: 0, // Not applicable for raw drive links until processed
        rgbSize: 0,
        depthSize: 0,
        kinematicsSize: 0,
        totalSize: 0, // To be determined by backend
        status: "PENDING",
        qaReviewer: "Pending QA Auto-Ingest",
        qaFeedback: `Submitted via link. Creator notes: "${notes || "None"}". Waiting for QA team to download and process.`,
        s3Hash: "pending_download",
        rigId: "Smartphone/Camera",
        teleopLatencyMs: 0,
      };

      setCreatedEpisode(newEp);
      setStatus("success");
      onUploadComplete(newEp);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Submit Video
        </h2>
        <p className="mt-1 text-xs text-zinc-500 max-w-2xl">
          Complete your task by providing a shareable link (Google Drive, iCloud, Dropbox) to your recorded video.
        </p>
      </div>

      {status === "idle" || status === "submitting" ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
          {/* Step 1: Select Task */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wider">
              1. Which task did you record?
            </label>
            <div className="relative">
              <select
                value={selectedRecipeId}
                onChange={(e) => setSelectedRecipeId(e.target.value)}
                disabled={status === "submitting"}
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-white py-3 pl-4 pr-10 text-xs font-semibold text-zinc-900 transition-all focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:outline-none disabled:opacity-50"
              >
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id} className="bg-white py-2">
                    {recipe.title} (Earn ${recipe.payoutRate.toFixed(2)})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500">
                ▼
              </div>
            </div>
          </div>

          {/* Step 2: Paste Link */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wider">
              2. Paste your shareable video link
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                <Link2 className="h-4 w-4" />
              </div>
              <input
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                disabled={status === "submitting"}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 placeholder-zinc-400 transition-all focus:border-black focus:ring-2 focus:ring-black focus:outline-none disabled:opacity-50"
              />
            </div>
            <p className="mt-2 text-[11px] text-zinc-500">
              * Ensure the link sharing permissions are set to <strong className="text-zinc-700">"Anyone with the link can view"</strong> so our QA team can access it.
            </p>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wider">
              Optional Notes for Reviewer
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={status === "submitting"}
              placeholder="e.g. My camera died near the end but I caught all the steps."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs font-medium text-zinc-900 placeholder-zinc-400 transition-all focus:border-black focus:ring-2 focus:ring-black focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-zinc-100">
            <button
              onClick={handleSubmit}
              disabled={!isValidLink || status === "submitting"}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-white" />
                  <span>Submit Video Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Video Successfully Submitted!</h3>
          <p className="text-xs text-zinc-600 max-w-md mx-auto mb-6">
            Your drive link has been sent to our QA team for review. You will be notified once it is approved and the ${selectedRecipe.payoutRate.toFixed(2)} payout is released.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateToDashboard}
              className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => {
                setDriveLink("");
                setNotes("");
                setStatus("idle");
              }}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Submit Another Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
