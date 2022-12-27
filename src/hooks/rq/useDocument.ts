import { useQuery } from "react-query";

import { getDocument, IDocument } from "../../services/DocumentService";

interface IUseDocumentOutput {
	document: IDocument | undefined;
	isLoading: boolean;
}

const DOCUMENT_QUERY_KEY = "document-meta";

const useDocument = (documentId: string): IUseDocumentOutput => {
	const { isLoading, data: document } = useQuery(
		DOCUMENT_QUERY_KEY,
		() => getDocument(documentId),
		{ refetchOnWindowFocus: false }
	);

	return {
		document,
		isLoading,
	};
};

export default useDocument;
