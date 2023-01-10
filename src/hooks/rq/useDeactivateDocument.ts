import { useMutation, UseMutateFunction } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteDocument, IDocument } from 'services/DocumentService'
import { displayToast } from 'utils/toast'

interface IUseDocumentOutput {
	deactivate: UseMutateFunction<void, unknown, void, unknown>
	isDeactivating: boolean
}

const useDeactivateDocument = (document: IDocument | undefined): IUseDocumentOutput => {
	const navigate = useNavigate()

	const { mutate: deactivate, isLoading: isDeactivating } = useMutation({
		mutationFn: async () => {
			if (!document) return
			await deleteDocument(document.uid)
		},
		onSuccess: () => {
			displayToast('Document deleted successfully!', { type: 'success' })
			navigate('/my-documents', { replace: true })
		},
		onError: () => {
			displayToast('Error while deleting document. Please, try again later.', {
				type: 'error',
			})
		},
	})

	return {
		deactivate,
		isDeactivating,
	}
}

export default useDeactivateDocument
