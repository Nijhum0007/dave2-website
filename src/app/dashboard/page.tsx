"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { Recipe, EpisodeSubmission, OperatorProfile, PayoutRecord, BankDetails } from "@/lib/types";

export default function OperatorPortalApp() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

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
        
        // Fetch operator from database to get real data (e.g., bank details)
        const { data: opData } = await supabase
          .from('operators')
          .select('*')
          .eq('id', user.id)
          .single();
          
        setOperator((prev) => ({
          ...prev,
          id: user.id,
          email: user.email || prev.email,
          name: opData?.name || displayName,
          username: opData?.name || displayName,
          bankDetails: opData?.bank_details || undefined,
        }));
      } else {
        // If the user navigates back via client history without a session, boot them to home.
        router.replace("/");
      }
    };
    fetchUser();
  }, []);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [targetRecipeIdForUpload, setTargetRecipeIdForUpload] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Submissions State (Living state for uploaded episodes)
  const [submissions, setSubmissions] = useState<EpisodeSubmission[]>([]);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [liveRecipes, setLiveRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        if (res.ok) {
          const data = await res.json();
          setLiveRecipes(data);
        }
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!operator.id) return;

    const fetchSubmissions = async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("operator_id", operator.id)
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Error fetching submissions:", error);
        return;
      }

      if (data) {
        const formattedSubmissions: EpisodeSubmission[] = data.map((d: any) => ({
          id: d.id,
          operatorId: d.operator_id,
          recipeId: d.recipe_id,
          recipeTitle: d.recipe_title,
          environment: d.environment,
          submittedAt: d.submitted_at,
          durationSeconds: d.duration_seconds,
          totalFrames: 0,
          rgbSize: 0,
          depthSize: 0,
          kinematicsSize: 0,
          totalSize: 0,
          status: d.status,
          qaReviewer: d.qa_reviewer,
          qaFeedback: d.qa_feedback,
          s3Hash: "pending_download",
          rigId: d.rig_id,
          teleopLatencyMs: d.teleop_latency_ms,
          driveLink: d.drive_link,
        }));
        setSubmissions(formattedSubmissions);
      }
    };

    fetchSubmissions();

    // Fetch payouts from database
    const fetchPayouts = async () => {
      const { data, error } = await supabase
        .from("payouts")
        .select("*")
        .eq("operator_id", operator.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching payouts:", error);
        return;
      }

      if (data) {
        const formattedPayouts: PayoutRecord[] = data.map((d: any) => ({
          id: d.id,
          period: d.paid_at
            ? `Week of ${new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            : `${new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - Current`,
          episodesCount: 0,
          approvedCount: 0,
          grossAmount: Number(d.amount),
          status: d.status as PayoutRecord["status"],
          paidDate: d.paid_at
            ? new Date(d.paid_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Pending',
          transactionRef: d.transaction_ref || 'N/A',
        }));
        setPayouts(formattedPayouts);
      }
    };

    fetchPayouts();

    const channel = supabase
      .channel("submissions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "submissions",
          filter: `operator_id=eq.${operator.id}`,
        },
        (payload) => {
          console.log("Realtime update received:", payload);
          fetchSubmissions();
        }
      )
      .subscribe();

    const payoutsChannel = supabase
      .channel("payouts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "payouts",
          filter: `operator_id=eq.${operator.id}`,
        },
        () => {
          fetchPayouts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(payoutsChannel);
    };
  }, [operator.id]);

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

  const handleUpdateBankDetails = async (bankDetails: BankDetails) => {
    if (!operator.id) return;
    
    const { error } = await supabase
      .from('operators')
      .update({ bank_details: bankDetails })
      .eq('id', operator.id);
      
    if (error) {
      console.error("Error updating bank details:", error);
      throw error;
    }
    
    setOperator(prev => ({
      ...prev,
      bankDetails,
      bankAccountLast4: bankDetails.accountNumber.slice(-4)
    }));
  };

  // If not authenticated, render Gated Auth View
  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  // Derived metrics
  const currentEarnings = payouts.filter(p => p.status === "PROCESSING").reduce((acc, p) => acc + p.grossAmount, 0);
  const liveRecipesCount = liveRecipes.length;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex font-sans antialiased selection:bg-black selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        operator={operator}
        onLogout={handleLogout}
        currentEarnings={currentEarnings}
        liveRecipesCount={liveRecipesCount}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-0 md:pl-20 min-w-0 transition-all duration-300">
        {/* Sticky Header */}
        <Header
          activeTab={activeTab}
          operatorId={operator.id}
          onNavigateToUpload={() => handleNavigateToUpload()}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
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
              recipes={liveRecipes}
              onSelectRecipeForUpload={(recipeId) => handleNavigateToUpload(recipeId)}
            />
          )}

          {activeTab === "upload" && (
            <UploadZone
              recipes={liveRecipes}
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

          {activeTab === "settings" && <SettingsView operator={operator} onUpdateBankDetails={handleUpdateBankDetails} />}
        </main>

        {/* Bottom subtle system footer */}
        <footer className="border-t border-zinc-200 py-4 px-8 text-center text-[10px] text-zinc-600 font-mono">
          <span>DAVE   EVERYDAY VIDEO COLLECTION NETWORK   SECURE UPLOAD GATEWAY</span>
        </footer>
      </div>
    </div>
  );
}
