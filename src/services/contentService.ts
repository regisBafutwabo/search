import { getContents } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDocumentSearch(searchValue?: string, timestamp?: string) {
  return useInfiniteQuery({
    queryKey: ["search-results", searchValue, timestamp],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        searchValue: searchValue || "",
        size: 10,
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
}
