import { ExternalLinkIcon } from "lucide-react";
import CreateNodeButton from "./createnodebutton";

export default function Header() {
  return (
    <header className="fixed top-0 m-3 h-[calc(100%-1.5rem)] w-56 rounded-lg bg-background-light p-4">
      <h1 className="my-2 font-[Orbit] font-thin text-3xl">Archivum</h1>

      <div className="relative my-4 h-8 w-full">
        <input
          type="text"
          placeholder="Search..."
          className="h-full w-full rounded-full bg-white px-2 text-black"
        />
        <button className="absolute top-1 right-1.5 cursor-pointer text-neutral-400">
          <ExternalLinkIcon />
        </button>
      </div>

      <CreateNodeButton />

      {/* <nav>
        <ul className="mt-8 space-y-4">
          <li>
            <Link href="/">Overview</Link>
          </li>
          <li>
            <Link href="/files">Files</Link>
          </li>
          <li>
            <Link href="/bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}
