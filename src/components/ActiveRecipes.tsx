"use client";

import React, { useState } from "react";
import {
  ScrollText,
  Clock,
  DollarSign,
  Cpu,
  Layers,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Recipe, EnvironmentType } from "@/lib/types";

interface ActiveRecipesProps {
  recipes: Recipe[];
  onSelectRecipeForUpload: (recipeId: string) => void;
}

export const ActiveRecipes: React.FC<ActiveRecipesProps> = ({
  recipes,
  onSelectRecipeForUpload,
}) => {
  const [selectedEnv, setSelectedEnv] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);

  const environments = ["ALL", "Household", "Clinical", "Industrial", "Warehouse", "Agriculture"];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesEnv = selectedEnv === "ALL" || recipe.environment === selectedEnv;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEnv && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Row */}
      <div className="rounded-2xl border border-zinc-800 glass-panel p-6 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                TASK BOARD
              </span>
              <span className="text-xs text-zinc-400">Authorized Fleet Missions</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Active Demonstration Recipes
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
              Select an authorized manipulation recipe, review kinematic boundaries, and stream heavy
              episodes to maximize your cycle bounty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Filter recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Environment Filter Pills */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
          {environments.map((env) => (
            <button
              key={env}
              onClick={() => setSelectedEnv(env)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedEnv === env
                  ? "border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  : "border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {env === "ALL" ? "All Environments" : env}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Recipe Cards (Task Board) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => {
          const envColors = {
            Household: "border-blue-500/30 bg-blue-950/30 text-blue-300",
            Clinical: "border-purple-500/30 bg-purple-950/30 text-purple-300",
            Industrial: "border-amber-500/30 bg-amber-950/30 text-amber-300",
            Warehouse: "border-cyan-500/30 bg-cyan-950/30 text-cyan-300",
            Agriculture: "border-emerald-500/30 bg-emerald-950/30 text-emerald-300",
          }[recipe.environment] || "border-zinc-700 bg-zinc-800 text-zinc-300";

          return (
            <div
              key={recipe.id}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800 glass-card p-6 shadow-lg transition-all duration-200 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]"
            >
              <div>
                {/* Top Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${envColors}`}
                  >
                    {recipe.environment}
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-500">
                    {recipe.code}
                  </span>
                </div>

                {/* Task Title */}
                <h3 className="mt-3 text-base font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors">
                  {recipe.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {recipe.description}
                </p>

                {/* Key Metrics / Attributes */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                  {/* Estimated Time */}
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5">
                    <span className="text-[10px] text-zinc-500 block uppercase">
                      Estimated Time
                    </span>
                    <span className="font-bold text-zinc-200 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" />
                      {recipe.estimatedTime}
                    </span>
                  </div>

                  {/* Payout Rate */}
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5">
                    <span className="text-[10px] text-emerald-400/80 block uppercase">
                      Payout Rate
                    </span>
                    <span className="font-bold text-emerald-300 text-sm flex items-center gap-0.5 mt-0.5">
                      ${recipe.payoutRate.toFixed(2)}
                      <span className="text-[9px] font-normal text-emerald-500">/ep</span>
                    </span>
                  </div>
                </div>

                {/* Hardware Rig & Tags */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/60 font-mono">
                  <span>Rig: {recipe.hardwareRig.split(" ")[0]}</span>
                  <span className="text-emerald-400 font-semibold">{recipe.acceptanceRate}% QA</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 flex items-center gap-2">
                <button
                  onClick={() => onSelectRecipeForUpload(recipe.id)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start Ingestion</span>
                </button>

                <button
                  onClick={() => setSelectedRecipeDetail(recipe)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  title="View Recipe Specifications"
                >
                  <ScrollText className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Specifications Modal */}
      {selectedRecipeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-2xl border border-zinc-800 glass-dropdown p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">
                  {selectedRecipeDetail.code} • {selectedRecipeDetail.environment}
                </span>
                <h3 className="text-lg font-bold text-zinc-100">
                  {selectedRecipeDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecipeDetail(null)}
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                  Demonstration Protocol
                </h4>
                <p className="mt-1 text-zinc-300 leading-relaxed">
                  {selectedRecipeDetail.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5">
                  <span className="text-[9px] text-zinc-500 block">TARGET FPS</span>
                  <span className="text-cyan-400 font-bold">{selectedRecipeDetail.targetFps} FPS RGB+Depth</span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5">
                  <span className="text-[9px] text-zinc-500 block">ESTIMATED TIME</span>
                  <span className="text-zinc-200 font-bold">{selectedRecipeDetail.estimatedTime}</span>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-2.5">
                  <span className="text-[9px] text-emerald-400 block">PAYOUT RATE</span>
                  <span className="text-emerald-300 font-bold">${selectedRecipeDetail.payoutRate.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                  Required Objects in Scene
                </h4>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {selectedRecipeDetail.requiredObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-300 font-mono"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  const id = selectedRecipeDetail.id;
                  setSelectedRecipeDetail(null);
                  onSelectRecipeForUpload(id);
                }}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-bold text-zinc-950"
              >
                Ingest Data for This Recipe
              </button>
              <button
                onClick={() => setSelectedRecipeDetail(null)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
