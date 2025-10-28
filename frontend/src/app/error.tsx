"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[v0] Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Code */}
        <div className="space-y-4">
          <div className="inline-block">
            <span className="text-[10rem] md:text-[14rem] font-light leading-none tracking-tight text-foreground/10 select-none">
              500
            </span>
          </div>

          {/* Divider Line */}
          <div className="w-16 h-px bg-accent mx-auto" />
        </div>

        {/* Message */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            Something Went Wrong
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed text-pretty">
            We encountered an unexpected error. Please try again or return to
            the homepage.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border max-w-lg mx-auto">
              <p className="text-sm text-muted-foreground font-mono text-left break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Button
            onClick={reset}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[160px] h-12 text-base font-normal"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[160px] h-12 text-base font-normal border-border hover:bg-muted bg-transparent"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="pt-12 opacity-40">
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
