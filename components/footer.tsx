import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 mt-auto">
      <div className="max-w-3xl mx-auto border-gray-200 dark:border-gray-800 pt-8">
        <div className="flex flex-col items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col justify-center items-center gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/support", label: "Support" },
              { href: "/privacy", label: "Privacy Policy" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline underline-offset-4"
              >
                {label}
              </Link>
            ))}
          </div>

          <p>&copy; 2025 PostgresGUI</p>
        </div>
      </div>
    </footer>
  );
}
