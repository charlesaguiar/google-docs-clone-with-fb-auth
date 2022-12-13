import Button from "./Button";
import Divider from "./Divider";

interface IPageHeaderAction {
	variant: "primary" | "secondary";
	label: string;
	Icon?: React.ReactNode;
	handler: () => void;
}

interface IPageHeaderProps {
	title: React.ReactNode;
	actions?: IPageHeaderAction[];
}

export default function PageHeader({ title, actions }: IPageHeaderProps) {
	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">{title}</h1>
				<div className="flex gap-2">
					{actions?.length
						? actions.map((action, i) => (
								<Button
									key={`${action.label}-${i}`}
									variant={action.variant}
									onClick={action.handler}
									className="flex gap-2 items-center"
								>
									{action.Icon ? action.Icon : null}
									{action.label}
								</Button>
						  ))
						: null}
				</div>
			</div>
			<Divider />
		</>
	);
}
