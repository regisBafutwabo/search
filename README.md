# Liner Challenge

## TL;DR

A responsive search interface built with Next.js 15, React 19, TypeScript, and Tailwind(v4) CSS. Features include infinite scrolling with virtualized lists, bookmark functionality, and comprehensive error handling.

[Demo](liner-challenge.vercel.app)

## Overview

This project is a search interface built using modern web technologies. It enables users to search for content, view results in an optimized virtual list, and bookmark items of interest.

## Tech Stack

**Framework**: Next.js 15 with App Router for routing and server components

**Language**: TypeScript for type safety

**Styling**: Tailwind(v4) for utility-first styling

**Data Fetching**: TanStack Query (formerly React Query) for data fetching, caching, and state management

**List Virtualization**: React Virtuoso for efficient rendering of large lists

**Linting/Formatting**: Biome for linting and code formatting

**Git Hooks**: Husky for pre-commit hooks

## Key Features

- Search functionality with ``Enter`` key support
- ``Infinite scrolling`` with virtualized list for performance
- Bookmark/unbookmark functionality with React-query's ``optimistic updates``
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
│   └── api/                # API functions
├── services/               # Service layer
│   ├── bookmarkService.ts  # Bookmark management
│   └── contentService.ts   # Content fetching
├── styles/                 # Global styles
└── types/                  # TypeScript types
    └── api.ts              # API-related types
```

## Implementation Details

### API Integration (`src/lib/api/index.ts`)

The application interacts with three main API endpoints:

- `(GET) - getContents`: Fetches contens based on search query.

- `(POST) - bookmarkContent`: Bookmark content.

- `(DELETE) - removeBookmark`: Deletes a bookmarked content.

### Search Implementation

- Search is triggered on `Enter` key press
- Results are fetched using TanStack Query's `useInfiniteQuery`
- Pagination is handled through the `from` parameter in the API

### Virtualization

Implemented using React Virtuoso to efficiently render only the visible items in the search results list, significantly improving performance for large result sets.

### Bookmark Management

- `Optimistic updates` for immediate UI feedback
- Error handling with `automatic state rollback` if API calls fail
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
git clone https://github.com/yourusername/liner-challenge.git

cd liner-challenge
```

### Install dependencies

```bash
yarn
```

### Set up environment variables

```bash
cp .env.example .env.local
```

Edit .env.local with your API keys and configuration

### Start the development server

```bash
yarn dev
```
