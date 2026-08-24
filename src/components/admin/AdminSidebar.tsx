'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Users, LayoutDashboard, Database, Settings, LogOut, List, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Operators', icon: Users },
    { href: '/admin/submissions', label: 'Submissions', icon: Database },
    { href: '/admin/jobs', label: 'Manage Jobs', icon: List },
    { href: '/admin/jobs/new', label: 'Post Job', icon: ShieldAlert },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen text-zinc-300 transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
          <div className="flex items-center">
            <ShieldAlert className="w-6 h-6 text-red-500 mr-2" />
            <span className="font-bold text-lg text-white tracking-wide">ADMIN CONSOLE</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (onClose) onClose();
                }}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-red-500/10 text-red-400 font-medium' 
                    : 'hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile screen */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
}
