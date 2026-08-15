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
      <div className="rounded-2xl border border-zinc-200 glass-panel p-6 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-zinc-100 text-zinc-600 px-2 py-0.5 font-mono text-[10px] font-bold border border-zinc-200">
                TASK BOARD
              </span>
              <span className="text-xs text-zinc-500">Available Tasks</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
              Video Tasks
            </h2>
            <p className="mt-1 text-xs text-zinc-500 max-w-2xl">
              Select an available task, review the instructions, and submit a video to earn the payout.
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
                className="rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 placeholder-zinc-500 focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Environment Filter Pills */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-zinc-200">
          {environments.map((env) => (
            <button
              key={env}
              onClick={() => setSelectedEnv(env)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedEnv === env
                  ? "border border-black bg-zinc-100 text-zinc-900 shadow-sm"
                  : "border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
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
            Household: "border-blue-200 bg-blue-50 text-blue-700",
            Clinical: "border-purple-200 bg-purple-50 text-purple-700",
            Industrial: "border-amber-200 bg-amber-50 text-amber-700",
            Warehouse: "border-zinc-300 bg-zinc-100 text-zinc-800",
            Agriculture: "border-emerald-200 bg-emerald-50 text-emerald-700",
          }[recipe.environment] || "border-zinc-300 bg-zinc-100 text-zinc-700";

          return (
            <div
              key={recipe.id}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-black hover:shadow-md"
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
                <h3 className="mt-3 text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                  {recipe.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed line-clamp-3">
                  {recipe.description}
                </p>

                {/* Key Metrics / Attributes */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                  {/* Estimated Time */}
                  <div className="rounded-xl border border-zinc-200 bg-white p-2.5">
                    <span className="text-[10px] text-zinc-500 block uppercase">
                      Estimated Time
                    </span>
                    <span className="font-bold text-zinc-800 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5 text-black" />
                      {recipe.estimatedTime}
                    </span>
                  </div>

                  {/* Payout Rate */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5">
                    <span className="text-[10px] text-emerald-700 block uppercase">
                      Payout
                    </span>
                    <span className="font-bold text-emerald-700 text-sm flex items-center gap-0.5 mt-0.5">
                      ${recipe.payoutRate.toFixed(2)}
                    </span>
                  </div>
                </div>


              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 flex items-center gap-2">
                <button
                  onClick={() => onSelectRecipeForUpload(recipe.id)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-black py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Submit Video</span>
                </button>

                <button
                  onClick={() => setSelectedRecipeDetail(recipe)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
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
          <div className="relative w-full max-w-xl rounded-2xl border border-zinc-200 glass-dropdown p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div>
                <span className="font-mono text-[10px] text-black font-bold uppercase">
                  {selectedRecipeDetail.code} • {selectedRecipeDetail.environment}
                </span>
                <h3 className="text-lg font-bold text-zinc-900">
                  {selectedRecipeDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecipeDetail(null)}
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                  Demonstration Protocol
                </h4>
                <p className="mt-1 text-zinc-700 leading-relaxed">
                  {selectedRecipeDetail.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="rounded-xl border border-zinc-200 bg-white p-2.5">
                  <span className="text-[9px] text-zinc-500 block">TARGET FPS</span>
                  <span className="text-black font-bold">{selectedRecipeDetail.targetFps} FPS RGB+Depth</span>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-2.5">
                  <span className="text-[9px] text-zinc-500 block">ESTIMATED TIME</span>
                  <span className="text-zinc-800 font-bold">{selectedRecipeDetail.estimatedTime}</span>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5">
                  <span className="text-[9px] text-emerald-700 block">PAYOUT</span>
                  <span className="text-emerald-700 font-bold">${selectedRecipeDetail.payoutRate.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                  Required Objects in Scene
                </h4>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {selectedRecipeDetail.requiredObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-zinc-300 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-700 font-mono"
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
                className="rounded-xl bg-black px-5 py-2 text-xs font-bold text-white hover:bg-zinc-800"
              >
                Submit Video For This Task
              </button>
              <button
                onClick={() => setSelectedRecipeDetail(null)}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
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
