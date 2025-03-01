"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import Image from "next/image";

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
      <Image
        src="/images/logo.svg"
        unoptimized
        alt="logo"
        width={250}
        height={48}
      />
      <h2>Unexpected Error Was caught!</h2>
      <button type="button" className="modal-button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
