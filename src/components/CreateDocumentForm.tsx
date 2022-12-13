import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import { createDocument } from "../services/DocumentService";
import { displayToast } from "../utils/toast";

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

	const { mutate, isLoading, data } = useMutation({
		mutationFn: ({ name, ownerId }: { name: string; ownerId: string }) => {
			return createDocument(name, ownerId);
		},
	});

	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const documentNameRef = useRef<HTMLInputElement>(null);

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!user?.uid) return;

		if (!documentNameRef.current?.value) {
			setErrorMessage("Please, provide a name for the document");
			return;
		}

		mutate({ name: documentNameRef.current?.value, ownerId: user?.uid });
		displayToast("Document created successfully!", { type: "success" });
	};

	useEffect(() => {
		if (!data?.document?.uid) return;
		const timeout = setTimeout(() => {
			onCancel();
			navigate(`/document-editor/${data.document.uid}`);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [onCancel, data?.document?.uid]);

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
				<Button variant="secondary" onClick={onCancel} disabled={isLoading}>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="primary"
					isLoading={isLoading}
					disabled={isLoading}
				>
					Create
				</Button>
			</div>
		</form>
	);
}
