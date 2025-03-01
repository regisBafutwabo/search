type GetContentsParams = {
  searchValue: string;
  size: number;
  from: number;
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

export const bookmarkContent = async (documentId: string) => {
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

  return response.status === 200 && response.text();
};

export const removeBookmark = async (documentId: string) => {
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

  return response.status === 200 && response.text();
};
