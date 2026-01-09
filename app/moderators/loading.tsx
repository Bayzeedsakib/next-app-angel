import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading moderators...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

