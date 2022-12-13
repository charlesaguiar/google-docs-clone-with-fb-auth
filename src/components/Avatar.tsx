import { FaUser } from "react-icons/fa";

export default function Avatar({
	avatarUrl,
	placeholderSize = 28,
}: {
	avatarUrl?: string | null;
	placeholderSize?: number;
}) {
	return avatarUrl ? (
		<img
			className="border shadow-lg border-gray-300 w-full h-full rounded-full object-cover object-center"
			src={avatarUrl}
		/>
	) : (
		<div className="p-1 rounded-full border border-gray-300">
			<FaUser className="w-full h-full rounded-full" size={placeholderSize} />
		</div>
	);
}
