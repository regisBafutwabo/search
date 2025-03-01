"use client";
import { useEffect, useState } from "react";

import { ErrorModal } from "@/components/ErrorModal";
import { Skeletons } from "@/components/Skeletons";
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

  const allDocuments = data?.pages.flatMap((page) => page?.documents) || [];
  const hasDocuments = allDocuments.length > 0;
  const showSkeletons = (isFetching && !data) || (!data && errorModalOpen);
  const showEmptyState = searchValue && !isFetching && !data && !errorModalOpen;

  const handleScroll = (ref: HTMLElement | Window | null) => {
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
  };

  const handleCloseModal = () => {
    setErrorModalOpen(false);
  };

  useEffect(() => {
    if (error || bookmarkError) {
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
        <ErrorModal isOpen={errorModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};
