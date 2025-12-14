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
    title: "Connections List View",
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
            <div className="rounded-xl overflow-hidden">
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
