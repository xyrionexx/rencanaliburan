import BackButton from "@/components/component/backbutton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Code */}
        <div className="space-y-4">
          <div className="inline-block">
            <span className="text-[10rem] md:text-[14rem] font-light leading-none tracking-tight text-foreground/10 select-none">
              404
            </span>
          </div>

          {/* Divider Line */}
          <div className="w-16 h-px bg-accent mx-auto" />
        </div>

        {/* Message */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed text-pretty">
            The page you're looking for doesn't exist or has been moved to a new
            location.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[160px] h-12 text-base font-normal"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <BackButton />
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
