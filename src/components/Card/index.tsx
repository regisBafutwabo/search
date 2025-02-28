"use client";
import type { MouseEvent } from "react";

import type { DocumentType } from "@/types/api";

import { CardDetails } from "./CardDetails";
import { SaveButton } from "./SaveButton";

interface CardProps extends DocumentType {
  handleSave: () => void;
}

export const Card = (props: CardProps) => {
  const { id, title, url, imageUrl, faviconUrl, netloc, isSaved, handleSave } =
    props;

  const onSave = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    handleSave();
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-2xl pl-5 pr-3 py-4 hover:bg-liner-focus bg-white cursor-pointer"
    >
      <CardDetails
        id={id}
        title={title}
        netloc={netloc}
        isSaved={isSaved}
        faviconUrl={faviconUrl}
        imageUrl={imageUrl}
      />
      <SaveButton isSaved={isSaved} onSave={onSave} />
    </a>
  );
};
