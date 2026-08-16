'use client';

import { Bell, Search } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search operators, submissions, or IDs..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-6 ml-6">
        <button className="relative text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-6 border-l border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-red-500/20">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white leading-none">Super Admin</p>
            <p className="text-xs text-zinc-500 mt-1">System Override</p>
          </div>
        </div>
      </div>
    </header>
  );
}
