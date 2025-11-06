export interface Node {
  id: string;
  date_created: string;
  date_updated: string;
}

export class FileNode implements Node {
  id: string;
  date_created: string;
  date_updated: string;
  label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
    this.date_created = new Date().toISOString();
    this.date_updated = new Date().toISOString();
  }
}

export class BookmarkNode implements Node {
  id: string;
  date_created: string;
  date_updated: string;
  url: string;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
    this.date_created = new Date().toISOString();
    this.date_updated = new Date().toISOString();
  }
}
