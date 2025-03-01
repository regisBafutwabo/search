"use client";

import { useEffect } from "react";
import { preconnect } from "react-dom";

export function Preconnect() {
  useEffect(() => {
    preconnect("https://frontend.assignment.getliner.com", {
      crossOrigin: "anonymous",
    });
  }, []);

  return null;
}
