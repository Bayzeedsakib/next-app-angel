'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Something went wrong!</h1>
          </div>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Don't worry, it's not your fault.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-600 font-mono">{error.message}</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={reset} variant="primary">
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = '/')}
              variant="secondary"
            >
              Go Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

