import { useMutation, UseMutateFunction } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteDocument } from "services/DocumentService";
import { displayToast } from "utils/toast";

interface IUseDocumentOutput {
	deactivate: UseMutateFunction<
		string,
		unknown,
		{ documentId: string },
		unknown
	>;
	isDeactivating: boolean;
}

const useDeactivateDocument = (): IUseDocumentOutput => {
	const navigate = useNavigate();

	const {
		mutate: deactivate,
		isLoading: isDeactivating,
		data,
	} = useMutation({
		mutationFn: ({ documentId }: { documentId: string }) => {
			return deleteDocument(documentId);
		},
		onSuccess: () => {
			displayToast("Document deleted successfully!", { type: "success" });
			navigate("/my-documents", { replace: true });
		},
		onError: () => {
			displayToast("Error while deleting document. Please, try again later.", {
				type: "error",
			});
		},
	});

	return {
		deactivate,
		isDeactivating,
	};
};

export default useDeactivateDocument;
