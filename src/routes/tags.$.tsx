import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { TagExplorer } from "../components/views/tag-explorer";

export const Route = createFileRoute("/tags/$")({
  component: NestedTags,
});

function NestedTags() {
  const { _splat } = Route.useParams();
  const pathSegments = useMemo(
    () =>
      _splat
        ? _splat
            .split("/")
            .map((segment) => segment.trim())
            .filter((segment) => segment.length > 0)
        : [],
    [_splat],
  );

  return <TagExplorer pathSegments={pathSegments} />;
}
