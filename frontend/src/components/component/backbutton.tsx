// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="min-w-[160px] h-12 text-base font-normal border-border hover:bg-muted bg-transparent"
        onClick={() => router.back()}
      >
        <>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </>
      </Button>
    </>
  );
}
