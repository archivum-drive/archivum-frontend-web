"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TagsTable } from "../components/tags-table";
import type { Tag } from "../lib/tag";
import { SingletonStorage } from "../mock/storage";

export const Route = createFileRoute("/tags")({
  component: Overview,
});

function Overview() {
  const storage = SingletonStorage.getInstance();

  const [tags, setTags] = useState<Tag[]>(storage.getTags());
  function refreshData() {
    setTags(() => [...storage.getTags()]);
  }

  function deleteTag(tagName: string): void {
    storage.deleteTag(tagName);
    refreshData();
  }

  return (
    <div>
      <h1 className="mb-6 font-[Orbit] text-4xl">Tags</h1>
      <TagsTable tags={tags} deleteTag={deleteTag} />

      <div className="h-2" />
      <div>
        <button onClick={refreshData} className="cursor-pointer">
          Refresh Data
        </button>
      </div>
    </div>
  );
}
