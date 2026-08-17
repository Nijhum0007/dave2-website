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
  currentEarnings: number;
  liveRecipesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  operator,
  onLogout,
  currentEarnings,
  liveRecipesCount,
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
      label: "Available Tasks",
      icon: ScrollText,
      badge: `${liveRecipesCount} Live`,
      description: "Task Instructions & Payouts",
    },
    {
      id: "upload",
      label: "Submit Video",
      icon: UploadCloud,
      badge: null,
      description: "Paste your drive link",
    },
    {
      id: "payouts-qa",
      label: "Payouts & QA",
      icon: DollarSign,
      badge: `$${currentEarnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      badgeColor: "bg-emerald-50 text-emerald-600 border border-emerald-200",
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
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-zinc-200 bg-zinc-50/95 backdrop-blur-2xl transition-all duration-300">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between border-b border-zinc-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center mr-3">
            <img src="/logo.png" alt="Dave Logo" className="h-10 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-black px-1 py-0.2 font-mono text-[9px] font-bold text-white border border-black">
                CREATOR
              </span>
            </div>
            <p className="text-[11px] font-medium text-zinc-500">Video Collection Portal</p>
          </div>
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
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all duration-150 ${isActive
                  ? "border border-black bg-zinc-100 text-zinc-900 shadow-sm"
                  : "border border-transparent text-zinc-500 hover:border-zinc-200 hover:bg-white hover:text-zinc-800"
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isActive
                      ? "bg-black text-white border border-black"
                      : "bg-white text-zinc-500 group-hover:bg-zinc-100 group-hover:text-zinc-700"
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
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono font-medium ${item.badgeColor || "bg-zinc-100 text-zinc-500 border border-zinc-300"
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${isActive
                      ? "text-black translate-x-0.5"
                      : "text-zinc-600 opacity-0 group-hover:opacity-100"
                    }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Profile Snippet at Bottom */}
      <div className="border-t border-zinc-200 p-4 bg-zinc-50/80">
        <div className="rounded-xl border border-zinc-200 bg-white p-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-300 font-mono text-xs font-bold text-zinc-700">
                {operator.id ? operator.id.replace("OP-", "").substring(0, 3) : "NEW"}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-900">{operator.username}</span>
                  <ShieldCheck className="h-3 w-3 text-black" />
                </div>
                <p className="truncate text-[10px] text-zinc-500">{operator.name}</p>
                <p className="truncate text-[9px] text-black font-medium">
                  {operator.badge}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out / Switch Operator"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
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
