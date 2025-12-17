"use client";

import { useState, useEffect } from "react";

export function FlowingData() {
  // Generate stream configurations
  const streams = [
    // Left side streams
    { left: "8%", delay: "0s", duration: "25s", opacity: 0.15, width: "1px" },
    { left: "18%", delay: "3s", duration: "30s", opacity: 0.12, width: "2px" },
    { left: "25%", delay: "5s", duration: "28s", opacity: 0.18, width: "1px" },
    { left: "35%", delay: "2s", duration: "32s", opacity: 0.1, width: "1px" },

    // Right side streams
    { left: "65%", delay: "4s", duration: "27s", opacity: 0.16, width: "1px" },
    { left: "72%", delay: "1s", duration: "29s", opacity: 0.14, width: "2px" },
    { left: "82%", delay: "6s", duration: "26s", opacity: 0.11, width: "1px" },
    { left: "92%", delay: "2.5s", duration: "31s", opacity: 0.13, width: "1px" },
  ];

  // Generate particles only on client to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    left: string;
    delay: string;
    duration: string;
    size: string;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 15}s`,
        size: Math.random() > 0.7 ? "3px" : "2px",
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Flowing vertical streams */}
      {streams.map((stream, i) => (
        <div
          key={`stream-${i}`}
          className="data-stream"
          style={{
            left: stream.left,
            width: stream.width,
            animationDelay: stream.delay,
            animationDuration: stream.duration,
            opacity: stream.opacity,
          }}
        />
      ))}

      {/* Floating data particles */}
      {particles.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className="data-particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      <style jsx>{`
        .data-stream {
          position: absolute;
          top: -100%;
          height: 30vh;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--postgres-blue),
            transparent
          );
          animation: flowDown linear infinite;
          filter: blur(0.5px);
        }

        .data-particle {
          position: absolute;
          top: -10px;
          background: var(--postgres-blue);
          border-radius: 50%;
          animation: particleFlow linear infinite;
          opacity: 0;
        }

        @keyframes flowDown {
          0% {
            top: -30vh;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            top: 100vh;
            opacity: 0;
          }
        }

        @keyframes particleFlow {
          0% {
            top: -10px;
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            top: calc(100vh + 10px);
            opacity: 0;
          }
        }

        /* Responsive behavior */
        @media (max-width: 768px) {
          .data-stream:nth-child(n+5),
          .data-particle:nth-child(n+10) {
            display: none;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .data-stream,
          .data-particle {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
