import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        
        {/* Skeleton for moderator card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading moderator details...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

