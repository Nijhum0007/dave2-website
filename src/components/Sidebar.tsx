"use client";

import React from "react";
import {
  LayoutDashboard,
  ScrollText,
  UploadCloud,
  DollarSign,
  Settings,
  Bot,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { OperatorProfile } from "@/lib/types";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  operator: OperatorProfile;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  operator,
  onLogout,
}) => {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
      description: "Overview & Analytics",
    },
    {
      id: "recipes",
      label: "Active Recipes",
      icon: ScrollText,
      badge: "6 Live",
      description: "Task Instructions & Payouts",
    },
    {
      id: "upload",
      label: "Upload Data",
      icon: UploadCloud,
      badge: "LeRobot",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
      description: "Multimodal Ingest Tool",
    },
    {
      id: "payouts-qa",
      label: "Payouts & QA",
      icon: DollarSign,
      badge: "$4,890",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
      description: "QA Feedback & Payments",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
      description: "Rig Hardware & AWS S3",
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-zinc-800/80 bg-zinc-950/95 backdrop-blur-2xl transition-all duration-300">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between border-b border-zinc-800/80 px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center mr-3">
            <img src="/logo.png" alt="Dave Logo" className="h-10 w-auto object-contain invert" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-cyan-500/20 px-1 py-0.2 font-mono text-[9px] font-bold text-cyan-400 border border-cyan-500/30">
                CREATOR
              </span>
            </div>
            <p className="text-[11px] font-medium text-zinc-500">Video Collection Portal</p>
          </div>
        </div>
      </div>

      {/* Rig Telemetry Mini-Card */}
      <div className="mx-4 my-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-zinc-400">Assigned Rig:</span>
          <span className="font-mono text-[11px] font-bold text-cyan-400">RIG-042-ALPHA</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-emerald-400" /> 60 FPS RGB+Depth
          </span>
          <span className="text-emerald-400 font-semibold">Ready</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-2">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all duration-150 ${
                isActive
                  ? "border border-cyan-500/30 bg-cyan-950/30 text-zinc-100 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                  : "border border-transparent text-zinc-400 hover:border-zinc-800/80 hover:bg-zinc-900/60 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-zinc-900/80 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-zinc-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wide block">{item.label}</span>
                  <span className="text-[10px] text-zinc-500 block leading-tight">
                    {item.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono font-medium ${
                      item.badgeColor || "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${
                    isActive
                      ? "text-cyan-400 translate-x-0.5"
                      : "text-zinc-600 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Profile Snippet at Bottom */}
      <div className="border-t border-zinc-800/80 p-4 bg-zinc-950/80">
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-xs font-bold text-cyan-300">
                042
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-zinc-900"></span>
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-100">{operator.callsign}</span>
                  <ShieldCheck className="h-3 w-3 text-cyan-400" />
                </div>
                <p className="truncate text-[10px] text-zinc-400">{operator.name}</p>
                <p className="truncate text-[9px] text-cyan-400/90 font-medium">
                  {operator.tier.split(" - ")[0]}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out / Switch Operator"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-400"
              aria-label="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
