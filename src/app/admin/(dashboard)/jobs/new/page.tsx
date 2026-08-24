'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setFormData({
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
      } else {
        alert('Failed to post job');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Post a New Task</h1>
        <p className="text-zinc-500 mt-1">Create a new data collection job for operators.</p>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-3" />
          Task successfully posted to the Operator Dashboard!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Task Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" placeholder="e.g. Wipe Kitchen Counter" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-300">Detailed Description / Instructions</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" placeholder="Step by step instructions for the operator..." />
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
            <input type="text" name="requiredObjects" value={formData.requiredObjects} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" placeholder="Sponge, Counter, Spray Bottle" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={loading} className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50">
            {loading ? 'Posting...' : 'Post Task to Dashboard'}
          </button>
        </div>
      </form>
    </div>
  );
}
