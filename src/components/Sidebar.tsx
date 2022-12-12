import {
	MdHome,
	MdOutlineFolderOpen,
	MdFolderShared,
	MdPeopleAlt,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Sidebar() {
	const location = useLocation();
	const activeClasses = (path: string) =>
		path === location.pathname ? "text-blue-500" : "";

	return (
		<aside className="hidden fixed top-[theme(height.nav)] left-0 overflow-x-hidden px-4 py-8 w-sidebar max-w-sidebar h-[calc(100vh-theme(height.nav))] max-h-[calc(100vh-theme(height.nav))] border-r border-r-gray-300 overflow-y-auto md:inline-block">
			<h1 className="text-2xl font-bold mb-4">Welcome 👋</h1>
			<ul>
				<MenuItem
					to="/"
					label="Home"
					activeClassnames={activeClasses("/")}
					Icon={<MdHome size={28} />}
				/>
				<MenuItem
					to="/my-documents"
					label="My Documents"
					activeClassnames={activeClasses("/my-documents")}
					Icon={<MdOutlineFolderOpen size={28} />}
				/>
				<MenuItem
					to="/shared-with-me"
					label="Shared With Me"
					activeClassnames={activeClasses("/shared-with-me")}
					Icon={<MdFolderShared size={28} />}
				/>
				<MenuItem
					to="/peers"
					label="Peers"
					activeClassnames={activeClasses("/peers")}
					Icon={<MdPeopleAlt size={28} />}
				/>
			</ul>
		</aside>
	);
}
