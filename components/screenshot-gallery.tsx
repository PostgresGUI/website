"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Zoom configuration:
// - x: horizontal center point (0-100, where 50 is center)
// - y: vertical center point (0-100, where 50 is center)
// - scale: zoom level (1 = no zoom, 1.5 = 50% zoom, 2 = 2x zoom, etc.)
// Set scale to 1 for no zoom (shows full image)

const screenshots = [
  {
    title: "Welcome Screen",
    description: "Get started quickly with a clean, minimal interface.",
    imagePath: "/screenshots2/PostgresGUI - Welcome screen.png",
    alt: "PostgresGUI Welcome Screen",
    zoom: { x: 50, y: 50, scale: 1 }, // No zoom - full image
  },
  {
    title: "Create DB Connection",
    description: "Connect to your PostgreSQL server in one click.",
    imagePath: "/screenshots2/PostgresGUI - Create connection.png",
    alt: "PostgresGUI Create Connection",
    zoom: { x: 50, y: 50, scale: 1.25 }, // Center zoom on dialog
  },
  {
    title: "Connect Via Connection String",
    description: "Connect to any server using a connection string.",
    imagePath:
      "/screenshots2/PostgresGUI - Connect to server using connection stirng.png",
    alt: "PostgresGUI Connect Using Connection String",
    zoom: { x: 50, y: 50, scale: 1.25 }, // Center zoom on dialog
  },
  {
    title: "Browse Databases",
    description: "See your database list and click to connect.",
    imagePath:
      "/screenshots2/PostgresGUI - See database list and click to connect to it.png",
    alt: "PostgresGUI Database List",
    zoom: { x: 0, y: 0, scale: 1.75 }, // Top left - database sidebar
  },
  {
    title: "Run Queries",
    description: "Execute SQL queries and view results in a clean table.",
    imagePath:
      "/screenshots2/PostgresGUI - Run complex query and see query results.png",
    alt: "PostgresGUI Query Results",
    zoom: { x: 100, y: 100, scale: 1.5 },
  },
  {
    title: "Edit Rows",
    description: "Edit table rows directly with inline editing.",
    imagePath: "/screenshots2/PostgresGUI - Edit row.png",
    alt: "PostgresGUI Edit Row",
    zoom: { x: 50, y: 50, scale: 1.25 },
  },
  {
    title: "Filter & Search",
    description: "Filter and search through your query results.",
    imagePath: "/screenshots2/PostgresGUI - Filter:search query results.png",
    alt: "PostgresGUI Filter and Search",
    zoom: { x: 100, y: 0, scale: 1.25 },
  },
  {
    title: "Sort Columns",
    description: "Sort your data by any column with a single click.",
    imagePath: "/screenshots2/PostgresGUI - Sort columns.png",
    alt: "PostgresGUI Sort Columns",
    zoom: { x: 50, y: 0, scale: 1.5 },
  },
  {
    title: "Export CSV & View JSON",
    description: "View results as JSON and export to CSV.",
    imagePath:
      "/screenshots2/PostgresGUI - View query results as JSON and export to CSV.png",
    alt: "PostgresGUI Export and JSON View",
    zoom: { x: 50, y: 50, scale: 1.25 },
  },
  {
    title: "Multiple Tabs",
    description: "Work with multiple queries in separate tabs.",
    imagePath: "/screenshots2/PotsgresGUI - Create multiple tabs.png",
    alt: "PostgresGUI Multiple Tabs",
    zoom: { x: 50, y: 0, scale: 1.5 },
  },
  {
    title: "Dark Mode",
    description: "Easy on the eyes with full dark mode support.",
    imagePath: "/screenshots2/PostgresGUI - Dark mode.png",
    alt: "PostgresGUI Dark Mode",
    zoom: { x: 50, y: 50, scale: 1 },
  },
  {
    title: "Saved Queries",
    description: "Organize your queries into folders for easy access.",
    imagePath:
      "/screenshots2/PostgresGUI - Organize saved queries into folders.png",
    alt: "PostgresGUI Saved Queries",
    zoom: { x: 50, y: 100, scale: 1.5 },
  },
];

export function ScreenshotGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const activeScreenshot = screenshots[activeIndex];
  const { zoom } = activeScreenshot;

  // Reset zoom animation when slide changes
  // First zoom out fully, then zoom in
  useEffect(() => {
    setIsZooming(false);
    const timer = setTimeout(() => {
      setIsZooming(true);
    }, 700); // Match the transition duration
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Calculate transform for zoom effect
  const getTransformStyle = () => {
    // During transition, reset to no zoom first
    if (!isZooming || zoom.scale === 1) {
      return {
        transform: "scale(1) translate(0%, 0%)",
      };
    }

    // Calculate translation to center the zoom point
    const translateX = ((50 - zoom.x) * (zoom.scale - 1)) / zoom.scale;
    const translateY = ((50 - zoom.y) * (zoom.scale - 1)) / zoom.scale;

    return {
      transform: `scale(${zoom.scale}) translate(${translateX}%, ${translateY}%)`,
    };
  };

  return (
    <div className="w-full" role="region" aria-label="Screenshot gallery">
      {/* Desktop: Two columns | Mobile: Stacked */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Navigation List */}
        <nav
          className="lg:w-56 xl:w-64 flex-shrink-0"
          aria-label="Feature navigation"
        >
          {/* Mobile: Horizontal scroll */}
          <div className="lg:hidden overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            <div className="flex gap-2">
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.title}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[var(--postgres-blue)] text-white shadow-lg shadow-[var(--postgres-blue)]/25"
                      : "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {screenshot.title}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Vertical list */}
          <div className="hidden lg:block space-y-0.5">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.title}
                onClick={() => setActiveIndex(index)}
                className={`group w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[var(--postgres-blue)]/10 dark:bg-[var(--postgres-blue)]/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Index indicator */}
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-[var(--postgres-blue)] text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <h3
                    className={`font-medium text-sm truncate transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]"
                        : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`}
                  >
                    {screenshot.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Screenshot Display */}
        <div className="flex-1 min-w-0">
          {/* Screenshot container with zoom */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "16/10" }}
          >
            {/* Image with zoom transform */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={getTransformStyle()}
            >
              <Image
                src={activeScreenshot.imagePath}
                alt={activeScreenshot.alt}
                fill
                className="object-cover"
                priority={activeIndex < 2}
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
          </div>

          {/* Caption - Mobile only (desktop shows in nav) */}
          <div className="mt-4 lg:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
                [{activeIndex + 1}/{screenshots.length}]
              </span>
              <h3 className="text-lg font-semibold">
                {activeScreenshot.title}
              </h3>
            </div>
          </div>

          {/* Navigation arrows - Desktop */}
          <div className="hidden lg:flex justify-between items-center mt-4">
            <button
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + screenshots.length) % screenshots.length
                )
              }
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Previous screenshot"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <span className="text-sm font-mono text-gray-500">
              {activeIndex + 1} / {screenshots.length}
            </span>

            <button
              onClick={() =>
                setActiveIndex((activeIndex + 1) % screenshots.length)
              }
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Next screenshot"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
