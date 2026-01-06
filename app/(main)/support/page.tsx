import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support - PostgresGUI",
  description:
    "Get support for PostgresGUI. Report issues, ask questions, or contact us directly.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SupportPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-2xl mx-auto prose dark:prose-invert">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <h1>Support</h1>
        </header>

        <div>
          <p>
            Need help with PostgresGUI? You can reach out to us through the
            following 2 ways:
          </p>

          <p>
            <strong>1. Report Issues</strong>
            <br /> Found a bug or have a feature request? Please report it on
            our{" "}
            <Link
              href="https://github.com/postgresgui/postgresgui/issues"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub Issues page
            </Link>
            . This helps us track and prioritize improvements.
          </p>

          <p>
            <strong>2. Contact Us</strong>
            <br /> For direct inquiries or questions, you can reach us at{" "}
            <Link
              href="mailto:fikri@mghazi.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              fikri@mghazi.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
