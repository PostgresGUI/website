"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  {
    title: "Welcome Screen",
    description:
      "Get started quickly. Connect with your localhost in one click.",
    imagePath: "/screenshots/PostgresGUI-Welcome_Screen-1440x900.jpg",
    alt: "PostgresGUI Welcome Screen",
  },
  {
    title: "Query Results",
    description: "Execute SQL queries and view results in a clean table.",
    imagePath: "/screenshots/PostgresGUI-Query_Result_View-1440x900.jpg",
    alt: "PostgresGUI Query Result View",
  },
  {
    title: "Create Connection",
    description: "Add new connections with a simple form.",
    imagePath: "/screenshots/PostgresGUI-Create_Connection_View-1440x900.jpg",
    alt: "PostgresGUI Create Connection View",
  },
  {
    title: "Connections List",
    description: "Manage all your PostgreSQL connections in one place.",
    imagePath: "/screenshots/PostgresGUI-Connections_List_View-1440x900.jpg",
    alt: "PostgresGUI Connections List View",
  },
  {
    title: "Edit Connection",
    description: "Edit existing connections with a simple form.",
    imagePath: "/screenshots/PostgresGUI-Edit_Connection_View-1440x900.jpg",
    alt: "PostgresGUI Edit Connection View",
  },
];

export function ScreenshotGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full" role="region" aria-label="Screenshot gallery">
      {/* Tabs */}
      <div
        className="flex overflow-x-auto mb-8 border-b border-border/30 scrollbar-hide"
        role="tablist"
        aria-label="Screenshot tabs"
      >
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.title}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`screenshot-panel-${index}`}
            id={`screenshot-tab-${index}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                setActiveIndex((activeIndex + 1) % screenshots.length);
              } else if (e.key === "ArrowLeft") {
                setActiveIndex(
                  (activeIndex - 1 + screenshots.length) % screenshots.length
                );
              }
            }}
            className={`flex-shrink-0 px-4 py-3 font-semibold text-sm transition-swiftui whitespace-nowrap ${
              activeIndex === index
                ? "text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] border-b-2 border-[var(--postgres-blue)] dark:border-[var(--postgres-blue-light)] -mb-[1px]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {screenshot.title}
          </button>
        ))}
      </div>

      {/* Main Screenshot */}
      <div
        role="tabpanel"
        id={`screenshot-panel-${activeIndex}`}
        aria-labelledby={`screenshot-tab-${activeIndex}`}
        className="mb-8"
      >
        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-xl">
          <Image
            src={screenshots[activeIndex].imagePath}
            alt={screenshots[activeIndex].alt}
            width={1440}
            height={900}
            className="w-full h-auto object-cover"
            priority={activeIndex < 2}
          />
        </div>

        <div className="mt-6 px-4">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-mono text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">
              [{activeIndex + 1}/{screenshots.length}]
            </span>
            <h3 className="text-xl md:text-2xl font-display tracking-tight">
              {screenshots[activeIndex].title}
            </h3>
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-mono">
            // {screenshots[activeIndex].description}
          </p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {screenshots.map((screenshot, index) => (
          <button
            key={`thumb-${screenshot.title}`}
            onClick={() => setActiveIndex(index)}
            className={`rounded-xl overflow-hidden border transition-swiftui ${
              activeIndex === index
                ? "border-[var(--postgres-blue)] dark:border-[var(--postgres-blue-light)] shadow-lg ring-2 ring-[var(--postgres-blue)]/20"
                : "border-border/50 hover:border-border opacity-60 hover:opacity-100 shadow-sm hover:shadow-md"
            }`}
            aria-label={`View ${screenshot.title}`}
          >
            <Image
              src={screenshot.imagePath}
              alt={`${screenshot.alt} thumbnail`}
              width={288}
              height={180}
              className="w-full h-auto object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
