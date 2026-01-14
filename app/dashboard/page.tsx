import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import { moderatorsApi } from "@/lib/api/moderators";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let moderators: any = [];
  let error = null;

  try {
    moderators = await moderatorsApi.getModerators(token);
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your moderator management dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Moderators</p>
                <p className="text-3xl font-bold text-gray-900">
                  {moderators.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Moderators</p>
                <p className="text-3xl font-bold text-green-600">
                  {moderators.filter((m: any) => m.status === "active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Inactive Moderators
                </p>
                <p className="text-3xl font-bold text-gray-600">
                  {
                    moderators.filter((m: any) => m.status === "inactive")
                      .length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/moderators"
                className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  View All Moderators
                </h3>
                <p className="text-sm text-gray-600">
                  Browse and manage moderator accounts
                </p>
              </Link>
              <Link
                href="/register"
                className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  Add New Moderator
                </h3>
                <p className="text-sm text-gray-600">
                  Register a new moderator account
                </p>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardBody>
              <p className="text-red-600">Error loading moderators: {error}</p>
            </CardBody>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
