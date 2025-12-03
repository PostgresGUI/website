import Image from "next/image";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Highlights } from "@/components/highlights";
import { Screenshots } from "@/components/screenshots";

const COMING_SOON = true;

export default function Home() {
  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6 pt-30 pb-12">
          {/* Top Image */}
          <div className="flex justify-center">
            <Image
              src="/postgresgui-elephant-app-icon.png"
              alt="PostgresGUI"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <section className="space-y-8 md:space-y-14 mt-16">
            {/* Product Name */}
            <h1 className="text-5xl md:text-7xl font-semibold">PostgresGUI</h1>

            {/* Download Button or Coming Soon */}
            <div className="flex justify-center">
              {COMING_SOON ? (
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-xl opacity-30 dark:opacity-20 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-full px-6 py-2 md:px-10 md:py-3 shadow-2xl border border-gray-700/50 dark:border-gray-600/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 dark:opacity-40 animate-ping"></div>
                        <div className="relative w-2 h-2 md:w-3 md:h-3 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 dark:from-gray-100 dark:via-gray-200 dark:to-white bg-clip-text text-transparent tracking-tight">
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
            <p className="text-2xl md:text-4xl font-semibold max-w-lg mx-auto">
              Lightweight and native PostgreSQL client for Mac.
            </p>
          </section>

          {/* Highlights */}
          <section className="mt-24 md:mt-30 md:min-w-3xl mx-auto">
            <Highlights />
          </section>
        </div>
      </div>

      {/* Screenshots */}
      <section className="my-24 px-6">
        <Screenshots />
      </section>
    </>
  );
}
