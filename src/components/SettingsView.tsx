"use client";

import React, { useState } from "react";
import {
  User,
  CreditCard,
  Wifi,
  Bell,
  CheckCircle2,
  Smartphone,
  Mail,
  Shield,
  SmartphoneNfc,
} from "lucide-react";
import { OperatorProfile } from "@/lib/types";

interface SettingsViewProps {
  operator: OperatorProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ operator }) => {
  const [payoutMethod, setPayoutMethod] = useState(operator.payoutMethod);
  const [uploadOverWifiOnly, setUploadOverWifiOnly] = useState(operator.uploadOverWifiOnly);
  const [saveOriginalVideo, setSaveOriginalVideo] = useState(operator.saveOriginalVideo);
  const [emailNotifications, setEmailNotifications] = useState(operator.emailNotifications);
  const [pushNotifications, setPushNotifications] = useState(operator.pushNotifications);
  
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold border border-black">
                CREATOR PREFERENCES
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              Account Settings
            </h2>
            <p className="mt-1 text-xs text-zinc-500 max-w-2xl">
              Manage your personal information, payout methods, and app preferences.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-95"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Saved Changes</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
            <User className="h-5 w-5 text-black" />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Profile Information
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={operator.name}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-zinc-900 focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={operator.username}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-zinc-900 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={operator.email}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-zinc-900 focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={operator.phone}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-zinc-900 focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payout Methods */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
            <CreditCard className="h-5 w-5 text-black" />
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Payout Methods
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">
                Primary Payout Method
              </label>
              <select
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-zinc-900 focus:border-black focus:outline-none"
              >
                <option value="Bank Transfer">Bank Transfer (Direct Deposit)</option>
                <option value="PayPal">PayPal</option>
                <option value="Instant Debit">Instant Debit Card (Fee applies)</option>
              </select>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-zinc-200">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Bank Account</p>
                    <p className="text-zinc-500">
                      {operator.bankAccountLast4 ? `Checking •••• ${operator.bankAccountLast4}` : "No account linked"}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-black hover:underline">
                  Update
                </button>
              </div>
            </div>
            
            <p className="text-[11px] text-zinc-500">
              Payouts are processed weekly on Tuesdays. Minimum payout threshold is $10.00.
            </p>
          </div>
        </div>

        {/* App Preferences */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2.5">
              <Smartphone className="h-5 w-5 text-black" />
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                App & Notification Preferences
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Upload Settings */}
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-700 uppercase tracking-wider text-[10px] mb-2">
                Data & Uploads
              </h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                    <Wifi className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Upload over Wi-Fi only</p>
                    <p className="text-[10px] text-zinc-500">Save cellular data</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={uploadOverWifiOnly} onChange={() => setUploadOverWifiOnly(!uploadOverWifiOnly)} />
                  <div className="peer h-5 w-9 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                    <SmartphoneNfc className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Save original video</p>
                    <p className="text-[10px] text-zinc-500">Save to device camera roll</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={saveOriginalVideo} onChange={() => setSaveOriginalVideo(!saveOriginalVideo)} />
                  <div className="peer h-5 w-9 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-700 uppercase tracking-wider text-[10px] mb-2">
                Notifications
              </h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Email Notifications</p>
                    <p className="text-[10px] text-zinc-500">Weekly summaries and payouts</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                  <div className="peer h-5 w-9 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Push Notifications</p>
                    <p className="text-[10px] text-zinc-500">New high-paying tasks available</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                  <div className="peer h-5 w-9 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
