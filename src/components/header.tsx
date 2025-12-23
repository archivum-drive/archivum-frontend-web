import { repositoryStore } from "../lib/storage";
import CreateNodeButton from "./createnodebutton";
import CreateTagButton from "./createtagbutton";
import { Button } from "./ui/button";
import Link from "./ui/link";

export default function Header() {
  return (
    <header className="fixed top-0 m-3 h-[calc(100%-1.5rem)] w-56 rounded-lg bg-background-light p-4">
      <a href="/">
        <h1 className="my-2 font-[Orbit] font-thin text-3xl no-underline">
          Archivum
        </h1>
      </a>

      <Button
        variant={"outline"}
        className="mt-2 mb-4 w-full"
        onClick={() => repositoryStore.push()}
      >
        Save Repository
      </Button>

      {/* <div className="relative my-4 h-8 w-full">
        <input
          type="text"
          placeholder="Search..."
          className="h-full w-full rounded-full bg-white px-2 text-black"
        />
        <button className="absolute top-1 right-1.5 cursor-pointer text-neutral-400">
          <ExternalLinkIcon />
        </button>
      </div> */}

      <div className="grid gap-4">
        <CreateNodeButton />

        <CreateTagButton />
      </div>

      <nav>
        <ul className="mt-8 space-y-4">
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
