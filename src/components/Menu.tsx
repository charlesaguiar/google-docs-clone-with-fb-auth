import { useLocation } from "react-router-dom";
import {
	MdHome,
	MdOutlineFolderOpen,
	MdFolderShared,
	MdPeopleAlt,
	MdClose,
} from "react-icons/md";

import MenuItem from "./MenuItem";

export default function Menu({ onClose }: { onClose?: () => void }) {
	const location = useLocation();
	const activeClasses = (path: string) =>
		path === location.pathname ? "text-blue-500" : "";

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">Welcome 👋</h1>
				{onClose ? <MdClose size={22} onClick={onClose} /> : null}
			</div>
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
		</>
	);
}
