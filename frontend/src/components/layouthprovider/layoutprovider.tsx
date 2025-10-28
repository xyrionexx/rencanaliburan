"use client";
import { SessionProvider } from "next-auth/react";
import LayoutClient from "../layoutClient/layoutClient";
import type { ReactNode } from "react";

export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LayoutClient>{children}</LayoutClient>
    </SessionProvider>
  );
}
