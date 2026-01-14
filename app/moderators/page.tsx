import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { moderatorsApi } from "@/lib/api/moderators";
import ModeratorsClient from "./ModeratorsClient";

// Server Component - SSR Data Fetching
export default async function ModeratorsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Moderators
          </h1>
          <p className="text-gray-600">
            Manage and view all moderator accounts
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error loading moderators: {error}</p>
          </div>
        ) : (
          <ModeratorsClient initialModerators={moderators} />
        )}
      </main>
      <Footer />
    </div>
  );
}
