import { useLayoutEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

import useOnClickOutside from "hooks/useOnClickOutside";

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
	const modalRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(modalRef, toggleVisible);
	useHideBodyScroll(!visible);

	if (!visible) return null;

	return (
		<div className="flex items-center justify-center absolute inset-0 w-screen h-screen z-50 bg-backdrop">
			<div
				ref={modalRef}
				className=" flex flex-col bg-white rounded-lg shadow-lg min-w-[250px] md:min-w-[75vw] xl:min-w-[50vw]"
			>
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
				<div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
			</div>
		</div>
	);
}

const useHideBodyScroll = (overflowVisible: boolean) => {
	useLayoutEffect(() => {
		const overflowState = overflowVisible ? "auto" : "hidden";
		document.body.style.overflow = overflowState;
	}, [overflowVisible]);
};
