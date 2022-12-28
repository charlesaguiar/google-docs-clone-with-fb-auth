import { EventHandler, FormEvent, useCallback, useRef, useState } from "react";
import {
	MdOutlineEdit,
	MdCheckCircleOutline,
	MdOutlineCancel,
} from "react-icons/md";
import useToggle from "hooks/useToggle";

import Input from "./Input";
import Loading from "./Loading";

interface IInlineEditInputProps {
	defaultValue: string;
	isRequired?: boolean;
	isLoading?: boolean;
	onEdit?: (newValue: string) => void;
}

interface IInlineEditInputControlsProps {
	isLoading: boolean;
	isEditMode: boolean;
	toggleIsEditMode: () => void;
	onSubmit: EventHandler<FormEvent>;
}

const InlineEditInput: React.FC<IInlineEditInputProps> = ({
	defaultValue,
	isRequired = true,
	isLoading = false,
	onEdit = () => {},
}) => {
	const documentNameRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | undefined>();

	const [isEditMode, toggleIsEditMode] = useToggle();

	const onEditSubmit: EventHandler<FormEvent> = useCallback(
		(e) => {
			e.preventDefault();

			if (isRequired && !documentNameRef.current?.value) {
				setError("Please, enter a valid value and try again.");
				return;
			}

			if (defaultValue === documentNameRef.current?.value) {
				toggleIsEditMode();
				return;
			}

			setError(undefined);
			onEdit(documentNameRef.current?.value || "");
			toggleIsEditMode();
		},
		[onEdit, isRequired]
	);

	return (
		<div className="flex gap-4 items-center">
			{isEditMode ? (
				<form onSubmit={onEditSubmit}>
					<Input
						autoFocus
						ref={documentNameRef}
						defaultValue={defaultValue}
						className="font-normal text-base"
						error={error}
					/>
				</form>
			) : (
				<span>{defaultValue}</span>
			)}

			<InlineEditInputControls
				isLoading={isLoading}
				isEditMode={isEditMode}
				toggleIsEditMode={toggleIsEditMode}
				onSubmit={onEditSubmit}
			/>
		</div>
	);
};

function InlineEditInputControls({
	isLoading,
	isEditMode,
	onSubmit,
	toggleIsEditMode,
}: IInlineEditInputControlsProps) {
	if (isLoading) {
		return <Loading size={25} inline={false} />;
	}

	return isEditMode ? (
		<div className="flex gap-2">
			<button type="submit" className="appearance-none">
				<MdCheckCircleOutline
					size={28}
					className="text-gray-300 cursor-pointer hover:text-emerald-400"
					onClick={onSubmit}
				/>
			</button>

			<MdOutlineCancel
				size={28}
				className="text-gray-300 cursor-pointer hover:text-red-400"
				onClick={toggleIsEditMode}
			/>
		</div>
	) : (
		<MdOutlineEdit
			onClick={toggleIsEditMode}
			size={28}
			className="text-gray-300 cursor-pointer hover:text-gray-900"
		/>
	);
}

export default InlineEditInput;
