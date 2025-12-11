import { createFileRoute } from "@tanstack/react-router";
import { NodeExplorer } from "../components/views/node-explorer";

export const Route = createFileRoute("/")({
  component: Overview,
});

function Overview() {
  return <NodeExplorer />;
}
