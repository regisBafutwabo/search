"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { SearchBox } from "@/components/SearchBox";

export const HomeSearch = () => {
  const route = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    const timestamp = Date.now();

    route.push(
      `/results?search=${encodeURIComponent(trimmedValue)}&timestamp=${timestamp}`,
    );
  };

  return (
    <SearchBox
      value={value}
      onEnter={handleSearch}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
