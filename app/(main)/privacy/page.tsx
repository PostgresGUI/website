import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - PostgresGUI",
  description:
    "PostgresGUI Privacy Policy - Your data stays on your device. We do not collect, transmit, or store any personal information.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-2xl mx-auto prose dark:prose-invert">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <h1>Privacy Policy</h1>
          <p>Last Updated: December 1, 2025</p>
        </header>

        <div>
          <p>
            PostgresGUI is a local-only PostgreSQL macOS client. We do not
            collect, transmit, store, or share any of your personal information
            or usage data.
          </p>

          <p>
            All data used by PostgresGUI, including database credentials,
            connection profiles, SQL queries, and results, remains exclusively
            on your Mac. You have the option to save database passwords securely
            in your macOS Keychain via a "Save Password in Keychain" checkbox.
            Connection information is stored in your application's local
            storage. No data is synchronized to iCloud or any cloud service.
          </p>

          <p>
            The only network connections made by PostgresGUI are directly to the
            PostgreSQL database servers you explicitly configure and connect to.
            We are not an intermediary in these connections. PostgresGUI does
            not use any third-party services including analytics platforms,
            crash reporting services, advertising networks, or cloud storage
            services.
          </p>

          <p>
            You have complete control over your data. You can delete connection
            profiles directly in the app. If you chose to save passwords in the
            Keychain, deleting a connection also removes associated passwords
            from macOS Keychain. Uninstalling PostgresGUI removes the
            application and its local data. No data remains on our servers
            because no data was ever sent to us.
          </p>

          <p>
            If we ever introduce features that involve data collection, cloud
            synchronization, or online services in the future, this Privacy
            Policy will be updated accordingly, you will be clearly notified if
            you purchased the app, and any such features will be optional and
            require explicit consent.
          </p>

          <p>
            If you have questions about this Privacy Policy, contact us at
            fikri@mghazi.com.
          </p>
        </div>
      </div>
    </div>
  );
}
