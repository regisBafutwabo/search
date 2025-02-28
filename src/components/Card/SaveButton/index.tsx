import type { MouseEvent } from "react";

import { SaveIcon } from "@/components/Icons/SaveIcon";

type SaveButtonProps = {
  onSave: (event: MouseEvent<HTMLButtonElement>) => void;
  isSaved: boolean;
};

export const SaveButton = ({ onSave, isSaved }: SaveButtonProps) => {
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
