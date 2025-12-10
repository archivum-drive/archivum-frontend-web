import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Tag } from "../lib/tag";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TagComponent } from "./ui/tag";

export function TagsTable(props: TagsTableProps) {
  const { tags } = props;

  const columns = useMemo<ColumnDef<Tag>[]>(
    () => [
      {
        header: "Tag",
        cell: (info) => (
          <TagComponent
            name={info.row.original.name}
            color={info.row.original.color}
          />
        ),
      },
    ],
    [],
  );

  const table = useReactTable<Tag>({
    data: tags,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <div className="border border-text/10">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface TagsTableProps {
  tags: Tag[];
  deleteTag: (tagName: string) => void;
}
