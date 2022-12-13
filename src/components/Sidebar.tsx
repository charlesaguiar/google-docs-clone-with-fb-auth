import Menu from "./Menu";

export default function Sidebar() {
	return (
		<aside className="hidden fixed top-[theme(height.nav)] left-0 overflow-x-hidden px-4 py-8 w-sidebar max-w-sidebar h-[calc(100vh-theme(height.nav))] max-h-[calc(100vh-theme(height.nav))] border-r border-r-gray-300 overflow-y-auto md:inline-block">
			<Menu />
		</aside>
	);
}
