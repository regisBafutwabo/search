export interface ErrorWithStatus extends Error {
  status?: number;
  code?: string;
}

export interface ErrorState {
  message: string;
  title: string;
  suggestion?: string;
}

/**
 * Maps API errors to user-friendly error messages based on error status codes
 */
export function getErrorDetails(error: unknown): ErrorState {
  // Default error state
  const defaultError: ErrorState = {
    title: "Something went wrong",
    message: "We couldn't complete your request.",
    suggestion: "Please try again later.",
  };

  if (!error) return defaultError;

  // Try to extract error details
  const err = error as ErrorWithStatus;

  // Handle rate limit exceeded (most likely Google API quota)
  if (err.status === 429 || err.code === "rateLimitExceeded") {
    return {
      title: "Search limit reached",
      message: "We've reached our daily search quota.",
      suggestion: "Please try again tomorrow or use a different search term.",
    };
  }

  // Handle server errors
  if (err.status === 500 || err.status === 502 || err.status === 503) {
    return {
      title: "Server error",
      message: "The servers are experiencing issues.",
      suggestion: "Please try again later.",
    };
  }

  // Handle network errors
  if (
    err.message?.includes("NetworkError") ||
    err.message?.includes("Failed to fetch")
  ) {
    return {
      title: "Network error",
      message: "Couldn't connect to the servers.",
      suggestion: "Please check your internet connection and try again.",
    };
  }

  // For bookmark-specific errors
  if (err.message?.includes("bookmark") || err.message?.includes("save")) {
    return {
      title: "Bookmark error",
      message: "Couldn't save or remove bookmark.",
      suggestion: "Please try again later.",
    };
  }

  return defaultError;
}
