"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Activity,
  Bell,
  X,
  Menu,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  operatorId?: string;
  onNavigateToUpload?: () => void;
  onToggleSidebar?: () => void;
}

interface Notification {
  id: string;
  operator_id: string;
  type: "success" | "warning" | "alert";
  title: string;
  desc_text: string;
  read: boolean;
  created_at: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, operatorId, onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!operatorId) return;

    const supabase = createClient();

    // 1. Fetch initial notifications
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("operator_id", operatorId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching notifications:", error);
        return;
      }
      if (data) {
        setNotifications(data);
      }
    };

    fetchNotifications();

    // 2. Realtime Postgres Changes Subscription
    const channel = supabase
      .channel(`notifications-${operatorId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `operator_id=eq.${operatorId}`,
        },
        (payload) => {
          console.log("Realtime notification received:", payload);
          if (payload.eventType === "INSERT") {
            setNotifications((prev) => [(payload.new as unknown) as Notification, ...prev]);
          } else {
            // Re-fetch to keep it simple for update/delete changes
            fetchNotifications();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [operatorId]);

  const markAllAsRead = async () => {
    if (!operatorId) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("operator_id", operatorId);

    if (error) {
      console.error("Error marking notifications as read:", error);
      return;
    }
    // Update local state
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-6 backdrop-blur-xl">
      {/* Left: Active View Title */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="mr-2 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 md:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        )}
        <div className="flex items-center">
          <span
            className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 to-black capitalize"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            {activeTab === "payouts-qa" ? "Payouts & QA" : activeTab.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Right: Notifications */}
      <div className="flex items-center gap-3">
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
                    className={`rounded-lg border p-2.5 text-xs transition-colors ${n.type === "success"
                        ? "border-emerald-200 bg-emerald-50"
                        : n.type === "warning"
                          ? "border-amber-200 bg-amber-50"
                          : "border-rose-200 bg-rose-50"
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-zinc-800">{n.title}</p>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {new Date(n.created_at).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">{n.desc_text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={markAllAsRead}
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
