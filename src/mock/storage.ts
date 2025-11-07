import { BookmarkNode, FileNode, type Node } from "../interfaces/node";

const callbacks: Array<() => void> = [];

const nodes: Node[] = [
  new FileNode("1", "Document 1"),
  new FileNode("2", "Image 1"),
  new BookmarkNode("3", "https://example.com"),
];

export function getNodes(): Node[] {
  return nodes;
}

export function addNode(node: Node): void {
  nodes.push(node);
  callbacks.forEach((callback) => callback());
}

export function nodeUpdate(callback: () => void): void {
  callbacks.push(callback);
}
