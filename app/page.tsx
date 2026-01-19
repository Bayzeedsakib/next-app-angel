import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cookies } from "next/headers";
import Image from "next/image";

const portals = [
  {
    title: "Admin Portal",
    description: "System administration and user management",
    path: "/admin/login",
    color: "yellow-500",
    pic: "/admin2.png",
    disabled: true,
  },
  {
    title: "Moderator Portal",
    description: "Content moderation and community oversight",
    path: "/moderators",
    color: "purple-500",
    pic: "/mod2.png",
    disabled: false,
  },
  {
    title: "Consumer Portal",
    description: "Discover and enjoy amazing music content",
    path: "/ConsumerPortal/",
    color: "cyan-500",
    pic: "/consumer2.png",
    disabled: true,
  },
  {
    title: "Creator Portal",
    description: "Upload and share your creative works",
    path: "/creator/login",
    color: "pink-500",
    pic: "/creator2.png",
    disabled: true,
  },
];

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return (
    <>
      {!token ? (
        <div className="min-h-screen text-white">
          {/* Main content */}
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Header */}
            <header className="p-1 flex items-center justify-between">
              <Image
                src="/logo.png"
                alt="MusicShare Logo"
                width={250}
                height={250}
                className="object-contain"
              />
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-1">
              <div className="text-center mb-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 o animate-fade-in">
                  Welcome to{" "}
                  <span className="bg-clip-text font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                    MusicShare
                  </span>
                </h1>
                <p
                  className="text-lg text-grey opacity-70 animate-fade-in"
                  style={{ animationDelay: "100ms" }}
                >
                  Your gateway to unlimited music experiences. Choose your
                  portal to continue.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3 max-w-3xl w-full mb-3">
                {portals.map((portal) => (
                  <Link
                    key={portal.title}
                    href={portal.disabled ? "#" : portal.path}
                    className="block"
                  >
                    <div
                      className={`card bg-base-100 shadow-xl p-2 text-center hover:scale-105 transition-transform cursor-pointer border-2 border-${portal.color}`}
                    >
                      <div className="card-body p-2">
                        <h2 className="card-title text-base">{portal.title}</h2>

                        <div className="flex items-center justify-center w-[80px] h-[80px] mx-auto">
                          <Image
                            src={portal.pic}
                            alt={portal.title}
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>

                        <p className="text-xs">{portal.description}</p>
                        <div className="card-actions justify-center">
                          <span
                            className={`btn btn-xs btn-${portal.color} mt-1`}
                          >
                            Go to {portal.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div
                className="opacity-0 animate-fade-in text-center"
                style={{ animationDelay: "800ms" }}
              >
                <p className="text-white mb-1 text-xs">
                  Click on a portal to explore
                </p>

                <div className="w-5 h-5 text-white mx-auto animate-bounce">
                  👇
                </div>
              </div>
            </main>

            {/* Footer */}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl font-bold mb-6">Moderator Dashboard</h1>
                <p className="text-xl mb-8 text-indigo-100">
                  Manage moderators, tracks, and playlists with ease
                </p>
                {!token && (
                  <div className="flex justify-center space-x-4">
                    <Link
                      href="/register"
                      className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/login"
                      className="px-8 py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition border-2 border-white"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
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
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Moderator Management
                    </h3>
                    <p className="text-gray-600">
                      Create, update, and manage moderator accounts with ease.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Track Management
                    </h3>
                    <p className="text-gray-600">
                      Add and manage music tracks for each moderator.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-pink-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Secure Authentication
                    </h3>
                    <p className="text-gray-600">
                      JWT-based authentication with protected routes.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
