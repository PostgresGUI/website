import { AppStoreBadge } from "./components/AppStoreBadge";

const COMING_SOON = true;

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6 max-w-3xl">
        {/* Top Image */}
        <div className="flex justify-center">
          <img
            src="/postgresmac-elephant-app-icon.png"
            alt="PostgresMac"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        <section className="space-y-8 md:space-y-14 mt-16">
          {/* Product Name */}
          <h1 className="text-5xl md:text-7xl font-semibold">PostgresMac</h1>

          {/* Download Button or Coming Soon */}
          <div className="flex justify-center">
            {COMING_SOON ? (
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-full px-6 py-2 md:px-10 md:py-3 shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 animate-ping"></div>
                      <div className="relative w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <a href="#" className="inline-block scale-150">
                <AppStoreBadge />
              </a>
            )}
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-4xl font-semibold max-w-xl mx-auto">
            Lightweight and native PostgreSQL client for Mac.
          </p>
        </section>
      </div>
    </div>
  );
}
