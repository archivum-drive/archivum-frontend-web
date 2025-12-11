import { useState } from "react";
import { SingletonStorage } from "../../mock/storage";
import { NodesTable } from "../tables/nodes-table";

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
