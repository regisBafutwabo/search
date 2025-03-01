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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/documents?query=${searchValue}&size=${size}&from=${from}`,
  );
  if (!response.ok) throw new Error("Failed to fetch contents");

  if (response.status !== 200) {
    throw new Error("Unexpected response from Documents API");
  }

  return response.json();
};

export const bookmarkContent = async (documentId: string): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collection/document/${documentId}`,
    {
      method: "POST",
    },
  );
  if (response.status === 401) {
    throw new Error("Unauthorized: you don't have access");
  }

  if (!response.ok) throw new Error("Oops! Failed to bookmark the content");

  const text = await response.text();
  if (text !== "saved") {
    throw new Error(`Unexpected response from bookmark API: ${text}`);
  }

  return "saved";
};

export const removeBookmark = async (documentId: string): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collection/document/${documentId}`,
    {
      method: "DELETE",
    },
  );

  if (response.status === 401) {
    throw new Error("Unauthorized: you don't have access");
  }

  if (!response.ok) throw new Error("Oops! Failed to remove the bookmark");

  const text = await response.text();
  if (text !== "deleted") {
    throw new Error(`Unexpected response from bookmark API: ${text}`);
  }

  return "deleted";
};
