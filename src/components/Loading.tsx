import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen">
			<ClipLoader size={50} />
		</div>
	);
}
