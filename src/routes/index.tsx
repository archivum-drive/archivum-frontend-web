"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NodesTable } from "../components/nodes-table";
import { SingletonStorage } from "../mock/storage";

export const Route = createFileRoute("/")({
  component: Overview,
});

function Overview() {
  const storage = SingletonStorage.getInstance();

  const [nodes, setNodes] = useState(storage.getNodes());
  function refreshData() {
    setNodes(() => [...storage.getNodes()]);
  }

  function deleteNode(nodeId: string): void {
    console.log("Deleting node with ID:", nodeId);
    storage.deleteNode(nodeId);
    refreshData();
  }

  return (
    <div>
      <h1 className="mb-6 font-[Orbit] text-4xl">All my Data</h1>
      <NodesTable nodes={nodes} deleteNode={(nodeId) => deleteNode(nodeId)} />

      <div className="h-2" />
      <div>
        <button onClick={refreshData} className="cursor-pointer">
          Refresh Data
        </button>
      </div>
    </div>
  );
}
