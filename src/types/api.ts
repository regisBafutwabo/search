export interface DocumentType {
  id: string;
  faviconUrl?: string | null;
  imageUrl?: string | null;
  title: string;
  url: string;
  netloc: string;
  isSaved: boolean;
}
