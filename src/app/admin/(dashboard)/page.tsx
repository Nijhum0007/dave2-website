'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Activity, Database, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { EpisodeSubmission } from '@/lib/types';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<EpisodeSubmission[]>([]);
  const [operatorCount, setOperatorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchData();

    // Subscribe to submissions changes
    const submissionsChannel = supabase
      .channel('admin_dashboard_submissions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
        fetchData();
      })
      .subscribe();

    // Subscribe to operators changes
    const operatorsChannel = supabase
      .channel('admin_dashboard_operators')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'operators' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(submissionsChannel);
      supabase.removeChannel(operatorsChannel);
    };
  }, [supabase]);

  const fetchData = async () => {
    // Fetch submissions
    const { data: subsData } = await supabase.from('submissions').select('*');
    if (subsData) setSubmissions(subsData as any);

    // Fetch operator count
    const { count: opsCount } = await supabase.from('operators').select('*', { count: 'exact', head: true });
    if (opsCount !== null) setOperatorCount(opsCount);

    setLoading(false);
  };

  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'PENDING').length;
  const approvedSubmissions = submissions.filter(s => s.status === 'APPROVED').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'REJECTED').length;

  const stats = [
    { title: 'Total Operators', value: loading ? '...' : operatorCount.toString(), change: 'Active', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Submissions', value: loading ? '...' : totalSubmissions.toString(), change: 'Live', icon: Database, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Approval Rate', value: loading || totalSubmissions === 0 ? '...' : `${((approvedSubmissions / totalSubmissions) * 100).toFixed(1)}%`, change: 'Avg', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const qaStats = [
    { title: 'Pending QA', value: loading ? '...' : pendingSubmissions.toString(), icon: Clock, color: 'text-orange-500' },
    { title: 'Approved Total', value: loading ? '...' : approvedSubmissions.toString(), icon: CheckCircle, color: 'text-green-500' },
    { title: 'Rejected Total', value: loading ? '...' : rejectedSubmissions.toString(), icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-zinc-500 mt-1">Live system status and platform metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className={`w-24 h-24 ${stat.color}`} />
              </div>
              <div className="relative z-10">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-zinc-400 text-sm font-medium">{stat.title}</p>
                <div className="flex items-baseline mt-2 space-x-2">
                  <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
                  <span className={`text-xs font-medium text-zinc-500`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Ingestion Activity</h3>
          {/* Placeholder for chart */}
          <div className="h-64 flex items-end justify-between space-x-2 pt-8">
            {[40, 70, 45, 90, 65, 85, 100, 60, 75, 50, 80, 95].map((h, i) => (
              <div key={i} className="w-full bg-red-500/10 rounded-t-sm relative group hover:bg-red-500/30 transition-colors" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h * 10} GB
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">QA Queue Status</h3>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {qaStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-zinc-950 border border-zinc-800`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-zinc-300 font-medium">{stat.title}</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
