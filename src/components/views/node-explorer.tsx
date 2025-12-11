import { useState } from "react";
import { SingletonStorage } from "../../mock/storage";
import { NodesTable } from "../tables/nodes-table";
import { RoundedButton } from "../ui/button";

export function NodeExplorer() {
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
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[Orbit] text-4xl">All my Data</h1>
        </div>
        <RoundedButton onClick={refreshData}>Refresh</RoundedButton>
      </header>

      <NodesTable nodes={nodes} deleteNode={deleteNode} />
    </div>
  );
}
