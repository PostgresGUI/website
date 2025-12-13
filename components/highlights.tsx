import {
  RocketIcon,
  SearchCheckIcon,
  CircleCheckIcon,
  LaptopIcon,
  CreditCardOffIcon,
  DocToRightIcon,
} from "@/components/icons";

const highlights = [
  {
    icon: CircleCheckIcon,
    title: "No Data Collection",
    description: "All data stays local on your Mac",
  },
  {
    icon: RocketIcon,
    title: "Lightweight",
    description: (
      <>
        12.4 MB download
        <br /> 25.2 MB installed
      </>
    ),
  },
  {
    icon: LaptopIcon,
    title: "Native",
    description: (
      <>
        Built with SwiftUI
        <br />
        No Electron
      </>
    ),
  },
  {
    icon: CreditCardOffIcon,
    title: "No Subscription",
    description: "Buy once, use forever",
  },
  {
    icon: SearchCheckIcon,
    title: "Open Source",
    description: (
      <>
        View code on{" "}
        <a
          href="https://github.com/postgresgui/postgresgui"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          GitHub ↗
        </a>
      </>
    ),
  },
  {
    icon: DocToRightIcon,
    title: "Simple UI",
    description: "No bloated features",
  },
];

export function Highlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {highlights.map((highlight) => (
        <div
          key={highlight.title}
          className="group p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 transition-all duration-200"
        >
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-center text-blue-500">
              <highlight.icon height={36} width={36} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base md:text-lg font-semibold">
                {highlight.title}
              </h3>
              <p className="text-sm">{highlight.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
