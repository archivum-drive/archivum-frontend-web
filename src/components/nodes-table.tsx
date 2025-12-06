import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { BookmarkNode, FileNode, type Node } from "../interfaces/node";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function NodesTable(props: NodeTableProps) {
  const { nodes } = props;

  const columns = useMemo<ColumnDef<Node>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => <div>{String(info.getValue())}</div>,
      },
      {
        header: "Details",
        cell: (info) => <RenderNode node={info.row.original} />,
      },
      {
        header: "Tags",
        accessorKey: "tags",
        cell: (info) => <div>{info.getValue().join(", ")}</div>,
      },
    ],
    [],
  );

  const table = useReactTable<Node>({
    data: nodes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // meta: {
    //   updateData: (rowIndex, columnId, value) => {
    //     setNodes((old) =>
    //       old.map((row, index) => {
    //         if (index === rowIndex) {
    //           return {
    //             ...old[rowIndex]!,
    //             [columnId]: value,
    //           };
    //         }
    //         return row;
    //       }),
    //     );
    //   },
    // },
    debugTable: true,
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
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

interface NodeTableProps {
  nodes: Node[];
}

function RenderNode({ node }: { node: Node }) {
  if (node instanceof FileNode) {
    return <div>File: {node.label}</div>;
  } else if (node instanceof BookmarkNode) {
    return <div>Bookmark: {node.url}</div>;
  } else {
    return <div>Unknown Node Type</div>;
  }
}
