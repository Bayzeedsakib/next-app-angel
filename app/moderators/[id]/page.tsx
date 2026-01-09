import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import { moderatorsApi } from '@/lib/api/moderators';
import ModeratorTracksClient from './ModeratorTracksClient';

// Server Component - SSR Data Fetching (Dynamic Route)
export default async function ModeratorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let moderator = null;
  let error = null;

  try {
    moderator = await moderatorsApi.getModerator(parseInt(id), token);
  } catch (err: any) {
    if (err.response?.status === 404) {
      notFound();
    }
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error loading moderator: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!moderator) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/moderators" className="text-indigo-600 hover:text-indigo-700">
            ← Back to Moderators
          </Link>
        </div>

        {/* Moderator Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {moderator.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {moderator.profile?.displayName || 'Unnamed Moderator'}
                  </h1>
                  <p className="text-gray-600">{moderator.email}</p>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  moderator.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {moderator.status}
              </span>
            </div>
          </CardHeader>
          {moderator.profile?.bio && (
            <CardBody>
              <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
              <p className="text-gray-600">{moderator.profile.bio}</p>
            </CardBody>
          )}
        </Card>

        {/* Tracks Section - CSR Component */}
        <ModeratorTracksClient moderatorId={parseInt(id)} />
      </main>
      <Footer />
    </div>
  );
}

