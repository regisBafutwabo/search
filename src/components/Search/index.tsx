"use client";

import { useState } from "react";

import { SearchBox } from "../Shared/SearchBox";

export const Search = () => {
  const [value, setValue] = useState("");

  const handleSearch = () => {};

  return (
    <SearchBox
      value={value}
      onEnter={handleSearch}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
