import { useAuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
	const { user } = useAuthContext();

	return (
		<div>
			<div className="flex flex-col p-2">
				<div className="flex flex-col gap-1">
					<span>{`Welcome, ${user?.name || "user"}`}</span>
					<span className="text-sm text-gray-300">{user?.email}</span>
				</div>
			</div>
		</div>
	);
}
