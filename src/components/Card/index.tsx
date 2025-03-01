"use client";
import type { MouseEvent } from "react";

import type { DocumentType } from "@/types/api";

import { BookmarkButton } from "./BookmarkButton";
import { CardDetails } from "./CardDetails";

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
    <div className="flex items-center justify-between rounded-2xl pl-5 pr-3 py-4 hover:bg-liner-focus bg-white cursor-pointer w-full">
      <CardDetails
        id={id}
        url={url}
        title={title}
        netloc={netloc}
        faviconUrl={faviconUrl}
        imageUrl={imageUrl}
      />
      <BookmarkButton isSaved={isSaved} onSave={onSave} />
    </div>
  );
};
