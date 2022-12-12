import Button from "./Button";
import Divider from "./Divider";

interface IPageHeaderAction {
	variant: "primary" | "secondary";
	label: string;
	handler: () => void;
}

interface IPageHeaderProps {
	title: string;
	actions?: IPageHeaderAction[];
}

export default function PageHeader({ title, actions }: IPageHeaderProps) {
	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">{title}</h1>
				{actions?.length
					? actions.map((action, i) => (
							<Button
								key={`${action.label}-${i}`}
								variant={action.variant}
								onClick={action.handler}
							>
								{action.label}
							</Button>
					  ))
					: null}
			</div>
			<Divider />
		</>
	);
}
