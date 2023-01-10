import { useMutation, UseMutateFunction } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ApiError } from 'schemas/axios'

import { createDocument, IDocument } from 'services/DocumentService'
import { displayToast } from 'utils/toast'

interface IUseDocumentOutput {
	createdDocument: IDocument | undefined
	create: UseMutateFunction<
		{ message: string; document: IDocument },
		unknown,
		{ name: string; ownerId: string },
		unknown
	>
	isCreating: boolean
}

const useCreateDocument = (): IUseDocumentOutput => {
	const navigate = useNavigate()

	const {
		mutate: create,
		isLoading: isCreating,
		data,
	} = useMutation({
		mutationFn: async ({ name, ownerId }: { name: string; ownerId: string }) => {
			return await createDocument(name, ownerId)
		},
		onSuccess: async ({ document }) => {
			displayToast('Document created successfully!', { type: 'success' })
			navigate(`/document-editor/${document.uid}`)
		},
		onError: (err) => {
			const error = err as ApiError
			const message =
				error.response?.data?.message ?? 'Error while creating document. Please, try again later.'

			displayToast(message, { type: 'error' })
		},
	})

	return {
		create,
		createdDocument: data?.document,
		isCreating,
	}
}

export default useCreateDocument
