import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "contexts/AuthContext";
import useCreateDocument from "hooks/rq/useCreateDocument";

import Button from "./Button";
import Divider from "./Divider";
import Input from "./Input";

interface ICreateDocumentFormProps {
	onCancel?: () => void;
}

export default function CreateDocumentForm({
	onCancel = () => {},
}: ICreateDocumentFormProps) {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { create, createdDocument, isCreating } = useCreateDocument();

	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const documentNameRef = useRef<HTMLInputElement>(null);

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!user?.uid) return;

		if (!documentNameRef.current?.value) {
			setErrorMessage("Please, provide a name for the document");
			return;
		}

		create({ name: documentNameRef.current?.value, ownerId: user?.uid });
	};

	useEffect(() => {
		if (!createdDocument?.uid) return;
		const timeout = setTimeout(() => {
			onCancel();
			navigate(`/document-editor/${createdDocument.uid}`);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [onCancel, createdDocument?.uid]);

	return (
		<form className="flex flex-col" onSubmit={onSubmit}>
			<Input
				id="document-name-input"
				label="Document Name"
				placeholder="Document name"
				ref={documentNameRef}
				error={errorMessage}
			/>
			<Divider />
			<div className="flex gap-4 self-end">
				<Button variant="secondary" onClick={onCancel} disabled={isCreating}>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="primary"
					isLoading={isCreating}
					disabled={isCreating}
				>
					Create
				</Button>
			</div>
		</form>
	);
}
