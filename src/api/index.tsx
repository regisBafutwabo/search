type GetContentsParams = {
  searchValue: string;
  size: number;
  from: number;
};

type BookmarkContentParams = {
  documentId: string;
};

type RemoveBookmarkParams = {
  documentId: string;
};

export const getContents = async ({
  searchValue,
  size,
  from,
}: GetContentsParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/documents?query=${searchValue}&size=${size}&from=${from}`,
  );
  if (!response.ok) throw new Error("Failed to fetch contents");
  return response.json();
};

export const bookmarkContent = async ({
  documentId,
}: BookmarkContentParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collection/document/${documentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId }),
    },
  );
  if (!response.ok) throw new Error("Failed to bookmark document");
  return response.json();
};

export const removeBookmark = async ({ documentId }: RemoveBookmarkParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collection/document/${documentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) throw new Error("Failed to remove the bookmark");
  return response.json();
};
