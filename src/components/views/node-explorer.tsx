import { repositoryStore, useRepository } from "../../lib/storage";
import { NodesTable } from "../tables/nodes-table";
import { Button } from "../ui/button";

export function NodeExplorer() {
  const repository = useRepository();

  function refreshData() {
    void repositoryStore.refresh();
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[Orbit] text-4xl">All my Data</h1>
        </div>
        <Button variant={"outline"} onClick={refreshData}>
          Refresh
        </Button>
      </header>

      <NodesTable nodes={repository.getAllNodes()} />
    </div>
  );
}
