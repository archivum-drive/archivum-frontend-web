export type TagColor = "red" | "blue" | "green" | "yellow" | "purple" | "gray";

export class Tag {
  name: string;
  color?: TagColor;

  constructor(name: string, color?: TagColor) {
    this.name = name;
    this.color = color;
  }
}
