export type TagColor = "red" | "blue" | "green" | "yellow" | "purple" | "gray";

export class Tag {
  name: string;
  color?: TagColor;

  constructor(name: string, color?: TagColor) {
    this.name = name;
    this.color = color;
  }
}

const PATH_SEPARATOR = "/";

export interface TagTreeNode {
  segment: string;
  fullPathSegments: string[];
  color?: TagColor;
  isConcrete: boolean;
  children: Map<string, TagTreeNode>;
}

export function buildTagTree(tags: Tag[]): TagTreeNode {
  const root: TagTreeNode = {
    segment: "",
    fullPathSegments: [],
    color: undefined,
    isConcrete: false,
    children: new Map(),
  };

  tags.forEach((tag) => {
    const segments = splitTagName(tag.name);
    if (segments.length === 0) {
      return;
    }

    let node = root;
    segments.forEach((segment, index) => {
      let next = node.children.get(segment);
      if (!next) {
        const fullPathSegments = [...node.fullPathSegments, segment];
        next = {
          segment,
          fullPathSegments,
          color: undefined,
          isConcrete: false,
          children: new Map(),
        };
        node.children.set(segment, next);
      }

      if (index === segments.length - 1) {
        next.isConcrete = true;
        next.color = tag.color ?? next.color;
      }

      node = next;
    });
  });

  return root;
}

export function findTagNode(
  root: TagTreeNode,
  pathSegments: string[],
): TagTreeNode | null {
  if (pathSegments.length === 0) {
    return root;
  }

  let node: TagTreeNode | undefined = root;
  for (const segment of pathSegments) {
    node = node?.children.get(segment);
    if (!node) {
      return null;
    }
  }
  return node;
}

export function splitTagName(tagName: string): string[] {
  return tagName
    .split(PATH_SEPARATOR)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

export function joinSegments(segments: string[]): string {
  return segments.join(PATH_SEPARATOR);
}
