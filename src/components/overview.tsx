import { BookmarkNode, FileNode, type Node } from "../interfaces/node";
import { getNodes, nodeUpdate } from "../mock/storage";

export default function Overview() {
  let nodes: Node[] = [];

  function fetchNodes() {
    nodes = getNodes();
  }

  fetchNodes();
  nodeUpdate(() => fetchNodes);

  return (
    <>
      <div className="flex gap-6 m-8">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="bg-background-light aspect-square w-32 p-2.5 overflow-hidden"
          >
            <RenderNode node={node} />
          </div>
        ))}
      </div>
    </>
  );
}

function RenderNode({ node }: { node: Node }) {
  if (node instanceof FileNode) {
    return <div>File: {node.label}</div>;
  } else if (node instanceof BookmarkNode) {
    return <div>Bookmark: {node.url}</div>;
  } else {
    return <div>Unknown Node Type</div>;
  }
}
