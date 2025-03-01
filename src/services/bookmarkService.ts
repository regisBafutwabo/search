import { bookmarkContent, removeBookmark } from "@/lib/api";
import type { DocumentType, InfinteQueryDataType } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Service for bookmark mutations
export function useBookmarkMutations(searchValue?: string, timestamp?: string) {
  const queryClient = useQueryClient();

  const updateBookmarkInCache = (documentId: string, isSaved: boolean) => {
    queryClient.setQueryData(
      ["search-results", searchValue, timestamp],
      (oldData: InfinteQueryDataType) => {
        if (!oldData) return oldData;

        return {
          pages: oldData.pages.map((page) => ({
            ...page,
            documents: page.documents.map((doc: DocumentType) =>
              doc.id === documentId ? { ...doc, isSaved: isSaved } : doc,
            ),
          })),
          pageParams: oldData.pageParams,
        };
      },
    );
  };

  const createBookmarkMutation = (
    mutationFn: (documentId: string) => Promise<string>,
    newSavedState: boolean,
  ) => {
    return useMutation({
      mutationFn,
      onMutate: async (documentId) => {
        await queryClient.cancelQueries({
          queryKey: ["search-results", searchValue, timestamp],
        });

        // Save previous state for potential rollback
        const previousState = queryClient.getQueryData([
          "search-results",
          searchValue,
          timestamp,
        ]);

        // Optimistic update
        updateBookmarkInCache(documentId, newSavedState);

        return { documentId, previousState };
      },
      onError: (err, documentId, context) => {
        // Revert to previous state
        if (context?.previousState) {
          queryClient.setQueryData(
            ["search-results", searchValue, timestamp],
            context.previousState,
          );
        } else {
          // Fallback
          updateBookmarkInCache(documentId, !newSavedState);
        }

        return { error: err };
      },
    });
  };

  // Save mutation
  const saveMutation = createBookmarkMutation(bookmarkContent, true);

  // Unsave mutation
  const unsaveMutation = createBookmarkMutation(removeBookmark, false);

  // Helper function to handle saving/unsaving
  const toggleBookmark = (id: string, isSaved: boolean) => {
    if (isSaved) {
      unsaveMutation.mutate(id);
    } else {
      saveMutation.mutate(id);
    }
  };

  return {
    toggleBookmark,
    isLoading: saveMutation.isPending || unsaveMutation.isPending,
    bookmarkError: saveMutation.error || unsaveMutation.error,
  };
}
