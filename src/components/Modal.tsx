import React from "react";
import { MdClose } from "react-icons/md";

interface IModalProps {
	visible: boolean;
	toggleVisible?: () => void;
	title: string;
	children: React.ReactNode;
}

export default function Modal({
	visible,
	toggleVisible = () => {},
	title,
	children,
}: IModalProps) {
	if (!visible) return null;

	return (
		<div className="flex items-center justify-center absolute inset-0 w-screen h-screen z-50 bg-backdrop">
			<div className=" flex flex-col bg-white rounded-lg shadow-lg min-w-[50vw]">
				{/* HEADER */}
				<div className="flex justify-between items-center p-4">
					<span className="font-bold uppercase text-lg">{title}</span>
					<MdClose
						className="cursor-pointer"
						size={28}
						onClick={toggleVisible}
					/>
				</div>

				{/* DIVIDER */}
				<div className="w-100 h-[1px] bg-gray-300" />

				{/* BODY */}
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
}
