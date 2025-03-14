import { useBookmarkStore } from "@/lib/store/bookmarkStore";
import type { DocumentType, InfiniteQueryDataType } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Service for bookmark mutations
export function useBookmarkMutations(searchValue?: string, timestamp?: string) {
  const queryClient = useQueryClient();

  const updateBookmarkInCache = (documentId: string, isSaved: boolean) => {
    queryClient.setQueryData(
      ["search-results", searchValue, timestamp],
      (oldData: InfiniteQueryDataType) => {
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
    mutationFn: (documentId: string) => void,
    newSavedState: boolean,
  ) => {
    return useMutation({
      mutationFn: (documentId: string) => {
        // Use the local store function instead of API call
        mutationFn(documentId);
        // Return a resolved promise to maintain the same interface
        return Promise.resolve();
      },
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

  // Get bookmark store functions
  const { addBookmark, removeBookmark } = useBookmarkStore();

  // Save mutation
  const saveMutation = createBookmarkMutation(addBookmark, true);

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
