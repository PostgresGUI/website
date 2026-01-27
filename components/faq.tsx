"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { getTranslations, Locale } from "@/lib/translations";

export type FAQItemData = {
  question: string;
  answer: React.ReactNode;
};

export function FAQItem({
  question,
  answer,
  isLast = false,
  defaultOpen = false,
}: {
  question: string;
  answer: React.ReactNode;
  isLast?: boolean;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`${!isLast ? "border-b border-stone-200 dark:border-stone-700" : ""}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-xl md:text-2xl font-semibold pr-8 text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
          {question}
        </span>
        <ChevronDownIcon
          width={40}
          height={40}
          className={`flex-shrink-0 text-stone-400 dark:text-stone-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <div className="text-stone-600 dark:text-stone-400 leading-relaxed pr-12 text-lg md:text-xl">
          {answer}
        </div>
      </div>
    </div>
  );
}

export type FAQProps = {
  /** Custom FAQ items to display. If not provided, uses locale-based translations. */
  items?: FAQItemData[];
  /** Locale for translations (only used when items is not provided) */
  locale?: Locale;
  /** Additional className for the container */
  className?: string;
};

export function FAQ({ items, locale = "en", className = "" }: FAQProps) {
  const t = getTranslations(locale);
  const faqItems = items ?? t.faq;

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      {faqItems.map((faq, index) => (
        <FAQItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          isLast={index === faqItems.length - 1}
        />
      ))}
    </div>
  );
}
