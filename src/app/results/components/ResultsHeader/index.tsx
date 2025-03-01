"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { BackIcon } from "@/components/Icons/BackIcon";
import { SearchBox } from "@/components/Shared/SearchBox";

type ResultsHeaderProps = {
  searchKey?: string;
  showBorder: boolean;
};

export const ResultsHeader = ({
  searchKey,
  showBorder,
}: ResultsHeaderProps) => {
  const router = useRouter();

  const [value, setValue] = useState(searchKey || "");

  const handleSearch = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    const timestamp = Date.now();

    router.push(
      `/results?search=${encodeURIComponent(trimmedValue)}&timestamp=${timestamp}`,
    );
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div
      className={`flex bg-white items-center sm:px-8 gap-3 h-20 sticky top-0 z-10 border-b ${showBorder ? " border-liner-gray " : "border-transparent"}`}
    >
      <button
        type="button"
        onClick={goBack}
        className="w-10 h-10 border-0 rounded-xl p-2 hover:bg-liner-focus cursor-pointer "
      >
        <BackIcon />
      </button>
      <SearchBox
        value={value}
        onEnter={handleSearch}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        onResetInput={() => setValue("")}
      />
    </div>
  );
};
