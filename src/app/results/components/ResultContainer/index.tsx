"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ErrorModal } from "@/components/ErrorModal";
import { Skeletons } from "@/components/Skeletons";
import { useBookmarkStore } from "@/lib/store/bookmarkStore";
import { useBookmarkMutations } from "@/services/bookmarkService";
import { useDocumentSearch } from "@/services/contentService";

import { EmptySearchResult } from "../EmptyResult";
import { VirtualList } from "../VirtualList";

type ResultContainerProps = {
  searchValue?: string;
  timestamp?: string;
  onScroll: (scrollTop: number) => void;
};

export const ResultContainer = ({
  searchValue,
  onScroll,
  timestamp,
}: ResultContainerProps) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [currentError, setCurrentError] = useState<unknown>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useDocumentSearch(searchValue, timestamp);
  const { toggleBookmark, bookmarkError } = useBookmarkMutations(
    searchValue,
    timestamp,
  );
  console.log("hasNextpage", hasNextPage, isFetchingNextPage);
  const { isBookmarked } = useBookmarkStore();

  const allDocuments = useMemo(() => {
    // Apply actual bookmark status from Zustand store
    return (data?.pages.flatMap((page) => page?.documents) || []).map(
      (doc) => ({
        ...doc,
        isSaved: isBookmarked(doc.id),
      }),
    );
  }, [data?.pages, isBookmarked]);

  const hasDocuments = allDocuments.length > 0;
  const showSkeletons =
    (isFetching && !hasDocuments) || (!hasDocuments && errorModalOpen);
  const showEmptyState =
    searchValue && !isFetching && !hasDocuments && !errorModalOpen;

  const handleScroll = useCallback(
    (ref: HTMLElement | Window | null) => {
      if (ref) {
        const scrollHandler = () => {
          requestAnimationFrame(() => {
            onScroll((ref as HTMLElement).scrollTop);
          });
        };

        ref.addEventListener("scroll", scrollHandler, { passive: true });
        return () => {
          ref.removeEventListener("scroll", scrollHandler);
        };
      }
    },
    [onScroll],
  );

  const handleCloseModal = () => {
    setErrorModalOpen(false);
  };

  useEffect(() => {
    if (error) {
      setCurrentError(error);
      setErrorModalOpen(true);
    } else if (bookmarkError) {
      setCurrentError(bookmarkError);
      setErrorModalOpen(true);
    }
  }, [error, bookmarkError]);

  return (
    <div className="sm:px-5 relative w-full">
      {showSkeletons && <Skeletons count={10} />}

      {hasDocuments && (
        <VirtualList
          documents={allDocuments}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onScroll={handleScroll}
          onBookmarkToggle={toggleBookmark}
        />
      )}
      {showEmptyState && (
        <EmptySearchResult searchValue={searchValue} hasError={!!error} />
      )}

      {errorModalOpen && (
        <ErrorModal
          isOpen={errorModalOpen}
          error={currentError}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
