"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

const faqs = [
  {
    question: "What macOS versions are supported?",
    answer:
      "PostgresGUI requires macOS 26.0 or later. It's optimized for Apple Silicon but also works on Intel Macs.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No. PostgresGUI is a one-time purchase. Pay $14.99 once and use it forever. No monthly fees, no recurring charges, no hidden costs.",
  },
  {
    question: "Do you collect my data?",
    answer:
      "No. PostgresGUI does not collect any telemetry, analytics, or usage data. All your database connections and queries stay completely local on your Mac.",
  },
  {
    question: "Does PostgresGUI support other databases besides PostgreSQL?",
    answer:
      "No. PostgresGUI is designed specifically for PostgreSQL only. It does not support MySQL, SQLite, MongoDB, or other database systems.",
  },
  {
    question: "How does PostgresGUI compare to TablePlus?",
    answer:
      "TablePlus is a powerful multi-database tool with advanced features like code review, plugin systems, inline editing, advanced filters, and support for 15+ database types. PostgresGUI prioritizes simplicity and a lightweight design over many features. It offers a cleaner interface and is open source.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl mb-4 overflow-hidden bg-card shadow-sm hover:shadow-md transition-swiftui">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-swiftui"
        aria-expanded={isOpen}
      >
        <span className="text-base font-display pr-8 tracking-tight">
          {question}
        </span>
        <ChevronDownIcon
          width={20}
          height={20}
          className={`flex-shrink-0 transition-transform text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 leading-relaxed border-t border-border/30 pt-4">
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
        <FAQItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
}
