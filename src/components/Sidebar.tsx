import {
	MdHome,
	MdOutlineFolderOpen,
	MdFolderShared,
	MdPeopleAlt,
} from "react-icons/md";
import { useUiContext } from "../contexts/UiContext";
import MenuItem from "./MenuItem";

export default function Sidebar() {
	const { showSidebar } = useUiContext();
	return (
		<aside
			className={`fixed ${
				showSidebar ? "translate-x-0" : "-translate-x-full"
			} bg-mainbg z-50 top-[theme(height.nav)] left-0 overflow-x-hidden shadow-lg px-4 py-8 w-sidebar max-w-sidebar h-[calc(100vh-theme(height.nav))] max-h-[calc(100vh-theme(height.nav))] border-r border-r-gray-300 overflow-y-auto duration-300 ease-in-out md:translate-x-0  md:z-0`}
		>
			<h1 className="text-2xl font-bold mb-4">Welcome 👋</h1>
			<ul>
				<MenuItem to="/" label="Home" Icon={<MdHome size={28} />} />
				<MenuItem
					to="/my-documents"
					label="My Documents"
					Icon={<MdOutlineFolderOpen size={28} />}
				/>
				<MenuItem
					to="/shared-with-me"
					label="Shared With Me"
					Icon={<MdFolderShared size={28} />}
				/>
				<MenuItem to="/peers" label="Peers" Icon={<MdPeopleAlt size={28} />} />
			</ul>
		</aside>
	);
}
