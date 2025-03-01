"use client";
import { useState } from "react";

import { ResultContainer } from "../ResultContainer";
import { ResultSearch } from "../ResultSearch";

type ResultsWrapperProps = {
  searchKey?: string;
  timestamp?: string;
};

export function ResultsWrapper({ searchKey, timestamp }: ResultsWrapperProps) {
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  return (
    <>
      <ResultSearch searchKey={searchKey} showBorder={showHeaderBorder} />
      <ResultContainer
        searchValue={searchKey}
        timestamp={timestamp}
        onScroll={(scrollTop) => setShowHeaderBorder(scrollTop > 0)}
      />
    </>
  );
}
