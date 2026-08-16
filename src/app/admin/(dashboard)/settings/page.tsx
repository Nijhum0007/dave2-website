'use client';

import { useState } from 'react';
import { Shield, Key, Bell, Server, Database } from 'lucide-react';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-zinc-500 mt-1">Manage admin account and global platform configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-red-500/10 text-red-400 font-medium rounded-xl border border-red-500/20 flex items-center gap-3">
            <Key className="w-5 h-5" />
            Security & Access
          </button>
          <button className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors flex items-center gap-3">
            <Server className="w-5 h-5" />
            Infrastructure
          </button>
          <button className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors flex items-center gap-3">
            <Database className="w-5 h-5" />
            Data Retention
          </button>
          <button className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors flex items-center gap-3">
            <Bell className="w-5 h-5" />
            Notifications
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-red-500" />
              Update Administrator Password
            </h2>
            
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-red-500/50"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="button"
                  className="bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-2">Admin Session Management</h2>
            <p className="text-sm text-zinc-400 mb-6">Current session is protected by HTTP-only JWT cookies. Tokens expire after 24 hours.</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <div>
                  <div className="text-sm font-medium text-zinc-200">Current Session</div>
                  <div className="text-xs text-zinc-500 mt-0.5">IP: 192.168.1.1 • Windows • Chrome</div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">Active Now</span>
              </div>
              
              <button className="text-sm text-red-400 hover:text-red-300 font-medium">Revoke all other sessions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
