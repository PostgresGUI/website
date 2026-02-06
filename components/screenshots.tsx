"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const screenshots = [
  {
    title: "Welcome Screen",
    description: "Get started quickly with a clean, minimal interface.",
    imagePath: "/screenshots3/PostgresGUI - Welcome screen.png",
    alt: "PostgresGUI Welcome Screen",
  },
  {
    title: "Create Localhost Connection",
    description: "Connect to your local PostgreSQL server in one click.",
    imagePath: "/screenshots3/PostgresGUI - Create localhost connection.png",
    alt: "PostgresGUI Create Localhost Connection",
  },
  {
    title: "Connect Using Connection String",
    description: "Connect to any server using a connection string.",
    imagePath:
      "/screenshots3/PostgresGUI - Connect to server using connection stirng.png",
    alt: "PostgresGUI Connect Using Connection String",
  },
  {
    title: "Manage Connections",
    description: "See all your connections and connect or edit them.",
    imagePath:
      "/screenshots3/PostgrsGUI - See connection list and connect to it or edit.png",
    alt: "PostgresGUI Connection List",
  },
  {
    title: "Browse Databases",
    description: "See your database list and click to connect.",
    imagePath:
      "/screenshots3/PostgresGUI - See database list and click to connect to it.png",
    alt: "PostgresGUI Database List",
  },
  {
    title: "Run Complex Queries",
    description: "Execute SQL queries and view results in a clean table.",
    imagePath:
      "/screenshots3/PostgresGUI - Run complex query and see query results.png",
    alt: "PostgresGUI Query Results",
  },
  {
    title: "Edit Rows",
    description: "Edit table rows directly with inline editing.",
    imagePath: "/screenshots3/PostgresGUI - Edit row.png",
    alt: "PostgresGUI Edit Row",
  },
  {
    title: "Filter & Search",
    description: "Filter and search through your query results.",
    imagePath: "/screenshots3/PostgresGUI - Filter:search query results.png",
    alt: "PostgresGUI Filter and Search",
  },
  {
    title: "Sort Columns",
    description: "Sort your data by any column with a single click.",
    imagePath: "/screenshots3/PostgresGUI - Sort columns.png",
    alt: "PostgresGUI Sort Columns",
  },
  {
    title: "Export & View JSON",
    description: "View results as JSON and export to CSV.",
    imagePath:
      "/screenshots3/PostgresGUI - View query results as JSON and export to CSV.png",
    alt: "PostgresGUI Export and JSON View",
  },
  {
    title: "Multiple Tabs",
    description: "Work with multiple queries in separate tabs.",
    imagePath: "/screenshots3/PotsgresGUI - Create multiple tabs.png",
    alt: "PostgresGUI Multiple Tabs",
  },
];

export function Screenshots() {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: false,
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {screenshots.map((screenshot, index) => (
          <CarouselItem key={screenshot.title} className="pl-2 md:pl-4">
            <div className="overflow-hidden">
              <Image
                src={screenshot.imagePath}
                alt={screenshot.alt}
                width={1440}
                height={900}
                className="w-full h-auto object-cover"
                priority={index < 2}
              />
            </div>

            <footer className="px-4 py-2 rounded-xl mt-1">
              <h3 className="text-base text-left md:text-lg font-bold">
                {screenshot.title}
              </h3>
              <p className="text-sm text-left">{screenshot.description}</p>
            </footer>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="hidden md:flex justify-center items-center gap-4">
        <CarouselPrevious className="static translate-x-0 translate-y-0" />
        <CarouselNext className="static translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
