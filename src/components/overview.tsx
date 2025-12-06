import { useState } from "react";
import { getNodes } from "../mock/storage";
import { NodesTable } from "./nodes-table";

export default function Overview() {
  const [nodes, setNodes] = useState(getNodes());
  function refreshData() {
    setNodes(() => [...getNodes()]);
  }

  return (
    <div>
      <h1 className="mb-6 text-4xl">All my Data</h1>
      <NodesTable nodes={nodes} />

      <div className="h-2" />
      <div>
        <button onClick={refreshData} className="cursor-pointer">
          Refresh Data
        </button>
      </div>
    </div>
  );
}
