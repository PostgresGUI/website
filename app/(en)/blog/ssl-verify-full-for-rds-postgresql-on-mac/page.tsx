import Link from "next/link";
import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("ssl-verify-full-for-rds-postgresql-on-mac");
export const metadata = getBlogPostMetadata(post.slug);

export default function RdsPostgreSQLVerifyFullPage() {
  return (
    <TechnicalBlogPost
      post={post}
      intro={
        <>
          Amazon RDS for PostgreSQL supports encrypted connections, but{" "}
          <code>sslmode=require</code> only requires encryption in libpq.{" "}
          <code>verify-full</code> also validates the certificate chain and
          confirms that the hostname matches the RDS certificate.
        </>
      }
      answer={
        <>
          Download AWS's current global CA bundle, store it at{" "}
          <code>~/.postgresql/root.crt</code>, and connect to the exact RDS
          endpoint with <code>sslmode=verify-full</code>. PostgresGUI can verify
          certificates from the system trust store, but it does not currently
          load a custom <code>sslrootcert</code> file from the URI, so use psql
          for this custom-CA workflow.
        </>
      }
      screenshot={{
        src: "/screenshots4/PostgresGUI - Connect to server using connection stirng.webp",
        alt: "PostgresGUI connection form with PostgreSQL SSL settings",
        caption:
          "PostgresGUI exposes SSL modes for ordinary trusted certificates. The custom AWS CA-file workflow below uses libpq and psql.",
        width: 2336,
        height: 1456,
      }}
      codeBlocks={[
        {
          title: "Install the current AWS RDS CA bundle",
          code: `mkdir -p ~/.postgresql
curl --fail --location \
  "https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem" \
  --output ~/.postgresql/root.crt
chmod 644 ~/.postgresql/root.crt`,
          note:
            "AWS documents the global bundle for commercial regions. Use the region-specific bundle when your policy requires it.",
        },
        {
          title: "Connect with hostname verification",
          code: `psql "host=INSTANCE.abcdefg.us-east-1.rds.amazonaws.com \
port=5432 \
dbname=DB_NAME \
user=DB_USER \
sslmode=verify-full \
sslrootcert=$HOME/.postgresql/root.crt"`,
        },
      ]}
      sections={[
        {
          title: "Copy the endpoint, not an IP address",
          paragraphs: [
            "Open the RDS database in AWS and copy the endpoint from Connectivity & security. Certificate hostname verification is performed against that name.",
            "An IP address does not provide the expected RDS hostname. A custom DNS alias can also fail unless its name is present in the certificate.",
          ],
        },
        {
          title: "What verify-full changes",
          paragraphs: [
            "A libpq client defaults to sslmode=prefer, which can fall back to an unencrypted connection. require prevents that fallback but does not perform complete server identity verification without trusted roots.",
            "verify-full requires TLS, validates the chain to the configured AWS root, and checks the requested hostname. That is the setting to use when server identity matters.",
          ],
        },
        {
          title: "Verify the active session",
          paragraphs: [
            "Once psql connects, use \\conninfo for a quick TLS summary, then query pg_stat_ssl for values PostgreSQL reports about the current backend.",
          ],
          code: {
            title: "TLS check",
            code: `\\conninfo

select ssl, version, cipher, bits
from pg_stat_ssl
where pid = pg_backend_pid();`,
            note: "ssl should be true. The version and cipher depend on the negotiated connection.",
          },
        },
        {
          title: "Fix certificate errors without weakening verification",
          paragraphs: [
            "Do not solve a certificate error by silently switching to disable or prefer. Check the endpoint and root file first.",
            <>
              For the full behavior of disable, prefer, require, verify-ca, and
              verify-full, read the{" "}
              <Link href="/blog/postgresql-sslmode-explained">
                PostgreSQL sslmode guide
              </Link>
              . If the URI fails before TLS starts, use the{" "}
              <Link href="/blog/postgresql-connection-string-errors">
                connection-string error checklist
              </Link>
              .
            </>,
          ],
          bullets: [
            "No such file: verify the sslrootcert path and expand $HOME in the shell, not inside a single-quoted URI.",
            "Certificate verify failed: download the current AWS bundle again and confirm the instance CA in RDS.",
            "Hostname mismatch: use the exact RDS endpoint, not an IP address or unrelated alias.",
            "Timeout: check the security group, route, VPN, public-access setting, or bastion before changing TLS.",
          ],
        },
        {
          title: "Use a tunnel for private RDS instances",
          paragraphs: [
            <>
              A private RDS instance should stay private. Reach it through a VPN
              or bastion instead of opening port 5432 to the internet. The{" "}
              <Link href="/blog/ssh-tunnel-postgres">
                PostgreSQL SSH tunnel guide
              </Link>{" "}
              covers both the shell and PostgresGUI tunnel paths.
            </>,
            <>
              For certificates already trusted by macOS, PostgresGUI's Verify
              Full mode checks the chain and hostname. Review the{" "}
              <Link href="/postgresql-gui-mac">Mac client features</Link> before
              choosing the connection method.
            </>,
          ],
        },
      ]}
    />
  );
}
