import { Link as RouterLink } from "@tanstack/react-router";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Tag } from "archivum-typescript";
import { useMemo } from "react";
import { useRepository } from "../../lib/storage";
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
  const { pathSegments } = props;
  const repository = useRepository();

  const tags: Tag[] = useMemo(() => {
    if (pathSegments && pathSegments.length > 0) {
      const tag = repository.getTagByPath(pathSegments);
      if (!tag) return [];
      return repository.getChildTags(tag.id);
    } else {
      return repository.getAllTags();
    }
  }, [pathSegments, repository]);

  const columns = useMemo<ColumnDef<Tag>[]>(
    () => [
      {
        header: "Tag",
        cell: (info) => (
          <RouterLink
            to="/tags/$"
            params={{ _splat: info.row.original.path.join("/") }}
          >
            <TagComponent
              name={info.row.original.path.join("/")}
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
    <div className="border border-muted">
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
  pathSegments?: string[];
  // deleteTag: (tagName: string) => void;
}
