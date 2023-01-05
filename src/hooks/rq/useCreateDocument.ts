import { useMutation, UseMutateFunction } from "react-query";
import { useNavigate } from "react-router-dom";

import { createDocument, IDocument } from "services/DocumentService";
import { displayToast } from "utils/toast";

interface IUseDocumentOutput {
	createdDocument: IDocument | undefined;
	create: UseMutateFunction<
		{ message: string; document: IDocument },
		unknown,
		{ name: string; ownerId: string },
		unknown
	>;
	isCreating: boolean;
}

const useCreateDocument = (): IUseDocumentOutput => {
	const navigate = useNavigate();

	const {
		mutate: create,
		isLoading: isCreating,
		data,
	} = useMutation({
		mutationFn: ({ name, ownerId }: { name: string; ownerId: string }) => {
			return createDocument(name, ownerId);
		},
		onSuccess: async ({ document }) => {
			displayToast("Document created successfully!", { type: "success" });
			navigate(`/document-editor/${document.uid}`);
		},
		onError: () => {
			displayToast("Error while creating document. Please, try again later.", {
				type: "error",
			});
		},
	});

	return {
		create,
		createdDocument: data?.document,
		isCreating,
	};
};

export default useCreateDocument;
