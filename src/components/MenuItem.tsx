import React from "react";
import { Link } from "react-router-dom";

interface IMenuItemProps {
	label: string;
	to: string;
	activeClassnames?: string;
	Icon: React.ReactNode;
}

export default function MenuItem({
	label,
	to,
	activeClassnames = "",
	Icon,
}: IMenuItemProps) {
	return (
		<li>
			<Link
				to={to}
				className={`${activeClassnames} flex gap-4 p-2 cursor-pointer rounded-lg items-center hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-500`}
			>
				{Icon}
				<span>{label}</span>
			</Link>
		</li>
	);
}
