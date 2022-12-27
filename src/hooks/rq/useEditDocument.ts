import { useMutation, useQueryClient, UseMutateFunction } from "react-query";

import {
	editDocument,
	IDocument,
	IEditDocumentInput,
} from "../../services/DocumentService";
import { displayToast } from "../../utils/toast";
import { DOCUMENT_QUERY_KEY } from "./queryKeys";

interface IUseDocumentOutput {
	edit: UseMutateFunction<
		string,
		unknown,
		IEditDocumentInput,
		{ previousDocument: IDocument | undefined }
	>;
	isEditing: boolean;
}

const useEditDocument = (): IUseDocumentOutput => {
	const queryClient = useQueryClient();

	const { mutate: edit, isLoading: isEditing } = useMutation({
		mutationFn: (input: IEditDocumentInput) =>
			editDocument(input.uid, input.name),
		onMutate: async (newDocument) => {
			await queryClient.cancelQueries({ queryKey: [DOCUMENT_QUERY_KEY] });
			const previousDocument = queryClient.getQueryData<IDocument>([
				DOCUMENT_QUERY_KEY,
			]);
			queryClient.setQueryData([DOCUMENT_QUERY_KEY], (old) => ({
				...(old as IDocument),
				name: newDocument.name,
			}));

			return { previousDocument };
		},
		onSuccess: () => {
			displayToast("Document updated successfully!", { type: "success" });
		},
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(["todos"], context?.previousDocument);
			displayToast("Error while updating document. Please try again.", {
				type: "error",
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [DOCUMENT_QUERY_KEY] });
		},
	});

	return {
		edit,
		isEditing,
	};
};

export default useEditDocument;
