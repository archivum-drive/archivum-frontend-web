import { Link as RouterLink } from "@tanstack/react-router";
import { useMemo } from "react";
import { repositoryStore, useRepository } from "../../lib/storage";
import { TagsTable } from "../tables/tags-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { RoundedButton } from "../ui/button";
import { NodesTable } from "../tables/nodes-table";

export type TagLinkProps = {
  to: "/tags/$";
  params: { _splat: string };
};

export function TagExplorer({ pathSegments }: TagExplorerProps) {
  const repository = useRepository();
  const tags = repository.getAllTags();

  function refreshData() {
    void repositoryStore.refresh();
  }

  const currentTag = tags.find((t) => {
    const tagPath = t.path.join("/");
    const requestedPath = pathSegments.join("/");
    return tagPath === requestedPath;
  });

  const nodes = useMemo(() => {
    if (currentTag) {
      return repository.getNodesWithTag(currentTag.id);
    } else {
      return [];
    }
  }, [currentTag, repository]);

  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(pathSegments),
    [pathSegments],
  );
  const hasPathError = !currentTag && pathSegments.length > 0;

  return (
    <div className="space-y-2">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="mb-2">
          <h1 className="font-[Orbit] text-4xl">Tags</h1>
        </div>
        <RoundedButton onClick={refreshData}>Refresh</RoundedButton>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb) => {
              return (
                <>
                  <BreadcrumbItem key={crumb.label} className="text-current/80">
                    <BreadcrumbLink asChild>
                      <RouterLink {...crumb.link}>{crumb.label}</RouterLink>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-current/60">
                    /
                  </BreadcrumbSeparator>
                </>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <RouterLink
                  to="/tags/$"
                  params={{ _splat: pathSegments.join("/") }}
                >
                  {/* {currentTag?.segment} */}
                </RouterLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {hasPathError ? (
        <PathError pathSegments={pathSegments} />
      ) : (
        <>
          <TagsTable path={currentTag?.path.join("/")} />
          {pathSegments.length != 0 && <NodesTable nodes={nodes} />}
        </>
      )}
    </div>
  );
}

interface TagExplorerProps {
  pathSegments: string[];
}

interface BreadcrumbItem {
  label: string;
  link: TagLinkProps;
}

function buildBreadcrumbs(pathSegments: string[]): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Tags",
      link: { to: "/tags/$", params: { _splat: "" } },
    },
  ];

  for (let i = 0; i < pathSegments.length - 1; i++) {
    const segment = pathSegments[i];
    const fullPathSegments = pathSegments.slice(0, i + 1);
    breadcrumbs.push({
      label: segment,
      link: {
        to: "/tags/$",
        params: { _splat: fullPathSegments.join("/") },
      },
    });
  }

  return breadcrumbs;
}

function PathError({ pathSegments }: { pathSegments: string[] }) {
  const attemptedPath = pathSegments.join("/");
  return (
    <div className="rounded-2xl border border-red-200/70 bg-red-50/80 p-5 text-red-900 text-sm">
      <p className="font-semibold">Tag path not found</p>
      <p className="mt-1 text-red-800/80">
        We could not find anything at{" "}
        <span className="font-mono">/tags/{attemptedPath}</span>.
      </p>
      <RouterLink
        {...{ to: "/tags/$", params: { _splat: "" } }}
        className="mt-3 inline-flex items-center rounded-full border border-red-200 bg-white/70 px-3 py-1 font-semibold text-red-900 text-xs uppercase tracking-wide hover:border-red-300"
      >
        Back to Tags
      </RouterLink>
    </div>
  );
}
