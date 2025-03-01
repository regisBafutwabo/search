"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { Logo } from "@/components/Icons/Logo";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unexpected Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      <h2>Unexpected Error Was caught!</h2>
      <button type="button" className="p-3" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
