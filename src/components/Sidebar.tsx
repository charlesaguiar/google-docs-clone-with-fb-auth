import {
	MdHome,
	MdOutlineFolderOpen,
	MdFolderShared,
	MdPeopleAlt,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
	const location = useLocation();
	const activeClasses = (path: string) =>
		path === location.pathname ? "text-blue-500" : "";

	return (
		<aside className="hidden fixed top-[theme(height.nav)] left-0 overflow-x-hidden px-4 py-8 w-sidebar max-w-sidebar h-[calc(100vh-theme(height.nav))] max-h-[calc(100vh-theme(height.nav))] border-r border-r-gray-300 overflow-y-auto md:inline-block">
			<h1 className="text-2xl font-bold mb-4">Welcome 👋</h1>
			<ul>
				<Link to="/">
					<li
						className={`${activeClasses(
							"/"
						)} flex gap-4 p-2 cursor-pointer rounded-lg items-center hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-500`}
					>
						<MdHome size={28} />
						<span>Home</span>
					</li>
				</Link>

				<Link to="/my-documents">
					<li
						className={`${activeClasses(
							"/my-documents"
						)} flex gap-4 p-2 cursor-pointer rounded-lg items-center hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-500`}
					>
						<MdOutlineFolderOpen size={28} />
						<span>My Documents</span>
					</li>
				</Link>

				<Link to="/shared-with-me">
					<li
						className={`${activeClasses(
							"/shared-with-me"
						)} flex gap-4 p-2 cursor-pointer rounded-lg items-center hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-500`}
					>
						<MdFolderShared size={28} />
						<span>Shared With Me</span>
					</li>
				</Link>

				<Link to="/peers">
					<li
						className={`${activeClasses(
							"/peers"
						)} flex gap-4 p-2 cursor-pointer rounded-lg items-center hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-500`}
					>
						<MdPeopleAlt size={28} />
						<span>Peers</span>
					</li>
				</Link>
			</ul>
		</aside>
	);
}
