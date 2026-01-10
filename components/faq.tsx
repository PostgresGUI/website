"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { getTranslations, Locale } from "@/lib/translations";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl mb-4 overflow-hidden bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition-swiftui">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-swiftui text-gray-900 dark:text-white"
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
        <div className="px-5 pb-5 leading-relaxed border-t border-border/30 pt-4 text-gray-700 dark:text-gray-300">
          {answer}
        </div>
      )}
    </div>
  );
}

type FAQProps = {
  locale?: Locale;
};

export function FAQ({ locale = "en" }: FAQProps) {
  const t = getTranslations(locale);

  return (
    <div className="max-w-3xl mx-auto">
      {t.faq.map((faq) => (
        <FAQItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
}
