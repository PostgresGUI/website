import Link from "next/link";
import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("connect-postgresgui-to-neon");
export const metadata = getBlogPostMetadata(post.slug);

export default function ConnectPostgresGUIToNeonPage() {
  return (
    <TechnicalBlogPost
      post={post}
      intro={
        <>
          Neon's Connect dialog provides the host, database, role, password, and
          security parameters for the selected branch. A direct hostname and a
          pooled hostname reach the same branch, but they do not provide the
          same session behavior.
        </>
      }
      answer={
        <>
          Choose the branch, database, and role in Neon, then copy the generated
          values. Use the direct hostname for PostgresGUI, port 5432, and{" "}
          <strong>Verify Full</strong> SSL. Use Neon's <code>-pooler</code>{" "}
          hostname for application workloads that need transaction pooling.
        </>
      }
      screenshot={{
        src: "/screenshots4/PostgresGUI - Connect to server using connection stirng.webp",
        alt: "PostgresGUI connection form ready for Neon PostgreSQL values",
        caption:
          "Use the values from Neon's Connect dialog. The direct and pooled hostnames are easy to confuse, so keep the generated URL nearby.",
        width: 2336,
        height: 1456,
      }}
      codeBlocks={[
        {
          title: "Direct connection shape",
          code: "postgresql://ROLE:PASSWORD@ep-EXAMPLE-123456.us-east-2.aws.neon.tech/DATABASE?sslmode=verify-full",
          note:
            "Use the exact endpoint hostname, role, and database shown by Neon.",
        },
        {
          title: "Pooled application connection shape",
          code: "postgresql://ROLE:PASSWORD@ep-EXAMPLE-123456-pooler.us-east-2.aws.neon.tech/DATABASE?sslmode=require&channel_binding=require",
          note:
            "Neon's pooled hostname contains -pooler. Keep the complete generated string for application drivers that support channel binding.",
        },
      ]}
      sections={[
        {
          title: "Copy the values from the correct branch",
          paragraphs: [
            "Open the Neon project, click Connect, and select the branch, database, and role you intend to inspect. Copying a connection from another branch can succeed while showing entirely different data.",
            "For PostgresGUI, use the direct endpoint. The pooled endpoint uses PgBouncer in transaction mode and cannot preserve every session-level feature.",
          ],
        },
        {
          title: "Enter the values in PostgresGUI",
          paragraphs: [
            <>
              Paste the direct URI or enter its fields separately. PostgresGUI
              supports full certificate and hostname verification, but it does
              not currently enforce Neon's <code>channel_binding</code> URI
              parameter. Selecting Verify Full gives the desktop connection
              certificate and hostname verification. See the{" "}
              <Link href="/connection-string/neon">
                Neon connection-string reference
              </Link>{" "}
              for the compact URI breakdown.
            </>,
          ],
          bullets: [
            "Host: the endpoint without -pooler",
            "Port: 5432",
            "Database: the selected Neon database, often neondb",
            "User: the selected Neon role",
            "SSL: Verify Full",
          ],
        },
        {
          title: "Confirm the endpoint and TLS session",
          paragraphs: [
            "Run one query after connecting. Besides proving the credentials work, it makes the selected database, role, server address, and TLS state visible.",
          ],
          code: {
            title: "Connection check",
            code: `select
  current_database() as database,
  current_user as role,
  inet_server_addr() as server_address,
  ssl
from pg_stat_ssl
where pid = pg_backend_pid();`,
            note: "The ssl value should be true.",
          },
        },
        {
          title: "Fix the common failures",
          paragraphs: [
            "Start with the generated URL again. Neon endpoint IDs, branch choices, and roles are precise, and a nearly correct hostname is still wrong.",
          ],
          bullets: [
            "Connection starts slowly: the branch compute may be waking from an idle state.",
            "Password authentication failed: recopy the role and password from the selected branch.",
            "Wrong data appears: confirm the branch and database selected in the Connect dialog.",
            "Session command fails through the pooler: switch the desktop client or migration command to the direct endpoint.",
          ],
        },
        {
          title: "Use different URLs for different jobs",
          paragraphs: [
            "A direct URL is a sensible choice for a desktop inspection session, migrations, and tools that need stable session state. A pooled URL is useful for applications that open many short connections.",
            <>
              Keep both out of source control. PostgresGUI stores saved
              credentials in the macOS Keychain. The{" "}
              <Link href="/postgresql-gui-mac">
                Mac PostgreSQL client overview
              </Link>{" "}
              shows the rest of the connection and query workflow.
            </>,
          ],
        },
      ]}
    />
  );
}
