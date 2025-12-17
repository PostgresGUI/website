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
          className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
        >
          GitHub ↗
        </a>
      </>
    ),
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-500 dark:border-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: LaptopIcon,
    title: "Native",
    description: (
      <>
        Written in Swift
        <br />
        No Electron
      </>
    ),
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    borderColor: "border-sky-500 dark:border-sky-400",
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
    iconColor: "text-sky-600 dark:text-sky-400",
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
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-500 dark:border-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: CreditCardOffIcon,
    title: "No Subscription",
    description: "Buy once, use forever",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-500 dark:border-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: CircleCheckIcon,
    title: "No Data Collection",
    description: "All data stays local on your Mac",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    borderColor: "border-cyan-500 dark:border-cyan-400",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: DocToRightIcon,
    title: "Minimalistic UI",
    description: "No bloated features",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    borderColor: "border-pink-500 dark:border-pink-400",
    iconBg: "bg-pink-100 dark:bg-pink-900/50",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
];

export function Highlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {highlights.map((highlight, index) => (
        <div
          key={highlight.title}
          className={`group p-6 md:p-8 rounded-sharp border-2 transition-all duration-200 hover:-translate-y-1 ${
            highlight.bgColor
          } ${highlight.borderColor} ${
            index === 0 ? "md:col-span-2 lg:col-span-1" : ""
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-sharp ${highlight.iconBg} border-2 ${highlight.borderColor}`}
              >
                <highlight.icon
                  height={24}
                  width={24}
                  className={highlight.iconColor}
                />
              </div>
              <h3 className="text-base md:text-lg font-display tracking-tight">
                {highlight.title}
              </h3>
            </div>
            <p className="leading-relaxed">{highlight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
