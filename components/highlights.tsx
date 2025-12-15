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
    icon: SearchCheckIcon,
    title: "Open Source",
    description: (
      <>
        View code on{" "}
        <a
          href="https://github.com/postgresgui/postgresgui"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          GitHub ↗
        </a>
      </>
    ),
  },
  {
    icon: LaptopIcon,
    title: "Native",
    description: (
      <>
        Writtin in Swift
        <br />
        No Electron
      </>
    ),
  },
  {
    icon: RocketIcon,
    title: "Lightweight",
    description: (
      <>
        14.6 MB installer
        <br /> 25.8 MB installed
      </>
    ),
  },
  {
    icon: CreditCardOffIcon,
    title: "No Subscription",
    description: "Buy once, use forever",
  },
  {
    icon: CircleCheckIcon,
    title: "No Data Collection",
    description: "All data stays local on your Mac",
  },
  {
    icon: DocToRightIcon,
    title: "Minimalistic UI",
    description: "No bloated features",
  },
];

export function Highlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {highlights.map((highlight) => (
        <div
          key={highlight.title}
          className="group p-4 md:p-12 rounded-2xl border dark:border-stone-700 dark:bg-stone-800 transition-all duration-200"
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
