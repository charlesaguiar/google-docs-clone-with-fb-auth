import { Outlet } from "react-router-dom";

export default function PublicRoutesLayout() {
	return (
		<div className="flex items-center justify-center container max-w-[1280px] mx-auto h-screen">
			<Outlet />
		</div>
	);
}
