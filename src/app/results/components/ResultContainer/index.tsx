"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { bookmarkContent, getContents, removeBookmark } from "@/api";
import { Card } from "@/components/Card";
import type { DocumentType } from "@/types/api";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Skeletons } from "../Skeletons";

type ResultContainerProps = {
  searchValue?: string;
};

type InfinteQueryTypes = {
  pages: Array<{ documents: Array<DocumentType> }>;
  pageParams: number[];
};

export const ResultContainer = ({ searchValue }: ResultContainerProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["search-results", searchValue],
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
  });

  // Mutations for bookmark actions
  const saveMutation = useMutation({
    mutationFn: (documentId: string) => bookmarkContent(documentId),
    onMutate: async (documentId) => {
      // Optimistic update
      await queryClient.cancelQueries({
        queryKey: ["search-results", searchValue],
      });

      // Update document in the cache
      queryClient.setQueryData(
        ["search-results", searchValue],
        (oldData: InfinteQueryTypes) => {
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
          ["search-results", searchValue],
          (oldData: InfinteQueryTypes) => {
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
      }
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: (documentId: string) => removeBookmark(documentId),
    onMutate: async (documentId) => {
      // Optimistic update
      await queryClient.cancelQueries({
        queryKey: ["search-results", searchValue],
      });

      queryClient.setQueryData(
        ["search-results", searchValue],
        (oldData: InfinteQueryTypes) => {
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
          ["search-results", searchValue],
          (oldData: InfinteQueryTypes) => {
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

  const handleObserver = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && searchValue) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, searchValue]);

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

  useEffect(() => {
    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            handleObserver();
          }
        },
        { threshold: 0.1, rootMargin: "200px" },
      );

      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (!searchValue) return;

    window.scrollTo(0, 0);
  }, [searchValue]);

  const allDocuments = data?.pages.flatMap((page) => page.documents) || [];

  return (
    <div className="px-5 relative">
      {isFetching && !data && <Skeletons count={20} />}

      {allDocuments?.length > 0 ? (
        <div>
          {allDocuments?.map((document: DocumentType) => (
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
          ))}

          {/* Intersection observer */}
          <div ref={loadMoreRef} className="h-10 w-full" aria-hidden="true" />

          {/* Loading indicator for next page */}
          {isFetchingNextPage && <Skeletons count={5} />}
        </div>
      ) : (
        // Show no results message, but only if we've attempted a search
        searchValue &&
        !isFetching && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No results found for "{searchValue}"
            </p>
          </div>
        )
      )}
    </div>
  );
};
