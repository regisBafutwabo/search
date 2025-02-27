"use client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { BackIcon } from "@/components/Icons/BackIcon";
import { SearchBox } from "@/components/Shared/SearchBox";

type ResultsHeaderProps = {
  searchKey?: string;
};

export const ResultsHeader = ({ searchKey }: ResultsHeaderProps) => {
  const router = useRouter();

  const [value, setValue] = useState(searchKey || "");
  const [showBorder, setShowBorder] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {};

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is not intersecting with the viewport, we've scrolled
        setShowBorder(!entry.isIntersecting);
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={observerRef}
        style={{ height: "0px", width: "100%", position: "absolute", top: 0 }}
      />
      <div
        className={`flex bg-white items-center pl-8 gap-3 h-20 sticky top-0 z-10 ${showBorder ? "border-b border-liner-gray" : ""}`}
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
    </>
  );
};
