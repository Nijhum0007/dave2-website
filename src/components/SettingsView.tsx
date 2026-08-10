"use client";

import React, { useState } from "react";
import {
  Settings,
  HardDrive,
  Camera,
  Cpu,
  Shield,
  Sliders,
  CheckCircle2,
  Server,
  RefreshCw,
  Mail,
  User,
} from "lucide-react";
import { OperatorProfile } from "@/lib/types";

interface SettingsViewProps {
  operator: OperatorProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ operator }) => {
  const [s3Bucket, setS3Bucket] = useState(operator.s3Bucket);
  const [s3Region, setS3Region] = useState("us-east-1");
  const [bandwidthLimit, setBandwidthLimit] = useState("Unlimited (10 Gbps Direct)");
  const [autoRetry, setAutoRetry] = useState(true);
  const [rgbResolution, setRgbResolution] = useState("1080p @ 60 FPS (High-Bitrate)");
  const [imuFrequency, setImuFrequency] = useState("200 Hz (VectorNav VN-100)");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                SYSTEM CONFIGURATION
              </span>
              <span className="text-xs text-zinc-400">RIG-042-ALPHA Hardware Telemetry</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Rig & Cloud Ingestion Settings
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
              Configure local camera sensor streams, IMU sampling frequencies, AWS S3 multipart
              endpoints, and fleet credentials.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] active:scale-95"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Saved to Rig</span>
              </>
            ) : (
              <span>Save Rig Preferences</span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hardware Sensors Configuration */}
        <div className="rounded-2xl border border-zinc-800 glass-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
            <Camera className="h-5 w-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Camera & Sensor Stream Configuration
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">
                RGB Optical Stream Format
              </label>
              <select
                value={rgbResolution}
                onChange={(e) => setRgbResolution(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 px-3 font-mono text-zinc-100 focus:border-cyan-500 focus:outline-none"
              >
                <option>1080p @ 60 FPS (High-Bitrate H.264)</option>
                <option>1080p @ 30 FPS (Standard LeRobot)</option>
                <option>720p @ 60 FPS (Low Latency)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">
                Depth Sensor Pipeline
              </label>
              <input
                type="text"
                readOnly
                value="Intel RealSense D435i (16-bit Z-Distance Alignment)"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 py-2.5 px-3 font-mono text-zinc-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">
                IMU & Kinematics Frequency
              </label>
              <select
                value={imuFrequency}
                onChange={(e) => setImuFrequency(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 px-3 font-mono text-zinc-100 focus:border-cyan-500 focus:outline-none"
              >
                <option>200 Hz (VectorNav VN-100 High-Rate)</option>
                <option>100 Hz (Standard 6-DoF End-Effector)</option>
                <option>50 Hz (Low Bandwidth Telemetry)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AWS S3 & Cloud Storage */}
        <div className="rounded-2xl border border-zinc-800 glass-card p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
            <Server className="h-5 w-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              AWS S3 Storage Endpoint
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">
                Operator S3 Ingestion Bucket URI
              </label>
              <input
                type="text"
                value={s3Bucket}
                onChange={(e) => setS3Bucket(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 px-3 font-mono text-cyan-300 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">AWS Region</label>
              <select
                value={s3Region}
                onChange={(e) => setS3Region(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 px-3 font-mono text-zinc-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="us-east-1">US East (N. Virginia) us-east-1</option>
                <option value="us-west-2">US West (Oregon) us-west-2</option>
                <option value="eu-central-1">Europe (Frankfurt) eu-central-1</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">
                Upload Bandwidth Throttle
              </label>
              <select
                value={bandwidthLimit}
                onChange={(e) => setBandwidthLimit(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 px-3 font-mono text-zinc-100 focus:border-cyan-500 focus:outline-none"
              >
                <option>Unlimited (10 Gbps Direct S3 Multipart)</option>
                <option>Capped at 250 MB/s</option>
                <option>Capped at 100 MB/s</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fleet Manager & Invite Credentials Info */}
        <div className="rounded-2xl border border-zinc-800 glass-panel p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <Shield className="h-5 w-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Fleet Security & Operator Credentials
              </h3>
            </div>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
              INVITE-ONLY VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                Operator Identity
              </span>
              <p className="font-bold text-zinc-200">{operator.name}</p>
              <p className="font-mono text-cyan-400">{operator.callsign}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                Fleet Manager
              </span>
              <p className="font-bold text-zinc-200">{operator.assignedFleetManager}</p>
              <p className="text-[11px] text-zinc-400">creator_042@dave.com</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-1">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                Security Enclave
              </span>
              <p className="font-bold text-zinc-200">Supabase Auth + Rig Key</p>
              <p className="text-[11px] text-emerald-400">End-to-End Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
