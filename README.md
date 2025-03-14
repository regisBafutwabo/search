# Search Interface

## TL;DR

A responsive search interface built with Next.js 15, React 19, TypeScript, and Tailwind(v4) CSS. Features include infinite scrolling with virtualized lists, client-side bookmark functionality using Zustand, and comprehensive error handling.

[Demo](https://optimistic-uptest.vercel.app)

## Overview

This project is a search interface built using modern web technologies. It enables users to search for content, view results in an optimized virtual list, and bookmark items of interest.

## Google Search API Integration

This project includes integration with the Google Custom Search API through built-in Next.js API routes, making it possible to use this project with Google's search results while maintaining the same UI and functionality. The API routes act as a proxy, handling:

- Converting Google search results to match the expected API format
- Providing useful error messages for API quota limits
- Keeping all API keys secure on the server

## Tech Stack

**Framework**: Next.js 15 with App Router for routing and server components

**Language**: TypeScript for type safety

**Styling**: Tailwind(v4) for utility-first styling

**Data Fetching**: TanStack Query (formerly React Query) for data fetching, caching, and state management

**State Management**: Zustand for client-side state management

**List Virtualization**: React Virtuoso for efficient rendering of large lists

**Linting/Formatting**: Biome for linting and code formatting

**Git Hooks**: Husky for pre-commit hooks

## Key Features

- Search functionality with ``Enter`` key support
- ``Infinite scrolling`` with virtualized list for performance
- Bookmark/unbookmark functionality with Zustand for state management and React-query's ``optimistic updates``
- Error handling with ``dialog`` feedback
- Responsive design
- ``Image fallbacks`` for failed favicon/thumbnail
- ``Loading skeletons`` during content fetching

## Project Structure

```plaintext
src/
├── app/                    # Next.js App Router files
│   ├── (home)/             # Home page route
│   ├── results/            # Search results route
│   │   ├── components/     # Results page components
│   │   └── page.tsx        # Results page component
│   ├── api/                # API routes
│   │   └── search/         # Search API endpoints
│   ├── error.tsx           # Global error handling
│   ├── layout.tsx          # Root layout
│   └── providers.tsx       # React context providers
├── components/             # Shared UI components
│   ├── Card/               # Content card components
│   ├── ErrorModal/         # Error display modal
│   ├── SearchBox/          # Search input component
│   ├── Skeletons/          # Loading placeholders
│   └── Svg/                # SVG icons
├── lib/                    # Utility libraries
│   ├── api/                # API functions
│   ├── errors/             # Error handling utilities
│   └── store/              # Zustand stores
├── services/               # Service layer
│   ├── bookmarkService.ts  # Bookmark management
│   └── contentService.ts   # Content fetching
├── styles/                 # Global styles
└── types/                  # TypeScript types
    └── api.ts              # API-related types
```

## Implementation Details

### API Integration (`src/lib/api/index.ts`)

The application interacts with one main API endpoint:

- `(GET) - getContents`: Fetches contents based on search query.

### Search Implementation

- Search is triggered on `Enter` key press
- Results are fetched using TanStack Query's `useInfiniteQuery`
- Pagination is handled through the `from` parameter in the API

### Virtualization

Implemented using React Virtuoso to efficiently render only the visible items in the search results list, significantly improving performance for large result sets.

### Bookmark Management

- Powered by `Zustand` for client-side state management
- Session-based bookmarks that reset on page refresh
- `Optimistic updates` for immediate UI feedback
- Error handling with `automatic state rollback` if operations fail
- Modal feedback for error conditions

### Error Handling

- `Error boundaries` for **unexpected runtime errors**
- API error handling with user feedback via `modals`
- `Fallback images` for failed image loading

## Getting Started

### Prerequisites

Node.js 18+ and Yarn

### Clone the repository

```bash
git clone https://github.com/regisBafutwabo/search.git

cd search
```

### Install dependencies

```bash
yarn
```

### Set up environment variables

```bash
cp .env.example .env.local
```

Edit .env.local with your API keys and configuration:

```
# Google API configuration (required for Google search)
NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_KEY=your_google_api_key
NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_API_URL=https://www.googleapis.com/customsearch/v1
NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_ENGINE_ID=your_search_engine_id
```

### Getting a Google Custom Search API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Custom Search API"
4. Create API credentials (API Key)
5. Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
6. Create a new search engine
7. Get your Search Engine ID (cx parameter)
8. Add both the API Key and Search Engine ID to your .env.local file

### Start the development server

```bash
yarn dev
```
