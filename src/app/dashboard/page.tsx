"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AuthView } from "@/components/AuthView";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ActiveRecipes } from "@/components/ActiveRecipes";
import { UploadZone } from "@/components/UploadZone";
import { PayoutsQA } from "@/components/PayoutsQA";
import { SettingsView } from "@/components/SettingsView";
import {
  MOCK_OPERATOR,
  MOCK_RECIPES,
  MOCK_SUBMISSIONS,
  MOCK_PAYOUTS,
} from "@/lib/mockData";
import { EpisodeSubmission } from "@/lib/types";

export default function OperatorPortalApp() {
  // Authentication State (Gated Access)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [operator, setOperator] = useState(MOCK_OPERATOR);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [targetRecipeIdForUpload, setTargetRecipeIdForUpload] = useState<string | undefined>();

  // Submissions State (Living state for uploaded episodes)
  const [submissions, setSubmissions] = useState<EpisodeSubmission[]>(MOCK_SUBMISSIONS);
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS);

  // Auth Handlers
  const handleLoginSuccess = (email: string) => {
    setIsAuthenticated(true);
    setOperator((prev) => ({
      ...prev,
      email,
      lastActive: "Just Logged In • Rig Synced",
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans antialiased selection:bg-cyan-500 selection:text-zinc-950">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        operator={operator}
        onLogout={handleLogout}
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
        <footer className="border-t border-zinc-800/60 py-4 px-8 text-center text-[10px] text-zinc-600 font-mono">
          <span>DAVE   EVERYDAY VIDEO COLLECTION NETWORK   SECURE UPLOAD GATEWAY</span>
        </footer>
      </div>
    </div>
  );
}
