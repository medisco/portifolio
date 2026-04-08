"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/data";

interface BlogSearchProps {
  posts: BlogPost[];
  onFilter: (filteredPosts: BlogPost[]) => void;
}

export default function BlogSearch({ posts, onFilter }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      onFilter(posts);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = posts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(lowerQuery);
      const matchesExcerpt = post.excerpt.toLowerCase().includes(lowerQuery);
      const matchesTags = post.tags.some((tag) =>
        tag.toLowerCase().includes(lowerQuery)
      );

      return matchesTitle || matchesExcerpt || matchesTags;
    });

    onFilter(filtered);
  };

  return (
    <div className="mb-12">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="input w-full max-w-md"
      />
    </div>
  );
}
