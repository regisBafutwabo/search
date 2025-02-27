"use client";
import {
  type ChangeEventHandler,
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

import { FilledCloseIcon } from "../../Icons/FilledCloseIcon";
import { SearchIcon } from "../../Icons/SearchIcons";

type SearchBoxProps = {
  value: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onResetInput?: () => void;
  onEnter: () => void;
};

export const SearchBox = ({
  value,
  onChange,
  fullWidth = false,
  onResetInput,
  onEnter,
}: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onEnter();
  };

  const handleReset = () => {
    if (onResetInput) {
      onResetInput();
      inputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-4 items-center h-12 border rounded-[1000px] px-4 py-3 ${isFocused ? "border-bd-active caret-bd-active border-[1.5px]" : "border-bd-default hover:border-bd-hover"} ${fullWidth ? "w-[644px]" : "w-[560px]"}`}
    >
      {!fullWidth && <SearchIcon active={isFocused} />}
      <input
        value={value}
        ref={inputRef}
        onChange={onChange}
        placeholder="Search keyword"
        className="w-full search-box outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        aria-label="Search input"
        maxLength={100}
      />
      {value && fullWidth && (
        <button type="reset" className="cursor-pointer" onClick={handleReset}>
          <FilledCloseIcon />
        </button>
      )}
    </form>
  );
};
