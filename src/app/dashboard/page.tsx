"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AuthView } from "@/components/AuthView";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ActiveRecipes } from "@/components/ActiveRecipes";
import { UploadZone } from "@/components/UploadZone";
import { PayoutsQA } from "@/components/PayoutsQA";
import { SettingsView } from "@/components/SettingsView";
import {
  MOCK_RECIPES,
} from "@/lib/mockData";
import { EpisodeSubmission, OperatorProfile, PayoutRecord } from "@/lib/types";

export default function OperatorPortalApp() {
  const router = useRouter();
  const supabase = createClient();

  // Authentication State (Gated Access)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [operator, setOperator] = useState<OperatorProfile>({
    id: "",
    username: "",
    name: "",
    email: "",
    phone: "",
    badge: "New Operator",
    payoutMethod: "Bank Transfer",
    bankAccountLast4: "",
    uploadOverWifiOnly: true,
    saveOriginalVideo: false,
    emailNotifications: true,
    pushNotifications: true,
    approvedRate: 0,
    totalEarnings: 0,
    lastActive: "Just Logged In",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        const namePart = user.email.split("@")[0];
        // Capitalize the name part for a nicer display
        const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        setOperator((prev) => ({
          ...prev,
          email: user.email || prev.email,
          name: displayName,
          username: displayName,
        }));
      } else {
        // If the user navigates back via client history without a session, boot them to home.
        router.replace("/");
      }
    };
    fetchUser();
  }, [supabase]);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [targetRecipeIdForUpload, setTargetRecipeIdForUpload] = useState<string | undefined>();

  // Submissions State (Living state for uploaded episodes)
  const [submissions, setSubmissions] = useState<EpisodeSubmission[]>([]);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);

  // Auth Handlers
  const handleLoginSuccess = (email: string) => {
    setIsAuthenticated(true);
    setOperator((prev) => ({
      ...prev,
      email,
      lastActive: "Just Logged In • Rig Synced",
    }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.refresh(); // Clears Next.js client-side router cache
    router.push("/");
  };

  // Navigation helpers
  const handleNavigateToUpload = (recipeId?: string) => {
    if (recipeId) {
      setTargetRecipeIdForUpload(recipeId);
    }
    setActiveTab("upload");
  };

  const handleNavigateToDashboard = () => {
    setActiveTab("dashboard");
  };

  const handleNavigateToQA = () => {
    setActiveTab("payouts-qa");
  };

  // Upload completion handler
  const handleUploadComplete = (newEpisode: EpisodeSubmission) => {
    setSubmissions((prev) => [newEpisode, ...prev]);
  };

  // If not authenticated, render Gated Auth View
  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  // Derived metrics
  const currentEarnings = payouts.filter(p => p.status === "PROCESSING").reduce((acc, p) => acc + p.grossAmount, 0);
  const liveRecipesCount = MOCK_RECIPES.length;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex font-sans antialiased selection:bg-black selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        operator={operator}
        onLogout={handleLogout}
        currentEarnings={currentEarnings}
        liveRecipesCount={liveRecipesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-72 min-w-0 transition-all duration-300">
        {/* Sticky Header */}
        <Header
          activeTab={activeTab}
          onNavigateToUpload={() => handleNavigateToUpload()}
        />

        {/* View Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === "dashboard" && (
            <DashboardOverview
              submissions={submissions}
              onNavigateToUpload={handleNavigateToUpload}
              onNavigateToQA={handleNavigateToQA}
              operatorName={operator.name.split(" ")[0]}
              currentEarnings={currentEarnings}
            />
          )}

          {activeTab === "recipes" && (
            <ActiveRecipes
              recipes={MOCK_RECIPES}
              onSelectRecipeForUpload={(recipeId) => handleNavigateToUpload(recipeId)}
            />
          )}

          {activeTab === "upload" && (
            <UploadZone
              recipes={MOCK_RECIPES}
              initialRecipeId={targetRecipeIdForUpload}
              onUploadComplete={handleUploadComplete}
              onNavigateToDashboard={handleNavigateToDashboard}
            />
          )}

          {activeTab === "payouts-qa" && (
            <PayoutsQA
              payouts={payouts}
              submissions={submissions}
              onNavigateToUpload={handleNavigateToUpload}
            />
          )}

          {activeTab === "settings" && <SettingsView operator={operator} />}
        </main>

        {/* Bottom subtle system footer */}
        <footer className="border-t border-zinc-200 py-4 px-8 text-center text-[10px] text-zinc-600 font-mono">
          <span>DAVE   EVERYDAY VIDEO COLLECTION NETWORK   SECURE UPLOAD GATEWAY</span>
        </footer>
      </div>
    </div>
  );
}
