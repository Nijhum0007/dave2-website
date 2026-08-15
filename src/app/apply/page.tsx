"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ApplyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    callsign: "",
    experience: "beginner",
    equipment: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);

  const equipmentOptions = [
    { id: "glasses", label: "Smart Glasses (e.g., Meta Ray-Bans)" },
    { id: "phone", label: "Smartphone with Mount/Gimbal" },
    { id: "action_cam", label: "Action Camera (e.g., GoPro)" },
    { id: "other", label: "Other / Not Sure Yet" },
  ];

  const handleEquipmentChange = (id: string) => {
    setFormData((prev) => {
      const isSelected = prev.equipment.includes(id);
      if (isSelected) {
        return { ...prev, equipment: prev.equipment.filter((item) => item !== id) };
      } else {
        return { ...prev, equipment: [...prev.equipment, id] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for application submission
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/apply/setup-account?email=${encodeURIComponent(formData.email)}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white flex flex-col">
      {/* Simple Header */}
      <header className="flex h-20 items-center justify-between px-6 lg:px-8 border-b border-zinc-100 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Dave Logo" className="h-10 w-auto object-contain invert" />
          <span className="font-bold tracking-tight text-xl hidden sm:inline-block">Creator Network</span>
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
        >
          Already a Creator? Log in
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-3">
              Apply to be a Creator
            </h1>
            <p className="text-zinc-500">
              Join the network and start earning by recording everyday tasks. Fill out the form below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-zinc-900">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="callsign" className="block text-sm font-medium text-zinc-900">
                  Creator Callsign / Username
                </label>
                <input
                  type="text"
                  id="callsign"
                  required
                  value={formData.callsign}
                  onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  placeholder="e.g. JANE-99"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-900">
                What equipment do you currently own?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equipmentOptions.map((option) => {
                  const isSelected = formData.equipment.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleEquipmentChange(option.id)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${isSelected
                          ? "border-black bg-zinc-50 text-black"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        }`}
                    >
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-black bg-black text-white" : "border-zinc-300"
                        }`}>
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-medium text-zinc-900">
                Data Collection Experience
              </label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
              >
                <option value="beginner">No prior experience (Beginner)</option>
                <option value="intermediate">Some experience recording video tasks</option>
                <option value="expert">Professional data collector / QA tester</option>
              </select>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <button
                type="submit"
                disabled={isLoading || formData.equipment.length === 0}
                className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-black px-8 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting Application..." : "Apply"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
              {formData.equipment.length === 0 && (
                <p className="text-xs text-rose-500 text-center mt-3">
                  Please select at least one piece of equipment to proceed.
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
