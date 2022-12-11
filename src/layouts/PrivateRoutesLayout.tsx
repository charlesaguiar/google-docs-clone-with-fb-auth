import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function PrivateRoutesLayout() {
	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<div className="flex">
				<Sidebar />
				<main className="ml-[theme(width.sidebar)] px-8 py-4 grow">
					<Outlet />
				</main>
			</div>
		</div>
	);
}