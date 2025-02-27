"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { SearchBox } from "../Shared/SearchBox";

export const HomeSearch = () => {
  const route = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    route.push(`/results?search=${encodeURIComponent(value.trim())}`);
  };

  return (
    <SearchBox
      value={value}
      onEnter={handleSearch}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
