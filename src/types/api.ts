export interface DocumentType {
  id: string;
  faviconUrl?: string | null;
  imageUrl?: string | null;
  title: string;
  url: string;
  netloc: string;
  isSaved: boolean;
}

export type InfinteQueryDataType = {
  pages: Array<{ documents: Array<DocumentType> }>;
  pageParams: number[];
};
