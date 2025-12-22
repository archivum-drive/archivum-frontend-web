import { useState } from "react";
import { SingletonStorage } from "../../mock/storage";
import { RoundedButton } from "../ui/button";
import { NodesTable } from "../tables/nodes-table";

export function NodeExplorer() {
  const repository = SingletonStorage.getInstance();

  const [nodes, setNodes] = useState(repository.getAllNodes());
  function refreshData() {
    setNodes(() => [...repository.getAllNodes()]);
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[Orbit] text-4xl">All my Data</h1>
        </div>
        <RoundedButton onClick={refreshData}>Refresh</RoundedButton>
      </header>

      <NodesTable nodes={nodes} />
    </div>
  );
}
