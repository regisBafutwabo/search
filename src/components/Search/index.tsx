"use client";

import { useState } from 'react';

import { SearchBox } from '../common/SearchBox';

export const Search = () => {
  const [value, setValue] = useState("");

  const handleSearch = () => {};

  return (
    <SearchBox
      value={value}
      fullWidth
      onEnter={handleSearch}
      onChange={(e) => setValue(e.target.value)}
      onResetInput={() => setValue("")}
    />
  );
};
