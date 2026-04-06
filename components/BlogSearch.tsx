"use client";

import { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/data";
import BlogCard from "./BlogCard";

const SearchIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

interface BlogSearchProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogSearch({ posts, allTags }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(id);
  }, [query]);

  // Filter logic
  const filtered = posts.filter((post) => {
    const matchesQuery =
      debouncedQuery === "" ||
      post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase());

    const matchesTags =
      selectedTags.size === 0 ||
      post.tags.some((t) => selectedTags.has(t));

    return matchesQuery && matchesTags;
  });

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function resetFilters() {
    setQuery("");
    setDebouncedQuery("");
    setSelectedTags(new Set());
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search Input */}
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search posts
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            placeholder="Search posts by title or excerpt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input pl-9 w-full"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none">
            {SearchIcon}
          </div>
        </div>
      </div>

      {/* Tag Filter Pills */}
      {allTags.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            Filter by tags
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={selectedTags.has(tag)}
                className="badge cursor-pointer transition-colors hover:opacity-90"
                style={
                  selectedTags.has(tag)
                    ? {
                        backgroundColor: "var(--color-brand-600)",
                        color: "white",
                        borderColor: "var(--color-brand-600)",
                      }
                    : undefined
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex flex-col gap-6">
        {filtered.length > 0 ? (
          <>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Showing {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-[var(--color-text-secondary)] mb-4">
              No posts match your search.
            </p>
            <button
              onClick={resetFilters}
              className="btn btn-secondary"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
