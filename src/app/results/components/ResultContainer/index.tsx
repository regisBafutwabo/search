"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";

import { bookmarkContent, getContents, removeBookmark } from "@/api";
import { Card } from "@/components/Card";
import { ErrorModal } from "@/components/ErrorModal";
import type { DocumentType } from "@/types/api";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Skeletons } from "../Skeletons";

type ResultContainerProps = {
  searchValue?: string;
  timestamp?: string;
  onScroll: (scrollTop: number) => void;
};

type InfinteQueryDataType = {
  pages: Array<{ documents: Array<DocumentType> }>;
  pageParams: number[];
};

export const ResultContainer = ({
  searchValue,
  onScroll,
  timestamp,
}: ResultContainerProps) => {
  const router = useRouter();

  const parentRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-results", searchValue, timestamp],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        searchValue: searchValue || "",
        size: 20,
        from: pageParam,
      };
      return getContents(params);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLast) return undefined;

      const totalDocumentsFetched = allPages.reduce((total, page) => {
        return total + page.documents.length;
      }, 0);

      return totalDocumentsFetched;
    },
    enabled: !!searchValue,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Mutations for bookmark actions
  const saveMutation = useMutation({
    mutationFn: (documentId: string) => bookmarkContent(documentId),
    onMutate: async (documentId) => {
      // Optimistic update
      await queryClient.cancelQueries({
        queryKey: ["search-results", searchValue, timestamp],
      });

      // Update document in the cache
      queryClient.setQueryData(
        ["search-results", searchValue, timestamp],
        (oldData: InfinteQueryDataType) => {
          return {
            pages: oldData.pages.map((page) => ({
              ...page,
              documents: page.documents.map((doc: DocumentType) =>
                doc.id === documentId ? { ...doc, isSaved: true } : doc,
              ),
            })),
            pageParams: oldData.pageParams,
          };
        },
      );

      return { documentId };
    },
    onError: (err, documentId, context) => {
      // Revert on error
      if (context) {
        queryClient.setQueryData(
          ["search-results", searchValue, timestamp],
          (oldData: InfinteQueryDataType) => {
            return {
              pages: oldData.pages.map((page) => ({
                ...page,
                documents: page.documents.map((doc: DocumentType) =>
                  doc.id === documentId ? { ...doc, isSaved: false } : doc,
                ),
              })),
              pageParams: oldData.pageParams,
            };
          },
        );

        // Show error modal
        setErrorModalOpen(true);
        // setErrorMessage(err.message || "");
      }
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: (documentId: string) => removeBookmark(documentId),
    onMutate: async (documentId) => {
      // Optimistic update
      await queryClient.cancelQueries({
        queryKey: ["search-results", searchValue, timestamp],
      });

      queryClient.setQueryData(
        ["search-results", searchValue, timestamp],
        (oldData: InfinteQueryDataType) => {
          return {
            pages: oldData.pages.map((page) => ({
              ...page,
              documents: page.documents.map((doc: DocumentType) =>
                doc.id === documentId ? { ...doc, isSaved: false } : doc,
              ),
            })),
            pageParams: oldData.pageParams,
          };
        },
      );

      return { documentId };
    },
    onError: (err, documentId, context) => {
      // Revert on error
      if (context) {
        queryClient.setQueryData(
          ["search-results", searchValue, timestamp],
          (oldData: InfinteQueryDataType) => {
            return {
              pages: oldData.pages.map((page) => ({
                ...page,
                documents: page.documents.map((doc: DocumentType) =>
                  doc.id === documentId ? { ...doc, isSaved: true } : doc,
                ),
              })),
              pageParams: oldData.pageParams,
            };
          },
        );

        // Show error modal
        setErrorModalOpen(true);
      }
    },
  });

  const allDocuments = data?.pages.flatMap((page) => page?.documents) || [];

  // Handle the save/unsave functionality
  const handleSave = useCallback(
    (id: string, isSaved: boolean) => {
      if (isSaved) {
        unsaveMutation.mutate(id);
      } else {
        saveMutation.mutate(id);
      }
    },
    [saveMutation, unsaveMutation],
  );

  // Handle Error Modal Close
  const handleCloseModal = () => {
    setErrorModalOpen(false);
  };

  const renderItem = useCallback(
    (index: number) => {
      const document = allDocuments[index];
      return (
        <Card
          id={document.id}
          key={document.id}
          title={document.title}
          imageUrl={document?.imageUrl}
          isSaved={document.isSaved}
          netloc={document.netloc}
          url={document.url}
          faviconUrl={document?.faviconUrl}
          handleSave={() => handleSave(document?.id, document?.isSaved)}
        />
      );
    },
    [allDocuments, handleSave],
  );

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

  useEffect(() => {
    if (error) {
      setErrorModalOpen(true);
    }
  }, [error]);

  return (
    <div
      className="sm:px-5 relative w-full"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {((isFetching && !data) || (!data && errorModalOpen)) && (
        <Skeletons count={10} />
      )}

      {allDocuments?.length > 0 ? (
        <Virtuoso
          style={{
            height: "100vh",
            width: "100%",
          }}
          totalCount={allDocuments.length}
          overscan={200}
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          computeItemKey={(index) =>
            allDocuments[index]?.id || `loading-${index}`
          }
          scrollerRef={handleScroll}
          itemContent={renderItem}
          components={{
            Footer: () =>
              hasNextPage && !error ? <Skeletons count={2} /> : null,
          }}
          initialScrollTop={0}
        />
      ) : (
        searchValue &&
        !isFetching &&
        !errorModalOpen && (
          <div className="text-center py-10 px-2">
            <p className="text-gray-500">
              {error
                ? `Something went wrong while searching for "${searchValue}".`
                : `No results found for "${searchValue}".`}
            </p>
          </div>
        )
      )}
      {errorModalOpen && (
        <ErrorModal isOpen={errorModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};
