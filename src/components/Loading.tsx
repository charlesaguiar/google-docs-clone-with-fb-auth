import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({
	size = 50,
	inline = true,
}: {
	size?: number;
	inline?: boolean;
}) {
	return (
		<div
			className={`flex items-center justify-center ${inline ? "h-screen" : ""}`}
		>
			<ClipLoader size={size} />
		</div>
	);
}
