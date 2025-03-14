import { create } from "zustand";

interface BookmarkState {
  bookmarks: string[]; // Array of document IDs
  addBookmark: (documentId: string) => void;
  removeBookmark: (documentId: string) => void;
  isBookmarked: (documentId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()((set, get) => ({
  bookmarks: [],
  addBookmark: (documentId: string) => {
    const { bookmarks } = get();
    // Only add if not already bookmarked
    if (!bookmarks.includes(documentId)) {
      set({ bookmarks: [...bookmarks, documentId] });
    }
  },

  removeBookmark: (documentId: string) => {
    const { bookmarks } = get();
    set({
      bookmarks: bookmarks.filter((id) => id !== documentId),
    });
  },

  isBookmarked: (documentId: string) => {
    return get().bookmarks.includes(documentId);
  },
}));
