'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Users, LayoutDashboard, Database, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Operators', icon: Users },
    { href: '/admin/submissions', label: 'Submissions', icon: Database },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen text-zinc-300">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <ShieldAlert className="w-6 h-6 text-red-500 mr-2" />
        <span className="font-bold text-lg text-white tracking-wide">ADMIN CONSOLE</span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
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
  );
}
