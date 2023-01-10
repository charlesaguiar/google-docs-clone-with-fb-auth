import { useQuery } from 'react-query'
import { getDocument, IDocument } from 'services/DocumentService'
import { DOCUMENT_QUERY_KEY } from 'consts/queryKeys'

interface IUseDocumentOutput {
	document: IDocument | undefined
	isLoading: boolean
}

const useDocument = (documentId: string): IUseDocumentOutput => {
	const { isLoading, data: document } = useQuery(
		DOCUMENT_QUERY_KEY,
		async () => await getDocument(documentId),
		{ refetchOnWindowFocus: false },
	)

	return {
		document,
		isLoading,
	}
}

export default useDocument
