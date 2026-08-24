'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ShieldAlert, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Recipe } from '@/lib/types';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    environment: 'Household',
    hardwareRig: 'Tier 3 (Standard Phone)',
    estimatedTime: '30 mins',
    payoutRate: '2.50',
    targetFps: '30',
    expectedDurationSec: '60',
    difficulty: 'Beginner',
    requiredObjects: '',
    tags: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch('/api/recipes');
        if (res.ok) {
          const allRecipes: Recipe[] = await res.json();
          const job = allRecipes.find(r => r.id === jobId);
          if (job) {
            setFormData({
              title: job.title,
              description: job.description,
              environment: job.environment,
              hardwareRig: job.hardwareRig,
              estimatedTime: job.estimatedTime,
              payoutRate: job.payoutRate.toString(),
              targetFps: job.targetFps.toString(),
              expectedDurationSec: job.expectedDurationSec.toString(),
              difficulty: job.difficulty,
              requiredObjects: job.requiredObjects.join(', '),
              tags: job.tags.join(', '),
            });
          }
        }
      } catch (err) {
        console.error('Failed to load job', err);
      } finally {
        setFetching(false);
      }
    };
    
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      requiredObjects: formData.requiredObjects.split(',').map(s => s.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(`/api/recipes/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push('/admin/jobs');
        }, 2000);
      } else {
        alert('Failed to update job');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/admin/jobs" className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Edit Task</h1>
        <p className="text-zinc-500 mt-1">Update the details for this data collection job.</p>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-3" />
          Task successfully updated! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Task Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Detailed Description / Instructions</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Estimated Time (e.g. 30 mins)</label>
            <input required type="text" name="estimatedTime" value={formData.estimatedTime} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Flat Payout Rate (USD)</label>
            <input required type="number" step="0.01" name="payoutRate" value={formData.payoutRate} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Environment</label>
            <select name="environment" value={formData.environment} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500">
              <option>Household</option>
              <option>Clinical</option>
              <option>Industrial</option>
              <option>Warehouse</option>
              <option>Agriculture</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Required Hardware</label>
            <input required type="text" name="hardwareRig" value={formData.hardwareRig} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Required Objects (comma separated)</label>
            <input type="text" name="requiredObjects" value={formData.requiredObjects} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={() => router.push('/admin/jobs')}
            className="px-6 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
