"use client";

import React from "react";
import {
  LayoutDashboard,
  ScrollText,
  UploadCloud,
  DollarSign,
  Settings,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import { OperatorProfile } from "@/lib/types";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  operator: OperatorProfile;
  onLogout: () => void;
  currentEarnings: number;
  liveRecipesCount: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  operator,
  onLogout,
  currentEarnings,
  liveRecipesCount,
  isOpen = false,
  onClose,
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
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-20 flex-col border-r border-zinc-900 bg-zinc-950 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-center border-b border-zinc-900 px-4 relative">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Dave Logo" className="h-8 w-auto object-contain brightness-0 invert" />
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col items-center gap-4 py-6 px-2 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                title={item.label}
                className={`relative group flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-150 ${isActive
                    ? "bg-zinc-850 text-white shadow-sm"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                  }`}
              >
                <Icon className="h-5 w-5" />
                
                {/* Tooltip for Accessibility */}
                <span className="absolute left-16 scale-0 rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-200 shadow-md transition-all group-hover:scale-100 whitespace-nowrap z-50">
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 text-[8px] font-mono font-bold text-white border border-zinc-700 px-1 shadow-sm"
                  >
                    {item.id === "recipes" ? liveRecipesCount : `$${currentEarnings}`}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile / Logout at Bottom */}
        <div className="border-t border-zinc-900 p-4 flex flex-col items-center gap-4">
          {/* User Profile Initials */}
          <div className="relative group flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs font-bold text-zinc-300 cursor-pointer">
            {operator.id ? operator.id.replace("OP-", "").substring(0, 3) : "NEW"}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950"></span>
            
            {/* Tooltip profile details card */}
            <div className="absolute bottom-12 left-2 scale-0 group-hover:scale-100 rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl transition-all w-48 z-50 text-left text-xs text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">{operator.username}</span>
                <ShieldCheck className="h-3 w-3 text-white" />
              </div>
              <p className="truncate text-[10px] text-zinc-500">{operator.name}</p>
              <p className="text-[10px] text-zinc-300 font-medium">{operator.badge}</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={onLogout}
            title="Sign Out"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 transition-all hover:bg-zinc-800 hover:text-rose-400"
            aria-label="Sign out"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span className="absolute left-16 scale-0 rounded bg-zinc-900 border border-zinc-800 px-2 py-1 text-xs font-semibold text-zinc-200 shadow-md transition-all group-hover:scale-100 whitespace-nowrap z-50">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay for mobile screen */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};
