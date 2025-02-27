"use client";
import {
  type ChangeEventHandler,
  useState,
} from 'react';

import { CloseIcon } from '../../Icons/CloseIcon';
import { SearchIcon } from '../../Icons/SearchIcons';

type SearchBoxProps = {
  value: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onResetInput: () => void;
  onEnter: () => void;
};

export const SearchBox = ({
  value,
  onChange,
  fullWidth,
  onResetInput,
  onEnter,
}: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div
      className={`flex gap-4 items-center h-12 border rounded-[1000px] px-4 py-3 ${isFocused ? "border-[#00C3CC] caret-[#00C3CC] border-[1.5px]" : "border-[#C2C6CE] hover:border-[#959CA6]"} ${fullWidth ? "w-[644px]" : "w-[560px]"}`}
    >
      {!fullWidth && <SearchIcon active={isFocused} />}
      <input
        value={value}
        onChange={onChange}
        placeholder="Search keyword"
        className="w-full text-base/4 tracking-normal font-normal outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      {value && fullWidth && (
        <button type="reset" className="cursor-pointer" onClick={onResetInput}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
