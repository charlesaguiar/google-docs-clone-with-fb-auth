import { useMutation, UseMutateFunction } from "react-query";
import { useNavigate } from "react-router-dom";

import { createDocument, IDocument } from "services/DocumentService";
import { displayToast } from "utils/toast";

interface IUseDocumentOutput {
	createdDocument: IDocument | undefined;
	clone: UseMutateFunction<
		{ message: string; document: IDocument },
		unknown,
		void,
		unknown
	>;
	isCloning: boolean;
}

const useCloneDocument = (
	document: IDocument | undefined
): IUseDocumentOutput => {
	const navigate = useNavigate();

	const {
		mutate: clone,
		isLoading: isCloning,
		data,
	} = useMutation({
		mutationFn: () => {
			return createDocument(
				`${document?.name} - CLONE`,
				document?.ownerId || "",
				document?.data
			);
		},
		onSuccess: () => {
			displayToast("Document cloned successfully!", { type: "success" });
			navigate("/my-documents");
		},
		onError: () => {
			displayToast("Error while creating document. Please, try again later.", {
				type: "error",
			});
		},
	});

	return {
		clone,
		createdDocument: data?.document,
		isCloning,
	};
};

export default useCloneDocument;
