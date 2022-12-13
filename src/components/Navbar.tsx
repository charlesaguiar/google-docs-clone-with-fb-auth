import { MdLogout, MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import useToggle from "../hooks/useToggle";

import Logo from "../assets/react.svg";
import Avatar from "./Avatar";
import Menu from "./Menu";

export default function Navbar() {
	const navigate = useNavigate();
	const { user, logout } = useAuthContext();
	const [sidebarOpen, toggleSidebar] = useToggle();

	return (
		<>
			<header className="inline-block sticky top-0 z-10 w-full bg-gray-50 print:hidden">
				<nav className="flex items-center justify-between shadow-lg h-nav">
					<div className="block mx-4 md:mx-6 lg:mx-8 md:hidden cursor-pointer hover:text-gray-500">
						<MdMenu size={28} onClick={toggleSidebar} />
					</div>
					<Link className="mx-4 md:mx-6 lg:mx-8" to="/">
						<div className="flex gap-4 items-center">
							<img src={Logo} />
							<strong className="hidden xs:block">GoogleDocsClone</strong>
						</div>
					</Link>

					<div className="flex gap-3 items-center mx-4 md:mx-6 lg:mx-8">
						<button
							className="flex items-center justify-center gap-4 border border-gray-300 p-2 rounded-full md:rounded-lg hover:border-blue-500 hover:bg-blue-50"
							onClick={logout}
						>
							<MdLogout size={20} />
							<span className="hidden md:block">Logout</span>
						</button>
						<div
							className="w-14 h-14 cursor-pointer"
							onClick={() => navigate("/update-profile")}
						>
							<Avatar avatarUrl={user?.photoUrl} placeholderSize={12} />
						</div>
					</div>
				</nav>
			</header>
			<div
				className={`ease-in-out duration-300 fixed px-4 py-6 top-0 bottom-0 min-h-screen min-w-[250px] max-w-[300px] bg-white z-50 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Menu onClose={toggleSidebar} />
			</div>
		</>
	);
}
