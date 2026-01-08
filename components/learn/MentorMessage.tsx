"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { TextType } from "./TextType";
import { Check } from "lucide-react";

interface MentorMessageProps {
  message: {
    name: string;
    role: string;
    message: string;
  };
  syntax?: string;
  variant?: "default" | "success";
  className?: string;
  animate?: boolean;
}

export function MentorMessage({
  message,
  syntax,
  variant = "default",
  className,
  animate = true,
}: MentorMessageProps) {
  const isSuccess = variant === "success";

  return (
    <div className={cn("animate-slide-in flex gap-1", className)}>
      {/* Avatar */}
      <div className="shrink-0 pt-1">
        <Image
          src="/postgresgui-elephant.png"
          alt={message.name}
          width={72}
          height={72}
          className="object-contain"
        />
      </div>

      {/* Chat bubble */}
      <div className="flex-1 min-w-0 max-w-2xl">
        <div
          className={cn(
            "bg-muted rounded-2xl rounded-tl-md px-4 py-3 w-full relative",
            isSuccess && "bg-white shadow-[inset_0_0_30px_rgba(34,197,94,0.35)]"
          )}
        >
          {isSuccess && (
            <div className="absolute -top-2 right-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          )}
          {/* Name and role */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-semibold">{message.name}</span>
            <span className="text-sm text-muted-foreground">
              {message.role}
            </span>
          </div>

          {/* Message */}
          <p className="text-lg leading-relaxed text-foreground">
            {animate ? (
              <TextType text={message.message} speed={15} />
            ) : (
              message.message
            )}
          </p>

          {/* Optional example block */}
          {syntax && (
            <div className="mt-3 rounded-lg bg-card border border-border p-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Example
              </p>
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {syntax}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
