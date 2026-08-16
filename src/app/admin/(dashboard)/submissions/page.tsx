'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { EpisodeSubmission } from '@/lib/types';
import { formatBytes } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, Search, FileVideo, ShieldAlert, Check, X } from 'lucide-react';
import { format } from 'date-fns';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<EpisodeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedSubmission, setSelectedSubmission] = useState<EpisodeSubmission | null>(null);
  
  const [qaFeedback, setQaFeedback] = useState('');
  const [qaScore, setQaScore] = useState<number>(100);
  const [qaLoading, setQaLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchSubmissions();

    const channel = supabase
      .channel('admin_submissions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'submissions' },
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (!error && data) {
      const formatted: EpisodeSubmission[] = data.map((d: any) => ({
        id: d.id,
        operatorId: d.operator_id,
        recipeId: d.recipe_id,
        recipeTitle: d.recipe_title,
        environment: d.environment,
        submittedAt: d.submitted_at,
        durationSeconds: d.duration_seconds,
        totalFrames: 0,
        rgbSize: 0,
        depthSize: 0,
        kinematicsSize: 0,
        totalSize: 0,
        status: d.status,
        qaScore: d.qa_score,
        qaReviewer: d.qa_reviewer,
        qaFeedback: d.qa_feedback,
        rejectionReason: d.rejection_reason,
        s3Hash: "pending",
        rigId: d.rig_id,
        teleopLatencyMs: d.teleop_latency_ms,
      }));
      setSubmissions(formatted);
    }
    setLoading(false);
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sub.recipeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'ALL' || sub.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleQA = async (status: 'APPROVED' | 'REJECTED') => {
    if (!selectedSubmission) return;
    setQaLoading(true);

    try {
      const res = await fetch('/api/admin/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedSubmission.id,
          status,
          qaScore,
          qaFeedback
        })
      });

      if (res.ok) {
        setSelectedSubmission(null);
        setQaFeedback('');
        setQaScore(100);
        // Optimistic update
        setSubmissions(prev => prev.map(s => 
          s.id === selectedSubmission.id 
            ? { ...s, status, qaScore, qaFeedback, rejectionReason: status === 'REJECTED' ? qaFeedback : undefined } 
            : s
        ));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setQaLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
              <FileVideo className="w-6 h-6" />
            </div>
            Submissions & QA
          </h1>
          <p className="text-zinc-500 mt-2">Review and rate incoming episode data in real-time.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search ID, Recipe..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 w-full sm:w-64"
            />
          </div>
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-900 p-1">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  statusFilter === tab ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50 text-zinc-500 font-medium uppercase tracking-wider text-xs">
                <th className="px-6 py-4">Submission ID</th>
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Operator ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">Loading submissions...</td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">No submissions found.</td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-800/50 transition-colors group cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-white">{sub.id.substring(0, 8)}...</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-200">{sub.recipeTitle}</div>
                      <div className="text-xs text-zinc-500 font-mono">{sub.recipeId.substring(0, 12)}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 font-mono text-xs">
                      {sub.operatorId?.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">
                      {format(new Date(sub.submittedAt), 'MMM d, HH:mm')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {sub.status === 'APPROVED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {sub.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                      {sub.status === 'REJECTED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QA Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                QA Inspection
              </h2>
              <button onClick={() => setSelectedSubmission(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div className="text-xs text-zinc-500 mb-1">Submission ID</div>
                  <div className="font-mono text-sm text-zinc-200">{selectedSubmission.id}</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div className="text-xs text-zinc-500 mb-1">Task Name</div>
                  <div className="text-sm font-medium text-zinc-200">{selectedSubmission.recipeTitle}</div>
                </div>
              </div>

              {selectedSubmission.status !== 'PENDING' ? (
                <div className={`p-4 rounded-xl border ${selectedSubmission.status === 'APPROVED' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                  <h3 className={`font-bold ${selectedSubmission.status === 'APPROVED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    Already {selectedSubmission.status}
                  </h3>
                  <p className="text-sm mt-1 text-zinc-400">Score: {selectedSubmission.qaScore}/100</p>
                  <p className="text-sm mt-1 text-zinc-400">Notes: {selectedSubmission.qaFeedback || 'None'}</p>
                </div>
              ) : (
                <div className="space-y-4 border-t border-zinc-800 pt-6">
                  <h3 className="font-bold text-white">Provide QA Rating</h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">Quality Score (0-100)</label>
                    <input 
                      type="number" 
                      min="0" max="100"
                      value={qaScore}
                      onChange={(e) => setQaScore(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2">Feedback Notes / Rejection Reason</label>
                    <textarea 
                      rows={3}
                      value={qaFeedback}
                      onChange={(e) => setQaFeedback(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none resize-none"
                      placeholder="Add notes for the operator..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      disabled={qaLoading}
                      onClick={() => handleQA('APPROVED')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Check className="w-5 h-5" /> Approve
                    </button>
                    <button 
                      disabled={qaLoading}
                      onClick={() => handleQA('REJECTED')}
                      className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" /> Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
