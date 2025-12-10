import { FileIcon, Link2Icon, PlusIcon } from "@radix-ui/react-icons";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { BookmarkNode, FileNode, type Node, Tag } from "../interfaces/node";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TagComponent } from "./ui/tag";

export function NodesTable(props: NodeTableProps) {
  const { nodes } = props;

  const columns = useMemo<ColumnDef<Node>[]>(
    () => [
      {
        header: "Details",
        cell: (info) => <RenderNode node={info.row.original} />,
      },
      {
        header: "Tags",
        accessorKey: "tags",
        cell: (info) => <RenderTags tags={info.getValue<Tag[]>()} />,
      },
      {
        header: () => <div className="text-right">Date Modified</div>,
        accessorKey: "date_updated",
        cell: (info) => (
          <div className="text-right">{info.getValue<String>()}</div>
        ),
      },
      {
        header: () => <div className="text-right">Date Created</div>,
        accessorKey: "date_created",
        cell: (info) => (
          <div className="text-right">{info.getValue<String>()}</div>
        ),
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
            <NodeContextMenu
              node={row.original}
              deleteNode={(nodeId) => props.deleteNode(nodeId)}
            >
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            </NodeContextMenu>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface NodeTableProps {
  nodes: Node[];
  deleteNode: (nodeId: string) => void;
}

function RenderNode({ node }: { node: Node }) {
  return (
    <div className="flex items-center gap-2">
      <RenderType node={node} />
      <RenderName node={node} />
    </div>
  );
}
function RenderName({ node }: { node: Node }) {
  if (node instanceof FileNode) {
    return <div>File: {node.label}</div>;
  } else if (node instanceof BookmarkNode) {
    return <div>Bookmark: {node.url}</div>;
  } else {
    return <div>Unknown Node Type</div>;
  }
}

function RenderTags({ tags }: { tags: Tag[] }) {
  return (
    <>
      {tags.map((tag) => (
        <TagComponent key={tag.name} name={tag.name} color={tag.color} />
      ))}
      <TagComponent className="aspect-square bg-transparent p-0 hover:bg-white/5">
        <div className="flex h-full w-full items-center justify-center">
          <PlusIcon />
        </div>
      </TagComponent>
    </>
  );
}

function RenderType({ node }: { node: Node }) {
  if (node instanceof FileNode) {
    return <FileIcon />;
  } else if (node instanceof BookmarkNode) {
    return <Link2Icon />;
  }

  return <div className="mx-auto flex h-12 items-center justify-center">?</div>;
}

function NodeContextMenu(props: {
  node: Node;
  children: React.ReactNode;
  deleteNode: (nodeId: string) => void;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          variant="destructive"
          onSelect={() => props.deleteNode(props.node.id)}
        >
          Delete Node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
