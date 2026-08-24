'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root Error Boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Something went wrong!</h1>
          <p className="text-zinc-400 text-sm">
            An unexpected error occurred while rendering this page.
          </p>
          {process.env.NODE_ENV !== 'production' && (
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg text-left overflow-auto max-h-32 text-xs font-mono text-zinc-500">
              {error.message || 'No details available'}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2.5 px-4 rounded-xl font-semibold transition-colors active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-colors border border-zinc-700/50"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
