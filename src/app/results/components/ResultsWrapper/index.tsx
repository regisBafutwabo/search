"use client";
import { useState } from "react";

import { ResultContainer } from "../ResultContainer";
import { ResultsHeader } from "../ResultsHeader";

type ResultsWrapperProps = {
  searchKey?: string;
  timestamp?: string;
};

export function ResultsWrapper({ searchKey, timestamp }: ResultsWrapperProps) {
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  return (
    <>
      <ResultsHeader searchKey={searchKey} showBorder={showHeaderBorder} />
      <ResultContainer
        searchValue={searchKey}
        timestamp={timestamp}
        onScroll={(scrollTop) => setShowHeaderBorder(scrollTop > 0)}
      />
    </>
  );
}
