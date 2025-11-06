import { BookmarkNode, FileNode, type Node } from "../interfaces/node";

export default function Overview() {
	const nodes: Node[] = [
		new FileNode("1", "Document 1"),
		new FileNode("2", "Image 1"),
		new BookmarkNode("3", "https://example.com"),
	];

	return (
		<>
			<div className="flex gap-6 m-8">
				{nodes.map((node) => (
					<div
						key={node.id}
						className="bg-gray-400 aspect-square w-32 p-2.5 overflow-hidden"
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
