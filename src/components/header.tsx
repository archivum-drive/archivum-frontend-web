import { ExternalLinkIcon } from "lucide-react";
import Link from "./link";

export default function Header() {
	return (
		<header className="bg-gray-400 text-white p-4 fixed h-[calc(100%-1.5rem)] w-56 top-0 m-3 rounded-lg">
			<h1 className="text-2xl font-bold">Archivum</h1>

			<div className="w-full h-8 my-4 relative">
				<input
					type="text"
					placeholder="Search..."
					className="bg-white rounded-full w-full h-full text-black px-2"
				/>
				<button className="absolute right-1.5 top-1 text-gray-400 cursor-pointer">
					<ExternalLinkIcon />
				</button>
			</div>

			<nav>
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
			</nav>
		</header>
	);
}
