interface NamedNode {
  getName(): string;
}

export class Node {
  id: string;
  tags: Tag[];
  date_created: string;
  date_updated: string;

  constructor(id: string, tags: Tag[] = []) {
    this.id = id;
    this.tags = tags;
    this.date_created = new Date().toLocaleString("de-DE");
    this.date_updated = new Date().toLocaleString("de-DE");
  }
}

type TagColor = "red" | "blue" | "green" | "yellow" | "purple" | "gray";

export class Tag {
  name: string;
  color?: TagColor;

  constructor(name: string, color?: TagColor) {
    this.name = name;
    this.color = color;
  }
}

export class FileNode extends Node implements NamedNode {
  label: string;

  constructor(id: string, label: string, tags: Tag[] = []) {
    super(id, tags);
    this.label = label;
  }

  getName(): string {
    return this.label;
  }
}

export class BookmarkNode extends Node implements NamedNode {
  url: string;

  constructor(id: string, url: string, tags: Tag[] = []) {
    super(id, tags);
    this.url = url;
  }

  getName(): string {
    return this.url;
  }
}
