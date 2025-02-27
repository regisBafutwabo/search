"use client";
import type { MouseEvent } from 'react';

import Image from 'next/image';

import { SaveIcon } from '../Icons/SaveIcon';

type CardProps = {
  id: string;
  title: string;
  imageUrl: string;
  faviconUrl: string;
  url: string;
  netloc: string;
  isSaved: boolean;
  handleSave: () => void;
};

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
      className="flex items-center gap-4 rounded-2xl pl-5 pr-3 py-4 hover:bg-liner-focus bg-white cursor-pointer"
    >
      <div className="min-w-18 min-h-18 max-w-18 max-h-18">
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={72}
            height={72}
            className="w-full h-full object-cover rounded-xl"
            alt="default thumbnail"
          />
        ) : (
          <Image
            src="/images/default-thumbnail.svg"
            width={72}
            height={72}
            unoptimized
            className="w-full h-full object-cover rounded-xl"
            alt="default thumbnail"
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-[14px]">
        <div className="card-header h-10">
          <p className="text-ellipsis overflow-hidden line-clamp-2">{title}</p>
        </div>
        <div className="flex items-center gap-[6px]">
          {faviconUrl ? (
            <Image
              src={faviconUrl}
              width={14}
              height={14}
              alt={`${id}-result-favicon`}
            />
          ) : (
            <Image
              src="/images/globe.svg"
              width={14}
              height={14}
              unoptimized
              alt="placeholder-result-favicon"
            />
          )}
          <p className="card-link">{netloc}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onSave}
        className="cursor-pointer hover:bg-liner-gray p-2 rounded-xl"
      >
        <SaveIcon active={isSaved} />
      </button>
    </a>
  );
};
