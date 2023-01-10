import { useMutation, UseMutateFunction } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { cloneDocument, IDocument } from 'services/DocumentService'
import { displayToast } from 'utils/toast'

interface IUseDocumentOutput {
	clone: UseMutateFunction<void, unknown, void, unknown>
	isCloning: boolean
}

const useCloneDocument = (document: IDocument | undefined): IUseDocumentOutput => {
	const navigate = useNavigate()

	const { mutate: clone, isLoading: isCloning } = useMutation({
		mutationFn: async () => {
			if (!document) return
			await cloneDocument(document)
		},
		onSuccess: () => {
			displayToast('Document cloned successfully!', { type: 'success' })
			navigate('/my-documents')
		},
		onError: () => {
			displayToast('Error while creating document. Please, try again later.', {
				type: 'error',
			})
		},
	})

	return {
		clone,
		isCloning,
	}
}

export default useCloneDocument
