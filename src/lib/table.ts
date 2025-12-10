import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: external interface requres variable
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
