import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ size = 50 }: { size?: number }) {
	return (
		<div className="flex items-center justify-center h-screen">
			<ClipLoader size={size} />
		</div>
	);
}
