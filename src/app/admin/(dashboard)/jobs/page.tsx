'use client';

import { useState, useEffect } from 'react';
import { List, Search, Pencil, Trash2, Loader2, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Recipe } from '@/lib/types';
import Link from 'next/link';

export default function ManageJobsPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/recipes');
      if (res.ok) {
        const data = await res.json();
        setRecipes(data);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this job?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setRecipes(prev => prev.filter(job => job.id !== id));
      } else {
        alert('Failed to delete job');
      }
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('An error occurred while deleting.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
              <List className="w-6 h-6" />
            </div>
            Manage Jobs
          </h1>
          <p className="text-zinc-500 mt-2">View, edit, and delete active video collection tasks.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 w-full sm:w-64"
            />
          </div>
          <Link 
            href="/admin/jobs/new"
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Post Job
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50 text-zinc-500 font-medium uppercase tracking-wider text-xs">
                <th className="px-6 py-4">Job Details</th>
                <th className="px-6 py-4">Environment</th>
                <th className="px-6 py-4">Est. Time / Payout</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading jobs...
                  </td>
                </tr>
              ) : recipes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                    No active jobs found. Click "Post Job" to create one.
                  </td>
                </tr>
              ) : (
                recipes.map((job) => (
                  <tr key={job.id} className="hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-zinc-200">{job.title}</div>
                        <div className="text-xs text-zinc-500 font-mono mt-1">ID: {job.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                        {job.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-300 font-medium">${job.payoutRate.toFixed(2)}</div>
                      <div className="text-xs text-zinc-500">{job.estimatedTime}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/jobs/${job.id}/edit`}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                          title="Edit Job"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(job.id)}
                          disabled={isDeleting === job.id}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete Job"
                        >
                          {isDeleting === job.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
