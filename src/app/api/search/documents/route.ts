import { NextResponse } from "next/server";

// Types for Google Search API response
interface GoogleSearchItem {
  title: string;
  link: string;
  displayLink: string;
  pagemap?: {
    cse_image?: { src: string }[];
  };
}

interface GoogleSearchResponse {
  items?: GoogleSearchItem[];
  queries?: {
    nextPage?: {
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }[];
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const size = Number.parseInt(searchParams.get("size") || "10", 10);
  const from = Number.parseInt(searchParams.get("from") || "0", 10);

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    // Google uses 1-based indexing for pagination
    const start = from + 1;

    // Call Google API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_API_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=${size}&start=${start}`,
    );

    if (response.status === 429) {
      // Handle quota exceeded error specifically
      console.log("Daily Google API quota exceeded");
      return NextResponse.json(
        {
          error: "Daily search quota exceeded",
          code: "rateLimitExceeded",
          status: 429,
        },
        { status: 429 },
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch from Google API" },
        { status: 500 },
      );
    }

    const googleData: GoogleSearchResponse = await response.json();

    if (!googleData.items) {
      return NextResponse.json({
        documents: [],
        isLast: true,
      });
    }
    // Transform Google results to a better format
    const documents = googleData.items.map((item) => {
      const netloc = item.displayLink || "";

      // Create a stable ID based on the URL
      const id = `google-${Buffer.from(item.link).toString("base64")}`;

      // Find an image if available
      let imageUrl = "";
      if (item.pagemap?.cse_image?.[0]?.src) {
        imageUrl = item.pagemap.cse_image[0].src;
      }

      // Randomly determine if this item is saved or not (for demo purposes)
      const isSaved = Math.random() < 0.3; // 30% chance of being saved

      return {
        id,
        faviconUrl: `https://www.google.com/s2/favicons?domain=${netloc}&sz=128`,
        imageUrl,
        title: item.title || "Untitled",
        url: item.link,
        netloc,
        isSaved,
      };
    });

    return NextResponse.json({
      documents,
      isLast: !googleData.queries?.nextPage,
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 },
    );
  }
}
