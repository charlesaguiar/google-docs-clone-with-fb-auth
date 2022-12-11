import { MdAccountCircle, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import Logo from "../assets/react.svg";

export default function Navbar() {
	const navigate = useNavigate();
	const { logout } = useAuthContext();

	return (
		<header className="inline-block sticky top-0 z-50 w-full bg-gray-50">
			<nav className="flex items-center justify-between shadow-lg h-nav">
				<Link className="mx-4 md:mx-6 lg:mx-8" to="/">
					<div className="flex gap-4 items-center">
						<img src={Logo} />
						<strong>GoogleDocsClone</strong>
					</div>
				</Link>

				<div className="flex gap-3 mx-4 md:mx-6 lg:mx-8">
					<button
						className="flex items-center justify-center gap-4 border border-gray-300 p-2 rounded-full md:rounded-lg hover:border-blue-500 hover:bg-blue-50"
						onClick={() => navigate("/update-profile")}
					>
						<MdAccountCircle size={20} />
						<span className="hidden md:block">Update my profile</span>
					</button>
					<button
						className="flex items-center justify-center gap-4 border border-gray-300 p-2 rounded-full md:rounded-lg hover:border-blue-500 hover:bg-blue-50"
						onClick={logout}
					>
						<MdLogout size={20} />
						<span className="hidden md:block">Logout</span>
					</button>
				</div>
			</nav>
		</header>
	);
}
