import type { MouseEvent } from "react";

import { SaveIcon } from "@/components/Svg/SaveIcon";

type BookmarkButtonProps = {
  onSave: (event: MouseEvent<HTMLButtonElement>) => void;
  isSaved: boolean;
};

export const BookmarkButton = ({ onSave, isSaved }: BookmarkButtonProps) => {
  return (
    <button
      type="button"
      onClick={onSave}
      className="cursor-pointer hover:bg-liner-gray p-2 rounded-xl"
    >
      <SaveIcon active={isSaved} />
    </button>
  );
};
