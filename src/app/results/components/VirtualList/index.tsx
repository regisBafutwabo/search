import { useCallback } from "react";

import { Virtuoso } from "react-virtuoso";

import { Card } from "@/components/Card";
import { Skeletons } from "@/components/Skeletons";
import type { DocumentType } from "@/types/api";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

type VirtualListProps = {
  documents: DocumentType[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >;
  onScroll?: (ref: HTMLElement | Window | null) => void;
  onBookmarkToggle: (id: string, isSaved: boolean) => void;
};

export const VirtualList = ({
  documents,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onScroll,
  onBookmarkToggle,
}: VirtualListProps) => {
  const renderItem = useCallback(
    (index: number) => {
      const document = documents[index];
      return (
        <Card
          {...document}
          handleSave={() => onBookmarkToggle(document.id, document.isSaved)}
        />
      );
    },
    [documents, onBookmarkToggle],
  );

  return (
    <Virtuoso
      style={{
        height: "100vh",
        width: "100%",
      }}
      totalCount={documents.length}
      overscan={200}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      computeItemKey={(index) => documents[index]?.id || `loading-${index}`}
      scrollerRef={onScroll}
      itemContent={renderItem}
      components={{
        Footer: () =>
          hasNextPage && isFetchingNextPage ? <Skeletons count={2} /> : null,
      }}
      initialScrollTop={0}
    />
  );
};
