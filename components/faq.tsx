"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import Link from "next/link";

const faqs = [
  {
    question: "What macOS versions are supported?",
    answer:
      "PostgresGUI requires macOS 14 (Sonoma) or later. It's optimized for Apple Silicon but also works on Intel Macs.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No! PostgresGUI is a one-time purchase. Pay $14.99 once and use it forever. No monthly fees, no recurring charges, no hidden costs.",
  },
  {
    question: "Can I use this for commercial projects?",
    answer:
      "Yes! Your purchase includes a license for both personal and commercial use. Use PostgresGUI for work, client projects, or any professional development.",
  },
  {
    question: "How do I install PostgreSQL?",
    answer: (
      <>
        PostgresGUI is a client application - you'll need PostgreSQL installed
        separately. The easiest way is using Homebrew:{" "}
        <code className="bg-gray-100 dark:bg-stone-800 px-2 py-1 rounded text-sm">
          brew install postgresql@16
        </code>
        . You can also download it from{" "}
        <Link
          href="https://www.postgresql.org/download/macosx/"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          postgresql.org
        </Link>
        .
      </>
    ),
  },
  {
    question: "What's your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee. If PostgresGUI doesn't meet your needs, contact us within 14 days of purchase for a full refund, no questions asked.",
  },
  {
    question: "How is this different from the open source version?",
    answer:
      "The paid version and open source version are identical in features. Your purchase supports ongoing development and maintenance. You also get priority support via email.",
  },
  {
    question: "Can I connect to remote databases?",
    answer:
      "Yes! PostgresGUI supports connections to both local and remote PostgreSQL databases. Connect via hostname/IP, custom ports, and SSH tunnels.",
  },
  {
    question: "Do you collect my data?",
    answer:
      "No. PostgresGUI does not collect any telemetry, analytics, or usage data. All your database connections and queries stay completely local on your Mac. We respect your privacy.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl mb-4 overflow-hidden bg-card shadow-sm hover:shadow-md transition-swiftui">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-swiftui"
        aria-expanded={isOpen}
      >
        <span className="text-base font-display pr-8 tracking-tight">{question}</span>
        <ChevronDownIcon
          width={20}
          height={20}
          className={`flex-shrink-0 transition-transform text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq) => (
        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
