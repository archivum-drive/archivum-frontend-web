import { Link as RouterLink } from "@tanstack/react-router";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { joinSegments, Tag, type TagTreeNode } from "../../lib/tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TagComponent } from "../ui/tag";

export function TagsTable(props: TagsTableProps) {
  const { entries } = props;

  const tags: Tag[] = useMemo(() => {
    const result: Tag[] = [];
    entries.children.forEach((child) => {
      result.push(new Tag(joinSegments(child.fullPathSegments), child.color));
    });
    return result;
  }, [entries]);

  const columns = useMemo<ColumnDef<Tag>[]>(
    () => [
      {
        header: "Tag",
        cell: (info) => (
          <RouterLink to="/tags/$" params={{ _splat: info.row.original.name }}>
            <TagComponent
              name={info.row.original.name}
              color={info.row.original.color}
            />
          </RouterLink>
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
  entries: TagTreeNode;
  // deleteTag: (tagName: string) => void;
}
