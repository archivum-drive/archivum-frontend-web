import { ContextMenuItem as ContextMenuItemPrimitive } from "@radix-ui/react-context-menu";
import { FileIcon, Link2Icon } from "@radix-ui/react-icons";
import { Link as RouterLink } from "@tanstack/react-router";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Node, Tag } from "archivum-typescript";
import { useMemo } from "react";
import { repositoryStore, useRepository } from "../../lib/storage";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TagComponentHoverable } from "../ui/tag";

export function NodesTable(props: NodeTableProps) {
  const { nodes } = props;

  const repository = useRepository();

  const columns = useMemo<ColumnDef<Node>[]>(
    () => [
      {
        header: "Details",
        cell: (info) => <RenderNode node={info.row.original} />,
      },
      {
        header: "Tags",
        accessorKey: "tags",
        cell: (info) => (
          <RenderTags tags={info.getValue<Tag[]>()} node={info.row.original} />
        ),
      },
      {
        header: () => <div className="text-right">Date Modified</div>,
        accessorKey: "date_updated",
        cell: (info) => (
          <div key={info.cell.id} className="text-right">
            {info.getValue<String>()}
          </div>
        ),
      },
      {
        header: () => <div className="text-right">Date Created</div>,
        accessorKey: "date_created",
        cell: (info) => (
          <div key={info.cell.id} className="text-right">
            {info.getValue<String>()}
          </div>
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
            <NodeContextMenu
              key={row.id}
              node={row.original}
              tags={repository.getAllTags()}
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
}

function RenderNode({ node }: { node: Node }) {
  return (
    <div key={node.id} className="flex items-center gap-2">
      <RenderType node={node} />
      <RenderName node={node} />
    </div>
  );
}
function RenderName({ node }: { node: Node }) {
  if (node.data.type === "file") {
    return <div>File: {node.data.File.filename}</div>;
  } else if (node.data.type === "bookmark") {
    return <div>Bookmark: {node.data.Bookmark.url}</div>;
  } else {
    return <div>Unknown Node Type</div>;
  }
}

function RenderTags({ tags, node }: { tags: Tag[]; node: Node }) {
  return (
    <>
      {tags.map((tag) => (
        <ContextMenu key={tag.id}>
          <ContextMenuTrigger asChild>
            <TagComponentHoverable
              key={tag.path.join("/")}
              name={tag.path.join("/")}
              color={tag.color}
            />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <RouterLink to="/tags/$" params={{ _splat: tag.path.join("/") }}>
                Go to Tag
              </RouterLink>
            </ContextMenuItem>
            <ContextMenuItem
              variant="destructive"
              onSelect={() =>
                repositoryStore.mutate((repo) =>
                  repo.untagNode(node.id, tag.id),
                )
              }
            >
              Remove tag
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
      {/* <TagSkeleton /> */}
    </>
  );
}

function RenderType({ node }: { node: Node }) {
  if (node.data.type === "file") {
    return <FileIcon />;
  } else if (node.data.type === "bookmark") {
    return <Link2Icon />;
  }

  return <div className="mx-auto flex h-12 items-center justify-center">?</div>;
}

function NodeContextMenu(props: {
  node: Node;
  tags: Tag[];
  children: React.ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Add Tag</ContextMenuSubTrigger>
          <ContextMenuSubContent className="p-0">
            <Command>
              <CommandInput
                placeholder="Filter label..."
                autoFocus={true}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No label found.</CommandEmpty>
                <CommandGroup>
                  {props.tags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.path.join("/")}
                      onSelect={() => {
                        repositoryStore.mutate((repo) =>
                          repo.tagNode(props.node.id, tag.id),
                        );
                      }}
                    >
                      <ContextMenuItemPrimitive data-slot="context-menu-item">
                        {tag.path.join("/")}
                      </ContextMenuItemPrimitive>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuItem
          variant="destructive"
          onSelect={() =>
            repositoryStore.mutate((repo) => repo.deleteNode(props.node.id))
          }
        >
          Delete Node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
