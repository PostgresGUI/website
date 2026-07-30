import Link from "next/link";
import { TechnicalBlogPost } from "@/components/technical-blog-post";
import { getBlogPost, getBlogPostMetadata } from "@/lib/blog";

const post = getBlogPost("ssh-tunnel-postgres");
export const metadata = getBlogPostMetadata(post.slug);

export default function SshTunnelPostgresPage() {
  return (
    <TechnicalBlogPost
      post={post}
      intro={
        <>
          An SSH tunnel lets a PostgreSQL client on your Mac reach a database
          that is visible from a bastion host but not exposed to the public
          internet. The local client sends traffic to a loopback port, and SSH
          forwards it to the database from the remote side.
        </>
      }
      answer={
        <>
          Use PostgresGUI's built-in SSH section, or run{" "}
          <code>
            ssh -N -T -L 127.0.0.1:5433:DB_HOST:5432 USER@BASTION
          </code>
          . With the shell tunnel, connect PostgreSQL to 127.0.0.1 on port 5433.
          Keep host-key checking enabled.
        </>
      }
      screenshot={{
        src: "/screenshots4/PostgresGUI - Create connection (including SSH).webp",
        alt: "PostgresGUI connection form with SSH tunnel settings",
        caption:
          "The built-in tunnel keeps the SSH credentials and database credentials in separate sections.",
        width: 2364,
        height: 1414,
      }}
      codeBlocks={[
        {
          title: "Open a local tunnel from Terminal",
          code: `ssh -N -T \
  -o ExitOnForwardFailure=yes \
  -o ServerAliveInterval=60 \
  -o ServerAliveCountMax=3 \
  -L 127.0.0.1:5433:db.internal.example:5432 \
  deploy@bastion.example.com`,
          note:
            "Leave this process running. The database hostname is resolved from the bastion side.",
        },
        {
          title: "Connect through the local end",
          code: "psql 'postgresql://DB_USER@127.0.0.1:5433/DB_NAME'",
          note:
            "Use the database user here, not the SSH user.",
        },
      ]}
      sections={[
        {
          title: "Keep the two logins separate",
          paragraphs: [
            "The SSH server authenticates your Mac to the bastion. PostgreSQL then authenticates a database role after the tunnel is open. Those usernames and passwords are often different.",
          ],
          bullets: [
            "SSH host: bastion.example.com",
            "SSH user: deploy or another operating-system account",
            "Database host: the hostname reachable from the bastion",
            "Database user: a PostgreSQL role",
          ],
        },
        {
          title: "Use the built-in PostgresGUI tunnel",
          paragraphs: [
            "Create a connection and enable SSH Tunnel. Enter the bastion host, SSH port, SSH username, and either a password or private key. In the database section, keep the real private database host and port.",
            <>
              PostgresGUI opens the forwarding socket for the saved connection,
              then closes it when the database session ends. See the{" "}
              <Link href="/postgresql-gui-mac">
                PostgreSQL GUI for Mac workflow
              </Link>{" "}
              for the rest of the client.
            </>,
          ],
        },
        {
          title: "Use a shell tunnel when you need to inspect it",
          paragraphs: [
            "The -L value is local-address:local-port:database-host:database-port. Binding explicitly to 127.0.0.1 prevents other machines on your network from using the forwarded port.",
            "The -N and -T flags skip a remote command and terminal allocation. ExitOnForwardFailure makes ssh stop immediately when it cannot establish the requested forward.",
          ],
          code: {
            title: "Check whether the local port is listening",
            code: "nc -vz 127.0.0.1 5433",
            note:
              "A listening local port proves the forward exists, not that the PostgreSQL credentials are correct.",
          },
        },
        {
          title: "Put repeatable settings in SSH config",
          paragraphs: [
            "A named SSH host keeps the identity file, username, and forwarding options out of a long command. It also reduces the chance of forwarding to the wrong database.",
          ],
          code: {
            title: "~/.ssh/config",
            code: `Host production-db-tunnel
  HostName bastion.example.com
  User deploy
  IdentityFile ~/.ssh/id_ed25519
  LocalForward 127.0.0.1:5433 db.internal.example:5432
  ExitOnForwardFailure yes
  ServerAliveInterval 60
  ServerAliveCountMax 3`,
            note: "Start it with: ssh -N -T production-db-tunnel",
          },
        },
        {
          title: "Diagnose the failure in order",
          paragraphs: [
            "Test each boundary separately. That keeps an SSH-key problem from looking like a PostgreSQL-password problem.",
          ],
          bullets: [
            "Run ssh -v USER@BASTION and verify the expected host key and identity.",
            "From the bastion, confirm the private database host resolves and port 5432 is reachable.",
            "On the Mac, confirm the chosen local port is not already in use.",
            "Connect to 127.0.0.1 and the forwarded port with the database credentials.",
            "If PostgreSQL TLS is required beyond the bastion, keep the provider's SSL settings enabled.",
          ],
        },
      ]}
    />
  );
}
