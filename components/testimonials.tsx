const testimonials = [
  {
    quote:
      "Finally, a PostgreSQL client that doesn't eat all my RAM. PostgresGUI is fast, clean, and native. Exactly what I needed.",
    author: "Developer",
    role: "Full Stack Engineer",
  },
  {
    quote:
      "Love the minimalist design. Does exactly what I need without the bloat. The one-time purchase is refreshing in a world of subscriptions.",
    author: "Database Admin",
    role: "DevOps Engineer",
  },
  {
    quote:
      "As someone who values privacy, I appreciate that PostgresGUI doesn't phone home. Plus, it's open source so I can verify that myself.",
    author: "Security Engineer",
    role: "Security Researcher",
  },
];

export function Testimonials() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {testimonials.map((testimonial, index) => (
          <blockquote
            key={index}
            className="bg-card p-6 md:p-8 rounded-2xl border border-border/50 hover:border-[var(--postgres-blue)]/50 dark:hover:border-[var(--postgres-blue-light)]/50 transition-swiftui shadow-swiftui hover:shadow-lg gradient-overlay"
          >
            <p className="mb-4 leading-relaxed text-sm">
              "{testimonial.quote}"
            </p>
            <footer className="border-t border-border/30 pt-3">
              <cite className="not-italic">
                <div className="font-display text-sm tracking-tight">
                  {testimonial.author}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  // {testimonial.role}
                </div>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-accent/50 rounded-xl border border-border/30 shadow-sm backdrop-blur-sm">
          <span className="text-[var(--postgres-blue)] dark:text-[var(--postgres-blue-light)]">★★★★★</span>
          <span className="font-mono text-sm">
            <span className="font-bold">4.8/5</span> on Gumroad
          </span>
        </div>
      </div>
    </div>
  );
}
