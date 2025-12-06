interface NamedNode {
  getName(): string;
}

export class Node {
  id: string;
  tags: string[] = [];
  date_created: string;
  date_updated: string;

  constructor(id: string, tags: string[] = ["default"]) {
    this.id = id;
    this.tags = tags;
    this.date_created = new Date().toISOString();
    this.date_updated = new Date().toISOString();
  }
}

export class FileNode extends Node implements NamedNode {
  label: string;

  constructor(id: string, label: string) {
    super(id);
    this.label = label;
  }

  getName(): string {
    return this.label;
  }
}

export class BookmarkNode extends Node implements NamedNode {
  url: string;

  constructor(id: string, url: string) {
    super(id);
    this.url = url;
  }

  getName(): string {
    return this.url;
  }
}
