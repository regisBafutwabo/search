"use client";
import { Card } from "@/components/Card";
import type { DocumentType } from "@/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Skeletons } from "../Skeletons";

type ResultContainerProps = {
  searchValue?: string;
};

export const ResultContainer = ({ searchValue }: ResultContainerProps) => {
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
      const response = await fetch(
        `https://frontend.assignment.getliner.com/search/documents?query=${searchValue}&size=20&from=${pageParam}`,
      );
      if (!response.ok) throw new Error("Failed to fetch documents");
      return response.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.documents.length,
    enabled: !!searchValue,
  });

  const documents = data?.pages[0]?.documents;
  return (
    <div className="px-5">
      {isFetching && !data && <Skeletons count={20} />}
      {documents?.length > 0 &&
        documents?.map((document: DocumentType) => (
          <Card
            id={document.id}
            key={document.id}
            title={document.title}
            imageUrl={document?.imageUrl}
            isSaved={document.isSaved}
            netloc={document.netloc}
            url={document.url}
            faviconUrl={document?.faviconUrl}
            handleSave={() => {}}
          />
        ))}
    </div>
  );
};
