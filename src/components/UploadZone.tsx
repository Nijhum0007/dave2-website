"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  FileVideo,
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HardDrive,
  RefreshCw,
  Play,
  RotateCcw,
  Zap,
  Info,
  Layers,
  Check,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Recipe, EpisodeSubmission, IngestionFileItem } from "@/lib/types";
import { formatBytes } from "@/lib/utils";

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
  // Step 1: Selected Recipe
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(
    initialRecipeId || recipes[0]?.id || "rec-dish-01"
  );

  // Operator Rig metadata
  const [rigNotes, setRigNotes] = useState("");
  const [teleopConfidence, setTeleopConfidence] = useState<"Optimal" | "Minor Occlusion" | "Contact Rich">("Optimal");

  // Step 2: Three Required LeRobot files
  const [filesState, setFilesState] = useState<{
    rgb: IngestionFileItem;
    depth: IngestionFileItem;
    kinematics: IngestionFileItem;
  }>({
    rgb: {
      file: null,
      name: "",
      expectedName: "rgb.mp4",
      requiredType: "First-person / Eye-in-hand video stream (1080p @ 30/60fps)",
      description: "H.264 / MP4 Ego Camera View with timestamp sync metadata",
      size: 0,
      isValid: false,
    },
    depth: {
      file: null,
      name: "",
      expectedName: "depth.mp4",
      requiredType: "Spatial depth map / Z-distance map (16-bit millimeter grid)",
      description: "RealSense / ZED Depth channel aligned with RGB frame index",
      size: 0,
      isValid: false,
    },
    kinematics: {
      file: null,
      name: "",
      expectedName: "kinematics.parquet",
      requiredType: "6-DoF End-effector trajectories, joint angles & 200Hz IMU",
      description: "Apache Parquet schema with delta_qpos, effort, and teleop actions",
      size: 0,
      isValid: false,
    },
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "verifying" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bytesUploaded, setBytesUploaded] = useState(0);
  const [uploadSpeedMbps, setUploadSpeedMbps] = useState(74.2);
  const [currentStepText, setCurrentStepText] = useState("Initializing S3 Multipart...");
  const [createdEpisode, setCreatedEpisode] = useState<EpisodeSubmission | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update selected recipe if prop changes
  useEffect(() => {
    if (initialRecipeId) {
      setSelectedRecipeId(initialRecipeId);
    }
  }, [initialRecipeId]);

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  // Calculate total package size
  const totalPackageBytes =
    filesState.rgb.size + filesState.depth.size + filesState.kinematics.size;
  const allFilesValid =
    filesState.rgb.isValid &&
    filesState.depth.isValid &&
    filesState.kinematics.isValid;

  // Process dropped or selected files
  const handleFilesChosen = (fileList: FileList | File[]) => {
    const updated = { ...filesState };
    const filesArray = Array.from(fileList);

    filesArray.forEach((file) => {
      const lowerName = file.name.toLowerCase();

      if (lowerName === "rgb.mp4" || lowerName.includes("rgb")) {
        updated.rgb = {
          ...updated.rgb,
          file,
          name: file.name,
          size: file.size > 0 ? file.size : 2240000000,
          isValid: true,
          validationError: undefined,
        };
      } else if (lowerName === "depth.mp4" || lowerName.includes("depth")) {
        updated.depth = {
          ...updated.depth,
          file,
          name: file.name,
          size: file.size > 0 ? file.size : 1890000000,
          isValid: true,
          validationError: undefined,
        };
      } else if (
        lowerName === "kinematics.parquet" ||
        lowerName.endsWith(".parquet") ||
        lowerName.includes("kinematics")
      ) {
        updated.kinematics = {
          ...updated.kinematics,
          file,
          name: file.name,
          size: file.size > 0 ? file.size : 142000000,
          isValid: true,
          validationError: undefined,
        };
      }
    });

    setFilesState(updated);
  };

  // Quick Demo Auto-Loader (Pre-fills valid 4.27 GB LeRobot files)
  const handleLoadSampleBatch = () => {
    setFilesState({
      rgb: {
        file: new File(["mock-rgb-stream-data"], "rgb.mp4", { type: "video/mp4" }),
        name: "rgb.mp4",
        expectedName: "rgb.mp4",
        requiredType: "First-person / Eye-in-hand video stream (1080p @ 30fps)",
        description: "H.264 / MP4 Ego Camera View with timestamp sync metadata",
        size: 2240000000, // 2.24 GB
        isValid: true,
      },
      depth: {
        file: new File(["mock-depth-stream-data"], "depth.mp4", { type: "video/mp4" }),
        name: "depth.mp4",
        expectedName: "depth.mp4",
        requiredType: "Spatial depth map / Z-distance map (16-bit millimeter grid)",
        description: "RealSense D435i Depth channel aligned with RGB frame index",
        size: 1890000000, // 1.89 GB
        isValid: true,
      },
      kinematics: {
        file: new File(["mock-parquet-teleop"], "kinematics.parquet", {
          type: "application/octet-stream",
        }),
        name: "kinematics.parquet",
        expectedName: "kinematics.parquet",
        requiredType: "6-DoF End-effector trajectories, joint angles & 200Hz IMU",
        description: "Apache Parquet schema with delta_qpos, effort, and teleop actions",
        size: 142000000, // 142 MB
        isValid: true,
      },
    });
  };

  const handleClearFiles = () => {
    setFilesState({
      rgb: { ...filesState.rgb, file: null, name: "", size: 0, isValid: false },
      depth: { ...filesState.depth, file: null, name: "", size: 0, isValid: false },
      kinematics: {
        ...filesState.kinematics,
        file: null,
        name: "",
        size: 0,
        isValid: false,
      },
    });
    setUploadStatus("idle");
    setUploadProgress(0);
    setBytesUploaded(0);
    setCreatedEpisode(null);
  };

  // Simulated S3 Multipart Upload Sequence
  const handleStartUpload = () => {
    if (!allFilesValid) return;

    setUploadStatus("uploading");
    setUploadProgress(0);
    setBytesUploaded(0);
    setCurrentStepText("Negotiating AWS S3 Presigned Multipart URLs...");

    const targetTotalBytes = totalPackageBytes || 4272000000;
    const durationMs = 4500; // Simulated ~4.5 seconds for visual thrill
    const intervalMs = 100;
    const steps = durationMs / intervalMs;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setUploadProgress(progress);
      setBytesUploaded(Math.round((progress / 100) * targetTotalBytes));

      // Fluctuating realistic upload speed (65 - 85 MB/s)
      setUploadSpeedMbps(+(65 + Math.sin(currentStep) * 15 + Math.random() * 5).toFixed(1));

      if (progress < 25) {
        setCurrentStepText("Streaming S3 Chunk 1/4: rgb.mp4 (High-Bitrate 1080p)...");
      } else if (progress < 55) {
        setCurrentStepText("Streaming S3 Chunk 2/4: depth.mp4 (Spatial Z-Grid)...");
      } else if (progress < 85) {
        setCurrentStepText("Streaming S3 Chunk 3/4: kinematics.parquet (200Hz Sensor IMU)...");
      } else if (progress < 100) {
        setCurrentStepText("Finalizing S3 Multipart Checksum (SHA-256)...");
      } else {
        clearInterval(interval);
        setUploadStatus("verifying");
        setCurrentStepText("Running Automated LeRobot QA Parity & Timestamp Verification...");

        setTimeout(() => {
          setUploadStatus("success");
          setCurrentStepText("Multimodal Package Successfully Ingested!");

          // Fire celebratory confetti!
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#00f0ff", "#10b981", "#ffffff"],
            });
          } catch {
            // gracefully catch if confetti fails
          }

          // Create new episode object
          const newEp: EpisodeSubmission = {
            id: `EP-${Math.floor(8943 + Math.random() * 100)}-09`,
            recipeId: selectedRecipe.id,
            recipeTitle: selectedRecipe.title,
            environment: selectedRecipe.environment,
            submittedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
            durationSeconds: selectedRecipe.expectedDurationSec,
            totalFrames: selectedRecipe.expectedDurationSec * selectedRecipe.targetFps,
            rgbSize: filesState.rgb.size,
            depthSize: filesState.depth.size,
            kinematicsSize: filesState.kinematics.size,
            totalSize: targetTotalBytes,
            status: "PENDING",
            qaReviewer: "Auto-QA Pipeline (Stage 1 Passing)",
            qaFeedback: `Live ingestion successful. Operator notes: "${rigNotes || "Normal demonstration cycle"}". Waiting for frame occlusion audit.`,
            s3Hash: `sha256:${Math.random().toString(36).substring(2, 12)}...`,
            rigId: "RIG-042-ALPHA",
            teleopLatencyMs: 3.8,
          };

          setCreatedEpisode(newEp);
          onUploadComplete(newEp);
        }, 1200);
      }
    }, intervalMs);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                INGESTION WORKFLOW
              </span>
              <span className="text-xs text-zinc-400">LeRobot Dataset Format v2.1</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Multimodal Ingestion Pipeline
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
              High-throughput S3 direct upload for physical AI teleoperation. Ingests synchronized
              tri-channel packages (<code className="text-cyan-300 font-mono">rgb.mp4</code>,{" "}
              <code className="text-cyan-300 font-mono">depth.mp4</code>,{" "}
              <code className="text-cyan-300 font-mono">kinematics.parquet</code>).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSampleBatch}
              disabled={uploadStatus === "uploading" || uploadStatus === "verifying"}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-900/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50"
            >
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Load Mock LeRobot Batch (4.27 GB)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Left Section (Step 1 & Step 2) + Right Section (Inspection & Summary) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Left Column (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* STEP 1: SELECT RECIPE */}
          <div className="rounded-2xl border border-zinc-800 glass-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 font-mono text-xs font-black text-cyan-400 border border-cyan-500/30">
                  1
                </span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                    Select Target Recipe
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Which robotics demonstration task did you just perform?
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                Payout: ${selectedRecipe.payoutRate.toFixed(2)}
              </span>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Assigned Teleop Recipe
              </label>
              <div className="relative">
                <select
                  value={selectedRecipeId}
                  onChange={(e) => setSelectedRecipeId(e.target.value)}
                  disabled={uploadStatus === "uploading" || uploadStatus === "verifying"}
                  className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/90 py-3 pl-4 pr-10 text-xs font-semibold text-zinc-100 transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
                >
                  {recipes.map((recipe) => (
                    <option key={recipe.id} value={recipe.id} className="bg-zinc-900 py-2">
                      {recipe.code} - {recipe.title} ({recipe.environment} • ${recipe.payoutRate.toFixed(2)})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400">
                  ▼
                </div>
              </div>

              {/* Recipe Context Snapshot */}
              <div className="mt-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 text-xs text-zinc-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-zinc-200">{selectedRecipe.description}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] font-mono text-zinc-400 border-t border-zinc-800/60 pt-2.5">
                  <span>Rig: <strong className="text-zinc-200">{selectedRecipe.hardwareRig}</strong></span>
                  <span>Target FPS: <strong className="text-cyan-400">{selectedRecipe.targetFps} FPS</strong></span>
                  <span>Target Duration: <strong className="text-zinc-200">{selectedRecipe.estimatedTime}</strong></span>
                  <span>Acceptance: <strong className="text-emerald-400">{selectedRecipe.acceptanceRate}%</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: DRAG & DROP ZONE WITH STRICT LEROBOT VALIDATION */}
          <div className="rounded-2xl border border-zinc-800 glass-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 font-mono text-xs font-black text-cyan-400 border border-cyan-500/30">
                  2
                </span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                    Drag & Drop Multimodal Data Package
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Exact 3 files required per LeRobot specification
                  </p>
                </div>
              </div>

              {allFilesValid && (
                <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Ready to Ingest
                </span>
              )}
            </div>

            {/* Drag and Drop Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleFilesChosen(e.dataTransfer.files);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-4 relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                  : allFilesValid
                  ? "border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-500/60"
                  : "border-zinc-700/80 bg-zinc-900/40 hover:border-zinc-500 hover:bg-zinc-900/70"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFilesChosen(e.target.files);
                  }
                }}
              />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/80 border border-zinc-700 shadow-inner mb-3">
                <UploadCloud className="h-7 w-7 text-cyan-400 animate-pulse" />
              </div>

              <h4 className="text-sm font-bold text-zinc-100">
                Drop your episode files here or click to browse
              </h4>
              <p className="mt-1 text-xs text-zinc-400 max-w-md">
                Files are automatically mapped into their respective LeRobot stream slots:{" "}
                <span className="font-mono text-cyan-300 font-bold">rgb.mp4</span>,{" "}
                <span className="font-mono text-cyan-300 font-bold">depth.mp4</span>, and{" "}
                <span className="font-mono text-cyan-300 font-bold">kinematics.parquet</span>.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[10px] font-mono text-zinc-300">
                  Max Package Size: 15 GB
                </span>
                <span className="rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[10px] font-mono text-zinc-300">
                  Direct S3 Multipart Enabled
                </span>
              </div>
            </div>

            {/* Three File Slots Validation Cards */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                File Validation & Stream Matching Checklist:
              </h4>

              {/* Slot 1: rgb.mp4 */}
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  filesState.rgb.isValid
                    ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-zinc-800 bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        filesState.rgb.isValid
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      <FileVideo className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-zinc-100">
                          rgb.mp4
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          (First-person video stream)
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{filesState.rgb.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {filesState.rgb.isValid ? (
                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono text-xs">
                          <span className="text-emerald-400 font-bold block">
                            {formatBytes(filesState.rgb.size)}
                          </span>
                          <span className="text-[10px] text-zinc-500">1080p @ 30 FPS</span>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                    ) : (
                      <span className="rounded-md border border-amber-500/30 bg-amber-950/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                        Missing File
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Slot 2: depth.mp4 */}
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  filesState.depth.isValid
                    ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-zinc-800 bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        filesState.depth.isValid
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-zinc-100">
                          depth.mp4
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          (Spatial depth map)
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{filesState.depth.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {filesState.depth.isValid ? (
                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono text-xs">
                          <span className="text-emerald-400 font-bold block">
                            {formatBytes(filesState.depth.size)}
                          </span>
                          <span className="text-[10px] text-zinc-500">Z-Distance Stream</span>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                    ) : (
                      <span className="rounded-md border border-amber-500/30 bg-amber-950/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                        Missing File
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Slot 3: kinematics.parquet */}
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  filesState.kinematics.isValid
                    ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-zinc-800 bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        filesState.kinematics.isValid
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-zinc-100">
                          kinematics.parquet
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          (Sensor / IMU / Joint Telemetry)
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {filesState.kinematics.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {filesState.kinematics.isValid ? (
                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono text-xs">
                          <span className="text-emerald-400 font-bold block">
                            {formatBytes(filesState.kinematics.size)}
                          </span>
                          <span className="text-[10px] text-zinc-500">6-DoF End-Effector</span>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                    ) : (
                      <span className="rounded-md border border-amber-500/30 bg-amber-950/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                        Missing File
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Operator Notes */}
            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Operator Run Notes & Grasp Confidence (Optional)
              </label>
              <input
                type="text"
                value={rigNotes}
                onChange={(e) => setRigNotes(e.target.value)}
                placeholder="e.g. Smooth bimanual trajectory, slight specular reflection at t=20s..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (4 cols) - Submission Action & Live Upload Gauge */}
        <div className="space-y-6 lg:col-span-4">
          {/* Submission Action Card */}
          <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider pb-3 border-b border-zinc-800">
              Ingestion Dispatch
            </h3>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Selected Task:</span>
                <span className="font-semibold text-zinc-200 text-right truncate max-w-[170px]">
                  {selectedRecipe.title}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Environment:</span>
                <span className="font-semibold text-zinc-200">{selectedRecipe.environment}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Data Payload:</span>
                <span className="font-mono font-bold text-cyan-300">
                  {totalPackageBytes > 0 ? formatBytes(totalPackageBytes) : "0 Bytes"}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Target S3 Destination:</span>
                <span className="font-mono text-[10px] text-zinc-400">s3://.../rig-042/</span>
              </div>
              <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
                <span>Payout on QA Pass:</span>
                <span className="font-mono text-sm font-bold text-emerald-400">
                  +${selectedRecipe.payoutRate.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Upload Button */}
            {uploadStatus === "idle" && (
              <div className="mt-6 space-y-2">
                <button
                  onClick={handleStartUpload}
                  disabled={!allFilesValid}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Submit Multimodal Package</span>
                </button>

                {allFilesValid && (
                  <button
                    onClick={handleClearFiles}
                    className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-300 py-1"
                  >
                    Reset Selected Files
                  </button>
                )}
              </div>
            )}

            {/* LIVE UPLOADING STATE (CRITICAL SECTION REQUIREMENT) */}
            {(uploadStatus === "uploading" || uploadStatus === "verifying") && (
              <div className="mt-6 space-y-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />
                    <span className="font-mono text-xs font-bold text-cyan-300 uppercase">
                      {uploadStatus === "uploading" ? "Uploading to S3..." : "Verifying QA..."}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {uploadProgress}%
                  </span>
                </div>

                {/* Main Progress Bar */}
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-cyan-500/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-150 shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>

                {/* Detailed Upload Metrics */}
                <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Transferred:</span>
                    <span className="font-bold text-cyan-400">
                      {formatBytes(bytesUploaded)} / {formatBytes(totalPackageBytes || 4272000000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Throughput Speed:</span>
                    <span className="font-bold text-emerald-400">{uploadSpeedMbps} MB/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">ETA Remaining:</span>
                    <span className="text-zinc-300">
                      {uploadProgress < 100
                        ? `${Math.max(1, Math.round((100 - uploadProgress) / 20))}s`
                        : "0s"}
                    </span>
                  </div>
                </div>

                {/* Pipeline step notification */}
                <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800 text-[10px] text-cyan-300 font-mono flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="truncate">{currentStepText}</span>
                </div>
              </div>
            )}

            {/* SUCCESS STATE */}
            {uploadStatus === "success" && createdEpisode && (
              <div className="mt-6 space-y-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold text-xs uppercase tracking-wider">
                    Ingestion Complete!
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400">Episode ID:</span>
                    <span className="font-bold text-cyan-400">{createdEpisode.id}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400">S3 ETag:</span>
                    <span className="text-zinc-400">{createdEpisode.s3Hash}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400">QA Status:</span>
                    <span className="font-bold text-amber-400">Pending Review</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={onNavigateToDashboard}
                    className="w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
                  >
                    View In Recent Activity Table
                  </button>
                  <button
                    onClick={handleClearFiles}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    Ingest Another Episode
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Verification Protocol Info Card */}
          <div className="rounded-2xl border border-zinc-800 glass-card p-5 space-y-3 text-xs">
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Rig Verification Safeguards</span>
            </h4>
            <ul className="space-y-2 text-zinc-400 text-[11px]">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong>Timestamp Parity:</strong> RGB frame index must align with Depth & IMU
                  within &lt;10ms.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong>Trajectory Continuity:</strong> Acceleration spikes exceeding safety limits
                  prompt immediate QA review.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>
                  <strong>Automated Escrow:</strong> Payout is cleared to balance once all 4 checks
                  pass.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
