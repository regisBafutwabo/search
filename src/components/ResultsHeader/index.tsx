"use client";
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { SearchBox } from '../common/SearchBox';
import { BackIcon } from '../Icons/BackIcon';

export const ResultsHeader = () => {
  const [value, setValue] = useState("");
  const [showBorder, setShowBorder] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {};

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
