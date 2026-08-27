'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-[#f97316] mb-4">Something went wrong</h1>
      <p className="text-neutral-400 mb-8 max-w-md">
        An unexpected error occurred. You can try refreshing or returning to the home page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white font-medium transition-all"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-neutral-700 hover:border-neutral-500 text-white font-medium transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
