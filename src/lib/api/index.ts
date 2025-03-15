import type { DocumentType } from "@/types/api";

type GetContentsParams = {
  searchValue: string;
  size: number;
  from: number;
};

type GetContentsResponse = {
  documents: DocumentType[];
  isLast: boolean;
};

export const getContents = async ({
  searchValue,
  size,
  from,
}: GetContentsParams): Promise<GetContentsResponse> => {
  try {
    const response = await fetch(
      `/api/search/documents?query=${encodeURIComponent(searchValue)}&size=${size}&from=${from}`,
      { cache: "no-store" }, // Important to disable caching
    );

    if (!response.ok) {
      const errorText = await response.text();
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      let errorData: any;

      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        console.error("Failed to parse error response:", errorText);
      }

      console.error("Search API error:", errorData || errorText);

      // Create an error with status code
      const error = new Error(errorData?.error || "Failed to fetch contents");
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (error as any).status = response.status;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (error as any).code = errorData?.code;

      throw error;
    }

    return response.json();
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};
