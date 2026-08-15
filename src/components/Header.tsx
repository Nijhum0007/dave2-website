"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Bell,
  Cpu,
  Radio,
  Server,
  Sparkles,
  Wifi,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { MOCK_OPERATOR } from "@/lib/mockData";

interface HeaderProps {
  activeTab: string;
  onNavigateToUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigateToUpload }) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Episode Approved (+ $22.50)",
      desc: "EP-8942-01 (Dishwasher A) passed Auto-QA and Kinematic audit.",
      time: "15m ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Hardware Telemetry Notice",
      desc: "RealSense D435i wrist camera firmware update v5.14.0 available.",
      time: "2h ago",
      read: false,
    },
    {
      id: 3,
      type: "alert",
      title: "Episode QA Rejected",
      desc: "EP-8938-05 rejected due to dropped depth frames. Re-upload requested.",
      time: "5h ago",
      read: true,
    },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-6 backdrop-blur-xl">
      {/* Left: Active View Breadcrumb & Rig Telemetry */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Creator Dashboard
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-sm font-medium text-zinc-900 capitalize">
            {activeTab.replace("-", " ")}
          </span>
        </div>


      </div>

      {/* Right: Telemetry, Clock, Quick Ingest & Notifications */}
      <div className="flex items-center gap-3">
        {/* UTC Clock */}
        <div className="hidden items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-mono text-xs text-zinc-500 md:flex">
          <Radio className="h-3.5 w-3.5 text-black animate-pulse" />
          <span>{currentTime || "00:00:00 UTC"}</span>
        </div>



        {/* Submit Video CTA */}
        {activeTab !== "upload" && (
          <button
            onClick={onNavigateToUpload}
            className="flex items-center gap-2 rounded-lg border border-black bg-black px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>Submit Video</span>
          </button>
        )}

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-zinc-200 glass-dropdown p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-black" />
                  <h4 className="text-xs font-bold tracking-wider text-zinc-800 uppercase">
                    Recent Notifications
                  </h4>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-zinc-500 hover:text-zinc-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-lg border p-2.5 text-xs transition-colors ${
                      n.type === "success"
                        ? "border-emerald-200 bg-emerald-50"
                        : n.type === "warning"
                        ? "border-amber-200 bg-amber-50"
                        : "border-rose-200 bg-rose-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-zinc-800">{n.title}</p>
                      <span className="text-[10px] text-zinc-500 font-mono">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setNotifications(notifications.map((n) => ({ ...n, read: true })));
                  setShowNotifications(false);
                }}
                className="mt-3 w-full rounded-md border border-zinc-200 bg-white py-1.5 text-center text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              >
                Mark all as acknowledged
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
