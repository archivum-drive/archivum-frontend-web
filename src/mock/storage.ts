import { BookmarkNode, FileNode, type Node } from "../lib/node";
import type { Tag } from "../lib/tag";

export class Storage {
  private nodes: Node[] = [
    new FileNode("1", "Document 1", [{ name: "important", color: "red" }]),
    new FileNode("2", "Image 1", [{ name: "media", color: "blue" }]),
    new BookmarkNode("3", "https://example.com", [
      { name: "reference", color: "green" },
      { name: "important", color: "red" },
    ]),
  ];

  private tags: Tag[] = [
    { name: "important", color: "red" },
    { name: "media", color: "blue" },
    { name: "reference", color: "green" },
  ];

  public getTags() {
    return this.tags;
  }

  public deleteTag(tagName: string): void {
    this.tags = this.tags.filter((tag) => tag.name !== tagName);
    this.nodes.forEach((node) => {
      node.tags = node.tags.filter((tag) => tag.name !== tagName);
    });
  }

  public getNodes(): Node[] {
    return this.nodes;
  }

  public addNode(node: Node): void {
    this.nodes.push(node);
  }

  public deleteNode(nodeId: string): void {
    const index = this.nodes.findIndex((node) => node.id === nodeId);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }
}

export class SingletonStorage {
  private static instance: Storage;

  public static getInstance(): Storage {
    if (!SingletonStorage.instance) {
      SingletonStorage.instance = new Storage();
    }
    return SingletonStorage.instance;
  }
}
