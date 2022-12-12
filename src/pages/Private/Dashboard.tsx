import PageHeader from "../../components/PageHeader";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
	const { user } = useAuthContext();

	return (
		<div>
			<PageHeader title="Home" />
			<div className="flex flex-col">
				<div className="flex flex-col gap-1">
					<span>{`Welcome, ${user?.name || "user"}`}</span>
					<span className="text-sm text-gray-300">{user?.email}</span>
				</div>
			</div>
		</div>
	);
}
